import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/seo/JsonLd";
import { pageBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: "legal.privacy.meta",
  });
  return { title: t("title"), description: t("description") };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.privacy");
  const sections = t.raw("sections") as { title: string; body: string }[];

  return (
    <>
      <JsonLd
        data={pageBreadcrumbJsonLd(locale, "/legal/privacy", t("heading"))}
      />

      <Section className="max-w-2xl pt-fluid-xl pb-fluid-xl">
        <Reveal>
          <h1 className="text-fluid-2xl font-semibold text-fg">
            {t("heading")}
          </h1>
          <p className="mt-fluid-sm text-fluid-sm text-fg-muted">
            {t("intro")}
          </p>
          <div className="mt-fluid-md flex flex-col gap-fluid-sm">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-fluid-lg font-semibold text-fg">
                  {section.title}
                </h2>
                <p className="mt-fluid-xs text-fluid-sm text-fg-muted">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
