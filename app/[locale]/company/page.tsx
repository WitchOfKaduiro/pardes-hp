import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InteriorHero from "@/components/layout/InteriorHero";
import ArrowLink from "@/components/ui/ArrowLink";

const BASIC_INFO_ROWS = [
  { labelKey: "companyName", valueKey: "companyNameValue" },
  { labelKey: "companyType", valueKey: "companyTypeValue" },
  { labelKey: "businessContent", valueKey: "businessContentValue" },
  { labelKey: "representative", valueKey: "representativeValue" },
  { labelKey: "address", valueKey: null },
  { labelKey: "founded", valueKey: null },
  { labelKey: "capital", valueKey: null },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "company.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

async function CompanyInteriorPage() {
  const t = await getTranslations("company");

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="pardes-interior-page pardes-product-page">
          <InteriorHero title={t("hero.heading")} />

          <div className="pardes-interior-layout">
            <aside className="pardes-interior-index" aria-label="Company sections">
              <p className="pardes-interior-index__label font-en">Company</p>
              <nav>
                <a href="#basic-info">{t("basicInfo.heading")}</a>
                <a href="#vision">{t("vision.heading")}</a>
                <a href="#mission">{t("mission.heading")}</a>
              </nav>
            </aside>

            <main className="pardes-interior-main">
              <section id="basic-info" aria-labelledby="basic-info-title">
                <p className="pardes-interior-kicker font-en">Company</p>
                <h2
                  id="basic-info-title"
                  className="pardes-interior-section-title font-shippori"
                >
                  {t("basicInfo.heading")}
                </h2>
                <dl className="mt-fluid-lg divide-y divide-[#cfd6d5] border-t border-[#cfd6d5] font-kozuka">
                  {BASIC_INFO_ROWS.map((row) => (
                    <div
                      key={row.labelKey}
                      className="grid grid-cols-1 gap-1 py-fluid-xs sm:grid-cols-[10rem_1fr] sm:gap-4"
                    >
                      <dt className="text-[#6b7475]">{t(`basicInfo.${row.labelKey}`)}</dt>
                      <dd className="text-[#080a0b]">
                        {row.valueKey
                          ? t(`basicInfo.${row.valueKey}`)
                          : t("basicInfo.pending")}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section
                id="vision"
                className="pardes-interior-section"
                aria-labelledby="vision-title"
              >
                <p className="pardes-interior-kicker font-en">Vision</p>
                <h2
                  id="vision-title"
                  className="pardes-interior-section-title font-shippori"
                >
                  {t("vision.heading")}
                </h2>
                <p className="pardes-product-lead font-kozuka">{t("vision.body")}</p>
              </section>

              <section
                id="mission"
                className="pardes-interior-section"
                aria-labelledby="mission-title"
              >
                <p className="pardes-interior-kicker font-en">Mission</p>
                <h2
                  id="mission-title"
                  className="pardes-interior-section-title font-shippori"
                >
                  {t("mission.heading")}
                </h2>
                <p className="pardes-product-lead font-kozuka">{t("mission.body")}</p>
              </section>

              <section className="pardes-interior-cta">
                <div className="flex flex-wrap gap-fluid-md">
                  <ArrowLink href="/recruit" className="font-shippori">
                    {t("cta.links.recruit")}
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

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CompanyInteriorPage />;
}
