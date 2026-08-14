"use client";

import { useState } from "react";
import { Link } from "@/lib/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import HoverFlipText from "@/components/ui/HoverFlipText";
import AbstractVisual, { type AbstractVisualVariant } from "./AbstractVisual";

type AboutLinkItem = {
  href: string;
  label: string;
  visual: AbstractVisualVariant;
};

/**
 * 参照元サイトの About us セクション（事業紹介/ヒストリー/会社概要への
 * 3リンク＋ホバー連動の画像クロスフェード）を踏襲する。ヒストリーページは
 * Pardesに存在しないため3項目（事業紹介/会社概要/製品説明）に調整し、
 * 画像は実写ではなく AbstractVisual に差し替える。
 */
export default function AboutLinks({
  heading,
  body,
  items,
}: {
  heading: string;
  body: string;
  items: AboutLinkItem[];
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative bg-bg-light py-fluid-xl text-fg-on-light">
      <div className="mx-auto max-w-6xl px-fluid-sm">
        <Reveal>
          <h2 className="font-serif-en text-fluid-2xl font-semibold text-fg-on-light">
            {heading}
          </h2>
          <p className="mt-fluid-sm max-w-2xl font-serif-jp-body text-fluid-base text-fg-muted-on-light">
            {body}
          </p>
        </Reveal>

        <div className="relative mt-fluid-lg grid gap-fluid-sm md:grid-cols-[1.1fr_1fr] md:items-center">
          <ul className="divide-y divide-border-on-light">
            {items.map((item, index) => (
              <Reveal key={item.href} delayMs={index * 80}>
                <li
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                >
                  <Link
                    href={item.href}
                    className="relative flex items-center justify-between py-fluid-sm font-serif-jp text-fluid-xl font-semibold text-fg-on-light transition-colors hover:text-accent-dim md:text-fluid-2xl"
                  >
                    <HoverFlipText>{item.label}</HoverFlipText>
                    <span
                      aria-hidden="true"
                      className="text-fluid-base text-fg-muted-on-light"
                    >
                      →
                    </span>
                    <span aria-hidden="true" className="hover-underline" />
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>

        <div
          aria-hidden="true"
          className="relative hidden aspect-[4/5] overflow-hidden rounded-3xl md:block"
        >
          {items.map((item, index) => (
            <div
              key={item.href}
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                opacity:
                  hovered === null ? (index === 0 ? 1 : 0) : hovered === index ? 1 : 0,
              }}
            >
              <AbstractVisual variant={item.visual} className="h-full w-full" />
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
