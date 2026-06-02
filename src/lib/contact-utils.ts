import { Resend } from "resend";
import { ContactFormData } from "./schema";

// reCAPTCHA v3 の検証
export async function verifyRecaptcha(token: string, secretKey: string): Promise<boolean> {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secretKey}&response=${token}`,
  });
  const data = await res.json();
  // スコアが0.5未満、またはsuccessがfalseの場合はスパム判定
  return data.success && data.score >= 0.5;
}

// Slackへの通知
export async function notifySlack(data: ContactFormData, webhookUrl: string): Promise<void> {
  const payload = {
    text: "🔔 ポートフォリオサイトから新しいお問い合わせがありました",
    attachments: [
      {
        color: "#36a64f",
        fields: [
          { title: "お名前", value: data.name, short: true },
          { title: "メールアドレス", value: data.email, short: true },
          { title: "メッセージ", value: data.message, short: false },
        ],
      },
    ],
  };

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Resendによる自動返信メール送信
export async function sendAutoReplyEmail(data: ContactFormData, apiKey: string): Promise<void> {
  const resend = new Resend(apiKey);

  const textBody = `
${data.name} 様

お問い合わせいただき、誠にありがとうございます。
以下の内容でメッセージを承りました。

--------------------------------------------------
【お名前】 ${data.name}
【メールアドレス】 ${data.email}
【メッセージ】
${data.message}
--------------------------------------------------

※本フォームはポートフォリオにおける「セキュアなフォーム実装デモ」を兼ねております。
先ほどご同意いただきました通り、コンプライアンスの観点から本フォーム経由での直接の採用連絡には返信いたしかねます。
採用に関するご連絡は必ず、ご登録いただいている転職エージェント様経由でお願いいたします。

何卒ご理解のほど、よろしくお願い申し上げます。
`;

const result = await resend.emails.send({
  from: "Your Portfolio <onboarding@resend.dev>",
  to: data.email,
  subject: "【自動返信】お問い合わせありがとうございます",
  text: textBody,
});
console.log("RESEND:", result);
if (result?.error) {
  throw new Error(result.error.message);
}
}