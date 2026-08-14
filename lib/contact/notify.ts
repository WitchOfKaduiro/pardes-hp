import { Resend } from "resend";
import type { ContactFormValues, ContactPurpose } from "./schema";

type StorableSubmission = Omit<ContactFormValues, "turnstileToken">;

const PURPOSE_LABELS: Record<ContactPurpose, string> = {
  poc: "PoCパートナー相談",
  recruit: "採用応募",
  media: "取材・メディア",
  other: "その他",
};

/**
 * 目的区分ごとに通知先を振り分ける（REQ-CONTACT-05）。
 * 個別の宛先が未設定の場合は CONTACT_EMAIL_DEFAULT にフォールバックする。
 */
function resolveRecipient(purpose: ContactPurpose): string | undefined {
  const byPurpose: Record<ContactPurpose, string | undefined> = {
    poc: process.env.CONTACT_EMAIL_POC,
    recruit: process.env.CONTACT_EMAIL_RECRUIT,
    media: process.env.CONTACT_EMAIL_MEDIA,
    other: undefined,
  };
  return byPurpose[purpose] ?? process.env.CONTACT_EMAIL_DEFAULT;
}

export async function notifyContactSubmission(values: StorableSubmission) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = resolveRecipient(values.purpose);

  if (!apiKey || !to) {
    console.warn(
      "[contact] RESEND_API_KEY or a recipient address is not set. Skipping email notification.",
      { purpose: values.purpose }
    );
    return;
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM ?? "Pardes Website <onboarding@resend.dev>",
    to,
    replyTo: values.email,
    subject: `[${PURPOSE_LABELS[values.purpose]}] ${values.name}様よりお問い合わせ`,
    text: [
      `氏名: ${values.name}`,
      `会社名・所属: ${values.company}`,
      `メールアドレス: ${values.email}`,
      `目的区分: ${PURPOSE_LABELS[values.purpose]}`,
      `言語: ${values.locale}`,
      "",
      "お問い合わせ内容:",
      values.message,
    ].join("\n"),
  });
}
