"use client";
import { useState, useEffect } from 'react';
import GoDemo from './GoDemo';
import CSharpDemo from './CSharpDemo';
import DOMPurify from 'dompurify';

interface CheckResult { title: string; description: string; }
interface BbsMessage { id: string; timestamp: string; message: string; }

const WHITELIST_ITEMS = [
  { name: "Example Domain", url: "https://example.com", evidence: { text: "IANA提供のテスト用ドメイン", url: "https://www.iana.org/domains/reserved" } },
  { name: "気象庁HP", url: "https://www.jma.go.jp/", evidence: { text: "利用規約（政府標準利用規約に準拠しデータ利用可能）", url: "https://www.jma.go.jp/jma/kishou/info/coment.html" } },
  { name: "Next.js 公式", url: "https://nextjs.org", evidence: { text: "公式が機械読み取り用ファイル(llms.txt)を提供", url: "https://nextjs.org/docs/llms-full.txt" } },
  { name: "React 公式", url: "https://react.dev", evidence: { text: "robots.txt にて一般的なクローラーのアクセスが許可されており、かつオープンソースプロジェクトの技術ドキュメントとして広範な情報収集・利用が容認されているため。", url: "https://react.dev/robots.txt" } }
];
const ALLOWED_DOMAINS = WHITELIST_ITEMS.map(item => new URL(item.url).hostname);

export default function LabSection() {
  const [mdInput, setMdInput] = useState('');
  const [mdPreview, setMdPreview] = useState('');
  const [bbsInput, setBbsInput] = useState('');
  const [bbsMessages, setBbsMessages] = useState<BbsMessage[]>([]);
  const [bbsIsLoading, setBbsIsLoading] = useState(true);
  const [bbsError, setBbsError] = useState('');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const parseMarkdown = (md: string): string => {
    if (!md) return "";
    let html = md
      .replace(/^### (.*)$/gm, "<h3>$1</h3>")
      .replace(/^## (.*)$/gm, "<h2>$1</h2>")
      .replace(/^# (.*)$/gm, "<h1>$1</h1>")
      .replace(/^    - (.*)$\n?/gm, "<li style='margin-left: 30px; list-style-type: square;'>$1</li>")
      .replace(/^  - (.*)$\n?/gm, "<li style='margin-left: 10px; list-style-type: circle;'>$1</li>")
      .replace(/^- (.*)$\n?/gm, "<li style='margin-left: -10px; list-style-type: disc;'>$1</li>");
    return html.replace(/\n/g, "<br />");
  };

  const updatePreview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setMdInput(newText);
    setMdPreview(DOMPurify.sanitize(parseMarkdown(newText)));
  };

  const fetchBbsMessages = async () => {
    try {
      setBbsIsLoading(true);
      const response = await fetch('/api/bbs-proxy');
      if (!response.ok) throw new Error('BBSデータの取得に失敗しました。');
      const data = await response.json();
      setBbsMessages(data.messages || []);
    } catch (err) {
      setBbsError(err instanceof Error ? err.message : '不明なエラー');
    } finally {
      setBbsIsLoading(false);
    }
  };

  useEffect(() => { fetchBbsMessages(); }, []);

  const submitBBS = async () => {
    if (!bbsInput.trim()) return;
    try {
      const response = await fetch('/api/bbs-proxy', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: bbsInput }),
      });
      if (!response.ok) throw new Error('送信に失敗しました。');
      setBbsInput('');
      fetchBbsMessages();
    } catch (err) { alert(err instanceof Error ? err.message : 'エラーが発生しました'); }
  };

  const handleDeleteBbsMessage = async (id: string) => {
    if (!confirm('このメッセージを削除しますか？')) return;
    try {
      const response = await fetch('/api/bbs-proxy', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('削除に失敗しました。');
      fetchBbsMessages();
    } catch (err) { alert(err instanceof Error ? err.message : 'エラーが発生しました'); }
  };  

  const checkSite = async () => {
    if (isLoading) return;
    setIsLoading(true); setError(''); setResult(null);
    try {
      const parsedUrl = new URL(url);
      if (!ALLOWED_DOMAINS.includes(parsedUrl.hostname)) {
        setError('【実行ブロック】コンプライアンス遵守のため、ホワイトリスト以外のスクレイピングを制限しています。');
        setIsLoading(false); return;
      }
    } catch (e) {
      setError('有効なURLを入力してください。'); setIsLoading(false); return;
    }
    try {
      const response = await fetch(`/api/check?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error('解析に失敗しました。');
      setResult(await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラー');
    } finally { setIsLoading(false); }
  };

  return (
    <section id="lab" className="bg-slate-50 py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Lab</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">LAB: 技術の実験室</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            実際に動作するデモアプリケーションです。フロントエンドから各バックエンドへの連携をご確認いただけます。
          </p>
        </div>

        <div className="space-y-8">
          {/* Python Demo */}
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Python Demo: Webサイト情報チェッカー</h3>
            <p className="mb-6 text-slate-600 text-sm leading-relaxed">
              外部Pythonサーバーと通信し、指定したWebサイトのHTMLをリアルタイムで解析して「タイトル」と「概要」を抽出・表示します。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input 
                type="text" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)}
                className="grow p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button 
                onClick={checkSite} disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-md hover:bg-blue-700 disabled:bg-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
              >
                {isLoading ? '解析中...' : '解析実行'}
              </button>
            </div>
            
            <details className="mb-6 group">
              <summary className="cursor-pointer text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors duration-200 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1">
                <span className="inline-block transition-transform group-open:rotate-90 mr-1">▶</span> ホワイトリスト一覧
              </summary>
              <div className="mt-3 pl-2">
                <ul className="text-sm text-slate-600 space-y-3 list-none">
                  {WHITELIST_ITEMS.map((item, index) => (
                    <li key={index} className="flex flex-col">
                      <div className="flex items-center">
                        ・{item.name} (
                        <button onClick={() => setUrl(item.url)} className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors bg-transparent border-none cursor-pointer mx-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          {item.url}
                        </button>)
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            {error && <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-700 mb-4">{error}</div>}
            {result && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-md">
                <h4 className="font-bold text-slate-800 mb-2 pb-2 border-b border-slate-200">タイトル: {result.title}</h4>
                <p className="text-sm text-slate-600">概要: {result.description}</p>
              </div>
            )}
          </div>

          {/* PHP Demo */}
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-bold text-slate-800 mb-4">PHP Demo: ひとことBBS</h3>
            <p className="mb-6 text-slate-600 text-sm leading-relaxed">
              外部PHPサーバーと通信し、テキストファイルにデータを保存・読み込みします。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input 
                type="text" placeholder="メッセージを入力" value={bbsInput} onChange={(e) => setBbsInput(e.target.value)}
                className="grow p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button 
                onClick={submitBBS}
                className="px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
              >
                送信
              </button>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-md p-4 max-h-64 overflow-y-auto">
              {bbsIsLoading ? <p className="text-sm text-slate-500 text-center py-4">読み込み中...</p> : 
               bbsMessages.length > 0 ? (
                <ul className="space-y-3">
                  {bbsMessages.map((msg, index) => (
                    <li key={msg.id} className={`flex justify-between items-start pb-3 ${index !== bbsMessages.length - 1 ? 'border-b border-slate-200' : ''}`}>
                      <div className="grow pr-4">
                        <p className="text-sm text-slate-800 wrap-break-word"><span className="mr-2">💬</span>{msg.message}</p>
                        <p className="text-xs text-slate-400 mt-1">{msg.timestamp}</p>
                      </div>
                      <button onClick={() => handleDeleteBbsMessage(msg.id)} className="shrink-0 px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500">削除</button>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-slate-500 text-center py-4">まだメッセージがありません。</p>}
            </div>
          </div>

          {/* Java Demo */}
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Java Demo: 簡易マークダウン・プレビューア</h3>
            <textarea 
              placeholder={"# 大見出し\n## 中見出し\n- リスト"} 
              onChange={updatePreview} value={mdInput}
              className="w-full h-40 p-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-y"
            ></textarea>
            <div className="mt-4 p-5 border border-slate-200 rounded-md bg-slate-50 min-h-25 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: mdPreview }}></div>
          </div>

          {/* Microservices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-bold text-slate-800 mb-3">Go Demo</h4>
              <GoDemo />
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h4 className="text-lg font-bold text-slate-800 mb-3">C# (.NET) Demo</h4>
              <CSharpDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}