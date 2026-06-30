"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { useReCaptcha } from "next-recaptcha-v3";
import {
  contactSchema,
  contactFormSchema,
  ContactFormData,
} from "@/lib/schema";
import { sendGTMEvent } from '@next/third-parties/google';

export default function ContactForm() {
  const { executeRecaptcha } = useReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [demoFile, setDemoFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues: { consent: undefined },
  });

  const isConsentChecked = watch("consent");

  // ファイルアップロード（寸止めデモ）の処理
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setDemoFile(acceptedFiles[0]);
      sendGTMEvent({ event: 'upload_demo_file', file_name: acceptedFiles[0].name });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 2 * 1024 * 1024, // 2MB
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // 1. reCAPTCHAトークンの取得
      const token = await executeRecaptcha("contact_form");
      if (!token) throw new Error("reCAPTCHAの検証に失敗しました");

      // 2. APIへ送信（※demoFileは意図的に送信データに含めず破棄します）
      const payload = {
        ...data,
        recaptchaToken: token,
        fileName: demoFile ? demoFile.name : undefined
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "送信に失敗しました");
      }

      setSubmitResult({ type: "success", message: "メッセージを送信しました。自動返信メールをご確認ください。" });
      reset();
      setDemoFile(null);
    } catch (error: any) {
      setSubmitResult({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h3 className="text-xl font-bold text-emerald-600 mb-4">Contact Form: セキュアなお問い合わせ</h3>
      <p className="mb-4 text-slate-600 text-sm leading-relaxed">スパム対策、バリデーション、ファイル無害化など、エンタープライズ水準のセキュリティを実装したお問い合わせフォームです。</p>
      <p>このフォームは実際に稼働しているデモであり、 送信内容はSlackへ通知され、自動返信メールも送信されます。</p>
      <p>テスト送信やポートフォリオへのフィードバックも歓迎しておりますので、お気軽にご利用ください。</p>
      <p>※入力いただいた情報は、お問い合わせ対応および自動返信以外の目的では使用しません。</p>
      <p>※お名前はニックネームでも問題ありません。</p>
      {/* アコーディオン */}
      <details className="mb-6 border-t border-slate-100 pt-4 group">
        <summary data-accordion-name="Contact: セキュリティ・ガバナンス" className="list-none [&::-webkit-details-marker]:hidden cursor-pointer w-full text-left font-bold text-slate-700 p-2 hover:bg-slate-50 rounded transition-colors flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 select-none">
          <span className="inline-block transition-transform duration-200 group-open:rotate-90 mr-2">▶</span>
          この機能のセキュリティ対策・ガバナンス・運用設計について
        </summary>
        <div className="p-4 bg-slate-50 rounded-md mt-2 text-xs text-slate-600 space-y-3 border border-slate-200">
          <p><strong className="text-slate-800">システム連携によるリアルタイム監視（Slack Webhook / ChatOps）:</strong> モダンな開発・運用フロー（ChatOps）を想定し、バックエンドでの処理完了と同時に、SlackのIncoming Webhookを経由して専用チャンネルへ通知を送信する仕組みを実装しています。お問い合わせ内容やシステムの挙動をリアルタイムに検知することで、迅速な対応と運用監視の自動化を実現しています。また、フォーム送信者への自動返信には、Nodemailerを用いて独自ドメインのSMTPサーバーと非同期で連携させています。実務における『外部SaaSと自社インフラのハイブリッド構成』を想定し、適材適所で技術を組み合わせた堅牢なアーキテクチャを構築しています。</p>
          <p><strong className="text-slate-800">スパム・Bot攻撃の多層防御（reCAPTCHA v3 & ハニーポット）:</strong> 悪意のあるBotによる大量のスパム送信やフォームの悪用を防ぐため、二段構えの防御を実装しています。Google reCAPTCHA v3によるスコアベースの振る舞い検知（バックエンドでのトークン検証）に加え、CSSで隠蔽した罠フィールド（ハニーポット）を設置。Bot特有の「すべての入力欄を埋める」挙動を検知し、不正なリクエストを即座に遮断（400/403エラー）します。</p>
          <p><strong className="text-slate-800">厳格なスキーマバリデーション（Zodの導入）:</strong> 予期せぬデータ型や異常に長い文字列の送信によるバッファオーバーフロー、およびバックエンドへのインジェクション攻撃を防ぐため、フロントエンドとバックエンドで共通の Zod スキーマによる検証を徹底しています。型や文字数制限を厳密に定義し、不正なペイロードがAPIのビジネスロジックに到達する前に弾く「フェイルセーフ」な設計としています。</p>
          <p><strong className="text-slate-800">マルウェア感染およびストレージ枯渇対策（ファイルアップロードの無害化）:</strong> 悪意のある実行ファイル（マルウェア）のアップロードや、巨大なファイルの連続送信によるサーバーのストレージ枯渇攻撃（DoS）を完全に防ぐための対策です。UI上はドラッグ＆ドロップ可能なアップロード機能を実装していますが、送信時にファイル本体は安全に破棄し、「ファイル名のみ」をログとして送信する設計を採用。UX（ユーザー体験）を損なわずにゼロトラストなファイルハンドリングを実現しています。</p>
          <p><strong className="text-slate-800">コンプライアンスとガバナンスのシステム的強制:</strong> 企業コンプライアンスやエージェント様との契約違反に繋がる「直接のスカウト連絡」を防ぐため、送信前に注意事項への同意を必須化しています。フロントエンドでのボタン非活性化（UI制御）だけでなく、バックエンドのスキーマ検証でも同意フラグ（consent: true）を厳格に要求し、APIへの直接攻撃（cURL等による送信）であってもガバナンスを強制できる堅牢な設計としています。</p>
          <p><strong className="text-slate-800">CORS制御とセキュアなAPI通信:</strong> 本フォームのAPI（Next.js Route Handlers）は、別ドメイン（HTML版ポートフォリオ）からの呼び出しを想定したマイクロサービス的な設計となっています。そのため、next.config.ts にて厳密なCORS（Cross-Origin Resource Sharing）ヘッダーを設定し、許可されたメソッドとヘッダーのみを受け付けることで、CSRF（クロスサイトリクエストフォージェリ）や不正なオリジンからのAPI悪用を防止しています。</p>
        </div>
      </details>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ハニーポット (人間には見えない) */}
        <div style={{ display: "none" }} aria-hidden="true">
          <input type="text" {...register("bot_field")} tabIndex={-1} autoComplete="off" />
        </div>

        {/* お名前 */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">お名前 <span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register("name")}
            className="w-full border border-slate-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="山田 太郎"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* メールアドレス */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-slate-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="taro@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* メッセージ */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">メッセージ <span className="text-red-500">*</span></label>
          <textarea
            {...register("message")}
            rows={5}
            className="w-full border border-slate-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            placeholder="お問い合わせ内容をご記入ください（1000文字以内）"
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        {/* ファイルアップロード (寸止めデモ) */}
        <div className="border-t border-b border-slate-200 py-5 my-6">
          <label className="block text-sm font-bold text-slate-700 mb-2">添付ファイル (UI実装デモ)</label>
          {!demoFile ? (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:bg-slate-50"
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-slate-600 text-sm">ここにファイルをドラッグ＆ドロップするか、クリックして選択してください</p>
              <p className="text-xs text-slate-400 mt-2">対応形式: PDF, JPG, PNG (最大2MB)</p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-md">
              <div className="truncate pr-4">
                <span className="font-medium text-sm text-slate-800">{demoFile.name}</span>
                <span className="text-xs text-slate-500 ml-2">({(demoFile.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
              <button
                type="button"
                onClick={() => setDemoFile(null)}
                className="text-red-500 hover:text-red-700 font-bold px-2 focus:outline-none"
              >
                ✕
              </button>
            </div>
          )}
          <div className="mt-3 p-3 bg-slate-100 rounded-md border border-slate-200">
            <p className="text-xs text-slate-600 leading-relaxed">
              <span className="mr-1">🔒</span> <strong>ファイルアップロード機能に関するセキュリティ方針：</strong><br />
              本フォームではUI実装のデモとしてアップロード機能を設けていますが、マルウェア感染およびストレージ枯渇攻撃を防ぐため、送信時にファイル本体はサーバーへアップロードされず安全に破棄される設計としております。
            </p>
          </div>
        </div>

        {/* 同意チェックボックス */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              {...register("consent")}
              onChange={(e) => {
                register("consent").onChange(e); // 元の処理を維持
                // ▼ 追加 ▼
                sendGTMEvent({ event: 'toggle_consent', status: e.target.checked ? 'checked' : 'unchecked' });
              }}
              className="mt-0.5 mr-3 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-xs text-slate-700 leading-relaxed">
              ⚠️ 企業コンプライアンスおよびエージェント様との契約遵守の観点から、本フォーム経由での直接のスカウトや採用に関するご連絡には一切応じかねます。採用に関するご連絡は必ず、ご登録いただいている転職エージェント様経由でお願いいたします。
            </span>
          </label>
          {errors.consent && <p className="text-red-500 text-xs mt-2 ml-7">{errors.consent.message}</p>}
        </div>

        {/* ★ 修正: 送信結果メッセージをボタンの直上に移動 ★ */}
        {submitResult && (
          <div className={`p-4 rounded-md text-sm font-bold text-center ${submitResult.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {submitResult.type === "success" ? "✅ " : "❌ "}
            {submitResult.message}
          </div>
        )}

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={!isValid || !isConsentChecked || isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition-colors hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSubmitting ? "送信中..." : "同意して送信する"}
        </button>
      </form>
    </div>
  );
}