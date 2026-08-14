import type { Metadata } from "next";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import ReferenceHomeRuntime from "@/components/home/ReferenceHomeRuntime";
import ReferenceLangSwitch from "@/components/layout/ReferenceLangSwitch";
import { readReferencePageBody } from "@/lib/referenceEmbed";
import { getAllNews } from "@/lib/news";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DeepDiveBlock from "@/components/ui/DeepDiveBlock";
import ArrowLink from "@/components/ui/ArrowLink";
import { Link } from "@/lib/i18n/navigation";

const SITE_TITLE = {
  ja: "Pardes Inc.（パルデス） | 自由意志を持つAGIの実現へ",
  en: "Pardes Inc. | Toward artificial general intelligence with free will",
} as const;
const SITE_DESCRIPTION = {
  ja: "Pardes Inc.は、誤差逆伝播法を使わない生物学的妥当性の高いニューラルネットワーク「BiNet」を開発するAIスタートアップです。",
  en: "Pardes Inc. is an AI startup developing BiNet, a biologically-plausible neural network that does not depend on backpropagation.",
} as const;

const SHOWCASE_TIER_LABELS: Record<string, string> = {
  "BiNet SDK": "Developer Kit",
  "BiNet Binary Module": "Production Module",
  "Custom Integration": "Custom Integration",
};

const REPRESENTATIVE_MESSAGE_COPY = {
  ja: {
    eyebrow: "Message from the representative",
    heading: "代表挨拶",
    lead: "自由意志を持つ知性を、現実の世界へ。",
    paragraphs: [
      "Pardesは、AIが環境を理解し、自ら学び、行動できる未来を目指しています。",
      "BiNetを通じて、知性を特定の場所に閉じ込めるのではなく、あらゆる動体と共に進化する技術として届けていきます。",
    ],
    role: "代表取締役",
    name: "小泉 優斗",
    linkLabel: "会社概要を見る",
  },
  en: {
    eyebrow: "Message from the representative",
    heading: "Representative message",
    lead: "Bringing intelligence with its own will into the real world.",
    paragraphs: [
      "Pardes is working toward a future where AI can understand its environment, learn by itself, and act with purpose.",
      "Through BiNet, we are building intelligence that does not stay in one place, but continues to evolve alongside every moving body.",
    ],
    role: "Representative Director",
    name: "Yuto Koizumi",
    linkLabel: "View company profile",
  },
} as const;

function buildRepresentativeMessage(locale: string) {
  const copy = locale === "en" ? REPRESENTATIVE_MESSAGE_COPY.en : REPRESENTATIVE_MESSAGE_COPY.ja;

  return `
    <section id="home-representative-message" class="pardes-representative-message" aria-labelledby="home-representative-message-heading">
      <div class="pardes-representative-message__inner">
        <div class="pardes-representative-message__content" data-pardes-representative-reveal>
          <p class="pardes-representative-message__eyebrow font-en">${copy.eyebrow}</p>
          <h2 id="home-representative-message-heading" class="pardes-representative-message__heading font-shippori">${copy.heading}</h2>
          <div class="pardes-representative-message__rule" aria-hidden="true"></div>
          <p class="pardes-representative-message__lead font-shippori">${copy.lead}</p>
          <div class="pardes-representative-message__body font-kozuka">
            <p>${copy.paragraphs[0]}</p>
            <p>${copy.paragraphs[1]}</p>
          </div>
          <div class="pardes-representative-message__signature">
            <p class="pardes-representative-message__role font-kozuka">${copy.role}</p>
            <p class="pardes-representative-message__name font-shippori">${copy.name}</p>
          </div>
          <a class="pardes-representative-message__link font-shippori" href="/${locale}/company">
            <span>${copy.linkLabel}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div class="pardes-representative-message__visual" data-pardes-representative-reveal>
          <img src="/wp/wp-content/themes/matsuo/assets/images/pardes/about-company.svg" alt="" loading="lazy" decoding="async" />
          <p class="pardes-representative-message__visual-label font-en" aria-hidden="true">Pardes / Message</p>
        </div>
      </div>
    </section>
  `;
}

function readReferenceBody(locale: string) {
  const body = readReferencePageBody("index.html");

  const worksMarker = '<section id="home-works"';
  if (!body.includes(worksMarker)) {
    throw new Error("The reference page does not contain the home works section.");
  }

  return body.replace(worksMarker, `${buildRepresentativeMessage(locale)}${worksMarker}`);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? SITE_TITLE.en : SITE_TITLE.ja;
  const description = locale === "en" ? SITE_DESCRIPTION.en : SITE_DESCRIPTION.ja;

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

function HomeReferencePage({ locale }: { locale: string }) {
  return (
    <>
      <ReferenceHomeRuntime />
      <ReferenceLangSwitch />
      {/*
        参照HTMLは非標準的なマークアップ(自己終了タグの慣用表記や属性の
        書き方など)を含むため、ブラウザのHTMLパーサーが解釈時に文字列を
        正規化し、SSR時の文字列と厳密には一致しなくなる。表示・動作には
        影響しないReactの既知の制約のため、dangerouslySetInnerHTML特有の
        hydration警告はこの要素に限定して抑止する。
      */}
      <div
        className="pardes-reference-home"
        dangerouslySetInnerHTML={{ __html: readReferenceBody(locale) }}
        suppressHydrationWarning
      />
    </>
  );
}

async function HomeInteriorPage() {
  const t = await getTranslations("home");
  const format = await getFormatter();

  const aboutItems = t.raw("about.items") as { label: string; href: string }[];
  const showcaseItems = t.raw("showcase.items") as {
    href: string;
    name: string;
    description: string;
  }[];
  const contactPurposes = t.raw("contact.purposes") as {
    label: string;
    description: string;
  }[];
  const recentArticles = getAllNews("en").slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="pardes-interior-page">
          <div className="mx-auto max-w-5xl px-fluid-sm py-fluid-xl">
            <section aria-labelledby="home-hero-title">
              <p className="pardes-interior-kicker font-en">{t("hero.eyebrow")}</p>
              <h1
                id="home-hero-title"
                className="pardes-interior-section-title font-shippori whitespace-pre-line"
                style={{ marginTop: "1rem" }}
              >
                {t("hero.heading")}
              </h1>
              <p className="pardes-product-lead font-kozuka">{t("hero.body")}</p>
              <div className="mt-fluid-lg flex flex-wrap gap-fluid-md">
                <ArrowLink href="/product" className="font-shippori">
                  {t("hero.ctaPrimary")}
                </ArrowLink>
                <ArrowLink href="/contact" className="font-shippori">
                  {t("hero.ctaSecondary")}
                </ArrowLink>
              </div>
              <div className="mt-fluid-xl space-y-fluid-sm border-t border-[#cfd6d5] pt-fluid-sm font-kozuka">
                {t.raw("hero.narrative").map((paragraph: string) => (
                  <p key={paragraph} className="text-[#080a0b]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section
              id="about"
              className="pardes-interior-section"
              aria-labelledby="about-title"
            >
              <p className="pardes-interior-kicker font-en">About</p>
              <h2
                id="about-title"
                className="pardes-interior-section-title font-shippori"
              >
                {t("about.heading")}
              </h2>
              <p className="pardes-product-lead font-kozuka">{t("about.body")}</p>
              <div className="mt-fluid-lg flex flex-wrap gap-fluid-md">
                {aboutItems.map((item) => (
                  <ArrowLink key={item.href} href={item.href} className="font-shippori">
                    {item.label}
                  </ArrowLink>
                ))}
              </div>
            </section>

            <section
              id="showcase"
              className="pardes-interior-section"
              aria-labelledby="showcase-title"
            >
              <p className="pardes-interior-kicker font-en">{t("showcase.eyebrow")}</p>
              <h2
                id="showcase-title"
                className="pardes-interior-section-title font-shippori"
              >
                {t("showcase.heading")}
              </h2>
              {showcaseItems.map((item) => (
                <DeepDiveBlock
                  key={item.name}
                  label={SHOWCASE_TIER_LABELS[item.name] ?? item.name}
                  title={item.name}
                  body={item.description}
                  ctaLabel={t("showcase.viewLabel")}
                  ctaHref={item.href}
                />
              ))}
            </section>

            <section
              id="news"
              className="pardes-interior-section"
              aria-labelledby="news-title"
            >
              <p className="pardes-interior-kicker font-en">News</p>
              <h2
                id="news-title"
                className="pardes-interior-section-title font-shippori"
              >
                {t("newsPreview.heading")}
              </h2>
              <ul className="mt-fluid-lg grid grid-cols-1 gap-fluid-md sm:grid-cols-3">
                {recentArticles.map((article) => (
                  <li key={article.slug}>
                    <Link href={`/news/${article.slug}`} className="group block">
                      <p className="font-shippori text-[1.0625rem] leading-snug text-[#080a0b] underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-[#080a0b]">
                        {article.title}
                      </p>
                      <p className="mt-1 font-en text-fluid-xs text-[#6b7475]">
                        {format.dateTime(new Date(article.datePublished), {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </p>
                    </Link>
                  </li>
                ))}
                {recentArticles.length === 0 && (
                  <li className="font-kozuka text-fluid-sm text-[#6b7475]">
                    No news yet.
                  </li>
                )}
              </ul>
              <div className="mt-fluid-lg">
                <ArrowLink href="/news" className="font-shippori">
                  {t("newsPreview.viewAllLabel")}
                </ArrowLink>
              </div>
            </section>

            <section
              id="recruit"
              className="pardes-interior-section"
              aria-labelledby="recruit-title"
            >
              <p className="pardes-interior-kicker font-en">{t("recruit.eyebrow")}</p>
              <h2
                id="recruit-title"
                className="pardes-interior-section-title font-shippori"
              >
                {t("recruit.heading")}
              </h2>
              <p className="pardes-product-lead font-kozuka">{t("recruit.body")}</p>
              <div className="mt-fluid-lg">
                <ArrowLink href="/recruit" className="font-shippori">
                  {t("recruit.ctaLabel")}
                </ArrowLink>
              </div>
            </section>

            <section
              id="contact"
              className="pardes-interior-section"
              aria-labelledby="contact-title"
            >
              <p className="pardes-interior-kicker font-en">Contact</p>
              <h2
                id="contact-title"
                className="pardes-interior-section-title font-shippori"
              >
                {t("contact.heading")}
              </h2>
              <p className="pardes-product-lead font-kozuka">{t("contact.body")}</p>
              <ul className="mt-fluid-lg space-y-fluid-xs font-kozuka">
                {contactPurposes.map((purpose) => (
                  <li key={purpose.label}>
                    <span className="font-shippori text-[#080a0b]">{purpose.label}</span>
                    <span className="text-[#6b7475]"> — {purpose.description}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-fluid-lg">
                <ArrowLink href="/contact" className="font-shippori">
                  {t("contact.ctaLabel")}
                </ArrowLink>
              </div>
            </section>
          </div>
        </div>
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

  if (locale === "en") {
    return <HomeInteriorPage />;
  }

  return <HomeReferencePage locale={locale} />;
}
