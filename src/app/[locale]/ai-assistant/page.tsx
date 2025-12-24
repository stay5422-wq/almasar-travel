'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Wand2, 
  Brain,
  MessageSquare,
  FileText,
  BarChart3,
  Lightbulb,
  Zap,
  Image as ImageIcon,
  Calendar,
  Target,
  TrendingUp,
  Send,
  Loader2,
  Copy,
  Check,
  ArrowLeft
} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'مرحباً! أنا مساعد المسار الذكي 🤖 كيف يمكنني مساعدتك اليوم في التسويق الرقمي؟',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const quickPrompts = [
    'اكتب منشور فيسبوك لفندق في أبها',
    'حلل أداء حملة إعلانية',
    'اقترح استراتيجية محتوى لموسم الصيف',
    'أفضل وقت للنشر على إنستغرام',
  ];

  const aiFeatures = [
    {
      icon: FileText,
      title: 'توليد محتوى تلقائي',
      description: 'اكتب منشورات احترافية لجميع المنصات في ثوانٍ',
      color: 'blue',
      action: 'content-generation',
    },
    {
      icon: Target,
      title: 'تحسين الحملات',
      description: 'احصل على توصيات ذكية لتحسين أداء حملاتك الإعلانية',
      color: 'purple',
      action: 'campaign-optimization',
    },
    {
      icon: Calendar,
      title: 'جدولة ذكية',
      description: 'اكتشف أفضل أوقات النشر لكل منصة وجمهور',
      color: 'green',
      action: 'smart-scheduling',
    },
    {
      icon: BarChart3,
      title: 'تحليل SEO',
      description: 'احصل على استراتيجية SEO مخصصة لعملائك',
      color: 'orange',
      action: 'seo-analysis',
    },
    {
      icon: ImageIcon,
      title: 'توليد صور AI',
      description: 'أنشئ صور تسويقية احترافية بالذكاء الاصطناعي',
      color: 'pink',
      action: 'image-generation',
    },
    {
      icon: TrendingUp,
      title: 'تحليل المنافسين',
      description: 'افهم نقاط قوة وضعف منافسيك واحصل على استراتيجيات للتفوق',
      color: 'red',
      action: 'competitor-analysis',
    },
    {
      icon: Lightbulb,
      title: 'استراتيجية محتوى',
      description: 'خطة محتوى شاملة مخصصة لكل عميل',
      color: 'yellow',
      action: 'content-strategy',
    },
    {
      icon: FileText,
      title: 'تقارير تلقائية',
      description: 'تقارير أداء شاملة مكتوبة بشكل احترافي',
      color: 'cyan',
      action: 'auto-reports',
    },
  ];

  const quickActions = [
    {
      title: 'اكتب منشور الآن',
      description: 'اطلب من AI كتابة منشور لأي عميل',
      icon: Wand2,
      color: 'blue',
    },
    {
      title: 'حلل حملة',
      description: 'احصل على تحليل فوري لحملة إعلانية',
      icon: Brain,
      color: 'purple',
    },
    {
      title: 'اسأل المساعد',
      description: 'اسأل أي سؤال متعلق بالتسويق',
      icon: MessageSquare,
      color: 'green',
    },
  ];

  const recentAITasks = [
    {
      task: 'توليد محتوى لفندق قصر أبها',
      platform: 'Instagram',
      status: 'completed',
      time: 'منذ 5 دقائق',
      result: 'تم إنشاء 3 منشورات',
    },
    {
      task: 'تحسين حملة شركة المسار',
      platform: 'Facebook Ads',
      status: 'completed',
      time: 'منذ 15 دقيقة',
      result: 'ROI متوقع: +35%',
    },
    {
      task: 'تحليل SEO لمنتجع الجبل',
      platform: 'Google',
      status: 'completed',
      time: 'منذ ساعة',
      result: '12 كلمة مفتاحية مقترحة',
    },
    {
      task: 'جدولة محتوى الأسبوع القادم',
      platform: 'All Platforms',
      status: 'processing',
      time: 'قيد المعالجة...',
      result: '70% مكتمل',
    },
  ];

  if (showChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
        <DashboardHeader locale="ar" />

        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Chat Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setShowChat(false)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">مساعد المسار AI</h1>
                <p className="text-sm text-gray-400">متصل الآن</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-purple-500/30 flex flex-col" style={{ height: 'calc(100vh - 250px)' }}>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-white/10 text-white border border-white/20'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <div className="flex items-center justify-between mt-2 gap-3">
                      <p className="text-xs opacity-60">
                        {message.timestamp.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {message.role === 'assistant' && (
                        <button
                          onClick={() => copyToClipboard(message.content, index)}
                          className="text-xs opacity-60 hover:opacity-100 transition"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                    <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="px-6 py-3 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-2">اقتراحات سريعة:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(prompt)}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-white transition"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <DashboardHeader locale="ar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            مساعد المسار AI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            الذكاء الاصطناعي الذي يعمل نيابة عنك - من كتابة المحتوى إلى تحليل البيانات
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-8 w-8 text-blue-400" />
              <span className="text-3xl font-bold text-white">1,234</span>
            </div>
            <p className="text-gray-300 text-sm">محتوى مُنشأ</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-8 w-8 text-green-400" />
              <span className="text-3xl font-bold text-white">87</span>
            </div>
            <p className="text-gray-300 text-sm">حملات محسّنة</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-8 w-8 text-orange-400" />
              <span className="text-3xl font-bold text-white">156</span>
            </div>
            <p className="text-gray-300 text-sm">تحليلات أُجريت</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-8 w-8 text-yellow-400" />
              <span className="text-3xl font-bold text-white">42h</span>
            </div>
            <p className="text-gray-300 text-sm">وقت موفّر</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            إجراءات سريعة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/ar/content/new" className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-lg p-4 text-left transition group">
              <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition">
                <Wand2 className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="font-bold text-white mb-1">اكتب منشور الآن</h3>
              <p className="text-sm text-gray-400">اطلب من AI كتابة منشور لأي عميل</p>
            </Link>
            
            <Link href="/ar/analytics" className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-lg p-4 text-left transition group">
              <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition">
                <Brain className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="font-bold text-white mb-1">حلل حملة</h3>
              <p className="text-sm text-gray-400">احصل على تحليل فوري لحملة إعلانية</p>
            </Link>
            
            <button
              onClick={() => setShowChat(true)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-lg p-4 text-left transition group"
            >
              <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition">
                <MessageSquare className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="font-bold text-white mb-1">اسأل المساعد</h3>
              <p className="text-sm text-gray-400">اسأل أي سؤال متعلق بالتسويق</p>
            </button>
          </div>
        </div>

        {/* AI Features Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">قدرات الذكاء الاصطناعي</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const getLink = () => {
                switch(feature.action) {
                  case 'content-generation': return '/ar/content/new';
                  case 'image-creation': return '/ar/content/new';
                  case 'ad-optimization': return '/ar/media-buying';
                  case 'performance-analytics': return '/ar/analytics';
                  case 'seo-boost': return '/ar/seo';
                  case 'hashtag-research': return '/ar/content/new';
                  case 'competitor-analysis': return '/ar/analytics';
                  case 'content-strategy': return '/ar/content';
                  case 'auto-reports': return '/ar/analytics';
                  default: return '/ar/ai-assistant';
                }
              };
              return (
                <Link
                  key={index}
                  href={getLink()}
                  className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6 hover:bg-white/15 transition cursor-pointer group"
                >
                  <div className={`w-14 h-14 bg-${feature.color}-500/20 border border-${feature.color}-500/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                    <Icon className={`h-7 w-7 text-${feature.color}-400`} />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{feature.description}</p>
                  <span className="text-sm text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1">
                    جرب الآن
                    <Sparkles className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent AI Tasks */}
        <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            المهام الأخيرة
          </h2>
          <div className="space-y-4">
            {recentAITasks.map((task, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{task.task}</h3>
                    <p className="text-sm text-gray-400">{task.platform}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed'
                      ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                      : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300'
                  }`}>
                    {task.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{task.time}</span>
                  <span className="text-purple-400 font-medium">{task.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Chat Box */}
        <div className="mt-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-8 text-center">
          <MessageSquare className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">محادثة مع المساعد الذكي</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            اسأل أي سؤال متعلق بالتسويق الرقمي، وسأساعدك في إيجاد الحل الأمثل
          </p>
          <button
            onClick={() => setShowChat(true)}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition flex items-center gap-2 mx-auto"
          >
            <MessageSquare className="h-5 w-5" />
            ابدأ المحادثة
          </button>
        </div>
      </div>
    </div>
  );
}
