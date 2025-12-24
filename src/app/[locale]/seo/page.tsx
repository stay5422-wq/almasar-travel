'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { 
  Search,
  TrendingUp,
  Link2,
  FileSearch,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Plus,
  Download,
  RefreshCw,
  Globe,
  Zap,
  Target,
  Award
} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

export default function SEOPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const [keywordSearch, setKeywordSearch] = useState('');
  const [analyzingUrl, setAnalyzingUrl] = useState('');
  const [showKeywordTool, setShowKeywordTool] = useState(false);
  const [keywordResults, setKeywordResults] = useState<any[]>([]);

  // بيانات SEO للفنادق والشركات السياحية في أبها
  const seoOverview = {
    domainAuthority: 68,
    pageAuthority: 55,
    backlinks: 3420,
    referringDomains: 487,
    organicKeywords: 1256,
    organicTraffic: '45.8K',
    avgPosition: 8.5,
    visibilityScore: 82
  };

  const topKeywords = [
    { keyword: 'فنادق أبها', position: 2, volume: 18100, difficulty: 65, trend: 'up', traffic: 2890, client: 'فندق قصر أبها' },
    { keyword: 'باقات العمرة من أبها', position: 4, volume: 12400, difficulty: 58, trend: 'up', traffic: 1567, client: 'شركة المسار' },
    { keyword: 'سياحة أبها', position: 6, volume: 24100, difficulty: 72, trend: 'up', traffic: 3234, client: 'هيئة السياحة' },
    { keyword: 'منتجعات الجبل الأخضر', position: 3, volume: 8300, difficulty: 45, trend: 'up', traffic: 1445, client: 'منتجع الجبل' },
    { keyword: 'رحلات سياحية أبها', position: 7, volume: 15700, difficulty: 68, trend: 'same', traffic: 1812, client: 'السفريات الذهبية' }
  ];

  const siteIssues = [
    { type: 'critical', count: 2, label: 'مشاكل حرجة', color: 'red', icon: AlertCircle },
    { type: 'warning', count: 8, label: 'تحذيرات', color: 'yellow', icon: Clock },
    { type: 'notice', count: 15, label: 'ملاحظات', color: 'blue', icon: CheckCircle }
  ];

  const recentBacklinks = [
    { domain: 'saudiattractions.sa', authority: 75, type: 'dofollow', status: 'active', date: '2025-12-20', client: 'هيئة السياحة' },
    { domain: 'visitabha.com', authority: 68, type: 'dofollow', status: 'active', date: '2025-12-19', client: 'بلدية أبها' },
    { domain: 'hotels-guide.sa', authority: 52, type: 'dofollow', status: 'active', date: '2025-12-18', client: 'فندق قصر أبها' },
    { domain: 'travel-ksa.net', authority: 61, type: 'dofollow', status: 'active', date: '2025-12-17', client: 'شركة المسار' }
  ];

  const competitorAnalysis = [
    { name: 'موقعنا', authority: 68, keywords: '1,256', backlinks: 3420, traffic: '45.8K' },
    { name: 'booking.sa', authority: 85, keywords: '4,567', backlinks: 12400, traffic: '156K' },
    { name: 'hotels.com.sa', authority: 72, keywords: '2,890', backlinks: 8900, traffic: '89K' },
    { name: 'trivago.sa', authority: 78, keywords: '3,245', backlinks: 10200, traffic: '112K' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <DashboardHeader locale={locale} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SEO Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Globe className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">{seoOverview.domainAuthority}</span>
            </div>
            <p className="text-gray-300 text-sm">Domain Authority</p>
            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all" 
                style={{ width: `${seoOverview.domainAuthority}%` }}
              />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <FileSearch className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-white">{seoOverview.pageAuthority}</span>
            </div>
            <p className="text-gray-300 text-sm">Page Authority</p>
            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all" 
                style={{ width: `${seoOverview.pageAuthority}%` }}
              />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Link2 className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">{seoOverview.backlinks.toLocaleString()}</span>
            </div>
            <p className="text-gray-300 text-sm">إجمالي الباك لينك</p>
            <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              +45 هذا الشهر
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-orange-400" />
              <span className="text-2xl font-bold text-white">{seoOverview.organicKeywords.toLocaleString()}</span>
            </div>
            <p className="text-gray-300 text-sm">الكلمات المفتاحية</p>
            <p className="text-gray-400 text-sm mt-2">
              متوسط الموضع: #{seoOverview.avgPosition}
            </p>
          </div>
        </div>

        {/* SEO Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400" />
                درجة SEO الشاملة
              </h3>
              <span className="text-3xl font-bold text-white">{seoOverview.visibilityScore}%</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">الزيارات العضوية</span>
                  <span className="text-white font-medium">{seoOverview.organicTraffic}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '82%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">المواقع المشيرة</span>
                  <span className="text-white font-medium">{seoOverview.referringDomains}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              فحص الموقع
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {siteIssues.map((issue) => {
                const Icon = issue.icon;
                return (
                  <div key={issue.type} className={`text-center p-4 rounded-lg ${
                    issue.type === 'critical' ? 'bg-red-500/20 border border-red-500/30' :
                    issue.type === 'warning' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                    'bg-blue-500/20 border border-blue-500/30'
                  }`}>
                    <Icon className={`h-6 w-6 mx-auto mb-2 ${
                      issue.type === 'critical' ? 'text-red-400' :
                      issue.type === 'warning' ? 'text-yellow-400' :
                      'text-blue-400'
                    }`} />
                    <p className="text-2xl font-bold text-white">{issue.count}</p>
                    <p className="text-xs text-gray-300 mt-1">{issue.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Keywords & Backlinks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Keywords */}
          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-400" />
                أهم الكلمات المفتاحية
              </h2>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                عرض الكل →
              </button>
            </div>
            
            <div className="space-y-3">
              {topKeywords.map((keyword, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{keyword.keyword}</span>
                        {keyword.trend === 'up' && <ArrowUpRight className="h-4 w-4 text-green-400" />}
                        {keyword.trend === 'down' && <ArrowDownRight className="h-4 w-4 text-red-400" />}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{keyword.client}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-bold rounded-full">
                      #{keyword.position}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">حجم البحث</p>
                      <p className="font-medium text-white">{keyword.volume.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">الصعوبة</p>
                      <p className="font-medium text-white">{keyword.difficulty}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">الزيارات</p>
                      <p className="font-medium text-green-400">{keyword.traffic}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Backlinks */}
          <div className="bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Link2 className="h-5 w-5 text-purple-400" />
                الباك لينك الجديد
              </h2>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                عرض الكل →
              </button>
            </div>
            
            <div className="space-y-3">
              {recentBacklinks.map((backlink, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-white flex items-center gap-2">
                        {backlink.domain}
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </p>
                      <p className="text-sm text-gray-400 mt-1">{backlink.client}</p>
                      <p className="text-xs text-gray-500 mt-1">{backlink.date}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      backlink.status === 'active' 
                        ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                        : 'bg-red-500/20 border border-red-500/30 text-red-300'
                    }`}>
                      {backlink.status === 'active' ? 'نشط' : 'فُقد'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm mt-3">
                    <span className="text-gray-400">DA: <span className="font-medium text-white">{backlink.authority}</span></span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      backlink.type === 'dofollow' 
                        ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300' 
                        : 'bg-gray-500/20 border border-gray-500/30 text-gray-300'
                    }`}>
                      {backlink.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="mt-6 bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            تحليل المنافسين
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">الموقع</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">Authority</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">الكلمات</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">الباك لينك</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">الزيارات</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300"></th>
                </tr>
              </thead>
              <tbody>
                {competitorAnalysis.map((competitor, index) => (
                  <tr key={index} className={`border-b border-white/5 ${competitor.name === 'موقعنا' ? 'bg-blue-500/10' : ''}`}>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${competitor.name === 'موقعنا' ? 'text-blue-300' : 'text-white'}`}>
                        {competitor.name}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2 w-16">
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: `${competitor.authority}%` }}></div>
                        </div>
                        <span className="text-sm font-medium text-white">{competitor.authority}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-white">{competitor.keywords}</td>
                    <td className="py-3 px-4 font-medium text-white">{competitor.backlinks.toLocaleString()}</td>
                    <td className="py-3 px-4 font-medium text-white">{competitor.traffic}</td>
                    <td className="py-3 px-4">
                      <button className="text-purple-400 hover:text-purple-300 text-sm">تحليل</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Keyword Research Tool Modal */}
      {showKeywordTool && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-gray-900 to-gray-800 border-b border-purple-500/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">أداة بحث الكلمات المفتاحية</h2>
                <button
                  onClick={() => setShowKeywordTool(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  <span className="text-white text-xl">✕</span>
                </button>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={keywordSearch}
                  onChange={(e) => setKeywordSearch(e.target.value)}
                  placeholder="أدخل كلمة مفتاحية (مثل: فنادق أبها)"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                />
                <button
                  onClick={() => {
                    if (keywordSearch) {
                      // محاكاة نتائج البحث
                      setKeywordResults([
                        { keyword: keywordSearch, volume: 18100, difficulty: 65, cpc: 2.4, competition: 'عالي', trend: 'up' },
                        { keyword: `${keywordSearch} رخيصة`, volume: 8200, difficulty: 45, cpc: 1.8, competition: 'متوسط', trend: 'up' },
                        { keyword: `${keywordSearch} مع إفطار`, volume: 6500, difficulty: 42, cpc: 2.1, competition: 'متوسط', trend: 'up' },
                        { keyword: `افضل ${keywordSearch}`, volume: 12400, difficulty: 58, cpc: 3.2, competition: 'عالي', trend: 'up' },
                        { keyword: `${keywordSearch} قريبة مني`, volume: 5300, difficulty: 38, cpc: 1.5, competition: 'منخفض', trend: 'same' }
                      ]);
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition font-medium"
                >
                  بحث
                </button>
              </div>
            </div>

            <div className="p-6">
              {keywordResults.length > 0 ? (
                <div className="space-y-4">
                  {keywordResults.map((result, index) => (
                    <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{result.keyword}</h3>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-400">حجم البحث: <span className="text-white font-medium">{result.volume.toLocaleString()}</span></span>
                            <span className="text-gray-400">CPC: <span className="text-green-400 font-medium">${result.cpc}</span></span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {result.trend === 'up' ? (
                            <ArrowUpRight className="w-5 h-5 text-green-400" />
                          ) : (
                            <span className="text-gray-500">→</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">صعوبة الكلمة</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  result.difficulty > 60 ? 'bg-red-500' : 
                                  result.difficulty > 40 ? 'bg-yellow-500' : 
                                  'bg-green-500'
                                }`}
                                style={{ width: `${result.difficulty}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-white">{result.difficulty}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400 mb-1">المنافسة</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            result.competition === 'عالي' ? 'bg-red-500/20 text-red-300' :
                            result.competition === 'متوسط' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {result.competition}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">أدخل كلمة مفتاحية للبدء في البحث</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setShowKeywordTool(true)}
        className="fixed bottom-8 left-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-purple-500/50 transition"
      >
        <Search className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
