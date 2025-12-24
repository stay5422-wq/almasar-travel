/**
 * Twitter (X) API Integration
 * Twitter API v2
 */

const TWITTER_API_BASE = 'https://api.twitter.com/2';

interface TweetData {
  text: string;
  media?: {
    media_ids: string[];
  };
  poll?: {
    options: string[];
    duration_minutes: number;
  };
}

export class TwitterAPI {
  private bearerToken: string;
  private accessToken?: string;
  private accessTokenSecret?: string;

  constructor(
    bearerToken: string,
    accessToken?: string,
    accessTokenSecret?: string
  ) {
    this.bearerToken = bearerToken;
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
  }

  /**
   * نشر تغريدة جديدة
   */
  async createTweet(tweet: TweetData) {
    const response = await fetch(`${TWITTER_API_BASE}/tweets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweet),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Twitter API Error: ${JSON.stringify(error)}`);
    }

    return await response.json();
  }

  /**
   * حذف تغريدة
   */
  async deleteTweet(tweetId: string) {
    const response = await fetch(`${TWITTER_API_BASE}/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.bearerToken}`,
      },
    });

    return await response.json();
  }

  /**
   * الحصول على معلومات المستخدم
   */
  async getUserProfile(username: string) {
    const response = await fetch(
      `${TWITTER_API_BASE}/users/by/username/${username}?user.fields=description,created_at,public_metrics,profile_image_url`,
      {
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
        },
      }
    );

    return await response.json();
  }

  /**
   * الحصول على تغريدات المستخدم
   */
  async getUserTweets(userId: string, maxResults: number = 10) {
    const response = await fetch(
      `${TWITTER_API_BASE}/users/${userId}/tweets?max_results=${maxResults}&tweet.fields=created_at,public_metrics,attachments&expansions=attachments.media_keys&media.fields=url`,
      {
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
        },
      }
    );

    return await response.json();
  }

  /**
   * البحث عن تغريدات
   */
  async searchTweets(query: string, maxResults: number = 10) {
    const response = await fetch(
      `${TWITTER_API_BASE}/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=${maxResults}&tweet.fields=created_at,public_metrics`,
      {
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
        },
      }
    );

    return await response.json();
  }

  /**
   * الحصول على إحصائيات التغريدة
   */
  async getTweetMetrics(tweetId: string) {
    const response = await fetch(
      `${TWITTER_API_BASE}/tweets/${tweetId}?tweet.fields=public_metrics,non_public_metrics,organic_metrics`,
      {
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
        },
      }
    );

    return await response.json();
  }

  /**
   * رفع صورة
   */
  async uploadMedia(imageUrl: string) {
    // Note: This requires Twitter API v1.1 for media upload
    const mediaUploadUrl = 'https://upload.twitter.com/1.1/media/upload.json';
    
    // يجب تحميل الصورة أولاً ثم الحصول على media_id
    // هذا يتطلب OAuth 1.0a authentication
    
    throw new Error('Media upload requires OAuth 1.0a - implement this based on your auth flow');
  }

  /**
   * الحصول على إحصائيات الحساب
   */
  async getAccountMetrics(userId: string) {
    const response = await fetch(
      `${TWITTER_API_BASE}/users/${userId}?user.fields=public_metrics`,
      {
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
        },
      }
    );

    const data = await response.json();
    return data.data?.public_metrics || null;
  }
}

// مثال على الاستخدام:
// const twitter = new TwitterAPI(process.env.TWITTER_BEARER_TOKEN!);
// 
// // نشر تغريدة
// await twitter.createTweet({
//   text: 'عروض مميزة على فنادق أبها! 🏨✨ #السياحة_السعودية #أبها'
// });
//
// // البحث عن تغريدات
// const tweets = await twitter.searchTweets('فنادق أبها');
