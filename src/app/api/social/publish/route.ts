import { NextRequest, NextResponse } from 'next/server';

interface PublishRequest {
  platform: string;
  content: string;
  media?: string[];
  pageId?: string;
  accessToken?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PublishRequest = await request.json();
    const { platform, content, media, pageId, accessToken } = body;

    if (!platform || !content) {
      return NextResponse.json(
        { error: 'Platform and content are required' },
        { status: 400 }
      );
    }

    // Check Demo Mode
    if (process.env.DEMO_MODE === 'true') {
      console.log('📱 [DEMO] Publishing to:', platform);
      console.log('📝 Content:', content.substring(0, 100));
      
      return NextResponse.json({
        success: true,
        postId: `demo_${Date.now()}`,
        url: `https://facebook.com/demo/${Date.now()}`,
        message: 'تم النشر بنجاح في الوضع التجريبي',
        mode: 'demo',
        platform,
      });
    }

    // Real Facebook Publishing
    if (platform === 'facebook') {
      if (!pageId || !accessToken) {
        return NextResponse.json(
          { error: 'Facebook Page ID and Access Token are required' },
          { status: 400 }
        );
      }

      // Publish to Facebook
      const fbEndpoint = `https://graph.facebook.com/v18.0/${pageId}/feed`;
      
      const fbResponse = await fetch(fbEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          access_token: accessToken,
        }),
      });

      if (!fbResponse.ok) {
        const error = await fbResponse.json();
        console.error('Facebook API Error:', error);
        return NextResponse.json(
          { 
            error: 'فشل النشر على فيسبوك',
            details: error.error?.message || 'Unknown error'
          },
          { status: fbResponse.status }
        );
      }

      const fbData = await fbResponse.json();
      const postUrl = `https://facebook.com/${fbData.id}`;

      return NextResponse.json({
        success: true,
        postId: fbData.id,
        url: postUrl,
        message: 'تم النشر على فيسبوك بنجاح! 🎉',
        platform: 'facebook',
      });
    }

    // Instagram (future)
    if (platform === 'instagram') {
      return NextResponse.json(
        { error: 'Instagram publishing coming soon' },
        { status: 501 }
      );
    }

    // Twitter/X (future)
    if (platform === 'twitter') {
      return NextResponse.json(
        { error: 'Twitter publishing coming soon' },
        { status: 501 }
      );
    }

    return NextResponse.json(
      { error: 'Unsupported platform' },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Publishing Error:', error);
    return NextResponse.json(
      { error: 'Failed to publish', details: error.message },
      { status: 500 }
    );
  }
}
