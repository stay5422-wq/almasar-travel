import { NextRequest, NextResponse } from 'next/server';
import { generateReport } from '@/lib/ai-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      clientName,
      reportType,
      startDate,
      endDate,
      metrics,
      platforms,
    } = body;

    // التحقق من المدخلات
    if (!clientName || !reportType || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName, reportType, startDate, endDate' },
        { status: 400 }
      );
    }

    // توليد التقرير
    const report = await generateReport({
      clientName,
      period: `${startDate} to ${endDate}`,
      metrics: metrics || {
        reach: 0,
        engagement: 0,
        conversions: 0,
        spent: 0,
        roi: 0,
      },
      campaigns: platforms?.map((platform: string) => ({
        name: `${platform} Campaign`,
        platform,
        status: 'active' as const,
        performance: 'good' as const,
      })) || [],
    });

    return NextResponse.json({
      success: true,
      report,
      metadata: {
        clientName,
        reportType,
        period: `${startDate} - ${endDate}`,
        generatedAt: new Date().toISOString(),
      },
    });

  } catch (error: any) {
    console.error('Report Generation Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate report',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
