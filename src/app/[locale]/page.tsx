import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  BarChart3, FileText, Video, Target, TrendingUp, Zap,
  MessageSquare, Search, Globe, Users, Mountain, Hotel,
  ArrowRight, CheckCircle2, Sparkles, Calendar, Mail, Building
} from 'lucide-react';
import StarryBackground from '@/components/StarryBackground';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'المسار الساخن - التسويق الإلكتروني للسياحة في أبها والمملكة',
    description: 'نسوق للفنادق والمنتجعات والشركات السياحية في أبها والمملكة العربية السعودية - إنشاء محتوى، إعلانات، SEO، تحليلات',
    openGraph: {
      title: 'المسار الساخن - التسويق الإلكتروني للسياحة',
      description: 'حلول تسويقية متكاملة للقطاع السياحي في أبها والمملكة',
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen relative">
      <StarryBackground />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg shadow-lg border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mountain className="h-8 w-8 text-purple-400 animate-pulse" />
              <div>
                <h1 className="text-xl font-bold text-white">المسار الساخن</h1>
                <p className="text-xs text-purple-300">التسويق الإلكتروني للسياحة</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link href={`/${locale}/dashboard`} className="text-gray-300 hover:text-purple-400 transition flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                لوحة التحكم
              </Link>
              <Link href={`/${locale}/content`} className="text-gray-300 hover:text-purple-400 transition flex items-center gap-2">
                <FileText className="h-4 w-4" />
                إدارة المحتوى
              </Link>
              <Link href={`/${locale}/media-buying`} className="text-gray-300 hover:text-purple-400 transition flex items-center gap-2">
                <Target className="h-4 w-4" />
                الميديا باير
              </Link>
              <Link href={`/${locale}/seo`} className="text-gray-300 hover:text-purple-400 transition flex items-center gap-2">
                <Search className="h-4 w-4" />
                SEO
              </Link>
              <Link href={`/${locale}/analytics`} className="text-gray-300 hover:text-purple-400 transition flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                التحليلات
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href={locale === 'ar' ? '/en' : '/ar'}
                className="px-3 py-1 text-sm border border-purple-500/30 text-gray-300 rounded-lg hover:bg-purple-500/20 transition"
              >
                {locale === 'ar' ? 'English' : 'العربية'}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition shadow-lg shadow-purple-500/50"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/50 text-purple-300 rounded-full mb-6 backdrop-blur-sm border border-purple-500/30">
              <TrendingUp className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-semibold">متخصصون في التسويق للقطاع السياحي</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              نسوق لسياحة أبها
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">والمملكة العربية السعودية</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              نساعد الفنادق والمنتجعات والشركات السياحية في الوصول لعملائها من خلال استراتيجيات تسويق رقمية متكاملة
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href={`/${locale}/content`}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition font-bold text-lg shadow-2xl shadow-purple-500/50 flex items-center justify-center gap-2"
              >
                <FileText className="h-5 w-5" />
                <span>إنشاء المحتوى</span>
              </Link>
              <Link
                href={`/${locale}/media-buying`}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition font-bold text-lg border-2 border-purple-500/30 flex items-center justify-center gap-2"
              >
                <Target className="h-5 w-5" />
                <span>إدارة الإعلانات</span>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-400">50+</div>
                <div className="text-sm text-gray-400">عميل سياحي</div>
              </div>
              <div className="h-12 w-px bg-purple-500/30"></div>
              <div>
                <div className="text-3xl font-bold text-pink-400">1M+</div>
                <div className="text-sm text-gray-400">وصول شهري</div>
              </div>
              <div className="h-12 w-px bg-purple-500/30"></div>
              <div>
                <div className="text-3xl font-bold text-blue-400">200%</div>
                <div className="text-sm text-gray-400">نمو متوسط</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">خدماتنا التسويقية</h2>
            <p className="text-xl text-gray-300">حلول متكاملة للتسويق الإلكتروني في القطاع السياحي</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: FileText,
                title: 'إنشاء المحتوى السياحي',
                desc: 'محتوى جذاب ومبدع للفنادق والمنتجعات والجولات السياحية في أبها والمملكة',
                features: ['كتابة مقالات SEO', 'محتوى وسائل التواصل', 'نصوص إعلانية']
              },
              {
                icon: Video,
                title: 'إنتاج الفيديو والتصوير',
                desc: 'فيديوهات احترافية لعرض جمال الوجهات السياحية والفنادق',
                features: ['تصوير جوي بالدرون', 'فيديوهات ترويجية', 'جولات افتراضية 360']
              },
              {
                icon: Target,
                title: 'إدارة الحملات الإعلانية',
                desc: 'حملات مستهدفة على جوجل وفيسبوك وإنستجرام لجذب السياح',
                features: ['إعلانات جوجل', 'إعلانات سوشيال ميديا', 'إعادة الاستهداف']
              },
              {
                icon: Search,
                title: 'تحسين محركات البحث SEO',
                desc: 'ظهور قوي في نتائج البحث للكلمات المفتاحية السياحية',
                features: ['SEO محلي لأبها', 'بناء الروابط', 'تحسين الظهور']
              },
              {
                icon: BarChart3,
                title: 'التحليلات والتقارير',
                desc: 'تقارير تفصيلية عن أداء الحملات وسلوك الزوار',
                features: ['Google Analytics', 'تقارير شهرية', 'توصيات التحسين']
              },
              {
                icon: MessageSquare,
                title: 'إدارة وسائل التواصل',
                desc: 'إدارة متكاملة لحسابات الفنادق والشركات السياحية',
                features: ['نشر منتظم', 'رد على التعليقات', 'بناء المجتمع']
              }
            ].map((service, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-purple-500/30 hover:border-purple-500/50 transition group hover:transform hover:scale-105">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="h-4 w-4 text-purple-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Clients */}
      <section className="py-20 relative bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">من نسوق لهم؟</h2>
            <p className="text-xl text-gray-300">عملاؤنا في القطاع السياحي بأبها والمملكة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Hotel,
                title: 'الفنادق والمنتجعات',
                desc: 'نسوق للفنادق المتعاقدة معنا في أبها ومنطقة عسير لزيادة الحجوزات'
              },
              {
                icon: Building,
                title: 'الشركات السياحية',
                desc: 'نساعد الشركات السياحية في تسويق برامجها وجذب السياح السعوديين والخليجيين'
              },
              {
                icon: Users,
                title: 'مجموعات الشركات',
                desc: 'نسوق للشركات التي تبحث عن حجوزات جماعية لموظفيها ورحلات الحوافز'
              }
            ].map((client, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-purple-500/30 text-center hover:transform hover:scale-105 transition">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-6">
                  <client.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{client.title}</h3>
                <p className="text-gray-300">{client.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Hotel, label: 'فنادق ومنتجعات', value: '50+', desc: 'عميل نشط' },
                { icon: Mountain, label: 'حملات إعلانية', value: '200+', desc: 'حملة ناجحة' },
                { icon: Users, label: 'وصول شهري', value: '1M+', desc: 'مشاهدة' },
                { icon: TrendingUp, label: 'نمو الحجوزات', value: '200%', desc: 'متوسط النمو' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-purple-500/30 hover:border-purple-500/50 transition">
                  <stat.icon className="h-10 w-10 text-purple-400 mb-4" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">باقات التسويق الإلكتروني</h2>
            <p className="text-xl text-gray-300">
              اختر الباقة المناسبة لفندقك أو شركتك السياحية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'الباقة الأساسية',
                price: '4,999',
                period: 'شهرياً',
                features: [
                  'إدارة 3 منصات تواصل اجتماعي',
                  '20 منشور شهرياً',
                  'تصميم محتوى مرئي',
                  'رد على التعليقات',
                  'تقرير شهري',
                ],
                color: 'from-blue-600 to-cyan-600'
              },
              {
                name: 'الباقة الاحترافية',
                price: '9,999',
                period: 'شهرياً',
                features: [
                  'كل مزايا الباقة الأساسية',
                  'حملات إعلانية (5,000 ريال ميزانية)',
                  '5 فيديوهات قصيرة شهرياً',
                  'تحسين محركات البحث SEO',
                  'إعلانات جوجل',
                  'تقارير أسبوعية',
                ],
                color: 'from-purple-600 to-pink-600',
                popular: true
              },
              {
                name: 'الباقة الماسية',
                price: '19,999',
                period: 'شهرياً',
                features: [
                  'كل مزايا الباقة الاحترافية',
                  'ميزانية إعلانات 15,000 ريال',
                  'تصوير احترافي شهري',
                  'إنتاج فيديو طويل شهرياً',
                  'حملة انفلونسرز',
                  'مدير حساب مخصص',
                  'تقارير يومية',
                ],
                color: 'from-amber-600 to-orange-600'
              },
            ].map((plan, i) => (
              <div key={i} className={`relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl border-2 ${plan.popular ? 'border-purple-500 shadow-2xl shadow-purple-500/50' : 'border-purple-500/30'} hover:transform hover:scale-105 transition`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-full shadow-lg">
                      الأكثر طلباً
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>{plan.price}</span>
                  <span className="text-gray-400">ريال</span>
                  <span className="text-gray-500 text-sm">/ {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/contact`}
                  className={`block w-full py-3 text-center font-bold rounded-xl transition ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/50'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-purple-500/30'
                  }`}
                >
                  ابدأ الآن
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">هل أنت مستعد لتنمية أعمالك السياحية؟</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            انضم لعملائنا من الفنادق والشركات السياحية واحصل على استشارة مجانية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition font-bold text-lg shadow-2xl flex items-center justify-center gap-2"
            >
              <Calendar className="h-5 w-5" />
              احجز استشارة مجانية
            </Link>
            <Link
              href={`/${locale}/dashboard`}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition font-bold text-lg backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <Mail className="h-5 w-5" />
              تواصل معنا الآن
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-purple-500/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Mountain className="h-8 w-8 text-purple-400" />
                <div>
                  <h3 className="text-xl font-bold">المسار الساخن</h3>
                  <p className="text-sm text-purple-300">السياحة في أبها</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                وجهتك المثالية لحجز أفضل وحدات الضيافة والجولات السياحية في مدينة أبها الساحرة
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">خدماتنا</h4>
              <ul className="space-y-2">
                <li><Link href={`/${locale}/hotels`} className="text-gray-400 hover:text-purple-400 transition">حجز الفنادق</Link></li>
                <li><Link href={`/${locale}/tours`} className="text-gray-400 hover:text-purple-400 transition">الجولات السياحية</Link></li>
                <li><Link href={`/${locale}/packages`} className="text-gray-400 hover:text-purple-400 transition">الباقات السياحية</Link></li>
                <li><Link href={`/${locale}/transportation`} className="text-gray-400 hover:text-purple-400 transition">خدمات النقل</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">عن أبها</h4>
              <ul className="space-y-2">
                <li><Link href={`/${locale}/about-abha`} className="text-gray-400 hover:text-purple-400 transition">عن المدينة</Link></li>
                <li><Link href={`/${locale}/attractions`} className="text-gray-400 hover:text-purple-400 transition">الأماكن السياحية</Link></li>
                <li><Link href={`/${locale}/weather`} className="text-gray-400 hover:text-purple-400 transition">الطقس</Link></li>
                <li><Link href={`/${locale}/guide`} className="text-gray-400 hover:text-purple-400 transition">دليل الزائر</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@almasar-travel.sa</li>
                <li>📱 +966 17 XXX XXXX</li>
                <li>📍 أبها، منطقة عسير، السعودية</li>
              </ul>
              <div className="flex gap-4 mt-4">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">F</a>
                <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition">I</a>
                <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition">T</a>
                <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition">W</a>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-900/50 pt-8 text-center text-gray-400">
            <p>© 2025 جميع الحقوق محفوظة - المسار الساخن للسياحة والسفر في أبها</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
