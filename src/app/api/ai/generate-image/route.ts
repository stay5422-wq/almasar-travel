import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/ai-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      prompt,
      style,
      size,
    } = body;

    // التحقق من المدخلات
    if (!prompt) {
      return NextResponse.json(
        { error: 'Missing required field: prompt' },
        { status: 400 }
      );
    }

    // توليد الصورة
    const result = await generateImage(prompt);

    return NextResponse.json({
      success: true,
      imageUrl: result,
      metadata: {
        prompt,
        style: style || 'professional',
        size: size || '1024x1024',
        generatedAt: new Date().toISOString(),
      },
    });

  } catch (error: any) {
    console.error('Image Generation Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate image',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
