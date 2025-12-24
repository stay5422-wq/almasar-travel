import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/ai-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      clientName,
      clientType,
      platform,
      topic,
      tone,
      language,
      includeHashtags,
      includeEmojis,
    } = body;

    // التحقق من المدخلات
    if (!clientName || !clientType || !platform) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // توليد المحتوى
    const content = await generateContent({
      clientName,
      clientType,
      platform,
      topic,
      tone,
      language,
      includeHashtags,
      includeEmojis,
    });

    return NextResponse.json({
      success: true,
      content,
      metadata: {
        clientName,
        platform,
        generatedAt: new Date().toISOString(),
      },
    });

  } catch (error: any) {
    console.error('AI Content Generation Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate content',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
