import type { Metadata } from "next";
import {
  Space_Grotesk,
  Shippori_Mincho,
  Playfair_Display,
  Noto_Serif_JP,
} from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { SITE_URL, GSC_VERIFICATION } from "@/lib/seo/config";
import { buildOrganizationJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/seo/JsonLd";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** 参照元サイトの日本語見出しフォント「Shippori Mincho」相当（Google Fontsに実在するため直接採用） */
const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** 参照元サイトの英語大見出し用セリフ体「Reckless Standard XL」（商用フォントのため入手不可）の代替 */
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

/** 参照元サイトの本文用明朝体「小塚明朝 Pr6N」（Adobe商用フォントのため入手不可）の代替。
 * 見出し用のShippori Minchoとは書体を変え、本文と見出しの書き分けを再現する。 */
const notoSerifJp = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("defaultTitle"),
      template: `%s | ${t("titleSuffix")}`,
    },
    description: t("defaultDescription"),
    verification: GSC_VERIFICATION
      ? { google: GSC_VERIFICATION }
      : undefined,
    alternates: {
      languages: {
        ja: "/ja",
        en: "/en",
      },
    },
    openGraph: {
      siteName: t("titleSuffix"),
      locale: locale === "ja" ? "ja_JP" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${shipporiMincho.variable} ${playfairDisplay.variable} ${notoSerifJp.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/*
        ホーム(参照サイト埋め込み)はマウント後にAlpine.jsランタイムと
        ReferenceHomeRuntimeがhtml/bodyへ直接--vh・--scrollbar-width・
        x-data等を書き込む。React管理外の想定済みの変更のためhydration
        warningを抑止する（React公式が推奨するsuppressHydrationWarningの用途）。
      */}
      <body
        className="flex min-h-full flex-col bg-bg text-fg"
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale}>
          <JsonLd data={buildOrganizationJsonLd(locale)} />
          {children}
        </NextIntlClientProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
