export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">سياسة الخصوصية - المسار للسفر</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. المعلومات التي نجمعها</h2>
          <p>
            نحن في المسار للسفر نحترم خصوصيتك. نقوم بجمع المعلومات التالية:
          </p>
          <ul className="list-disc mr-6 mt-2 space-y-1">
            <li>معلومات الحساب الأساسية (الاسم، البريد الإلكتروني)</li>
            <li>بيانات تسجيل الدخول عبر Facebook</li>
            <li>محتوى المنشورات التي تقوم بإنشائها</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. كيف نستخدم معلوماتك</h2>
          <p>نستخدم معلوماتك للأغراض التالية:</p>
          <ul className="list-disc mr-6 mt-2 space-y-1">
            <li>تقديم خدمات النشر على وسائل التواصل الاجتماعي</li>
            <li>توليد محتوى تسويقي بالذكاء الاصطناعي</li>
            <li>تحسين تجربة المستخدم</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. مشاركة المعلومات</h2>
          <p>
            لا نقوم ببيع أو مشاركة معلوماتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:
          </p>
          <ul className="list-disc mr-6 mt-2 space-y-1">
            <li>عند النشر على حساباتك في وسائل التواصل (بإذنك)</li>
            <li>عند استخدام خدمات الذكاء الاصطناعي (OpenAI) لتوليد المحتوى</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. أمان البيانات</h2>
          <p>
            نستخدم إجراءات أمنية متقدمة لحماية بياناتك بما في ذلك التشفير وبروتوكولات الأمان الحديثة.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. حقوقك</h2>
          <p>لديك الحق في:</p>
          <ul className="list-disc mr-6 mt-2 space-y-1">
            <li>الوصول إلى بياناتك الشخصية</li>
            <li>تصحيح أو تحديث معلوماتك</li>
            <li>حذف حسابك وجميع بياناتك</li>
            <li>إلغاء ربط حساباتك الاجتماعية</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. التواصل معنا</h2>
          <p>
            للاستفسارات المتعلقة بالخصوصية، يرجى التواصل معنا على:
            <br />
            البريد الإلكتروني: elmasar.elsa5en@gmail.com
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
        </p>
      </div>
    </div>
  );
}
