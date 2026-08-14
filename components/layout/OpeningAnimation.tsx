"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const STORAGE_KEY = "pardes-opening-played";
const REVEAL_MS = 1200;
const FADE_MS = 600;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * 参照元サイトのオープニング演出（ロゴのクリップパス展開→本編表示）を
 * 参考にした、初回訪問時のみ再生するロゴリビール演出。sessionStorageに
 * 再生済みフラグを立て、タブ内の再訪問時はスキップする。prefers-reduced-motion
 * 環境やJS未実行時は常に何も表示しない（Reveal.tsxと同じ設計原則）。
 */
export default function OpeningAnimation() {
  const [playing, setPlaying] = useState(false);

  useIsomorphicLayoutEffect(() => {
    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      alreadyPlayed = false;
    }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (alreadyPlayed || reduceMotion) {
      return;
    }

    setPlaying(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setPlaying(false);
      document.body.style.overflow = previousOverflow;
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // sessionStorageが使えない環境では毎回再生されるが、致命的ではないため無視する
      }
    }, REVEAL_MS + FADE_MS);

    return () => window.clearTimeout(timer);
  }, []);

  if (!playing) return null;

  return (
    <div className="opening-anime" data-site-shell-opening aria-hidden="true">
      <span className="opening-anime__logo">
        Pardes<span className="text-accent">.</span>
      </span>
    </div>
  );
}
