'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Video,
  Image as ImageIcon,
  Calendar,
  Filter,
  Plus,
  Search,
  MoreVertical,
  Clock,
  CheckCircle,
  Send,
  Edit,
  Trash2,
  Copy,
  Eye,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  X
} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

export default function ContentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // بيانات المنشورات للفنادق والشركات السياحية
  const posts = [
    {
      id: 1,
      title: 'عرض خاص - فندق قصر أبها للأجنحة الفندقية',
      type: 'post',
      platforms: ['Facebook', 'Instagram'],
      status: 'published',
      publishedAt: '2025-12-20 10:00 ص',
      engagement: { likes: 2340, comments: 145, shares: 89 },
      thumbnail: '🏨',
      client: 'فندق قصر أبها'
    },
    {
      id: 2,
      title: 'فيديو: جولة في منتجع الجبل الأخضر - أبها',
      type: 'video',
      platforms: ['YouTube', 'TikTok', 'Instagram'],
      status: 'scheduled',
      scheduledFor: '2025-12-24 06:00 م',
      thumbnail: '🎥',
      client: 'منتجع الجبل الأخضر'
    },
    {
      id: 3,
      title: 'باقات العمرة الشاملة - شركة المسار للسياحة',
      type: 'post',
      platforms: ['Facebook', 'Twitter', 'LinkedIn'],
      status: 'draft',
      lastEdited: '2025-12-22',
      thumbnail: '🕌',
      client: 'شركة المسار للسياحة'
    },
    {
      id: 4,
      title: 'إنفوجرافيك: أفضل 10 أماكن سياحية في أبها',
      type: 'image',
      platforms: ['Instagram', 'Facebook'],
      status: 'published',
      publishedAt: '2025-12-19 02:00 م',
      engagement: { likes: 5670, comments: 234, shares: 445 },
      thumbnail: '🗺️',
      client: 'هيئة السياحة - أبها'
    },
    {
      id: 5,
      title: 'عروض الشتاء - حجوزات فندقية بخصم 40%',
      type: 'post',
      platforms: ['Facebook', 'Instagram'],
      status: 'scheduled',
      scheduledFor: '2025-12-25 12:00 م',
      thumbnail: '❄️',
      client: 'فندق إنتركونتيننتال'
    },
    {
      id: 6,
      title: 'رحلات سياحية للشركات - باقات خاصة',
      type: 'post',
      platforms: ['LinkedIn', 'Twitter'],
      status: 'published',
      publishedAt: '2025-12-21 09:00 ص',
      engagement: { likes: 890, comments: 67, shares: 123 },
      thumbnail: '🏢',
      client: 'شركة السفريات الذهبية'
    }
  ];

  const statusConfig = {
    published: { label: 'منشور', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    scheduled: { label: 'مجدول', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    draft: { label: 'مسودة', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }
  };

  const typeConfig = {
    post: { label: 'منشور', icon: FileText, color: 'blue' },
    video: { label: 'فيديو', icon: Video, color: 'purple' },
    image: { label: 'صورة', icon: ImageIcon, color: 'pink' }
  };

  const platformIcons: Record<string, any> = {
    'Facebook': Facebook,
    'Instagram': Instagram,
    'Twitter': Twitter,
    'LinkedIn': Linkedin,
    'YouTube': Youtube,
    'TikTok': Video
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <DashboardHeader locale={locale} />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">إدارة المحتوى</h1>
            <p className="text-gray-400">أنشئ وجدول محتواك للفنادق والشركات السياحية على جميع المنصات</p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/${locale}/content/calendar`}
              className="px-6 py-3 bg-white/10 backdrop-blur-lg border border-purple-500/30 text-white rounded-lg hover:bg-white/20 transition flex items-center gap-2"
            >
              <Calendar className="h-5 w-5" />
              التقويم
            </Link>
            <Link
              href={`/${locale}/content/new`}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center gap-2 shadow-lg shadow-purple-500/50"
            >
              <Plus className="h-5 w-5" />
              محتوى جديد
            </Link>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">إجمالي المنشورات</p>
                <p className="text-3xl font-bold text-white">156</p>
                <p className="text-xs text-green-400 mt-1">+12 هذا الأسبوع</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/20">
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">منشورات مجدولة</p>
                <p className="text-3xl font-bold text-white">24</p>
                <p className="text-xs text-blue-400 mt-1">الأسبوع القادم</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/20">
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">مسودات</p>
                <p className="text-3xl font-bold text-white">12</p>
                <p className="text-xs text-gray-400 mt-1">تحتاج مراجعة</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-500/20">
                <Edit className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">معدل التفاعل</p>
                <p className="text-3xl font-bold text-white">8.5%</p>
                <p className="text-xs text-green-400 mt-1">+2.3% من الشهر السابق</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/20">
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 mb-6 border border-purple-500/30">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث في المحتوى..."
                className="w-full pr-10 pl-4 py-2 bg-gray-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <select className="px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-lg text-white">
              <option>جميع الحالات</option>
              <option>منشور</option>
              <option>مجدول</option>
              <option>مسودة</option>
            </select>

            <select className="px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-lg text-white">
              <option>جميع الأنواع</option>
              <option>منشورات</option>
              <option>فيديوهات</option>
              <option>صور</option>
            </select>

            <select className="px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-lg text-white">
              <option>جميع المنصات</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Twitter</option>
              <option>LinkedIn</option>
            </select>

            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex items-center gap-2">
              <Filter className="h-5 w-5" />
              تصفية
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {posts.map((post) => {
            const TypeIcon = typeConfig[post.type as keyof typeof typeConfig].icon;

            return (
              <div key={post.id} className="bg-white/10 backdrop-blur-lg rounded-xl border border-purple-500/30 hover:border-purple-500/50 hover:bg-white/15 transition overflow-hidden">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{post.thumbnail}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <TypeIcon className={`h-4 w-4 text-${typeConfig[post.type as keyof typeof typeConfig].color}-400`} />
                          <span className="text-xs text-gray-400">
                            {typeConfig[post.type as keyof typeof typeConfig].label}
                          </span>
                        </div>
                        <h3 className="font-bold text-white mb-1">{post.title}</h3>
                        <p className="text-xs text-purple-400">العميل: {post.client}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Platforms */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.platforms.map((platform) => {
                      const PlatformIcon = platformIcons[platform];
                      return (
                        <span
                          key={platform}
                          className="px-3 py-1 bg-white/10 border border-purple-500/30 text-purple-300 text-xs rounded-full flex items-center gap-1"
                        >
                          {PlatformIcon && <PlatformIcon className="h-3 w-3" />}
                          {platform}
                        </span>
                      );
                    })}
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-purple-500/20">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[post.status as keyof typeof statusConfig].color}`}>
                      {statusConfig[post.status as keyof typeof statusConfig].label}
                    </span>
                    <div className="text-sm text-gray-400">
                      {post.status === 'published' && post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          {post.publishedAt}
                        </span>
                      )}
                      {post.status === 'scheduled' && post.scheduledFor && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-blue-400" />
                          {post.scheduledFor}
                        </span>
                      )}
                      {post.status === 'draft' && post.lastEdited && (
                        <span className="flex items-center gap-1">
                          <Edit className="h-3 w-3 text-gray-400" />
                          {post.lastEdited}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Engagement Stats */}
                  {post.engagement && (
                    <div className="flex gap-6 mb-4 text-sm">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-400" /> {post.engagement.likes.toLocaleString()}
                      </span>
                      <span className="text-gray-400 flex items-center gap-1">
                        <MessageCircle className="h-4 w-4 text-blue-400" /> {post.engagement.comments}
                      </span>
                      <span className="text-gray-400 flex items-center gap-1">
                        <Share2 className="h-4 w-4 text-green-400" /> {post.engagement.shares}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-white/10 border border-purple-500/30 text-white rounded-lg hover:bg-white/20 transition flex items-center justify-center gap-2 text-sm">
                      <Eye className="h-4 w-4" />
                      معاينة
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center justify-center gap-2 text-sm">
                      <Edit className="h-4 w-4" />
                      تعديل
                    </button>
                    <button className="px-4 py-2 bg-white/10 border border-purple-500/30 text-gray-400 hover:text-white rounded-lg hover:bg-white/20 transition">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/30 transition">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button className="px-4 py-2 bg-white/10 border border-purple-500/30 text-white rounded-lg hover:bg-white/20 transition">السابق</button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 bg-white/10 border border-purple-500/30 text-white rounded-lg hover:bg-white/20 transition">2</button>
          <button className="px-4 py-2 bg-white/10 border border-purple-500/30 text-white rounded-lg hover:bg-white/20 transition">3</button>
          <button className="px-4 py-2 bg-white/10 border border-purple-500/30 text-white rounded-lg hover:bg-white/20 transition">التالي</button>
        </div>
      </div>

      {/* Create Content Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-gray-900 to-gray-800 border-b border-purple-500/30 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">إنشاء محتوى جديد</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-4">
                <Link
                  href="/ar/auto-content"
                  className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition text-center"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="font-bold text-white mb-1">محتوى تلقائي</h3>
                  <p className="text-xs text-gray-400">بواسطة AI</p>
                </Link>

                <button className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl hover:from-blue-500/30 hover:to-cyan-500/30 transition text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Edit className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white mb-1">كتابة يدوية</h3>
                  <p className="text-xs text-gray-400">من الصفر</p>
                </button>

                <button className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl hover:from-green-500/30 hover:to-emerald-500/30 transition text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Copy className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-bold text-white mb-1">من قالب</h3>
                  <p className="text-xs text-gray-400">جاهز</p>
                </button>
              </div>

              {/* Content Templates */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">القوالب الجاهزة</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: 'عرض خاص', icon: '🎁', category: 'عروض' },
                    { title: 'منشور ترحيبي', icon: '👋', category: 'ترحيب' },
                    { title: 'شهادة عميل', icon: '⭐', category: 'تقييمات' },
                    { title: 'نصيحة سفر', icon: '✈️', category: 'محتوى' },
                  ].map((template, index) => (
                    <button
                      key={index}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-right"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{template.icon}</span>
                        <div>
                          <h4 className="font-medium text-white">{template.title}</h4>
                          <p className="text-xs text-gray-400">{template.category}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
