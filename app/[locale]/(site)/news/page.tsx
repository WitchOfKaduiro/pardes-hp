import type { Metadata } from "next";
import {
  getTranslations,
  getFormatter,
  setRequestLocale,
} from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { pageBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { getAllNews } from "@/lib/news";
import NewsList from "@/components/news/NewsList";
import InteriorHero from "@/components/layout/InteriorHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "news.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function NewsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const format = await getFormatter();
  const articles = getAllNews(locale);

  const categoryLabels = {
    all: t("categories.all"),
    milestone: t("categories.milestone"),
    recruit: t("categories.recruit"),
    poc: t("categories.poc"),
    media: t("categories.media"),
  } as const;

  return (
    <div className="pardes-interior-page pardes-news-page">
      <JsonLd data={pageBreadcrumbJsonLd(locale, "/news", t("meta.title"))} />

      <InteriorHero title={t("hero.heading")} />

      <main className="pardes-interior-main pardes-news-main">
        <div className="pardes-news-main__intro">
          <p className="pardes-interior-kicker font-en">News</p>
        </div>
        <div className="pardes-news-main__list">
          <NewsList
            articles={articles.map((article) => ({
              ...article,
              publishedLabel: t("list.publishedOn", {
                date: format.dateTime(new Date(article.datePublished), {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }),
              }),
            }))}
            categoryLabels={categoryLabels}
            emptyLabel={t("list.empty")}
            readMoreLabel={t("list.readMore")}
          />
        </div>
      </main>
    </div>
  );
}
