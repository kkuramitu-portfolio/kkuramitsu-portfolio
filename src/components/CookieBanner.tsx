"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // localStorageを確認し、同意状態が未設定の場合のみ表示
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "granted");
    setIsVisible(false);
    
    // GTMのConsent Modeを更新（GA4が発火するようになる）
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
    
    // Clarityなどのスクリプトを動的に読み込むためのカスタムイベントを発火
    window.dispatchEvent(new Event("cookie_consent_granted"));
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "denied");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm text-slate-200 p-4 sm:p-6 z-[100] shadow-2xl border-t border-slate-700">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm leading-relaxed">
          <p>
            当サイトでは、UI/UXの改善およびアクセス解析を目的としてCookieを使用しています。
            詳細は<Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">プライバシーポリシー</Link>をご確認ください。
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleDecline}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-md transition-colors"
          >
            拒否する
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            同意する
          </button>
        </div>
      </div>
    </div>
  );
}