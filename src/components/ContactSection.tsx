"use client";

import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Contact</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">お問い合わせ</h2>
        </div>

        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-5 shadow-sm">
          <p className="text-sm font-bold text-yellow-800 mb-2 flex items-center gap-2">
            <span>⚠️</span> これはデモ用フォームです
          </p>
          <p className="text-sm text-yellow-700 leading-relaxed">
            このフォームはUIのデモンストレーションを目的としており、送信してもメッセージは実際には届きません。<br />
            また、企業コンプライアンスの観点から、<strong>本フォーム経由での直接のスカウト・採用ご連絡には応じかねます。</strong>
          </p>
        </div>

        {submitted ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-10 text-center shadow-sm">
            <p className="text-4xl mb-4">✅</p>
            <p className="text-slate-800 font-bold text-lg mb-2">送信しました（デモ）</p>
            <p className="text-slate-500 text-sm mb-6">実際のメッセージは送信されていません。</p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
              className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-4 py-2 hover:bg-blue-50"
            >
              もう一度試す
            </button>
          </div>
        ) : (
          <form className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="name">お名前 <span className="text-red-500">*</span></label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="山田 太郎" required className="w-full border border-slate-300 rounded-md px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="email">メールアドレス <span className="text-red-500">*</span></label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="example@company.co.jp" required className="w-full border border-slate-300 rounded-md px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="message">メッセージ <span className="text-red-500">*</span></label>
              <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} placeholder="お問い合わせ内容をご記入ください。" required className="w-full border border-slate-300 rounded-md px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 resize-y" />
            </div>
            <button onClick={handleSubmit} disabled={!form.name || !form.email || !form.message} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm">
              送信する（デモ）
            </button>
          </form>
        )}
      </div>
    </section>
  );
}