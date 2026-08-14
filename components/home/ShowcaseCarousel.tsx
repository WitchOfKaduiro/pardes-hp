"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import SplitReveal from "@/components/ui/SplitReveal";
import ArrowLink from "@/components/ui/ArrowLink";
import AbstractVisual, { type AbstractVisualVariant } from "./AbstractVisual";

const VISUAL_VARIANTS: AbstractVisualVariant[] = [
  "showcase-1",
  "showcase-2",
  "showcase-3",
];

type ShowcaseItem = {
  href: string;
  name: string;
  description: string;
};

/**
 * 参照元サイトの Works セクション（フルスクリーンでピン留めした
 * 「Pick up / 番号 / 項目名」の3カラムバーの背後を、縦長サムネイルが
 * スクロールで切り替わりながら通過する Pick up ギャラリー）を踏襲する。
 * Alpine.jsの実装は流用せず、framer-motionのuseScroll/useTransformで
 * 再構築している。prefers-reduced-motion環境・モバイル幅ではピン留めせず
 * 単純な縦積みリストにフォールバックする。
 */
export default function ShowcaseCarousel({
  eyebrow,
  heading,
  pickUpLabel,
  viewLabel,
  items,
}: {
  eyebrow: string;
  heading: string;
  pickUpLabel: string;
  viewLabel: string;
  items: ShowcaseItem[];
}) {
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end start"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const idx = Math.min(items.length - 1, Math.max(0, Math.floor(value * items.length)));
    setActiveIndex(idx);
  });

  const opacity0 = useTransform(scrollYProgress, [0, 0.05, 0.28, 0.33], [1, 1, 1, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.28, 0.33, 0.62, 0.67], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.62, 0.67, 0.95, 1], [0, 1, 1, 1]);
  const opacities = [opacity0, opacity1, opacity2];

  const current = items[activeIndex] ?? items[0];

  return (
    <section className="relative">
      <div className="bg-bg-light pb-fluid-md pt-fluid-lg text-fg-on-light">
        <div className="mx-auto max-w-6xl px-fluid-sm">
          <p className="font-serif-en text-fluid-sm font-medium uppercase tracking-widest text-accent-dim">
            {eyebrow}
          </p>
          <SplitReveal
            as="h2"
            text={heading}
            className="mt-fluid-xs block font-serif-en text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.95] text-fg-on-light"
            staggerMs={16}
            randomDir
          />
        </div>
      </div>

      <div
        ref={pinRef}
        className="relative mt-fluid-md hidden h-[300vh] md:block motion-reduce:hidden!"
      >
        <div className="sticky top-0 h-screen bg-bg">
          <AbstractVisual variant="hero" seed="showcase" fill className="opacity-25" />
          <div className="absolute inset-0 bg-bg/60" />

          <div className="relative z-[1] grid h-full grid-cols-3 items-center px-fluid-lg">
            <span className="font-serif-en text-fluid-sm uppercase tracking-widest text-fg-muted">
              {pickUpLabel}
            </span>

            <div className="relative mx-auto aspect-[3/4] w-[18vw] max-w-[280px] overflow-hidden rounded-xl">
              {items.map((item, i) => (
                <motion.div
                  key={item.href + item.name}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ opacity: opacities[i] }}
                >
                  <AbstractVisual
                    variant={VISUAL_VARIANTS[i % VISUAL_VARIANTS.length]}
                    fill
                  />
                  <span className="relative font-serif-en text-[clamp(2.5rem,6vw,4.5rem)] text-fg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="text-right">
              <ArrowLink
                href={current.href}
                underline={false}
                className="justify-end font-serif-en text-fluid-lg text-fg"
              >
                {current.name}
              </ArrowLink>
            </div>
          </div>

          <div className="absolute bottom-fluid-md right-fluid-sm z-[1]">
            <ArrowLink href={current.href} className="text-fluid-sm text-fg">
              {viewLabel}
            </ArrowLink>
          </div>
        </div>
      </div>

      <ul className="mt-fluid-md grid gap-fluid-sm px-fluid-sm md:hidden motion-reduce:grid!">
        {items.map((item, i) => (
          <li
            key={item.href + item.name}
            className="overflow-hidden rounded-2xl border border-border bg-bg-elevated"
          >
            <AbstractVisual
              variant={VISUAL_VARIANTS[i % VISUAL_VARIANTS.length]}
              className="aspect-[4/3] w-full"
            />
            <div className="p-fluid-sm">
              <p className="font-serif-en text-fluid-lg font-semibold text-fg">
                {item.name}
              </p>
              <p className="mt-fluid-xs text-fluid-sm text-fg-muted">
                {item.description}
              </p>
              <ArrowLink
                href={item.href}
                underline={false}
                className="mt-fluid-xs text-fluid-sm text-accent"
              >
                {viewLabel}
              </ArrowLink>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
