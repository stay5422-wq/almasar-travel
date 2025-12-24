'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  FileText, 
  Target, 
  Search, 
  TrendingUp,
  Mountain,
  Bell,
  Settings,
  User,
  Sparkles,
  Megaphone,
  Zap
} from 'lucide-react';

interface DashboardHeaderProps {
  locale: string;
}

export default function DashboardHeader({ locale }: DashboardHeaderProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'لوحة التحكم', href: `/${locale}/dashboard`, icon: BarChart3 },
    { name: 'الميزات 🎯', href: `/${locale}/features`, icon: Sparkles },
    { name: 'المحتوى', href: `/${locale}/content`, icon: FileText },
    { name: 'محتوى تلقائي ⚡', href: `/${locale}/auto-content`, icon: Zap },
    { name: 'الميديا باير', href: `/${locale}/media-buying`, icon: Target },
    { name: 'Google Ads', href: `/${locale}/google-ads`, icon: Megaphone },
    { name: 'SEO', href: `/${locale}/seo`, icon: Search },
    { name: 'التحليلات', href: `/${locale}/analytics`, icon: TrendingUp },
    { name: 'مساعد AI ✨', href: `/${locale}/ai-assistant`, icon: Sparkles },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4 border-b border-gray-800">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <Mountain className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">المسار الساخن</h1>
              <p className="text-xs text-gray-400">التسويق الإلكتروني للسياحة</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/settings/accounts`}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition text-sm font-medium flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              ربط الحسابات
            </Link>
            <button className="relative p-2 text-gray-400 hover:text-white transition">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <Link href={`/${locale}/settings`} className="p-2 text-gray-400 hover:text-white transition">
              <Settings className="h-5 w-5" />
            </Link>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">مدير التسويق</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2 py-2 overflow-x-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${
                  active
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
