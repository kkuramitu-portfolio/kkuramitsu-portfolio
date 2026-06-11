const skillCategories = [
  { label: "フロントエンド", skills: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML / CSS"] },
  { label: "バックエンド", skills: ["Node.js", "Python", "Go", "C# (.NET)", "Java", "PHP", "REST API設計"] },
  { label: "データベース", skills: ["PostgreSQL", "MySQL", "SQLite", "AWS RDS", "AWS DynamoDB（学習中）"] },
  { label: "インフラ / DevOps", skills: ["Docker", "Vercel", "Render", "AWS（EC2 / S3）", "Git / GitHub", "Linux"] },
  { label: "その他", skills: ["セキュリティ設計（CSRF / XSS対策）", "マイクロサービス設計", "スクレイピング / 自動化", "業務フロー改善 / DX推進"] },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Skills</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">技術スタック</h2>
          <p className="mt-2 text-slate-500 text-sm">実務・個人開発で習得・活用した技術の一覧です。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat) => (
            <div key={cat.label} className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="rounded-full px-3 py-1 bg-white border border-slate-200 text-slate-700 text-sm shadow-sm hover:border-blue-300 transition-colors duration-200">
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