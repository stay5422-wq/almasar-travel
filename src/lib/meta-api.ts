/**
 * Facebook & Instagram API Integration
 * Meta Graph API v18.0
 */

const GRAPH_API_VERSION = 'v18.0';
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

interface FacebookPagePost {
  message: string;
  link?: string;
  published?: boolean;
  scheduled_publish_time?: number;
}

interface InstagramMediaPost {
  image_url?: string;
  video_url?: string;
  caption?: string;
  media_type?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
}

export class MetaAPI {
  private accessToken: string;
  private pageId?: string;
  private instagramAccountId?: string;

  constructor(
    accessToken: string,
    pageId?: string,
    instagramAccountId?: string
  ) {
    this.accessToken = accessToken;
    this.pageId = pageId;
    this.instagramAccountId = instagramAccountId;
  }

  // ========================================
  // Facebook Pages API
  // ========================================

  /**
   * احصل على صفحات Facebook المرتبطة بالحساب
   */
  async getPages() {
    const response = await fetch(
      `${GRAPH_API_BASE}/me/accounts?access_token=${this.accessToken}`
    );
    return await response.json();
  }

  /**
   * نشر منشور على صفحة Facebook
   */
  async publishFacebookPost(post: FacebookPagePost) {
    if (!this.pageId) throw new Error('Page ID is required');

    const response = await fetch(
      `${GRAPH_API_BASE}/${this.pageId}/feed`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: post.message,
          link: post.link,
          published: post.published ?? true,
          scheduled_publish_time: post.scheduled_publish_time,
          access_token: this.accessToken,
        }),
      }
    );

    return await response.json();
  }

  /**
   * احصل على إحصائيات صفحة Facebook
   */
  async getPageInsights(metrics: string[] = [
    'page_impressions',
    'page_engaged_users',
    'page_post_engagements',
    'page_fans',
  ]) {
    if (!this.pageId) throw new Error('Page ID is required');

    const metricsParam = metrics.join(',');
    const response = await fetch(
      `${GRAPH_API_BASE}/${this.pageId}/insights?metric=${metricsParam}&access_token=${this.accessToken}`
    );

    return await response.json();
  }

  /**
   * احصل على منشورات الصفحة
   */
  async getPagePosts(limit: number = 25) {
    if (!this.pageId) throw new Error('Page ID is required');

    const response = await fetch(
      `${GRAPH_API_BASE}/${this.pageId}/posts?limit=${limit}&fields=id,message,created_time,likes.summary(true),comments.summary(true),shares&access_token=${this.accessToken}`
    );

    return await response.json();
  }

  // ========================================
  // Instagram API
  // ========================================

  /**
   * نشر صورة على Instagram
   */
  async publishInstagramPost(media: InstagramMediaPost) {
    if (!this.instagramAccountId) throw new Error('Instagram Account ID is required');

    // الخطوة 1: إنشاء media container
    const containerResponse = await fetch(
      `${GRAPH_API_BASE}/${this.instagramAccountId}/media`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: media.image_url,
          video_url: media.video_url,
          caption: media.caption,
          media_type: media.media_type || 'IMAGE',
          access_token: this.accessToken,
        }),
      }
    );

    const containerData = await containerResponse.json();
    const creationId = containerData.id;

    // الخطوة 2: نشر المحتوى
    const publishResponse = await fetch(
      `${GRAPH_API_BASE}/${this.instagramAccountId}/media_publish`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creation_id: creationId,
          access_token: this.accessToken,
        }),
      }
    );

    return await publishResponse.json();
  }

  /**
   * احصل على إحصائيات Instagram
   */
  async getInstagramInsights(metrics: string[] = [
    'impressions',
    'reach',
    'engagement',
    'follower_count',
  ]) {
    if (!this.instagramAccountId) throw new Error('Instagram Account ID is required');

    const metricsParam = metrics.join(',');
    const response = await fetch(
      `${GRAPH_API_BASE}/${this.instagramAccountId}/insights?metric=${metricsParam}&period=day&access_token=${this.accessToken}`
    );

    return await response.json();
  }

  /**
   * احصل على منشورات Instagram
   */
  async getInstagramMedia(limit: number = 25) {
    if (!this.instagramAccountId) throw new Error('Instagram Account ID is required');

    const response = await fetch(
      `${GRAPH_API_BASE}/${this.instagramAccountId}/media?limit=${limit}&fields=id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&access_token=${this.accessToken}`
    );

    return await response.json();
  }

  // ========================================
  // Facebook Ads API
  // ========================================

  /**
   * احصل على حملات الإعلانات
   */
  async getAdCampaigns(adAccountId: string) {
    const response = await fetch(
      `${GRAPH_API_BASE}/act_${adAccountId}/campaigns?fields=id,name,objective,status,daily_budget,lifetime_budget,start_time,stop_time&access_token=${this.accessToken}`
    );

    return await response.json();
  }

  /**
   * احصل على إحصائيات الحملة الإعلانية
   */
  async getAdInsights(campaignId: string) {
    const response = await fetch(
      `${GRAPH_API_BASE}/${campaignId}/insights?fields=impressions,clicks,spend,cpc,cpm,ctr,reach,frequency&access_token=${this.accessToken}`
    );

    return await response.json();
  }

  /**
   * إنشاء حملة إعلانية جديدة
   */
  async createAdCampaign(adAccountId: string, campaignData: {
    name: string;
    objective: string;
    status?: string;
    daily_budget?: number;
  }) {
    const response = await fetch(
      `${GRAPH_API_BASE}/act_${adAccountId}/campaigns`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...campaignData,
          status: campaignData.status || 'PAUSED',
          access_token: this.accessToken,
        }),
      }
    );

    return await response.json();
  }
}

// مثال على الاستخدام:
// const meta = new MetaAPI(
//   process.env.FACEBOOK_ACCESS_TOKEN!,
//   'YOUR_PAGE_ID',
//   'YOUR_INSTAGRAM_ACCOUNT_ID'
// );
// 
// // نشر على Facebook
// await meta.publishFacebookPost({
//   message: 'مرحباً من منصة المسار للتسويق الرقمي!',
//   link: 'https://example.com'
// });
//
// // نشر على Instagram
// await meta.publishInstagramPost({
//   image_url: 'https://example.com/image.jpg',
//   caption: 'عروض مميزة على فنادق أبها!'
// });
