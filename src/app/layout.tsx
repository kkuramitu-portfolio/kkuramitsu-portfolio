import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from '@next/third-parties/google';

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
      <body className="min-h-full flex flex-col bg-white text-slate-800 font-sans leading-relaxed">
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}>
          <Header />
          <main className="grow w-full max-w-5xl mx-auto px-4 sm:px-6">
            {children}
          </main>
          <Footer />
        </ReCaptchaProvider>
        <Analytics />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      </body>
    </html>
  );
}