'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { 
  FileText,
  Target,
  Search,
  BarChart3,
  Sparkles,
  Calendar,
  Image as ImageIcon,
  Video,
  TrendingUp,
  Users,
  Globe,
  Zap,
  CheckCircle,
  ArrowLeft,
  Play,
  Link2
} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

export default function FeaturesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [activeTab, setActiveTab] = useState('content');

  const features = [
    {
      id: 'content',
      title: 'إدارة المحتوى',
      subtitle: 'إنشاء وجدولة المنشورات',
      icon: FileText,
      color: 'purple',
      description: 'نظام متكامل لإدارة المحتوى على جميع المنصات الاجتماعية',
      benefits: [
        'إنشاء منشورات نصية وصور وفيديوهات',
        'جدولة المنشورات لأوقات محددة',
        'نشر تلقائي على جميع المنصات',
        'محرر نصوص غني بالمميزات',
        'مكتبة وسائط منظمة',
        'قوالب جاهزة للاستخدام'
      ],
      tools: [
        { name: 'محرر المحتوى', desc: 'أداة كتابة احترافية' },
        { name: 'الجدولة الذكية', desc: 'أفضل أوقات النشر' },
        { name: 'المعاينة المباشرة', desc: 'شاهد المنشور قبل النشر' },
        { name: 'تقويم المحتوى', desc: 'خطط محتواك بسهولة' }
      ],
      link: `/${locale}/content`,
      demo: true
    },
    {
      id: 'media-buying',
      title: 'الميديا باير',
      subtitle: 'إدارة الحملات الإعلانية',
      icon: Target,
      color: 'blue',
      description: 'إدارة احترافية للحملات الإعلانية المدفوعة على Facebook و Google',
      benefits: [
        'إنشاء حملات إعلانية متقدمة',
        'استهداف دقيق للجمهور',
        'تحسين الميزانية تلقائياً',
        'تتبع الأداء لحظياً',
        'تقارير ROI مفصلة',
        'اختبار A/B للإعلانات'
      ],
      tools: [
        { name: 'Facebook Ads Manager', desc: 'إدارة إعلانات Facebook' },
        { name: 'Google Ads', desc: 'حملات البحث والعرض' },
        { name: 'Audience Builder', desc: 'بناء الجمهور المستهدف' },
        { name: 'Budget Optimizer', desc: 'تحسين الإنفاق الإعلاني' }
      ],
      link: `/${locale}/media-buying`,
      demo: true
    },
    {
      id: 'seo',
      title: 'أدوات SEO',
      subtitle: 'تحسين محركات البحث',
      icon: Search,
      color: 'green',
      description: 'أدوات متقدمة لتحسين ظهور موقعك في نتائج البحث',
      benefits: [
        'بحث الكلمات المفتاحية',
        'تحليل المنافسين',
        'تتبع الترتيب في جوجل',
        'فحص صحة الموقع',
        'بناء الباك لينك',
        'تقارير SEO شاملة'
      ],
      tools: [
        { name: 'Keyword Research', desc: 'بحث الكلمات المفتاحية' },
        { name: 'Site Audit', desc: 'فحص شامل للموقع' },
        { name: 'Rank Tracker', desc: 'تتبع الترتيب' },
        { name: 'Competitor Analysis', desc: 'تحليل المنافسين' }
      ],
      link: `/${locale}/seo`,
      demo: true
    },
    {
      id: 'analytics',
      title: 'التحليلات',
      subtitle: 'تقارير الأداء التفصيلية',
      icon: BarChart3,
      color: 'orange',
      description: 'تحليلات متقدمة لفهم أداء حملاتك وتحسين النتائج',
      benefits: [
        'رسوم بيانية تفاعلية',
        'تقارير مخصصة لكل منصة',
        'مقارنة الأداء الشهري',
        'تحليل ROI والعائد',
        'إحصائيات الجمهور',
        'تصدير التقارير'
      ],
      tools: [
        { name: 'Dashboard Analytics', desc: 'لوحة تحكم شاملة' },
        { name: 'Social Insights', desc: 'إحصائيات السوشيال ميديا' },
        { name: 'Campaign Reports', desc: 'تقارير الحملات' },
        { name: 'Custom Reports', desc: 'تقارير مخصصة' }
      ],
      link: `/${locale}/analytics`,
      demo: true
    },
    {
      id: 'ai-assistant',
      title: 'المساعد الذكي',
      subtitle: 'ذكاء اصطناعي للتسويق',
      icon: Sparkles,
      color: 'pink',
      description: 'مساعد AI متقدم لمساعدتك في جميع جوانب التسويق الرقمي',
      benefits: [
        'إنشاء محتوى تلقائياً',
        'اقتراحات تحسين الحملات',
        'تحليل البيانات الذكي',
        'توصيات مخصصة',
        'إجابة فورية على الأسئلة',
        'كتابة نصوص إعلانية'
      ],
      tools: [
        { name: 'Content Generator', desc: 'توليد المحتوى' },
        { name: 'Smart Recommendations', desc: 'توصيات ذكية' },
        { name: 'Chat Assistant', desc: 'مساعد دردشة' },
        { name: 'Performance Analyzer', desc: 'تحليل الأداء' }
      ],
      link: `/${locale}/ai-assistant`,
      demo: true
    },
    {
      id: 'auto-content',
      title: 'المحتوى التلقائي',
      subtitle: 'إنشاء سريع بالذكاء الاصطناعي',
      icon: Zap,
      color: 'yellow',
      description: 'أنشئ محتوى احترافي في ثوانٍ باستخدام الذكاء الاصطناعي',
      benefits: [
        'محتوى جاهز في ثوانٍ',
        'تنويعات متعددة للاختيار',
        'تخصيص حسب المنصة',
        'نبرة احترافية',
        'هاشتاقات مقترحة',
        'صور من AI (قريباً)'
      ],
      tools: [
        { name: 'Quick Posts', desc: 'منشورات سريعة' },
        { name: 'Caption Generator', desc: 'توليد التعليقات' },
        { name: 'Hashtag Suggestions', desc: 'هاشتاقات مقترحة' },
        { name: 'Multi-Platform', desc: 'لكل المنصات' }
      ],
      link: `/${locale}/auto-content`,
      demo: true
    }
  ];

  const activeFeature = features.find(f => f.id === activeTab) || features[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <DashboardHeader locale={locale} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🚀 منصة التسويق الإلكتروني الشاملة
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            كل ما تحتاجه لإدارة تسويق فندقك أو شركتك السياحية في مكان واحد
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href={`/${locale}/settings/accounts`}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition font-bold text-lg flex items-center gap-2"
            >
              <Link2 className="w-6 h-6" />
              ابدأ الآن - ربط الحسابات
            </Link>
            <Link
              href={`/${locale}/dashboard`}
              className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition font-bold text-lg"
            >
              لوحة التحكم
            </Link>
          </div>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive = activeTab === feature.id;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`px-6 py-3 rounded-xl transition flex items-center gap-2 ${
                  isActive
                    ? `bg-${feature.color}-500/30 border-2 border-${feature.color}-500 text-white`
                    : 'bg-white/10 border-2 border-white/10 text-gray-400 hover:text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{feature.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Feature Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Description & Benefits */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8">
              <div className={`w-16 h-16 bg-${activeFeature.color}-500/20 rounded-2xl flex items-center justify-center mb-4`}>
                <activeFeature.icon className={`w-8 h-8 text-${activeFeature.color}-400`} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{activeFeature.title}</h2>
              <p className="text-xl text-gray-300 mb-4">{activeFeature.subtitle}</p>
              <p className="text-gray-400 text-lg">{activeFeature.description}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                المميزات الرئيسية
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {activeFeature.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 text-${activeFeature.color}-400 mt-0.5`} />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={activeFeature.link}
              className={`block w-full px-8 py-4 bg-gradient-to-r from-${activeFeature.color}-600 to-${activeFeature.color}-500 text-white rounded-xl hover:from-${activeFeature.color}-700 hover:to-${activeFeature.color}-600 transition font-bold text-center text-lg flex items-center justify-center gap-2`}
            >
              {activeFeature.demo ? (
                <>
                  <Play className="w-6 h-6" />
                  جرّب الآن
                </>
              ) : (
                <>
                  تعرف على المزيد
                  <ArrowLeft className="w-6 h-6 transform rotate-180" />
                </>
              )}
            </Link>
          </div>

          {/* Right: Tools Grid */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                الأدوات المتاحة
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {activeFeature.tools.map((tool, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
                  >
                    <h4 className="font-bold text-white mb-1">{tool.name}</h4>
                    <p className="text-sm text-gray-400">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 text-center">
                <p className="text-3xl font-bold text-white mb-1">24/7</p>
                <p className="text-sm text-gray-400">متاح دائماً</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 text-center">
                <p className="text-3xl font-bold text-white mb-1">∞</p>
                <p className="text-sm text-gray-400">استخدام غير محدود</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 text-center">
                <p className="text-3xl font-bold text-white mb-1">6+</p>
                <p className="text-sm text-gray-400">منصات مدعومة</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 text-center">
                <p className="text-3xl font-bold text-white mb-1">AI</p>
                <p className="text-sm text-gray-400">ذكاء اصطناعي</p>
              </div>
            </div>
          </div>
        </div>

        {/* All Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">جميع الميزات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.id}
                  href={feature.link}
                  className="p-6 bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl hover:bg-white/15 hover:border-purple-500/50 transition group"
                >
                  <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                    <Icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{feature.subtitle}</p>
                  <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                    {feature.demo ? 'جرّب الآن' : 'تعرف على المزيد'}
                    <ArrowLeft className="w-4 h-4 transform rotate-180 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">جاهز للبدء؟</h2>
          <p className="text-xl text-gray-300 mb-8">
            ابدأ في استخدام منصة التسويق الإلكتروني المتكاملة اليوم
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/settings/accounts`}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition font-bold text-lg flex items-center gap-2"
            >
              <Link2 className="w-6 h-6" />
              ربط الحسابات والبدء
            </Link>
            <Link
              href={`/${locale}/content/new`}
              className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition font-bold text-lg flex items-center gap-2"
            >
              <FileText className="w-6 h-6" />
              إنشاء منشور
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
