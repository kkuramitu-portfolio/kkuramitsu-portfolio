import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { ReCaptchaProvider } from "next-recaptcha-v3";

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
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>

        {/* ヘッダーは画面幅いっぱいに広がる */}
        <Header /> 
        
        {/* ★ メインコンテンツは最大800pxに制限し、中央寄せにする */}
        <main className="grow w-full max-w-200 mx-auto p-6 md:p-8"> 
          {children}
        </main>
          <footer className="text-center py-8 border-t border-gray-200 mt-12 text-gray-500 text-sm">
            <p>&copy; 2026 Yayokichi. All Rights Reserved.</p>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#888",
                marginTop: "5px",
              }}
            >
              Build Log: Started April 2026. Reached Ver 1.0 in 1 month.
            </p>
          </footer>
        </ReCaptchaProvider>
      </body>
    </html>
  );
}