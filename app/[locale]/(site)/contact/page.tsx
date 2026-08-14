import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { pageBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import ContactForm from "@/components/contact/ContactForm";
import InteriorHero from "@/components/layout/InteriorHero";
import type { ContactPurpose } from "@/lib/contact/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const purposeOptions = t.raw("form.purposeOptions") as Record<
    ContactPurpose,
    string
  >;
  const pageCopy =
    locale === "en"
      ? {
          introTitle: "Talk to Pardes",
          formTitle: "Contact form",
          formNote:
            "Tell us what you are working on and how we can help. We will review your message and get back to you.",
          indexIntro: "About contact",
        }
      : {
          introTitle: "Pardesへのご相談",
          formTitle: "お問い合わせフォーム",
          formNote:
            "ご相談内容と連絡先をご入力ください。内容を確認のうえ、担当者よりご連絡します。",
          indexIntro: "お問い合わせについて",
        };

  return (
    <div className="pardes-interior-page pardes-contact-page">
      <JsonLd data={pageBreadcrumbJsonLd(locale, "/contact", t("meta.title"))} />

      <InteriorHero title={t("hero.heading")} />

      <div className="pardes-interior-layout">
        <aside className="pardes-interior-index" aria-label="Contact sections">
          <p className="pardes-interior-index__label font-en">Contact</p>
          <nav>
            <a href="#contact-form">{pageCopy.indexIntro}</a>
            <a href="#contact-form">{pageCopy.formTitle}</a>
          </nav>
        </aside>

        <main className="pardes-interior-main">
          <section className="pardes-contact-intro" aria-labelledby="contact-intro-title">
            <p className="pardes-interior-kicker font-en">Form</p>
            <h2 id="contact-intro-title" className="pardes-interior-section-title font-shippori">
              {pageCopy.introTitle}
            </h2>
            <p className="pardes-contact-intro__body font-kozuka">{t("hero.body")}</p>
          </section>

          <section id="contact-form" className="pardes-contact-form-section" aria-labelledby="contact-form-title">
            <p className="pardes-interior-kicker font-en">Contact form</p>
            <h2 id="contact-form-title" className="pardes-interior-section-title font-shippori">
              {pageCopy.formTitle}
            </h2>
            <p className="pardes-contact-form-section__note font-kozuka">
              {pageCopy.formNote}
            </p>
            <Suspense fallback={null}>
              <ContactForm
                locale={locale as "ja" | "en"}
                labels={{
                  name: t("form.name"),
                  company: t("form.company"),
                  email: t("form.email"),
                  purpose: t("form.purpose"),
                  purposeOptions,
                  message: t("form.message"),
                  consent: t("form.consent"),
                  consentLink: t("form.consentLink"),
                  consentSuffix: t("form.consentSuffix"),
                  submit: t("form.submit"),
                  submitting: t("form.submitting"),
                  success: t("form.success"),
                  error: t("form.error"),
                  errors: {
                    required: t("form.errors.required"),
                    email: t("form.errors.email"),
                  },
                }}
              />
            </Suspense>
          </section>
        </main>
      </div>
    </div>
  );
}
