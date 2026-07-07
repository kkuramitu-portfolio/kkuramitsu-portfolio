import React from "react";

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="bg-slate-50 py-24 px-4 sm:px-6 border-t border-slate-200">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Project Roadmap</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">現在進行中のミッション</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            本ポートフォリオは完成ではなく、継続的な技術検証の場としてアップデートを続けています。
          </p>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-3 sm:ml-6 space-y-8">
          
          {/* Phase 1 (完了) */}
          <div className="relative pl-6 sm:pl-8">
            {/* ▼ -left-3 に修正 ▼ */}
            <span className="absolute -left-3 top-1 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-slate-50">
              ✓
            </span>
            <div className="opacity-60">
              <p className="text-xs font-bold text-slate-500 mb-1">Phase 1</p>
              <h3 className="text-base font-bold text-slate-700 line-through decoration-slate-400">Next.js (App Router) への完全移行</h3>
            </div>
          </div>

          {/* Phase 2 (完了) */}
          <div className="relative pl-6 sm:pl-8">
            {/* ▼ -left-3 に修正 ▼ */}
            <span className="absolute -left-3 top-1 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-slate-50">
              ✓
            </span>
            <div className="opacity-60">
              <p className="text-xs font-bold text-slate-500 mb-1">Phase 2</p>
              <h3 className="text-base font-bold text-slate-700 line-through decoration-slate-400">Go & C# (Docker) によるマルチAPI連携</h3>
            </div>
          </div>

          {/* Phase 3 (完了) */}
          <div className="relative pl-6 sm:pl-8">
            {/* ▼ -left-3 に修正 ▼ */}
            <span className="absolute -left-3 top-1 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-slate-50">
              ✓
            </span>
            <div className="opacity-60">
              <p className="text-xs font-bold text-slate-500 mb-1">Phase 3</p>
              <h3 className="text-base font-bold text-slate-700 line-through decoration-slate-400">ポートフォリオ専用AIナビゲーター実装</h3>
            </div>
          </div>

          {/* Phase 4 (現在進行中) */}
          <div className="relative pl-6 sm:pl-8">
            {/* ▼ -left-3 に修正 ▼ */}
            <span className="absolute -left-3 top-1 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-slate-50">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <div className="bg-white border border-blue-200 rounded-lg p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <p className="text-xs font-bold text-blue-600 mb-1">Phase 4 (In Progress)</p>
              <h3 className="text-lg font-bold text-slate-800 mb-2">AWS RDS (PostgreSQL) データベース構築と連携</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                インフラ層から自力でデータベースを構築し、フロントエンドと連携させることで、フルスタックな開発・運用スキルを実証します。
              </p>
            </div>
          </div>

          {/* Phase 5 (予定) */}
          <div className="relative pl-6 sm:pl-8">
            {/* ▼ -left-3 に修正 ▼ */}
            <span className="absolute -left-3 top-1 bg-slate-200 text-slate-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-slate-50">
              ⏳
            </span>
            <div>
              <p className="text-xs font-bold text-slate-400 mb-1">Phase 5 (Planned)</p>
              <h3 className="text-base font-bold text-slate-600">AWS DynamoDB (NoSQL) の導入とポリグロット永続化の実現</h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}