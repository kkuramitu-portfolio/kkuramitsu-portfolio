// src/app/api/check/route.ts

import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

// GETリクエストを処理する関数を定義します
export async function GET(request: Request) {
  try {
    // リクエストURLからクエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');

    // urlパラメータがなければエラーを返す
    if (!targetUrl) {
      return NextResponse.json({ error: 'URLパラメータが必要です' }, { status: 400 });
    }

    // 外部サイトにリクエストを送信
    const response = await fetch(targetUrl, {
      headers: {
        // 一部のサイトはブラウザからのアクセスでないと拒否するため、User-Agentを偽装する
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`外部サイトへのアクセスに失敗しました: ${response.statusText}`);
    }

    // レスポンスのHTMLをテキストとして取得
    const htmlText = await response.text();

    // cheerioでHTMLを解析できるようにロード
    const $ = cheerio.load(htmlText);

    // titleタグとmeta descriptionタグを取得
    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content') || '概要が見つかりませんでした。';

    // 結果をJSON形式で返す
    return NextResponse.json({ title, description });

  } catch (error) {
    // エラーハンドリング
    const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました。';
    // サーバー側のコンソールにもエラーを出力しておくとデバッグに便利
    console.error('[API Check Error]', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}