'use client';

import { useState, useEffect } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';

// 型定義
interface StatusData {
  message: string;
  status: string;
  language: string;
  timestamp: string;
}
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

export default function CSharpDemo() {
  // --- ステータス確認用のState ---
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState('');

  // --- LINQデモ用のState ---
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true); // 初回はtrue
  const [productsError, setProductsError] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');

  // ★★★【重要】★★★
  // 必ずご自身のC# APIのベースURLに書き換えてください！
  const CSHARP_API_BASE_URL = 'https://kuramitsu-csharp-api.onrender.com';

  // --- API呼び出し関数 ---
  const fetchCSharpStatus = async () => {
    setStatusLoading(true);
    setStatusError('');
    try {
      const res = await fetch(`${CSHARP_API_BASE_URL}/api/status`);
      if (!res.ok) throw new Error('ステータスAPIの取得に失敗しました');
      const json: StatusData = await res.json();
      setStatusData(json);
    } catch (err: any) {
      setStatusError(err.message);
    } finally {
      setStatusLoading(false);
    }
  };

  const fetchProducts = async () => {
    setProductsLoading(true);
    setProductsError('');
    try {
      const params = new URLSearchParams({ category, sortBy, sortOrder });
      const res = await fetch(`${CSHARP_API_BASE_URL}/api/products?${params.toString()}`);
      if (!res.ok) throw new Error('商品APIの取得に失敗しました');
      const json: Product[] = await res.json();
      setProducts(json);
    } catch (err: any) {
      setProductsError(err.message);
    } finally {
      setProductsLoading(false);
    }
  };

  // LINQデモは、検索条件が変わるたびに自動でデータを再取得
  useEffect(() => {
    fetchProducts();
  }, [category, sortBy, sortOrder]);

  return (
    <div>
      {/* 修正: アコーディオンをdetailsタグに統一し、アニメーションを追加 */}
      <details className="mb-6 border-t border-slate-100 pt-4 group">
        <summary data-accordion-name="C# Demo: セキュリティ対策" className="list-none [&::-webkit-details-marker]:hidden cursor-pointer w-full text-left font-bold text-slate-700 p-2 hover:bg-slate-50 rounded transition-colors flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 select-none">
          <span className="inline-block transition-transform duration-200 group-open:rotate-90 mr-2">▶</span>
          この機能のセキュリティ対策について
        </summary>
        <div className="p-4 bg-slate-50 rounded-md mt-2 text-xs text-slate-600 space-y-3 border border-slate-200">
          <p><strong>SQLインジェクション対策:</strong> このデモはデータベースを使用せず、サーバーのメモリ上にあるデータをLINQで操作しているため、SQLインジェクション攻撃の危険性は原理的にありません。これにより、LINQがインメモリデータに対して型安全なクエリを実行できることを示しています。</p>
          <p><strong>入力値の検証:</strong> フロントエンドから送られてくる並び替えのキー（<code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">sortBy</code>）は、サーバーサイドの <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">switch</code> 文で検証しています。<code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">&quot;price&quot;</code> や <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">&quot;name&quot;</code> など、意図した値以外が指定された場合はデフォルトの並び順が適用されるため、予期せぬ列でのソートやエラーの発生を防ぐ「ホワイトリスト方式」の入力値検証を実装しています。</p>
        </div>
      </details>

      <button 
        onClick={fetchCSharpStatus} 
        disabled={statusLoading}
        className="px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-md hover:bg-blue-700 disabled:bg-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
      >
        {statusLoading ? '通信中...' : 'C# APIからステータスを取得'}
      </button>
      
      <div className="mt-4">
        {statusError && <p className="text-red-600 text-sm">Error: {statusError}</p>}
        {statusData && (
          <div className="p-4 bg-slate-900 border border-slate-700 rounded-md font-mono text-sm text-green-400 shadow-inner">
            <p><span className="text-slate-400">Message:</span> {statusData.message}</p>
            <p><span className="text-slate-400">Status:</span> {statusData.status}</p>
            <p><span className="text-slate-400">Language:</span> {statusData.language}</p>
            <p><span className="text-slate-400">Timestamp:</span> {statusData.timestamp}</p>
          </div>
        )}
      </div>

      {/* --- 2. 新しいLINQデモのエリア --- */}
      <div className="mt-8 border-t border-slate-200 pt-6">
        <h4 className="text-lg font-bold text-slate-800 mb-3">LINQによるデータフィルタリング</h4>
        <p className="mb-4 text-slate-600 text-sm leading-relaxed">
          C#の強力なデータ操作機能「LINQ」のデモです。サーバーのメモリ上にある商品リストに対し、以下の条件でフィルタリングと並び替えを動的に行います。
        </p>
        
        <div className="flex flex-wrap gap-4 p-4 bg-slate-50 border border-slate-200 rounded-md mb-6">
          <div>
            <label htmlFor="category-select" className="block text-sm text-slate-700 mb-1">カテゴリ絞り込み:</label>
            <select id="category-select" value={category} onChange={(e) => {setCategory(e.target.value);sendGTMEvent({ event: 'change_linq_filter', filter_type: 'category', filter_value: e.target.value });}} className="p-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="All">すべて</option>
              <option value="書籍">書籍</option>
              <option value="家電">家電</option>
              <option value="キッチン用品">キッチン用品</option>
              <option value="家具">家具</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">並び替え:</label>
            <div className="flex gap-2">
              <select value={sortBy} onChange={(e) => {setSortBy(e.target.value);sendGTMEvent({ event: 'change_linq_filter', filter_type: 'sortBy', filter_value: e.target.value });}} className="p-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="price">価格</option>
                <option value="name">商品名</option>
              </select>
              <select value={sortOrder} onChange={(e) => {setSortOrder(e.target.value);sendGTMEvent({ event: 'change_linq_filter', filter_type: 'sortOrder', filter_value: e.target.value });}} className="p-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="asc">安い順 / 昇順</option>
                <option value="desc">高い順 / 降順</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {productsLoading && <p className="text-sm text-slate-500">読み込み中...</p>}
          {productsError && <p className="text-red-600 text-sm">Error: {productsError}</p>}
          {!productsLoading && !productsError && (
            products.length > 0 ? (
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-left text-slate-700">
                    <th className="p-2">商品名</th>
                    <th className="p-2">カテゴリ</th>
                    <th className="p-2 text-right">価格</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-2 text-slate-800">{p.name}</td>
                      <td className="p-2">
                        <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full text-xs font-medium border border-indigo-100">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-2 text-right font-mono text-slate-700">¥{p.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p className="text-sm text-slate-500">該当する商品が見つかりませんでした。</p>
          )}
        </div>
      </div>
    </div>
  );
}