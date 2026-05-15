'use client';

import { useState, useEffect } from 'react';

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
  const CSHARP_API_BASE_URL = 'https://yayokichi-csharp-api.onrender.com';

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
      {/* --- 1. 既存のステータス確認エリア --- */}
      <button 
        onClick={fetchCSharpStatus} 
        disabled={statusLoading}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {statusLoading ? '通信中...' : 'C# APIからステータスを取得'}
      </button>
      <div className="result-area" style={{ marginTop: '15px' }}>
        {statusError && <p style={{ color: 'red' }}>Error: {statusError}</p>}
        {statusData && (
          <div style={{
            padding: '16px', backgroundColor: '#111827', border: '1px solid #374151',
            borderRadius: '6px', fontFamily: '"Consolas", "Monaco", monospace',
            fontSize: '14px', color: '#4ade80', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
          }}>
            <p><span style={{ color: '#9ca3af' }}>Message:</span> {statusData.message}</p>
            <p><span style={{ color: '#9ca3af' }}>Status:</span> {statusData.status}</p>
            <p><span style={{ color: '#9ca3af' }}>Language:</span> {statusData.language}</p>
            <p><span style={{ color: '#9ca3af' }}>Timestamp:</span> {statusData.timestamp}</p>
          </div>
        )}
      </div>

      {/* --- 2. 新しいLINQデモのエリア --- */}
      <div style={{ marginTop: '32px', borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
        <h4 style={{ marginTop: 0, marginBottom: '16px', fontSize: '1.1rem', fontWeight: '600' }}>LINQによるデータフィルタリング</h4>
        <p style={{ marginBottom: '16px' }}>
          C#の強力なデータ操作機能「LINQ」のデモです。サーバーのメモリ上にある商品リストに対し、以下の条件でフィルタリングと並び替えを動的に行います。
        </p>
        <div style={{ 
          display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px', 
          backgroundColor: '#f9fafb', borderRadius: '8px', marginBottom: '24px' 
        }}>
          {/* ... (コントロールパネルのUIは前回のまま) ... */}
          <div>
            <label htmlFor="category-select" style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>カテゴリ絞り込み:</label>
            <select id="category-select" value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border border-gray-300 rounded-md">
              <option value="All">すべて</option>
              <option value="書籍">書籍</option>
              <option value="家電">家電</option>
              <option value="キッチン用品">キッチン用品</option>
              <option value="家具">家具</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>並び替え:</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border border-gray-300 rounded-md">
                <option value="price">価格</option>
                <option value="name">商品名</option>
              </select>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="p-2 border border-gray-300 rounded-md">
                <option value="asc">安い順 / 昇順</option>
                <option value="desc">高い順 / 降順</option>
              </select>
            </div>
          </div>
        </div>
        <div className="result-area">
          {productsLoading && <p>読み込み中...</p>}
          {productsError && <p style={{ color: 'red' }}>Error: {productsError}</p>}
          {!productsLoading && !productsError && (
            products.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
                    <th style={{ padding: '8px' }}>商品名</th>
                    <th style={{ padding: '8px' }}>カテゴリ</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>価格</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '8px' }}>{p.name}</td>
                      <td style={{ padding: '8px' }}><span style={{ backgroundColor: '#eef2ff', color: '#4f46e5', padding: '2px 6px', borderRadius: '12px', fontSize: '0.8rem' }}>{p.category}</span></td>
                      <td style={{ padding: '8px', textAlign: 'right', fontFamily: 'monospace' }}>¥{p.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p>該当する商品が見つかりませんでした。</p>
          )}
        </div>
      </div>
    </div>
  );
}