# 🚀 دليل البدء السريع - منصة التسويق الرقمي

## 📋 المحتويات
1. [تشغيل التطبيق](#تشغيل-التطبيق)
2. [إعداد قواعد البيانات](#إعداد-قواعد-البيانات)
3. [ربط منصات التواصل الاجتماعي](#ربط-منصات-التواصل-الاجتماعي)
4. [إعداد أدوات التحليلات](#إعداد-أدوات-التحليلات)
5. [إعداد نظام المدفوعات](#إعداد-نظام-المدفوعات)

---

## 🎯 تشغيل التطبيق

### 1. فتح Terminal في VS Code:
```bash
cd "d:\social media\almasar-travel"
```

### 2. تشغيل السيرفر:
```bash
npm run dev
```

### 3. فتح المتصفح:
- الرابط: **http://localhost:3000** (أو 3001 إذا كان 3000 مشغول)
- الصفحة الرئيسية: `http://localhost:3000/ar`
- لوحة التحكم: `http://localhost:3000/ar/dashboard`

---

## 💾 إعداد قواعد البيانات

### استخدام Supabase (الموصى به):

#### 1. إنشاء حساب مجاني:
- اذهب إلى: https://supabase.com
- اضغط **Start your project**
- أنشئ مشروع جديد باسم `almasar-marketing`

#### 2. الحصول على بيانات الاتصال:
- من لوحة تحكم Supabase → **Settings** → **API**
- انسخ:
  - `Project URL`
  - `anon public` API key

#### 3. إنشاء الجداول:

**أ. جدول العملاء (clients):**
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'hotel', 'tourism_company', 'corporate'
  city TEXT DEFAULT 'أبها',
  contact_email TEXT,
  contact_phone TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'paused', 'archived'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**ب. جدول الحملات (campaigns):**
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  name TEXT NOT NULL,
  platform TEXT NOT NULL, -- 'facebook', 'google', 'instagram', 'linkedin'
  budget DECIMAL(10,2) NOT NULL,
  spent DECIMAL(10,2) DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT DEFAULT 'active', -- 'active', 'paused', 'completed', 'draft'
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**ج. جدول المحتوى (content_posts):**
```sql
CREATE TABLE content_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  title TEXT NOT NULL,
  content TEXT,
  platform TEXT NOT NULL, -- 'facebook', 'instagram', 'twitter', 'linkedin', 'youtube'
  type TEXT NOT NULL, -- 'text', 'image', 'video', 'carousel'
  status TEXT DEFAULT 'draft', -- 'draft', 'scheduled', 'published', 'archived'
  scheduled_for TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**د. جدول الكلمات المفتاحية (seo_keywords):**
```sql
CREATE TABLE seo_keywords (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  keyword TEXT NOT NULL,
  position INTEGER,
  search_volume INTEGER,
  difficulty INTEGER,
  traffic INTEGER DEFAULT 0,
  trend TEXT DEFAULT 'same', -- 'up', 'down', 'same'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 4. تحديث ملف `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

---

## 📱 ربط منصات التواصل الاجتماعي

### 1. Facebook & Instagram (Meta Business):

#### أ. إنشاء Meta App:
1. اذهب إلى: https://developers.facebook.com
2. اضغط **My Apps** → **Create App**
3. اختر **Business** type
4. املأ البيانات:
   - App Name: `Almasar Marketing`
   - App Contact Email: بريدك

#### ب. إضافة Facebook Pages API:
1. من لوحة التطبيق → **Add Product**
2. اختر **Facebook Login**
3. في **Settings** → أضف:
   - Valid OAuth Redirect URIs: `http://localhost:3000/api/auth/callback/facebook`
   - `https://yourdomain.com/api/auth/callback/facebook`

#### ج. الحصول على Tokens:
1. اذهب إلى **Tools** → **Graph API Explorer**
2. اختر تطبيقك
3. اطلب الـ Permissions:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `instagram_basic`
   - `instagram_content_publish`
4. انسخ **Access Token**

#### د. تحديث `.env.local`:
```env
# Facebook/Instagram
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
FACEBOOK_ACCESS_TOKEN=your_long_lived_token
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_ig_account_id
```

---

### 2. Twitter (X):

#### أ. إنشاء Twitter App:
1. اذهب إلى: https://developer.twitter.com/en/portal/dashboard
2. اضغط **+ Create Project**
3. املأ البيانات المطلوبة

#### ب. الحصول على API Keys:
1. من Project Settings → **Keys and tokens**
2. انسخ:
   - API Key
   - API Key Secret
   - Bearer Token
   - Access Token & Secret

#### ج. تحديث `.env.local`:
```env
# Twitter
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_BEARER_TOKEN=your_bearer_token
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_token_secret
```

---

### 3. LinkedIn:

#### أ. إنشاء LinkedIn App:
1. اذهب إلى: https://www.linkedin.com/developers/apps
2. اضغط **Create app**
3. املأ البيانات:
   - App name: `Almasar Marketing`
   - LinkedIn Page: صفحتك

#### ب. إضافة Products:
1. من **Products** tab
2. اطلب:
   - **Share on LinkedIn**
   - **Marketing Developer Platform**

#### ج. الحصول على Credentials:
1. من **Auth** tab
2. انسخ:
   - Client ID
   - Client Secret

#### د. تحديث `.env.local`:
```env
# LinkedIn
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/callback/linkedin
```

---

### 4. YouTube:

#### أ. إنشاء Google Cloud Project:
1. اذهب إلى: https://console.cloud.google.com
2. اضغط **Create Project**
3. اسم المشروع: `Almasar Marketing`

#### ب. تفعيل YouTube Data API:
1. من **APIs & Services** → **Library**
2. ابحث عن `YouTube Data API v3`
3. اضغط **Enable**

#### ج. إنشاء OAuth Credentials:
1. من **APIs & Services** → **Credentials**
2. اضغط **Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/youtube`

#### د. تحديث `.env.local`:
```env
# YouTube
YOUTUBE_CLIENT_ID=your_client_id
YOUTUBE_CLIENT_SECRET=your_client_secret
YOUTUBE_API_KEY=your_api_key
```

---

## 📊 إعداد أدوات التحليلات

### 1. Google Analytics:

#### أ. إنشاء Property:
1. اذهب إلى: https://analytics.google.com
2. **Admin** → **Create Property**
3. اختر **Web**
4. احصل على **Measurement ID** (يبدأ بـ G-)

#### ب. تحديث `.env.local`:
```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### ج. إضافة الكود في Layout:
الكود موجود بالفعل في `src/app/[locale]/layout.tsx` - فقط حدث الـ ID.

---

### 2. Meta Pixel (Facebook):

#### أ. إنشاء Pixel:
1. من **Meta Events Manager**: https://business.facebook.com/events_manager
2. اضغط **Connect Data Sources** → **Web**
3. اختر **Meta Pixel**
4. اسم Pixel: `Almasar Marketing`
5. احصل على **Pixel ID**

#### ب. تحديث `.env.local`:
```env
# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id
```

---

### 3. Google Search Console:

#### أ. إضافة الموقع:
1. اذهب إلى: https://search.google.com/search-console
2. اضغط **Add Property**
3. أدخل رابط موقعك
4. التحقق بإحدى الطرق:
   - HTML file upload
   - HTML tag
   - Google Analytics

---

### 4. SEO Tools Integration:

#### أ. Ahrefs API (اختياري):
```env
AHREFS_API_KEY=your_ahrefs_key
```

#### ب. SEMrush API (اختياري):
```env
SEMRUSH_API_KEY=your_semrush_key
```

---

## 💳 إعداد نظام المدفوعات

### استخدام Stripe (للاشتراكات والدفع):

#### 1. إنشاء حساب:
- اذهب إلى: https://dashboard.stripe.com/register
- أكمل التسجيل

#### 2. الحصول على API Keys:
- من Dashboard → **Developers** → **API keys**
- انسخ:
  - **Publishable key** (يبدأ بـ pk_)
  - **Secret key** (يبدأ بـ sk_)

#### 3. تحديث `.env.local`:
```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxx
```

#### 4. إنشاء المنتجات (Products):
- من Dashboard → **Products**
- أنشئ باقات الاشتراك:
  - باقة أساسية: 500 ريال/شهر
  - باقة متقدمة: 1,500 ريال/شهر
  - باقة احترافية: 3,000 ريال/شهر

---

## 🔐 إعداد المصادقة (Authentication)

### استخدام NextAuth.js (مدمج بالفعل):

#### 1. إنشاء ملف `.env.local` الكامل:
```env
# Base URL
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here_generate_it

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Facebook/Instagram
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_ACCESS_TOKEN=
INSTAGRAM_BUSINESS_ACCOUNT_ID=

# Twitter
TWITTER_API_KEY=
TWITTER_API_SECRET=
TWITTER_BEARER_TOKEN=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_TOKEN_SECRET=

# LinkedIn
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=

# YouTube
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_API_KEY=

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email (للإشعارات)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email@gmail.com
EMAIL_SERVER_PASSWORD=your_app_password
EMAIL_FROM=noreply@almasar-marketing.com

# SEO Tools (اختياري)
AHREFS_API_KEY=
SEMRUSH_API_KEY=
```

#### 2. توليد NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## 📁 هيكل المشروع

```
almasar-travel/
├── src/
│   ├── app/
│   │   ├── [locale]/           # الصفحات متعددة اللغات
│   │   │   ├── page.tsx        # الصفحة الرئيسية
│   │   │   ├── dashboard/      # لوحة التحكم
│   │   │   ├── content/        # إدارة المحتوى
│   │   │   ├── media-buying/   # شراء الإعلانات
│   │   │   ├── seo/           # تحسين محركات البحث
│   │   │   └── analytics/     # التحليلات
│   │   ├── api/               # API Routes
│   │   └── globals.css        # الأنماط العامة
│   ├── components/            # المكونات المشتركة
│   │   └── DashboardHeader.tsx
│   ├── lib/                   # المكتبات والأدوات
│   │   ├── supabase.ts       # إعداد Supabase
│   │   └── utils.ts          # دوال مساعدة
│   └── types/                # تعريفات TypeScript
├── public/                   # الملفات الثابتة
├── .env.local               # المتغيرات البيئية (لا تُرفع لـ Git)
├── next.config.ts           # إعدادات Next.js
├── package.json             # التبعيات
└── tailwind.config.ts       # إعدادات Tailwind
```

---

## 🎨 التخصيص والتعديل

### تغيير الألوان:
ملف `tailwind.config.ts`:
```typescript
colors: {
  primary: '#8b5cf6', // بنفسجي
  secondary: '#3b82f6', // أزرق
  accent: '#ec4899', // وردي
}
```

### إضافة لغة جديدة:
1. ملف `src/i18n.ts` - أضف اللغة
2. أنشئ ملف ترجمة: `messages/en.json`

---

## 🚀 نشر التطبيق (Deployment)

### Vercel (الأسرع):
```bash
npm install -g vercel
vercel login
vercel
```

### Netlify:
1. ادفع الكود لـ GitHub
2. اربط Repository مع Netlify
3. أضف Environment Variables

---

## 📞 الخطوات التالية

1. ✅ **شغّل التطبيق**: `npm run dev`
2. ✅ **أنشئ قاعدة بيانات** في Supabase
3. ✅ **اربط Facebook** للبدء
4. ✅ **أضف عملاء تجريبيين** في Dashboard
5. ✅ **اختبر إنشاء حملة** في Media Buying

---

## 💡 نصائح مهمة

### للتطوير المحلي:
- استخدم البورت 3000 أو 3001
- تأكد من `.env.local` موجود ومحدث
- لا ترفع `.env.local` لـ Git أبداً

### للإنتاج:
- استخدم Domain مخصص
- فعّل SSL Certificate
- أضف Rate Limiting للـ APIs
- فعّل Monitoring & Error Tracking (Sentry)

---

## 🆘 مشاكل شائعة وحلولها

### ❌ Port 3000 is in use:
```bash
# أوقف العمليات القديمة
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

### ❌ Module not found:
```bash
npm install
```

### ❌ Supabase connection error:
- تحقق من الـ URL والـ Keys في `.env.local`
- تأكد من تفعيل Row Level Security (RLS)

---

## 📚 موارد مفيدة

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Meta for Developers](https://developers.facebook.com/docs)
- [Twitter API](https://developer.twitter.com/en/docs)
- [LinkedIn API](https://docs.microsoft.com/en-us/linkedin/)
- [YouTube API](https://developers.google.com/youtube/v3)

---

## 🎯 جاهز للبدء!

افتح Terminal واكتب:
```bash
cd "d:\social media\almasar-travel"
npm run dev
```

ثم افتح: **http://localhost:3000/ar** 🚀
