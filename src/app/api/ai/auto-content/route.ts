import { NextRequest, NextResponse } from 'next/server';
import { generateContent, generateImage } from '@/lib/ai-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      clientName,
      clientType,
      topic,
      tone,
      platforms,
      location,
      features,
      contactInfo,
      includeImage,
      includeVideo,
      imageStyle,
      videoStyle,
      colorScheme,
      language = 'ar',
      timestamp,
      uniqueId,
      requestId,
      regenerateMode,
      imageSeed,
      videoSeed,
    } = body;

    // التحقق من المدخلات
    if (!clientName || !topic || !platforms || platforms.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName, topic, platforms' },
        { status: 400 }
      );
    }

    // 1. توليد النص
    const contentPrompt = `
أنت خبير تسويق رقمي متخصص في السياحة والضيافة في السعودية.

معلومات العميل:
- الاسم: ${clientName}
- النوع: ${clientType || 'فندق'}
- الموقع: ${location || 'أبها، السعودية'}
- المميزات: ${features || 'فندق فاخر مع إطلالة جبلية'}

المطلوب:
- الموضوع: ${topic}
- النبرة: ${tone || 'احترافي'}
- المنصات: ${platforms.join(', ')}

الرجاء كتابة منشور تسويقي ${tone === 'luxury' ? 'فاخر وراقي' : tone === 'excited' ? 'حماسي ومشوق' : 'احترافي ومقنع'} يتضمن:
1. عنوان جذاب
2. وصف المميزات بدقة (استخدم المعلومات المحددة فقط)
3. دعوة للعمل واضحة
4. معلومات الاتصال: ${contactInfo || 'سيتم إضافتها لاحقاً'}
5. 5-7 هاشتاجات مناسبة

مهم جداً:
- استخدم المعلومات الدقيقة المقدمة فقط
- لا تخترع معلومات غير مذكورة
- اذكر الموقع بالضبط: ${location}
- ركز على المميزات الحقيقية المذكورة

صيغة الإخراج:
النص (بدون الهاشتاجات)
---
الهاشتاجات (مفصولة بفواصل)
`;

    const generatedText = await generateContent({
      clientName,
      clientType: clientType || 'hotel',
      platform: platforms[0],
      topic: contentPrompt,
      tone: tone || 'professional',
      language,
      includeHashtags: true,
      includeEmojis: true,
    });

    // تقسيم النص والهاشتاجات
    const parts = generatedText.split('---');
    const text = parts[0]?.trim() || generatedText;
    const hashtagsText = parts[1]?.trim() || '';
    const hashtags = hashtagsText
      ? hashtagsText.split(/[،,\s]+/).filter(h => h.startsWith('#'))
      : ['#' + clientName.replace(/\s+/g, '_'), '#السعودية', '#' + (location || 'أبها').split(',')[0].trim()];

    // 2. توليد الصورة (إذا كان مطلوباً)
    let imageUrl: string | undefined;
    if (includeImage) {
      try {
        // إضافة تنويع للـ prompt بناءً على معرف الطلب
        const variations = [
          'morning light', 'golden hour', 'sunset glow', 'blue hour', 'natural lighting'
        ];
        const angles = [
          'aerial view', 'front entrance', 'interior lobby', 'panoramic view', 'close-up details'
        ];
        
        const seedValue = (timestamp || Date.now()) + (imageSeed || Math.random()) * 1000;
        const lightingVariation = variations[Math.floor(seedValue / 100) % variations.length];
        const angleVariation = angles[Math.floor(seedValue / 200) % angles.length];
        
        const imagePrompt = `Professional high-quality photo of ${clientName}, a luxury ${clientType || 'hotel'} in ${location || 'Abha, Saudi Arabia'}, ${features || 'with mountain views'}, ${topic}, beautiful architecture, ${lightingVariation}, ${angleVariation}, inviting atmosphere, 4k photography, unique perspective, seed:${Math.floor(seedValue)}`;
        
        imageUrl = await generateImage(imagePrompt, '1024x1024', imageStyle || 'professional', colorScheme || 'warm');
      } catch (error) {
        console.error('Error generating image:', error);
        // في حالة فشل توليد الصورة، نستمر بدون صورة
      }
    }

    // 3. توليد الفيديو (إذا كان مطلوباً)
    let videoUrl: string | undefined;
    let videoData: any = null;
    if (includeVideo) {
      try {
        // إضافة تنويع للفيديو
        const videoSeedValue = (timestamp || Date.now()) + (videoSeed || Math.random()) * 5000;
        
        const videoResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/ai/generate-video`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: generatedText,
            clientName,
            clientType,
            imageUrl,
            videoStyle: videoStyle || 'modern',
            colorScheme: colorScheme || 'warm',
            duration: 15,
            timestamp: videoSeedValue,
            uniqueId,
            requestId: `video-${videoSeedValue}`,
          }),
        });
        
        const videoResult = await videoResponse.json();
        if (videoResult.success) {
          videoUrl = videoResult.video.url;
          videoData = videoResult.video;
        }
      } catch (error) {
        console.error('Error generating video:', error);
        // في حالة فشل توليد الفيديو، نستمر بدون فيديو
      }
    }

    // 3. تحديد أفضل وقت للنشر
    const now = new Date();
    const bestTime = new Date(now);
    
    // أفضل وقت للنشر في السعودية: 7-9 مساءً
    bestTime.setDate(now.getDate() + (now.getHours() >= 21 ? 1 : 0));
    bestTime.setHours(19, 30, 0, 0);
    
    const dayOfWeek = bestTime.getDay();
    // إذا كان السبت (6)، نؤجل ليوم الأحد
    if (dayOfWeek === 6) {
      bestTime.setDate(bestTime.getDate() + 1);
    }

    // 4. تحليل الجمهور المستهدف
    const targetAudience = {
      age: clientType === 'hotel' ? '25-50 سنة' : '30-55 سنة',
      gender: 'الكل',
      interests: [
        'السفر والسياحة',
        clientType === 'hotel' ? 'الفنادق الفاخرة' : 'السياحة الداخلية',
        'الطبيعة والجبال',
        'التصوير الفوتوغرافي',
        'المغامرات',
      ],
      location: 'السعودية - الرياض، جدة، الدمام، الطائف',
      behavior: 'مهتمون بالسفر الداخلي والسياحة في المملكة',
    };

    // 5. توقعات الأداء
    const expectedPerformance = {
      estimatedReach: platforms.length * 5000,
      estimatedEngagement: platforms.length * 250,
      estimatedClicks: platforms.length * 50,
      confidence: 85,
    };

    return NextResponse.json({
      success: true,
      content: {
        text,
        hashtags,
        imageUrl,
        videoUrl,
        videoData,
        bestTime: {
          date: bestTime.toISOString().split('T')[0],
          time: bestTime.toTimeString().slice(0, 5),
          day: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'][bestTime.getDay()],
          reason: `أفضل وقت للنشر في السعودية حيث يكون معدل التفاعل في أعلى مستوياته. الجمهور المستهدف يكون نشطاً بنسبة 78% في هذا الوقت.`,
        },
        targetAudience,
        expectedPerformance,
      },
      metadata: {
        clientName,
        location,
        platforms,
        generatedAt: new Date().toISOString(),
      },
    });

  } catch (error: any) {
    console.error('Auto Content Generation Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate content',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
