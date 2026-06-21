"use client";

import { useState } from "react";
import Link from "next/link";

// ▼ サブ項目を追加 ▼
const navLinks = [
  { label: "Home", href: "#home" },
  { 
    label: "Projects", 
    href: "#projects",
    subItems: [
      { label: "1. SQLデータ移行", href: "#sql-migration" },
      { label: "2. バックアップ運用改善", href: "#backup-improvement" }, // ← 追加
      { label: "3. Webサイト情報チェッカー", href: "#web-scraper" },
      { label: "4. マイクロサービス連携", href: "#microservices" },
      { label: "5. ポートフォリオ刷新", href: "#portfolio-renewal" },
      { label: "6. Python業務準備自動化", href: "#python-automation" },
    ]
  },
  { label: "Skills", href: "#skills" },
  { 
    label: "Lab", 
    href: "#lab",
    subItems: [
      { label: "Scraping Demo", href: "#lab-scraping" },
      { label: "PHP Demo", href: "#lab-php" },
      { label: "Java Demo", href: "#lab-java" },
      { label: "Microservices", href: "#lab-microservices" },
    ]
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          className="group flex flex-col leading-tight hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          <span className="text-slate-800 font-semibold text-base tracking-tight group-hover:text-blue-600 transition-colors duration-200">
            Kenji Kuramitsu | Portfolio
          </span>
          <span className="text-slate-400 text-xs tracking-wide">
            Tech & Business Process
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group">
              <Link
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-1"
              >
                {link.label}
                {/* サブ項目がある場合は下矢印を表示 */}
                {link.subItems && <span className="text-[10px] text-slate-400 group-hover:text-blue-500 transition-colors">▼</span>}
              </Link>

              {/* ▼ ホバー時に表示されるドロップダウン ▼ */}
              {link.subItems && (
                <div className="absolute left-0 top-full pt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left scale-95 group-hover:scale-100 z-50">
                  <div className="bg-white border border-slate-200 rounded-md shadow-lg py-2">
                    {link.subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="#contact"
            className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-0.5 bg-current mb-1.5 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-current mb-1.5 transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-current transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-3 shadow-md max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.href} className="flex flex-col">
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 rounded-md transition-colors duration-200"
              >
                {link.label}
              </Link>
              {/* スマホ版はインデントして全項目を表示 */}
              {link.subItems && (
                <div className="flex flex-col pl-4 ml-3 border-l-2 border-slate-100 mt-1 space-y-1">
                  {link.subItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMenuOpen(false)}
                      className="py-1.5 px-2 text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-3 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md text-center transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}