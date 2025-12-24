/**
 * اختبار سريع لـ Facebook API
 * كيفية الاستخدام:
 * 1. ضع Facebook Access Token في .env.local
 * 2. شغّل: npx tsx test-meta.ts
 */

import { MetaAPI } from './src/lib/meta-api';

async function testMeta() {
  console.log('🧪 اختبار Facebook & Instagram API...\n');

  // تحقق من وجود Access Token
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  if (!accessToken) {
    console.error('❌ لم يتم العثور على FACEBOOK_ACCESS_TOKEN في .env.local');
    console.log('\n📝 كيفية الحصول عليه:');
    console.log('1. اذهب إلى: https://developers.facebook.com/tools/explorer');
    console.log('2. اختر تطبيقك');
    console.log('3. اضغط Generate Access Token');
    console.log('4. انسخه وضعه في .env.local');
    return;
  }

  const meta = new MetaAPI(
    accessToken,
    process.env.FACEBOOK_PAGE_ID,
    process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
  );

  try {
    // اختبار 1: الحصول على الصفحات
    console.log('📄 جاري الحصول على صفحاتك...');
    const pages = await meta.getPages();
    
    if (pages.data && pages.data.length > 0) {
      console.log('✅ تم العثور على الصفحات:');
      pages.data.forEach((page: any) => {
        console.log(`   - ${page.name} (ID: ${page.id})`);
      });
      console.log('\n💡 نصيحة: انسخ Page ID وضعه في FACEBOOK_PAGE_ID في .env.local\n');
    } else {
      console.log('⚠️  لم يتم العثور على صفحات');
    }

    // اختبار 2: نشر تجريبي (معطل - فعّله عند الاستعداد)
    if (process.env.FACEBOOK_PAGE_ID && process.env.TEST_POST === 'true') {
      console.log('📝 جاري نشر منشور تجريبي...');
      const post = await meta.publishFacebookPost({
        message: '🧪 منشور تجريبي من منصة المسار للتسويق الرقمي! تجاهل هذا المنشور.',
        published: true,
      });
      
      if (post.id) {
        console.log('✅ تم النشر بنجاح!');
        console.log(`   Post ID: ${post.id}`);
      }
    }

    // اختبار 3: الحصول على إحصائيات (إذا كان Page ID موجود)
    if (process.env.FACEBOOK_PAGE_ID) {
      console.log('\n📊 جاري الحصول على إحصائيات الصفحة...');
      const insights = await meta.getPageInsights([
        'page_impressions',
        'page_engaged_users',
      ]);
      
      if (insights.data) {
        console.log('✅ الإحصائيات:');
        insights.data.forEach((metric: any) => {
          console.log(`   - ${metric.name}: ${metric.values[0]?.value || 0}`);
        });
      }
    }

    // اختبار 4: Instagram (إذا كان Account ID موجود)
    if (process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID) {
      console.log('\n📸 جاري الحصول على منشورات Instagram...');
      const igMedia = await meta.getInstagramMedia(5);
      
      if (igMedia.data && igMedia.data.length > 0) {
        console.log('✅ آخر منشورات Instagram:');
        igMedia.data.forEach((post: any) => {
          console.log(`   - ${post.caption?.substring(0, 50) || 'بدون وصف'}...`);
          console.log(`     👍 ${post.like_count || 0} | 💬 ${post.comments_count || 0}`);
        });
      } else {
        console.log('⚠️  لم يتم العثور على منشورات');
      }
    }

    console.log('\n✅ جميع الاختبارات نجحت! 🎉');
    console.log('\n📝 الخطوات التالية:');
    console.log('1. تأكد من إضافة جميع الـ IDs في .env.local');
    console.log('2. للنشر التجريبي: أضف TEST_POST=true في .env.local');
    console.log('3. ادمج الـ API في التطبيق (src/app/api/social/...)');

  } catch (error: any) {
    console.error('\n❌ حدث خطأ:', error.message);
    
    if (error.message.includes('190')) {
      console.log('\n💡 الحل: Access Token منتهي الصلاحية');
      console.log('   احصل على Token جديد من: https://developers.facebook.com/tools/explorer');
    } else if (error.message.includes('permissions')) {
      console.log('\n💡 الحل: تحتاج إضافة Permissions');
      console.log('   من Graph API Explorer → Add Permissions');
    }
  }
}

// شغّل الاختبار
testMeta();
