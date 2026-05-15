// src/app/api/bbs-proxy/route.ts

import { NextResponse } from 'next/server';

const PHP_BBS_URL = process.env.PHP_SERVER_URL; 

export async function GET() {
  // 環境変数が設定されていない場合、エラーを返して処理を中断する
  if (!PHP_BBS_URL) {
    return NextResponse.json(
      { error: 'API URL is not configured in environment variables.' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(PHP_BBS_URL, { cache: 'no-store' });
    if (!response.ok) return NextResponse.json({ error: 'PHP GET Error' }, { status: 500 });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '取得失敗' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!PHP_BBS_URL) {
    return NextResponse.json(
      { error: 'API URL is not configured in environment variables.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { message } = body;

    const formData = new URLSearchParams();
    formData.append('message', message);

    console.log('--- PHP送信テスト開始 ---');
    console.log('送信メッセージ:', message);

    const response = await fetch(PHP_BBS_URL, { // ここで環境変数から読み込んだURLが使われる
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
      redirect: 'follow',
    });

    // 重要：json() ではなく、まずは text() で生データを受け取る
    const rawResponse = await response.text();
    
    console.log('PHPステータスコード:', response.status);
    console.log('PHPからの生の応答内容:', rawResponse || "(空っぽでした)");
    console.log('--- PHP送信テスト終了 ---');

    // 応答が空でも、ステータスが 200〜299 なら成功とみなす
    if (response.ok) {
      // PHPがJSONを返してきている場合はそれをパースして返す
      try {
        const jsonData = JSON.parse(rawResponse);
        return NextResponse.json(jsonData);
      } catch {
        // JSONでなければ、成功フラグだけ返す
        return NextResponse.json({ success: true, message: '書き込み処理完了' });
      }
    } else {
      throw new Error(`PHP Error: ${response.status}`);
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '不明なエラー';
    console.error('[API BBS-Proxy POST Error]', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!PHP_BBS_URL) {
    return NextResponse.json({ error: 'API URL is not configured.' }, { status: 500 });
  }
  try {
    const body = await request.json();
    const { id } = body; // 削除対象のIDを取得

    const response = await fetch(PHP_BBS_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }), // IDをJSON形式でPHPに送信
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete message.');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}