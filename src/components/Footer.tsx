import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-400 py-12 px-4 sm:px-6 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        
        {/* 左側：ロゴ・名前 */}
        <div className="text-center md:text-left">
          <p className="font-bold text-slate-200 text-base mb-1">Kenji Kuramitsu</p>
          <p className="text-xs text-slate-500">Portfolio Website</p>
        </div>
        
        {/* 中央：ナビゲーションリンク */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-medium">
          <Link href="/#home" className="hover:text-white transition-colors duration-200">Home</Link>
          <Link href="/#projects" className="hover:text-white transition-colors duration-200">Projects</Link>
          <Link href="/#skills" className="hover:text-white transition-colors duration-200">Skills</Link>
          <Link href="/#lab" className="hover:text-white transition-colors duration-200">Lab</Link>
          <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-1">
            Privacy Policy
          </Link>
        </div>

        {/* 右側：コピーライト */}
        <div className="text-center md:text-right">
          <p className="text-xs text-slate-500">© 2026 Yayokichi. All Rights Reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}