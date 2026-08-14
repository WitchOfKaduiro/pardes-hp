import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type NewsCategory = "milestone" | "recruit" | "poc" | "media";

export type NewsArticle = {
  slug: string;
  locale: string;
  title: string;
  category: NewsCategory;
  datePublished: string;
  dateModified: string;
  excerpt: string;
  content: string;
};

const NEWS_DIR = path.join(process.cwd(), "content", "news");

export function getAllNewsSlugs(locale: string): string[] {
  const dir = path.join(NEWS_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getNewsArticle(
  locale: string,
  slug: string
): NewsArticle | null {
  const filePath = path.join(NEWS_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    locale,
    title: data.title,
    category: data.category,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    excerpt: data.excerpt,
    content: content.trim(),
  };
}

export function getAllNews(locale: string): NewsArticle[] {
  return getAllNewsSlugs(locale)
    .map((slug) => getNewsArticle(locale, slug))
    .filter((article): article is NewsArticle => article !== null)
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}

/**
 * JA/ENの記事slugが1対1で揃っているかを検証する。
 * 揃っていない場合はビルドを失敗させ、翻訳漏れを早期に検知する
 * （REQ-DESIGN-07 の全ページ完全対訳要件を担保するため）。
 */
export function assertNewsParity() {
  const jaSlugs = new Set(getAllNewsSlugs("ja"));
  const enSlugs = new Set(getAllNewsSlugs("en"));
  const missingInEn = [...jaSlugs].filter((slug) => !enSlugs.has(slug));
  const missingInJa = [...enSlugs].filter((slug) => !jaSlugs.has(slug));
  if (missingInEn.length > 0 || missingInJa.length > 0) {
    throw new Error(
      "News article parity check failed.\n" +
        (missingInEn.length
          ? `Missing EN translations for: ${missingInEn.join(", ")}\n`
          : "") +
        (missingInJa.length
          ? `Missing JA translations for: ${missingInJa.join(", ")}\n`
          : "")
    );
  }
}

assertNewsParity();
