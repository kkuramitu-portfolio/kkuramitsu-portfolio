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