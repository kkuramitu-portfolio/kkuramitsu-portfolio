import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "お名前は必須です").max(100, "お名前は100文字以内で入力してください"),
  email: z.string().email("正しいメールアドレスの形式で入力してください").max(255, "メールアドレスが長すぎます"),
  message: z.string().min(1, "メッセージは必須です").max(1000, "メッセージは1000文字以内で入力してください"),
  bot_field: z.string().optional(), // ハニーポット
  recaptchaToken: z.string().min(1, "reCAPTCHAトークンが取得できませんでした"),
  fileName: z.string().optional(),
  consent: z.literal(true, {
    message: "注意事項への同意が必要です",
  }),
});

export const contactFormSchema = contactSchema.omit({
  recaptchaToken: true,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactRequestData = z.infer<typeof contactSchema>;