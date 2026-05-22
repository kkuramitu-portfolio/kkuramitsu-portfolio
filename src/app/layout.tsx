import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "蔵満賢治 | Portfolio",
  description: "Next.js/TypeScriptで構築したフルスタックエンジニア・ポートフォリオ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      {/* ★ bodyに背景色(#f9f9f9)や基本の文字色を設定 */}
      <body className="min-h-full flex flex-col bg-[#f9f9f9] text-[#333] font-sans leading-relaxed">
        
        {/* ヘッダーは画面幅いっぱいに広がる */}
        <Header /> 
        
        {/* ★ メインコンテンツは最大800pxに制限し、中央寄せにする */}
        <main className="flex-grow w-full max-w-[800px] mx-auto p-6 md:p-8"> 
          {children}
        </main>

        <footer className="text-center py-8 border-t border-gray-200 mt-12 text-gray-500 text-sm">
          <p>&copy; 2024-2026 Yayokichi. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}