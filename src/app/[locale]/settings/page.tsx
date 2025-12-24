'use client';

import { use } from 'react';
import Link from 'next/link';
import { 
  ArrowRight,
  Link2,
  User,
  Bell,
  Lock,
  CreditCard,
  Database,
  Globe,
  Palette,
  Shield,
  FileText
} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

export default function SettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);

  const settingsGroups = [
    {
      title: 'الحسابات والربط',
      items: [
        {
          icon: Link2,
          title: 'ربط الحسابات',
          description: 'اربط حساباتك على المنصات الاجتماعية',
          href: `/${locale}/settings/accounts`,
          color: 'purple',
          badge: 'مهم'
        },
        {
          icon: User,
          title: 'الملف الشخصي',
          description: 'معلوماتك الشخصية وإعدادات الحساب',
          href: `/${locale}/settings/profile`,
          color: 'blue'
        }
      ]
    },
    {
      title: 'التطبيق',
      items: [
        {
          icon: Bell,
          title: 'الإشعارات',
          description: 'إدارة التنبيهات والإشعارات',
          href: `/${locale}/settings/notifications`,
          color: 'yellow'
        },
        {
          icon: Globe,
          title: 'اللغة والمنطقة',
          description: 'تغيير اللغة والتوقيت الزمني',
          href: `/${locale}/settings/language`,
          color: 'green'
        },
        {
          icon: Palette,
          title: 'المظهر',
          description: 'تخصيص الألوان والثيم',
          href: `/${locale}/settings/appearance`,
          color: 'pink'
        }
      ]
    },
    {
      title: 'الأمان والخصوصية',
      items: [
        {
          icon: Lock,
          title: 'كلمة المرور',
          description: 'تغيير كلمة المرور وإعدادات الأمان',
          href: `/${locale}/settings/security`,
          color: 'red'
        },
        {
          icon: Shield,
          title: 'الخصوصية',
          description: 'إدارة البيانات والخصوصية',
          href: `/${locale}/settings/privacy`,
          color: 'indigo'
        }
      ]
    },
    {
      title: 'الاشتراك والفوترة',
      items: [
        {
          icon: CreditCard,
          title: 'الاشتراك',
          description: 'إدارة الاشتراك وطرق الدفع',
          href: `/${locale}/settings/billing`,
          color: 'emerald'
        },
        {
          icon: FileText,
          title: 'الفواتير',
          description: 'تحميل الفواتير والسجلات',
          href: `/${locale}/settings/invoices`,
          color: 'cyan'
        }
      ]
    },
    {
      title: 'البيانات',
      items: [
        {
          icon: Database,
          title: 'تصدير البيانات',
          description: 'تنزيل نسخة من بياناتك',
          href: `/${locale}/settings/export`,
          color: 'orange'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <DashboardHeader locale={locale} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href={`/${locale}/dashboard`}
            className="p-2 bg-white/10 border border-purple-500/30 rounded-lg hover:bg-white/20 transition"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">الإعدادات</h1>
            <p className="text-gray-400 mt-1">إدارة حسابك وتفضيلات التطبيق</p>
          </div>
        </div>

        {/* Settings Groups */}
        <div className="space-y-8">
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h2 className="text-xl font-bold text-white mb-4">{group.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      className="p-6 bg-white/10 backdrop-blur-lg border border-purple-500/30 rounded-xl hover:bg-white/15 hover:border-purple-500/50 transition group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-${item.color}-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition`}>
                          <Icon className={`w-6 h-6 text-${item.color}-400`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-white">{item.title}</h3>
                            {item.badge && (
                              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 transform rotate-180 group-hover:translate-x-1 transition" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-3">روابط سريعة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <Link href="/docs/setup" className="text-blue-400 hover:text-blue-300 transition">
              📚 دليل الإعداد
            </Link>
            <Link href="/docs/api" className="text-blue-400 hover:text-blue-300 transition">
              🔌 API Documentation
            </Link>
            <Link href="/support" className="text-blue-400 hover:text-blue-300 transition">
              💬 الدعم الفني
            </Link>
            <Link href="/changelog" className="text-blue-400 hover:text-blue-300 transition">
              📝 التحديثات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
