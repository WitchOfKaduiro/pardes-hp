import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { pageBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { buildJobPostingJsonLd } from "@/lib/seo/jsonld";
import InteriorHero from "@/components/layout/InteriorHero";
import NumberedList from "@/components/ui/NumberedList";
import DeepDiveBlock from "@/components/ui/DeepDiveBlock";
import ArrowLink from "@/components/ui/ArrowLink";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "recruit.meta" });
  return { title: t("title"), description: t("description") };
}

const JOB_POSTED_DATE = "2026-07-21";

const PAGE_COPY = {
  ja: {
    culturalKicker: "Culture",
    cultureHeading: "Pardesで働く特徴",
    messageParagraphs: [
      "自由意志を持つ汎用人工知能の実現。世界のどこにも前例のない、この挑戦に懸けています。",
      "誤差逆伝播法に頼らない知能の原理を、ゼロから実装する。その研究開発の最前線に、初期メンバーとして立てる環境です。",
      "既にBiNet実装エンジニアが2名、この挑戦に加わっています。少人数だからこそ、裁量は大きく、成果は自分自身のものになります。",
    ],
    cultureItems: [
      {
        title: "世界に前例のない挑戦",
        body: "誤差逆伝播法に依存しない知能原理という、他に類を見ない研究開発に取り組めます。",
      },
      {
        title: "初期メンバーとしての裁量",
        body: "既に実装エンジニアが参画する少人数チームで、意思決定に直接関わる裁量があります。",
      },
      {
        title: "フロンティアへの近さ",
        body: "BiNetのコア実装から独自OS研究まで、既存の枠組みに縛られない技術選択に携われます。",
      },
    ],
    skillsHeadingKicker: "Skills",
  },
  en: {
    culturalKicker: "Culture",
    cultureHeading: "Why join Pardes",
    messageParagraphs: [
      "Realizing artificial general intelligence with free will. We are committed to a challenge with no precedent anywhere in the world.",
      "Implementing a principle of intelligence that doesn't rely on backpropagation, from the ground up. You'll stand at the frontier of this research as one of our earliest members.",
      "Two BiNet implementation engineers have already joined this challenge. Because we're a small team, the scope of your work is large, and the results are truly your own.",
    ],
    cultureItems: [
      {
        title: "A challenge with no precedent",
        body: "Work on research and development unlike anything else — intelligence that doesn't depend on backpropagation.",
      },
      {
        title: "Real say as an early member",
        body: "Join a small team that already includes implementation engineers, with direct input into decisions.",
      },
      {
        title: "Close to the frontier",
        body: "From BiNet's core implementation to original OS research, engage with technical choices unbound by existing frameworks.",
      },
    ],
    skillsHeadingKicker: "Skills",
  },
} as const;

const POSITION_LABELS: Record<string, string> = {
  BiNet実装エンジニア: "Core Engineering",
  "クラウド・アプリ開発エンジニア": "Cloud & App",
  "機体開発エンジニア（将来募集）": "Future Hiring",
};

export default async function RecruitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("recruit");
  const copy = locale === "en" ? PAGE_COPY.en : PAGE_COPY.ja;

  const positions = t.raw("positions.items") as { title: string; body: string }[];
  const required = t.raw("skills.required") as string[];
  const preferred = t.raw("skills.preferred") as string[];

  return (
    <div className="pardes-interior-page pardes-recruit-page">
      <JsonLd data={pageBreadcrumbJsonLd(locale, "/recruit", t("meta.title"))} />
      {positions.map((position) => (
        <JsonLd
          key={position.title}
          data={buildJobPostingJsonLd({
            title: position.title,
            description: position.body,
            datePosted: JOB_POSTED_DATE,
          })}
        />
      ))}

      <InteriorHero title={t("hero.heading")} />

      <div className="pardes-interior-layout">
        <aside className="pardes-interior-index" aria-label="Recruit sections">
          <p className="pardes-interior-index__label font-en">Recruit</p>
          <nav>
            <a href="#message">{t("intro.heading")}</a>
            <a href="#culture">{copy.cultureHeading}</a>
            <a href="#positions">{t("positions.heading")}</a>
            <a href="#skills">{copy.skillsHeadingKicker}</a>
          </nav>
        </aside>

        <main className="pardes-interior-main">
          <section id="message" aria-labelledby="message-title">
            <p className="pardes-interior-kicker font-en">Message</p>
            <h2
              id="message-title"
              className="pardes-interior-section-title font-shippori"
            >
              {t("intro.heading")}
            </h2>
            <div className="pardes-recruit-message font-kozuka">
              {copy.messageParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section
            id="culture"
            className="pardes-interior-section"
            aria-labelledby="culture-title"
          >
            <p className="pardes-interior-kicker font-en">
              {copy.culturalKicker}
            </p>
            <h2
              id="culture-title"
              className="pardes-interior-section-title font-shippori"
            >
              {copy.cultureHeading}
            </h2>
            <NumberedList items={copy.cultureItems} />
          </section>

          <section
            id="positions"
            className="pardes-interior-section"
            aria-labelledby="positions-title"
          >
            <p className="pardes-interior-kicker font-en">Positions</p>
            <h2
              id="positions-title"
              className="pardes-interior-section-title font-shippori"
            >
              {t("positions.heading")}
            </h2>
            {positions.map((position) => (
              <DeepDiveBlock
                key={position.title}
                label={POSITION_LABELS[position.title] ?? position.title}
                title={position.title}
                body={position.body}
                ctaLabel={t("cta.links.contact")}
                ctaHref="/contact?purpose=recruit"
              />
            ))}
          </section>

          <section
            id="skills"
            className="pardes-interior-section"
            aria-labelledby="skills-title"
          >
            <p className="pardes-interior-kicker font-en">
              {copy.skillsHeadingKicker}
            </p>
            <div className="pardes-recruit-skills">
              <div>
                <h3 className="font-shippori text-[1.25rem] text-[#080a0b]">
                  {t("skills.requiredHeading")}
                </h3>
                <ul className="pardes-recruit-skills__list font-kozuka">
                  {required.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-shippori text-[1.25rem] text-[#080a0b]">
                  {t("skills.preferredHeading")}
                </h3>
                <ul className="pardes-recruit-skills__list font-kozuka">
                  {preferred.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="pardes-interior-cta">
            <ArrowLink href="/contact?purpose=recruit" className="font-shippori">
              {t("cta.links.contact")}
            </ArrowLink>
          </section>
        </main>
      </div>
    </div>
  );
}
