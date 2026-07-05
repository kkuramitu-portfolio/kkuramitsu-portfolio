import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schema";
import { verifyRecaptcha, notifySlack, sendAutoReplyEmail } from "@/lib/contact-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zodによる厳格なバリデーション
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "入力内容に誤りがあります", details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    // 2. ハニーポット検証 (bot_fieldに値があればスパムとみなす)
    if (data.bot_field) {
      console.warn("Honeypot triggered");
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // 3. reCAPTCHA v3 トークン検証
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) throw new Error("RECAPTCHA_SECRET_KEY is not set");
    
    const isHuman = await verifyRecaptcha(data.recaptchaToken, recaptchaSecret);
    if (!isHuman) {
      return NextResponse.json({ error: "スパム判定されました。再度お試しください。" }, { status: 403 });
    }

    // 4. Slack Webhook通知
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL_CONTACT;
    if (slackWebhookUrl) {
      await notifySlack(data, slackWebhookUrl).catch(console.error);
    }

    // 5. XREAのSMTPによる自動返信メール送信
    await sendAutoReplyEmail(data).catch(console.error);

    return NextResponse.json({ success: true, message: "送信完了しました" }, { status: 200 });

  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}