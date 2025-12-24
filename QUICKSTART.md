# ⚡ البدء السريع - 5 دقائق

## 1️⃣ التطبيق يعمل الآن! ✅

التطبيق شغال على: **http://localhost:3001/ar**

### الصفحات المتاحة:
- 🏠 الرئيسية: `http://localhost:3001/ar`
- 📊 Dashboard: `http://localhost:3001/ar/dashboard`
- 📝 Content: `http://localhost:3001/ar/content`
- 💰 Media Buying: `http://localhost:3001/ar/media-buying`
- 🔍 SEO: `http://localhost:3001/ar/seo`
- 📈 Analytics: `http://localhost:3001/ar/analytics`

---

## 2️⃣ ربط المنصات - خطوة بخطوة

### 🔵 Facebook (الأسهل للبداية):

#### الخطوة 1: إنشاء Meta App
```
1. اذهب إلى: https://developers.facebook.com/apps
2. اضغط "Create App"
3. اختر "Business" → Next
4. اسم التطبيق: "Almasar Marketing"
5. Contact Email: بريدك
6. اضغط "Create App"
```

#### الخطوة 2: احصل على Access Token
```
1. من قائمة التطبيق → Tools → Graph API Explorer
2. من "User or Page" اختر صفحتك
3. Add Permissions:
   - pages_show_list
   - pages_read_engagement
   - pages_manage_posts
4. اضغط "Generate Access Token"
5. انسخ الـ Token
```

#### الخطوة 3: احصل على Page ID
```
1. في Graph API Explorer
2. اكتب في الـ Query: me/accounts
3. اضغط Submit
4. انسخ "id" من النتيجة
```

#### الخطوة 4: أضف للـ `.env.local`
```env
FACEBOOK_ACCESS_TOKEN=your_token_here
FACEBOOK_PAGE_ID=your_page_id_here
```

---

### 🟢 Instagram Business:

#### متطلبات:
- حساب Instagram محول لـ Business Account
- مرتبط بصفحة Facebook

#### الخطوة 1: احصل على Instagram Business Account ID
```
1. في Graph API Explorer
2. Query: YOUR_PAGE_ID?fields=instagram_business_account
3. انسخ الـ ID
```

#### الخطوة 2: أضف للـ `.env.local`
```env
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_ig_id_here
```

---

### 🔵 Twitter (X):

#### خطوة واحدة:
```
1. اذهب: https://developer.twitter.com/en/portal/dashboard
2. Create Project → اسم المشروع
3. Create App → اسم التطبيق
4. من Keys and Tokens → انسخ:
   - API Key
   - API Secret
   - Bearer Token
```

#### أضف للـ `.env.local`:
```env
TWITTER_API_KEY=xxx
TWITTER_API_SECRET=xxx
TWITTER_BEARER_TOKEN=xxx
```

---

### 💼 LinkedIn:

#### الخطوات:
```
1. اذهب: https://www.linkedin.com/developers/apps
2. Create app
3. اسم التطبيق: Almasar Marketing
4. LinkedIn Page: اختر صفحتك
5. من Auth → انسخ Client ID & Secret
```

#### أضف للـ `.env.local`:
```env
LINKEDIN_CLIENT_ID=xxx
LINKEDIN_CLIENT_SECRET=xxx
```

---

## 3️⃣ قاعدة البيانات Supabase

### سريع جداً:

```
1. اذهب: https://supabase.com
2. Start your project (مجاني)
3. Create new project:
   - Name: almasar-marketing
   - Database Password: (احفظه!)
   - Region: Asia Pacific (Singapore)
4. انتظر دقيقتين...
```

### احصل على الـ Keys:
```
1. من Project → Settings → API
2. انسخ:
   - Project URL
   - anon public key
   - service_role key
```

### أضف للـ `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

### إنشاء الجداول:
```
1. من Project → SQL Editor
2. انسخ SQL من GETTING_STARTED.md
3. اضغط RUN
4. ✅ جاهز!
```

---

## 4️⃣ اختبار النشر

### اختبار Facebook:

أنشئ ملف `test-facebook.ts`:
```typescript
import { MetaAPI } from './src/lib/meta-api';

const meta = new MetaAPI(
  'YOUR_ACCESS_TOKEN',
  'YOUR_PAGE_ID'
);

meta.publishFacebookPost({
  message: 'مرحباً من منصة المسار! 🚀'
}).then(result => {
  console.log('تم النشر!', result);
});
```

شغّل:
```bash
npx tsx test-facebook.ts
```

---

## 5️⃣ التالي: إضافة عملاء

### من لوحة التحكم:

1. افتح: `http://localhost:3001/ar/dashboard`
2. اضغط "إضافة عميل جديد" (سنضيف هذا الزر)
3. املأ البيانات:
   - الاسم: فندق قصر أبها
   - النوع: فندق
   - المدينة: أبها
   - البريد: info@qasrabha.com
   - الجوال: 0501234567

### أو من SQL مباشرة:

```sql
INSERT INTO clients (name, type, city, contact_email, contact_phone, status)
VALUES ('فندق قصر أبها', 'hotel', 'أبها', 'info@qasrabha.com', '0501234567', 'active');
```

---

## 🎯 جاهز للعمل!

### الخطوات الأساسية:
- ✅ التطبيق شغال
- ⏳ ربط Facebook (5 دقائق)
- ⏳ إعداد Supabase (5 دقائق)
- ⏳ إضافة عميل تجريبي (دقيقة)
- ⏳ نشر أول محتوى (دقيقتين)

### ابدأ بـ:
1. افتح Terminal:
   ```bash
   cd "d:\social media\almasar-travel"
   ```

2. انسخ ملف `.env.example` → `.env.local`
   ```bash
   copy .env.example .env.local
   ```

3. افتح `.env.local` واملأ البيانات

4. أعد تشغيل التطبيق:
   ```bash
   npm run dev
   ```

---

## 📞 محتاج مساعدة؟

### ملفات مهمة:
- `GETTING_STARTED.md` - الدليل الكامل
- `.env.example` - نموذج المتغيرات
- `src/lib/meta-api.ts` - Facebook/Instagram
- `src/lib/twitter-api.ts` - Twitter
- `src/lib/linkedin-api.ts` - LinkedIn
- `src/lib/supabase.ts` - قاعدة البيانات

### روابط سريعة:
- Meta: https://developers.facebook.com
- Twitter: https://developer.twitter.com
- LinkedIn: https://www.linkedin.com/developers
- Supabase: https://supabase.com

---

## 🚀 مستعد؟

التطبيق جاهز - ابدأ بربط Facebook واختبر أول منشور! 🎉
