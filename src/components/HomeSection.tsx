const stats = [
  { value: "20+", label: "学習・実践してきた技術スタック" },
  { value: "5言語", label: "実務・個人開発で実践した言語" },
  { value: "1ヶ月", label: "ポートフォリオ v1.0 到達まで" },
];

export default function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-[80vh] bg-white flex flex-col justify-center py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-16 text-center">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">
            TARGET ROLE : 社内SE / DX推進 / 業務改善
          </p>
          
          {/* ▼ 修正1：h1に「駆使して」を追加し、文字サイズを微調整 */}
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-slate-800 leading-tight mb-8">
            現場の「不便」を放置せず、さらなる「便利」を探求し、
            <br className="hidden md:block" /> {/* sm:blockからmd:blockに変更し、スマホでは自然に改行させる */}
            経験 × 技術 × AI を駆使して「仕組み」を創る社内SEを目指して。
          </h1>
          
          {/* ▼ 修正2：max-w-xl を max-w-3xl に変更して幅を広げ、適度に改行を入れる */}
          <p className="text-slate-700 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            「誰かが解決する」を待つのではなく、自ら課題を発見し、最適な技術を用いて解決まで導く——<br className="hidden sm:block" />
            それが私の行動原理です。<br />
            <br />
            私は現在、11年間の品質管理で培った「現場の課題を正確に把握する力」と、<br className="hidden sm:block" />
            生成AIを活用した「未知の技術を即座に形にする自走力」を掛け合わせ、<br className="hidden sm:block" />
            事業会社の社内SE・DX推進担当として、組織の生産性向上に貢献することを目指しています。<br />
            <br />
            品質管理で培った現場理解と、Pythonによる業務自動化・改善の経験、<br className="hidden sm:block" />
            さらにPHPを用いたシステム開発経験を活かし、<br className="hidden sm:block" />
            技術と現場理解の両面から組織の生産性向上に貢献したいと考えています。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
            >
              成果物を見る
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              お問い合わせ
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
}