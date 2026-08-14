import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/config";
import { routing } from "@/lib/i18n/routing";
import { getAllNewsSlugs } from "@/lib/news";

const STATIC_PATHS = [
  "",
  "/business",
  "/company",
  "/product",
  "/recruit",
  "/news",
  "/contact",
  "/legal/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    const languages = Object.fromEntries([
      ...routing.locales.map((locale) => [
        locale,
        `${SITE_URL}/${locale}${path}`,
      ]),
      ["x-default", `${SITE_URL}/${routing.defaultLocale}${path}`],
    ]);
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        alternates: { languages },
      });
    }
  }

  for (const locale of routing.locales) {
    for (const slug of getAllNewsSlugs(locale)) {
      entries.push({
        url: `${SITE_URL}/${locale}/news/${slug}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
