import React from "react";

const stats = [
  { value: "20+", label: "学習・実践してきた技術スタック" },
  { value: "5言語", label: "実務・個人開発で実践した言語" },
  { value: "1ヶ月", label: "ポートフォリオ v1.0 到達まで" },
];

export default function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-[80vh] bg-white flex flex-col justify-center py-20 px-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto w-full">
        
        {/* メッセージエリア */}
        <div className="mb-16 text-center">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">
            TARGET ROLE : 社内SE / DX推進 / 業務改善
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-slate-800 leading-tight mb-8">
            現場の「不便」を放置せず、さらなる「便利」を探求し、<br className="hidden sm:block" />
            経験 × 技術 × AI を駆使して<br className="hidden sm:block" />
            「仕組み」を創る社内SEを目指して。
          </h1>
          
          <div className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed space-y-6">
            <p>
              「誰かが解決する」を待つのではなく、自ら課題を発見し、最適な技術を用いて解決まで導く――<br className="hidden sm:block" />
              それが私の行動原理です。
            </p>
            <p>
              私は現在、11年間の品質管理で培った「現場の課題を正確に把握する力」と、<br className="hidden sm:block" />
              生成AIを活用した「未知の技術を即座に形にする自走力」を掛け合わせ、<br className="hidden sm:block" />
              事業会社の社内SE・DX推進担当として、組織の生産性向上に貢献することを目指しています。
            </p>
            <p>
              品質管理で培った現場理解と、Pythonによる業務自動化・改善の経験、<br className="hidden sm:block" />
              さらにPHPを用いたシステム開発経験を活かし、<br className="hidden sm:block" />
              技術と現場理解の両面から組織の生産性向上に貢献したいと考えています。
            </p>
          </div>
        </div>

        {/* スタッツカード */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-50 border border-slate-100 rounded-lg px-6 py-8 text-center hover:shadow-md transition-shadow duration-300"
            >
              <p className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-3 tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ▼ 追加：GitHubリンクエリア ▼ */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow duration-300">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center justify-center sm:justify-start gap-2">
              {/* GitHubのSVGアイコン */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              Source Code on GitHub
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              本ポートフォリオのソースコードやコミット履歴は、GitHubにて公開しております。<br className="hidden sm:block" />
              モダンな技術スタックを用いた実装の詳細をぜひご覧ください。
            </p>
          </div>
          
          {/* ★ href のURLをご自身のGitHubリポジトリのURLに変更してください ★ */}
          <a
            href="https://github.com/yayokichi/kuramitsu-portfolio" 
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 flex items-center gap-2 shadow-sm"
          >
            GitHubでコードを見る
            <span className="text-xs">↗</span>
          </a>
        </div>
        {/* ▲ 追加ここまで ▲ */}

      </div>
    </section>
  );
}