'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Share2,
  Heart,
  MessageCircle,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Zap,
  Target,
  DollarSign,
  Activity
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import DashboardHeader from '@/components/DashboardHeader';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30days');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const exportReport = () => {
    // محاكاة تصدير التقرير
    alert('⏳ جاري إنشاء التقرير...');
    
    setTimeout(() => {
      const reportData = {
        period: timeRange,
        generated: new Date().toISOString(),
        summary: {
          totalReach: '289.5K',
          totalEngagement: '67.8K',
          conversionRate: '3.8%',
        roi: '285%',
      },
      platforms: platformPerformance.map(p => ({
        name: p.platform,
        followers: p.followers,
        engagement: p.engagement,
      })),
      monthlyData,
    };

    // إنشاء Blob وتنزيله
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
      alert('✅ تم تصدير التقرير بنجاح!');
    }, 1000);
  };

  // بيانات الرسم البياني للأداء الشهري
  const monthlyData = [
    { month: 'يناير', reach: 45000, engagement: 12000, conversions: 280 },
    { month: 'فبراير', reach: 52000, engagement: 14500, conversions: 320 },
    { month: 'مارس', reach: 61000, engagement: 17800, conversions: 385 },
    { month: 'أبريل', reach: 58000, engagement: 16200, conversions: 360 },
    { month: 'مايو', reach: 72000, engagement: 21000, conversions: 445 },
    { month: 'يونيو', reach: 85000, engagement: 25600, conversions: 520 },
  ];

  // بيانات توزيع المنصات
  const platformDistribution = [
    { name: 'Facebook', value: 35, color: '#3b5998' },
    { name: 'Instagram', value: 30, color: '#E1306C' },
    { name: 'Twitter', value: 15, color: '#1DA1F2' },
    { name: 'LinkedIn', value: 12, color: '#0077b5' },
    { name: 'YouTube', value: 8, color: '#FF0000' },
  ];

  // بيانات الأداء اليومي (آخر 7 أيام)
  const dailyData = [
    { day: 'الأحد', impressions: 12500, clicks: 890, conversions: 45 },
    { day: 'الإثنين', impressions: 15200, clicks: 1120, conversions: 58 },
    { day: 'الثلاثاء', impressions: 14800, clicks: 1050, conversions: 52 },
    { day: 'الأربعاء', impressions: 16900, clicks: 1280, conversions: 67 },
    { day: 'الخميس', impressions: 18200, clicks: 1450, conversions: 75 },
    { day: 'الجمعة', impressions: 13500, clicks: 950, conversions: 48 },
    { day: 'السبت', impressions: 14100, clicks: 1010, conversions: 51 },
  ];

  // بيانات تحليلات شاملة لحملات التسويق الرقمي في أبها
  const overallMetrics = [
    { label: 'إجمالي الوصول', value: '289.5K', change: '+24.5%', trend: 'up', icon: Eye, color: 'blue' },
    { label: 'التفاعل الكلي', value: '67.8K', change: '+18.2%', trend: 'up', icon: Heart, color: 'red' },
    { label: 'معدل التحويل', value: '3.8%', change: '+0.5%', trend: 'up', icon: Target, color: 'green' },
    { label: 'عائد الاستثمار', value: '285%', change: '+15%', trend: 'up', icon: DollarSign, color: 'yellow' }
  ];

  const platformPerformance = [
    { 
      platform: 'Facebook', 
      icon: Facebook,
      color: 'blue',
      followers: '45.2K',
      reach: '125.8K',
      engagement: '8.5%',
      posts: 45,
      trend: 'up',
      growth: '+12%',
      client: 'فندق قصر أبها'
    },
    { 
      platform: 'Instagram', 
      icon: Instagram,
      color: 'purple',
      followers: '32.1K',
      reach: '98.3K',
      engagement: '12.3%',
      posts: 67,
      trend: 'up',
      growth: '+18%',
      client: 'منتجع الجبل الأخضر'
    },
    { 
      platform: 'Twitter', 
      icon: Twitter,
      color: 'sky',
      followers: '18.7K',
      reach: '42.9K',
      engagement: '5.2%',
      posts: 123,
      trend: 'same',
      growth: '+3%',
      client: 'السفريات الذهبية'
    },
    { 
      platform: 'LinkedIn', 
      icon: Users,
      color: 'cyan',
      followers: '12.4K',
      reach: '22.5K',
      engagement: '6.8%',
      posts: 34,
      trend: 'up',
      growth: '+8%',
      client: 'شركة المسار'
    }
  ];

  const clientPerformance = [
    { 
      client: 'فندق قصر أبها',
      budget: '15,000 ريال',
      spent: '13,245 ريال',
      reach: '67.8K',
      clicks: '4,567',
      conversions: 234,
      roi: '245%',
      status: 'active'
    },
    { 
      client: 'شركة المسار السياحية',
      budget: '25,000 ريال',
      spent: '22,890 ريال',
      reach: '124.5K',
      clicks: '8,234',
      conversions: 456,
      roi: '367%',
      status: 'active'
    },
    { 
      client: 'منتجع الجبل الأخضر',
      budget: '12,500 ريال',
      spent: '11,120 ريال',
      reach: '54.2K',
      clicks: '3,456',
      conversions: 178,
      roi: '198%',
      status: 'active'
    },
    { 
      client: 'السفريات الذهبية',
      budget: '8,000 ريال',
      spent: '5,670 ريال',
      reach: '28.4K',
      clicks: '1,890',
      conversions: 89,
      roi: '156%',
      status: 'paused'
    }
  ];

  const monthlyTrends = [
    { month: 'يناير', reach: 145000, engagement: 32000, conversions: 450 },
    { month: 'فبراير', reach: 167000, engagement: 38000, conversions: 520 },
    { month: 'مارس', reach: 189000, engagement: 45000, conversions: 610 },
    { month: 'أبريل', reach: 203000, engagement: 52000, conversions: 680 },
    { month: 'مايو', reach: 234000, engagement: 61000, conversions: 780 },
    { month: 'يونيو', reach: 289500, engagement: 67800, conversions: 857 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <DashboardHeader locale="ar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">التحليلات والإحصائيات</h1>
            <p className="text-gray-400 mt-1">تتبع أداء حملاتك التسويقية في أبها</p>
          </div>
          <div className="flex gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-purple-500/30 text-white rounded-lg"
            >
              <option value="7days">آخر 7 أيام</option>
              <option value="30days">آخر 30 يوم</option>
              <option value="3months">آخر 3 شهور</option>
              <option value="1year">آخر سنة</option>
            </select>
            <button 
              onClick={exportReport}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition flex items-center gap-2"
            >
              <Download className="h-5 w-5" />
              تصدير التقرير
            </button>
          </div>
        </div>

        {/* Overall Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {overallMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const trendUp = metric.trend === 'up';
            
            return (
              <div key={index} className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${metric.color}-500/20 border border-${metric.color}-500/30`}>
                    <Icon className={`h-6 w-6 text-${metric.color}-400`} />
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-medium ${
                    trendUp ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {trendUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {metric.change}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{metric.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{metric.value}</p>
              </div>
            );
          })}
        </div>

        {/* Platform Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {platformPerformance.map((platform) => {
            const Icon = platform.icon;
            
            return (
              <div key={platform.platform} className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6 hover:bg-white/15 transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${platform.color}-500/20 border border-${platform.color}-500/30`}>
                    <Icon className={`h-6 w-6 text-${platform.color}-400`} />
                  </div>
                  <span className={`text-sm font-medium ${
                    platform.trend === 'up' ? 'text-green-400' : 
                    platform.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {platform.growth}
                  </span>
                </div>
                
                <h3 className="font-bold text-white mb-2">{platform.platform}</h3>
                <p className="text-sm text-gray-400 mb-4">{platform.client}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">المتابعون</span>
                    <span className="font-medium text-white">{platform.followers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">الوصول</span>
                    <span className="font-medium text-white">{platform.reach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">التفاعل</span>
                    <span className="font-medium text-green-400">{platform.engagement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">المنشورات</span>
                    <span className="font-medium text-white">{platform.posts}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Client Performance Table */}
        <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            أداء العملاء
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">العميل</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">الميزانية</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">المُنفق</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">الوصول</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">النقرات</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">التحويلات</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">ROI</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {clientPerformance.map((client, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="py-3 px-4 font-medium text-white">{client.client}</td>
                    <td className="py-3 px-4 text-white">{client.budget}</td>
                    <td className="py-3 px-4 text-white">{client.spent}</td>
                    <td className="py-3 px-4 text-white">{client.reach}</td>
                    <td className="py-3 px-4 text-white">{client.clicks}</td>
                    <td className="py-3 px-4 text-white">{client.conversions}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-300 rounded-full text-sm font-medium">
                        {client.roi}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        client.status === 'active' 
                          ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                          : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300'
                      }`}>
                        {client.status === 'active' ? 'نشط' : 'متوقف'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Performance Chart */}
          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              الأداء الشهري
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Area type="monotone" dataKey="reach" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorReach)" name="الوصول" />
                <Area type="monotone" dataKey="engagement" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEngagement)" name="التفاعل" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Distribution Chart */}
          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-400" />
              توزيع المنصات
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name} ${((entry.percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {platformDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Daily Performance Chart */}
          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              الأداء اليومي (آخر 7 أيام)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="impressions" fill="#8b5cf6" name="الظهور" />
                <Bar dataKey="clicks" fill="#3b82f6" name="النقرات" />
                <Bar dataKey="conversions" fill="#10b981" name="التحويلات" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-orange-400" />
              مسار التحويل
            </h2>
            <div className="space-y-4">
              {[
                { stage: 'مشاهدات', value: 100000, percent: 100, color: 'blue' },
                { stage: 'نقرات', value: 6750, percent: 6.75, color: 'purple' },
                { stage: 'زيارات الموقع', value: 4890, percent: 4.89, color: 'pink' },
                { stage: 'تفاعل', value: 2340, percent: 2.34, color: 'orange' },
                { stage: 'تحويلات', value: 396, percent: 0.4, color: 'green' },
              ].map((stage, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{stage.stage}</span>
                    <span className="text-gray-400 text-sm">{stage.value.toLocaleString()} ({stage.percent}%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-${stage.color}-600 to-${stage.color}-400 rounded-full transition-all`}
                      style={{ width: `${stage.percent * 15}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trends Chart */}
        <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            الاتجاهات الشهرية التفصيلية
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="reach" stroke="#8b5cf6" strokeWidth={2} name="الوصول" />
              <Line type="monotone" dataKey="engagement" stroke="#3b82f6" strokeWidth={2} name="التفاعل" />
              <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} name="التحويلات" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insights & Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-6">
            <Zap className="h-8 w-8 text-blue-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">نقطة قوة</h3>
            <p className="text-gray-300 text-sm">Instagram يحقق أعلى معدل تفاعل (12.3%) - استمر في إنتاج محتوى مرئي عالي الجودة</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6">
            <Target className="h-8 w-8 text-purple-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">فرصة للتحسين</h3>
            <p className="text-gray-300 text-sm">زيادة الميزانية للحملات عالية الأداء (ROI أعلى من 250%) سيضاعف النتائج</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-6">
            <TrendingUp className="h-8 w-8 text-green-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">اتجاه إيجابي</h3>
            <p className="text-gray-300 text-sm">نمو مستمر خلال 6 أشهر بمعدل +24.5% - الاستراتيجية الحالية فعالة</p>
          </div>
        </div>
      </div>
    </div>
  );
}
