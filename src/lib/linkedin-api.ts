/**
 * LinkedIn API Integration
 * LinkedIn Marketing API
 */

const LINKEDIN_API_BASE = 'https://api.linkedin.com/v2';

interface LinkedInPost {
  author: string; // URN format: urn:li:organization:123456
  lifecycleState: 'PUBLISHED' | 'DRAFT';
  specificContent: {
    'com.linkedin.ugc.ShareContent': {
      shareCommentary: {
        text: string;
      };
      shareMediaCategory: 'NONE' | 'IMAGE' | 'VIDEO' | 'ARTICLE';
      media?: Array<{
        status: 'READY';
        description?: {
          text: string;
        };
        media: string; // Media URN
        title?: {
          text: string;
        };
      }>;
    };
  };
  visibility: {
    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' | 'CONNECTIONS';
  };
}

export class LinkedInAPI {
  private accessToken: string;
  private organizationId?: string;

  constructor(accessToken: string, organizationId?: string) {
    this.accessToken = accessToken;
    this.organizationId = organizationId;
  }

  /**
   * الحصول على معلومات المنظمة
   */
  async getOrganization(orgId: string) {
    const response = await fetch(
      `${LINKEDIN_API_BASE}/organizations/${orgId}`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );

    return await response.json();
  }

  /**
   * نشر محتوى على LinkedIn
   */
  async createPost(postData: {
    text: string;
    mediaCategory?: 'NONE' | 'IMAGE' | 'VIDEO' | 'ARTICLE';
    visibility?: 'PUBLIC' | 'CONNECTIONS';
  }) {
    if (!this.organizationId) throw new Error('Organization ID is required');

    const post: LinkedInPost = {
      author: `urn:li:organization:${this.organizationId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: postData.text,
          },
          shareMediaCategory: postData.mediaCategory || 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': postData.visibility || 'PUBLIC',
      },
    };

    const response = await fetch(`${LINKEDIN_API_BASE}/ugcPosts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`LinkedIn API Error: ${JSON.stringify(error)}`);
    }

    return await response.json();
  }

  /**
   * رفع صورة
   */
  async uploadImage(imageData: Buffer, orgId: string) {
    // الخطوة 1: تسجيل الصورة
    const registerResponse = await fetch(
      `${LINKEDIN_API_BASE}/assets?action=registerUpload`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
        body: JSON.stringify({
          registerUploadRequest: {
            recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
            owner: `urn:li:organization:${orgId}`,
            serviceRelationships: [
              {
                relationshipType: 'OWNER',
                identifier: 'urn:li:userGeneratedContent',
              },
            ],
          },
        }),
      }
    );

    const registerData = await registerResponse.json();
    const uploadUrl = registerData.value.uploadMechanism[
      'com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'
    ].uploadUrl;
    const asset = registerData.value.asset;

    // الخطوة 2: رفع الصورة
    await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/octet-stream',
      },
      body: imageData as any,
    });

    return asset;
  }

  /**
   * الحصول على إحصائيات المنشور
   */
  async getPostStatistics(postId: string) {
    const response = await fetch(
      `${LINKEDIN_API_BASE}/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:${this.organizationId}&shares=List(${postId})`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );

    return await response.json();
  }

  /**
   * الحصول على متابعين المنظمة
   */
  async getFollowers(orgId: string) {
    const response = await fetch(
      `${LINKEDIN_API_BASE}/networkSizes/urn:li:organization:${orgId}?edgeType=CompanyFollowedByMember`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );

    return await response.json();
  }

  /**
   * الحصول على إحصائيات الصفحة
   */
  async getPageStatistics(orgId: string, timeRange: {
    start: number; // timestamp in milliseconds
    end: number;
  }) {
    const response = await fetch(
      `${LINKEDIN_API_BASE}/organizationPageStatistics?q=organization&organization=urn:li:organization:${orgId}&timeIntervals.timeRange.start=${timeRange.start}&timeIntervals.timeRange.end=${timeRange.end}`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );

    return await response.json();
  }

  /**
   * البحث عن شركات
   */
  async searchCompanies(keywords: string) {
    const response = await fetch(
      `${LINKEDIN_API_BASE}/search?q=companiesV2&keywords=${encodeURIComponent(keywords)}`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );

    return await response.json();
  }
}

// مثال على الاستخدام:
// const linkedin = new LinkedInAPI(
//   process.env.LINKEDIN_ACCESS_TOKEN!,
//   'YOUR_ORG_ID'
// );
// 
// // نشر محتوى
// await linkedin.createPost({
//   text: 'نحن فخورون بتقديم خدماتنا للتسويق الرقمي في أبها! 🚀 #التسويق_الرقمي #أبها',
//   visibility: 'PUBLIC'
// });
//
// // الحصول على المتابعين
// const followers = await linkedin.getFollowers('YOUR_ORG_ID');
