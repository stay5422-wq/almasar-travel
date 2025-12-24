export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">حذف البيانات - المسار للسفر</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-3">طلب حذف البيانات</h2>
          <p>
            نحترم حقك في حذف بياناتك الشخصية من منصتنا في أي وقت.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">كيفية طلب حذف البيانات</h2>
          <p>يمكنك حذف بياناتك بإحدى الطرق التالية:</p>
          
          <div className="mt-4 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">1. من خلال المنصة:</h3>
              <ul className="list-disc mr-6 space-y-1">
                <li>سجل دخولك إلى حسابك</li>
                <li>اذهب إلى الإعدادات</li>
                <li>اختر "حذف الحساب"</li>
                <li>أكد طلب الحذف</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">2. عبر البريد الإلكتروني:</h3>
              <p>أرسل رسالة إلى: <strong>elmasar.elsa5en@gmail.com</strong></p>
              <p className="mt-2">مع ذكر:</p>
              <ul className="list-disc mr-6 mt-1 space-y-1">
                <li>عنوان بريدك الإلكتروني المسجل</li>
                <li>طلب واضح بحذف جميع بياناتك</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">البيانات التي سيتم حذفها</h2>
          <p>عند طلب الحذف، سيتم إزالة:</p>
          <ul className="list-disc mr-6 mt-2 space-y-1">
            <li>معلومات حسابك الشخصية</li>
            <li>جميع المحتوى الذي قمت بإنشائه</li>
            <li>ارتباطات حساباتك الاجتماعية</li>
            <li>سجلات الاستخدام والنشاط</li>
            <li>أي بيانات أخرى متعلقة بحسابك</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">الإطار الزمني</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p>
              <strong>سيتم حذف بياناتك خلال 30 يوماً</strong> من تاريخ تلقي طلبك.
            </p>
            <p className="mt-2">
              سنرسل لك تأكيداً عبر البريد الإلكتروني بمجرد اكتمال عملية الحذف.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">البيانات المحفوظة قانونياً</h2>
          <p>
            قد نحتفظ ببعض البيانات للفترة المطلوبة قانونياً فقط، مثل:
          </p>
          <ul className="list-disc mr-6 mt-2 space-y-1">
            <li>سجلات المعاملات المالية (إن وجدت)</li>
            <li>سجلات الدعم الفني</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">استفسارات إضافية</h2>
          <p>
            لأي أسئلة حول عملية حذف البيانات، تواصل معنا:
            <br />
            📧 البريد الإلكتروني: elmasar.elsa5en@gmail.com
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
        </p>
      </div>
    </div>
  );
}
