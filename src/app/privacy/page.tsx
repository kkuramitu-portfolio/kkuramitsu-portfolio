import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-lg shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-800 mb-8 border-b-2 border-slate-100 pb-4">プライバシーポリシー</h1>
        
        <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
          <section>
            <p>本ポートフォリオサイト（以下、「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。当サイトにおける情報の収集、利用、および管理について以下の通り定めます。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">1. 収集する情報と収集方法</h2>
            <p className="mb-2">当サイトでは、以下の情報を収集する場合があります。</p>
            <ul className="list-disc list-outside ml-5 space-y-1.5">
              <li><span className="font-bold">お問い合わせフォーム:</span> 氏名、メールアドレス、メッセージ内容</li>
              <li><span className="font-bold">AIナビゲーター（チャット機能）:</span> 入力されたテキスト（プロンプト）、IPアドレス</li>
              <li><span className="font-bold">アクセス解析・UX分析:</span> Cookie、デバイス情報、ブラウザ情報、IPアドレス、サイト内の行動履歴（スクロール、クリック等）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">2. 利用目的</h2>
            <p className="mb-2">収集した情報は、以下の目的で利用いたします。</p>
            <ul className="list-disc list-outside ml-5 space-y-1.5">
              <li>お問い合わせに対する返信および連絡対応のため</li>
              <li>当サイトの利用状況の分析、およびUI/UXの継続的な改善のため</li>
              <li>AIナビゲーターの回答精度向上（LLMOps）、および不正利用・スパム行為の防止（レートリミット制限）のため</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">3. 外部サービス・ツールの利用について</h2>
            <p className="mb-2">当サイトでは、上記の目的を達成するため、以下の外部サービスを利用しています。これらのサービスにより収集されたデータは、各提供者のプライバシーポリシーに基づいて管理されます。</p>
            <div className="space-y-3 mt-3">
              <div className="bg-slate-50 p-4 rounded border border-slate-100">
                <h3 className="font-bold text-slate-800">Google Analytics 4 (GA4) / Google Tag Manager</h3>
                <p className="mt-1">アクセス解析のためCookieを使用します。データは匿名で収集され、個人を特定するものではありません。</p>
              </div>
              <div className="bg-slate-50 p-4 rounded border border-slate-100">
                <h3 className="font-bold text-slate-800">Microsoft Clarity</h3>
                <p className="mt-1">サイトの利用状況（ヒートマップ、セッション録画）を把握するためCookieを使用します。</p>
              </div>
              <div className="bg-slate-50 p-4 rounded border border-slate-100">
                <h3 className="font-bold text-slate-800">OpenAI API / Helicone / Slack</h3>
                <p className="mt-1">AI機能の提供、精度向上、および監視のため、入力されたチャット内容とIPアドレスを送信・保存します。個人情報を含む入力はお控えください。</p>
              </div>
              <div className="bg-slate-50 p-4 rounded border border-slate-100">
                <h3 className="font-bold text-slate-800">Google reCAPTCHA v3</h3>
                <p className="mt-1">スパム対策のため、デバイスや行動データをGoogleへ送信します。</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">4. Cookieの無効化について</h2>
            <p>当サイトでは、初回訪問時にCookie利用の同意をお願いしております。同意を拒否された場合、アクセス解析（GA4）および行動分析（Clarity）のスクリプトは実行されません。また、ブラウザの設定によりCookieを無効にすることも可能です。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">5. 免責事項</h2>
            <p>当サイトのコンテンツや情報につきましては、可能な限り正確な情報を掲載するよう努めておりますが、正確性や安全性を保証するものではありません。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">6. 著作権</h2>
            <p>当サイトに掲載されている文章、画像、コード等の著作権は、運営者に帰属します。無断での転載・複製を禁じます。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">7. お問い合わせ</h2>
            <p>本ポリシーに関するお問い合わせは、当サイトの「Contact」フォームよりお願いいたします。</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-bold transition-colors">
            ← トップページへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}