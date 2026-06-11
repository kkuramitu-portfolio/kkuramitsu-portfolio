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

  // スピードテスト用のState
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
      {/* 修正: アコーディオンをdetailsタグに統一し、アニメーションを追加 */}
      <details className="mb-6 border-t border-slate-100 pt-4 group">
        <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer w-full text-left font-bold text-slate-700 p-2 hover:bg-slate-50 rounded transition-colors flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 select-none">
          <span className="inline-block transition-transform duration-200 group-open:rotate-90 mr-2">▶</span>
          この機能の技術的なポイントについて
        </summary>
        <div className="p-4 bg-slate-50 rounded-md mt-2 text-xs text-slate-600 space-y-3 border border-slate-200">
          <p><strong>ロバストな並行処理:</strong> Goの並行処理で頻発する「レースコンディション」や「処理の終了待ち漏れ」を防ぐため、標準ライブラリの <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">sync.WaitGroup</code> を使用しています。これにより、全てのGoroutine（軽量スレッド）が完了したことを確実に保証してからレスポンスを返す、安全で信頼性の高い並行処理を実装しています。</p>
          <p><strong>リソース管理:</strong> 各Goroutineは自己完結したタスクを実行し、完了後には確実にリソースを解放（<code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">wg.Done()</code>）するため、Goroutineリーク（処理が終了せず残り続ける問題）の発生を防いでいます。</p>
        </div>
      </details>

      <button 
        onClick={fetchGoStatus} 
        disabled={statusLoading}
        className="px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-md hover:bg-blue-700 disabled:bg-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
      >
        {statusLoading ? '通信中...' : 'Go APIからステータスを取得'}
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
        {!statusData && !statusError && <p className="text-sm text-slate-500 mt-2">ボタンを押してGoサーバーからステータスを取得します。</p>}
      </div>

      {/* スピードテストのエリア */}
      <div className="mt-8 border-t border-slate-200 pt-6">
        <h4 className="text-lg font-bold text-slate-800 mb-3">Goroutine 並行処理スピードテスト</h4>
        <p className="mb-4 text-slate-600 text-sm leading-relaxed">
          Go言語の強みである「Goroutine」による並行処理の速さを実演します。<br/>
          意図的に遅延させた処理を「直列」と「並列」で実行し、その差を比較します。
        </p>
        <button 
          onClick={fetchSpeedTest} 
          disabled={speedLoading}
          className="px-6 py-3 bg-green-600 text-white text-sm font-bold rounded-md hover:bg-green-700 disabled:bg-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 whitespace-nowrap"
        >
          {speedLoading ? '計測中...' : 'スピードテスト実行'}
        </button>

        <div className="mt-4">
          {speedLoading && <p className="text-sm text-slate-500">サーバー側で処理を実行しています... (約3秒かかります)</p>}
          {speedError && <p className="text-red-600 text-sm">Error: {speedError}</p>}
          
          {speedResult && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-md">
              <p className="m-0 mb-3 pb-2 border-b border-dashed border-slate-300 text-sm text-slate-800">
                <strong>実行概要:</strong> {speedResult.message}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="m-0 mb-1 text-xs text-slate-500">🐌 直列実行 (1つずつ処理)</p>
                  <p className="m-0 text-2xl font-bold text-red-500">
                    {speedResult.serialExecutionTime}
                  </p>
                </div>
                <div>
                  <p className="m-0 mb-1 text-xs text-slate-500">🚀 並行実行 (Goroutine)</p>
                  <p className="m-0 text-2xl font-bold text-green-500">
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