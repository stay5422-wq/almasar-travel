import { NextRequest, NextResponse } from 'next/server';
import { analyzeSEO } from '@/lib/ai-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      clientName,
      industry,
      targetAudience,
      competitors,
      currentKeywords,
    } = body;

    // التحقق من المدخلات
    if (!clientName || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName and industry' },
        { status: 400 }
      );
    }

    // تحليل SEO
    const analysis = await analyzeSEO({
      clientName,
      industry,
      targetAudience,
      competitors: competitors || [],
      currentKeywords: currentKeywords || [],
    });

    return NextResponse.json({
      success: true,
      analysis,
      metadata: {
        clientName,
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
