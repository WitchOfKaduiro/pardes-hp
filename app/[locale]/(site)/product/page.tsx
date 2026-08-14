import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { pageBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { buildServiceJsonLd } from "@/lib/seo/jsonld";
import InteriorHero from "@/components/layout/InteriorHero";
import NumberedList from "@/components/ui/NumberedList";
import DeepDiveBlock from "@/components/ui/DeepDiveBlock";
import CompareTable from "@/components/ui/CompareTable";
import ArrowLink from "@/components/ui/ArrowLink";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "product.meta" });
  return { title: t("title"), description: t("description") };
}

const TIER_LABELS: Record<string, string> = {
  "BiNet SDK": "Developer Kit",
  "BiNet Binary Module": "Production Module",
  "Custom Integration": "Custom Integration",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("product");

  const features = t.raw("features.items") as { title: string; body: string }[];
  const lineup = t.raw("lineup.items") as {
    title: string;
    target: string;
    format: string;
    body: string;
  }[];
  const table = t.raw("comparison.table") as {
    headers: string[];
    rows: string[][];
  };

  return (
    <div className="pardes-interior-page pardes-product-page">
      <JsonLd data={pageBreadcrumbJsonLd(locale, "/product", t("meta.title"))} />
      {lineup.map((item) => (
        <JsonLd
          key={item.title}
          data={buildServiceJsonLd({
            serviceType: item.title,
            description: item.body,
          })}
        />
      ))}

      <InteriorHero title={t("hero.heading")} />

      <div className="pardes-interior-layout">
        <aside className="pardes-interior-index" aria-label="Product sections">
          <p className="pardes-interior-index__label font-en">Product</p>
          <nav>
            <a href="#binet-toha">{t("definition.heading")}</a>
            <a href="#features">{t("features.heading")}</a>
            <a href="#comparison">{t("comparison.heading")}</a>
            <a href="#lineup">{t("lineup.heading")}</a>
          </nav>
        </aside>

        <main className="pardes-interior-main">
          <section id="binet-toha" aria-labelledby="binet-toha-title">
            <p className="pardes-interior-kicker font-en">BiNet</p>
            <h2
              id="binet-toha-title"
              className="pardes-interior-section-title font-shippori"
            >
              {t("definition.heading")}
            </h2>
            <p className="pardes-product-lead font-kozuka">
              {t("hero.body")}
            </p>
            <p className="pardes-product-lead font-kozuka">
              {t("definition.body")}
            </p>
          </section>

          <section
            id="features"
            className="pardes-interior-section"
            aria-labelledby="features-title"
          >
            <p className="pardes-interior-kicker font-en">Features</p>
            <h2
              id="features-title"
              className="pardes-interior-section-title font-shippori"
            >
              {t("features.heading")}
            </h2>
            <NumberedList items={features} />
          </section>

          <section
            id="comparison"
            className="pardes-interior-section"
            aria-labelledby="comparison-title"
          >
            <p className="pardes-interior-kicker font-en">Comparison</p>
            <h2
              id="comparison-title"
              className="pardes-interior-section-title font-shippori"
            >
              {t("comparison.heading")}
            </h2>
            <CompareTable
              variant="interior"
              headers={table.headers}
              rows={table.rows}
            />
          </section>

          <section
            id="lineup"
            className="pardes-interior-section"
            aria-labelledby="lineup-title"
          >
            <p className="pardes-interior-kicker font-en">Lineup</p>
            <h2
              id="lineup-title"
              className="pardes-interior-section-title font-shippori"
            >
              {t("lineup.heading")}
            </h2>
            {lineup.map((item) => (
              <DeepDiveBlock
                key={item.title}
                label={TIER_LABELS[item.title] ?? item.title}
                title={item.title}
                meta={`${item.target}／${item.format}`}
                body={item.body}
                ctaLabel={t("cta.links.contact")}
                ctaHref="/contact"
              />
            ))}
            <p className="pardes-product-price-note font-kozuka">
              {t("lineup.priceNote")}
            </p>
          </section>

          <section className="pardes-interior-cta">
            <ArrowLink href="/contact" className="font-shippori">
              {t("cta.links.contact")}
            </ArrowLink>
          </section>
        </main>
      </div>
    </div>
  );
}
