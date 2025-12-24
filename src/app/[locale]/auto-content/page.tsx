'use client';

import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import {
  Wand2,
  Clock,
  Users,
  Image as ImageIcon,
  Video,
  Send,
  BarChart3,
  Sparkles,
  Target,
  Calendar,
  MapPin,
  Hash,
  FileText,
  Eye,
  MousePointerClick,
  Heart,
  Share2,
  MessageCircle,
  CheckCircle,
  Loader2,
  Edit,
} from 'lucide-react';

type Step = 'input' | 'generating' | 'preview' | 'scheduling' | 'published';
type Platform = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube';

interface GeneratedContent {
  text: string;
  hashtags: string[];
  imageUrl?: string;
  videoUrl?: string;
  videoData?: {
    thumbnail: string;
    duration: number;
    format: string;
    dimensions: { width: number; height: number };
    metadata: any;
  };
  bestTime: {
    date: string;
    time: string;
    reason: string;
  };
  targetAudience: {
    age: string;
    gender: string;
    interests: string[];
    location: string;
  };
}

export default function AutoContentCreatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = React.use(params).locale;
  const [currentStep, setCurrentStep] = useState<Step>('input');
  const [loading, setLoading] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['facebook', 'instagram']);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  
  const [formData, setFormData] = useState({
    clientName: '',
    topic: '',
    tone: 'professional',
    includeImage: true,
    includeVideo: false,
    language: 'ar',
    // حقول جديدة للدقة
    clientType: 'hotel',
    location: 'أبها، السعودية',
    features: '',
    contactInfo: '',
    // خيارات الوسائط المتقدمة
    imageStyle: 'professional', // professional, luxury, creative, minimalist
    videoStyle: 'modern', // modern, elegant, dynamic
    colorScheme: 'warm', // warm, cool, neutral, vibrant
  });

  const [publishedPost, setPublishedPost] = useState<any>(null);

  const platforms = [
    { id: 'facebook' as Platform, name: 'Facebook', icon: '📘', color: 'from-blue-600 to-blue-700' },
    { id: 'instagram' as Platform, name: 'Instagram', icon: '📷', color: 'from-pink-600 to-purple-700' },
    { id: 'twitter' as Platform, name: 'Twitter', icon: '🐦', color: 'from-sky-500 to-blue-600' },
    { id: 'linkedin' as Platform, name: 'LinkedIn', icon: '💼', color: 'from-blue-700 to-blue-800' },
    { id: 'youtube' as Platform, name: 'YouTube', icon: '▶️', color: 'from-red-600 to-red-700' },
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setCurrentStep('generating');

    try {
      // إضافة timestamp ومعرف فريد لضمان التنويع
      const timestamp = Date.now();
      const uniqueId = Math.random().toString(36).substring(2, 15);
      
      // استدعاء API الحقيقي
      const response = await fetch('/api/ai/auto-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: formData.clientName,
          clientType: formData.clientType,
          topic: formData.topic,
          tone: formData.tone,
          platforms: selectedPlatforms,
          location: formData.location,
          features: formData.features,
          contactInfo: formData.contactInfo,
          includeImage: formData.includeImage,
          includeVideo: formData.includeVideo,
          language: formData.language,
          imageStyle: formData.imageStyle,
          videoStyle: formData.videoStyle,
          colorScheme: formData.colorScheme,
          timestamp, // لضمان التنويع
          uniqueId, // معرف فريد
          requestId: `${timestamp}-${uniqueId}`, // معرف الطلب
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'فشل في توليد المحتوى');
      }

      const data = await response.json();
      
      console.log('API Response:', data); // للتحقق من البيانات المستلمة
      
      if (!data.success) {
        throw new Error('فشل في توليد المحتوى');
      }

      setGeneratedContent(data.content);
      setCurrentStep('preview');
    } catch (error: any) {
      console.error('Error generating content:', error);
      alert('حدث خطأ: ' + error.message);
      setCurrentStep('input');
    } finally {
      setLoading(false);
    }
  };

  const handleSchedulePost = async () => {
    setLoading(true);
    setCurrentStep('scheduling');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mock = {
        id: 'post_' + Date.now(),
        platforms: selectedPlatforms,
        scheduledTime: generatedContent?.bestTime,
        status: 'scheduled',
      };

      setPublishedPost(mock);
      setCurrentStep('published');
    } catch (error) {
      console.error('Error scheduling post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishNow = async () => {
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mock = {
        id: 'post_' + Date.now(),
        platforms: selectedPlatforms,
        publishedTime: new Date().toISOString(),
        status: 'published',
        metrics: {
          reach: 0,
          impressions: 0,
          engagement: 0,
          clicks: 0,
        },
      };

      setPublishedPost(mock);
      setCurrentStep('published');
    } catch (error) {
      console.error('Error publishing post:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <DashboardHeader locale={locale} />

      <main className="container mx-auto px-4 py-8">
        {/* العنوان */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">إنشاء محتوى تلقائي</h1>
              <p className="text-gray-400">
                الذكاء الاصطناعي يكتب، يصمم، يجدول، وينشر المحتوى بالكامل
              </p>
            </div>
          </div>
        </div>

        {/* مؤشر التقدم */}
        <div className="mb-8">
          <div className="flex items-center justify-between bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            {[
              { step: 'input', label: 'المعلومات', icon: FileText },
              { step: 'generating', label: 'التوليد', icon: Sparkles },
              { step: 'preview', label: 'المعاينة', icon: Eye },
              { step: 'scheduling', label: 'الجدولة', icon: Calendar },
              { step: 'published', label: 'منشور', icon: CheckCircle },
            ].map((item, index) => {
              const Icon = item.icon;
              const isActive = currentStep === item.step;
              const isCompleted = ['input', 'generating', 'preview', 'scheduling', 'published'].indexOf(currentStep) >
                ['input', 'generating', 'preview', 'scheduling', 'published'].indexOf(item.step);
              
              return (
                <div key={item.step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 scale-110'
                          : isCompleted
                          ? 'bg-green-500'
                          : 'bg-gray-700'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className={`text-sm mt-2 ${isActive ? 'text-white font-semibold' : 'text-gray-400'}`}>
                      {item.label}
                    </p>
                  </div>
                  {index < 4 && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-700'
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1: Input Form */}
        {currentStep === 'input' && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">معلومات المحتوى</h2>

            <div className="space-y-6">
              {/* اسم العميل */}
              <div>
                <label className="block text-white font-semibold mb-2">اسم العميل/الفندق *</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="مثال: فندق قصر أبها"
                />
              </div>

              {/* نوع العميل */}
              <div>
                <label className="block text-white font-semibold mb-2">نوع العميل *</label>
                <select
                  value={formData.clientType}
                  onChange={e => setFormData({ ...formData, clientType: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="hotel">فندق</option>
                  <option value="resort">منتجع سياحي</option>
                  <option value="tourism_company">شركة سياحة</option>
                  <option value="restaurant">مطعم</option>
                  <option value="attraction">معلم سياحي</option>
                </select>
              </div>

              {/* الموقع */}
              <div>
                <label className="block text-white font-semibold mb-2">الموقع بالتحديد *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="مثال: شارع الملك فهد، أبها، المملكة العربية السعودية"
                />
                <p className="text-xs text-gray-400 mt-1">كن دقيقاً في تحديد الموقع</p>
              </div>

              {/* المميزات والخدمات */}
              <div>
                <label className="block text-white font-semibold mb-2">المميزات والخدمات *</label>
                <textarea
                  value={formData.features}
                  onChange={e => setFormData({ ...formData, features: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="مثال: 120 غرفة فاخرة، إطلالة جبلية، 3 مطاعم، سبا، مسبح مغطى، قاعات أفراح"
                />
                <p className="text-xs text-gray-400 mt-1">اذكر المميزات الحقيقية فقط</p>
              </div>

              {/* معلومات الاتصال */}
              <div>
                <label className="block text-white font-semibold mb-2">معلومات الاتصال</label>
                <input
                  type="text"
                  value={formData.contactInfo}
                  onChange={e => setFormData({ ...formData, contactInfo: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="رقم الهاتف، البريد الإلكتروني، الموقع الإلكتروني"
                />
              </div>

              {/* الموضوع */}
              <div>
                <label className="block text-white font-semibold mb-2">موضوع المنشور *</label>
                <textarea
                  value={formData.topic}
                  onChange={e => setFormData({ ...formData, topic: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="مثال: عروض صيفية خاصة - خصم 30% على الإقامة لمدة 3 ليالي"
                />
              </div>

              {/* النبرة */}
              <div>
                <label className="block text-white font-semibold mb-2">نبرة المحتوى</label>
                <select
                  value={formData.tone}
                  onChange={e => setFormData({ ...formData, tone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="professional">احترافي</option>
                  <option value="casual">ودي وبسيط</option>
                  <option value="excited">حماسي</option>
                  <option value="luxury">فاخر</option>
                </select>
              </div>

              {/* المنصات */}
              <div>
                <label className="block text-white font-semibold mb-3">المنصات</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {platforms.map(platform => (
                    <button
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedPlatforms.includes(platform.id)
                          ? 'bg-gradient-to-r ' + platform.color + ' border-white/50 scale-105'
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="text-3xl mb-2">{platform.icon}</div>
                      <p className="text-sm text-white font-semibold">{platform.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* خيارات الوسائط المتقدمة */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* إعدادات الصور */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.includeImage}
                      onChange={e => setFormData({ ...formData, includeImage: e.target.checked })}
                      className="w-5 h-5 rounded"
                    />
                    <ImageIcon className="w-5 h-5 text-blue-400" />
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">توليد صورة احترافية</span>
                      <span className="text-xs text-gray-400">✅ DALL-E 3 - جودة عالية</span>
                    </div>
                  </label>

                  {formData.includeImage && (
                    <div className="ml-8 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">نمط الصورة</label>
                        <select
                          value={formData.imageStyle}
                          onChange={e => setFormData({ ...formData, imageStyle: e.target.value })}
                          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="professional">احترافي - مناسب للأعمال</option>
                          <option value="luxury">فاخر - تصميم راقي وأنيق</option>
                          <option value="creative">إبداعي - ألوان زاهية ومميزة</option>
                          <option value="minimalist">بسيط - تصميم نظيف وعصري</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* إعدادات الفيديو */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.includeVideo}
                      onChange={e => setFormData({ ...formData, includeVideo: e.target.checked })}
                      className="w-5 h-5 rounded"
                    />
                    <Video className="w-5 h-5 text-purple-400" />
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">توليد فيديو تسويقي</span>
                      <span className="text-xs text-green-400">✅ متاح الآن - تقنية متقدمة</span>
                    </div>
                  </label>

                  {formData.includeVideo && (
                    <div className="ml-8 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">نمط الفيديو</label>
                        <select
                          value={formData.videoStyle}
                          onChange={e => setFormData({ ...formData, videoStyle: e.target.value })}
                          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="modern">عصري - حركات ديناميكية</option>
                          <option value="elegant">أنيق - انتقالات ناعمة</option>
                          <option value="dynamic">ديناميكي - طاقة عالية</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* خيارات الألوان العامة */}
              {(formData.includeImage || formData.includeVideo) && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">نظام الألوان</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'warm', name: 'دافئ', colors: 'bg-gradient-to-r from-orange-400 to-red-500' },
                      { value: 'cool', name: 'بارد', colors: 'bg-gradient-to-r from-blue-400 to-cyan-500' },
                      { value: 'neutral', name: 'محايد', colors: 'bg-gradient-to-r from-gray-400 to-gray-600' },
                      { value: 'vibrant', name: 'زاهي', colors: 'bg-gradient-to-r from-pink-400 to-purple-500' },
                    ].map((color) => (
                      <label key={color.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="colorScheme"
                          value={color.value}
                          checked={formData.colorScheme === color.value}
                          onChange={e => setFormData({ ...formData, colorScheme: e.target.value })}
                          className="sr-only"
                        />
                        <div className={`
                          p-3 rounded-lg border-2 transition-all text-center
                          ${formData.colorScheme === color.value 
                            ? 'border-purple-400 bg-white/10' 
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                          }
                        `}>
                          <div className={`h-8 w-full ${color.colors} rounded mb-2`}></div>
                          <span className="text-white text-sm font-medium">{color.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* زر التوليد */}
              <button
                onClick={handleGenerate}
                disabled={!formData.clientName || !formData.topic || !formData.location || !formData.features || selectedPlatforms.length === 0 || loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري التوليد...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    إنشاء المحتوى بالذكاء الاصطناعي
                  </>
                )}
              </button>
              
              <p className="text-sm text-gray-400 text-center">
                * الحقول المطلوبة - كن دقيقاً للحصول على أفضل نتيجة
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Generating */}
        {currentStep === 'generating' && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="w-16 h-16 text-purple-400 animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-white mb-3">جاري الإنشاء...</h2>
              <p className="text-gray-400 text-center mb-8">
                الذكاء الاصطناعي يعمل على إنشاء محتوى احترافي لك
              </p>
              
              <div className="w-full max-w-md space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>كتابة النص...</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                  <span>توليد الصورة...</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Clock className="w-5 h-5" />
                  <span>تحديد أفضل وقت للنشر...</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Users className="w-5 h-5" />
                  <span>تحليل الجمهور المستهدف...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Preview */}
        {currentStep === 'preview' && generatedContent && (
          <div className="space-y-6">
            {/* المحتوى */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                المحتوى المُنشأ
              </h2>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-4">
                <p className="text-white whitespace-pre-wrap leading-relaxed">
                  {generatedContent.text}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {generatedContent.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* أزرار التعديل */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const newText = prompt('تعديل النص:', generatedContent.text);
                    if (newText !== null && newText.trim() !== '') {
                      setGeneratedContent({
                        ...generatedContent,
                        text: newText,
                      });
                    }
                  }}
                  className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  تعديل النص
                </button>
                
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  إعادة التوليد
                </button>
              </div>
            </div>

            {/* الصورة/الفيديو */}
            {(generatedContent.imageUrl || generatedContent.videoUrl) && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  {generatedContent.videoUrl ? (
                    <>
                      <Video className="w-5 h-5 text-purple-400" />
                      الفيديو التسويقي المُنشأ
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5" />
                      الصورة المُنشأة بالذكاء الاصطناعي
                    </>
                  )}
                </h2>
                
                {/* عرض الفيديو */}
                {generatedContent.videoUrl && (
                  <div className="mb-6">
                    <div className="relative bg-black/50 rounded-xl overflow-hidden">
                      <video
                        src={generatedContent.videoUrl}
                        poster={generatedContent.videoData?.thumbnail}
                        controls
                        className="w-full max-h-96 object-cover"
                        preload="metadata"
                      />
                      <div className="absolute top-3 left-3 bg-purple-600/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                        🎬 فيديو احترافي
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        المدة: {generatedContent.videoData?.duration || 15} ثانية • 
                        {generatedContent.videoData?.dimensions ? `${generatedContent.videoData.dimensions.width}×${generatedContent.videoData.dimensions.height}` : 'HD'}
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={async () => {
                            // إعادة توليد الفيديو مع نظام تنويع محسن
                            setLoading(true);
                            try {
                              const timestamp = Date.now();
                              const uniqueId = Math.random().toString(36).substring(2, 15);
                              const videoSeed = Math.random(); // لضمان تنويع الفيديو
                              
                              const response = await fetch('/api/ai/auto-content', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  ...formData,
                                  platforms: selectedPlatforms,
                                  includeImage: false,
                                  includeVideo: true,
                                  timestamp,
                                  uniqueId,
                                  videoSeed,
                                  requestId: `video-${timestamp}-${uniqueId}`,
                                  regenerateMode: 'video', // وضع إعادة التوليد
                                }),
                              });
                              const data = await response.json();
                              if (data.success && data.content.videoUrl) {
                                setGeneratedContent({
                                  ...generatedContent,
                                  videoUrl: data.content.videoUrl,
                                  videoData: data.content.videoData,
                                });
                              }
                            } catch (error) {
                              console.error('Error regenerating video:', error);
                            } finally {
                              setLoading(false);
                            }
                          }}
                          disabled={loading}
                          className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded text-xs transition-all flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          {loading ? 'جاري التوليد...' : 'فيديو جديد'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* عرض الصورة */}
                {generatedContent.imageUrl && (
                  <div>
                    <div className="relative">
                      <img
                        src={generatedContent.imageUrl}
                        alt="Generated content"
                        className="w-full rounded-xl mb-3"
                      />
                      <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                        🎨 تم التوليد بـ DALL-E 3
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          // إعادة توليد الصورة مع نظام تنويع محسن
                          setLoading(true);
                          try {
                            const timestamp = Date.now();
                            const uniqueId = Math.random().toString(36).substring(2, 15);
                            const imageSeed = Math.random(); // لضمان تنويع الصورة
                            
                            const response = await fetch('/api/ai/auto-content', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                ...formData,
                                platforms: selectedPlatforms,
                                includeImage: true,
                                includeVideo: false,
                                timestamp,
                                uniqueId,
                                imageSeed,
                                requestId: `image-${timestamp}-${uniqueId}`,
                                regenerateMode: 'image', // وضع إعادة التوليد
                              }),
                            });
                            const data = await response.json();
                            if (data.success && data.content.imageUrl) {
                              setGeneratedContent({
                                ...generatedContent,
                                imageUrl: data.content.imageUrl,
                              });
                            }
                          } catch (error) {
                            console.error('Error regenerating image:', error);
                          } finally {
                            setLoading(false);
                          }
                        }}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        {loading ? 'جاري التوليد...' : 'صورة جديدة'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* أفضل وقت للنشر */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                أفضل وقت للنشر
              </h2>
              
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-3xl font-bold text-white">
                    {generatedContent.bestTime.time}
                  </div>
                  <div className="text-xl text-gray-300">
                    {generatedContent.bestTime.date}
                  </div>
                </div>
                <p className="text-gray-300">{generatedContent.bestTime.reason}</p>
              </div>
            </div>

            {/* الجمهور المستهدف */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                الجمهور المستهدف
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">العمر</p>
                  <p className="text-white font-semibold">{generatedContent.targetAudience.age}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">الجنس</p>
                  <p className="text-white font-semibold">{generatedContent.targetAudience.gender}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">الموقع</p>
                  <p className="text-white font-semibold">{generatedContent.targetAudience.location}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">الاهتمامات</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {generatedContent.targetAudience.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* أزرار النشر */}
            <div className="flex gap-4">
              <button
                onClick={handleSchedulePost}
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                جدولة في أفضل وقت
              </button>
              
              <button
                onClick={handlePublishNow}
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                نشر الآن
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Scheduling/Publishing */}
        {(currentStep === 'scheduling') && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="w-16 h-16 text-green-400 animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-white mb-3">جاري الجدولة...</h2>
              <p className="text-gray-400 text-center">
                يتم جدولة المنشور على المنصات المحددة
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Published */}
        {currentStep === 'published' && publishedPost && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-8 border border-green-500/30 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">تم بنجاح! 🎉</h2>
              <p className="text-gray-300 mb-6">
                {publishedPost.status === 'scheduled'
                  ? 'تم جدولة المنشور وسيتم نشره تلقائياً في الوقت المحدد'
                  : 'تم نشر المنشور على جميع المنصات المحددة'}
              </p>

              <div className="flex items-center justify-center gap-3 mb-6">
                {selectedPlatforms.map(platform => {
                  const platformData = platforms.find(p => p.id === platform);
                  return (
                    <div key={platform} className="text-3xl">
                      {platformData?.icon}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setCurrentStep('input');
                  setGeneratedContent(null);
                  setPublishedPost(null);
                  setFormData({
                    clientName: '',
                    clientType: '',
                    topic: '',
                    tone: 'professional',
                    location: '',
                    features: '',
                    contactInfo: '',
                    includeImage: true,
                    includeVideo: false,
                    language: 'ar',
                    imageStyle: 'professional',
                    videoStyle: 'modern',
                    colorScheme: 'warm',
                  });
                }}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
              >
                إنشاء منشور جديد
              </button>
            </div>

            {/* متابعة الأداء (للمنشورات المنشورة فوراً) */}
            {publishedPost.status === 'published' && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  متابعة الأداء المباشر
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white mb-1">0</p>
                    <p className="text-sm text-gray-400">مشاهدات</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white mb-1">0</p>
                    <p className="text-sm text-gray-400">إعجابات</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white mb-1">0</p>
                    <p className="text-sm text-gray-400">تعليقات</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <Share2 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white mb-1">0</p>
                    <p className="text-sm text-gray-400">مشاركات</p>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-400 mt-4">
                  سيتم تحديث البيانات تلقائياً كل 5 دقائق
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
