'use client';

import { useState } from 'react';

// APIレスポンスの型定義
interface StatusData {
  message: string;
  status: string;
  language: string;
  timestamp: string;
}

interface SpeedTestResult {
  serialExecutionTime: string;
  parallelExecutionTime: string;
  taskCount: number;
  taskDuration: string;
  message: string;
}

export default function GoDemo() {
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState('');

  // ★ 追加: スピードテスト用の新しいState
  const [speedResult, setSpeedResult] = useState<SpeedTestResult | null>(null);
  const [speedLoading, setSpeedLoading] = useState(false);
  const [speedError, setSpeedError] = useState('');

  const fetchGoStatus = async () => {
    setStatusLoading(true);
    setStatusError('');
    try {
      const res = await fetch('https://kuramitsu-go-api.onrender.com/api/status');
      if (!res.ok) throw new Error('APIの取得に失敗しました');
      const json: StatusData = await res.json();
      setStatusData(json);
    } catch (err: any) {
      setStatusError(err.message);
    } finally {
      setStatusLoading(false);
    }
  };

  // ★ 追加: スピードテスト実行用の新しい関数
  const fetchSpeedTest = async () => {
    setSpeedLoading(true);
    setSpeedError('');
    setSpeedResult(null); // 前回の結果をクリア
    try {
      const res = await fetch('https://yayokichi-go-api.onrender.com/api/speed-test');
      if (!res.ok) throw new Error('スピードテストAPIの実行に失敗しました');
      const json: SpeedTestResult = await res.json();
      setSpeedResult(json);
    } catch (err: any) {
      setSpeedError(err.message);
    } finally {
      setSpeedLoading(false);
    }
  };

  return (
    <div>
      {/* --- 既存のステータス確認エリア --- */}
      <button 
        onClick={fetchGoStatus} 
        disabled={statusLoading}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {statusLoading ? '通信中...' : 'Go APIからステータスを取得'}
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
        {!statusData && !statusError && <p>ボタンを押してGoサーバーからステータスを取得します。</p>}
      </div>

      {/* ★★★ ここからが新しく追加するスピードテストのエリア ★★★ */}
      <div style={{ marginTop: '32px', borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
        <h4 style={{ marginTop: 0, marginBottom: '16px', fontSize: '1.1rem', fontWeight: '600' }}>Goroutine 並行処理スピードテスト</h4>
        <p style={{ marginBottom: '16px' }}>Go言語の強みである「Goroutine」による並行処理の速さを実演します。<br/>意図的に遅延させた処理を「直列」と「並列」で実行し、その差を比較します。</p>
        <button 
          onClick={fetchSpeedTest} 
          disabled={speedLoading}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {speedLoading ? '計測中...' : 'スピードテスト実行'}
        </button>

        <div className="result-area" style={{ marginTop: '15px' }}>
          {speedLoading && <p>サーバー側で処理を実行しています... (約3秒かかります)</p>}
          {speedError && <p style={{ color: 'red' }}>Error: {speedError}</p>}
          
          {speedResult && (
            <div style={{
              padding: '16px', backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb', borderRadius: '6px',
            }}>
              <p style={{ margin: '0 0 12px 0', paddingBottom: '8px', borderBottom: '1px dashed #ccc' }}>
                <strong>実行概要:</strong> {speedResult.message}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#6b7280' }}>🐌 直列実行 (1つずつ処理)</p>
                  <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>
                    {speedResult.serialExecutionTime}
                  </p>
                </div>
                <div>
                  <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#6b7280' }}>🚀 並行実行 (Goroutine)</p>
                  <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>
                    {speedResult.parallelExecutionTime}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}