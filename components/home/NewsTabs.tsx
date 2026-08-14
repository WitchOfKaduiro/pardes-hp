"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/i18n/navigation";
import type { NewsCategory } from "@/lib/news";
import HoverFlipText from "@/components/ui/HoverFlipText";
import ArrowLink from "@/components/ui/ArrowLink";
import AbstractVisual, { type AbstractVisualVariant } from "./AbstractVisual";

const THUMB_VARIANTS: AbstractVisualVariant[] = [
  "news",
  "showcase-1",
  "showcase-2",
  "showcase-3",
];

const TAB_KEYS = ["all", "milestone", "recruit"] as const;
type TabKey = (typeof TAB_KEYS)[number];

type PreviewArticle = {
  slug: string;
  title: string;
  category: NewsCategory;
  publishedLabel: string;
  excerpt: string;
};

/**
 * 参照元サイトの News セクション（左サイドバーの縦タブ＋アクティブタブに
 * 追従する縦バーインジケーター、右側のカードグリッド）を踏襲する。
 * データソースは既存の lib/news.ts（お知らせページと共通）をそのまま再利用する。
 */
export default function NewsTabs({
  heading,
  categoryLabels,
  viewAllLabel,
  emptyLabel,
  articles,
}: {
  heading: string;
  categoryLabels: Record<NewsCategory | "all", string>;
  viewAllLabel: string;
  emptyLabel: string;
  articles: PreviewArticle[];
}) {
  const [tab, setTab] = useState<TabKey>("all");
  const filtered = articles
    .filter((article) => tab === "all" || article.category === tab)
    .slice(0, 6);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [marker, setMarker] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const el = tabRefs.current[TAB_KEYS.indexOf(tab)];
    if (el) setMarker({ top: el.offsetTop, height: el.offsetHeight });
  }, [tab]);

  return (
    <section className="bg-bg-light py-fluid-xl text-fg-on-light">
      <div className="mx-auto flex max-w-6xl flex-col gap-fluid-md px-fluid-sm md:flex-row">
        <div className="shrink-0 md:w-48">
          <h2 className="font-serif-en text-fluid-2xl font-semibold text-fg-on-light">
            {heading}
          </h2>
          <div
            className="relative mt-fluid-md flex gap-fluid-sm border-border-on-light pl-fluid-sm md:flex-col md:gap-fluid-xs md:border-l"
            role="tablist"
            aria-orientation="vertical"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 hidden w-px bg-accent-dim transition-[top,height] duration-300 md:block"
              style={{ top: marker.top, height: marker.height }}
            />
            {TAB_KEYS.map((key, index) => (
              <button
                key={key}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`py-1 text-left text-fluid-sm transition-colors ${
                  tab === key
                    ? "text-accent-dim"
                    : "text-fg-muted-on-light hover:text-fg-on-light"
                }`}
              >
                <HoverFlipText>{categoryLabels[key]}</HoverFlipText>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <ul className="grid gap-fluid-sm md:grid-cols-3">
            {filtered.map((article, index) => (
              <li
                key={article.slug}
                className="overflow-hidden rounded-2xl border border-border-on-light bg-white"
              >
                <AbstractVisual
                  variant={THUMB_VARIANTS[index % THUMB_VARIANTS.length]}
                  className="aspect-[3/2] w-full"
                />
                <div className="p-fluid-sm">
                  <h3 className="relative inline-block text-fluid-lg font-semibold text-fg-on-light">
                    <Link href={`/news/${article.slug}`} className="relative">
                      <HoverFlipText>{article.title}</HoverFlipText>
                      <span aria-hidden="true" className="hover-underline" />
                    </Link>
                  </h3>
                  <p className="mt-fluid-xs text-fluid-xs text-fg-muted-on-light/70">
                    {categoryLabels[article.category]} / {article.publishedLabel}
                  </p>
                  <p className="mt-fluid-xs text-fluid-sm text-fg-muted-on-light">
                    {article.excerpt}
                  </p>
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="text-fluid-sm text-fg-muted-on-light">{emptyLabel}</li>
            )}
          </ul>

          <div className="mt-fluid-md flex justify-end">
            <ArrowLink href="/news" className="text-fluid-sm text-fg-on-light">
              {viewAllLabel}
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
