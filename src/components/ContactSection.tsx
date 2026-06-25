"use client";

// 先ほど修正した本物のフォームコンポーネントをインポートします
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Contact</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">お問い合わせ</h2>
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                設計・実装時間: 約5時間
              </span>
            </div>
          <p className="text-slate-500 text-sm mt-4 leading-relaxed">
            システム連携やセキュリティ対策を実装した、実稼働するお問い合わせフォームです。
          </p>
        </div>

        {/* ここで本物のフォームを呼び出します */}
        <ContactForm />
        
      </div>
    </section>
  );
}