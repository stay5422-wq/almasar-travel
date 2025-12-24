'use client';

import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import {
  Target,
  TrendingUp,
  DollarSign,
  Users,
  MousePointerClick,
  Eye,
  BarChart3,
  Search,
  Plus,
  Pause,
  Play,
  RefreshCw,
  Settings,
  Download,
  Calendar,
  MapPin,
  Tag,
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: 'ENABLED' | 'PAUSED';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  conversionRate: number;
}

export default function GoogleAdsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = React.use(params).locale;
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'حملة سياحة أبها - صيف 2024',
      status: 'ENABLED',
      budget: 5000,
      spent: 3240,
      impressions: 125000,
      clicks: 3200,
      conversions: 145,
      ctr: 2.56,
      cpc: 1.01,
      conversionRate: 4.53,
    },
    {
      id: '2',
      name: 'فنادق أبها - عروض خاصة',
      status: 'ENABLED',
      budget: 3000,
      spent: 1850,
      impressions: 85000,
      clicks: 2100,
      conversions: 89,
      ctr: 2.47,
      cpc: 0.88,
      conversionRate: 4.24,
    },
    {
      id: '3',
      name: 'رحلات الجبل الأخضر',
      status: 'PAUSED',
      budget: 2000,
      spent: 1950,
      impressions: 65000,
      clicks: 1450,
      conversions: 52,
      ctr: 2.23,
      cpc: 1.34,
      conversionRate: 3.59,
    },
  ]);

  const totalStats = {
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    totalClicks: campaigns.reduce((sum, c) => sum + c.clicks, 0),
    totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
    avgCtr: campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length,
    avgCpc: campaigns.reduce((sum, c) => sum + c.cpc, 0) / campaigns.length,
  };

  const toggleCampaignStatus = (campaignId: string) => {
    setCampaigns(prev =>
      prev.map(c =>
        c.id === campaignId
          ? { ...c, status: c.status === 'ENABLED' ? 'PAUSED' : 'ENABLED' }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <DashboardHeader locale={locale} />

      <main className="container mx-auto px-4 py-8">
        {/* العنوان */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Google Ads</h1>
              <p className="text-gray-400">إدارة الحملات الإعلانية على جوجل</p>
            </div>
          </div>
        </div>

        {/* الإحصائيات العامة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">الميزانية</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {totalStats.totalBudget.toLocaleString('en-US')} ر.س
            </h3>
            <p className="text-sm text-gray-400">
              تم الإنفاق: {totalStats.totalSpent.toLocaleString('en-US')} ر.س
            </p>
            <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                style={{
                  width: `${(totalStats.totalSpent / totalStats.totalBudget) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">مرات الظهور</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {totalStats.totalImpressions.toLocaleString('en-US')}
            </h3>
            <p className="text-sm text-green-400">+12.5% من الشهر الماضي</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <MousePointerClick className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">النقرات</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {totalStats.totalClicks.toLocaleString('en-US')}
            </h3>
            <p className="text-sm text-gray-400">
              CTR: {totalStats.avgCtr.toFixed(2)}%
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">التحويلات</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {totalStats.totalConversions}
            </h3>
            <p className="text-sm text-gray-400">
              CPC: {totalStats.avgCpc.toFixed(2)} ر.س
            </p>
          </div>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all">
            <Plus className="w-5 h-5" />
            إنشاء حملة جديدة
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20">
            <Search className="w-5 h-5" />
            بحث الكلمات المفتاحية
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20">
            <BarChart3 className="w-5 h-5" />
            تقرير الأداء
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20">
            <Download className="w-5 h-5" />
            تصدير البيانات
          </button>
        </div>

        {/* قائمة الحملات */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">الحملات النشطة</h2>

          <div className="space-y-4">
            {campaigns.map(campaign => (
              <div
                key={campaign.id}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">
                        {campaign.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          campaign.status === 'ENABLED'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {campaign.status === 'ENABLED' ? 'نشط' : 'متوقف'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        منذ 15 يوم
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        السعودية - أبها
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCampaignStatus(campaign.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-all"
                      title={
                        campaign.status === 'ENABLED' ? 'إيقاف مؤقت' : 'تفعيل'
                      }
                    >
                      {campaign.status === 'ENABLED' ? (
                        <Pause className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <Play className="w-5 h-5 text-green-400" />
                      )}
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                      <Settings className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                      <RefreshCw className="w-5 h-5 text-blue-400" />
                    </button>
                  </div>
                </div>

                {/* معلومات الميزانية */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>الميزانية: {campaign.budget.toLocaleString('en-US')} ر.س</span>
                    <span>تم الإنفاق: {campaign.spent.toLocaleString('en-US')} ر.س</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                      style={{
                        width: `${(campaign.spent / campaign.budget) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* مقاييس الأداء */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">مرات الظهور</p>
                    <p className="text-lg font-bold text-white">
                      {campaign.impressions.toLocaleString('en-US')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">النقرات</p>
                    <p className="text-lg font-bold text-white">
                      {campaign.clicks.toLocaleString('en-US')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">CTR</p>
                    <p className="text-lg font-bold text-green-400">
                      {campaign.ctr.toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">CPC</p>
                    <p className="text-lg font-bold text-blue-400">
                      {campaign.cpc.toFixed(2)} ر.س
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">التحويلات</p>
                    <p className="text-lg font-bold text-purple-400">
                      {campaign.conversions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">معدل التحويل</p>
                    <p className="text-lg font-bold text-orange-400">
                      {campaign.conversionRate.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* توصيات التحسين */}
        <div className="mt-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">
              توصيات لتحسين الأداء
            </h2>
          </div>

          <div className="space-y-3">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Target className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    إضافة كلمات مفتاحية سلبية
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    هناك 15 كلمة مفتاحية غير ذات صلة تستهلك من ميزانيتك. إضافتها
                    ككلمات سلبية قد توفر 250 ر.س شهرياً.
                  </p>
                  <button className="text-sm text-green-400 hover:text-green-300 font-semibold">
                    تطبيق التوصية ←
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    تعديل عروض الأسعار
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    بعض الكلمات المفتاحية عالية الأداء لديها عروض منخفضة. زيادة
                    العروض قد تزيد التحويلات بنسبة 25%.
                  </p>
                  <button className="text-sm text-blue-400 hover:text-blue-300 font-semibold">
                    عرض التفاصيل ←
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Tag className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    تحسين نصوص الإعلانات
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    استخدم الذكاء الاصطناعي لكتابة نصوص إعلانات أكثر جاذبية وزيادة
                    نسبة النقر CTR.
                  </p>
                  <button className="text-sm text-purple-400 hover:text-purple-300 font-semibold">
                    استخدام AI ←
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
