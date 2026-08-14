import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTranslations,
  getFormatter,
  setRequestLocale,
} from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import JsonLd from "@/components/seo/JsonLd";
import InteriorHero from "@/components/layout/InteriorHero";
import { buildBreadcrumbJsonLd, buildArticleJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/config";
import { getAllNewsSlugs, getNewsArticle } from "@/lib/news";
import { routing } from "@/lib/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllNewsSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getNewsArticle(locale, slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getNewsArticle(locale, slug);
  if (!article) notFound();

  const t = await getTranslations("news");
  const format = await getFormatter();

  const categoryLabels: Record<string, string> = {
    milestone: t("categories.milestone"),
    recruit: t("categories.recruit"),
    poc: t("categories.poc"),
    media: t("categories.media"),
  };

  const url = `${SITE_URL}/${locale}/news/${slug}`;

  return (
    <div className="pardes-interior-page pardes-news-detail-page">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Pardes", url: `${SITE_URL}/${locale}` },
          { name: t("meta.title"), url: `${SITE_URL}/${locale}/news` },
          { name: article.title, url },
        ])}
      />
      <JsonLd
        data={buildArticleJsonLd({
          headline: article.title,
          description: article.excerpt,
          datePublished: article.datePublished,
          dateModified: article.dateModified,
          url,
        })}
      />

      <InteriorHero title={article.title} />

      <div className="pardes-interior-layout pardes-news-detail-layout">
        <aside className="pardes-interior-index" aria-label="News sections">
          <p className="pardes-interior-index__label font-en">News</p>
          <nav>
            <a href={`/${locale}/news`}>{t("meta.title")}</a>
            <a href="#article-content">{categoryLabels[article.category]}</a>
          </nav>
        </aside>

        <main className="pardes-interior-main pardes-news-detail-main">
          <p className="pardes-interior-kicker font-en">
            {categoryLabels[article.category]}
          </p>
          <p className="pardes-news-detail__date font-kozuka">
            {t("list.publishedOn", {
              date: format.dateTime(new Date(article.datePublished), {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }),
            })}
            {article.dateModified !== article.datePublished && (
              <>
                {" / "}
                {t("list.updatedOn", {
                  date: format.dateTime(new Date(article.dateModified), {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }),
                })}
              </>
            )}
          </p>
          <article
            id="article-content"
            className="pardes-news-detail__content prose max-w-none font-kozuka"
          >
            <MDXRemote source={article.content} />
          </article>
        </main>
      </div>
    </div>
  );
}
