export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-400 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
        <div className="text-center sm:text-left">
          <p className="font-bold text-slate-200 text-base mb-1">蔵満 賢治</p>
          <p className="text-xs text-slate-500">Portfolio Website</p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-xs text-slate-500">© 2026 Yayokichi. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}