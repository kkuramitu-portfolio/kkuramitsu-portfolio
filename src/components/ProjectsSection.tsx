"use client";
import React, { useRef } from "react";

type Section = {
  title: string;
  items?: string[];
  content?: React.ReactNode;
  fullWidth?: boolean;
};

type Accordion = {
  title: string;
  content: React.ReactNode;
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

const CodeBlock = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <pre 
    data-clarity-unmask="true" 
    className={`bg-slate-800 text-slate-300 p-4 rounded-md overflow-x-auto text-xs font-mono leading-relaxed shadow-inner ${className}`}
  >
    <code>{children}</code>
  </pre>
);

const projects: Project[] = [
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
              <li className="pl-1">データ件数は2万件以上</li>
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
              <CodeBlock>
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
              </CodeBlock>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-1">2. マッピング辞書の作成と「名寄せ」登録</h4>
              <p className="text-sm text-slate-600 mb-3">生データの表記ゆれ（スペースの有無など）を吸収するため、既存マスタからTRIM処理をかけて重複を排除（名寄せ）し、辞書テーブルへ登録。</p>
              <CodeBlock>
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
              </CodeBlock>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-1">3. データ変換（Transform）とクレンジング</h4>
              <p className="text-sm text-slate-600 mb-3">生データと辞書を結合し、本番環境向けの変換テーブルを作成。複数カラムに依存する例外ルールや、ノイズ除去の正規表現を適用。</p>
              <CodeBlock>
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
              </CodeBlock>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-1">4. 本番テーブルへの投入（Load）</h4>
              <p className="text-sm text-slate-600 mb-3">クレンジング済みのデータを本番テーブルのスキーマに合わせて投入。作成日時・更新日時を同期させる。</p>
              <CodeBlock>
{`INSERT INTO m_assets (
    code, name, purchase_price, vendor_id, valid_flg, delete_flg,
    created, creator, modified, modifier
)
SELECT
    code, name, purchase_price, vendor_id, valid_flg, delete_flg,
    NOW(), 'migration_sys', NOW(), 'migration_sys'
FROM transformed_data;`}
              </CodeBlock>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-1">5. 自動差分検知SQL（整合性テスト）</h4>
              <p className="text-sm text-slate-600 mb-3">目視確認を排除するため、「元の生データ」と「投入後の本番データ」を結合し、不一致項目を自動抽出するテストSQL。</p>
              <CodeBlock>
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
              </CodeBlock>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-1">6. マスタデータの重複整理（論理削除処理）</h4>
              <p className="text-sm text-slate-600 mb-3">移行完了後、アプリケーションUIのプルダウン等に重複した選択肢が表示されるのを防ぐため、名寄せで選ばれなかった旧マスタレコードを論理削除。</p>
              <CodeBlock>
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
              </CodeBlock>
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
    id: "backup-improvement",
    title: "2. バックアップ運用改善プロジェクト",
    badge: "実務課題解決事例",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    summary: "業務管理システムのバックアップ運用において、NASへのバックアップが正常に作成されていない問題が発覚しました。バックアップは継続して取得されているものの、NASへの保存が停止しており、ローカルPCのみに保存され続けていたため、顧客からのクレームに発展していました。原因調査から運用設計の見直し、障害通知、復旧時の自動同期までを含めたバックアップ運用改善を実施しました。",
    sections: [
      { 
        title: "背景・課題", 
        fullWidth: true,
        items: [
          "業務管理システムは顧客企業のサーバー用PC上で運用",
          "バックアップ保存先としてNASを導入",
          "バッチ処理とタスクスケジューラによりバックアップを自動取得",
          "NASへのバックアップは設定後約1週間で停止",
          "その後はローカルPCにのみバックアップが保存され続けていた",
          "障害発生時に検知できる仕組みが存在していなかった",
          "顧客からバックアップ運用に関するクレームが発生"
        ]
      },
      {
        title: "実施内容",
        fullWidth: true,
        content: (
          <div className="space-y-4 text-sm text-slate-700">
            <p className="leading-relaxed">
              まず既存運用を調査し、NASアクセス時の認証や権限設定に問題があることを確認しました。その上で、バックアップ処理の見直しを実施しました。
            </p>
            <div>
              <p className="font-bold text-slate-800 mb-1">1. NASアクセスの安定化</p>
              <ul className="list-disc list-outside ml-4 space-y-1">
                <li className="pl-1">NAS専用アカウントを利用したアクセス処理を実装</li>
                <li className="pl-1">必要な権限設定を見直し</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">2. バックアップ取得優先順位の見直し</p>
              <ul className="list-disc list-outside ml-4 space-y-1">
                <li className="pl-1">NASへアクセス可能な場合は直接バックアップを保存</li>
                <li className="pl-1">NASへアクセスできない場合はローカルへ一時保存</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">3. 障害検知の自動化</p>
              <ul className="list-disc list-outside ml-4 space-y-1">
                <li className="pl-1">NASアクセス失敗時にメール通知を実施</li>
                <li className="pl-1">関係部署全員へ自動通知</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">4. 自動復旧処理の実装</p>
              <ul className="list-disc list-outside ml-4 space-y-1">
                <li className="pl-1">NAS復旧時に未同期バックアップを自動コピー</li>
                <li className="pl-1">コピー完了後にローカルデータを自動削除</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">5. バックアップ世代管理</p>
              <ul className="list-disc list-outside ml-4 space-y-1">
                <li className="pl-1">保存期間を365日以内に統一</li>
                <li className="pl-1">保持期間を超過したバックアップを自動削除</li>
              </ul>
            </div>
          </div>
        )
      },
      { 
        title: "成果", 
        fullWidth: true,
        items: [
          "NASへのバックアップ失敗を即時検知できる仕組みを構築",
          "バックアップ取得失敗時のデータ保護を実現",
          "障害発生時の運用リスクを低減",
          "NAS復旧後の手動対応を不要化",
          "バックアップ管理運用の安定化を実現"
        ] 
      },
      { 
        title: "学んだこと", 
        fullWidth: true,
        items: [
          "バックアップ取得だけでなく監視設計の重要性",
          "障害発生を前提とした運用設計の重要性",
          "フェイルセーフを考慮した仕組み作り",
          "自動化と運用保守のバランス",
          "システム運用における再発防止策の考え方",
          "ユーザーが安心して利用できる仕組み作りの重要性"
        ] 
      }
    ],
    accordions: [
      { 
        title: "詳細を見る（システム概要と技術的な工夫）", 
        content: (
          <div className="space-y-6 text-sm text-slate-700">
            <div>
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">ハイブリッド・自動バックアップ＆メンテナンスシステム</h4>
              <p className="leading-relaxed">
                NAS（ネットワークストレージ）へのバックアップを主軸としつつ、接続失敗時にはローカルストレージへ自動退避し、管理者へメール通知を行う堅牢なバックアップシステム。<br />
                NAS復旧時にはローカルデータを自動同期し、さらにNAS上の古いデータを自動削除するライフサイクル管理機能も備えています。
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">主な機能</h4>
              <ol className="list-decimal list-outside ml-4 space-y-2">
                <li className="pl-1"><span className="font-bold text-slate-800">管理者権限への自動昇格:</span> 実行時に権限をチェックし、必要に応じて自動で昇格。</li>
                <li className="pl-1"><span className="font-bold text-slate-800">ハイブリッド・バックアップ:</span> NASの死活監視を行い、保存先を動的に切り替え。</li>
                <li className="pl-1"><span className="font-bold text-slate-800">自動同期（Robocopy）:</span> NAS復旧時、ローカルに一時保存されたデータを属性を維持したまま自動転送。</li>
                <li className="pl-1"><span className="font-bold text-slate-800">インテリジェント・クリーンアップ:</span> PowerShellを統合し、特定の重要フォルダを除外しながら、1年以上経過したバックアップフォルダのみを自動削除。</li>
                <li className="pl-1"><span className="font-bold text-slate-800">エラー通知:</span> 異常発生時にPowerShell経由でSMTPメールを送信。</li>
              </ol>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">開発のポイントと技術的な工夫</h4>
              <ul className="list-disc list-outside ml-4 space-y-2">
                <li className="pl-1"><span className="font-bold text-slate-800">フェイルセーフ設計:</span> NASが不安定でバックアップが失敗するリスクがあったため、二段構えの自動復旧ロジックを構築しました。</li>
                <li className="pl-1"><span className="font-bold text-slate-800">言語の適材適所:</span> バッチファイルでは難しい日付判定や除外リスト処理を、PowerShellを呼び出すことで解決しました。</li>
                <li className="pl-1"><span className="font-bold text-slate-800">堅牢なコピー処理:</span> Robocopyのバックアップモード（<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">/B</code>）を使用し、アクセス権限に左右されない確実なコピーを実現しました。</li>
                <li className="pl-1"><span className="font-bold text-slate-800">安全への配慮:</span> スクリプト自身を削除しないよう除外設定を施し、運用ミスを防ぐ設計にしました。</li>
              </ul>
            </div>
          </div>
        )
      },
      { 
        title: "使用コード（backup.bat / send_mail.ps1）", 
        content: (
          <div className="space-y-8 text-sm text-slate-700">
            <div>
              <h4 className="font-bold text-slate-800 mb-2">1. backup.bat (簡易・匿名化版)</h4>
              <CodeBlock>
{`@echo off
setlocal enabledelayedexpansion

REM =================================================================
REM ---          0. 管理者権限への自動昇格                       ---
REM =================================================================
openfiles >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Start-Process -FilePath '%0' -Verb RunAs"
    exit /b
)

REM =================================================================
REM ---                  1. 設定項目                              ---
REM =================================================================
set DB_NAME=my_database
set NAS_PATH=\\\\192.168.x.x\\backup
set LOCAL_ROOT=C:\\backup_system
set LOG_FILE="%LOCAL_ROOT%\\logs\\backup_log.txt"

REM 保存期間の設定 (日換算)
set RETENTION_DAYS=365

REM =================================================================
REM ---                  2. NAS接続確認                           ---
REM =================================================================
net use %NAS_PATH% /delete /yes >nul 2>&1
net use %NAS_PATH% "password" /user:"admin" /persistent:no >nul 2>&1

if %ERRORLEVEL% NEQ 0 (
    goto :NAS_FAIL
) else (
    goto :NAS_SUCCESS
)

REM =================================================================
REM ---                  ① NAS失敗時の処理 (ローカル退避)        ---
REM =================================================================
:NAS_FAIL
set RUN_DIR=%LOCAL_ROOT%\\temp_backup\\%date:~0,4%%date:~5,2%%date:~8,2%
if not exist "%RUN_DIR%" mkdir "%RUN_DIR%"

REM バックアップ実行
call :EXECUTE_BACKUP "%RUN_DIR%"

REM 管理者へ通知
powershell -ExecutionPolicy Bypass -File "%~dp0send_mail.ps1" -Subject "Backup Warning" -Body "NAS connection failed. Saved to Local."
goto :END

REM =================================================================
REM ---                  ② NAS成功時の処理 (同期＆掃除)          ---
REM =================================================================
:NAS_SUCCESS
set RUN_DIR=%NAS_PATH%\\%date:~0,4%%date:~5,2%%date:~8,2%
if not exist "%RUN_DIR%" mkdir "%RUN_DIR%"

REM バックアップ実行
call :EXECUTE_BACKUP "%RUN_DIR%"

REM ローカルに一時保存されていた過去データをNASへ移動
for /d %%Y in ("%LOCAL_ROOT%\\temp_backup\\*") do (
    robocopy "%%Y" "%NAS_PATH%\\%%~nxY" /E /MOVE /B /XF *.bat *.ps1 /R:1 /W:2
)

REM NAS上の古いバックアップフォルダ(backup_*)を削除 (除外設定付き)
echo Cleaning up old data...
powershell -Command "$exclude = @('logs', 'important_data'); $limit = (Get-Date).AddDays(-%RETENTION_DAYS%); Get-ChildItem '%NAS_PATH%' -Recurse -Directory | Where-Object { $_.Name -like 'backup_*' -or $exclude -contains $_.Name } | ForEach-Object { if (-not ($exclude -contains $_.Name) -and ($_.LastWriteTime -lt $limit)) { Remove-Item $_.FullName -Recurse -Force } }"

goto :END

REM =================================================================
REM ---                バックアップ実行サブルーチン               ---
REM =================================================================
:EXECUTE_BACKUP
set "DEST=%~1"
REM DBダンプやファイルコピーのコマンドをここに記述
mysqldump -u root -p"password" %DB_NAME% > "%DEST%\\db_dump.sql"
robocopy "C:\\data\\files" "%DEST%\\files" /E /B /R:1 /W:2
exit /b

:END
net use %NAS_PATH% /delete /yes >nul 2>&1
exit /b 0`}
              </CodeBlock>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-2">2. send_mail.ps1 (簡易・匿名化版)</h4>
              <CodeBlock>
{`param([string]$Subject, [string]$Body)

# --- メール送信設定 ---
$SmtpServer  = "smtp.example.com"
$SmtpPort    = 587
$Username    = "system@example.com"
$Password    = "secure_password"
$To          = "admin@example.com"

# --- 送信処理 ---
$SecPassword = ConvertTo-SecureString $Password -AsPlainText -Force
$Cred = New-Object System.Management.Automation.PSCredential ($Username, $SecPassword)

try {
    Send-MailMessage -SmtpServer $SmtpServer \`
                    -Port $SmtpPort \`
                    -UseSsl \`
                    -From $Username \`
                    -To $To \`
                    -Subject $Subject \`
                    -Body $Body \`
                    -Credential $Cred \`
                    -Encoding UTF8 \`
                    -ErrorAction Stop
} catch {
    exit 1
}
exit 0`}
              </CodeBlock>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "mail-checker",
    title: "3. メール事故防止チェックツール",
    badge: "業務改善事例",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    summary: "メール送信時の宛先ミス、添付漏れ、誤字脱字などのヒューマンエラーを防止するため、Excel VBAを活用したメール事故防止チェックツールを作成しました。人によるダブルチェックだけでは防ぎきれないミスが発生する可能性があるため、送信前に自己チェックを実施できる仕組みを構築しました。また、AIによる文章チェックを安全に利用するため、個人情報を匿名化して送信できる機能も実装しました。",
    sections: [
      { 
        title: "背景・課題", 
        fullWidth: true,
        items: [
          "メール送信時の確認作業が担当者ごとに異なっていた",
          "ダブルチェック体制が存在しないケースがあった",
          "ダブルチェックが存在しても人的ミスを完全には防げなかった",
          "誤字脱字や添付漏れなどのメール事故リスクが存在していた",
          "AIによる文章チェックを利用したいが、個人情報の取り扱いに課題があった"
        ] 
      },
      { 
        title: "実施内容", 
        fullWidth: true,
        content: (
          <div className="space-y-5 text-sm text-slate-700">
            <p className="leading-relaxed">
              メール送信前の確認作業を標準化するため、Excel VBAによるセルフチェックツールを作成しました。
            </p>
            
            <div className="bg-slate-50 border border-slate-100 rounded-md p-4">
              <p className="font-bold text-slate-800 mb-2 border-b border-slate-200 pb-1">チェック機能</p>
              <ul className="list-disc list-outside ml-4 space-y-2">
                <li className="pl-1"><span className="font-bold text-slate-800">宛先チェック:</span> TO、CC、BCCの宛先確認、不要な宛先の確認、宛先順序の確認</li>
                <li className="pl-1"><span className="font-bold text-slate-800">添付ファイルチェック:</span> 添付漏れ確認、誤添付確認、不要ファイル確認</li>
                <li className="pl-1"><span className="font-bold text-slate-800">本文チェック:</span> 件名確認、宛名確認、会社名確認、URL・ファイル名確認、署名確認</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-md p-4">
              <p className="font-bold text-slate-800 mb-2 border-b border-slate-200 pb-1">AI文章チェック機能</p>
              <p className="leading-relaxed mb-3">AIによる文章チェックを安全に利用するため、以下の仕組みを実装しました。</p>
              <ol className="list-decimal list-outside ml-4 space-y-2">
                <li className="pl-1"><span className="font-bold text-slate-800">個人情報匿名化:</span> 氏名、会社名、メールアドレス、電話番号などの情報を管理用タグへ自動置換</li>
                <li className="pl-1"><span className="font-bold text-slate-800">AIレビュー:</span> 匿名化後の文章をAIへ送信し、誤字脱字、表現改善、ビジネス文書としての自然さを確認</li>
                <li className="pl-1"><span className="font-bold text-slate-800">自動復元:</span> AIレビュー後に元データへ復元</li>
                <li className="pl-1"><span className="font-bold text-slate-800">復元漏れ検知:</span> タグ残存チェック機能を実装し、匿名化データの残存を検知</li>
              </ol>
            </div>
          </div>
        )
      },
      { 
        title: "成果", 
        fullWidth: true,
        items: [
          "メール送信前の確認手順を標準化",
          "ヒューマンエラー防止のためのセルフチェック環境を構築",
          "AIを活用した文章品質向上フローを確立",
          "個人情報保護を考慮したAI活用手法を実現",
          "業務品質向上のための仕組み作りを経験"
        ] 
      },
      { 
        title: "学んだこと", 
        fullWidth: true,
        items: [
          "ヒューマンエラーを前提とした業務設計の重要性",
          "チェックリスト運用の有効性",
          "業務フロー全体を考慮した改善の重要性",
          "AI活用時の情報管理リスクへの配慮",
          "自動化だけでなく品質向上を目的とした仕組み作り",
          "品質管理の考え方を業務改善へ応用する重要性"
        ] 
      }
    ],
    accordions: [
      { title: "画面イメージ", content: "（チェック画面・AIチェック画面掲載予定。いつでも入力できるように枠のみ用意しています。）" },
      { title: "フロー図", content: "（メール作成 → チェック → 匿名化 → AIレビュー → 復元 → 最終確認 → 送信 のフロー図を掲載予定。）" },
      { 
        title: "詳細を見る（設計思想とVBA実装内容）", 
        content: (
          <div className="space-y-6 text-sm text-slate-700">
            <div>
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">設計思想</h4>
              <ul className="list-disc list-outside ml-4 space-y-2">
                <li className="pl-1"><span className="font-bold text-slate-800">プラットフォームにVBAを選定した理由:</span> 全社員が新たなソフトをインストールすることなく、使い慣れたExcel上で即座に利用・展開できるため、現場への導入ハードルを最小化できると判断しました。</li>
                <li className="pl-1"><span className="font-bold text-slate-800">属人化の排除と横展開（マスタ化）:</span> ツールを自分専用にするのではなく、関係会社、関係者、自身の署名などをExcelの「設定シート」に登録できるように設計。プログラム内に値を直書き（ハードコード）せず、誰でも自身の環境に合わせて汎用的に利用できる利便性を追求しました。</li>
                <li className="pl-1"><span className="font-bold text-slate-800">システムによる強制的な情報保護:</span> パブリックな生成AIを利用する際、「個人情報を入力しないこと」という運用ルール（人間頼み）では必ずインシデントが発生します。そのため、APIへ送信する前にローカル環境（VBA側）で強制的に匿名化を行うフェイルセーフ設計を採用しました。</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">匿名化ロジックとタグ管理</h4>
              <p className="leading-relaxed mb-2">
                VBAの <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">Scripting.Dictionary</code> と正規表現（<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">VBScript.RegExp</code>）を組み合わせ、抽出した個人情報と置換タグをペアでメモリ上に保持します。
              </p>
              <ul className="list-disc list-outside ml-4 space-y-1.5">
                <li className="pl-1">設定シートから読み込んだ氏名・会社名リストや、正規表現で抽出したメールアドレスを <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">&lt;NAME_1&gt;</code> や <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">&lt;EMAIL_1&gt;</code> といった一意のタグに置換。</li>
                <li className="pl-1">AIからのレビュー結果受信後、Dictionaryの情報を元にタグを元の文字列へ逆置換（復元）。</li>
                <li className="pl-1">AIがタグのフォーマットを崩してしまった場合に備え、復元後のテキストにタグ文字列が残存していないかを最終チェックする「復元漏れ検知」を実装。</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-2">VBA実装内容（匿名化・復元ロジックの抜粋）</h4>
              <CodeBlock>
{`' =========================================================
' 個人情報の匿名化処理
' =========================================================
Function AnonymizeText(ByVal originalText As String, ByRef dict As Object) As String
    Dim anonymized As String
    anonymized = originalText
    
    ' ▼ 工夫点：ハードコードせず、設定シート(マスタ)から動的に配列を取得
    Dim names As Variant
    names = GetNamesFromSettingSheet() ' 例: Array("蔵満", "佐藤", ...)
    
    Dim i As Integer
    For i = LBound(names) To UBound(names)
        If InStr(anonymized, names(i)) > 0 Then
            Dim tag As String
            tag = "<NAME_" & i & ">"
            
            ' 復元用にDictionaryへ保存 (Key: タグ, Item: 元の氏名)
            dict.Add tag, names(i)
            
            ' 本文内の氏名をタグに置換
            anonymized = Replace(anonymized, names(i), tag)
        End If
    Next i
    
    ' ※この後、正規表現を用いたメールアドレスや電話番号の置換処理が続く
    
    AnonymizeText = anonymized
End Function

' =========================================================
' AIレビュー後の復元処理と漏れ検知
' =========================================================
Function RestoreText(ByVal aiText As String, ByVal dict As Object) As String
    Dim restored As String
    restored = aiText
    
    ' Dictionaryに保存したタグを元に逆置換
    Dim key As Variant
    For Each key In dict.Keys
        restored = Replace(restored, key, dict(key))
    Next key
    
    ' 【フェイルセーフ】復元漏れ検知
    ' AIがタグを "< NAME_1 >" のように改変してしまい復元できなかった場合を検知
    If InStr(restored, "<NAME_") > 0 Or InStr(restored, "<EMAIL_") > 0 Then
        MsgBox "【警告】匿名化タグが残存しています。AIの応答によってタグが改変された可能性があります。目視で確認してください。", vbCritical, "復元エラー検知"
    End If
    
    RestoreText = restored
End Function`}
              </CodeBlock>
            </div>
          </div>
        )
      }
    ]
  },

  {
    id: "schedule-backward-app",
    title: "4. 予定逆算アプリ（Flutter/iOS）の開発とハイブリッド環境構築",
    badge: "個人開発",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    summary: "「15:13のバスに乗るために、いつ何をすべきか」という日常の逆算作業は、メモ帳でのアナログ管理では工程の入れ替えや時間変更に弱く、遅延リスクが高いという課題がありました。このペインを解消するため、目標時刻から逆算し、リアルタイムで「今何をすべきか」を可視化するモバイルアプリを企画しました。Flutter / Dartを用いたiOS向けアプリであり、動的逆算ロジックや1分単位のタイマー更新によるライブフィードバック機能を実装。さらに本プロジェクトの裏側では、「Windowsでの開発」と「10年落ちの古いMacでのiOSビルド」を組み合わせたハイブリッド開発環境を自律的に構築・完遂しています。",
    sections: [
      { 
        title: "見せ方のテーマ", 
        fullWidth: true,
        content: (
          <p className="text-sm text-slate-700 leading-relaxed font-bold">
            ユーザー視点のUX設計（課題発見力）と、リソース制約下でのインフラ構築・トラブル解決を完遂する「ビジネスエンジニア」としての証明
          </p>
        )
      },
      { 
        title: "使用技術・開発期間", 
        fullWidth: true,
        content: (
          <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-2">
            <li className="pl-1"><span className="font-bold text-slate-800">使用技術:</span> Flutter / Dart / iOS (Xcode) / shared_preferences (ローカル保存) / intl (時間計算) / GitHub (マルチアカウント運用)</li>
            <li className="pl-1"><span className="font-bold text-slate-800">開発期間:</span> 約10時間（要件定義・環境構築・実機デプロイを含む）</li>
          </ul>
        )
      },
      { 
        title: "苦労した点（技術的課題と解決アプローチ）", 
        fullWidth: true,
        content: (
          <div className="space-y-4 text-sm text-slate-700">
            <div>
              <p className="font-bold text-slate-800 mb-1">課題1（リソース制約と環境依存のトラブル）: 10年落ちのMacという制約、および個人用と企業用のGitHubアカウントが混在する複雑な認証エラー。</p>
              <p className="leading-relaxed">解決1: Macを「ビルド専用機」と割り切りWindowsで開発するフローを設計。Gitの内部構造（資格情報マネージャーやSSH設定）を理解し、泥臭いトラブルシューティングでマルチアカウント運用を実現しました。</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">課題2（エッジケースのバグとUXの追求）: 「日付が変わる深夜の予定」で計算が狂う仕様バグの発生と、時間が足りない時のユーザー行動の定義。</p>
              <p className="leading-relaxed">解決2: 日付の正規化ロジックを導入してバグを解決。また、単なる完了チェックではなく、不足時間が即座に再計算される「スキップ（諦める）」機能を実装し、単なるタスク管理ではなく「意思決定支援ツール」へと昇華させました。</p>
            </div>
          </div>
        )
      },
      { 
        title: "AI活用と自分で行った作業", 
        fullWidth: true,
        content: (
          <div className="space-y-4 text-sm text-slate-700">
            <div>
              <p className="font-bold text-slate-800 mb-1">AI活用（どこで利用したか）</p>
              <p className="leading-relaxed">コーディングの8割以上をAI（Gemini/Claude等）との対話で完遂。自身は「データ構造の設計」「エッジケースの特定」「UX上の優先順位付け」というディレクション業務に特化しました。</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">自分で行った作業</p>
              <p className="leading-relaxed">現場起点の要件定義（MVPの策定）、Windows/Mac間のインフラ環境設計、GitHubの認証トラブル解決、実機デプロイ、および時間計算というバグが起きやすい領域における品質管理（QA）視点でのテスト。</p>
            </div>
          </div>
        )
      },
      { 
        title: "学んだこと", 
        fullWidth: true,
        content: (
          <p className="text-sm text-slate-700 leading-relaxed">
            AIはコードを高速で書いてくれますが、「複雑なインフラ環境の構築」や「ユーザーのリアルな行動（スキップ等）を想定した仕様策定」を行い、最後までプロジェクトを完遂させるのは人間の泥臭い執念とディレクション力であると再認識しました。この「制約の中で最適解を見つけ、何が何でも完遂する力」は、社内SEとしての業務に直結すると確信しています。
          </p>
        )
      }
    ],
    accordions: []
  },
  {
    id: "forget-me-not-checker",
    title: "5. 忘れ物チェッカー Pro（Flutter/iOS）",
    badge: "個人開発",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    summary: "出発前の忘れ物確認において、物理的なラミネートリストを運用していましたが、項目の追加・削除が困難で「今日はいらない項目」を柔軟にスキップできない不便さがありました。このアナログ運用の限界を突破するため、状況（仕事・休日等）に合わせてリストを切り替え、一項目ずつ確実に確認していくアプリを企画しました。テンプレートごとのテーマカラー連動や、一つずつ項目を判断する「フォーカス・チェックUI」を実装。さらに、iOSショートカットとの連携機能や、入力履歴のサジェスト機能も備えています。",
    sections: [
      { 
        title: "見せ方のテーマ", 
        fullWidth: true,
        content: (
          <p className="text-sm text-slate-700 leading-relaxed font-bold">
            物理的運用の限界を突破する「システム化の提案力」と、認知負荷を下げる「UX設計力」の証明
          </p>
        )
      },
      { 
        title: "使用技術・開発期間", 
        fullWidth: true,
        content: (
          <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-2">
            <li className="pl-1"><span className="font-bold text-slate-800">使用技術:</span> Flutter / Dart / iOS (Xcode) / shared_preferences (データ永続化) / url_launcher (外部連携)</li>
            <li className="pl-1"><span className="font-bold text-slate-800">開発期間:</span> 約2時間（要件定義・UI設計・実機デプロイを含む）</li>
          </ul>
        )
      },
      { 
        title: "苦労した点（技術的課題と解決アプローチ）", 
        fullWidth: true,
        content: (
          <div className="space-y-4 text-sm text-slate-700">
            <div>
              <p className="font-bold text-slate-800 mb-1">課題1（UXの追求と認知負荷の低減）: 全項目を羅列すると「次は何を確認するか」探す手間が生じる問題。</p>
              <p className="leading-relaxed">解決1: 項目が自動でせり上がってくる「授与式（フォーカス）型」UIを考案。また「後で」を選択した項目をリスト最後尾に回すキュー構造を実装し、ユーザーが目の前の判断に集中できるUXを実現しました。</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">課題2（外部連携の入力コスト）: iOSショートカット連携において、複雑なURLスキームの入力がユーザーの負担になる問題。</p>
              <p className="leading-relaxed">解決2: 過去に使用したショートカット名の履歴表示・サジェスト機能を搭載し、入力コストを最小化するUIを構築しました。</p>
            </div>
          </div>
        )
      },
      { 
        title: "AI活用と自分で行った作業", 
        fullWidth: true,
        content: (
          <div className="space-y-4 text-sm text-slate-700">
            <div>
              <p className="font-bold text-slate-800 mb-1">AI活用（どこで利用したか）</p>
              <p className="leading-relaxed">コーディングの大部分をAIと対話しながら進行。自身は「物理リストのペイン分析」「キュー構造のデータ設計」「ユーザーの認知負荷を下げるUI/UXの要件定義」に特化しました。</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">自分で行った作業</p>
              <p className="leading-relaxed">アナログ運用の課題抽出、MVPの策定、データ永続化（JSON）の設計、iOSショートカット連携の検証、および「授与式UI」のディレクション。</p>
            </div>
          </div>
        )
      },
      { 
        title: "学んだこと", 
        fullWidth: true,
        content: (
          <p className="text-sm text-slate-700 leading-relaxed">
            システム化の真の価値は「単なるデジタル化」ではなく、「ユーザーの認知負荷を下げ、行動を最適化すること」にあると再認識しました。現場のアナログな運用課題を深く観察し、最適なUXをもってシステムに落とし込む力は、DX推進において極めて重要だと確信しています。
          </p>
        )
      }
    ],
    accordions: []
  },
  {
    id: "web-scraper",
    title: "6. Webサイト情報チェッカー", // ← 5から6に変更
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
              <p>※Pythonを用いた実務自動化の実績については「9. Pythonによる業務準備自動化」をご参照ください。</p>
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
            <CodeBlock className="mt-4">
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
            </CodeBlock>
          </div>
        )
      }
    ]
  },
  {
    id: "microservices",
    title: "7. マイクロサービス連携デモ", // ← 6から7に変更
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
    title: "8. ポートフォリオ刷新プロジェクト", // ← 7から8に変更
    badge: "学習・技術キャッチアップ事例",
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
              <p className="leading-relaxed mb-3">
                当初はHTML/CSSで制作を進めていましたが、情報収集の中でNext.jsが現在のWeb開発のトレンドであることを知りました。<br />
                「良さそうだから実際に試してみよう」と考え、開発途中であったにもかかわらず、学習を兼ねて大胆に構成をNext.jsへ移行し、最後まで完成させました。
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-md p-4">
                <p className="font-bold text-slate-800 mb-1">💡 運用を見据えたインフラ選定（SSL自動化）</p>
                <p className="leading-relaxed text-slate-600">
                  ホスティング先にVercelを選定した理由は、単なるデプロイの容易さだけではありません。昨今の「SSL証明書の有効期限短縮化（90日化）」のトレンドを見据え、手動での証明書更新による運用負荷と更新忘れのリスクを排除するため、SSLの自動発行・自動更新機能が標準で組み込まれたモダンなPaaS環境を選択しました。
                </p>
              </div>
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
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">今後の改善予定（インフラ構築への挑戦）</h4>
              <p className="leading-relaxed mb-2">
                現在はVercelのフルマネージド環境（PaaS）を利用してデプロイやSSL更新を自動化していますが、事業会社の社内SEとして既存の自社サーバー（IaaS/オンプレミス）を運用・改善するスキルを身につけるため、以下のインフラ構築に挑戦する予定です。
              </p>
              <ul className="list-disc list-outside ml-4 space-y-2">
                <li className="pl-1">
                  <span className="font-bold text-slate-800">AWS環境（EC2 / RDS）への完全移行:</span> 
                  インフラ層から自力でWebサーバー（Nginx等）とデータベースを構築・運用する。
                </li>
                <li className="pl-1">
                  <span className="font-bold text-slate-800">SSL証明書更新の自力自動化:</span> 
                  昨今の「SSL有効期限90日化」のトレンドを見据え、Let's EncryptとCertbotを用いた証明書の自動更新パイプラインをLinuxサーバー上に構築し、手動運用の限界を技術で解決する手法を体得する。
                </li>
                <li className="pl-1">
                  <span className="font-bold text-slate-800">バックエンドのAPI分離:</span> 
                  軽量フレームワーク「Hono」を導入し、フロントエンドとバックエンドを完全に分離したマイクロサービスアーキテクチャへ進化させる。
                </li>
              </ul>
            </div>
          </div>
        )
      },
      { 
        title: "データドリブンな改善運用（GA4 / GTM / Clarityによる行動分析）", 
        content: (
          <div className="space-y-6 text-sm text-slate-700">
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-4">
              <p className="text-blue-800 text-xs font-bold flex items-center gap-1.5">
                <span>💡</span> 導入の目的
              </p>
              <p className="text-blue-700 mt-1 leading-relaxed text-xs">
                本サイトは「作って終わり」ではなく、実際のユーザー（採用担当者様）の行動データを分析し、UI/UXを継続的に改善するためのテストベッドとして運用しています。SPA（単一ページ）の特性に合わせ、GTMを用いた<span className="font-bold">SPAに最適化したイベントトラッキング</span>（定量分析）に加え、Microsoft Clarityを導入したヒートマップ・セッション録画（定性分析）を組み合わせることで、ユーザーの心理に寄り添ったデータドリブンな改善環境を構築しています。
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-3">トラッキングプラン（計測設計の一部）</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider">
                      <th className="p-3 border-b border-slate-200 font-bold whitespace-nowrap">計測イベント</th>
                      <th className="p-3 border-b border-slate-200 font-bold whitespace-nowrap">トリガー（GTM / Next.js）</th>
                      <th className="p-3 border-b border-slate-200 font-bold">分析の目的・仮説</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-800 whitespace-nowrap">読了率の測定</td>
                      <td className="p-3 text-slate-600">スクロール深度（50%, 90%）</td>
                      <td className="p-3 text-slate-600 leading-relaxed">コンテンツ量が適切か、途中で離脱されていないかの検証。</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-800 whitespace-nowrap">詳細情報の需要</td>
                      <td className="p-3 text-slate-600">各アコーディオンの展開</td>
                      <td className="p-3 text-slate-600 leading-relaxed">どのプロジェクトの技術詳細が最も読まれているかの分析。<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-[10px]">data-accordion-name</code>属性を付与し、展開された要素を正確に特定。</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-800 whitespace-nowrap">複雑なUI操作の計測</td>
                      <td className="p-3 text-slate-600">カスタムイベント（Next.jsから送信）</td>
                      <td className="p-3 text-slate-600 leading-relaxed">標準機能では計測が難しい操作を、コード側からGTMへ直接データを送信（<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-[10px]">DataLayer</code>）して正確に把握。</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-800 whitespace-nowrap">デッドクリック検知</td>
                      <td className="p-3 text-slate-600">リンク・ボタン以外のクリック</td>
                      <td className="p-3 text-slate-600 leading-relaxed">ユーザーが「クリックできる」と誤認しているUI（無効なクリック）を特定し、誤解を与えないデザインへ修正するための検知。</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">保守性・拡張性を考慮した計測設計</h4>
              <p className="leading-relaxed mb-2">
                コンテンツの追加や変更のたびにGTMの設定を修正する「運用コスト」を省くため、フロントエンドの実装と連携した汎用的な計測設計を行っています。
              </p>
              <ul className="list-disc list-outside ml-4 space-y-2">
                <li className="pl-1"><span className="font-bold text-slate-800">動的なデータ属性の付与:</span> アコーディオン展開時、Reactの配列データから <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">data-accordion-name</code> を自動生成してGTMへ渡す仕組みを構築。プロジェクトを追加してもGTM側の修正は一切不要です。</li>
                <li className="pl-1"><span className="font-bold text-slate-800">汎用トリガーの活用:</span> ページ内リンク（<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">#</code>から始まるURL）のクリックを正規表現で一括検知するトリガーを作成し、メニュー追加時の運用コストをゼロに抑えています。</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">定性分析とUX改善（Microsoft Clarityの活用）</h4>
              <p className="leading-relaxed mb-2">
                GA4の数値データ（定量）だけでは見えない「なぜ離脱したか」「どこで迷ったか」を深掘りするため、Microsoft Clarityを導入しGA4と統合しています。
              </p>
              <ul className="list-disc list-outside ml-4 space-y-2">
                <li className="pl-1"><span className="font-bold text-slate-800">ヒートマップ分析:</span> ユーザーのスクロール到達率や、クリックが集中している箇所を視覚的に把握。</li>
                <li className="pl-1"><span className="font-bold text-slate-800">セッション録画:</span> デッドクリックやレイジクリック（怒りの連打）が発生したセッションの録画を確認し、UIのボトルネックを特定。</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">今後の改善サイクル</h4>
              <p className="leading-relaxed">
                例えば「特定のアコーディオンの展開率が著しく低い（GA4）」というデータが得られた場合、Clarityの録画データを確認して「見出しが目立たず素通りされている」などの原因を特定します。そこから「見出しのデザインや文言を修正する」という仮説を立てて実装し、再度計測を行うといった、<span className="font-bold text-slate-800">推測に頼らない、データに裏付けられたPDCAサイクル</span>を回していきます。
              </p>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "python-automation",
    title: "9. Pythonによる業務準備自動化", // ← 8から9に変更
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
  },
  {
    id: "tailscale-vpn",
    title: "10. Tailscaleによる自宅VPN環境の構築とネットワーク検証", // ← 9から10に変更
    badge: "学習・技術キャッチアップ事例",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    summary: "外出先から自宅LANへ安全にアクセスできる環境の構築と、ネットワークの仕組み（VPN、ルーティング、プロトコル）を学習するため、Tailscaleを用いたVPN環境を構築しました。単なるツールの導入にとどまらず、Subnet Routerの構成やWiresharkを用いたパケット解析など、原因切り分けと仕組みの理解に重点を置いた検証を実施しました。",
    sections: [
      { 
        title: "背景・目的", 
        fullWidth: true,
        items: [
          "外出先から自宅LANへ安全にアクセスできる環境を構築したかった",
          "単なるリモート接続ではなく、VPNやネットワークの仕組みそのものを学習する目的があった",
          "将来的にはDockerやRaspberry Piによる自宅サーバー構築も視野に入れている"
        ] 
      },
      { 
        title: "環境構成", 
        fullWidth: true,
        content: (
          <div className="space-y-2 text-sm text-slate-700">
            <p><span className="font-bold text-slate-800">ネットワーク:</span> ONU → NTT貸与ルーター → AirMac Extreme（ブリッジモード） → Windows PC</p>
            <p><span className="font-bold text-slate-800">クライアント:</span> Windows, iPhone</p>
            <p><span className="font-bold text-slate-800">VPN:</span> Tailscale</p>
          </div>
        )
      },
      { 
        title: "実施内容と検証結果", 
        fullWidth: true,
        content: (
          <div className="space-y-4 text-sm text-slate-700">
            <div>
              <p className="font-bold text-slate-800 mb-1">1. TailDropによるファイル転送</p>
              <p className="leading-relaxed">Windows⇔iPhone間の双方向転送を確認。途中で保存場所が分からず調査し、WindowsはDownloadsフォルダ、iPhoneは「このiPhone内→Tailscale」に保存される仕様を把握しました。</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">2. Subnet Routerの構築とLANアクセス</p>
              <p className="leading-relaxed">Windows PCをSubnet Routerとして構成。iPhoneからTailscaleのIP（100.x.x.x）ではなく、自宅LANのローカルIP（192.168.10.x）で共有フォルダにアクセスできることを確認し、「Tailscaleネットワークではなく、自宅LANへ参加している」というルーティングの概念を体感しました。</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">3. DIGA（ブルーレイレコーダー）の宅外視聴検証</p>
              <p className="leading-relaxed">宅外（4G回線）からライブ放送・録画番組の再生に成功。Subnet Router経由で同一LAN内として認識されたことを実証しました。</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">4. IoT家電（eRemote mini）の通信解析</p>
              <p className="leading-relaxed">VPN経由での操作可否を検証。ARP、ping、TCP/UDPポートの疎通確認、Wiresharkによるパケット解析を実施。結果としてVPN経由での操作は不可と判明しましたが、「なぜ使えないのか」をネットワーク層から切り分ける手法を実践しました。</p>
            </div>
          </div>
        )
      },
      { 
        title: "学んだこと", 
        fullWidth: true,
        items: [
          "VPNおよびSubnet Routerの仕組みと「LANへ参加する」という概念",
          "CIDR表記（/24）やルーティングの基礎",
          "ARP、ICMP、TCP、UDP、ポート番号など、ネットワークプロトコルの役割",
          "Wiresharkを用いたパケット解析と、原因を推測・特定するための検証手法"
        ] 
      },
      { 
        title: "今後の展望", 
        fullWidth: true,
        items: [
          "Raspberry Piの導入とDocker環境の構築",
          "Subnet RouterをWindowsからRaspberry Piへ移行し、24時間稼働のVPN環境を構築",
          "自宅サーバーの構築と、ネットワーク設計への理解の深化"
        ] 
      }
    ],
    accordions: [
      { 
        title: "技術的な詳細（Subnet Router構築とルーティング）", 
        content: (
          <div className="space-y-4 text-sm text-slate-700">
            <p className="leading-relaxed">
              PowerShellを用いてWindows PCをSubnet Routerとして構成しました。単にコマンドを打つだけでなく、ネットワークの状態を確認しながら進めました。
            </p>
            <ul className="list-disc list-outside ml-4 space-y-2">
              <li className="pl-1"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">ipconfig</code> や <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">tailscale status</code> で現在のネットワーク状態を把握。</li>
              <li className="pl-1"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">tailscale set --advertise-routes=192.168.10.0/24</code> を実行し、自宅LANのサブネットをTailscaleネットワークに広告。この際、<code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">192.168.10.0/24</code> というCIDR表記の意味（サブネットマスク）を理解した上で設定。</li>
              <li className="pl-1"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">tailscale debug prefs</code> で Advertise Routes の状態が正しく反映されているかを確認。</li>
            </ul>
          </div>
        )
      },
      { 
        title: "技術的な詳細（eRemote miniの通信解析プロセス）", 
        content: (
          <div className="space-y-4 text-sm text-slate-700">
            <p className="leading-relaxed">
              IoT家電（eRemote mini）をVPN経由で操作できるか検証するため、以下の手順で通信の切り分けを行いました。「使えなかった」という結果で終わらせず、原因を特定するプロセスを重視しました。
            </p>
            <ol className="list-decimal list-outside ml-4 space-y-2">
              <li className="pl-1"><span className="font-bold text-slate-800">存在確認:</span> MACアドレスを特定し、ARPテーブルと <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">ping</code> でLAN上に存在することを確認。</li>
              <li className="pl-1"><span className="font-bold text-slate-800">TCPポートの疎通確認:</span> PowerShellの <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">Test-NetConnection</code> を使用し、HTTP/HTTPS（80/443）や特定ポート（7680等）へのアクセスを検証。HTTP/HTTPSでは応答がなく（Web UIを持たない可能性）、TCP 7680ではRST（リセット）応答が返ることを確認。</li>
              <li className="pl-1"><span className="font-bold text-slate-800">パケット解析:</span> Wiresharkを導入し、スマホアプリから操作した際のUDP通信をキャプチャして解析。</li>
            </ol>
            <div className="bg-slate-50 border border-slate-200 rounded-md p-4 mt-2">
              <p className="font-bold text-slate-800 mb-1">結論</p>
              <p className="leading-relaxed text-slate-600">
                通信方式（ブロードキャストやマルチキャストの利用）やクラウド側の仕様により、単純なL3 VPN（ルーティング）経由での直接操作は困難であると判断しました。
              </p>
            </div>
          </div>
        )
      }
    ]
  }
];

// ▼▼▼ プロジェクトカードを描画する共通コンポーネント ▼▼▼
const ProjectCard = ({ p, isPickup = false, indexId }: { p: Project; isPickup?: boolean; indexId: string }) => {
  return (
    <div id={p.id} className="scroll-mt-24 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-6 sm:p-8 flex flex-col flex-1 relative">
        
        {/* ▼ 追加：右上の「目次に戻る」リンク ▼ */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
          <a 
            href={`#${indexId}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(indexId);
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1 bg-slate-50 hover:bg-blue-50 px-2 py-1 rounded border border-slate-100"
          >
            ↑ 目次に戻る
          </a>
        </div>
        {/* ▲ 追加ここまで ▲ */}

        <div className="mb-4 pr-24"> {/* 右上のボタンと被らないように pr-24 を追加 */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {isPickup && (
              <span className="inline-block rounded-full px-3 py-1 text-xs font-bold border bg-yellow-100 text-yellow-800 border-yellow-200">
                🌟 PICKUP
              </span>
            )}
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold border ${p.badgeColor}`}>
              {p.badge}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">{p.title}</h3>
        </div>

        <p className="text-sm text-slate-600 mb-6 leading-relaxed pb-6 border-b border-slate-100">
          {p.summary}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
            {p.accordions.map((acc: Accordion) => (
              <details key={acc.title} className="text-sm group">
                <summary data-accordion-name={`Project: ${p.title} - ${acc.title}`} className="list-none [&::-webkit-details-marker]:hidden cursor-pointer text-blue-600 hover:text-blue-700 font-bold transition-colors duration-200 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 inline-flex items-center">
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
  );
};
// ▲▲▲ コンポーネント定義ここまで ▲▲▲

export default function ProjectsSection() {
  const pickupProjects = projects.slice(0, 3);
  const otherProjects = projects.slice(3);

  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleOpenAccordion = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (detailsRef.current) {
      detailsRef.current.open = true;
      const y = detailsRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

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

        {/* 冒頭の宣言文（期待値コントロール） */}
        <div className="mb-10 bg-blue-50 border border-blue-200 rounded-lg p-6 sm:p-8 shadow-sm">
          <h3 className="text-blue-800 font-bold text-base sm:text-lg mb-4 flex items-center gap-2">
            <span>💡</span> 本セクションをご覧いただくにあたって（私の開発スタンス）
          </h3>
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <p>
              以下のプロジェクト群は、「ゼロから私がタイピングして構築したコード」ではありません。コーディング（記述）の約9割は、生成AIを活用して出力しています。
            </p>
            <p>私が注力し、コントロールしているのは以下の領域です。</p>
            <ul className="list-disc list-outside ml-5 space-y-1.5">
              <li className="pl-1">「現場の課題」をAIとの壁打ちを通じてシャープな要件へと落とし込み、最終決定を下すこと（要件定義）</li>
              <li className="pl-1">AIが出力したコードが「セキュリティ要件やビジネスロジックを満たしているか」の検証・テスト</li>
              <li className="pl-1">複数の技術を組み合わせ、実運用に耐えうる形に組み上げるディレクション</li>
            </ul>
            <p>
              ツール（AI）を正しく指揮すれば、未経験の技術領域であっても短期間でここまで形にし、課題解決に直結させることができる。本セクションは、その「圧倒的な自走力と適応力の検証結果」としてご覧いただけますと幸いです。
            </p>
          </div>
        </div>

        {/* ▼▼▼ メインの目次（id="projects-index" を追加） ▼▼▼ */}
        <div id="projects-index" className="scroll-mt-24 mb-10 bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm max-w-3xl mx-auto">
          <h3 className="text-slate-800 font-bold text-base mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
            <span>📋</span> 掲載プロジェクト一覧
          </h3>
          <ul className="space-y-3 text-sm text-slate-700">
            {pickupProjects.map((p) => (
              <li key={p.id}>
                <a href={`#${p.id}`} onClick={(e) => handleScrollTo(e, p.id)} className="hover:text-blue-600 transition-colors flex items-start gap-1.5 group">
                  <span className="shrink-0 text-slate-400 mt-0.5">▪</span>
                  <span className="font-bold text-yellow-600 shrink-0">🌟 PICKUP:</span> 
                  <span className="underline decoration-slate-200 underline-offset-4 group-hover:decoration-blue-400">{p.title.replace(/^[0-9]+\.\s*/, '')}</span>
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href="#more-projects-accordion" onClick={handleOpenAccordion} className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-800 font-bold transition-colors bg-blue-50 hover:bg-blue-100 border border-blue-100 px-3 py-2 rounded-md shadow-sm">
                <span className="text-blue-600">＋</span> さらに7件の個人開発・技術キャッチアップ事例（クリックで展開して表示）
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-10 max-w-3xl mx-auto">
          
          {/* 常時表示（上位3件）のレンダリング */}
          {pickupProjects.map((p) => (
            <ProjectCard key={p.id} p={p} isPickup={true} indexId="projects-index" />
          ))}

          {/* 残り7件を格納するアコーディオン */}
          <div className="pt-4">
            <details 
              id="more-projects-accordion" 
              ref={detailsRef}
              className="group bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden scroll-mt-24"
            >
              <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer p-6 sm:p-8 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-50 transition-colors duration-200">
                <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-blue-700">
                  <span className="inline-block transition-transform group-open:rotate-90">▶</span>
                  ＋ さらに7件の実績を見る（個人開発・技術キャッチアップ事例）
                </div>
                <p className="mt-2 ml-6 text-sm text-slate-500 font-normal leading-relaxed">
                  収録内容：④ 予定逆算アプリ / ⑤ 忘れ物チェッカー Pro / ⑥ Webサイト情報チェッカー / ⑦ マイクロサービス連携デモ / ⑧ ポートフォリオ刷新 / ⑨ Python業務自動化 / ⑩ Tailscale VPN構築
                </p>
              </summary>
              <div className="p-6 sm:p-8 border-t border-slate-200 bg-slate-50/50">
                
                {/* アコーディオン内のミニ目次 */}
                <div id="accordion-index" className="scroll-mt-24 mb-8 bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                  <h4 className="text-slate-800 font-bold text-sm mb-3 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span>📂</span> 個人開発・技術キャッチアップ事例 一覧
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {otherProjects.map(p => (
                      <li key={p.id}>
                        <a href={`#${p.id}`} onClick={(e) => handleScrollTo(e, p.id)} className="hover:text-blue-600 transition-colors flex items-start gap-1.5">
                          <span className="shrink-0 text-slate-400 mt-0.5">▪</span>
                          <span className="underline decoration-slate-200 underline-offset-4 hover:decoration-blue-400">{p.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-10">
                  {/* アコーディオン内のプロジェクトレンダリング */}
                  {otherProjects.map((p) => (
                    <ProjectCard key={p.id} p={p} indexId="accordion-index" />
                  ))}
                </div>
                
                {/* 全体を閉じるボタン */}
                <div className="mt-10 pt-6 border-t border-slate-200 text-center">
                  <button
                    onClick={(e) => {
                      const details = e.currentTarget.closest('details');
                      if (details) {
                        details.removeAttribute('open');
                        const y = details.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-md px-6 py-3 bg-white border border-slate-300 shadow-sm hover:shadow-md"
                  >
                    ▲ 実績一覧を閉じる
                  </button>
                </div>
                
              </div>
            </details>
          </div>

        </div>
      </div>
    </section>
  );
}