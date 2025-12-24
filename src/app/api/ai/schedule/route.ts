import { NextRequest, NextResponse } from 'next/server';
import { suggestBestTime } from '@/lib/ai-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      clientName,
      platform,
      targetAudience,
      contentType,
      historicalData,
    } = body;

    // التحقق من المدخلات
    if (!clientName || !platform || !targetAudience) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName, platform, targetAudience' },
        { status: 400 }
      );
    }

    // اقتراح أفضل وقت للنشر
    const suggestion = await suggestBestTime({
      platform,
      targetAudience,
      contentType: (contentType || 'text') as 'text' | 'image' | 'video',
      timezone: 'Asia/Riyadh',
    });

    return NextResponse.json({
      success: true,
      suggestion,
      metadata: {
        clientName,
        platform,
        suggestedAt: new Date().toISOString(),
      },
    });

  } catch (error: any) {
    console.error('Scheduling Suggestion Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to suggest posting time',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
