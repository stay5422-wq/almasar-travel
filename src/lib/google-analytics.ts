/**
 * Google Analytics 4 Integration
 * تحليلات متقدمة لسلوك المستخدمين
 */

export interface GA4Event {
  name: string;
  params?: Record<string, any>;
}

export interface GA4UserProperties {
  userId?: string;
  userType?: 'customer' | 'prospect' | 'lead';
  industry?: string;
  companySize?: string;
}

export interface GA4PageView {
  page_title: string;
  page_location: string;
  page_path: string;
}

export interface GA4Conversion {
  eventName: string;
  value?: number;
  currency?: string;
  transactionId?: string;
}

export class GoogleAnalytics {
  private measurementId: string;
  private apiSecret: string;
  private initialized: boolean = false;

  constructor() {
    this.measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
    this.apiSecret = process.env.GA_API_SECRET || '';

    if (typeof window !== 'undefined' && this.measurementId) {
      this.initializeGA4();
    }
  }

  /**
   * تهيئة Google Analytics 4
   */
  private initializeGA4() {
    if (this.initialized) return;

    // تحميل gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);

    // تهيئة gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', this.measurementId, {
      page_path: window.location.pathname,
    });

    this.initialized = true;
  }

  /**
   * تتبع عرض الصفحة
   */
  trackPageView(pageData: GA4PageView) {
    if (typeof window === 'undefined') return;

    window.gtag?.('event', 'page_view', {
      page_title: pageData.page_title,
      page_location: pageData.page_location,
      page_path: pageData.page_path,
    });
  }

  /**
   * تتبع حدث مخصص
   */
  trackEvent(event: GA4Event) {
    if (typeof window === 'undefined') return;

    window.gtag?.('event', event.name, event.params);
  }

  /**
   * تتبع التحويلات
   */
  trackConversion(conversion: GA4Conversion) {
    if (typeof window === 'undefined') return;

    window.gtag?.('event', conversion.eventName, {
      value: conversion.value,
      currency: conversion.currency || 'SAR',
      transaction_id: conversion.transactionId,
    });
  }

  /**
   * تعيين خصائص المستخدم
   */
  setUserProperties(properties: GA4UserProperties) {
    if (typeof window === 'undefined') return;

    window.gtag?.('set', 'user_properties', properties);
  }

  /**
   * تتبع النقرات على الأزرار
   */
  trackButtonClick(buttonName: string, location: string) {
    this.trackEvent({
      name: 'button_click',
      params: {
        button_name: buttonName,
        location: location,
      },
    });
  }

  /**
   * تتبع إرسال النماذج
   */
  trackFormSubmission(formName: string, success: boolean) {
    this.trackEvent({
      name: 'form_submission',
      params: {
        form_name: formName,
        success: success,
      },
    });
  }

  /**
   * تتبع المشاركة على وسائل التواصل
   */
  trackSocialShare(platform: string, contentType: string) {
    this.trackEvent({
      name: 'share',
      params: {
        method: platform,
        content_type: contentType,
      },
    });
  }

  /**
   * تتبع البحث في الموقع
   */
  trackSearch(searchTerm: string, resultsCount: number) {
    this.trackEvent({
      name: 'search',
      params: {
        search_term: searchTerm,
        results_count: resultsCount,
      },
    });
  }

  /**
   * تتبع مشاهدة الفيديو
   */
  trackVideoPlay(videoTitle: string, duration: number) {
    this.trackEvent({
      name: 'video_start',
      params: {
        video_title: videoTitle,
        video_duration: duration,
      },
    });
  }

  /**
   * تتبع التفاعل مع المحتوى
   */
  trackEngagement(contentType: string, engagementType: string, value?: number) {
    this.trackEvent({
      name: 'engagement',
      params: {
        content_type: contentType,
        engagement_type: engagementType,
        value: value,
      },
    });
  }

  /**
   * الحصول على بيانات من Google Analytics API
   */
  async getAnalyticsData(params: {
    startDate: string;
    endDate: string;
    metrics: string[];
    dimensions?: string[];
  }): Promise<any> {
    if (!this.apiSecret) {
      throw new Error('GA API Secret not configured');
    }

    try {
      const response = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${this.measurementId}:runReport`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiSecret}`,
          },
          body: JSON.stringify({
            dateRanges: [{
              startDate: params.startDate,
              endDate: params.endDate,
            }],
            metrics: params.metrics.map(m => ({ name: m })),
            dimensions: params.dimensions?.map(d => ({ name: d })) || [],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      throw error;
    }
  }

  /**
   * الحصول على أهم الصفحات
   */
  async getTopPages(startDate: string, endDate: string): Promise<Array<{
    page: string;
    views: number;
    uniqueViews: number;
    avgTimeOnPage: number;
    bounceRate: number;
  }>> {
    try {
      const data = await this.getAnalyticsData({
        startDate,
        endDate,
        metrics: ['screenPageViews', 'sessions', 'averageSessionDuration', 'bounceRate'],
        dimensions: ['pagePath', 'pageTitle'],
      });

      // معالجة البيانات
      return data.rows?.map((row: any) => ({
        page: row.dimensionValues[0].value,
        views: parseInt(row.metricValues[0].value),
        uniqueViews: parseInt(row.metricValues[1].value),
        avgTimeOnPage: parseFloat(row.metricValues[2].value),
        bounceRate: parseFloat(row.metricValues[3].value),
      })) || [];
    } catch (error) {
      console.error('Error fetching top pages:', error);
      return [];
    }
  }

  /**
   * الحصول على مصادر الزيارات
   */
  async getTrafficSources(startDate: string, endDate: string): Promise<Array<{
    source: string;
    medium: string;
    sessions: number;
    users: number;
    conversions: number;
  }>> {
    try {
      const data = await this.getAnalyticsData({
        startDate,
        endDate,
        metrics: ['sessions', 'totalUsers', 'conversions'],
        dimensions: ['sessionSource', 'sessionMedium'],
      });

      return data.rows?.map((row: any) => ({
        source: row.dimensionValues[0].value,
        medium: row.dimensionValues[1].value,
        sessions: parseInt(row.metricValues[0].value),
        users: parseInt(row.metricValues[1].value),
        conversions: parseInt(row.metricValues[2].value),
      })) || [];
    } catch (error) {
      console.error('Error fetching traffic sources:', error);
      return [];
    }
  }

  /**
   * الحصول على معدلات التحويل
   */
  async getConversionRates(startDate: string, endDate: string): Promise<{
    totalSessions: number;
    totalConversions: number;
    conversionRate: number;
    goalCompletions: Record<string, number>;
  }> {
    try {
      const data = await this.getAnalyticsData({
        startDate,
        endDate,
        metrics: ['sessions', 'conversions', 'eventCount'],
        dimensions: ['eventName'],
      });

      const totalSessions = data.totals?.[0]?.metricValues[0]?.value || 0;
      const totalConversions = data.totals?.[0]?.metricValues[1]?.value || 0;

      return {
        totalSessions: parseInt(totalSessions),
        totalConversions: parseInt(totalConversions),
        conversionRate: totalSessions > 0 ? (totalConversions / totalSessions) * 100 : 0,
        goalCompletions: {},
      };
    } catch (error) {
      console.error('Error fetching conversion rates:', error);
      return {
        totalSessions: 0,
        totalConversions: 0,
        conversionRate: 0,
        goalCompletions: {},
      };
    }
  }
}

// إضافة types للـ window
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const analytics = new GoogleAnalytics();
