import { NextRequest, NextResponse } from 'next/server';
import { analyzeSEO } from '@/lib/ai-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      keyword,
      industry,
      targetAudience,
      competitors,
      currentPosition,
    } = body;

    // التحقق من المدخلات
    if (!keyword || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields: keyword and industry' },
        { status: 400 }
      );
    }

    // تحليل SEO
    const analysis = await analyzeSEO({
      keyword,
      currentPosition,
      competitors: competitors || [],
      targetLocation: 'Saudi Arabia',
    });

    return NextResponse.json({
      success: true,
      analysis,
      metadata: {
        keyword,
        industry,
        analyzedAt: new Date().toISOString(),
      },
    });

  } catch (error: any) {
    console.error('SEO Analysis Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze SEO',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
