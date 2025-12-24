'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight,
  Image as ImageIcon,
  Video,
  FileText,
  Calendar,
  Clock,
  Target,
  Sparkles,
  Upload,
  X,
  Plus,
  Loader2,
  CheckCircle,
  Zap,
  TrendingUp,
  Send,
  Facebook
} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

export default function NewContentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [contentType, setContentType] = useState<'post' | 'image' | 'video' | 'story'>('post');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook']);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [scheduleType, setScheduleType] = useState<'now' | 'later'>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState('');
  const [uploadedMedia, setUploadedMedia] = useState<string[]>([]);
  
  // AI Wizard State
  const [showAIWizard, setShowAIWizard] = useState(false);
  const [aiStep, setAiStep] = useState<'input' | 'generating' | 'review' | 'success'>('input');
  const [aiTopic, setAiTopic] = useState('');
  const [aiAudience, setAiAudience] = useState('');
  const [aiGoal, setAiGoal] = useState<'awareness' | 'engagement' | 'conversion'>('engagement');
  const [generatedContent, setGeneratedContent] = useState('');
  const [seoKeywords, setSeoKeywords] = useState<string[]>([]);
  const [aiHashtags, setAiHashtags] = useState<string[]>([]);
  const [bestTime, setBestTime] = useState('');

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: '📘', color: 'blue' },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'pink' },
    { id: 'twitter', name: 'Twitter', icon: '🐦', color: 'sky' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'indigo' },
    { id: 'youtube', name: 'YouTube', icon: '📹', color: 'red' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'purple' }
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const addHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag]);
      setNewHashtag('');
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  const handlePublish = async () => {
    // التحقق من المحتوى
    if (!content.trim()) {
      alert('⚠️ يرجى كتابة محتوى المنشور');
      return;
    }

    if (selectedPlatforms.length === 0) {
      alert('⚠️ يرجى اختيار منصة واحدة على الأقل');
      return;
    }

    // إضافة الهاشتاجات للمحتوى
    const fullContent = hashtags.length > 0 
      ? `${content}\n\n${hashtags.join(' ')}`
      : content;

    console.log('Publishing...', {
      contentType,
      platforms: selectedPlatforms,
      title,
      content: fullContent,
      scheduleType,
      scheduleDate,
      scheduleTime,
      hashtags,
      media: uploadedMedia
    });

    // النشر على كل منصة مختارة
    for (const platform of selectedPlatforms) {
      if (platform === 'facebook') {
        try {
          // جلب بيانات Facebook من localStorage
          const fbAccountsStr = localStorage.getItem('facebook_accounts');
          if (!fbAccountsStr) {
            alert('⚠️ يجب ربط حساب Facebook أولاً من صفحة الإعدادات!');
            return;
          }

          const fbAccounts = JSON.parse(fbAccountsStr);
          if (!fbAccounts || fbAccounts.length === 0) {
            alert('⚠️ لا يوجد حساب Facebook مربوط!');
            return;
          }

          const fbAccount = fbAccounts[0]; // أول حساب
          
          // التحقق من وجود صفحات
          if (!fbAccount.pages || fbAccount.pages.length === 0) {
            alert('⚠️ لا توجد صفحات Facebook مرتبطة بهذا الحساب!\nيجب أن يكون لديك صفحة Facebook لنشر المحتوى.');
            return;
          }

          const firstPage = fbAccount.pages[0]; // أول صفحة
          
          // النشر عبر API
          const response = await fetch('/api/social/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              platform: 'facebook',
              content: fullContent,
              pageId: firstPage.id,
              accessToken: firstPage.access_token, // Page token (not user token)
            }),
          });

          const result = await response.json();

          if (result.success) {
            alert(`✅ ${result.message}\n\n🔗 رابط المنشور: ${result.url}\n📄 الصفحة: ${firstPage.name}`);
            
            // إعادة تعيين النموذج
            setContent('');
            setTitle('');
            setHashtags([]);
            setUploadedMedia([]);
          } else {
            alert(`❌ فشل النشر: ${result.error}\n${result.details || ''}`);
          }
        } catch (error: any) {
          console.error('Publishing error:', error);
          alert(`❌ حدث خطأ أثناء النشر: ${error.message}`);
        }
      }
      
      // منصات أخرى (قريباً)
      if (platform === 'instagram') {
        alert('📸 النشر على Instagram قريباً...');
      }
      if (platform === 'twitter') {
        alert('🐦 النشر على Twitter قريباً...');
      }
    }
  };

  const handleAIGenerate = async () => {
    if (!aiTopic.trim()) { alert('أدخل موضوع الحملة'); return; }
    setAiStep('generating');
    try {
      const goalText = aiGoal === 'awareness' ? 'زيادة الوعي بالعلامة التجارية' 
                      : aiGoal === 'engagement' ? 'زيادة التفاعل والمشاركة' 
                      : 'تحقيق المبيعات والتحويلات';
      
      const prompt = `أنت خبير في كتابة المحتوى التسويقي الرقمي. اكتب منشوراً احترافياً للسوشيال ميديا باللغة العربية.

📌 **موضوع المنشور:** ${aiTopic}
👥 **الجمهور المستهدف:** ${aiAudience || 'الجمهور العام المهتم بهذا المجال'}
🎯 **الهدف الرئيسي:** ${goalText}

✍️ **متطلبات المحتوى:**
1. العنوان: اكتب عنواناً جذاباً يرتبط مباشرة بموضوع "${aiTopic}"
2. المقدمة: ابدأ بسؤال أو إحصائية مثيرة للانتباه تتعلق بالموضوع
3. المحتوى الأساسي:
   - اشرح الموضوع بطريقة واضحة ومفيدة (3-4 نقاط رئيسية)
   - قدم معلومات قيمة ونصائح عملية
   - استخدم أمثلة ملموسة إن أمكن
4. الفوائد: اذكر 3-4 فوائد واضحة للجمهور
5. Call-to-Action: دعوة واضحة للتفاعل (تعليق، مشاركة، أو زيارة)

📝 **الأسلوب:**
- استخدم لغة احترافية لكنودية
- اجعل النص سهل القراءة (فقرات قصيرة)
- استخدم الإيموجي بذكاء (2-3 فقط)
- تجنب المبالغة والكلام العام

📏 **الطول:** 200-300 كلمة

اكتب المنشور الآن:`;
      
      // استدعاء API route بدلاً من chatWithAI مباشرة
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, locale }),
      });

      if (!response.ok) throw new Error('Failed to generate content');
      
      const data = await response.json();
      const aiContent = data.content || data.response;
      
      setGeneratedContent(aiContent);
      
      // تحسين استخراج الكلمات المفتاحية
      const topicWords = aiTopic.split(' ').filter(w => w.length > 2);
      const audienceWords = aiAudience.split(' ').filter(w => w.length > 2);
      const keywords = [...new Set([...topicWords.slice(0, 2), ...audienceWords.slice(0, 1)])];
      setSeoKeywords(keywords.slice(0, 5));
      
      // تحسين الهاشتاجات
      const cleanWords = aiTopic.split(' ').filter(w => w.length > 3);
      const tags = cleanWords.slice(0, 3).map(w => `#${w.replace(/[^a-zA-Z0-9أ-ي]/g, '')}`);
      const goalHashtag = aiGoal === 'awareness' ? '#توعية' : aiGoal === 'engagement' ? '#تفاعل' : '#عروض';
      setAiHashtags([...tags, goalHashtag, '#محتوى_مميز'].slice(0, 5));
      
      // تحسين تحديد الوقت
      const currentHour = new Date().getHours();
      let timeRecommendation = '';
      if (currentHour >= 8 && currentHour <= 10) {
        timeRecommendation = '⏰ الوقت الحالي ممتاز! (8-10 صباحاً - وقت ذروة)';
      } else if (currentHour >= 19 && currentHour <= 22) {
        timeRecommendation = '🌟 الوقت الحالي مثالي! (7-10 مساءً - أعلى تفاعل)';
      } else if (currentHour >= 12 && currentHour <= 14) {
        timeRecommendation = '✅ وقت جيد (12-2 ظهراً - وقت استراحة)';
      } else {
        timeRecommendation = '💡 يُفضل النشر: 8-10 صباحاً أو 7-10 مساءً';
      }
      setBestTime(timeRecommendation);
      
      setTimeout(() => setAiStep('review'), 1000);
    } catch (error) {
      console.error('AI Error:', error);
      alert('حدث خطأ في توليد المحتوى');
      setAiStep('input');
    }
  };

  const handleUseAIContent = () => {
    setContent(generatedContent);
    setHashtags(aiHashtags);
    setShowAIWizard(false);
    setAiStep('success');
    setTimeout(() => {
      alert('✅ تم نقل المحتوى! يمكنك الآن تعديله والنشر.');
      setAiStep('input');
      setAiTopic('');
      setAiAudience('');
      setGeneratedContent('');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <DashboardHeader locale={locale} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/content`}
              className="p-2 bg-white/10 border border-purple-500/30 rounded-lg hover:bg-white/20 transition"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">إنشاء محتوى جديد</h1>
              <p className="text-gray-400 mt-1">أنشئ ونشر محتوى على منصات التواصل الاجتماعي</p>
            </div>
          </div>

          <button
            onClick={() => setShowAIWizard(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition font-medium flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            محتوى بالذكاء الاصطناعي
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Type Selection */}
            <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">نوع المحتوى</h2>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { type: 'post', icon: FileText, label: 'منشور' },
                  { type: 'image', icon: ImageIcon, label: 'صورة' },
                  { type: 'video', icon: Video, label: 'فيديو' },
                  { type: 'story', icon: Sparkles, label: 'ستوري' }
                ].map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => setContentType(type as any)}
                    className={`p-4 rounded-xl border-2 transition ${
                      contentType === type
                        ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-500'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${
                      contentType === type ? 'text-purple-300' : 'text-gray-400'
                    }`} />
                    <p className={`text-sm font-medium ${
                      contentType === type ? 'text-white' : 'text-gray-400'
                    }`}>{label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
              <label className="block text-white font-medium mb-3">العنوان (اختياري)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="أضف عنواناً جذاباً..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            {/* Content */}
            <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-white font-medium">المحتوى</label>
                <span className="text-sm text-gray-400">{content.length} / 2000</span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="اكتب محتواك هنا..."
                rows={8}
                maxLength={2000}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
              />
            </div>

            {/* Media Upload */}
            {(contentType === 'image' || contentType === 'video') && (
              <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
                <label className="block text-white font-medium mb-3">
                  {contentType === 'image' ? 'الصور' : 'الفيديو'}
                </label>
                
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-purple-500/50 transition cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-white font-medium mb-1">اسحب وأفلت الملفات هنا</p>
                  <p className="text-sm text-gray-400">أو انقر للاختيار</p>
                  <input
                    type="file"
                    accept={contentType === 'image' ? 'image/*' : 'video/*'}
                    multiple={contentType === 'image'}
                    className="hidden"
                  />
                </div>

                {uploadedMedia.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {uploadedMedia.map((media, index) => (
                      <div key={index} className="relative aspect-square bg-white/5 rounded-lg overflow-hidden">
                        <img src={media} alt="" className="w-full h-full object-cover" />
                        <button
                          onClick={() => setUploadedMedia(uploadedMedia.filter((_, i) => i !== index))}
                          className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Hashtags */}
            <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
              <label className="block text-white font-medium mb-3">الهاشتاقات</label>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
                  placeholder="أضف هاشتاق..."
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                />
                <button
                  onClick={addHashtag}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full text-sm flex items-center gap-2"
                    >
                      #{tag}
                      <button
                        onClick={() => removeHashtag(tag)}
                        className="hover:text-white transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Platform Selection */}
            <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">المنصات</h2>
              <div className="space-y-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`w-full p-3 rounded-xl border-2 transition flex items-center gap-3 ${
                      selectedPlatforms.includes(platform.id)
                        ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-500'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-2xl">{platform.icon}</span>
                    <span className={`font-medium flex-1 text-right ${
                      selectedPlatforms.includes(platform.id) ? 'text-white' : 'text-gray-400'
                    }`}>
                      {platform.name}
                    </span>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedPlatforms.includes(platform.id)
                        ? 'bg-purple-500 border-purple-500'
                        : 'border-white/30'
                    }`}>
                      {selectedPlatforms.includes(platform.id) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">الجدولة</h2>
              
              <div className="space-y-3 mb-4">
                <button
                  onClick={() => setScheduleType('now')}
                  className={`w-full p-3 rounded-xl border-2 transition flex items-center gap-3 ${
                    scheduleType === 'now'
                      ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-500'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Clock className={`w-5 h-5 ${scheduleType === 'now' ? 'text-purple-300' : 'text-gray-400'}`} />
                  <span className={`font-medium ${scheduleType === 'now' ? 'text-white' : 'text-gray-400'}`}>
                    نشر فوراً
                  </span>
                </button>

                <button
                  onClick={() => setScheduleType('later')}
                  className={`w-full p-3 rounded-xl border-2 transition flex items-center gap-3 ${
                    scheduleType === 'later'
                      ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-500'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Calendar className={`w-5 h-5 ${scheduleType === 'later' ? 'text-purple-300' : 'text-gray-400'}`} />
                  <span className={`font-medium ${scheduleType === 'later' ? 'text-white' : 'text-gray-400'}`}>
                    جدولة لاحقاً
                  </span>
                </button>
              </div>

              {scheduleType === 'later' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">التاريخ</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">الوقت</label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handlePublish}
                disabled={!content || selectedPlatforms.length === 0}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {scheduleType === 'now' ? 'نشر الآن' : 'جدولة النشر'}
              </button>

              <Link
                href={`/${locale}/content`}
                className="block w-full px-6 py-4 bg-white/10 border border-purple-500/30 text-white rounded-xl hover:bg-white/20 transition font-medium text-center"
              >
                إلغاء
              </Link>
            </div>
          </div>
        </div>

        {/* AI Smart Campaign Wizard Modal */}
        {showAIWizard && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAIWizard(false)}>
            <div className="bg-gradient-to-br from-gray-900 to-purple-900 border-2 border-purple-500/50 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-yellow-300" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">حملة ذكية - AI Marketing</h2>
                    <p className="text-purple-100 text-sm">النظام الذكي لإنشاء المحتوى التسويقي</p>
                  </div>
                </div>
                <button onClick={() => setShowAIWizard(false)} className="p-2 hover:bg-white/20 rounded-lg transition">
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                
                {/* Step 1: Input */}
                {aiStep === 'input' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white font-bold mb-2 text-lg">ما هو موضوع حملتك التسويقية؟ *</label>
                      <input
                        type="text"
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        placeholder="مثال: عروض السفر الصيفية، خدمات التصميم، منتجات جديدة..."
                        className="w-full bg-white/10 border-2 border-purple-400/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 text-lg"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2 text-lg">الجمهور المستهدف (اختياري)</label>
                      <input
                        type="text"
                        value={aiAudience}
                        onChange={(e) => setAiAudience(e.target.value)}
                        placeholder="مثال: الشباب، العائلات، رواد الأعمال..."
                        className="w-full bg-white/10 border-2 border-purple-400/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-3 text-lg">هدف الحملة</label>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { value: 'awareness', label: 'زيادة الوعي', icon: TrendingUp },
                          { value: 'engagement', label: 'زيادة التفاعل', icon: Zap },
                          { value: 'conversion', label: 'المبيعات', icon: Target }
                        ].map(goal => {
                          const Icon = goal.icon;
                          return (
                            <button
                              key={goal.value}
                              onClick={() => setAiGoal(goal.value as any)}
                              className={`p-4 rounded-xl border-2 transition ${
                                aiGoal === goal.value ? 'bg-purple-500/40 border-purple-400' : 'bg-white/5 border-white/20 hover:border-purple-400/50'
                              }`}
                            >
                              <Icon className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                              <div className="text-white font-bold text-sm">{goal.label}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      onClick={handleAIGenerate}
                      disabled={!aiTopic.trim()}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                    >
                      <Sparkles className="w-6 h-6" />
                      إنشاء المحتوى بالذكاء الاصطناعي
                    </button>
                  </div>
                )}

                {/* Step 2: Generating */}
                {aiStep === 'generating' && (
                  <div className="text-center py-12">
                    <Loader2 className="w-20 h-20 text-purple-400 animate-spin mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-3">جاري إنشاء المحتوى...</h3>
                    <p className="text-gray-300 text-lg">الذكاء الاصطناعي يعمل على كتابة محتوى احترافي لك</p>
                  </div>
                )}

                {/* Step 3: Review */}
                {aiStep === 'review' && (
                  <div className="space-y-6">
                    <div className="bg-white/5 border-2 border-purple-500/50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                        المحتوى المقترح
                      </h3>
                      <textarea
                        value={generatedContent}
                        onChange={(e) => setGeneratedContent(e.target.value)}
                        rows={8}
                        className="w-full bg-white/10 border border-purple-400/50 rounded-lg px-4 py-3 text-white resize-none focus:outline-none focus:border-purple-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border-2 border-green-500/50 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5 text-green-400" />
                          كلمات SEO
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {seoKeywords.map((k, i) => (
                            <span key={i} className="px-3 py-1 bg-green-500/20 border border-green-400/50 rounded-full text-green-300 text-sm font-medium">
                              {k}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white/5 border-2 border-blue-500/50 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-400" />
                          أفضل وقت
                        </h4>
                        <p className="text-blue-300 text-sm font-medium">{bestTime}</p>
                      </div>
                    </div>

                    <div className="bg-white/5 border-2 border-pink-500/50 rounded-xl p-4">
                      <h4 className="font-bold text-white mb-3">الهاشتاجات المقترحة</h4>
                      <div className="flex flex-wrap gap-2">
                        {aiHashtags.map((t, i) => (
                          <span key={i} className="px-3 py-1 bg-pink-500/20 border border-pink-400/50 rounded-full text-pink-300 text-sm font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={handleUseAIContent}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        استخدام هذا المحتوى
                      </button>
                      <button
                        onClick={() => setAiStep('input')}
                        className="px-6 py-4 bg-white/10 border-2 border-white/20 text-white rounded-xl hover:bg-white/20 transition font-bold"
                      >
                        إعادة التوليد
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
