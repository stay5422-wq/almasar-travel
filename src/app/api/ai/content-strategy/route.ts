import { NextRequest, NextResponse } from 'next/server';
import { createContentStrategy } from '@/lib/ai-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      clientName,
      clientType,
      platforms,
      goals,
      targetAudience,
      duration,
    } = body;

    // التحقق من المدخلات
    if (!clientName || !clientType || !platforms || platforms.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName, clientType, platforms' },
        { status: 400 }
      );
    }

    // إنشاء استراتيجية المحتوى
    const strategy = await createContentStrategy({
      clientName,
      clientType,
      goals: goals || ['زيادة الوعي بالعلامة التجارية', 'زيادة التفاعل'],
      targetAudience: targetAudience || 'السياح والزوار في أبها',
      duration: duration || '30',
    } as any);

    return NextResponse.json({
      success: true,
      strategy,
      metadata: {
        clientName,
        platforms,
        duration: duration || '30',
        createdAt: new Date().toISOString(),
      },
    });

  } catch (error: any) {
    console.error('Content Strategy Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create content strategy',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
