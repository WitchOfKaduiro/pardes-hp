"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";
import HoverFlipText from "@/components/ui/HoverFlipText";
import AbstractVisual from "./AbstractVisual";

const THUMB_SEEDS = ["1", "2", "3", "4"];

/**
 * 参照元サイトの Recruit セクションを踏襲する: 白背景の大見出し
 * （英語セリフ体スプリットアニメーション）と、その下のパララックス背景に
 * 重なる "Message" 中央寄せの引用文＋サムネイル無限ループマーキー
 * カルーセルの2段構成。実際のSplide/WebGL実装は流用せず、CSSアニメーションの
 * マーキーとframer-motionのスクロール連動パララックスで再構築している。
 */
export default function RecruitTeaser({
  eyebrow,
  heading,
  messageLabel,
  body,
  ctaLabel,
}: {
  eyebrow: string;
  heading: string;
  messageLabel: string;
  body: string;
  ctaLabel: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const thumbs = [...THUMB_SEEDS, ...THUMB_SEEDS];

  return (
    <section>
      <div className="bg-bg-light py-fluid-xl text-fg-on-light">
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

      <div ref={sectionRef} className="relative overflow-hidden py-fluid-xl">
        <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
          <AbstractVisual variant="recruit" fill className="opacity-40" />
        </motion.div>
        <div className="absolute inset-0 bg-bg/60" />

        <div className="relative z-[1] mx-auto max-w-2xl px-fluid-sm text-center">
          <Reveal>
            <p className="font-serif-en text-fluid-sm uppercase tracking-widest text-fg-muted">
              {messageLabel}
            </p>
            <p className="mt-fluid-sm font-serif-jp-body text-fluid-lg leading-relaxed text-fg">
              {body}
            </p>
          </Reveal>

          <div
            aria-hidden="true"
            className="mt-fluid-lg overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          >
            <div className="marquee flex w-max gap-fluid-sm">
              {thumbs.map((seed, i) => (
                <div
                  key={`${seed}-${i}`}
                  className="aspect-square w-[clamp(4rem,9vw,6.5rem)] shrink-0 overflow-hidden rounded-2xl"
                >
                  <AbstractVisual variant="recruit" seed={seed} className="h-full w-full" />
                </div>
              ))}
            </div>
          </div>

          <Reveal delayMs={150} className="mt-fluid-lg">
            <Link
              href="/recruit"
              className="circle-pop inline-block rounded-full border border-accent/60 px-fluid-sm py-3 text-fluid-sm font-medium text-accent transition-colors hover:text-white"
            >
              <span className="circle-pop__bg bg-accent" />
              <HoverFlipText>{ctaLabel}</HoverFlipText>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
