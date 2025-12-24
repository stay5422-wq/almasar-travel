# 🔗 دليل ربط المنصات - Setup Guide

## 📱 ربط حسابات التواصل الاجتماعي

لكي تستطيع نشر المحتوى مباشرة على المنصات، تحتاج إلى تسجيل التطبيق على كل منصة والحصول على بيانات API.

---

## 1️⃣ Facebook & Instagram

### خطوات الإعداد:

#### أ) إنشاء Facebook App:
1. اذهب إلى: https://developers.facebook.com/apps
2. انقر "Create App"
3. اختر "Business" type
4. املأ البيانات:
   - App Name: `AlMasar Marketing`
   - App Contact Email: your-email@example.com

#### ب) الحصول على Access Tokens:
1. من لوحة التطبيق، اذهب إلى **Settings > Basic**
2. احفظ:
   - `App ID`
   - `App Secret`

#### ج) إضافة Facebook Login:
1. من القائمة الجانبية، اذهب إلى **Products**
2. أضف "Facebook Login"
3. في Settings، أضف:
   - Valid OAuth Redirect URIs: `http://localhost:3000/api/oauth/facebook/callback`
   - `https://yourdomain.com/api/oauth/facebook/callback`

#### د) إضافة Instagram API:
1. أضف منتج "Instagram Basic Display"
2. أنشئ Instagram App
3. احفظ:
   - Instagram App ID
   - Instagram App Secret

#### هـ) الأذونات المطلوبة (Permissions):
```
pages_show_list
pages_read_engagement  
pages_manage_posts
instagram_basic
instagram_content_publish
```

### إعداد Environment Variables:
```env
# .env.local
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
FACEBOOK_REDIRECT_URI=http://localhost:3000/api/oauth/facebook/callback

INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_app_secret
```

---

## 2️⃣ Twitter (X)

### خطوات الإعداد:

#### أ) إنشاء Twitter Developer Account:
1. اذهب إلى: https://developer.twitter.com/en/portal/dashboard
2. سجل حساب مطور جديد
3. انشئ Project جديد

#### ب) إنشاء App:
1. من Projects، انقر "Create App"
2. احفظ المفاتيح:
   - API Key
   - API Secret Key
   - Bearer Token
   - Access Token
   - Access Token Secret

#### ج) إعداد OAuth Settings:
1. اذهب إلى App Settings
2. في "User authentication settings":
   - Type: Read and Write
   - Callback URL: `http://localhost:3000/api/oauth/twitter/callback`
   - Website URL: `http://localhost:3000`

### Environment Variables:
```env
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret
TWITTER_BEARER_TOKEN=your_bearer_token
```

---

## 3️⃣ LinkedIn

### خطوات الإعداد:

#### أ) إنشاء LinkedIn App:
1. اذهب إلى: https://www.linkedin.com/developers/apps
2. انقر "Create app"
3. املأ معلومات التطبيق

#### ب) الحصول على Credentials:
1. من App Settings، احفظ:
   - Client ID
   - Client Secret

#### ج) إضافة Redirect URLs:
```
http://localhost:3000/api/oauth/linkedin/callback
https://yourdomain.com/api/oauth/linkedin/callback
```

#### د) الأذونات المطلوبة:
```
r_liteprofile
r_emailaddress
w_member_social
```

### Environment Variables:
```env
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/oauth/linkedin/callback
```

---

## 4️⃣ YouTube

### خطوات الإعداد:

#### أ) Google Cloud Console:
1. اذهب إلى: https://console.cloud.google.com/
2. أنشئ مشروع جديد

#### ب) تفعيل YouTube Data API:
1. من القائمة الجانبية > APIs & Services > Library
2. ابحث عن "YouTube Data API v3"
3. انقر "Enable"

#### ج) إنشاء OAuth Credentials:
1. من APIs & Services > Credentials
2. انقر "Create Credentials" > "OAuth client ID"
3. اختر "Web application"
4. أضف Authorized redirect URIs:
```
http://localhost:3000/api/oauth/youtube/callback
```

#### د) احفظ:
- Client ID
- Client Secret

### Environment Variables:
```env
YOUTUBE_CLIENT_ID=your_client_id
YOUTUBE_CLIENT_SECRET=your_client_secret
YOUTUBE_REDIRECT_URI=http://localhost:3000/api/oauth/youtube/callback
```

---

## 5️⃣ TikTok

### خطوات الإعداد:

#### أ) TikTok for Developers:
1. اذهب إلى: https://developers.tiktok.com/
2. سجل حساب مطور
3. أنشئ تطبيق جديد

#### ب) الحصول على API Keys:
1. من لوحة التطبيق، احفظ:
   - Client Key
   - Client Secret

#### ج) إعداد Redirect URL:
```
http://localhost:3000/api/oauth/tiktok/callback
```

### Environment Variables:
```env
TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret
```

---

## 📋 ملف .env.local كامل

```env
# OpenAI (للمساعد الذكي)
OPENAI_API_KEY=sk-your-openai-key
OPENAI_MODEL=gpt-4o
DEMO_MODE=false

# Facebook & Instagram
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
FACEBOOK_REDIRECT_URI=http://localhost:3000/api/oauth/facebook/callback
INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_app_secret

# Twitter (X)
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret
TWITTER_BEARER_TOKEN=your_bearer_token

# LinkedIn
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/oauth/linkedin/callback

# YouTube
YOUTUBE_CLIENT_ID=your_client_id
YOUTUBE_CLIENT_SECRET=your_client_secret
YOUTUBE_REDIRECT_URI=http://localhost:3000/api/oauth/youtube/callback

# TikTok
TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret

# Database (Supabase أو PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/almasar
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

---

## 🚀 خطوات التشغيل

### 1. تثبيت الحزم المطلوبة:
```bash
npm install
npm install @supabase/supabase-js
npm install next-auth
```

### 2. إنشاء ملف .env.local:
انسخ المحتوى أعلاه واستبدل القيم بمفاتيحك الحقيقية

### 3. تشغيل السيرفر:
```bash
npm run dev
```

### 4. اختبار الربط:
1. اذهب إلى: http://localhost:3000/ar/settings/accounts
2. انقر "ربط الحساب" لأي منصة
3. سجل الدخول وامنح الأذونات
4. سيتم حفظ Access Token تلقائياً

---

## 📊 قاعدة البيانات

### جدول الحسابات المربوطة:
```sql
CREATE TABLE connected_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  platform VARCHAR(50) NOT NULL,
  account_name VARCHAR(255),
  account_username VARCHAR(255),
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,
  platform_user_id VARCHAR(255),
  metadata JSONB,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## ⚠️ ملاحظات مهمة

1. **DEMO_MODE**: 
   - عند `DEMO_MODE=true` لن يتم إرسال طلبات حقيقية للمنصات
   - مفيد للتطوير والاختبار

2. **Rate Limits**:
   - كل منصة لها حدود يومية للطلبات
   - Facebook: 200 calls/hour
   - Twitter: 300 requests/15min
   - LinkedIn: 500 requests/day

3. **الأذونات**:
   - تأكد من طلب جميع الأذونات المطلوبة
   - بعض المنصات تحتاج موافقة يدوية (App Review)

4. **الأمان**:
   - لا تشارك API Keys أبداً
   - استخدم Environment Variables
   - لا ترفع .env.local إلى Git

---

## 📚 موارد إضافية

- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)
- [LinkedIn API](https://learn.microsoft.com/en-us/linkedin/consumer/)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [TikTok API](https://developers.tiktok.com/doc/overview)

---

## 🆘 المساعدة

إذا واجهت أي مشاكل:
1. تحقق من صحة API Keys
2. راجع Redirect URLs
3. تأكد من الأذونات المطلوبة
4. اقرأ رسائل الأخطاء بعناية
5. تواصل مع الدعم التقني للمنصة

---

✅ **جاهز للبدء!** بعد إكمال هذه الخطوات، ستتمكن من نشر المحتوى مباشرة على جميع المنصات.
