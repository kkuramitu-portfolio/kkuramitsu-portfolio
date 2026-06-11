const stats = [
  { value: "20+", label: "構築・改善した社内システム" },
  { value: "5言語", label: "実務で活用した開発言語" },
  { value: "1ヶ月", label: "ポートフォリオ v1.0 到達まで" },
];

export default function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-[80vh] bg-white flex flex-col justify-center py-20 px-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-16 text-center">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">
            DX推進 / 社内SE / バックオフィス改善
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-6">
            言われるまで待たずに、
            <br className="hidden sm:block" />
            動いて、仕組みを変えます。
          </h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            「誰かがやってくれる」を待たず、業務課題を自分で見つけて技術で解決する——
            そのサイクルを回せる人材として、DX推進・社内SE・バックオフィス改善の現場に貢献します。
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