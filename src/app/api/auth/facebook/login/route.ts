import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'ar';
  
  // Get Facebook App credentials from environment
  const appId = process.env.FACEBOOK_APP_ID;
  const redirectUri = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  
  if (!appId) {
    return NextResponse.json(
      { error: 'Facebook App ID not configured' },
      { status: 500 }
    );
  }
  
  // Facebook OAuth URL with required permissions for posting
  const permissions = [
    'public_profile',
    'pages_show_list',
    'pages_read_engagement'
  ].join(',');
  
  const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
    `client_id=${appId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri + '/api/auth/callback/facebook')}` +
    `&scope=${encodeURIComponent(permissions)}` +
    `&state=${locale}` +
    `&response_type=code`;
  
  // Redirect to Facebook OAuth
  return NextResponse.redirect(facebookAuthUrl);
}
