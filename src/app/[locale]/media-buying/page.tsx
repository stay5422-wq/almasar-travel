'use client';

import { use } from 'react';
import Link from 'next/link';
import { 
  Target,
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  MousePointer,
  BarChart3,
  Plus,
  Play,
  Pause,
  Settings,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Hotel,
  Building,
  Zap,
  Activity
} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

export default function MediaBuyingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  // حملات إعلانية للفنادق والشركات السياحية في أبها
  const campaigns = [
    {
      id: 1,
      name: 'حملة فندق قصر أبها - عروض الشتاء',
      platform: 'Facebook Ads',
      status: 'active',
      budget: '15,000 ريال',
      spent: '9,245 ريال',
      impressions: '125.2K',
      clicks: '4,234',
      conversions: 145,
      ctr: '3.38%',
      cpc: '2.18 ريال',
      roi: '245%',
      color: 'blue',
      client: 'فندق قصر أبها',
      startDate: '2025-12-15',
      endDate: '2026-01-15'
    },
    {
      id: 2,
      name: 'باقات العمرة - شركة المسار للسياحة',
      platform: 'Google Ads',
      status: 'active',
      budget: '25,000 ريال',
      spent: '18,890 ريال',
      impressions: '278.5K',
      clicks: '8,156',
      conversions: 234,
      ctr: '2.93%',
      cpc: '2.31 ريال',
      roi: '367%',
      color: 'green',
      client: 'شركة المسار للسياحة',
      startDate: '2025-12-10',
      endDate: '2026-02-10'
    },
    {
      id: 3,
      name: 'منتجع الجبل الأخضر - باقات العائلات',
      platform: 'Instagram Ads',
      status: 'active',
      budget: '12,500 ريال',
      spent: '7,100 ريال',
      impressions: '94.1K',
      clicks: '3,892',
      conversions: 89,
      ctr: '4.14%',
      cpc: '1.82 ريال',
      roi: '198%',
      color: 'purple',
      client: 'منتجع الجبل الأخضر',
      startDate: '2025-12-18',
      endDate: '2026-01-18'
    },
    {
      id: 4,
      name: 'رحلات سياحية للشركات - تيليفريك أبها',
      platform: 'LinkedIn Ads',
      status: 'paused',
      budget: '8,000 ريال',
      spent: '3,567 ريال',
      impressions: '45.3K',
      clicks: '1,245',
      conversions: 34,
      ctr: '2.75%',
      cpc: '2.86 ريال',
      roi: '134%',
      color: 'cyan',
      client: 'شركة السفريات الذهبية',
      startDate: '2025-12-12',
      endDate: '2026-01-12'
    },
    {
      id: 5,
      name: 'فندق إنتركونتيننتال - حجوزات فورية',
      platform: 'Facebook + Instagram',
      status: 'active',
      budget: '20,000 ريال',
      spent: '16,200 ريال',
      impressions: '156.8K',
      clicks: '5,678',
      conversions: 178,
      ctr: '3.62%',
      cpc: '2.85 ريال',
      roi: '289%',
      color: 'orange',
      client: 'فندق إنتركونتيننتال أبها',
      startDate: '2025-12-01',
      endDate: '2026-01-01'
    }
  ];

  const platformStats = [
    { name: 'Facebook Ads', campaigns: 12, spent: '55,245 ريال', roi: '245%', color: 'blue', impressions: '425K' },
    { name: 'Google Ads', campaigns: 8, spent: '42,890 ريال', roi: '367%', color: 'red', impressions: '378K' },
    { name: 'Instagram Ads', campaigns: 10, spent: '28,100 ريال', roi: '198%', color: 'purple', impressions: '294K' },
    { name: 'LinkedIn Ads', campaigns: 5, spent: '15,567 ريال', roi: '134%', color: 'cyan', impressions: '145K' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <DashboardHeader locale={locale} />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Target className="h-8 w-8 text-purple-400" />
              الميديا باير - إدارة الحملات الإعلانية
            </h1>
            <p className="text-gray-400">إدارة حملات Facebook Ads و Google Ads للفنادق والشركات السياحية</p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/${locale}/media-buying/reports`}
              className="px-6 py-3 bg-white/10 backdrop-blur-lg border border-purple-500/30 text-white rounded-lg hover:bg-white/20 transition flex items-center gap-2"
            >
              <BarChart3 className="h-5 w-5" />
              التقارير
            </Link>
            <Link
              href={`/${locale}/media-buying/new`}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center gap-2 shadow-lg shadow-purple-500/50"
            >
              <Plus className="h-5 w-5" />
              حملة جديدة
            </Link>
          </div>
        </div>
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <Target className="h-6 w-6 text-purple-400" />
              </div>
              <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                <ArrowUpRight className="h-3 w-3" />
                +12.5%
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">الحملات النشطة</p>
            <p className="text-3xl font-bold text-white">35</p>
            <p className="text-xs text-gray-500 mt-1">من أصل 48 حملة</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
              <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                <ArrowUpRight className="h-3 w-3" />
                +8.1%
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">إجمالي الإنفاق</p>
            <p className="text-3xl font-bold text-white">141,802</p>
            <p className="text-xs text-gray-500 mt-1">ريال سعودي</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <MousePointer className="h-6 w-6 text-green-400" />
              </div>
              <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                <ArrowUpRight className="h-3 w-3" />
                +15.3%
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">إجمالي النقرات</p>
            <p className="text-3xl font-bold text-white">89,205</p>
            <p className="text-xs text-gray-500 mt-1">CTR متوسط 3.2%</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-orange-500/20">
                <TrendingUp className="h-6 w-6 text-orange-400" />
              </div>
              <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                <ArrowUpRight className="h-3 w-3" />
                +22.7%
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">متوسط ROI</p>
            <p className="text-3xl font-bold text-white">245%</p>
            <p className="text-xs text-gray-500 mt-1">عائد استثمار ممتاز</p>
          </div>
        </div>

        {/* Platform Performance */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-purple-500/30">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-400" />
            أداء المنصات الإعلانية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformStats.map((platform) => (
              <div key={platform.name} className="bg-white/5 border border-purple-500/20 rounded-lg p-5 hover:bg-white/10 hover:border-purple-500/40 transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">{platform.name}</h3>
                  <span className={`w-3 h-3 rounded-full bg-${platform.color}-500 animate-pulse`}></span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">الحملات</span>
                    <span className="font-medium text-white">{platform.campaigns}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">المشاهدات</span>
                    <span className="font-medium text-white">{platform.impressions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">الإنفاق</span>
                    <span className="font-medium text-white">{platform.spent}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-purple-500/20">
                    <span className="text-gray-400">ROI</span>
                    <span className="font-bold text-green-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {platform.roi}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {campaigns.map((campaign) => {
            const statusConfig = {
              active: { label: 'نشط', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: Play },
              paused: { label: 'متوقف', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Pause },
              ended: { label: 'منتهي', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', icon: AlertCircle }
            };

            const status = statusConfig[campaign.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            const budgetPercent = (parseFloat(campaign.spent.replace(/[^0-9.]/g, '')) / parseFloat(campaign.budget.replace(/[^0-9.]/g, ''))) * 100;

            return (
              <div key={campaign.id} className="bg-white/10 backdrop-blur-lg rounded-xl border border-purple-500/30 hover:border-purple-500/50 hover:bg-white/15 transition">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{campaign.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status.color} flex items-center gap-1`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <p className="text-gray-400 flex items-center gap-2">
                          {campaign.platform}
                          <ExternalLink className="h-4 w-4" />
                        </p>
                        <p className="text-purple-400">العميل: {campaign.client}</p>
                        <p className="text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {campaign.startDate} → {campaign.endDate}
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white/10 border border-purple-500/30 text-white rounded-lg hover:bg-white/20 transition flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      إعدادات
                    </button>
                  </div>

                  {/* Budget Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">الميزانية المستخدمة</span>
                      <span className="font-medium text-white">{campaign.spent} / {campaign.budget} ({budgetPercent.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          budgetPercent >= 90 ? 'bg-red-500' : budgetPercent >= 70 ? 'bg-yellow-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}
                        style={{ width: `${Math.min(budgetPercent, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mb-4">
                    <div className="text-center p-4 bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition">
                      <Eye className="h-5 w-5 text-blue-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1">الظهور</p>
                      <p className="font-bold text-white">{campaign.impressions}</p>
                    </div>

                    <div className="text-center p-4 bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition">
                      <MousePointer className="h-5 w-5 text-purple-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1">النقرات</p>
                      <p className="font-bold text-white">{campaign.clicks}</p>
                    </div>

                    <div className="text-center p-4 bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition">
                      <Target className="h-5 w-5 text-pink-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1">التحويلات</p>
                      <p className="font-bold text-white">{campaign.conversions}</p>
                    </div>

                    <div className="text-center p-4 bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition">
                      <BarChart3 className="h-5 w-5 text-cyan-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1">CTR</p>
                      <p className="font-bold text-white">{campaign.ctr}</p>
                    </div>

                    <div className="text-center p-4 bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition">
                      <DollarSign className="h-5 w-5 text-orange-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1">CPC</p>
                      <p className="font-bold text-white">{campaign.cpc}</p>
                    </div>

                    <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition">
                      <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1">ROI</p>
                      <p className="font-bold text-green-400">{campaign.roi}</p>
                    </div>

                    <div className="text-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition">
                      <Link
                        href={`/${locale}/media-buying/${campaign.id}`}
                        className="block text-purple-400 hover:text-purple-300 font-medium text-sm pt-2"
                      >
                        التفاصيل
                        <ArrowUpRight className="h-4 w-4 inline ml-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-purple-500/20">
                    {campaign.status === 'active' && (
                      <button className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition flex items-center gap-2">
                        <Pause className="h-4 w-4" />
                        إيقاف مؤقت
                      </button>
                    )}
                    {campaign.status === 'paused' && (
                      <button className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        تشغيل
                      </button>
                    )}
                    <button className="px-4 py-2 bg-white/10 border border-purple-500/30 text-white rounded-lg hover:bg-white/20 transition flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      تعديل الميزانية
                    </button>
                    <button className="px-4 py-2 bg-white/10 border border-purple-500/30 text-white rounded-lg hover:bg-white/20 transition flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      عرض التحليلات
                    </button>
                    <Link
                      href={`/${locale}/media-buying/${campaign.id}/edit`}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      تعديل الحملة
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
