import type { Metadata } from "next";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import AboutLinks from "@/components/home/AboutLinks";
import ShowcaseCarousel from "@/components/home/ShowcaseCarousel";
import NewsTabs from "@/components/home/NewsTabs";
import RecruitTeaser from "@/components/home/RecruitTeaser";
import ContactPanel from "@/components/home/ContactPanel";
import type { AbstractVisualVariant } from "@/components/home/AbstractVisual";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAllNews, type NewsCategory } from "@/lib/news";

type AboutItem = {
  href: string;
  label: string;
  visual: AbstractVisualVariant;
};

type ShowcaseItem = {
  href: string;
  name: string;
  description: string;
};

type ContactPurpose = {
  tag: string;
  label: string;
  description: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteMeta = await getTranslations({ locale, namespace: "meta" });
  const homeMeta = await getTranslations({ locale, namespace: "home.meta" });
  const title = siteMeta("defaultTitle");
  const description = homeMeta("description");

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      images: ["/wp/wp-content/themes/matsuo/assets/images/pardes/ogp.png"],
    },
  };
}

async function HomeReactPage({ locale }: { locale: string }) {
  const t = await getTranslations("home");
  const newsT = await getTranslations("news");
  const format = await getFormatter();

  const recentArticles = getAllNews(locale).slice(0, 6);
  const latestArticle = recentArticles[0] ?? null;
  const aboutItems = t.raw("about.items") as AboutItem[];
  const showcaseItems = t.raw("showcase.items") as ShowcaseItem[];
  const contactPurposes = t.raw("contact.purposes") as ContactPurpose[];
  const categoryLabels = newsT.raw("categories") as Record<NewsCategory | "all", string>;

  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection
          eyebrow={t("hero.eyebrow")}
          headingLines={t("hero.heading").split("\n")}
          body={t("hero.body")}
          scrollCue={t("hero.scrollCue")}
          narrative={t.raw("hero.narrative") as string[]}
          recentUpdateLabel={t("hero.recentUpdateLabel")}
          latestNews={
            latestArticle
              ? { title: latestArticle.title, href: `/news/${latestArticle.slug}` }
              : null
          }
        />

        <AboutLinks
          heading={t("about.heading")}
          body={t("about.body")}
          items={aboutItems}
        />

        <ShowcaseCarousel
          eyebrow={t("showcase.eyebrow")}
          heading={t("showcase.heading")}
          pickUpLabel={t("showcase.pickUpLabel")}
          viewLabel={t("showcase.viewLabel")}
          items={showcaseItems}
        />

        <NewsTabs
          heading={t("newsPreview.heading")}
          categoryLabels={categoryLabels}
          viewAllLabel={t("newsPreview.viewAllLabel")}
          emptyLabel={newsT("list.empty")}
          articles={recentArticles.map((article) => ({
            slug: article.slug,
            title: article.title,
            category: article.category,
            publishedLabel: format.dateTime(new Date(article.datePublished), {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }),
            excerpt: article.excerpt,
          }))}
        />

        <RecruitTeaser
          eyebrow={t("recruit.eyebrow")}
          heading={t("recruit.heading")}
          messageLabel={t("recruit.messageLabel")}
          body={t("recruit.body")}
          ctaLabel={t("recruit.ctaLabel")}
        />

        <ContactPanel
          heading={t("contact.heading")}
          body={t("contact.body")}
          purposes={contactPurposes}
          ctaLabel={t("contact.ctaLabel")}
        />
      </main>
      <Footer />
    </>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeReactPage locale={locale} />;
}
