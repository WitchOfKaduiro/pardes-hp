import { Link } from "@/lib/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";
import AbstractVisual from "./AbstractVisual";

/**
 * 参照元サイトの MV（メインビジュアル）セクションの構成を踏襲する:
 * 背景の生成ビジュアルは1枚のまま position:fixed で画面に固定され、
 * 見出し・複数段落のナラティブコピーがその上を通常速度でスクロールし、
 * About us セクション（白背景）が下からスクロールしてくることで初めて隠れる
 * （参照元の sectionParallax による「背景固定＋前景通常スクロール」を、
 * Alpine.js実装は流用せずCSSのposition:fixedのみで再構築）。
 * 見出しの1文字スタッガーリビール（ランダム方向）、左下の丸いスクロールダウン
 * 導線、右下の最新お知らせカードを備える。CTAボタンは参照元に存在しないため
 * 設置しない。
 */
export default function HeroSection({
  eyebrow,
  headingLines,
  body,
  scrollCue,
  narrative,
  recentUpdateLabel,
  latestNews,
}: {
  eyebrow: string;
  headingLines: string[];
  body: string;
  scrollCue: string;
  narrative: string[];
  recentUpdateLabel: string;
  latestNews?: { title: string; href: string } | null;
}) {
  return (
    <section className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 60% at 58% 42%, rgba(0,104,182,0.28), rgba(0,0,0,0) 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-[18%] hidden aspect-square w-[30%] max-w-md -translate-x-1/4 overflow-hidden rounded-2xl -z-10 sm:block"
      >
        <AbstractVisual variant="hero" className="h-full w-full" />
      </div>

      <div className="relative flex min-h-[100svh] flex-col justify-between">
        <div className="mx-auto w-full max-w-6xl px-fluid-sm py-fluid-xl">
          <Reveal>
            <p className="font-serif-en text-fluid-sm font-medium uppercase tracking-widest text-accent">
              {eyebrow}
            </p>
          </Reveal>
          <h1 className="mt-fluid-xs font-serif-jp text-fluid-3xl font-semibold leading-[1.1] text-fg">
            {headingLines.map((line, i) => (
              <SplitReveal
                key={i}
                as="span"
                text={line}
                className="block"
                staggerMs={22}
                randomDir
              />
            ))}
          </h1>
          <Reveal delayMs={200}>
            <p className="mt-fluid-sm max-w-2xl text-fluid-base text-fg-muted">
              {body}
            </p>
          </Reveal>
        </div>

        <div className="relative px-fluid-sm pb-fluid-md">
          {latestNews ? (
            <Reveal
              delayMs={450}
              className="absolute bottom-fluid-md right-fluid-sm hidden w-[240px] sm:block"
            >
              <Link
                href={latestNews.href}
                className="block rounded-2xl bg-fg p-fluid-sm text-black shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <p className="font-serif-en text-fluid-xs uppercase tracking-widest text-black/60">
                  {recentUpdateLabel}
                </p>
                <p className="mt-2 text-fluid-sm font-medium leading-snug">
                  {latestNews.title}
                </p>
              </Link>
            </Reveal>
          ) : null}

          <Reveal delayMs={400} className="flex flex-col items-center gap-fluid-xs">
            <span
              aria-hidden="true"
              className="motion-safe:animate-pulse inline-block h-[1.4em] w-[1.4em] rounded-full border border-fg-subtle"
            />
            <span className="font-serif-en text-fluid-xs uppercase tracking-widest text-fg-subtle">
              {scrollCue}
            </span>
          </Reveal>
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl px-fluid-sm py-fluid-xl">
        {narrative.map((paragraph, i) => (
          <Reveal key={i} delayMs={i * 60} className="mt-fluid-sm first:mt-0">
            <p className="font-serif-jp-body text-fluid-lg leading-relaxed text-fg-muted">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
