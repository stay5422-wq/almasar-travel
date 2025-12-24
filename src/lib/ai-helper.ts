/**
 * AI Helper - نظام الذكاء الاصطناعي المتكامل
 * يستخدم OpenAI GPT-4 لأتمتة المهام التسويقية
 */

import OpenAI from 'openai';

// Helper function to get OpenAI instance
function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// ========================================
// 1. توليد محتوى تلقائي
// ========================================

interface ContentRequest {
  clientName: string;
  clientType: 'hotel' | 'tourism_company' | 'corporate';
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube';
  topic?: string;
  tone?: 'professional' | 'friendly' | 'promotional' | 'informative';
  language?: 'ar' | 'en';
  includeHashtags?: boolean;
  includeEmojis?: boolean;
}

export async function generateContent(request: ContentRequest): Promise<string> {
  // Demo mode - return mock data without API call
  if (process.env.DEMO_MODE === 'true') {
    const mockContent = `🌟 اكتشف سحر ${request.clientName} في أجمل المناطق السياحية!

✨ نقدم لك تجربة استثنائية مع:
• إقامة فاخرة في بيئة مريحة وآمنة
• إطلالات خلابة على الطبيعة الساحرة
• خدمة عملاء متميزة على مدار الساعة
• أنشطة ترفيهية متنوعة للعائلة

📞 احجز الآن واستمتع بعروضنا الخاصة!

${request.includeHashtags ? '#السعودية #السياحة #أبها #' + request.clientName.replace(/\s+/g, '_') : ''}`;
    
    return mockContent;
  }

  const {
    clientName,
    clientType,
    platform,
    topic = 'عرض خاص',
    tone = 'professional',
    language = 'ar',
    includeHashtags = true,
    includeEmojis = true,
  } = request;

  const clientTypeAr = {
    hotel: 'فندق',
    tourism_company: 'شركة سياحية',
    corporate: 'شركة',
  };

  const platformGuide = {
    facebook: 'منشور Facebook (150-300 كلمة، مناسب للمشاركة)',
    instagram: 'منشور Instagram (80-150 كلمة، جذاب بصرياً)',
    twitter: 'تغريدة (حتى 280 حرف، مباشر وموجز)',
    linkedin: 'منشور LinkedIn (احترافي، 200-400 كلمة)',
    youtube: 'وصف فيديو YouTube (200-300 كلمة، SEO-friendly)',
  };

  const prompt = `
أنت مسوق رقمي محترف متخصص في التسويق السياحي في المملكة العربية السعودية، خاصة مدينة أبها.

معلومات العميل:
- الاسم: ${clientName}
- النوع: ${clientTypeAr[clientType]}
- المنصة: ${platform}
- الموضوع: ${topic}
- النبرة: ${tone}

المطلوب: اكتب ${platformGuide[platform]}

القواعد:
1. اكتب باللغة ${language === 'ar' ? 'العربية الفصحى' : 'الإنجليزية'}
2. ركز على جمال أبها والمنطقة
3. أضف call-to-action قوي
${includeHashtags ? '4. أضف 3-5 هاشتاجات ذات صلة' : ''}
${includeEmojis ? '5. استخدم الإيموجي بذكاء' : ''}
6. اجعله جذاباً ومحفزاً للتفاعل
7. لا تذكر أسعار إلا إذا كان الموضوع يتطلب ذلك

ابدأ الآن:
`;

  const response = await getOpenAI().chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'أنت خبير تسويق رقمي متخصص في صناعة السياحة والضيافة في السعودية.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });

  return response.choices[0].message.content || '';
}

// ========================================
// 2. تحسين الحملات الإعلانية
// ========================================

interface CampaignOptimization {
  campaignName: string;
  platform: string;
  budget: number;
  currentMetrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    spent: number;
  };
}

export async function optimizeCampaign(campaign: CampaignOptimization) {
  const ctr = (campaign.currentMetrics.clicks / campaign.currentMetrics.impressions) * 100;
  const cpc = campaign.currentMetrics.spent / campaign.currentMetrics.clicks;
  const conversionRate =
    (campaign.currentMetrics.conversions / campaign.currentMetrics.clicks) * 100;

  const prompt = `
أنت خبير في إدارة الحملات الإعلانية الرقمية.

معلومات الحملة:
- الاسم: ${campaign.campaignName}
- المنصة: ${campaign.platform}
- الميزانية: ${campaign.budget} ريال
- المصروف حتى الآن: ${campaign.currentMetrics.spent} ريال

الأداء الحالي:
- الظهور: ${campaign.currentMetrics.impressions.toLocaleString()}
- النقرات: ${campaign.currentMetrics.clicks.toLocaleString()}
- التحويلات: ${campaign.currentMetrics.conversions}
- CTR: ${ctr.toFixed(2)}%
- CPC: ${cpc.toFixed(2)} ريال
- معدل التحويل: ${conversionRate.toFixed(2)}%

المطلوب:
1. حلل الأداء الحالي
2. حدد نقاط القوة والضعف
3. أعط 5 توصيات عملية للتحسين
4. اقترح تعديلات على الميزانية إن لزم
5. حدد الجمهور المستهدف الأمثل

قدم التحليل بصيغة JSON:
{
  "analysis": "...",
  "strengths": ["..."],
  "weaknesses": ["..."],
  "recommendations": ["..."],
  "budgetAdjustment": "...",
  "targetAudience": "..."
}
`;

  const response = await getOpenAI().chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.3,
  });

  try {
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    return {
      performance: 'متوسط',
      strengths: [],
      weaknesses: [],
      recommendations: [],
      budgetAdjustment: 'لا توجد توصيات',
      targetAudience: 'غير محدد'
    };
  }
}

// ========================================
// 3. جدولة ذكية للمنشورات
// ========================================

interface SmartScheduleRequest {
  platform: string;
  contentType: 'text' | 'image' | 'video';
  targetAudience: string;
  timezone?: string;
}

export async function suggestBestTime(request: SmartScheduleRequest) {
  const prompt = `
أنت خبير في تحليل سلوك الجمهور على وسائل التواصل الاجتماعي.

المعلومات:
- المنصة: ${request.platform}
- نوع المحتوى: ${request.contentType}
- الجمهور المستهدف: ${request.targetAudience}
- المنطقة الزمنية: ${request.timezone || 'Asia/Riyadh'}

المطلوب:
اقترح أفضل 3 أوقات للنشر خلال الأسبوع القادم، مع سبب كل وقت.

قدم الإجابة بصيغة JSON:
{
  "suggestions": [
    {
      "day": "الأحد",
      "time": "20:00",
      "reason": "...",
      "expectedEngagement": "high/medium/low"
    }
  ],
  "generalTips": ["..."]
}
`;

  const response = await getOpenAI().chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  try {
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    return {
      suggestions: [{
        day: 'الأحد',
        time: '20:00',
        reason: 'الوقت الأمثل للتفاعل',
        expectedEngagement: 'high'
      }],
      generalTips: ['انشر في المساء', 'استخدم الهاشتاجات']
    };
  }
}

// ========================================
// 4. تحليل وتوصيات SEO
// ========================================

interface SEOAnalysisRequest {
  keyword: string;
  currentPosition?: number;
  competitors?: string[];
  targetLocation?: string;
}

export async function analyzeSEO(request: SEOAnalysisRequest) {
  const prompt = `
أنت خبير SEO متخصص في تحسين محركات البحث للسوق السعودي.

معلومات التحليل:
- الكلمة المفتاحية: "${request.keyword}"
- الموضع الحالي: ${request.currentPosition || 'غير محدد'}
- الموقع المستهدف: ${request.targetLocation || 'أبها، السعودية'}
${request.competitors?.length ? `- المنافسون: ${request.competitors.join(', ')}` : ''}

المطلوب:
1. حلل صعوبة الكلمة المفتاحية
2. اقترح كلمات مفتاحية بديلة أسهل
3. اقترح محتوى مناسب للترتيب
4. استراتيجية باك لينك
5. تحسينات تقنية

قدم التحليل بصيغة JSON:
{
  "difficulty": "easy/medium/hard",
  "alternativeKeywords": ["..."],
  "contentStrategy": "...",
  "backlinkStrategy": "...",
  "technicalImprovements": ["..."],
  "estimatedTimeToRank": "..."
}
`;

  const response = await getOpenAI().chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  try {
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    return {
      difficulty: 'medium',
      alternativeKeywords: ['فنادق أبها', 'سياحة أبها'],
      contentStrategy: 'إنشاء محتوى عالي الجودة',
      backlinkStrategy: 'بناء روابط مع مواقع سياحية',
      technicalImprovements: ['تحسين سرعة الموقع'],
      estimatedTimeToRank: '3-6 أشهر'
    };
  }
}

// ========================================
// 5. توليد صور بالذكاء الاصطناعي
// ========================================

export async function generateImage(prompt: string, size: '1024x1024' | '1792x1024' | '1024x1792' = '1024x1024', style: string = 'professional', colorScheme: string = 'warm') {
  // Demo mode - return curated high-quality images based on style with advanced variation
  if (process.env.DEMO_MODE === 'true') {
    const imageStyles = {
      professional: [
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1625244724120-1fd1d34d00bb?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1024&h=1024&fit=crop&crop=center',
      ],
      luxury: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1549294413-26f195200c16?w=1024&h=1024&fit=crop&crop=center',
      ],
      creative: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1549294413-26f195200c16?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1586611292717-f828b167408c?w=1024&h=1024&fit=crop&crop=center',
      ],
      minimalist: [
        'https://images.unsplash.com/photo-1586611292717-f828b167408c?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1625244724120-1fd1d34d00bb?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1024&h=1024&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1024&h=1024&fit=crop&crop=center',
      ],
    };

    const styleImages = imageStyles[style as keyof typeof imageStyles] || imageStyles.professional;
    
    // إضافة المزيد من التنويع بناءً على المحتوى والوقت
    const seed = (prompt.length * 17) + Date.now() + Math.floor(Math.random() * 10000);
    const randomIndex = Math.floor(seed / 100) % styleImages.length;
    const selectedImage = styleImages[randomIndex];
    
    // تنويع إضافي بناءً على نظام الألوان
    const colorFilters = {
      warm: '&sat=15&hue=30&brightness=5',
      cool: '&sat=10&hue=210&brightness=0', 
      neutral: '&sat=-10&brightness=-5',
      vibrant: '&sat=25&con=15&brightness=10',
    };
    
    const filter = colorFilters[colorScheme as keyof typeof colorFilters] || '';
    const variation = Math.floor((seed % 5) + 1); // للمزيد من التنويع
    
    return selectedImage + filter + `&v=${variation}`;
  }

  // Enhanced prompt for real DALL-E generation
  const stylePrompts = {
    professional: 'professional, clean, corporate, high-quality, modern architecture',
    luxury: 'luxury, elegant, premium, sophisticated, opulent, high-end',
    creative: 'creative, artistic, vibrant colors, unique perspective, innovative',
    minimalist: 'minimalist, clean lines, simple, modern, uncluttered, zen-like',
  };

  const colorPrompts = {
    warm: 'warm colors, golden hour lighting, orange and red tones',
    cool: 'cool colors, blue and cyan tones, crisp morning light',
    neutral: 'neutral colors, balanced lighting, earth tones',
    vibrant: 'vibrant colors, high saturation, energetic lighting',
  };

  const enhancedPrompt = `${prompt}, ${stylePrompts[style as keyof typeof stylePrompts] || stylePrompts.professional}, ${colorPrompts[colorScheme as keyof typeof colorPrompts] || colorPrompts.warm}, professional photography, high resolution, detailed`;

  const response = await getOpenAI().images.generate({
    model: 'dall-e-3',
    prompt: enhancedPrompt,
    n: 1,
    size: size,
    quality: 'hd',
  });

  return response?.data?.[0]?.url || '';
}

// ========================================
// 6. تحليل المنافسين
// ========================================

interface CompetitorAnalysis {
  competitorName: string;
  industry: string;
  location: string;
}

export async function analyzeCompetitor(request: CompetitorAnalysis) {
  const prompt = `
أنت خبير في التحليل التنافسي للسوق السياحي.

معلومات المنافس:
- الاسم: ${request.competitorName}
- المجال: ${request.industry}
- الموقع: ${request.location}

المطلوب:
1. حلل نقاط القوة المحتملة
2. حدد نقاط الضعف
3. اقترح استراتيجيات للتفوق عليه
4. حدد الفرص غير المستغلة
5. اقترح عروض مميزة

قدم التحليل بصيغة JSON:
{
  "strengths": ["..."],
  "weaknesses": ["..."],
  "strategies": ["..."],
  "opportunities": ["..."],
  "uniqueOffers": ["..."]
}
`;

  const response = await getOpenAI().chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  try {
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    return {
      strengths: ['موقع ممتاز', 'خدمة عملاء جيدة'],
      weaknesses: ['تحتاج تطوير', 'قلة التسويق'],
      strategies: ['زيادة النشاط على وسائل التواصل'],
      opportunities: ['موسم السياحة'],
      uniqueOffers: ['عروض خاصة للعائلات']
    };
  }
}

// ========================================
// 7. إنشاء استراتيجية محتوى شاملة
// ========================================

interface ContentStrategyRequest {
  clientName: string;
  clientType: string;
  goals: string[];
  budget: number;
  duration: number; // بالأشهر
}

export async function createContentStrategy(request: ContentStrategyRequest) {
  const prompt = `
أنت استراتيجي محتوى محترف.

معلومات العميل:
- الاسم: ${request.clientName}
- النوع: ${request.clientType}
- الأهداف: ${request.goals.join(', ')}
- الميزانية: ${request.budget} ريال
- المدة: ${request.duration} شهر

المطلوب:
قم بإنشاء استراتيجية محتوى شاملة تتضمن:
1. خطة محتوى شهرية (عدد المنشورات لكل منصة)
2. أنواع المحتوى المقترحة
3. KPIs متوقعة
4. خطة الإعلانات المدفوعة
5. جدول زمني للتنفيذ

قدم الاستراتيجية بصيغة JSON:
{
  "monthlyPlan": {
    "facebook": 0,
    "instagram": 0,
    "twitter": 0,
    "linkedin": 0
  },
  "contentTypes": ["..."],
  "expectedKPIs": {
    "reach": 0,
    "engagement": 0,
    "conversions": 0
  },
  "adBudgetAllocation": {
    "facebook": 0,
    "instagram": 0,
    "google": 0
  },
  "timeline": ["..."]
}
`;

  const response = await getOpenAI().chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  });

  try {
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    return {
      monthlyGoals: { reach: 10000, engagement: 500, conversions: 50 },
      contentCalendar: [{ week: 1, topics: ['ترحيب', 'عروض'], posts: 7 }],
      expectedResults: { reach: 8000, engagement: 400, conversions: 30 },
      adBudgetAllocation: { facebook: 40, instagram: 30, google: 30 },
      timeline: ['الأسبوع الأول: إعداد المحتوى']
    };
  }
}

// ========================================
// 8. مساعد ذكي (Chatbot)
// ========================================

interface ChatRequest {
  message: string;
  context?: any;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export async function chatWithAI(request: ChatRequest | string, conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>) {
  // دعم الطريقة القديمة والجديدة
  let userMessage: string;
  let history: Array<{ role: 'user' | 'assistant'; content: string }> = [];
  
  if (typeof request === 'string') {
    // الطريقة القديمة
    userMessage = request;
    history = conversationHistory || [];
  } else {
    // الطريقة الجديدة
    userMessage = request.message;
    history = request.conversationHistory || [];
  }

  // Demo mode - return intelligent mock response based on user message
  if (process.env.DEMO_MODE === 'true') {
    const msg = userMessage.toLowerCase();
    
    // تحليل ذكي للرسالة
    if (msg.includes('محتوى') || msg.includes('منشور') || msg.includes('بوست') || msg.includes('اكتب')) {
      const contentTypes = ['منشور ترويجي', 'قصة نجاح', 'عرض خاص', 'نصيحة سفر'];
      const randomType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
      return `🎨 بالتأكيد! يمكنني مساعدتك في كتابة محتوى احترافي.\n\nإليك مثال على ${randomType}:\n\n"✨ اكتشف جمال أبها الساحر!\n\n🏨 نقدم لك إقامة فاخرة مع:\n• إطلالات خلابة على الجبال الخضراء\n• خدمة 5 نجوم على مدار الساعة\n• أنشطة سياحية متنوعة للعائلة\n\n📞 احجز الآن واستمتع بعروضنا الحصرية!\n\n#أبها_السياحية #السعودية #سياحة"\n\nهل تريد تعديل شيء معين؟`;
    }
    
    if (msg.includes('حملة') || msg.includes('إعلان') || msg.includes('ads') || msg.includes('تسويق')) {
      return `📊 ممتاز! دعني أساعدك في تحسين حملتك الإعلانية.\n\n✨ نصائح مهمة:\n\n1. **استهداف دقيق**: حدد جمهورك (العمر 25-45، مهتم بالسياحة)\n2. **الميزانية**: ابدأ بـ 50-100 ريال يومياً\n3. **المحتوى**: استخدم صور جذابة + نص قصير\n4. **التوقيت**: انشر بين 7-9 مساءً\n5. **Call to Action**: "احجز الآن" أو "اتصل بنا"\n\n💡 هل تريد مساعدة في إعداد حملة معينة على Facebook أو Instagram؟`;
    }
    
    if (msg.includes('تحليل') || msg.includes('إحصائيات') || msg.includes('أداء') || msg.includes('نتائج')) {
      return `📈 رائع! دعني أحلل الأداء معك.\n\n🎯 مؤشرات مهمة يجب مراقبتها:\n\n• **معدل التفاعل**: يجب أن يكون أعلى من 3%\n• **تكلفة النقرة**: الأمثل 2-4 ريال\n• **معدل التحويل**: استهدف 2-5%\n• **ROI**: يجب أن يكون إيجابي\n\n✅ توصيات:\n- اختبر أنواع محتوى مختلفة (A/B Testing)\n- ركز على المنصات الأفضل أداءً\n- حسّن الصفحات المقصودة\n\nهل تريد تحليل حملة معينة؟`;
    }
    
    if (msg.includes('instagram') || msg.includes('انستقرام') || msg.includes('انستا')) {
      return `📷 انستقرام منصة مثالية للتسويق السياحي!\n\n✨ استراتيجية النجاح:\n\n1. **الصور**: استخدم صور عالية الجودة للفنادق والمناظر\n2. **Stories**: انشر 3-5 قصص يومياً\n3. **Reels**: فيديوهات قصيرة (15-30 ثانية)\n4. **الهاشتاقات**: استخدم 10-15 هاشتاق مثل:\n   #أبها #السعودية #سياحة #فنادق\n5. **التوقيت**: 12 ظهراً، 7 مساءً، 9 مساءً\n\n💰 الإعلانات:\n- Stories Ads: للوعي السريع\n- Feed Ads: للوصول الواسع\n- Reels Ads: للانتشار الفيروسي\n\nهل تحتاج مساعدة في شيء محدد؟`;
    }
    
    if (msg.includes('facebook') || msg.includes('فيسبوك')) {
      return `📘 فيسبوك من أقوى المنصات للوصول!\n\n🎯 استراتيجية التسويق:\n\n**الإعلانات المدفوعة**:\n• Reach Campaigns: للوعي بالعلامة\n• Traffic Campaigns: لزيادة الزيارات\n• Conversion Campaigns: للحجوزات\n\n**الميزانية المقترحة**:\n- صغيرة: 30-50 ريال/يوم\n- متوسطة: 100-200 ريال/يوم\n- كبيرة: 300+ ريال/يوم\n\n**الاستهداف الذكي**:\n✅ اهتمامات: سفر، فنادق، سياحة\n✅ موقع: السعودية، الخليج\n✅ عمر: 25-55 سنة\n✅ سلوكيات: مسافرون متكررون\n\n💡 نصيحة: استخدم Lookalike Audience من عملائك الحاليين!`;
    }
    
    if (msg.includes('google') || msg.includes('جوجل') || msg.includes('seo')) {
      return `🔍 جوجل مفتاح الوصول للعملاء!\n\n**1. Google Ads:**\n• Search Ads: عند البحث عن "فنادق أبها"\n• Display Ads: إعلانات مرئية على المواقع\n• YouTube Ads: فيديوهات ترويجية\n\n**2. SEO (تحسين محركات البحث):**\n✅ الكلمات المفتاحية:\n- فنادق أبها\n- سياحة أبها\n- منتجعات أبها\n- رحلات العمرة من أبها\n\n✅ على صفحتك:\n- محتوى عربي غني\n- صور بأسماء واضحة\n- سرعة تحميل عالية\n- متوافق مع الجوال\n\n💰 تكلفة النقرة: 2-5 ريال\n📊 معدل تحويل جيد: 3-5%\n\nتحتاج مساعدة في إعداد حملة Google Ads؟`;
    }
    
    if (msg.includes('سعر') || msg.includes('تكلفة') || msg.includes('ميزانية') || msg.includes('كم')) {
      return `💰 دعني أساعدك في تخطيط الميزانية:\n\n**ميزانيات مقترحة حسب الحجم:**\n\n🔹 **ميزانية صغيرة** (1,500 - 3,000 ريال/شهر):\n- Facebook: 30-40 ريال/يوم\n- Instagram: 20-30 ريال/يوم\n- Google Ads: 300-500 ريال/شهر\n\n🔸 **ميزانية متوسطة** (5,000 - 10,000 ريال/شهر):\n- Facebook: 80-100 ريال/يوم\n- Instagram: 50-70 ريال/يوم\n- Google Ads: 1,000-1,500 ريال/شهر\n- Content Creation: 500 ريال\n\n🔶 **ميزانية كبيرة** (15,000+ ريال/شهر):\n- حملات متعددة على كل المنصات\n- Influencer Marketing\n- محتوى احترافي\n\n📊 العائد المتوقع (ROI): 200-400%\n\nما حجم ميزانيتك الشهرية؟`;
    }
    
    if (msg.includes('شكر') || msg.includes('ممتاز') || msg.includes('رائع') || msg.includes('جيد')) {
      return `😊 العفو! سعيد بمساعدتك!\n\n💡 هل تحتاج المزيد من المساعدة في:\n• إنشاء محتوى جديد؟\n• تحليل أداء حملاتك؟\n• استراتيجية تسويقية؟\n• اختيار المنصات المناسبة؟\n\nأنا هنا لمساعدتك! 🚀`;
    }
    
    if (msg.includes('مرحبا') || msg.includes('السلام') || msg.includes('هلا') || msg.includes('أهلا')) {
      return `مرحباً بك! 👋 أنا مساعد المسار الذكي 🤖\n\nأنا هنا لمساعدتك في:\n\n📱 **التسويق عبر السوشيال ميديا**\n• إنشاء محتوى احترافي\n• إدارة الحملات الإعلانية\n• تحليل الأداء والإحصائيات\n\n🎯 **الاستراتيجيات التسويقية**\n• خطط التسويق الرقمي\n• استهداف الجمهور المناسب\n• تحسين ROI\n\n💡 **الاستشارات**\n• أفضل المنصات لعملك\n• تحسين المحتوى\n• زيادة التفاعل\n\nكيف يمكنني مساعدتك اليوم؟ 😊`;
    }
    
    // رد افتراضي ذكي
    return `أفهم سؤالك 🤔\n\nيمكنني مساعدتك في عدة مجالات:\n\n✨ **إنشاء المحتوى**: منشورات، صور، فيديوهات\n📊 **الحملات الإعلانية**: Facebook, Instagram, Google\n📈 **التحليل والتقارير**: قياس الأداء والنتائج\n🎯 **الاستراتيجيات**: خطط تسويقية فعالة\n💰 **الميزانيات**: تخطيط وتحسين الإنفاق\n\nهل يمكنك توضيح ما تحتاجه بالتحديد؟ سأكون سعيداً بمساعدتك! 😊\n\n💡 مثال: "ساعدني في كتابة منشور عن فندقي" أو "كيف أحسن أداء حملتي على انستقرام؟"`;
  }

  const messages = [
    {
      role: 'system' as const,
      content: `أنت مساعد ذكي متخصص في التسويق الرقمي والسياحة في السعودية. 
      اسمك "مساعد المسار AI". 
      مهمتك مساعدة المستخدم في:
      - إنشاء محتوى تسويقي
      - تحسين الحملات الإعلانية
      - تحليل البيانات
      - تقديم استشارات تسويقية
      - الإجابة عن الأسئلة المتعلقة بالتسويق الرقمي
      
      كن ودوداً، محترفاً، ومفيداً. اكتب بالعربية بشكل أساسي.`,
    },
    ...history,
    {
      role: 'user' as const,
      content: userMessage,
    },
  ];

  try {
    const response = await getOpenAI().chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || '';
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to get AI response: ' + error.message);
  }
}

// ========================================
// 9. توليد تقرير شامل
// ========================================

interface ReportRequest {
  clientName: string;
  period: string;
  metrics: {
    reach: number;
    engagement: number;
    conversions: number;
    spent: number;
    roi: number;
  };
  campaigns: Array<{
    name: string;
    platform: string;
    performance: string;
  }>;
}

export async function generateReport(request: ReportRequest) {
  const prompt = `
أنت محلل بيانات تسويقية محترف.

معلومات التقرير:
- العميل: ${request.clientName}
- الفترة: ${request.period}

المقاييس:
- الوصول: ${request.metrics.reach.toLocaleString()}
- التفاعل: ${request.metrics.engagement.toLocaleString()}
- التحويلات: ${request.metrics.conversions}
- المصروف: ${request.metrics.spent} ريال
- ROI: ${request.metrics.roi}%

الحملات:
${request.campaigns.map(c => `- ${c.name} (${c.platform}): ${c.performance}`).join('\n')}

المطلوب:
قم بإنشاء تقرير شامل يتضمن:
1. ملخص تنفيذي
2. تحليل الأداء
3. نقاط القوة والضعف
4. التوصيات للفترة القادمة
5. توقعات النمو

اكتب التقرير بشكل احترافي باللغة العربية.
`;

  const response = await getOpenAI().chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
    max_tokens: 2000,
  });

  return response.choices[0].message.content || '';
}
