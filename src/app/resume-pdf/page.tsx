import React from 'react';

export default function ResumePdfPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { margin: 0; size: A4 portrait; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}} />

      <div className="min-h-screen bg-gray-200 flex justify-center py-10 print:py-0 print:bg-white">
        <div className="bg-white w-[210mm] h-[297mm] p-4 shadow-2xl print:shadow-none print:w-[210mm] print:h-[297mm] overflow-hidden flex flex-col">
          
          {/* ヘッダー部分 */}
          <header className="border-b-2 border-slate-800 pb-5 mb-6">
            <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-1">
              TARGET ROLE : 社内SE / DX推進 / 業務改善
            </p>
            <h1 className="text-4xl font-extrabold text-slate-800 mb-1">蔵満 賢治</h1>
            <p className="text-slate-500 text-sm">Kenji Kuramitsu | Portfolio Teaser</p>
          </header>

          {/* メインコピー */}
          <section className="mb-6 text-center">
            <h2 className="text-xl font-bold text-slate-800 leading-tight mb-3">
              現場の「不便」を放置せず、さらなる「便利」を探求し、<br />
              経験 × 技術 × AI を駆使して「仕組み」を創るビジネスエンジニアを目指して。
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              「誰かが解決する」を待つのではなく、自ら課題を発見し、最適な技術を用いて解決まで導く。<br />
              11年間の品質管理で培った現場理解と、AIを活用して未知の技術を即座に形にする「自走力」を武器に、<br />
              組織の生産性を内側から支える社内SE・DX推進担当として貢献します。
            </p>
          </section>

          {/* 3つのコアバリュー */}
          <section className="mb-6">
            <h3 className="text-base font-bold text-slate-800 mb-3 border-l-4 border-blue-600 pl-3">
              Webポートフォリオで実証している3つのコアバリュー
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg">
                <h4 className="font-bold text-slate-800 text-sm mb-1">1. 課題解決の実績（実務経験）</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  既存ツールに頼らず、SQLのみで整合性100%のデータ移行を完遂した実績や、レガシーシステムの改修など、現場の課題から逃げない実務経験を掲載しています。
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <h4 className="font-bold text-slate-800 text-sm mb-1">2. 「9割はAI」を活用した自走力</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  コーディングはAIに任せ、自身は「要件定義」「セキュリティ検証」「ディレクション」に注力。Flutter/iOSやGo/C#など、未知の技術でも短時間で形にするモダンな開発手法を実証しています。
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-blue-100">
                <h4 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-1.5">
                  <span>🤖</span> 3. 専用AIナビゲーターとLLMOpsの実装
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  サイト内にポートフォリオ専用のAIチャットボットを実装。プロンプトインジェクション対策や、Helicone/Slackを用いたAIの可観測性（監視）など、企業導入を見据えたガバナンス設計を体現しています。
                </p>
              </div>
            </div>
          </section>

          {/* 技術スタックとプロジェクト一覧を2カラムで配置 */}
          <section className="grow flex gap-6">
            {/* 左カラム：技術スタック */}
            <div className="flex-1">
              <h3 className="text-base font-bold text-slate-800 mb-3 border-l-4 border-slate-600 pl-3">
                技術スタック (Skills)
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1">フロントエンド / バックエンド</p>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">Next.js, React, TypeScript, Python, Go, C# (.NET), PHP, Flutter/Dart</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1">データベース / インフラ</p>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">MySQL, 複雑なSQL構築, Docker, Vercel, AWS (EC2/S3)</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1">AI / DX・自動化</p>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">OpenAI API, LLMOps, Selenium, Cheerio, GA4/GTM</p>
                </div>
              </div>
            </div>

            {/* 右カラム：プロジェクト一覧 */}
            <div className="flex-1">
              <h3 className="text-base font-bold text-slate-800 mb-3 border-l-4 border-slate-600 pl-3">
                掲載プロジェクト一覧
              </h3>
              {/* プロジェクトが増えたため、行間(space-y)を少し詰めて調整 */}
              <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <li className="flex gap-1.5"><span className="text-blue-600 font-bold">1.</span> SQLデータ移行プロジェクト <span className="text-[10px] text-slate-400">(実務)</span></li>
                <li className="flex gap-1.5"><span className="text-blue-600 font-bold">2.</span> バックアップ運用改善 <span className="text-[10px] text-slate-400">(実務)</span></li>
                <li className="flex gap-1.5"><span className="text-blue-600 font-bold">3.</span> メール事故防止チェックツール <span className="text-[10px] text-slate-400">(実務)</span></li>
                <li className="flex gap-1.5"><span className="text-slate-400 font-bold">4.</span> 予定逆算アプリ(Flutter/iOS) <span className="text-[10px] text-slate-400">(個人)</span></li>
                <li className="flex gap-1.5"><span className="text-slate-400 font-bold">5.</span> 忘れ物チェッカー Pro(Flutter/iOS) <span className="text-[10px] text-slate-400">(個人)</span></li>
                <li className="flex gap-1.5"><span className="text-slate-400 font-bold">6.</span> Webサイト情報チェッカー <span className="text-[10px] text-slate-400">(個人)</span></li>
                <li className="flex gap-1.5"><span className="text-slate-400 font-bold">7.</span> マイクロサービス連携デモ <span className="text-[10px] text-slate-400">(個人)</span></li>
                <li className="flex gap-1.5"><span className="text-slate-400 font-bold">8.</span> ポートフォリオ刷新 <span className="text-[10px] text-slate-400">(学習)</span></li>
                <li className="flex gap-1.5"><span className="text-slate-400 font-bold">9.</span> Python業務準備自動化 <span className="text-[10px] text-slate-400">(個人)</span></li>
                <li className="flex gap-1.5"><span className="text-slate-400 font-bold">10.</span> Tailscale VPN構築・検証 <span className="text-[10px] text-slate-400">(学習)</span></li>
              </ul>
            </div>
          </section>

          {/* フッター（Webへの誘導） */}
          <footer className="mt-4 pt-5 border-t-2 border-slate-100 flex items-center justify-between bg-blue-50 p-5 rounded-lg">
            <div className="flex-1 pr-6">
              <h3 className="text-base font-bold text-blue-800 mb-1.5">
                ▼ 動くデモと詳細な実績は、Webポートフォリオへ
              </h3>
              <p className="text-xs text-slate-700 mb-2 leading-relaxed">
                上記でご紹介した<strong>「専用AIナビゲーター」</strong>は、実際にチャット形式でご質問いただけます。また、各プロジェクトの背景や、未知技術のキャッチアップ事例など、PDFには収まりきらない詳細な実績を多数掲載しております。ぜひお手元のPC・スマートフォンからアクセスしてご体験ください。
              </p>
              <p className="font-bold text-blue-600 text-sm break-all">
                https://kuramitsu-portfolio.vercel.app/
              </p>
            </div>
            {/* QRコードの表示 */}
            <div className="w-20 h-20 bg-white border-2 border-slate-200 flex items-center justify-center shrink-0 p-1">
              <img 
                src="/qr-code.png" 
                alt="Portfolio QR Code" 
                className="w-full h-full object-contain" 
              />
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}