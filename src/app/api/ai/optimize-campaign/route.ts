import { NextRequest, NextResponse } from 'next/server';
import { optimizeCampaign } from '@/lib/ai-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      campaignName,
      platform,
      budget,
      currentMetrics,
    } = body;

    // التحقق من المدخلات
    if (!campaignName || !platform || !budget || !currentMetrics) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // تحليل وتحسين الحملة
    const optimization = await optimizeCampaign({
      campaignName,
      platform,
      budget,
      currentMetrics,
    });

    return NextResponse.json({
      success: true,
      optimization,
      metadata: {
        campaignName,
        platform,
        analyzedAt: new Date().toISOString(),
      },
    });

  } catch (error: any) {
    console.error('Campaign Optimization Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to optimize campaign',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
