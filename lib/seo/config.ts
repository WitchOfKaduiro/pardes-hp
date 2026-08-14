/**
 * ドメイン未確定のためプレースホルダー。
 * ドメイン確定後は Vercel の環境変数 NEXT_PUBLIC_SITE_URL を実ドメインに差し替えるだけでよい。
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pardes-corp-site.example.com";

export const SITE_NAME = "Pardes Inc.";
export const SITE_NAME_JA = "パルデス";

export const SITE_DESCRIPTION_JA =
  "自由意思を持つ汎用人工知能（AGI）の実現を目指し、生物学的妥当性の高いニューラルネットワーク「BiNet」を開発するAIスタートアップ";
export const SITE_DESCRIPTION_EN =
  "Pardes Inc. is an AI startup developing BiNet, a biologically-plausible neural network, in pursuit of AGI with free will.";

/**
 * GEO/LLMO対策として、AI学習用クローラーとAI対話時のリアルタイム参照クローラーを
 * 明示的に許可する（aio_seo_geo_llmo_strategy.md 6.2.1）。
 * 新しいクローラーを許可する場合はこの配列に追加するだけでよい。
 */
export const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
] as const;

/**
 * Google Search Console 所有権確認用（HTMLタグ方式）。
 * ドメイン確定・GSC登録後に実際の確認コードを設定する。
 */
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "";

export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";
