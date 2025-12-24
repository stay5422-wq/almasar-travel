export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">شروط الخدمة - المسار للسفر</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. قبول الشروط</h2>
          <p>
            باستخدامك لمنصة المسار للسفر، فإنك توافق على الالتزام بهذه الشروط والأحكام.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. الخدمات المقدمة</h2>
          <p>نوفر لك الخدمات التالية:</p>
          <ul className="list-disc mr-6 mt-2 space-y-1">
            <li>توليد محتوى تسويقي بالذكاء الاصطناعي</li>
            <li>النشر التلقائي على وسائل التواصل الاجتماعي</li>
            <li>تحليل الأداء والإحصائيات</li>
            <li>إدارة الحملات الإعلانية</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. مسؤوليات المستخدم</h2>
          <p>يجب عليك:</p>
          <ul className="list-disc mr-6 mt-2 space-y-1">
            <li>استخدام الخدمة بطريقة قانونية ومشروعة</li>
            <li>عدم نشر محتوى مسيء أو مخالف للقوانين</li>
            <li>الحفاظ على سرية بيانات حسابك</li>
            <li>احترام حقوق الملكية الفكرية</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. المحتوى المُولد</h2>
          <p>
            المحتوى الذي يتم توليده بواسطة الذكاء الاصطناعي هو لأغراض مساعدة فقط. 
            أنت مسؤول عن مراجعة ونشر المحتوى على حساباتك.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. إلغاء الخدمة</h2>
          <p>
            يمكنك إلغاء حسابك في أي وقت من خلال إعدادات الحساب. 
            سيتم حذف جميع بياناتك خلال 30 يوماً من الإلغاء.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. التعديلات على الشروط</h2>
          <p>
            نحتفظ بالحق في تعديل هذه الشروط في أي وقت. 
            سيتم إخطارك بأي تغييرات جوهرية عبر البريد الإلكتروني.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. التواصل</h2>
          <p>
            لأي استفسارات أو شكاوى، يرجى التواصل معنا على:
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
