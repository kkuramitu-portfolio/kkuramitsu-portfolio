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
  
  // Python Demo用のState
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
    
    // Java版のロジックに合わせて閉じタグ直後の改行削除を追加
    html = html.replace(/(<\/h[1-3]>|<\/li>)\n/g, "$1");
    
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
            <h3 className="text-xl font-bold text-red-600 mb-4">Scraping Demo: Webサイト情報チェッカー</h3>
            <p className="mb-4 text-slate-600 text-sm leading-relaxed">
              Python（BeautifulSoup等）で培ったデータ抽出の知見を応用し、本デモではNext.jsのサーバーサイド機能（API Routes）を用いて実装しています。<br />
              外部Pythonサーバーと通信し、指定したWebサイトのHTMLをリアルタイムで解析して「タイトル（<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono mx-0.5">&lt;title&gt;</code>）」と「概要（<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono mx-0.5">&lt;meta name=&quot;description&quot;&gt;</code>）」を抽出・表示します。
              <span className="text-xs text-slate-500 mt-2 block">
                ※コンプライアンス保護の観点から、無差別なデータ取得によるトラブルを防ぐため、本デモ環境では事前に許可したURL（ホワイトリスト）のみ検証可能としています。
              </span>
            </p>

            <details className="mb-6 border-t border-slate-100 pt-4 group">
              <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer w-full text-left font-bold text-slate-700 p-2 hover:bg-slate-50 rounded transition-colors flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 select-none">
                <span className="inline-block transition-transform duration-200 group-open:rotate-90 mr-2">▶</span>
                この機能のセキュリティ対策について
              </summary>
              <div className="p-4 bg-slate-50 rounded-md mt-2 text-xs text-slate-600 space-y-3 border border-slate-200">
                <p><strong>サーバーサイドリクエストフォージェリ (SSRF) 対策:</strong> ユーザーが入力したURLにサーバーが直接アクセスするため、内部ネットワークへの攻撃（SSRF）が懸念されます。<br/>対策として、プロキシサーバー側でリクエストのタイムアウトを厳格に設定し、意図しないリクエストが長時間サーバーリソースを占有することを防いでいます。</p>
                <p><strong>入力値の検証:</strong> 本デモ環境では、意図しないサーバーへのアクセスを防ぐため、許可するドメインを制限するホワイトリストを導入済みです。実際の運用環境では、これに加えてプライベートIPアドレス範囲へのアクセスを禁止するブラックリストなども組み合わせ、より堅牢なSSRF対策を施します。</p>
              </div>
            </details>

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
              <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors duration-200 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 flex items-center w-fit">
                <span className="inline-block transition-transform duration-200 group-open:rotate-90 mr-1">▶</span> 
                ホワイトリスト一覧
              </summary>
              <div className="mt-3 pl-2">
                <div className="inline-flex items-center text-xs text-slate-600 bg-slate-100 px-3 py-2 rounded-md mb-3 border border-slate-200">
                  <span className="mr-1.5 text-base leading-none">💡</span> 
                  <span>URLをクリックすると入力欄にセットされます（コピー＆ペースト不要）</span>
                </div>
                <ul className="text-sm text-slate-600 space-y-4 list-none">
                  {WHITELIST_ITEMS.map((item, index) => (
                    <li key={index} className="flex flex-col">
                      <div className="flex items-center flex-wrap">
                        <span className="mr-1">・{item.name} (</span>
                        <button onClick={() => setUrl(item.url)} className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors bg-transparent border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center" title="クリックして入力欄にセット">
                          {item.url}
                          <span className="ml-1 text-xs opacity-70">👆</span>
                        </button>
                        <span>)</span>
                      </div>
                      {item.evidence && (
                        <div className="ml-4 mt-1 text-xs text-slate-500 flex items-start">
                          <span className="shrink-0 whitespace-nowrap mt-0.5">└ 許可の根拠: </span>
                          <a 
                            href={item.evidence.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-1 text-slate-500 hover:text-slate-700 underline leading-relaxed whitespace-pre-wrap"
                          >
                            {item.evidence.text}
                          </a>
                        </div>
                      )}
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
            <h3 className="text-xl font-bold text-indigo-600 mb-4">PHP Demo: ひとことBBS</h3>
            <div className="mb-4 text-slate-600 text-sm leading-relaxed space-y-1">
              <p>外部PHPサーバーと通信し、テキストファイルにデータを保存・読み込みします。</p>
              <p>投稿したメッセージは削除も可能です。</p>
              <p>また、メッセージは投稿日から5日経過時点で自動削除されます。</p>
            </div>

            <details className="mb-6 border-t border-slate-100 pt-4 group">
              <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer w-full text-left font-bold text-slate-700 p-2 hover:bg-slate-50 rounded transition-colors flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 select-none">
                <span className="inline-block transition-transform duration-200 group-open:rotate-90 mr-2">▶</span>
                この機能のセキュリティ対策について
              </summary>
              <div className="p-4 bg-slate-50 rounded-md mt-2 text-xs text-slate-600 space-y-3 border border-slate-200">
                <p><strong>XSS対策:</strong> ユーザーからの入力は、サーバーサイドで特殊文字をエスケープ処理（htmlspecialchars）し、フロントエンド（React）でもデフォルトでエスケープされるため、悪意のあるスクリプトの埋め込みを防いでいます。</p>
                <p><strong>ファイル操作の堅牢性:</strong> ファイルの読み書きは排他的ロック（flock）を利用し、複数人による同時書き込み時のデータ破損を防止しています。</p>
              </div>
            </details>

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
              {bbsIsLoading ? (
                <p className="text-sm text-slate-500 text-center py-4">読み込み中...</p>
              ) : bbsError ? (
                <p className="text-sm text-red-600 text-center py-4">{bbsError}</p>
              ) : bbsMessages.length > 0 ? (
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
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">まだメッセージがありません。最初のひとことを書き込んでみましょう！</p>
              )}
            </div>
          </div>

          {/* Java Demo */}
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-bold text-orange-600 mb-4">Java Demo: 簡易マークダウン・プレビューア</h3>
            <p className="mb-4 text-slate-600 text-sm leading-relaxed">
              Javaで構築したロジックを、Webブラウザ用にJavaScriptへ最適化して実装しています。
            </p>

            <details className="mb-6 border-t border-slate-100 pt-4 group">
              <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer w-full text-left font-bold text-slate-700 p-2 hover:bg-slate-50 rounded transition-colors flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 select-none">
                <span className="inline-block transition-transform duration-200 group-open:rotate-90 mr-2">▶</span>
                この機能のセキュリティ対策について
              </summary>
              <div className="p-4 bg-slate-50 rounded-md mt-2 text-xs text-slate-600 space-y-3 border border-slate-200">
                <p><strong>XSS対策（サニタイズの徹底）:</strong> ユーザーが入力したマークダウンからHTMLを動的生成してブラウザに直接描画（dangerouslySetInnerHTML）するため、悪意のあるスクリプト（&lt;script&gt;タグやonerror属性など）が挿入されるXSS（クロスサイトスクリプティング）のリスクが極めて高い機能です。</p>
                <p><strong>DOMPurifyの導入:</strong> 本デモでは、HTML変換後にクライアントサイドで動作する堅牢なサニタイズライブラリである「DOMPurify」を実行し、不正なタグや属性を完全に除去した上で安全にプレビューを描画しています。</p>
              </div>
            </details>

            <textarea 
              placeholder={"【使用可能マークダウン】\n# 大見出し\n## 中見出し\n### 小見出し\n- 親リスト\n  - 子リスト\n    - 孫リスト"} 
              onChange={updatePreview} value={mdInput}
              className="w-full h-40 p-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-y"
            ></textarea>
            <div className="mt-4 p-5 border border-slate-200 rounded-md bg-slate-50 min-h-25 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: mdPreview }}></div>

            <div className="mt-8 bg-slate-800 border border-slate-700 rounded-md p-4">
              <h4 className="text-blue-400 text-lg font-bold mb-3">Base Logic (Java Source Code)</h4>
              <hr className="border-slate-600 mb-4" />
              <pre className="text-slate-300 text-sm leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto">
                <code>
{`public class MarkdownParser {
    public static String parse(String md) {
        if (md == null || md.isEmpty()) return "";

        // 1. まずは各要素をHTMLタグに変換
        String html = md
            .replaceAll("(?m)^### (.*)$", "<h3>$1</h3>")
            .replaceAll("(?m)^## (.*)$", "<h2>$1</h2>")
            .replaceAll("(?m)^# (.*)$", "<h1>$1</h1>")
            .replaceAll("(?m)^    - (.*)$", 
                "<li style='margin-left: 30px; list-style-type: square;'>$1</li>")
            .replaceAll("(?m)^  - (.*)$", 
                "<li style='margin-left: 10px; list-style-type: circle;'>$1</li>")
            .replaceAll("(?m)^- (.*)$", 
                "<li style='margin-left: -10px; list-style-type: disc;'>$1</li>");

        // 2. 見出し(h1~h3)やリスト(li)の「閉じタグの直後」にある改行を1つだけ削除する
        // ※Javaの正規表現では、JSの /g (グローバルマッチ) は
        // replaceAll を使うことで自動的に適用されます
        html = html.replaceAll("(</h[1-3]>|</li>)\\n", "$1");

        // 3. 残った改行を <br> に変換
        return html.replace("\\n", "<br>");
    }
}`}
                </code>
              </pre>
              <p className="mt-6 text-sm text-slate-400 italic leading-relaxed pl-4 -indent-4">
                ※文字列解析の基礎ロジックはJavaで構築・検証しています（ソースコードはGitHubに格納）。実際のWebデモにおいては、通信遅延を防ぎUX（ユーザー体験）を最大化するため、同ロジックをクライアントサイドのJavaScriptへ移植・最適化して実行しています。
              </p>
            </div>
          </div>

          {/* Microservices Architecture */}
          <div className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">Microservices Architecture</h2>
            
            <div className="mb-8 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow-sm flex gap-3 items-start">
              <span className="text-xl leading-none mt-0.5">💡</span>
              <div className="text-sm text-slate-700 leading-relaxed">
                <p className="font-bold text-slate-900 mb-1">
                  アーキテクチャに関する注記 (Go / C# Demo)
                </p>
                <p>
                  処理時間は約3秒前後を想定していますが、Renderの仕様上、一定時間アクセスがないとスリープ状態になるため、初回リクエスト時に<strong>コールドスタートによる遅延（10〜30秒）</strong>が発生します。
                </p>
                <p className="mt-1">
                  ヘルスチェックAPIを用いたバックグラウンドでの事前ウォームアップも検討しましたが、クラウドリソースの最適化（無料枠の枯渇防止）の観点から、意図的に実装を見送っています。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold text-cyan-600 mb-4">Go Demo</h3>
                <p className="mb-6 text-slate-600 text-sm leading-relaxed">
                  外部サーバー(Render)で独立して稼働しているGo言語のAPIと通信し、ステータスを取得します。<br/>（マイクロサービス・アーキテクチャの証明）
                </p>
                <GoDemo />
              </div>
              
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold text-purple-600 mb-4">C# (.NET) Microservice Demo</h3>
                <p className="mb-6 text-slate-600 text-sm leading-relaxed">
                  Dockerコンテナ上で稼働するC# (ASP.NET Core) のAPIと通信します。<br/>堅牢なエンタープライズ技術とモダンフロントエンドの融合を証明します。
                </p>
                <CSharpDemo />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}