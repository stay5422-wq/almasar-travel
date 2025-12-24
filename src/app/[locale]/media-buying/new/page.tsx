'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Target,
  ArrowLeft,
  DollarSign,
  Calendar,
  Users,
  MapPin,
  Sparkles,
  Eye,
  MousePointer,
  TrendingUp,
  Image as ImageIcon,
  Video,
  FileText,
  Zap,
  Save,
  Play
} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

interface CampaignForm {
  name: string;
  client: string;
  platform: string;
  objective: string;
  budget: string;
  duration: number;
  startDate: string;
  targetAudience: {
    age: string;
    gender: string;
    location: string;
    interests: string[];
  };
  adCreative: {
    type: string;
    headline: string;
    description: string;
    cta: string;
  };
}

export default function NewMediaBuyingCampaign() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CampaignForm>({
    name: '',
    client: '',
    platform: 'facebook',
    objective: 'conversions',
    budget: '',
    duration: 30,
    startDate: new Date().toISOString().split('T')[0],
    targetAudience: {
      age: '25-45',
      gender: 'all',
      location: 'أبها، السعودية',
      interests: ['سياحة', 'سفر', 'فنادق'],
    },
    adCreative: {
      type: 'image',
      headline: '',
      description: '',
      cta: 'احجز الآن',
    },
  });

  const platforms = [
    { id: 'facebook', name: 'Facebook Ads', icon: '📘', color: 'blue' },
    { id: 'instagram', name: 'Instagram Ads', icon: '📷', color: 'purple' },
    { id: 'google', name: 'Google Ads', icon: '🔍', color: 'red' },
    { id: 'linkedin', name: 'LinkedIn Ads', icon: '💼', color: 'cyan' },
    { id: 'twitter', name: 'Twitter Ads', icon: '🐦', color: 'sky' },
    { id: 'youtube', name: 'YouTube Ads', icon: '▶️', color: 'red' },
  ];

  const objectives = [
    { id: 'awareness', name: 'زيادة الوعي', icon: <Eye className="w-5 h-5" /> },
    { id: 'traffic', name: 'زيادة الزيارات', icon: <MousePointer className="w-5 h-5" /> },
    { id: 'engagement', name: 'زيادة التفاعل', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'conversions', name: 'زيادة التحويلات', icon: <Target className="w-5 h-5" /> },
    { id: 'leads', name: 'جمع العملاء المحتملين', icon: <Users className="w-5 h-5" /> },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // محاكاة إرسال البيانات
      await new Promise(resolve => setTimeout(resolve, 2000));

      // في التطبيق الحقيقي، سيتم إرسال البيانات إلى API
      console.log('Campaign Data:', formData);

      // إعادة التوجيه إلى صفحة الحملات
      router.push('/ar/media-buying');
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('حدث خطأ أثناء إنشاء الحملة');
    } finally {
      setLoading(false);
    }
  };

  const handleInterestAdd = (interest: string) => {
    if (interest && !formData.targetAudience.interests.includes(interest)) {
      setFormData({
        ...formData,
        targetAudience: {
          ...formData.targetAudience,
          interests: [...formData.targetAudience.interests, interest],
        },
      });
    }
  };

  const handleInterestRemove = (interest: string) => {
    setFormData({
      ...formData,
      targetAudience: {
        ...formData.targetAudience,
        interests: formData.targetAudience.interests.filter(i => i !== interest),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <DashboardHeader locale="ar" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/ar/media-buying"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-purple-400" />
              إنشاء حملة إعلانية جديدة
            </h1>
            <p className="text-gray-400">قم بإعداد حملتك الإعلانية بخطوات بسيطة</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* معلومات الحملة الأساسية */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              معلومات الحملة
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  اسم الحملة *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="مثال: حملة فندق قصر أبها - عروض الشتاء"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  اسم العميل *
                </label>
                <input
                  type="text"
                  required
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="مثال: فندق قصر أبها"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الميزانية (ريال) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="15000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  تاريخ البدء *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  مدة الحملة (أيام) *
                </label>
                <input
                  type="range"
                  min="7"
                  max="90"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>7 أيام</span>
                  <span className="text-purple-400 font-bold">{formData.duration} يوم</span>
                  <span>90 يوم</span>
                </div>
              </div>
            </div>
          </div>

          {/* اختيار المنصة */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              اختيار المنصة الإعلانية
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, platform: platform.id })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.platform === platform.id
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="text-4xl mb-2">{platform.icon}</div>
                  <p className="text-sm text-white font-medium">{platform.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* الهدف من الحملة */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              الهدف من الحملة
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {objectives.map((objective) => (
                <button
                  key={objective.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, objective: objective.id })}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    formData.objective === objective.id
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="text-purple-400">{objective.icon}</div>
                  <p className="text-white font-medium">{objective.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* الجمهور المستهدف */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              الجمهور المستهدف
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الفئة العمرية
                </label>
                <select
                  value={formData.targetAudience.age}
                  onChange={(e) => setFormData({
                    ...formData,
                    targetAudience: { ...formData.targetAudience, age: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="25-45">25-45</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الجنس
                </label>
                <select
                  value={formData.targetAudience.gender}
                  onChange={(e) => setFormData({
                    ...formData,
                    targetAudience: { ...formData.targetAudience, gender: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">الجميع</option>
                  <option value="male">ذكور</option>
                  <option value="female">إناث</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الموقع الجغرافي
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.targetAudience.location}
                    onChange={(e) => setFormData({
                      ...formData,
                      targetAudience: { ...formData.targetAudience, location: e.target.value }
                    })}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                الاهتمامات
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.targetAudience.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center gap-2"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => handleInterestRemove(interest)}
                      className="hover:text-white"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="interest-input"
                  placeholder="أضف اهتمام جديد..."
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      handleInterestAdd(input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('interest-input') as HTMLInputElement;
                    if (input) {
                      handleInterestAdd(input.value);
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition"
                >
                  إضافة
                </button>
              </div>
            </div>
          </div>

          {/* المحتوى الإعلاني */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-400" />
              المحتوى الإعلاني
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  نوع الإعلان
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'image', name: 'صورة', icon: <ImageIcon className="w-5 h-5" /> },
                    { id: 'video', name: 'فيديو', icon: <Video className="w-5 h-5" /> },
                    { id: 'carousel', name: 'معرض صور', icon: <ImageIcon className="w-5 h-5" /> },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        adCreative: { ...formData.adCreative, type: type.id }
                      })}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        formData.adCreative.type === type.id
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-purple-400">{type.icon}</div>
                      <p className="text-white font-medium">{type.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  العنوان الرئيسي *
                </label>
                <input
                  type="text"
                  required
                  value={formData.adCreative.headline}
                  onChange={(e) => setFormData({
                    ...formData,
                    adCreative: { ...formData.adCreative, headline: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="مثال: احجز الآن واحصل على خصم 30%"
                  maxLength={60}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.adCreative.headline.length}/60 حرف
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الوصف *
                </label>
                <textarea
                  required
                  value={formData.adCreative.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    adCreative: { ...formData.adCreative, description: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                  placeholder="اكتب وصفاً جذاباً للعرض..."
                  maxLength={150}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.adCreative.description.length}/150 حرف
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  زر الدعوة للإجراء (CTA)
                </label>
                <select
                  value={formData.adCreative.cta}
                  onChange={(e) => setFormData({
                    ...formData,
                    adCreative: { ...formData.adCreative, cta: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="احجز الآن">احجز الآن</option>
                  <option value="اعرف المزيد">اعرف المزيد</option>
                  <option value="تواصل معنا">تواصل معنا</option>
                  <option value="احصل على العرض">احصل على العرض</option>
                  <option value="اشترك الآن">اشترك الآن</option>
                  <option value="سجل الآن">سجل الآن</option>
                </select>
              </div>
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  جاري الإنشاء...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  إطلاق الحملة
                </>
              )}
            </button>

            <button
              type="button"
              disabled={loading}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              حفظ كمسودة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
