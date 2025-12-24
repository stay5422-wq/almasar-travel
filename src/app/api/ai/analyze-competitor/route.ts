import { NextRequest, NextResponse } from 'next/server';
import { analyzeCompetitor } from '@/lib/ai-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      clientName,
      industry,
      competitors,
      analysisType,
    } = body;

    // التحقق من المدخلات
    if (!clientName || !industry || !competitors || competitors.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName, industry, competitors' },
        { status: 400 }
      );
    }

    // تحليل المنافسين
    const analysis = await analyzeCompetitor({
      industry,
      competitors,
      analysisType: analysisType || 'comprehensive',
    } as any);

    return NextResponse.json({
      success: true,
      analysis,
      metadata: {
        clientName,
        competitorsCount: competitors.length,
        analyzedAt: new Date().toISOString(),
      },
    });

  } catch (error: any) {
    console.error('Competitor Analysis Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze competitors',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
