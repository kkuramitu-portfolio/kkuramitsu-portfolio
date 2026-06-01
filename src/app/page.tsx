"use client";
import Image from "next/image";
import { useState, useEffect } from 'react';
import GoDemo from './components/GoDemo';
import CSharpDemo from './components/CSharpDemo';
import DOMPurify from 'dompurify';

interface CheckResult {
  title: string;
  description: string;
}

interface BbsMessage {
  id: string;
  timestamp: string;
  message: string;
}

// ホワイトリストの定義に「根拠(evidence)」を追加
const WHITELIST_ITEMS = [
  { 
    name: "Example Domain", 
    url: "https://example.com",
    evidence: {
      text: "IANA提供のテスト用ドメイン",
      url: "https://www.iana.org/domains/reserved"
    }
  },
  { 
    name: "気象庁HP", 
    url: "https://www.jma.go.jp/",
    evidence: {
      text: "利用規約（政府標準利用規約に準拠しデータ利用可能）",
      url: "https://www.jma.go.jp/jma/kishou/info/coment.html"
    }
  },
  { 
    name: "Next.js 公式", 
    url: "https://nextjs.org",
    evidence: {
      text: "公式が機械読み取り用ファイル(llms.txt)を提供",
      url: "https://nextjs.org/docs/llms-full.txt"
    }
  },
  { 
    name: "React 公式", 
    url: "https://react.dev",
    evidence: {
      text: "robots.txt にて一般的なクローラーのアクセスが許可されており、かつオープンソースプロジェクトの技術ドキュメントとして\n広範な情報収集・利用が容認されているため。",
      url: "https://react.dev/robots.txt"
    }
  }
];
const ALLOWED_DOMAINS = WHITELIST_ITEMS.map(item => new URL(item.url).hostname);

export default function Home() {
  // --- マークダウン用 ---
  const [mdInput, setMdInput] = useState('');
  const [mdPreview, setMdPreview] = useState('');
  const [isJavaSecurityInfoOpen, setJavaSecurityInfoOpen] = useState(false);

  // --- BBS用 ---
  const [bbsInput, setBbsInput] = useState('');
  const [bbsMessages, setBbsMessages] = useState<BbsMessage[]>([]);
  const [bbsIsLoading, setBbsIsLoading] = useState(true);
  const [bbsError, setBbsError] = useState('');
  const [isBbsSecurityInfoOpen, setBbsSecurityInfoOpen] = useState(false);

  // --- Python/PHP Demo用 ---
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPythonSecurityInfoOpen, setPythonSecurityInfoOpen] = useState(false);
  const [isWhitelistOpen, setIsWhitelistOpen] = useState(false);

  // --- 解析ロジック ---
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
    
    const rawHtml = parseMarkdown(newText);
    // サニタイズ処理を追加！
    const sanitizedHtml = DOMPurify.sanitize(rawHtml); 
    
    setMdPreview(sanitizedHtml);
  };

  // --- BBSデータ取得 ---
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

  useEffect(() => {
    fetchBbsMessages();
  }, []);

  // --- BBS送信処理 ---
  const submitBBS = async () => {
    if (!bbsInput.trim()) return;
    try {
      const response = await fetch('/api/bbs-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: bbsInput }),
      });
      if (!response.ok) throw new Error('送信に失敗しました。');
      setBbsInput('');
      fetchBbsMessages();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'エラーが発生しました');
    }
  };

  // --- BBS削除処理 ---
  const handleDeleteBbsMessage = async (id: string) => {
    if (!confirm('このメッセージを削除しますか？')) {
      return;
    }
    try {
      const response = await fetch('/api/bbs-proxy', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '削除に失敗しました。');
      }
      fetchBbsMessages();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'エラーが発生しました');
    }
  };  

  // --- Pythonサイトチェック ---
  const checkSite = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const parsedUrl = new URL(url);
      if (!ALLOWED_DOMAINS.includes(parsedUrl.hostname)) {
        setError('【実行ブロック】コンプライアンスおよび各サイトの利用規約を遵守するため、本デモ環境では事前に許可されたドメイン（ホワイトリスト）以外のスクレイピングを制限しています。お手数ですが、ホワイトリスト一覧を展開し、表示されているURLでお試しください（URLをクリックすると自動入力されます）。');
        setIsLoading(false);
        return;
      }
    } catch (e) {
      setError('有効なURLを入力してください。（例: https://example.com）');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/check?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '解析に失敗しました。');
      }
      const data: CheckResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラー');
    } finally {
      setIsLoading(false);
    }
  };

return (
    <>
        <section id="top">
          <h2>LAB: 技術の実験室</h2>

          {/* Python Demo */}
          <div className="lab-card" style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            marginBottom: '40px'
          }}>
            <h3 style={{ marginBottom: '16px' }}>Python Demo: Webサイト情報チェッカー</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
            スクレイピング技術のデモンストレーションです。<br />外部Pythonサーバーと通信し、指定したWebサイトのHTMLをリアルタイムで解析して「タイトル（<code className="bg-gray-100 px-1 rounded text-sm text-pink-600">&lt;title&gt;</code>）」と「概要（<code className="bg-gray-100 px-1 rounded text-sm text-pink-600">&lt;meta name=&quot;description&quot;&gt;</code>）」を抽出・表示します。
            <span className="text-sm text-gray-500 mt-2 inline-block">
            ※コンプライアンス保護の観点から、無差別なデータ取得によるトラブルを防ぐため、本デモ環境では事前に許可したURL（ホワイトリスト）のみ検証可能としています。
            </span>
            </p>
              <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <button 
                  onClick={() => setPythonSecurityInfoOpen(!isPythonSecurityInfoOpen)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', width: '100%', textAlign: 'left', fontWeight: 'bold', color: '#333' }}
                >
                  ▶ この機能のセキュリティ対策について
                </button>
                {isPythonSecurityInfoOpen && (
                  <div style={{ padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '4px', marginTop: '8px', fontSize: '0.9rem', color: '#555' }}>
                  <p><strong>サーバーサイドリクエストフォージェリ (SSRF) 対策:</strong> ユーザーが入力したURLにサーバーが直接アクセスするため、内部ネットワークへの攻撃（SSRF）が懸念されます。<br/>対策として、プロキシサーバー（Next.js API Route）側でリクエストのタイムアウトを厳格に設定し、意図しないリクエストが長時間サーバーリソースを占有することを防いでいます。</p>
                  {/* ↓ ここを修正 ↓ */}
                  <p style={{ marginBottom: 0 }}><strong>入力値の検証:</strong> 本デモ環境では、意図しないサーバーへのアクセスを防ぐため、許可するドメインを制限するホワイトリストを導入済みです。実際の運用環境では、これに加えてプライベートIPアドレス範囲へのアクセスを禁止するブラックリストなども組み合わせ、より堅牢なSSRF対策を施します。</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={checkSite} 
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? '解析中...' : '解析実行'}
                </button>
              </div>
              {/* ホワイトリスト一覧のアコーディオン */}
              <div className="mt-3">
                <button 
                  onClick={() => setIsWhitelistOpen(!isWhitelistOpen)}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center bg-transparent border-none cursor-pointer p-0"
                >
                  {isWhitelistOpen ? '▼' : '▶'} ホワイトリスト一覧
                </button>
                {isWhitelistOpen && (
                  <div className="mt-2 pl-2">
                    <div className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-3 py-2 rounded-md mb-3 border border-gray-200">
                      <span className="mr-1.5 text-base leading-none">💡</span> 
                      <span>URLをクリックすると入力欄にセットされます（コピー＆ペースト不要）</span>
                    </div>
                    
                    <ul className="text-sm text-gray-600 space-y-3 list-none">
                      {WHITELIST_ITEMS.map((item, index) => (
                        <li key={index} className="flex flex-col">
                          <div className="flex items-center">
                            ・{item.name} (
                            <button 
                              onClick={() => setUrl(item.url)}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors bg-transparent border-none cursor-pointer mx-1 flex items-center"
                              title="クリックして入力欄にセット"
                            >
                              {item.url}
                              <span className="ml-1 text-xs opacity-70">👆</span>
                            </button>
                            )
                          </div>
                          {/* 根拠の表示部分 */}
                          {item.evidence && (
                            <div className="ml-4 mt-1 text-xs text-gray-500 flex items-start">
                              {/* ★ 修正: ラベルをspanで囲み、改行と縮小を禁止 */}
                              <span className="shrink-0 whitespace-nowrap mt-[2px]">└ 許可の根拠: </span>
                              <a 
                                href={item.evidence.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="ml-1 text-gray-500 hover:text-gray-700 underline leading-relaxed whitespace-pre-wrap"
                              >
                                {item.evidence.text}
                              </a>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="result-area mt-4">
                {error && (
                  <p style={{ color: '#dc2626', fontSize: '0.9rem', lineHeight: '1.5', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '6px', border: '1px solid #f87171' }}>
                    {error}
                  </p>
                )}
                {result && (
                  <div style={{
                    marginTop: '15px',
                    padding: '15px',
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ marginTop: 0, marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px dashed #ccc' }}>
                      タイトル: {result.title}
                    </h4>
                    <p style={{ margin: 0 }}>
                      概要: {result.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          {/* PHP Demo (BBS) */}
          <div className="lab-card" style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            marginBottom: '40px'
          }}>
            <h3 style={{ marginBottom: '16px' }}>PHP Demo: ひとことBBS</h3>
            <p>外部PHPサーバーと通信し、テキストファイルにデータを保存・読み込みします。</p>
            <p>投稿したメッセージは削除も可能です。</p>
            <p>外部PHPサーバーと通信し、テキストファイルにデータを保存・読み込みします。</p>
              <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <button 
                  onClick={() => setBbsSecurityInfoOpen(!isBbsSecurityInfoOpen)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', width: '100%', textAlign: 'left', fontWeight: 'bold', color: '#333' }}
                >
                  ▶ この機能のセキュリティ対策について
                </button>
                {isBbsSecurityInfoOpen && (
                  <div style={{ padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '4px', marginTop: '8px', fontSize: '0.9rem', color: '#555' }}>
                    <p><strong>XSS対策:</strong> ユーザーからの入力は、サーバーサイドで特殊文字をエスケープ処理（htmlspecialchars）し、フロントエンド（React）でもデフォルトでエスケープされるため、悪意のあるスクリプトの埋め込みを防いでいます。</p>
                    <p style={{ marginBottom: 0 }}><strong>ファイル操作の堅牢性:</strong> ファイルの読み書きは排他的ロック（flock）を利用し、複数人による同時書き込み時のデータ破損を防止しています。</p>
                  </div>
                )}
              </div>
            {/* ★ 修正: inputとbuttonにclassNameを追加 */}
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                placeholder="メッセージを入力" 
                value={bbsInput}
                onChange={(e) => setBbsInput(e.target.value)}
                className="grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={submitBBS}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                送信
              </button>
            </div>
            
            <div id="bbsList" className="result-area">
              {bbsIsLoading ? (
                <p>読み込み中...</p>
              ) : bbsError ? (
                <p style={{ color: 'red' }}>{bbsError}</p>
              ) : (
                <div style={{
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '10px 15px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  maxHeight: '250px',
                  overflowY: 'auto'
                }}>
                  {bbsMessages.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {bbsMessages.map((msg, index) => (
                        <li key={msg.id} style={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderBottom: index === bbsMessages.length - 1 ? 'none' : '1px dashed #ccc', 
                          padding: '8px 0',
                          wordBreak: 'break-word'
                        }}>
                          <div>
                            <span style={{ marginRight: '8px', color: '#0070f3' }}>💬</span>
                            {msg.message}
                            <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '4px' }}>
                              {msg.timestamp}
                            </div>
                          </div>
                          <button 
                            onClick={() => handleDeleteBbsMessage(msg.id)}
                            style={{ 
                              background: '#ff4d4d', 
                              color: 'white', 
                              border: 'none', 
                              borderRadius: '4px',
                              padding: '4px 8px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              marginLeft: '10px',
                              flexShrink: 0 // ★ 追加: ボタンが縮まないように
                            }}
                          >
                            削除
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ margin: 0, color: '#666', textAlign: 'center' }}>
                      まだメッセージがありません。最初のひとことを書き込んでみましょう！
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Java Demo (Markdown) */}
          <div className="lab-card" style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            marginBottom: '40px'
          }}>
            <h3 style={{ marginBottom: '16px' }}>Java Demo: 簡易マークダウン・プレビューア</h3>
            <p>Javaで構築したロジックを、Webブラウザ用にJavaScriptへ最適化して実装しています。</p>
            <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
              <button 
                onClick={() => setJavaSecurityInfoOpen(!isJavaSecurityInfoOpen)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', width: '100%', textAlign: 'left', fontWeight: 'bold', color: '#333' }}
              >
                ▶ この機能のセキュリティ対策について
              </button>
              {isJavaSecurityInfoOpen && (
                <div style={{ padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '4px', marginTop: '8px', fontSize: '0.9rem', color: '#555' }}>
                  <p><strong>XSS対策（サニタイズの徹底）:</strong> ユーザーが入力したマークダウンからHTMLを動的生成してブラウザに直接描画（dangerouslySetInnerHTML）するため、悪意のあるスクリプト（&lt;script&gt;タグやonerror属性など）が挿入されるXSS（クロスサイトスクリプティング）のリスクが極めて高い機能です。</p>
                  <p style={{ marginBottom: 0 }}><strong>DOMPurifyの導入:</strong> 本デモでは、HTML変換後にクライアントサイドで動作する堅牢なサニタイズライブラリである「DOMPurify」を実行し、不正なタグや属性を完全に除去した上で安全にプレビューを描画しています。</p>
                </div>
              )}
            </div>
            {/* ★ 修正: textareaにclassNameを追加 */}
            <textarea 
              placeholder={"# 見出し1\n- リスト1"} 
              onChange={updatePreview}
              value={mdInput}
              className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div 
              className="result-area mt-4 p-4 border rounded-md bg-gray-50 min-h-12.5"
              id="mdPreview"
              dangerouslySetInnerHTML={{ __html: mdPreview }}
            ></div>
          </div>
        </section>

        {/* ... (Microservices Architectureセクション以降は変更なし) ... */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Microservices Architecture</h2>
          <div className="mb-10 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow-sm flex gap-3 items-start">
            <span className="text-xl leading-none mt-0.5">💡</span>
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="font-bold text-gray-900 mb-1">
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
          <div className="lab-card" style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            marginBottom: '40px'
          }}>
            <h3 style={{ marginBottom: '16px' }}>Go Demo</h3>
            <p>外部サーバー(Render)で独立して稼働しているGo言語のAPIと通信し、ステータスを取得します。<br/>（マイクロサービス・アーキテクチャの証明）</p>
            <GoDemo />
          </div>
          
          <div className="lab-card" style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            marginBottom: '40px'
          }}>
            <h3 style={{ marginBottom: '16px' }}>C# (.NET) Microservice Demo</h3>
            <p>Dockerコンテナ上で稼働するC# (ASP.NET Core) のAPIと通信します。<br/>堅牢なエンタープライズ技術とモダンフロントエンドの融合を証明します。</p>
            <CSharpDemo />
          </div>
        </section>

        {/* ロードマップ・セクション */}
        <section className="mt-12 p-6 bg-gray-50 border-l-4 border-yellow-500 rounded shadow-sm mb-16">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🚧</span> Project Roadmap (現在進行中のミッション)
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="line-through text-gray-400">Phase 1: Next.js (App Router) への完全移行</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="line-through text-gray-400">Phase 2: Go & C# (Docker) によるマルチAPI連携</span>
            </li>
            <li className="flex items-center gap-2 font-bold text-blue-600 bg-blue-50 p-2 rounded">
              <span className="animate-pulse">▶</span>
              Phase 3: AWS RDS (PostgreSQL) データベース構築と連携
            </li>
            <li className="flex items-center gap-2 text-gray-500">
              <span>⏳</span>
              Phase 4: AWS DynamoDB (NoSQL) の導入とポリグロット永続化の実現
            </li>
          </ul>
        </section>
    </>
  );
}