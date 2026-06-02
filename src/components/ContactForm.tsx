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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center">お問い合わせ</h2>

      {submitResult && (
        <div className={`p-4 mb-6 rounded ${submitResult.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {submitResult.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ハニーポット (人間には見えない) */}
        <div style={{ display: "none" }} aria-hidden="true">
          <input type="text" {...register("bot_field")} tabIndex={-1} autoComplete="off" />
        </div>

        {/* お名前 */}
        <div>
          <label className="block font-medium mb-1">お名前 <span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register("name")}
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="山田 太郎"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* メールアドレス */}
        <div>
          <label className="block font-medium mb-1">メールアドレス <span className="text-red-500">*</span></label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="taro@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* メッセージ */}
        <div>
          <label className="block font-medium mb-1">メッセージ <span className="text-red-500">*</span></label>
          <textarea
            {...register("message")}
            rows={5}
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="お問い合わせ内容をご記入ください（1000文字以内）"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>

        {/* ファイルアップロード (寸止めデモ) */}
        <div className="border-t border-b py-4 my-6">
          <label className="block font-medium mb-2">添付ファイル (UI実装デモ)</label>
          {!demoFile ? (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded p-6 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-gray-600">ここにファイルをドラッグ＆ドロップするか、クリックして選択してください</p>
              <p className="text-sm text-gray-400 mt-2">対応形式: PDF, JPG, PNG (最大2MB)</p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-gray-50 border rounded">
              <div className="truncate pr-4">
                <span className="font-medium">{demoFile.name}</span>
                <span className="text-sm text-gray-500 ml-2">({(demoFile.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
              <button
                type="button"
                onClick={() => setDemoFile(null)}
                className="text-red-500 hover:text-red-700 font-bold px-2"
              >
                ✕
              </button>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-3 leading-relaxed">
            🔒 <strong>ファイルアップロード機能に関するセキュリティ方針：</strong><br />
            本フォームではUI実装のデモとしてアップロード機能を設けていますが、マルウェア感染およびストレージ枯渇攻撃を防ぐため、送信時にファイル本体はサーバーへアップロードされず安全に破棄される設計としております。
          </p>
        </div>

        {/* 同意チェックボックス */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              {...register("consent")}
              className="mt-1 mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 leading-relaxed">
              ⚠️ 企業コンプライアンスおよびエージェント様との契約遵守の観点から、本フォーム経由での直接のスカウトや採用に関するご連絡には一切応じかねます。採用に関するご連絡は必ず、ご登録いただいている転職エージェント様経由でお願いいたします。
            </span>
          </label>
          {errors.consent && <p className="text-red-500 text-sm mt-2 ml-8">{errors.consent.message}</p>}
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={!isValid || !isConsentChecked || isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "送信中..." : "同意して送信する"}
        </button>
      </form>
    </div>
  );
}