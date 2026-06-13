import React from "react";

const projects = [
  {
    id: "sql-migration",
    title: "1. SQLデータ移行プロジェクト",
    badge: "実務課題解決事例",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    summary: "Lotus Notesから業務管理システムへのデータ移行プロジェクトにおいて、移行作業の再設計から検証、本番移行までを担当しました。移行対象は2万件以上の業務データで、グループ会社名・部署名・取引先企業名などの表記揺れや、システム固有のID変換が必要な複雑な案件でした。当初はExcelや既存のデータ取り込みツールを中心とした運用で進められていましたが、データ不整合や変換ミスが多数発生していたため、SQLを用いた移行プロセスへ全面的に見直しを行いました。",
    sections: [
      { 
        title: "背景・課題", 
        fullWidth: true,
        content: (
          <div className="space-y-3 text-sm text-slate-700">
            <ul className="list-disc list-outside ml-4 space-y-1.5">
              <li className="pl-1">Lotus Notesから新システムへの移行案件</li>
              <li className="pl-1">データ件数は2万件以上</li>
              <li className="pl-1">グループ会社名、部署名、取引先企業名などに大量の表記揺れが存在</li>
              <li className="pl-1">ステータスや関連情報を新システム用のIDへ変換する必要があった</li>
              <li className="pl-1">既存担当者が退職し、移行作業の継続が困難な状態だった</li>
            </ul>
            <p className="font-bold text-slate-800 pt-2">さらに調査の結果、以下の問題が判明：</p>
            <ul className="list-disc list-outside ml-4 space-y-1.5">
              <li className="pl-1">CSVをExcelで開いたことによるデータ破損</li>
              <li className="pl-1">VLOOKUPによる不完全な名寄せ</li>
              <li className="pl-1">NULLデータの大量発生</li>
              <li className="pl-1">SQL実行ミスによる特定データの消失</li>
            </ul>
          </div>
        )
      },
      {
        title: "実施内容",
        fullWidth: true,
        content: (
          <div className="space-y-3 text-sm text-slate-700">
            <p className="leading-relaxed">
              まず既存の移行手順を調査し、問題点と影響範囲を整理したレポートを作成してクライアントへ報告しました。その上で、移行プロセスをSQL中心へ再設計しました。
            </p>
            <p className="font-bold text-slate-800 pt-2">移行フロー：</p>
            <ol className="list-decimal list-outside ml-4 space-y-1.5">
              <li className="pl-1">CSVデータをそのまま格納する取込テーブルを作成</li>
              <li className="pl-1">名寄せ・ID変換用のマッピングテーブルを作成</li>
              <li className="pl-1">マッピング情報を利用して変換テーブルを生成</li>
              <li className="pl-1">本番テーブルへデータを投入</li>
              <li className="pl-1">元データと本番データをSQLで照合し整合性を確認</li>
            </ol>
            <p className="leading-relaxed pt-2">
              移行前にクライアントへ計画内容を共有し、承認を得たうえでテスト移行と検証を繰り返し実施しました。
            </p>
          </div>
        )
      },
      { 
        title: "成果", 
        fullWidth: true,
        items: [
          "2万件以上のデータ移行を完遂",
          "表記揺れやID変換を含む複雑なデータ移行を実現",
          "移行後のデータ整合性100%を達成（クライアント評価）",
          "再利用可能な移行手順を確立"
        ] 
      },
      { 
        title: "学んだこと", 
        fullWidth: true,
        content: (
          <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-2">
            <li className="leading-relaxed pl-1">
              データ取り込み工程における品質管理の重要性
              <ul className="list-[circle] list-outside ml-5 mt-1.5 space-y-1 text-slate-600">
                <li className="leading-relaxed pl-1">Excelの自動変換機能による意図しないデータ変換リスクを経験</li>
                <li className="leading-relaxed pl-1">Power Queryを活用した安全なデータ取り込み手法を習得</li>
              </ul>
            </li>
            <li className="leading-relaxed pl-1">ツールに依存せず処理内容を理解することの重要性</li>
            <li className="leading-relaxed pl-1">データ品質がシステム品質に直結すること</li>
            <li className="leading-relaxed pl-1">SQLの活用範囲の広さ</li>
            <li className="leading-relaxed pl-1">クライアントとの合意形成を含めたプロジェクト推進の重要性</li>
          </ul>
        )
      }
    ],
    accordions: [
      { title: "使用SQL（一部抜粋）", content: "（ここにSQLコードを記載予定。いつでも入力できるように枠のみ用意しています。）" },
      { title: "詳細を見る", content: "（移行設計、検証方法、データ整合性確認手順などを掲載予定）" }
    ]
  },
  {
    id: "web-scraper",
    title: "2. Webサイト情報チェッカー",
    badge: "個人開発",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    summary: "Pythonで一般的に行われるスクレイピング処理を、あえてNext.jsのAPI RoutesとNode.js環境で再現したシステムです。指定したWebサイトの情報をサーバーサイドで取得し、タイトルや概要を抽出します。",
    sections: [
      { 
        title: "開発目的", 
        fullWidth: true,
        content: (
          <div className="space-y-3 text-sm text-slate-700">
            <ul className="list-disc list-outside ml-4 space-y-1.5">
              <li className="pl-1">Pythonのスクレイピングロジックを別言語（TypeScript/Node.js）で再現・比較</li>
              <li className="pl-1">Next.jsのサーバーサイド機能（API Routes）の理解</li>
            </ul>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded text-blue-800 text-xs font-bold flex items-center gap-2">
              <span>💡</span>
              <p>※Pythonを用いた実務自動化の実績については「5. Pythonによる業務準備自動化」をご参照ください。</p>
            </div>
          </div>
        )
      },
      { title: "使用技術", items: ["Next.js (API Routes)", "TypeScript", "Cheerio (PythonのBeautifulSoupに相当)", "Fetch API"] },
      { title: "工夫した点", items: ["Pythonでの実装経験を活かしたDOM解析の設計", "User-Agentの偽装によるアクセス拒否の回避", "エラーハンドリングの実装"] },
      { title: "AI活用", items: ["初期実装", "デバッグ支援", "学習支援"] },
      { title: "自分で行ったこと", items: ["要件整理", "実装内容理解", "修正", "テスト", "デプロイ"] },
      { title: "学んだこと", items: ["言語やフレームワークに依存しないスクレイピングの基礎概念", "Next.jsにおけるAPI構築とサーバーサイドでの外部通信", "DOM解析の基礎"] }
    ],
    accordions: [
      { title: "技術的な詳細", content: "（ここに技術的な詳細を記載予定。いつでも入力できるように枠のみ用意しています。）" }
    ]
  },
  {
    id: "microservices",
    title: "3. マイクロサービス連携デモ",
    badge: "個人開発",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    summary: "GoとC#による複数サービス間通信を検証するための学習プロジェクト。",
    sections: [
      { title: "開発目的", items: ["未経験言語の習得", "API連携の理解"] },
      { title: "使用技術", items: ["Go", "C#", "Docker", "REST API"] },
      { title: "工夫した点", items: ["異なる言語間でのデータ連携", "コンテナ環境構築"] },
      { title: "AI活用", items: ["初期コード生成", "学習支援", "デバッグ補助"] },
      { title: "自分で行ったこと", items: ["設計理解", "動作検証", "修正", "デプロイ"] },
      { title: "学んだこと", items: ["マイクロサービス設計", "API通信", "Docker運用"] }
    ],
    accordions: [
      { title: "技術的な詳細", content: "（ここに技術的な詳細を記載予定。いつでも入力できるように枠のみ用意しています。）" }
    ]
  },
  {
    id: "portfolio-renewal",
    title: "4. ポートフォリオ刷新プロジェクト",
    badge: "学習・技術選定事例",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    summary: "HTML/CSSで作成していたポートフォリオをNext.jsへ移行し、保守性・拡張性の向上を図りました。",
    sections: [
      { title: "背景・課題", items: ["静的HTMLによる保守負荷", "コンポーネント再利用が困難", "機能追加時の管理コスト増加"] },
      { title: "実施内容", items: ["Next.js移行", "TypeScript導入", "コンポーネント化", "レスポンシブ対応"] },
      { title: "技術選定理由", items: ["React系フレームワークの需要", "コンポーネント設計の学習", "将来的な機能拡張を考慮"] },
      { title: "今後の展望", items: ["AWS環境構築", "Hono導入", "CI/CD改善"] },
      { title: "学んだこと", items: ["フレームワーク移行", "技術選定プロセス", "保守性を考慮した設計"] }
    ],
    accordions: [
      { title: "移行前後の比較", content: "（ここに比較内容を記載予定。いつでも入力できるように枠のみ用意しています。）" },
      { title: "技術的な詳細", content: "（ここに技術的な詳細を記載予定。いつでも入力できるように枠のみ用意しています。）" }
    ]
  },
  {
    id: "python-automation",
    title: "5. Pythonによる業務準備自動化",
    badge: "個人生産性向上事例",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    summary: "日々の業務開始時に行っていた複数システムへのログインや打刻、スケジュール確認などの定型作業を効率化するため、Pythonを用いた業務準備自動化ツールを開発しました。業務開始前に必要な一連の操作をワンクリックで実行できるようにし、毎日の定型作業を削減しました。",
    sections: [
      { 
        title: "背景・課題", 
        fullWidth: true,
        items: [
          "出勤後の業務開始準備に毎日一定の時間を要していた", 
          "複数の社内システムへ個別にログインする必要があった", 
          "業務開始前の定型作業が多く、生産性向上の余地があると感じていた"
        ] 
      },
      { 
        title: "実施内容", 
        fullWidth: true,
        content: (
          <div className="space-y-3 text-sm text-slate-700">
            <p className="leading-relaxed">
              Pythonを利用して業務開始時の定型作業を自動化しました。
            </p>
            <p className="font-bold text-slate-800 pt-2">自動化内容：</p>
            <ul className="list-disc list-outside ml-4 space-y-1.5">
              <li className="pl-1">勤怠管理システムへのログイン</li>
              <li className="pl-1">出勤打刻の実行</li>
              <li className="pl-1">打刻結果の確認</li>
              <li className="pl-1">社内ポータルへのログイン</li>
              <li className="pl-1">年間カレンダー画面の表示</li>
              <li className="pl-1">施設予約システムへのログイン</li>
              <li className="pl-1">スケジュール管理画面の表示</li>
              <li className="pl-1">施設予約画面の初期設定</li>
              <li className="pl-1">退勤処理の自動化</li>
            </ul>
            <p className="leading-relaxed pt-2">
              日々の利用を前提として改善を繰り返しながら運用しました。
            </p>
          </div>
        )
      },
      { 
        title: "成果", 
        fullWidth: true,
        items: [
          "毎日の業務開始準備時間を短縮", 
          "複数システムへのアクセス作業を一元化", 
          "定型作業を自動化することで業務開始までの手順を簡素化",
          "Pythonを活用した業務自動化の実践経験を獲得",
          "継続的な改善を通じて運用可能な仕組みを構築"
        ] 
      },
      { 
        title: "学んだこと", 
        fullWidth: true,
        items: [
          "小さな業務改善の積み重ねが生産性向上につながること", 
          "定型作業を自動化候補として捉える視点",
          "Pythonによるブラウザ操作自動化の実践",
          "自分自身の業務を分析する重要性",
          "自動化の効果と運用コストのバランス"
        ] 
      }
    ],
    accordions: [
      { title: "使用コード（一部抜粋）", content: "（ここにPythonコードを記載予定。いつでも入力できるように枠のみ用意しています。）" },
      { title: "詳細を見る", content: "（設計方針、利用ライブラリ、改善履歴、運用方法などを掲載予定）" }
    ]
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-slate-50 py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center sm:text-left">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Projects & Case Studies</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">課題解決の実績と開発事例</h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto sm:mx-0">
            実務での改善活動や個人開発を通じて、課題発見から解決まで取り組んだ事例をまとめています。
          </p>
        </div>

        <div className="flex flex-col gap-10 max-w-3xl mx-auto">
          {projects.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                
                <div className="mb-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold border mb-3 ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">{p.title}</h3>
                </div>

                <p className="text-sm text-slate-600 mb-6 leading-relaxed pb-6 border-b border-slate-100">
                  {p.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {p.sections.map((sec) => (
                    <div 
                      key={sec.title} 
                      className={`bg-slate-50 border border-slate-100 rounded-md p-4 sm:p-5 ${sec.fullWidth ? 'sm:col-span-2' : ''}`}
                    >
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">{sec.title}</p>
                      
                      {sec.content ? (
                        sec.content
                      ) : (
                        <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-2">
                          {sec.items?.map((item, idx) => (
                            <li key={idx} className="leading-relaxed pl-1">{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {p.accordions.length > 0 && (
                  <div className="space-y-3 mt-2">
                    {p.accordions.map((acc) => (
                      <details key={acc.title} className="text-sm group">
                        <summary className="cursor-pointer text-blue-600 hover:text-blue-700 font-bold transition-colors duration-200 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 inline-flex items-center">
                          <span className="inline-block transition-transform group-open:rotate-90 mr-1">▶</span> {acc.title}
                        </summary>
                        <div className="mt-2 text-slate-600 leading-relaxed text-sm bg-slate-50 rounded p-4 border border-slate-100">
                          {acc.content}
                        </div>
                      </details>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}