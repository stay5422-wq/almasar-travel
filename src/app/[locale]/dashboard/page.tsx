'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  FileText,
  Video,
  Share2,
  Target,
  Calendar,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Hotel,
  Building,
  Briefcase,
  Eye,
  MousePointer,
  Heart,
  MessageCircle
} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

export default function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  // إحصائيات العملاء
  const clientStats = [
    {
      title: 'عملاء الفنادق',
      value: '24',
      change: '+3 هذا الشهر',
      icon: Hotel,
      color: 'blue',
      link: 'hotels'
    },
    {
      title: 'الشركات السياحية',
      value: '18',
      change: '+5 هذا الشهر',
      icon: Building,
      color: 'purple',
      link: 'companies'
    },
    {
      title: 'مجموعات الشركات',
      value: '12',
      change: '+2 هذا الشهر',
      icon: Briefcase,
      color: 'green',
      link: 'groups'
    },
    {
      title: 'إجمالي العملاء',
      value: '54',
      change: '+10 هذا الشهر',
      icon: Users,
      color: 'orange',
      link: 'all'
    }
  ];

  // Mock data - إحصائيات الأداء
  const stats = [
    {
      title: 'إجمالي المنشورات',
      value: '1,234',
      subtitle: 'هذا الشهر',
      change: '+12.5%',
      trend: 'up',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'التفاعل الكلي',
      value: '45.2K',
      subtitle: 'إعجابات وتعليقات',
      change: '+18.2%',
      trend: 'up',
      icon: Activity,
      color: 'green'
    },
    {
      title: 'الحملات النشطة',
      value: '8',
      subtitle: 'Facebook & Google',
      change: '-2',
      trend: 'down',
      icon: Target,
      color: 'purple'
    },
    {
      title: 'الميزانية الشهرية',
      value: '45,000',
      subtitle: 'ريال سعودي',
      change: '+8.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'orange'
    },
    {
      title: 'الوصول الشهري',
      value: '250K',
      subtitle: 'مشاهدة',
      change: '+25.3%',
      trend: 'up',
      icon: Eye,
      color: 'pink'
    },
    {
      title: 'معدل النقر',
      value: '3.8%',
      subtitle: 'CTR متوسط',
      change: '+0.5%',
      trend: 'up',
      icon: MousePointer,
      color: 'cyan'
    },
    {
      title: 'معدل التحويل',
      value: '2.1%',
      subtitle: 'حجوزات مؤكدة',
      change: '+0.3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'teal'
    },
    {
      title: 'ROI',
      value: '285%',
      subtitle: 'عائد الاستثمار',
      change: '+15%',
      trend: 'up',
      icon: TrendingUp,
      color: 'emerald'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'post',
      title: 'تم نشر منشور جديد على Facebook',
      time: 'منذ 5 دقائق',
      status: 'success',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'campaign',
      title: 'حملة إعلانية جديدة على Google Ads',
      time: 'منذ 30 دقيقة',
      status: 'success',
      icon: CheckCircle
    },
    {
      id: 3,
      type: 'video',
      title: 'فيديو قيد المعالجة',
      time: 'منذ ساعة',
      status: 'pending',
      icon: Clock
    },
    {
      id: 4,
      type: 'alert',
      title: 'تنبيه: ميزانية الحملة تقترب من النهاية',
      time: 'منذ ساعتين',
      status: 'warning',
      icon: AlertCircle
    }
  ];

  const upcomingPosts = [
    {
      id: 1,
      title: 'عرض خاص على باقات السفر',
      platform: 'Facebook + Instagram',
      scheduledFor: '2025-12-24 10:00 AM',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'نصائح السفر للعام الجديد',
      platform: 'Twitter + LinkedIn',
      scheduledFor: '2025-12-25 02:00 PM',
      status: 'scheduled'
    },
    {
      id: 3,
      title: 'فيديو: أجمل الوجهات السياحية',
      platform: 'YouTube + TikTok',
      scheduledFor: '2025-12-26 06:00 PM',
      status: 'draft'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <DashboardHeader locale={locale} />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">لوحة التحكم الرئيسية</h1>
          <p className="text-gray-400">نظرة شاملة على أداء التسويق للفنادق والشركات السياحية في أبها والمملكة</p>
        </div>

        {/* Client Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-400" />
            عملائنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clientStats.map((stat, index) => {
              const Icon = stat.icon;
              
              return (
                <Link
                  key={index}
                  href={`/${locale}/clients/${stat.link}`}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 hover:bg-white/15 transition group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                      <Icon className={`h-6 w-6 text-${stat.color}-400`} />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-purple-400 transition" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-gray-400 text-sm mb-2">{stat.title}</p>
                  <p className="text-xs text-green-400">{stat.change}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-400" />
            إحصائيات الأداء
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const trendUp = stat.trend === 'up';
              
              return (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                      <Icon className={`h-6 w-6 text-${stat.color}-400`} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${trendUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">نظرة عامة على الأداء</h2>
              <select className="px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-lg text-sm text-white">
                <option>آخر 7 أيام</option>
                <option>آخر 30 يوم</option>
                <option>آخر 3 شهور</option>
              </select>
            </div>
            
            {/* Simple Chart Placeholder */}
            <div className="h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <p className="text-gray-300">الرسم البياني سيتم إضافته قريباً</p>
                <p className="text-sm text-gray-500 mt-2">باستخدام Chart.js أو Recharts</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <h2 className="text-xl font-bold text-white mb-6">آخر النشاطات</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                const statusColors = {
                  success: 'text-green-400 bg-green-500/20',
                  pending: 'text-yellow-400 bg-yellow-500/20',
                  warning: 'text-red-400 bg-red-500/20'
                };
                
                return (
                  <div key={activity.id} className="flex gap-3">
                    <div className={`p-2 rounded-lg ${statusColors[activity.status as keyof typeof statusColors]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{activity.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              href={`/${locale}/activity`}
              className="block text-center mt-6 text-purple-400 hover:text-purple-300 text-sm font-medium"
            >
              عرض كل النشاطات
            </Link>
          </div>
        </div>

        {/* Upcoming Posts */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              المنشورات المجدولة
            </h2>
            <Link
              href={`/${locale}/content`}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1"
            >
              عرض الكل
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingPosts.map((post) => (
              <div key={post.id} className="bg-white/5 border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 hover:bg-white/10 transition">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.status === 'scheduled' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {post.status === 'scheduled' ? 'مجدول' : 'مسودة'}
                  </span>
                  <Calendar className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="font-medium text-white mb-2">{post.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{post.platform}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.scheduledFor}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href={`/${locale}/content`}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-purple-500/30 hover:border-blue-500/50 hover:bg-white/15 transition group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <FileText className="h-6 w-6 text-blue-400 group-hover:scale-110 transition" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition" />
            </div>
            <h3 className="font-bold text-white mb-1">إدارة المحتوى</h3>
            <p className="text-sm text-gray-400">إنشاء وجدولة المنشورات</p>
          </Link>

          <Link
            href={`/${locale}/media-buying`}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-purple-500/30 hover:border-purple-500/50 hover:bg-white/15 transition group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <Target className="h-6 w-6 text-purple-400 group-hover:scale-110 transition" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-purple-400 transition" />
            </div>
            <h3 className="font-bold text-white mb-1">الميديا باير</h3>
            <p className="text-sm text-gray-400">إدارة الحملات الإعلانية</p>
          </Link>

          <Link
            href={`/${locale}/seo`}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-purple-500/30 hover:border-green-500/50 hover:bg-white/15 transition group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <TrendingUp className="h-6 w-6 text-green-400 group-hover:scale-110 transition" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-green-400 transition" />
            </div>
            <h3 className="font-bold text-white mb-1">أدوات SEO</h3>
            <p className="text-sm text-gray-400">تحسين محركات البحث</p>
          </Link>

          <Link
            href={`/${locale}/analytics`}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-purple-500/30 hover:border-orange-500/50 hover:bg-white/15 transition group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-orange-500/20">
                <BarChart3 className="h-6 w-6 text-orange-400 group-hover:scale-110 transition" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-orange-400 transition" />
            </div>
            <h3 className="font-bold text-white mb-1">التحليلات</h3>
            <p className="text-sm text-gray-400">تقارير الأداء التفصيلية</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
