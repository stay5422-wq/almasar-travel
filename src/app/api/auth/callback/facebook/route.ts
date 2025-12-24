import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state') || 'ar';
  const error = searchParams.get('error');
  
  // Check if user denied permission
  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/${state}/settings/accounts?error=access_denied`
    );
  }
  
  if (!code) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/${state}/settings/accounts?error=no_code`
    );
  }
  
  try {
    const appId = process.env.FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    
    if (!appId || !appSecret) {
      throw new Error('Facebook credentials not configured');
    }
    
    // Exchange code for access token
    const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?` +
      `client_id=${appId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri + '/api/auth/callback/facebook')}` +
      `&client_secret=${appSecret}` +
      `&code=${code}`;
    
    const tokenResponse = await fetch(tokenUrl);
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      console.error('Facebook token error:', tokenData.error);
      return NextResponse.redirect(
        `${redirectUri}/${state}/settings/accounts?error=token_exchange_failed`
      );
    }
    
    const accessToken = tokenData.access_token;
    
    // Get user info
    const userInfoUrl = `https://graph.facebook.com/v18.0/me?` +
      `fields=id,name,email,picture` +
      `&access_token=${accessToken}`;
    
    const userInfoResponse = await fetch(userInfoUrl);
    const userData = await userInfoResponse.json();
    
    if (userData.error) {
      console.error('Facebook user info error:', userData.error);
      return NextResponse.redirect(
        `${redirectUri}/${state}/settings/accounts?error=user_info_failed`
      );
    }
    
    // Get user's pages
    const pagesUrl = `https://graph.facebook.com/v18.0/me/accounts?` +
      `access_token=${accessToken}`;
    
    const pagesResponse = await fetch(pagesUrl);
    const pagesData = await pagesResponse.json();
    
    // Store the tokens and user data
    // TODO: Save to database (Supabase/PostgreSQL)
    // For now, we'll pass the data to frontend to store in localStorage
    
    const accountData = {
      userId: userData.id,
      name: userData.name,
      email: userData.email,
      picture: userData.picture?.data?.url,
      accessToken: accessToken,
      pages: pagesData.data || [],
      platform: 'facebook',
      connectedAt: new Date().toISOString(),
    };
    
    // Encode FULL data including tokens to pass to frontend
    const encodedData = encodeURIComponent(JSON.stringify(accountData));
    
    // Redirect back to accounts page with success
    return NextResponse.redirect(
      `${redirectUri}/${state}/settings/accounts?success=true&fbdata=${encodedData}`
    );
    
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/${state}/settings/accounts?error=server_error`
    );
  }
}
