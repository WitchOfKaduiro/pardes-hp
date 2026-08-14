import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ReferenceHomeRuntime from "@/components/home/ReferenceHomeRuntime";
import ReferenceLangSwitch from "@/components/layout/ReferenceLangSwitch";
import { readReferencePageBody } from "@/lib/referenceEmbed";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InteriorHero from "@/components/layout/InteriorHero";
import NumberedList from "@/components/ui/NumberedList";
import DeepDiveBlock from "@/components/ui/DeepDiveBlock";
import CompareTable from "@/components/ui/CompareTable";
import ArrowLink from "@/components/ui/ArrowLink";

const BODY_CLASS_NAME =
  "wp-singular page-template-default page wp-embed-responsive wp-theme-matsuo page-service ";

const TIER_LABELS: Record<string, string> = {
  "BiNet SDK": "Developer Kit",
  "BiNet Binary Module": "Production Module",
  "Custom Integration": "Custom Integration",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "business.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

function BusinessReferencePage() {
  return (
    <>
      <ReferenceHomeRuntime bodyClassName={BODY_CLASS_NAME} />
      <ReferenceLangSwitch />
      {/*
        参照HTMLは非標準的なマークアップを含むため、ブラウザのHTMLパーサーが
        解釈時に文字列を正規化し、SSR時の文字列と厳密には一致しなくなる。
        表示・動作には影響しないReactの既知の制約のため、
        dangerouslySetInnerHTML特有のhydration警告はこの要素に限定して抑止する。
      */}
      <div
        className="pardes-reference-home"
        dangerouslySetInnerHTML={{ __html: readReferencePageBody("business.html") }}
        suppressHydrationWarning
      />
    </>
  );
}

async function BusinessInteriorPage() {
  const t = await getTranslations("business");

  const challenges = t.raw("challenges.items") as { title: string; body: string }[];
  const lineup = t.raw("lineup.items") as {
    title: string;
    target: string;
    body: string;
  }[];
  const table = t.raw("coreTech.table") as { headers: string[]; rows: string[][] };
  const roadmapPhases = t.raw("roadmap.phases") as { title: string; body: string }[];

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="pardes-interior-page pardes-product-page">
          <InteriorHero title={t("hero.heading")} />

          <div className="pardes-interior-layout">
            <aside className="pardes-interior-index" aria-label="Business sections">
              <p className="pardes-interior-index__label font-en">Business</p>
              <nav>
                <a href="#challenges">{t("challenges.heading")}</a>
                <a href="#core-tech">{t("coreTech.heading")}</a>
                <a href="#lineup">{t("lineup.heading")}</a>
                <a href="#market">{t("market.heading")}</a>
                <a href="#roadmap">{t("roadmap.heading")}</a>
              </nav>
            </aside>

            <main className="pardes-interior-main">
              <section id="challenges" aria-labelledby="challenges-title">
                <p className="pardes-interior-kicker font-en">Challenges</p>
                <h2
                  id="challenges-title"
                  className="pardes-interior-section-title font-shippori"
                >
                  {t("challenges.heading")}
                </h2>
                <p className="pardes-product-lead font-kozuka">{t("hero.body")}</p>
                <NumberedList items={challenges} />
              </section>

              <section
                id="core-tech"
                className="pardes-interior-section"
                aria-labelledby="core-tech-title"
              >
                <p className="pardes-interior-kicker font-en">BiNet</p>
                <h2
                  id="core-tech-title"
                  className="pardes-interior-section-title font-shippori"
                >
                  {t("coreTech.heading")}
                </h2>
                <p className="pardes-product-lead font-kozuka">{t("coreTech.body")}</p>
                <h3 className="font-shippori text-[1.25rem] text-[#080a0b] mt-fluid-lg">
                  {t("coreTech.comparisonTitle")}
                </h3>
                <CompareTable variant="interior" headers={table.headers} rows={table.rows} />
                <p className="pardes-product-price-note font-kozuka">
                  {t("coreTech.comparisonNote")}
                </p>
              </section>

              <section
                id="lineup"
                className="pardes-interior-section"
                aria-labelledby="lineup-title"
              >
                <p className="pardes-interior-kicker font-en">BIL</p>
                <h2
                  id="lineup-title"
                  className="pardes-interior-section-title font-shippori"
                >
                  {t("lineup.heading")}
                </h2>
                <p className="pardes-product-lead font-kozuka">{t("lineup.body")}</p>
                {lineup.map((item) => (
                  <DeepDiveBlock
                    key={item.title}
                    label={TIER_LABELS[item.title] ?? item.title}
                    title={item.title}
                    meta={item.target}
                    body={item.body}
                    ctaLabel={t("cta.links.contact")}
                    ctaHref="/contact"
                  />
                ))}
                <p className="pardes-product-price-note font-kozuka">
                  {t("lineup.priceNote")}
                </p>
              </section>

              <section
                id="market"
                className="pardes-interior-section"
                aria-labelledby="market-title"
              >
                <p className="pardes-interior-kicker font-en">Market</p>
                <h2
                  id="market-title"
                  className="pardes-interior-section-title font-shippori"
                >
                  {t("market.heading")}
                </h2>
                <p className="pardes-product-lead font-kozuka">{t("market.body")}</p>
                <p className="pardes-product-price-note font-kozuka">
                  {t("market.source")} / {t("market.referenceDate")}
                </p>
              </section>

              <section
                id="roadmap"
                className="pardes-interior-section"
                aria-labelledby="roadmap-title"
              >
                <p className="pardes-interior-kicker font-en">Roadmap</p>
                <h2
                  id="roadmap-title"
                  className="pardes-interior-section-title font-shippori"
                >
                  {t("roadmap.heading")}
                </h2>
                <p className="pardes-product-lead font-kozuka">{t("roadmap.body")}</p>
                <NumberedList items={roadmapPhases} />
              </section>

              <section className="pardes-interior-cta">
                <div className="flex flex-wrap gap-fluid-md">
                  <ArrowLink href="/product" className="font-shippori">
                    {t("cta.links.product")}
                  </ArrowLink>
                  <ArrowLink href="/contact" className="font-shippori">
                    {t("cta.links.contact")}
                  </ArrowLink>
                </div>
              </section>
            </main>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "en") {
    return <BusinessInteriorPage />;
  }

  return <BusinessReferencePage />;
}
