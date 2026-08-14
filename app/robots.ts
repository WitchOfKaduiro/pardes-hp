import type { MetadataRoute } from "next";
import { SITE_URL, AI_CRAWLERS } from "@/lib/seo/config";

/**
 * GEO/LLMO対策として、AI学習用クローラーとAI対話時のリアルタイム参照
 * クローラーを明示的に許可する（aio_seo_geo_llmo_strategy.md 6.2.1）。
 * 許可対象を増やす場合は lib/seo/config.ts の AI_CRAWLERS を編集するだけでよい。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
