const projects = [
  {
    title: "社内ワークフロー自動化システム",
    period: "2024.09 – 2025.02",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Node.js"],
    summary: "稟議・申請フローを紙ベースからWebシステムに移行し、承認リードタイムを大幅に短縮。",
    challenge: "部署をまたいだ複雑な承認ルートと、既存のExcel台帳との並行運用が最大の課題でした。",
    learned: "段階的な移行計画の重要性と、エンドユーザーへのヒアリングを繰り返す設計プロセスを体得しました。",
    detail: "申請データのバリデーションにはZodを採用し、型安全を担保。承認フローのステート管理にはサーバーサイドのステートマシンを実装。SQLはマルチステップJOINでフロー状態を一括取得し、N+1を回避。CSRF対策としてDouble Submit Cookieパターンを採用しました。",
  },
  {
    title: "Webサイト情報チェッカー（スクレイピングデモ）",
    period: "2026.04",
    tags: ["Python", "Next.js", "REST API", "セキュリティ"],
    summary: "外部Pythonサーバーと連携し、指定URLのメタ情報をリアルタイム解析するデモ機能。",
    challenge: "外部サイトへの無差別アクセスを防ぎつつ、デモとして十分に動作する仕組みの設計が求められました。",
    learned: "ホワイトリスト制御やCORSの適切な設定を通じて、セキュアなAPI設計の実践知識を深めました。",
    detail: "サーバー側でURL正規化・ホワイトリスト照合を行い、未許可ドメインは即時403を返す設計。BeautifulSoupでパース後、XSS対策としてレスポンスをサニタイズして返却しています。",
  },
  {
    title: "マイクロサービス連携デモ（Go / C#）",
    period: "2026.05",
    tags: ["Go", "C# (.NET)", "Docker", "REST API", "LINQ"],
    summary: "独立したGoおよびC#サービスをフロントエンドから呼び出し、マイクロサービス構成を実証。",
    challenge: "Renderのコールドスタート遅延を許容しつつ、UXを損なわないローディング設計が必要でした。",
    learned: "コスト（無料枠の消費）とUXのトレードオフを意思決定するプロセスを実務的に経験しました。",
    detail: "GoではGoroutineを使った並行処理と直列処理のベンチマークを実装。C#ではLINQによる動的フィルタリング・ソートAPIを構築。フロントエンドはAbortControllerでタイムアウト処理を実装し、スリープ中サーバーへのリクエスト体験を最適化しました。",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-slate-50 py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Projects</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">成果物一覧</h2>
          <p className="mt-2 text-slate-500 text-sm">実装した機能の概要・課題・学びをまとめています。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.title} className="bg-white rounded-lg shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow duration-300">
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs text-slate-400 mb-2 font-medium">{p.period}</p>
                <h3 className="text-base font-bold text-slate-800 mb-4 leading-snug">{p.title}</h3>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="rounded-full px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-slate-600 mb-5 leading-relaxed">{p.summary}</p>

                <div className="bg-slate-50 border border-slate-100 rounded-md p-4 mb-5 space-y-4 flex-1">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">解決した課題</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{p.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">学んだこと</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{p.learned}</p>
                  </div>
                </div>

                <details className="text-sm group">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-700 font-bold transition-colors duration-200 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1">
                    <span className="inline-block transition-transform group-open:rotate-90 mr-1">▶</span> 技術的な詳細
                  </summary>
                  <p className="mt-3 text-slate-600 leading-relaxed text-xs bg-slate-50 rounded p-3 border border-slate-100">
                    {p.detail}
                  </p>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}