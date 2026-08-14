-- お問い合わせフォームの送信内容を保存するテーブル。
-- Vercel Postgres プロビジョニング後、一度だけ実行する。
-- 1年保持ポリシーは lib/contact/store.ts の purgeExpiredContactSubmissions() と
-- Vercel Cron（vercel.json）による定期実行で担保する。

CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  purpose TEXT NOT NULL,
  message TEXT NOT NULL,
  locale TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON contact_submissions (created_at);
