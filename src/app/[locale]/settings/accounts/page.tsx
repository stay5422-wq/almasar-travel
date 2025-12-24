'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Video,
  CheckCircle,
  AlertCircle,
  Plus,
  Settings,
  RefreshCw,
  Trash2,
  ExternalLink
} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

interface ConnectedAccount {
  id: string;
  platform: string;
  name: string;
  username: string;
  avatar: string;
  status: 'connected' | 'disconnected' | 'error';
  connectedAt: string;
  followers?: number;
}

export default function AccountsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const searchParams = useSearchParams();
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    // يمكن جلبها من قاعدة البيانات
  ]);
  const [connecting, setConnecting] = useState<string | null>(null);

  // Check for OAuth callback results
  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    const fbDataParam = searchParams.get('fbdata');
    const dataParam = searchParams.get('data'); // للتوافق مع الكود القديم
    
    if (success === 'true' && fbDataParam) {
      try {
        const fbData = JSON.parse(decodeURIComponent(fbDataParam));
        
        // حفظ البيانات الكاملة في localStorage
        const facebookAccounts = localStorage.getItem('facebook_accounts');
        const accounts = facebookAccounts ? JSON.parse(facebookAccounts) : [];
        
        // التحقق من عدم وجود الحساب مسبقاً
        const existingIndex = accounts.findIndex((acc: any) => acc.userId === fbData.userId);
        if (existingIndex === -1) {
          accounts.push(fbData);
          localStorage.setItem('facebook_accounts', JSON.stringify(accounts));
        } else {
          // تحديث البيانات
          accounts[existingIndex] = fbData;
          localStorage.setItem('facebook_accounts', JSON.stringify(accounts));
        }
        
        // Add the connected Facebook account to UI
        const newAccount: ConnectedAccount = {
          id: fbData.userId,
          platform: 'facebook',
          name: fbData.name,
          username: fbData.email,
          avatar: fbData.picture || '👤',
          status: 'connected',
          connectedAt: fbData.connectedAt,
          followers: 0
        };
        
        setAccounts(prev => {
          const exists = prev.find(acc => acc.id === fbData.userId);
          if (exists) return prev;
          return [...prev, newAccount];
        });
        
        const pagesCount = fbData.pages?.length || 0;
        const pagesNames = fbData.pages?.slice(0, 3).map((p: any) => p.name).join(', ') || 'لا توجد صفحات';
        
        alert(`✅ تم ربط حساب Facebook بنجاح!\n\n👤 ${fbData.name}\n📧 ${fbData.email}\n📄 عدد الصفحات: ${pagesCount}\n📋 الصفحات: ${pagesNames}`);
        
        // Clean up URL
        window.history.replaceState({}, '', `/${locale}/settings/accounts`);
      } catch (err) {
        console.error('Error parsing OAuth data:', err);
      }
    } else if (success === 'true' && dataParam) {
      // للتوافق مع الكود القديم
      try {
        const data = JSON.parse(decodeURIComponent(dataParam));
        
        const newAccount: ConnectedAccount = {
          id: data.userId,
          platform: 'facebook',
          name: data.name,
          username: data.email,
          avatar: '👤',
          status: 'connected',
          connectedAt: new Date().toISOString(),
          followers: 0
        };
        
        setAccounts(prev => {
          const exists = prev.find(acc => acc.id === data.userId);
          if (exists) return prev;
          return [...prev, newAccount];
        });
        
        alert(`✅ تم ربط حساب Facebook بنجاح!\n\n👤 ${data.name}\n📧 ${data.email}\n📄 عدد الصفحات: ${data.pages || 0}`);
        
        window.history.replaceState({}, '', `/${locale}/settings/accounts`);
      } catch (err) {
        console.error('Error parsing OAuth data:', err);
      }
    } else if (error) {
      let errorMessage = 'حدث خطأ أثناء الربط';
      
      switch (error) {
        case 'access_denied':
          errorMessage = '❌ تم رفض الوصول. يجب الموافقة على الأذونات للربط.';
          break;
        case 'no_code':
          errorMessage = '❌ لم يتم استلام كود التفويض من Facebook.';
          break;
        case 'token_exchange_failed':
          errorMessage = '❌ فشل تبادل الرمز. تحقق من إعدادات التطبيق.';
          break;
        case 'user_info_failed':
          errorMessage = '❌ فشل الحصول على معلومات المستخدم.';
          break;
        case 'server_error':
          errorMessage = '❌ خطأ في الخادم. حاول مرة أخرى.';
          break;
      }
      
      alert(errorMessage);
      
      // Clean up URL
      window.history.replaceState({}, '', `/${locale}/settings/accounts`);
    }
  }, [searchParams, locale]);

  const platforms = [
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'blue',
      description: 'انشر على صفحات Facebook ومجموعاتك',
      oauth: true
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: Instagram, 
      color: 'pink',
      description: 'انشر صور وفيديوهات على Instagram',
      oauth: true
    },
    { 
      id: 'twitter', 
      name: 'Twitter/X', 
      icon: Twitter, 
      color: 'sky',
      description: 'انشر تغريدات وسلاسل',
      oauth: true
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: Linkedin, 
      color: 'indigo',
      description: 'انشر على ملفك الشخصي وصفحات الشركة',
      oauth: true
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: Youtube, 
      color: 'red',
      description: 'ارفع فيديوهات وإدارة القناة',
      oauth: true
    },
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      icon: Video, 
      color: 'purple',
      description: 'انشر فيديوهات قصيرة',
      oauth: true
    }
  ];

  const handleConnect = async (platformId: string) => {
    setConnecting(platformId);
    
    try {
      // Check if DEMO_MODE is enabled
      const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
      
      if (isDemoMode && platformId !== 'facebook') {
        // Demo mode for other platforms
        alert(`🔄 جاري فتح نافذة OAuth لربط ${platforms.find(p => p.id === platformId)?.name}...\n\nسيتم:\n1. فتح صفحة تسجيل الدخول\n2. طلب الأذونات\n3. إعادة التوجيه والربط\n\n⚠️ ملاحظة: لتفعيل هذه الميزة، تحتاج:\n• App ID من كل منصة\n• OAuth Credentials\n• Callback URLs مسجلة`);
        
        setTimeout(() => {
          const newAccount: ConnectedAccount = {
            id: Date.now().toString(),
            platform: platformId,
            name: `My ${platforms.find(p => p.id === platformId)?.name} Account`,
            username: `@demo_${platformId}`,
            avatar: '👤',
            status: 'connected',
            connectedAt: new Date().toISOString(),
            followers: Math.floor(Math.random() * 10000) + 1000
          };
          
          setAccounts([...accounts, newAccount]);
          setConnecting(null);
          alert('✅ تم الربط بنجاح!');
        }, 2000);
      } else if (platformId === 'facebook') {
        // Real Facebook OAuth
        window.location.href = `/api/auth/facebook/login?locale=${locale}`;
      } else {
        // Other platforms - coming soon
        alert(`⚠️ ربط ${platforms.find(p => p.id === platformId)?.name} قريباً!\n\nحالياً متاح فقط:\n✅ Facebook\n\nقريباً:\n⏳ Instagram\n⏳ Twitter\n⏳ LinkedIn\n⏳ YouTube\n⏳ TikTok`);
        setConnecting(null);
      }
      
    } catch (error) {
      console.error('Connection error:', error);
      alert('❌ فشل الربط. حاول مرة أخرى.');
      setConnecting(null);
    }
  };

  const handleDisconnect = (accountId: string) => {
    if (confirm('هل تريد فصل هذا الحساب؟')) {
      setAccounts(accounts.filter(acc => acc.id !== accountId));
      alert('✅ تم فصل الحساب بنجاح');
    }
  };

  const handleRefresh = async (accountId: string) => {
    alert('🔄 جاري تحديث بيانات الحساب...');
    // في الإنتاج، سيتم تحديث التوكن والبيانات
    setTimeout(() => {
      alert('✅ تم التحديث بنجاح');
    }, 1000);
  };

  const isConnected = (platformId: string) => {
    return accounts.some(acc => acc.platform === platformId && acc.status === 'connected');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <DashboardHeader locale={locale} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/settings`}
              className="p-2 bg-white/10 border border-purple-500/30 rounded-lg hover:bg-white/20 transition"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">ربط الحسابات</h1>
              <p className="text-gray-400 mt-1">اربط حساباتك على منصات التواصل الاجتماعي</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">الحسابات المربوطة</p>
            <p className="text-2xl font-bold text-white">{accounts.filter(a => a.status === 'connected').length}</p>
          </div>
        </div>

        {/* Connected Accounts */}
        {accounts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">الحسابات المربوطة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accounts.map((account) => {
                const platform = platforms.find(p => p.id === account.platform);
                const Icon = platform?.icon || Facebook;
                
                return (
                  <div
                    key={account.id}
                    className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-${platform?.color}-500/20 rounded-xl flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 text-${platform?.color}-400`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{account.name}</h3>
                          <p className="text-sm text-gray-400">{account.username}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {account.status === 'connected' && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                        {account.status === 'error' && (
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    </div>

                    {account.followers && (
                      <div className="mb-4 pb-4 border-b border-white/10">
                        <p className="text-sm text-gray-400">المتابعون</p>
                        <p className="text-xl font-bold text-white">{account.followers.toLocaleString()}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRefresh(account.id)}
                        className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition flex items-center justify-center gap-2 text-sm"
                      >
                        <RefreshCw className="w-4 h-4" />
                        تحديث
                      </button>
                      <button
                        onClick={() => handleDisconnect(account.id)}
                        className="flex-1 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition flex items-center justify-center gap-2 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        فصل
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Available Platforms */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">المنصات المتاحة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              const connected = isConnected(platform.id);
              const isConnecting = connecting === platform.id;
              
              return (
                <div
                  key={platform.id}
                  className={`bg-white/10 backdrop-blur-lg border rounded-xl p-6 transition ${
                    connected 
                      ? 'border-green-500/50 bg-green-500/10' 
                      : 'border-purple-500/30 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-${platform.color}-500/20 rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${platform.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{platform.name}</h3>
                      {connected && (
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          متصل
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-4">{platform.description}</p>

                  {!connected ? (
                    <button
                      onClick={() => handleConnect(platform.id)}
                      disabled={isConnecting}
                      className={`w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center justify-center gap-2 ${
                        isConnecting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isConnecting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          جاري الربط...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          ربط الحساب
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      <CheckCircle className="w-4 h-4" />
                      مربوط
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            خطوات الربط
          </h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>1️⃣ انقر على "ربط الحساب" للمنصة المطلوبة</p>
            <p>2️⃣ سجل دخول إلى حسابك على المنصة</p>
            <p>3️⃣ امنح الأذونات المطلوبة للتطبيق</p>
            <p>4️⃣ سيتم ربط الحساب تلقائياً</p>
            <p>5️⃣ ابدأ في نشر المحتوى مباشرة من المنصة</p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-500/30">
            <p className="text-xs text-gray-400">
              💡 لتفعيل الربط الحقيقي، تحتاج إلى تسجيل التطبيق على كل منصة والحصول على:
              <br />• Facebook: App ID & App Secret
              <br />• Instagram: Business Account + Facebook Page
              <br />• Twitter: API Keys & Access Tokens
              <br />• LinkedIn: Client ID & Client Secret
              <br />• YouTube: OAuth 2.0 Credentials
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href={`/${locale}/content/new`}
            className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition text-center"
          >
            <Plus className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-1">إنشاء منشور</h3>
            <p className="text-sm text-gray-400">انشر على جميع حساباتك</p>
          </Link>

          <Link
            href={`/${locale}/content`}
            className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl hover:from-blue-500/30 hover:to-cyan-500/30 transition text-center"
          >
            <Settings className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-1">إدارة المحتوى</h3>
            <p className="text-sm text-gray-400">جدولة ومتابعة المنشورات</p>
          </Link>

          <Link
            href={`/${locale}/analytics`}
            className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl hover:from-green-500/30 hover:to-emerald-500/30 transition text-center"
          >
            <ExternalLink className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-1">التحليلات</h3>
            <p className="text-sm text-gray-400">تابع أداء حساباتك</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
