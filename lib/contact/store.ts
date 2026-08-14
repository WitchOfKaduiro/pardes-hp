import { sql } from "@vercel/postgres";
import type { ContactFormValues } from "./schema";

/**
 * お問い合わせ送信データの保存・保持期間管理（REQ-CONTACT-06、個人情報保持〜1年）。
 * 利用にはVercel Postgresのプロビジョニングと db/schema.sql の適用が必要。
 * POSTGRES_URL 未設定の場合は保存をスキップする（メール通知のみで運用するフォールバック）。
 */
const RETENTION_DAYS = 365;

type StorableSubmission = Omit<ContactFormValues, "turnstileToken">;

export async function saveContactSubmission(values: StorableSubmission) {
  if (!process.env.POSTGRES_URL) {
    console.warn(
      "[contact] POSTGRES_URL is not set. Skipping submission storage (email notification is still sent)."
    );
    return;
  }

  await sql`
    INSERT INTO contact_submissions (name, company, email, purpose, message, locale, created_at)
    VALUES (${values.name}, ${values.company}, ${values.email}, ${values.purpose}, ${values.message}, ${values.locale}, NOW())
  `;
}

/**
 * 保持期間（約1年）を超えたレコードを削除する。
 * Vercel Cron（vercel.json）から定期的に呼び出される想定。
 */
export async function purgeExpiredContactSubmissions() {
  if (!process.env.POSTGRES_URL) return { deleted: 0 };

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - RETENTION_DAYS);

  const result = await sql`
    DELETE FROM contact_submissions
    WHERE created_at < ${cutoff.toISOString()}
  `;
  return { deleted: result.rowCount ?? 0 };
}
