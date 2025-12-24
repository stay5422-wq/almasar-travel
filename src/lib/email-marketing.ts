/**
 * Email Marketing Integration (Mailchimp / SendGrid)
 * التسويق عبر البريد الإلكتروني
 */

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  previewText: string;
  fromName: string;
  fromEmail: string;
  replyTo: string;
  status: 'draft' | 'scheduled' | 'sent' | 'paused';
  recipients: {
    listId: string;
    segmentId?: string;
    count: number;
  };
  content: {
    html: string;
    text: string;
  };
  scheduledTime?: string;
  sentTime?: string;
  stats?: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
    openRate: number;
    clickRate: number;
  };
}

export interface EmailList {
  id: string;
  name: string;
  subscriberCount: number;
  unsubscribeCount: number;
  cleanedCount: number;
  averageOpenRate: number;
  averageClickRate: number;
}

export interface EmailSubscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  tags?: string[];
  customFields?: Record<string, any>;
  status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
  signupDate: string;
  lastActivity?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  html: string;
}

export class EmailMarketingAPI {
  private provider: 'mailchimp' | 'sendgrid';
  private apiKey: string;
  private baseUrl: string;

  constructor(provider: 'mailchimp' | 'sendgrid' = 'mailchimp') {
    this.provider = provider;
    
    if (provider === 'mailchimp') {
      this.apiKey = process.env.MAILCHIMP_API_KEY || '';
      this.baseUrl = process.env.MAILCHIMP_SERVER_PREFIX 
        ? `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0`
        : '';
    } else {
      this.apiKey = process.env.SENDGRID_API_KEY || '';
      this.baseUrl = 'https://api.sendgrid.com/v3';
    }
  }

  /**
   * إرسال طلب إلى API
   */
  private async makeRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
  ): Promise<any> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.provider === 'mailchimp') {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    } else {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Email Marketing API error: ${error}`);
    }

    return response.json();
  }

  /**
   * الحصول على جميع القوائم البريدية
   */
  async getLists(): Promise<EmailList[]> {
    try {
      if (this.provider === 'mailchimp') {
        const data = await this.makeRequest('/lists');
        
        return data.lists?.map((list: any) => ({
          id: list.id,
          name: list.name,
          subscriberCount: list.stats.member_count,
          unsubscribeCount: list.stats.unsubscribe_count,
          cleanedCount: list.stats.cleaned_count,
          averageOpenRate: list.stats.open_rate,
          averageClickRate: list.stats.click_rate,
        })) || [];
      }
      
      // SendGrid implementation
      return [];
    } catch (error) {
      console.error('Error fetching email lists:', error);
      throw error;
    }
  }

  /**
   * إنشاء قائمة بريدية جديدة
   */
  async createList(params: {
    name: string;
    company: string;
    address: string;
    city: string;
    country: string;
    permissionReminder: string;
  }): Promise<{ id: string; success: boolean }> {
    try {
      if (this.provider === 'mailchimp') {
        const data = await this.makeRequest('/lists', 'POST', {
          name: params.name,
          contact: {
            company: params.company,
            address1: params.address,
            city: params.city,
            country: params.country,
          },
          permission_reminder: params.permissionReminder,
          email_type_option: true,
        });

        return {
          id: data.id,
          success: true,
        };
      }
      
      return { id: '', success: false };
    } catch (error) {
      console.error('Error creating email list:', error);
      throw error;
    }
  }

  /**
   * إضافة مشترك للقائمة
   */
  async addSubscriber(
    listId: string,
    subscriber: EmailSubscriber
  ): Promise<{ success: boolean }> {
    try {
      if (this.provider === 'mailchimp') {
        await this.makeRequest(`/lists/${listId}/members`, 'POST', {
          email_address: subscriber.email,
          status: subscriber.status,
          merge_fields: {
            FNAME: subscriber.firstName || '',
            LNAME: subscriber.lastName || '',
            PHONE: subscriber.phone || '',
          },
          tags: subscriber.tags || [],
        });

        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Error adding subscriber:', error);
      throw error;
    }
  }

  /**
   * الحصول على جميع الحملات
   */
  async getCampaigns(): Promise<EmailCampaign[]> {
    try {
      if (this.provider === 'mailchimp') {
        const data = await this.makeRequest('/campaigns?count=100');
        
        return data.campaigns?.map((campaign: any) => ({
          id: campaign.id,
          name: campaign.settings.title,
          subject: campaign.settings.subject_line,
          previewText: campaign.settings.preview_text,
          fromName: campaign.settings.from_name,
          fromEmail: campaign.settings.reply_to,
          replyTo: campaign.settings.reply_to,
          status: campaign.status,
          recipients: {
            listId: campaign.recipients.list_id,
            count: campaign.recipients.recipient_count,
          },
          content: {
            html: '',
            text: '',
          },
          sentTime: campaign.send_time,
          stats: campaign.report_summary ? {
            sent: campaign.emails_sent,
            delivered: campaign.report_summary.unique_opens,
            opened: campaign.report_summary.opens,
            clicked: campaign.report_summary.clicks,
            bounced: 0,
            unsubscribed: campaign.report_summary.unsubscribed,
            openRate: campaign.report_summary.open_rate,
            clickRate: campaign.report_summary.click_rate,
          } : undefined,
        })) || [];
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  }

  /**
   * إنشاء حملة بريدية
   */
  async createCampaign(params: {
    name: string;
    subject: string;
    previewText: string;
    fromName: string;
    fromEmail: string;
    replyTo: string;
    listId: string;
    htmlContent: string;
    textContent?: string;
  }): Promise<{ id: string; success: boolean }> {
    try {
      if (this.provider === 'mailchimp') {
        // إنشاء الحملة
        const campaign = await this.makeRequest('/campaigns', 'POST', {
          type: 'regular',
          recipients: {
            list_id: params.listId,
          },
          settings: {
            subject_line: params.subject,
            preview_text: params.previewText,
            title: params.name,
            from_name: params.fromName,
            reply_to: params.replyTo,
          },
        });

        // إضافة المحتوى
        await this.makeRequest(`/campaigns/${campaign.id}/content`, 'PUT', {
          html: params.htmlContent,
          plain_text: params.textContent,
        });

        return {
          id: campaign.id,
          success: true,
        };
      }
      
      return { id: '', success: false };
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  /**
   * إرسال حملة
   */
  async sendCampaign(campaignId: string): Promise<{ success: boolean }> {
    try {
      if (this.provider === 'mailchimp') {
        await this.makeRequest(`/campaigns/${campaignId}/actions/send`, 'POST');
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Error sending campaign:', error);
      throw error;
    }
  }

  /**
   * جدولة حملة
   */
  async scheduleCampaign(
    campaignId: string,
    scheduleTime: string
  ): Promise<{ success: boolean }> {
    try {
      if (this.provider === 'mailchimp') {
        await this.makeRequest(`/campaigns/${campaignId}/actions/schedule`, 'POST', {
          schedule_time: scheduleTime,
        });
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Error scheduling campaign:', error);
      throw error;
    }
  }

  /**
   * الحصول على إحصائيات حملة
   */
  async getCampaignStats(campaignId: string): Promise<EmailCampaign['stats']> {
    try {
      if (this.provider === 'mailchimp') {
        const data = await this.makeRequest(`/reports/${campaignId}`);
        
        return {
          sent: data.emails_sent,
          delivered: data.emails_sent - data.bounces.hard_bounces - data.bounces.soft_bounces,
          opened: data.opens.unique_opens,
          clicked: data.clicks.unique_clicks,
          bounced: data.bounces.hard_bounces + data.bounces.soft_bounces,
          unsubscribed: data.unsubscribed,
          openRate: data.opens.open_rate,
          clickRate: data.clicks.click_rate,
        };
      }
      
      return {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        bounced: 0,
        unsubscribed: 0,
        openRate: 0,
        clickRate: 0,
      };
    } catch (error) {
      console.error('Error fetching campaign stats:', error);
      throw error;
    }
  }

  /**
   * الحصول على القوالب
   */
  async getTemplates(): Promise<EmailTemplate[]> {
    try {
      if (this.provider === 'mailchimp') {
        const data = await this.makeRequest('/templates');
        
        return data.templates?.map((template: any) => ({
          id: template.id,
          name: template.name,
          category: template.category,
          thumbnail: template.thumbnail,
          html: '',
        })) || [];
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  }

  /**
   * اختبار إرسال بريد
   */
  async sendTestEmail(
    campaignId: string,
    testEmails: string[]
  ): Promise<{ success: boolean }> {
    try {
      if (this.provider === 'mailchimp') {
        await this.makeRequest(`/campaigns/${campaignId}/actions/test`, 'POST', {
          test_emails: testEmails,
          send_type: 'html',
        });
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Error sending test email:', error);
      throw error;
    }
  }
}

export const emailMarketing = new EmailMarketingAPI('mailchimp');
