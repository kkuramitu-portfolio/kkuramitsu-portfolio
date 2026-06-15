import React from "react";

const skillCategories = [
  { 
    label: "フロントエンド", 
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML / CSS"] 
  },
  { 
    label: "バックエンド", 
    skills: ["Node.js", "Python", "Go", "C# (.NET)", "Java", "PHP", "REST API設計"] 
  },
  { 
    label: "データベース", 
    skills: ["MySQL", "複雑なSQL構築（ETL・名寄せ）"] 
  },
  { 
    label: "インフラ / DevOps", 
    skills: ["Docker", "Vercel", "Render", "AWS（EC2 / S3）", "Git / GitHub", "Linux"] 
  },
  { 
    label: "その他（DX・自動化）", // ラベルを少し魅力的に変更
    skills: [
      "業務フロー改善 / DX推進",
      "ブラウザ自動化（Selenium）",
      "スクレイピング（Cheerio）",
      "セキュリティ設計（CSRF / XSS / SSRF対策）", 
      "マイクロサービス設計"
    ] 
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center sm:text-left">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Skills</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">技術スタック</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            実務・個人開発で習得・活用した技術の一覧です。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat) => (
            <div key={cat.label} className="bg-slate-50 p-6 sm:p-8 rounded-lg border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5 border-b border-slate-200 pb-3">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="rounded-full px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm shadow-sm hover:border-blue-300 hover:text-blue-700 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}