"use client";

import { useState } from "react";
import { Link } from "@/lib/i18n/navigation";
import type { NewsArticle, NewsCategory } from "@/lib/news";

type CategoryFilter = NewsCategory | "all";
type NewsListItem = NewsArticle & { publishedLabel: string };

export default function NewsList({
  articles,
  categoryLabels,
  emptyLabel,
}: {
  articles: NewsListItem[];
  categoryLabels: Record<CategoryFilter, string>;
  emptyLabel: string;
  readMoreLabel: string;
}) {
  const [selected, setSelected] = useState<CategoryFilter>("all");

  const categories: CategoryFilter[] = [
    "all",
    "milestone",
    "recruit",
    "poc",
    "media",
  ];

  const visibleArticles = articles.filter(
    (article) => selected === "all" || selected === article.category
  );

  return (
    <div className="pardes-news-list sm:flex sm:items-start sm:gap-fluid-lg">
      <div
        className="pardes-news-list__filters flex flex-wrap gap-fluid-xs sm:w-[200px] sm:shrink-0 sm:flex-col sm:gap-fluid-xs sm:sticky sm:top-fluid-lg"
        role="tablist"
        aria-label={categoryLabels.all}
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={selected === category}
            onClick={() => setSelected(category)}
            className={`relative py-1 text-left font-serif-jp text-fluid-sm transition-colors sm:pl-fluid-sm ${
              selected === category
                ? "text-accent"
                : "text-fg-muted-on-light hover:text-fg-on-light"
            }`}
          >
            {selected === category && (
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 hidden w-[3px] bg-accent sm:block"
              />
            )}
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      <ul className="pardes-news-list__grid mt-fluid-md grid flex-1 grid-cols-1 gap-fluid-sm sm:mt-0 sm:grid-cols-2 lg:grid-cols-3">
        {visibleArticles.map((article) => (
          <li key={article.slug} className="pardes-news-list__card">
            <Link href={`/news/${article.slug}`} className="group block">
              <div className="pardes-news-list__image relative aspect-[315/210] overflow-hidden rounded-[4px] bg-border-on-light">
                <img
                  src="/wp/wp-content/themes/matsuo/assets/images/pardes/news-placeholder.svg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-fluid-xs font-serif-jp text-fluid-sm leading-snug text-fg-on-light underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-fg-on-light">
                {article.title}
              </p>
              <div className="mt-fluid-xs flex items-center gap-fluid-xs text-fluid-xs text-fg-muted-on-light">
                <span>{categoryLabels[article.category]}</span>
                <span aria-hidden="true">/</span>
                <span>{article.publishedLabel}</span>
              </div>
            </Link>
          </li>
        ))}
        {visibleArticles.length === 0 && (
          <li className="text-fluid-sm text-fg-muted-on-light">
            {emptyLabel}
          </li>
        )}
      </ul>
    </div>
  );
}
