"use client";
import React from "react";

type Section = {
  title: string;
  items?: string[];
  content?: React.ReactNode;   // ← React. を付けました
  fullWidth?: boolean;
};

type Accordion = {
  title: string;
  content: React.ReactNode;    // ← React. を付けました
};

type Project = {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  summary: string;
  sections: Section[];
  accordions: Accordion[];
};

const projects = [
  {
    id: "sql-migration",
    title: "1. SQLデータ移行プロジェクト",
    badge: "実務課題解決事例",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    summary: "Lotus Notesから業務管理システムへのデータ移行プロジェクトにおいて、移行作業の再設計から検証、本番移行までを担当しました。移行対象は2万件以上の業務データで、グループ会社名・部署名・取引先企業名などの表記揺れや、システム固有のID変換が必要な複雑な案件でした。当初はExcelや既存のデータ取り込みツールを中心とした運用で進められていましたが、データ不整合や変換ミスが多数発生していたため、SQLを用いた移行プロセスへ全面的に見直しを行いました。",
    sections: [
      { 
        title: "背景・課題", 
        fullWidth: true,
        content: (
          <div className="space-y-3 text-sm text-slate-700">
            <ul className="list-disc list-outside ml-4 space-y-1.5">
              <li className="pl-1">Lotus Notesから新システムへの移行案件</li>
              <li className="pl-1">データ件数は2万5000件以上</li>
              <li className="pl-1">グループ会社名、部署名、取引先企業名などに大量の表記揺れが存在</li>
              <li className="pl-1">ステータスや関連情報を新システム用のIDへ変換する必要があった</li>
              <li className="pl-1">既存担当者が退職し、移行作業の継続が困難な状態だった</li>
            </ul>
            <p className="font-bold text-slate-800 pt-2">さらに調査の結果、以下の問題が判明：</p>
            <ul className="list-disc list-outside ml-4 space-y-1.5">
              <li className="pl-1">CSVをExcelで開いたことによるデータ破損</li>
              <li className="pl-1">VLOOKUPによる不完全な名寄せ</li>
              <li className="pl-1">NULLデータの大量発生</li>
              <li className="pl-1">SQL実行ミスによる特定データの消失</li>
            </ul>
          </div>
        )
      },
      {
        title: "実施内容",
        fullWidth: true,
        content: (
          <div className="space-y-3 text-sm text-slate-700">
            <p className="leading-relaxed">
              まず既存の移行手順を調査し、問題点と影響範囲を整理したレポートを作成してクライアントへ報告しました。その上で、移行プロセスをSQL中心へ再設計しました。
            </p>
            <p className="font-bold text-slate-800 pt-2">移行フロー：</p>
            <ol className="list-decimal list-outside ml-4 space-y-1.5">
              <li className="pl-1">CSVデータをそのまま格納する取込テーブルを作成</li>
              <li className="pl-1">名寄せ・ID変換用のマッピングテーブルを作成</li>
              <li className="pl-1">マッピング情報を利用して変換テーブルを生成</li>
              <li className="pl-1">本番テーブルへデータを投入</li>
              <li className="pl-1">元データと本番データをSQLで照合し整合性を確認</li>
            </ol>
            <p className="leading-relaxed pt-2">
              移行前にクライアントへ計画内容を共有し、承認を得たうえでテスト移行と検証を繰り返し実施しました。
            </p>
          </div>
        )
      },
      { 
        title: "成果", 
        fullWidth: true,
        items: [
          "2万件以上のデータ移行を完遂",
          "表記揺れやID変換を含む複雑なデータ移行を実現",
          "移行後のデータ整合性100%を達成（クライアント評価）",
          "再利用可能な移行手順を確立"
        ] 
      },
      { 
        title: "学んだこと", 
        fullWidth: true,
        content: (
          <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-2">
            <li className="leading-relaxed pl-1">
              データ取り込み工程における品質管理の重要性
              <ul className="list-[circle] list-outside ml-5 mt-1.5 space-y-1 text-slate-600">
                <li className="leading-relaxed pl-1">Excelの自動変換機能による意図しないデータ変換リスクを経験</li>
                <li className="leading-relaxed pl-1">Power Queryを活用した安全なデータ取り込み手法を習得</li>
              </ul>
            </li>
            <li className="leading-relaxed pl-1">ツールに依存せず処理内容を理解することの重要性</li>
            <li className="leading-relaxed pl-1">データ品質がシステム品質に直結すること</li>
            <li className="leading-relaxed pl-1">SQLの活用範囲の広さ</li>
            <li className="leading-relaxed pl-1">クライアントとの合意形成を含めたプロジェクト推進の重要性</li>
          </ul>
        )
      }
    ],
accordions: [
      { 
        title: "使用SQL（ETLパイプラインの抜粋）", 
        content: (
          <div className="space-y-8 text-sm text-slate-700">
            <p className="leading-relaxed">
              以下のSQL群は、全工程（抽出・変換・投入・検証・整理）を自動化し、再利用可能なパイプラインとして構築した際の主要なコード抜粋です。<br />
              <span className="text-xs text-slate-500">※機密保持のため、テーブル名や特定のロジック値はダミーデータに置き換えています。</span>
            </p>

            <div>
              <h4 className="font-bold text-slate-800 mb-1">1. 生データ受入層（Staging）の作成</h4>
              <p className="text-sm text-slate-600 mb-3">インポート時の型エラーを防ぐため、Excel(CSV)の全列を文字列型として受け入れる仮テーブルを作成。</p>
              <pre className="bg-slate-800 text-slate-300 p-4 rounded-md overflow-x-auto text-xs font-mono leading-relaxed shadow-inner">
                <code>
{`CREATE TABLE raw_csv_import (
    \`asset_code\` VARCHAR(255),
    \`asset_name\` VARCHAR(255),
    \`model_number\` VARCHAR(255),
    \`purchase_price\` VARCHAR(255),  /* 記号入り文字列も許容 */
    \`registration_date\` VARCHAR(255),
    \`vendor_name_raw\` VARCHAR(255),
    \`department_raw\` VARCHAR(255),
    \`status_raw\` VARCHAR(255),
    \`remarks\` TEXT
    /* 他数十カラム... */
);`}
                </code>
              </pre>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-1">2. マッピング辞書の作成と「名寄せ」登録</h4>
              <p className="text-sm text-slate-600 mb-3">生データの表記ゆれ（スペースの有無など）を吸収するため、既存マスタからTRIM処理をかけて重複を排除（名寄せ）し、辞書テーブルへ登録。</p>
              <pre className="bg-slate-800 text-slate-300 p-4 rounded-md overflow-x-auto text-xs font-mono leading-relaxed shadow-inner">
                <code>
{`/* 辞書テーブルの定義 */
CREATE TABLE mapping_dictionary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    map_type VARCHAR(50),
    raw_value VARCHAR(255),
    mapped_id INT,
    UNIQUE KEY uniq_mapping (map_type, raw_value)
);

/* 既存マスタからの名寄せ登録（ベンダーの例） */
INSERT INTO mapping_dictionary (map_type, raw_value, mapped_id)
SELECT
    'vendor',
    TRIM(v1.old_name) AS clean_raw_value,
    MIN(v2.id) AS mapped_id
FROM m_vendors AS v1
JOIN (
    /* 正式名称でグループ化し、生かすべき最小IDを特定 */
    SELECT name, MIN(id) AS id FROM m_vendors GROUP BY name
) AS v2 ON v1.name = v2.name
WHERE v1.old_name IS NOT NULL AND v1.old_name != ''
GROUP BY TRIM(v1.old_name); /* TRIM後の文字列で重複をまとめる */`}
                </code>
              </pre>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-1">3. データ変換（Transform）とクレンジング</h4>
              <p className="text-sm text-slate-600 mb-3">生データと辞書を結合し、本番環境向けの変換テーブルを作成。複数カラムに依存する例外ルールや、ノイズ除去の正規表現を適用。</p>
              <pre className="bg-slate-800 text-slate-300 p-4 rounded-md overflow-x-auto text-xs font-mono leading-relaxed shadow-inner">
                <code>
{`CREATE TABLE transformed_data AS
SELECT
    TRIM(e.\`asset_code\`) AS code,
    TRIM(e.\`asset_name\`) AS name,
    
    /* ▼ 金額クレンジング（￥, カンマ, バックスラッシュ等を除去し、数値のみ抽出） */
    (CASE 
        WHEN TRIM(REPLACE(REPLACE(REPLACE(e.\`purchase_price\`, '\\\\', ''), '¥', ''), ',', '')) REGEXP '^[0-9\\\\.]+$' 
        THEN CAST(TRIM(REPLACE(REPLACE(REPLACE(e.\`purchase_price\`, '\\\\', ''), '¥', ''), ',', '')) AS DECIMAL(12,2)) 
        ELSE NULL 
    END) AS purchase_price,

    /* ▼ 複数カラムに依存する例外業務ロジックの適用 */
    (CASE
        WHEN TRIM(e.\`vendor_name_raw\`) = '特定複合ベンダー名' AND TRIM(e.\`department_raw\`) LIKE '%部門A%' THEN 1
        WHEN TRIM(e.\`vendor_name_raw\`) = '特定複合ベンダー名' AND TRIM(e.\`department_raw\`) LIKE '%部門B%' THEN 2
        ELSE dm_vendor.mapped_id 
    END) AS vendor_id,

    /* ▼ 重複排除（最新の有効データのみフラグを立てる） */
    (CASE WHEN e.rn = 1 THEN 1 ELSE 0 END) AS valid_flg,
    (CASE WHEN e.rn = 1 THEN 0 ELSE 1 END) AS delete_flg

FROM (
    /* 同一管理番号における最新履歴の特定 */
    SELECT *, ROW_NUMBER() OVER(PARTITION BY \`asset_code\` ORDER BY \`document_id\` DESC) as rn
    FROM raw_csv_import
) AS e
LEFT JOIN mapping_dictionary dm_vendor 
       ON dm_vendor.map_type = 'vendor' AND dm_vendor.raw_value = TRIM(e.\`vendor_name_raw\`);`}
                </code>
              </pre>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-1">4. 本番テーブルへの投入（Load）</h4>
              <p className="text-sm text-slate-600 mb-3">クレンジング済みのデータを本番テーブルのスキーマに合わせて投入。作成日時・更新日時を同期させる。</p>
              <pre className="bg-slate-800 text-slate-300 p-4 rounded-md overflow-x-auto text-xs font-mono leading-relaxed shadow-inner">
                <code>
{`INSERT INTO m_assets (
    code, name, purchase_price, vendor_id, valid_flg, delete_flg,
    created, creator, modified, modifier
)
SELECT
    code, name, purchase_price, vendor_id, valid_flg, delete_flg,
    NOW(), 'migration_sys', NOW(), 'migration_sys'
FROM transformed_data;`}
                </code>
              </pre>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-1">5. 自動差分検知SQL（整合性テスト）</h4>
              <p className="text-sm text-slate-600 mb-3">目視確認を排除するため、「元の生データ」と「投入後の本番データ」を結合し、不一致項目を自動抽出するテストSQL。</p>
              <pre className="bg-slate-800 text-slate-300 p-4 rounded-md overflow-x-auto text-xs font-mono leading-relaxed shadow-inner">
                <code>
{`SELECT
    test.id AS test_table_id,
    e.\`asset_code\` AS code,
    CASE 
        WHEN test.id IS NULL THEN 'CRITICAL: レコード欠落'
        ELSE CONCAT_WS(', ',
            /* 変換ロジックを再適用し、<=> 演算子でNULL含め完全一致か検証 */
            IF(NOT (TRIM(e.\`asset_name\`) <=> test.name), 'name', NULL),
            IF(NOT (dm_vendor.mapped_id <=> test.vendor_id), 'vendor_id', NULL),
            IF(NOT (
                (CASE 
                    WHEN TRIM(REPLACE(REPLACE(REPLACE(e.\`purchase_price\`, '\\\\', ''), '¥', ''), ',', '')) REGEXP '^[0-9\\\\.]+$' 
                    THEN CAST(TRIM(REPLACE(REPLACE(REPLACE(e.\`purchase_price\`, '\\\\', ''), '¥', ''), ',', '')) AS DECIMAL(12,2)) 
                    ELSE NULL 
                END) <=> test.purchase_price
            ), 'purchase_price', NULL)
        )
    END AS mismatched_columns
FROM raw_csv_import AS e
LEFT JOIN mapping_dictionary dm_vendor ON dm_vendor.raw_value = TRIM(e.\`vendor_name_raw\`)
LEFT JOIN m_assets AS test ON TRIM(e.\`asset_code\`) = test.code AND test.delete_flg = 0
WHERE e.rn = 1 
HAVING mismatched_columns != ''; /* 不一致が空（完全一致）以外のものを抽出 */`}
                </code>
              </pre>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-1">6. マスタデータの重複整理（論理削除処理）</h4>
              <p className="text-sm text-slate-600 mb-3">移行完了後、アプリケーションUIのプルダウン等に重複した選択肢が表示されるのを防ぐため、名寄せで選ばれなかった旧マスタレコードを論理削除。</p>
              <pre className="bg-slate-800 text-slate-300 p-4 rounded-md overflow-x-auto text-xs font-mono leading-relaxed shadow-inner">
                <code>
{`UPDATE m_vendors AS v1
JOIN (
    /* 生かすべき「最小ID」を特定 */
    SELECT name, MIN(id) AS min_id
    FROM m_vendors
    WHERE delete_flg = 0
    GROUP BY name
) AS keeper ON v1.name = keeper.name
SET
    v1.delete_flg = 1,
    v1.modified = NOW(),
    v1.modifier = 'migration_cleanup'
WHERE
    v1.id > keeper.min_id /* 最小IDより大きい（＝重複）レコードのみ無効化 */
    AND v1.delete_flg = 0;`}
                </code>
              </pre>
            </div>
          </div>
        )
      },
      { 
        title: "詳細を見る", 
        content: (
          <div className="space-y-6 text-sm text-slate-700">
            {/* プロジェクト概要 */}
            <div>
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">プロジェクト概要</h4>
              <p className="leading-relaxed">
                約2万4,000件の未整理なExcel（CSV）生データを、正規化されたリレーショナルデータベース（RDB）の本番テーブルへ移行するETLプロジェクト。<br />
                データ内の表記ゆれ、フォーマットの不整合、複雑な業務ルールの紐解きから、自動化された差分検知テストまでをワンオペレーションで完遂しました。
              </p>
            </div>
            
            {/* 直面した課題 */}
            <div>
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">直面した課題</h4>
              <ul className="list-disc list-outside ml-4 space-y-2">
                <li className="pl-1"><span className="font-bold text-slate-800">データの表記ゆれと重複:</span> スペースの有無（全角/半角）や、旧社名・略称が混在しており、そのままではマスタデータと紐付けられない状態。</li>
                <li className="pl-1"><span className="font-bold text-slate-800">複雑な業務ルールの存在:</span> 単純な1対1の変換ではなく、「A社のB部門の時だけはIDを書き換える」「Cという条件を満たす場合は内部処理扱いとする」といった複合条件ロジックの再現が必要。</li>
                <li className="pl-1"><span className="font-bold text-slate-800">データ型の不整合:</span> 数値カラムに「￥」「,（カンマ）」「\（バックスラッシュ）」「エラー文字列」が混入しており、型変換エラーが多発する状態。</li>
              </ul>
            </div>

            {/* 解決アプローチ */}
            <div>
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-3">解決アプローチ（5つのフェーズ）</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-800">1. 生データ受入層（Staging）の構築</p>
                  <p className="leading-relaxed mt-1">インポート時のエラーを防ぐため、全カラムを文字列型（<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">VARCHAR/TEXT</code>）で定義した仮テーブルを作成。CSVデータを無加工で取り込み、元の状態を安全に保持しました。</p>
                </div>
                <div>
                  <p className="font-bold text-slate-800">2. マスタデータの整備と「名寄せ」の実施</p>
                  <p className="leading-relaxed mt-1">生データから一意の名称を抽出し、既存マスタとの差分をSQLで洗い出し。<br />スペースの有無などによる重複データに対し、<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">TRIM()</code>と<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">GROUP BY</code>を用いた「名寄せ」を実行。最も古いID（<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">MIN(id)</code>）を正と定義し、不要な重複レコードは <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">delete_flg = 1</code> として論理削除することで、アプリケーション側の選択肢をクリーンに保ちました。</p>
                </div>
                <div>
                  <p className="font-bold text-slate-800">3. マッピング辞書（変換ルールテーブル）の作成</p>
                  <p className="leading-relaxed mt-1">生データの文字列と、本番マスタのIDを紐づける「辞書テーブル」を動的に構築。これにより、変換処理時のパフォーマンス向上とロジックの単純化を実現しました。</p>
                </div>
                <div>
                  <p className="font-bold text-slate-800">4. データ変換（Transform）とクレンジング処理</p>
                  <p className="leading-relaxed mt-1">辞書テーブルとの <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">LEFT JOIN</code> を用いてIDを変換。<br />金額データ等のノイズ（特定の記号や文字コード）を <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">REPLACE()</code> で除去し、正規表現（<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">REGEXP</code>）で数値のみを抽出・キャストする堅牢なクレンジングを実装。<br />単一の辞書で解決できない「複数カラムに依存する例外ルール」は、SQL内の複雑な <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">CASE</code> 文を用いて正確に業務ロジックを再現しました。</p>
                </div>
                <div>
                  <p className="font-bold text-slate-800">5. 自動差分検知SQLによる「品質100%」の保証</p>
                  <p className="leading-relaxed mt-1">目視確認のヒューマンエラーを排除するため、「変換前の生データ」と「変換後のテストテーブル」を直接比較する検証用SQLを構築。<br /><code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">IF(NOT (... &lt;=&gt; ...))</code> を用いて、不一致が発生したカラム名のみを抽出する仕組みを作成し、数十項目のバリデーションを瞬時に実行。差分が「0件」になるまでロジックを修正し、移行データの品質を機械的に100%保証しました。</p>
                </div>
                <div>
                  <p className="font-bold text-slate-800">6. マスタデータの重複整理とUI最適化（クリーンアップ）</p>
                  <p className="leading-relaxed mt-1">移行完了後、アプリケーションのUI（プルダウンメニュー等）に同一名称の選択肢が複数表示されてしまうことを防ぐため、マスタデータの最終クリーンアップを実施しました。同じ正式名称を持つ重複レコード群の中から、名寄せ時に「正」と定めた最小ID以外のレコードをSQLで特定して一括で論理削除（無効化）し、ユーザーの操作性向上と運用後のデータ品質を担保しました。</p>
                </div>
              </div>
            </div>

            {/* 成果 */}
            <div>
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">成果</h4>
              <p className="leading-relaxed">
                手戻りやデータ損失を防ぐ堅牢なSQL設計により、膨大なデータクレンジングと移行作業を期間内（残業ゼロ）で達成。次回以降も再利用可能な安全な移行パイプラインを確立しました。
              </p>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "web-scraper",
    title: "2. Webサイト情報チェッカー",
    badge: "個人開発",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    summary: "Pythonで一般的に行われるスクレイピング処理を、あえてNext.jsのAPI RoutesとNode.js環境で再現したシステムです。指定したWebサイトの情報をサーバーサイドで取得し、タイトルや概要を抽出します。",
    sections: [
      { 
        title: "開発目的", 
        fullWidth: true,
        content: (
          <div className="space-y-3 text-sm text-slate-700">
            <ul className="list-disc list-outside ml-4 space-y-1.5">
              <li className="pl-1">Pythonのスクレイピングロジックを別言語（TypeScript/Node.js）で再現・比較</li>
              <li className="pl-1">Next.jsのサーバーサイド機能（API Routes）の理解</li>
            </ul>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded text-blue-800 text-xs font-bold flex items-center gap-2">
              <span>💡</span>
              <p>※Pythonを用いた実務自動化の実績については「5. Pythonによる業務準備自動化」をご参照ください。</p>
            </div>
          </div>
        )
      },
      { title: "使用技術", items: ["Next.js (API Routes)", "TypeScript", "Cheerio (PythonのBeautifulSoupに相当)", "Fetch API"] },
      { title: "工夫した点", items: ["Pythonでの実装経験を活かしたDOM解析の設計", "User-Agentの偽装によるアクセス拒否の回避", "エラーハンドリングの実装"] },
      { title: "AI活用", items: ["初期実装", "デバッグ支援", "学習支援"] },
      { title: "自分で行ったこと", items: ["要件整理", "実装内容理解", "修正", "テスト", "デプロイ"] },
      { title: "学んだこと", items: ["言語やフレームワークに依存しないスクレイピングの基礎概念", "Next.jsにおけるAPI構築とサーバーサイドでの外部通信", "DOM解析の基礎"] }
    ],
accordions: [
      { 
        title: "技術的な詳細（API Routesの実装抜粋）", 
        content: (
          <div className="space-y-4 text-sm text-slate-700">
            <p className="leading-relaxed">
              Labセクションに記載のセキュリティ対策（SSRF対策・ホワイトリスト制御）に加え、サーバーサイドのデータ取得処理では以下のような実践的な工夫を行っています。
            </p>
            <ul className="list-disc list-outside ml-4 space-y-2">
              <li className="pl-1"><span className="font-bold text-slate-800">User-Agentの偽装:</span> プログラムからの機械的なアクセスを拒否するサイトに対応するため、一般的なブラウザのUser-Agentヘッダを付与してFetchリクエストを送信しています。</li>
              <li className="pl-1"><span className="font-bold text-slate-800">CheerioによるDOM解析:</span> 取得したHTML文字列を軽量な解析ライブラリ（Cheerio）に渡し、jQueryライクな構文で効率的に目的のタグを抽出しています。</li>
            </ul>
            <pre className="bg-slate-800 text-slate-300 p-4 rounded-md overflow-x-auto text-xs font-mono leading-relaxed shadow-inner mt-4">
              <code>
{`// src/app/api/check/route.ts (一部抜粋)

// 外部サイトへリクエストを送信
const response = await fetch(targetUrl, {
  headers: {
    // ボット弾きを回避するためのUser-Agent偽装
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },
});

if (!response.ok) {
  throw new Error(\`外部サイトへのアクセスに失敗しました: \${response.statusText}\`);
}

// レスポンスのHTMLをテキストとして取得
const htmlText = await response.text();

// CheerioでHTMLを解析できるようにロード
const $ = cheerio.load(htmlText);

// titleタグとmeta descriptionタグを抽出
const title = $('title').text();
const description = $('meta[name="description"]').attr('content') || '概要が見つかりませんでした。';

// クライアントへJSON形式で返却
return NextResponse.json({ title, description });`}
              </code>
            </pre>
          </div>
        )
      }
    ]
  },
  {
    id: "microservices",
    title: "3. マイクロサービス連携デモ",
    badge: "個人開発",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    summary: "GoとC#による複数サービス間通信を検証するための学習プロジェクト。",
    sections: [
      { title: "開発目的", items: ["未経験言語の習得", "API連携の理解"] },
      { title: "使用技術", items: ["Go", "C#", "Docker", "REST API"] },
      { title: "工夫した点", items: ["異なる言語間でのデータ連携", "コンテナ環境構築"] },
      { title: "AI活用", items: ["初期コード生成", "学習支援", "デバッグ補助"] },
      { title: "自分で行ったこと", items: ["設計理解", "動作検証", "修正", "デプロイ"] },
      { title: "学んだこと", items: ["マイクロサービス設計", "API通信", "Docker運用"] }
    ],
    accordions: [
          { 
            title: "技術的な詳細（アーキテクチャと各APIの実装）", 
            content: (
              <div className="space-y-6 text-sm text-slate-700">
                {/* アーキテクチャ設計とリソース最適化 */}
                <div>
                  <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">アーキテクチャ設計とリソース最適化</h4>
                  <p className="leading-relaxed">
                    Renderの仕様上、一定時間アクセスがないとスリープ状態になるため、初回リクエスト時にコールドスタートによる遅延（10〜30秒）が発生します。<br />
                    ヘルスチェックAPIを用いたバックグラウンドでの事前ウォームアップも検討しましたが、クラウドリソースの最適化（無料枠の枯渇防止）の観点から、意図的に実装を見送るという実務的なトレードオフ判断を行っています。
                  </p>
                </div>
                
                {/* Go API */}
                <div>
                  <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">Go API: ロバストな並行処理</h4>
                  <ul className="list-disc list-outside ml-4 space-y-2">
                    <li className="pl-1"><span className="font-bold text-slate-800">レースコンディションの防止:</span> 標準ライブラリの <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">sync.WaitGroup</code> を使用し、全てのGoroutine（軽量スレッド）が完了したことを確実に保証してからレスポンスを返す、安全で信頼性の高い並行処理を実装しています。</li>
                    <li className="pl-1"><span className="font-bold text-slate-800">リソース管理:</span> 各Goroutineは自己完結したタスクを実行し、完了後には確実にリソースを解放（<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">wg.Done()</code>）するため、Goroutineリーク（処理が終了せず残り続ける問題）の発生を防いでいます。</li>
                  </ul>
                </div>

                {/* C# API */}
                <div>
                  <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">C# (ASP.NET Core) API: 堅牢なデータ操作とセキュリティ</h4>
                  <p className="leading-relaxed mb-2">Dockerコンテナ上で稼働させ、堅牢なエンタープライズ技術とモダンフロントエンドの融合を証明しています。</p>
                  <ul className="list-disc list-outside ml-4 space-y-2">
                    <li className="pl-1"><span className="font-bold text-slate-800">SQLインジェクション対策:</span> データベースを使用せず、サーバーのメモリ上にあるデータをLINQで操作しているため、SQLインジェクション攻撃の危険性は原理的にありません。LINQによる型安全なクエリ実行を示しています。</li>
                    <li className="pl-1"><span className="font-bold text-slate-800">入力値の検証:</span> フロントエンドからの並び替えキー（<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">sortBy</code>）は、サーバーサイドの <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">switch</code> 文で検証する「ホワイトリスト方式」を採用。意図しない値が指定された場合はデフォルトの並び順を適用し、予期せぬエラーを防いでいます。</li>
                  </ul>
                </div>
              </div>
            )
          }
        ]
  },
  {
    id: "portfolio-renewal",
    title: "4. ポートフォリオ刷新プロジェクト",
    badge: "学習・技術キャッチアップ事例", // バッジ名もアドバイスに合わせて微修正
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    summary: "当初はHTML/CSS/JavaScriptでポートフォリオサイトを開発していましたが、開発途中でNext.jsを知り、保守性や拡張性を考慮してNext.jsへ移行しました。技術習得とサイト開発を並行しながら構築を進め、現在も継続的に機能追加・改善を行っています。",
    sections: [
      { 
        title: "背景・課題", 
        fullWidth: true,
        items: [
          "ポートフォリオをHTML/CSS/JavaScriptで作成していた",
          "開発途中でNext.jsを知った",
          "今後の機能追加や保守性を考慮すると構成の見直し余地があった",
          "未経験技術であっても実際に触れながら理解したいと考えた"
        ] 
      },
      { 
        title: "実施内容", 
        fullWidth: true,
        content: (
          <div className="space-y-3 text-sm text-slate-700">
            <ul className="list-disc list-outside ml-4 space-y-1.5">
              <li className="pl-1">既存HTMLサイトの構成を整理</li>
              <li className="pl-1">Next.jsへの移行を実施</li>
              <li className="pl-1">コンポーネント化による再利用性向上</li>
              <li className="pl-1">TypeScriptの導入</li>
              <li className="pl-1">GitHubによるバージョン管理</li>
              <li className="pl-1">Vercelによるデプロイ環境構築</li>
            </ul>
            <p className="leading-relaxed pt-2">
              現在は継続的な改善を実施中。今後はAWSやHonoの導入も検討している。
            </p>
          </div>
        )
      },
      { 
        title: "成果", 
        fullWidth: true,
        items: [
          "未経験だったNext.jsをキャッチアップしながらサイトを完成",
          "フレームワークを利用した開発経験を獲得",
          "コンポーネント指向による開発手法を学習",
          "継続的な機能追加が可能な構成へ移行",
          "技術選定から実装までを一貫して経験"
        ] 
      },
      { 
        title: "学んだこと", 
        fullWidth: true,
        items: [
          "フレームワーク活用による開発効率向上",
          "技術選定の重要性",
          "保守性を考慮した設計の重要性",
          "未経験技術のキャッチアップ方法",
          "小規模でも継続的に改善できる構成づくり"
        ] 
      }
    ],
    accordions: [
          { 
            title: "移行前後の比較", 
            content: (
              <div className="space-y-6 text-sm text-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 移行前 */}
                  <div className="bg-slate-100 border border-slate-200 rounded-md p-5">
                    <h4 className="font-bold text-slate-500 mb-4 text-center border-b border-slate-200 pb-2">移行前（初期構想）</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2"><span className="text-slate-400 mt-0.5">▪</span> HTML / CSS / JavaScript</li>
                      <li className="flex items-start gap-2"><span className="text-slate-400 mt-0.5">▪</span> ページ単位のベタ書き管理</li>
                      <li className="flex items-start gap-2"><span className="text-slate-400 mt-0.5">▪</span> 手動でのファイルアップロード</li>
                      <li className="flex items-start gap-2"><span className="text-slate-400 mt-0.5">▪</span> 機能追加のたびに複数ページを修正</li>
                    </ul>
                  </div>
                  {/* 移行後 */}
                  <div className="bg-blue-50 border border-blue-100 rounded-md p-5 shadow-sm">
                    <h4 className="font-bold text-blue-700 mb-4 text-center border-b border-blue-100 pb-2">移行後（現在）</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">▪</span> Next.js / Tailwind CSS / TypeScript</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">▪</span> コンポーネント分割による一元管理</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">▪</span> Vercel連携による自動デプロイ</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">▪</span> 拡張性を前提としたモダンな構成</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                  <p className="font-bold text-slate-800 mb-1">所感</p>
                  <p className="leading-relaxed">
                    静的なポートフォリオサイトであっても、モダンなフレームワークを導入することで、コードの保守性や将来の拡張性が劇的に向上することを実体験として学びました。
                  </p>
                </div>
              </div>
            )
          },
          { 
            title: "技術的な詳細（技術選定と学習プロセス）", 
            content: (
              <div className="space-y-6 text-sm text-slate-700">
                <div>
                  <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">Next.jsを選んだ理由</h4>
                  <p className="leading-relaxed">
                    当初はHTML/CSSで制作を進めていましたが、情報収集の中でNext.jsが現在のWeb開発のトレンドであることを知りました。<br />
                    「良さそうだから実際に試してみよう」と考え、開発途中であったにもかかわらず、学習を兼ねて大胆に構成をNext.jsへ移行し、最後まで完成させました。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">実際に感じたメリット</h4>
                  <ul className="list-disc list-outside ml-4 space-y-2">
                    <li className="pl-1"><span className="font-bold text-slate-800">コンポーネント化の恩恵:</span> ヘッダーやボタンなどのUIパーツを再利用でき、修正が1箇所で済む管理のしやすさに感動しました。</li>
                    <li className="pl-1"><span className="font-bold text-slate-800">TypeScriptとの相性:</span> 型定義による入力補完やエラー検知により、開発体験が大きく向上しました。</li>
                    <li className="pl-1"><span className="font-bold text-slate-800">デプロイの簡便さ:</span> GitHubにプッシュするだけでVercelへ自動デプロイされる環境を構築し、CI/CDの基礎を体感しました。</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">今後の改善予定</h4>
                  <p className="leading-relaxed mb-2">
                    本ポートフォリオは完成ではなく、継続的な技術検証の場（Lab）として拡張していく予定です。
                  </p>
                  <ul className="list-disc list-outside ml-4 space-y-1.5">
                    <li className="pl-1">AWS環境（EC2 / RDSなど）への展開</li>
                    <li className="pl-1">軽量なWebフレームワーク「Hono」の導入検証</li>
                    <li className="pl-1">フロントエンドとバックエンドの完全なAPI分離構成への挑戦</li>
                  </ul>
                </div>
              </div>
            )
          }
        ]
  },
  {
    id: "python-automation",
    title: "5. Pythonによる業務準備自動化",
    badge: "個人生産性向上事例",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    summary: "日々の業務開始時に行っていた複数システムへのログインや打刻、スケジュール確認などの定型作業を効率化するため、Pythonを用いた業務準備自動化ツールを開発しました。業務開始前に必要な一連の操作をワンクリックで実行できるようにし、毎日の定型作業を削減しました。",
    sections: [
      { 
        title: "背景・課題", 
        fullWidth: true,
        items: [
          "出勤後の業務開始準備に毎日一定の時間を要していた", 
          "複数の社内システムへ個別にログインする必要があった", 
          "業務開始前の定型作業が多く、生産性向上の余地があると感じていた"
        ] 
      },
      { 
        title: "実施内容", 
        fullWidth: true,
        content: (
          <div className="space-y-3 text-sm text-slate-700">
            <p className="leading-relaxed">
              Pythonを利用して業務開始時の定型作業を自動化しました。
            </p>
            <p className="font-bold text-slate-800 pt-2">自動化内容：</p>
            <ul className="list-disc list-outside ml-4 space-y-1.5">
              <li className="pl-1">勤怠管理システムへのログイン</li>
              <li className="pl-1">出勤打刻の実行</li>
              <li className="pl-1">打刻結果の確認</li>
              <li className="pl-1">社内ポータルへのログイン</li>
              <li className="pl-1">年間カレンダー画面の表示</li>
              <li className="pl-1">施設予約システムへのログイン</li>
              <li className="pl-1">スケジュール管理画面の表示</li>
              <li className="pl-1">施設予約画面の初期設定</li>
              <li className="pl-1">退勤処理の自動化</li>
            </ul>
            <p className="leading-relaxed pt-2">
              日々の利用を前提として改善を繰り返しながら運用しました。
            </p>
          </div>
        )
      },
      { 
        title: "成果", 
        fullWidth: true,
        items: [
          "毎日の業務開始準備時間を短縮", 
          "複数システムへのアクセス作業を一元化", 
          "定型作業を自動化することで業務開始までの手順を簡素化",
          "Pythonを活用した業務自動化の実践経験を獲得",
          "継続的な改善を通じて運用可能な仕組みを構築"
        ] 
      },
      { 
        title: "学んだこと", 
        fullWidth: true,
        items: [
          "小さな業務改善の積み重ねが生産性向上につながること", 
          "定型作業を自動化候補として捉える視点",
          "Pythonによるブラウザ操作自動化の実践",
          "自分自身の業務を分析する重要性",
          "自動化の効果と運用コストのバランス"
        ] 
      }
    ],
    accordions: [
          { 
            title: "技術的な詳細と運用プロセス", 
            content: (
              <div className="space-y-6 text-sm text-slate-700">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                  <p className="text-yellow-800 text-xs font-bold flex items-center gap-1.5">
                    <span>⚠️</span> コードの公開について
                  </p>
                  <p className="text-yellow-700 mt-1 leading-relaxed text-xs">
                    本ツールは実際の業務環境内で開発・運用しました。企業コンプライアンスおよび機密情報保護の観点からソースコードの持ち出しが不可であったため、以下に設計・運用の詳細のみを記載します。
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">利用技術</h4>
                  <p className="leading-relaxed">
                    Python / Selenium (WebDriver)
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">設計方針と工夫した点</h4>
                  <ul className="list-disc list-outside ml-4 space-y-2">
                    <li className="pl-1"><span className="font-bold text-slate-800">堅牢なエラーハンドリング:</span> ネットワークの遅延やシステムのロード時間によるエラーを防ぐため、Seleniumの明示的な待機（Explicit Wait）や <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">try-except</code> による例外処理を実装し、途中で処理が落ちないように工夫しました。</li>
                    <li className="pl-1"><span className="font-bold text-slate-800">セキュアな認証情報管理:</span> IDやパスワードなどの機密情報はスクリプト内に直接記述（ハードコード）せず、外部の設定ファイルや環境変数から読み込む設計とし、セキュリティに配慮しました。</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">運用と継続的な改善</h4>
                  <ul className="list-disc list-outside ml-4 space-y-2">
                    <li className="pl-1"><span className="font-bold text-slate-800">UI変更への追従:</span> 社内システムのアップデートによりHTML構造（DOM）が変更された際も、要素の取得ロジック（XPathやCSSセレクタ）を迅速に修正し、運用を継続させました。</li>
                    <li className="pl-1"><span className="font-bold text-slate-800">実行の簡便化:</span> ターミナルを開かずともワンクリックで処理を開始できるよう、実行用のバッチファイル（.bat）を作成し、日々の利用ハードルを下げる工夫を行いました。</li>
                  </ul>
                </div>
              </div>
            )
          }
        ]
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-slate-50 py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center sm:text-left">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Projects & Case Studies</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">課題解決の実績と開発事例</h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto sm:mx-0">
            実務での改善活動や個人開発を通じて、課題発見から解決まで取り組んだ事例をまとめています。
          </p>
        </div>

        <div className="flex flex-col gap-10 max-w-3xl mx-auto">
          {projects.map((p) => (
            <div key={p.id} id={p.id} className="scroll-mt-24 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                
                <div className="mb-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold border mb-3 ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">{p.title}</h3>
                </div>

                <p className="text-sm text-slate-600 mb-6 leading-relaxed pb-6 border-b border-slate-100">
                  {p.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* ▼ (sec) を (sec: Section) に変更 ▼ */}
                  {p.sections.map((sec: Section) => (
                    <div 
                      key={sec.title} 
                      className={`bg-slate-50 border border-slate-100 rounded-md p-4 sm:p-5 ${sec.fullWidth ? 'sm:col-span-2' : ''}`}
                    >
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">{sec.title}</p>
                      
                      {sec.content ? (
                        sec.content
                      ) : (
                        <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-2">
                          {sec.items?.map((item, idx) => (
                            <li key={idx} className="leading-relaxed pl-1">{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {p.accordions.length > 0 && (
                  <div className="space-y-3 mt-2">
                    {/* ▼ (acc) を (acc: Accordion) に変更 ▼ */}
                    {p.accordions.map((acc: Accordion) => (
                      <details key={acc.title} className="text-sm group">
                        <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer text-blue-600 hover:text-blue-700 font-bold transition-colors duration-200 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 inline-flex items-center">
                          <span className="inline-block transition-transform group-open:rotate-90 mr-1">▶</span> {acc.title}
                        </summary>
                        <div className="mt-2 text-slate-600 leading-relaxed text-sm bg-slate-50 rounded p-4 border border-slate-100">
                          {acc.content}
                          <div className="mt-6 pt-4 border-t border-slate-200 text-right">
                            <button
                              onClick={(e) => {
                                const details = e.currentTarget.closest('details');
                                if (details) {
                                  details.removeAttribute('open');
                                  // ヘッダーの高さ(約80px)を考慮して、タイトルの位置へスムーズにスクロールして戻る
                                  const y = details.getBoundingClientRect().top + window.scrollY - 80;
                                  window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                              }}
                              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded px-3 py-1.5 bg-white border border-slate-200 shadow-sm hover:shadow"
                            >
                              ▲ 閉じる
                            </button>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}