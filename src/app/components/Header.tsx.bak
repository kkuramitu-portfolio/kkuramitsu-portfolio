import React from 'react';
import Link from 'next/link';

const Header = () => {
  const oldVersionUrl = 'https://yayokichi-portfolio-v1.vercel.app/'; 
  const lastUpdated = "2026.05.23"; 

  return (
    <header className="px-6 py-8 border-b-4 border-gray-800 bg-white w-full">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        
        <div className="flex flex-col gap-4">
          <Link href="#top" className="inline-block font-extrabold text-3xl md:text-4xl tracking-tight text-gray-900 no-underline transition-opacity hover:opacity-80">
            ポートフォリオ：蔵満賢治
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm font-bold">
            <span className="text-gray-600 bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200">
              最終更新: {lastUpdated}
            </span>
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;