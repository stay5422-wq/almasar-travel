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
      reportType,
      startDate,
      endDate,
      metrics: metrics || {},
      platforms: platforms || ['facebook', 'instagram', 'twitter'],
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
