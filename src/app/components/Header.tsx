import React from 'react';
import Link from 'next/link';

const Header = () => {
  const oldVersionUrl = 'https://yayokichi-portfolio-v1.vercel.app/'; 
  const lastUpdated = "2026.05.14"; 

  return (
    <header className="px-6 py-8 border-b-4 border-gray-800 bg-white w-full">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        
        <div className="flex flex-col gap-4">
          <Link href="#top" className="inline-block font-extrabold text-3xl md:text-4xl tracking-tight text-gray-900 no-underline transition-opacity hover:opacity-80">
            やよ吉のポートフォリオ
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm font-bold">
            <span className="text-gray-600 bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200">
              最終更新: {lastUpdated}
            </span>
            
            <span className="text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-200 flex items-center gap-2 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              現在進行中: AWS RDS (PostgreSQL) 連携機能を開発中！
            </span>
          </div>
        </div>

        <a 
          href={oldVersionUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group flex items-center gap-2 text-sm font-bold text-gray-600 bg-white border-2 border-gray-300 px-5 py-2.5 rounded-md no-underline transition-all duration-200 hover:border-gray-900 hover:text-gray-900 hover:shadow-sm active:scale-95"
        >
          <svg className="transition-transform duration-300 group-hover:-rotate-45" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
            <path d="M12 7v5l4 2"/>
          </svg>
          静的HTML版の軌跡を見る
        </a>

      </div>
    </header>
  );
};

export default Header;