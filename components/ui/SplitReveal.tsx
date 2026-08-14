"use client";

import { useEffect, useRef, useState } from "react";

function splitGraphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

/**
 * 見出しを1文字ずつスタッガーでリビールする。参照元サイトの text-split-anime を
 * 参考にした演出だが、Reveal.tsx と同じ原則で、デフォルト（SSR・JS未実行時）は
 * 常にプレーンテキストとして完全表示する。JSはIntersectionObserverの発火時に
 * スタガーアニメーション用のクラスを追加するのみで、表示状態そのものには
 * 依存しない。
 */
const RANDOM_DIR_TRANSFORMS = [
  "translate(0, 0.5em)",
  "translate(0.45em, 0.3em)",
  "translate(-0.45em, 0.3em)",
  "translate(0, -0.35em)",
];

export default function SplitReveal({
  text,
  as: Tag = "span",
  className = "",
  charClassName = "",
  staggerMs = 30,
  randomDir = false,
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
  charClassName?: string;
  staggerMs?: number;
  /** 参照元サイトの text-split-anime（文字ごとにランダムな方向からスライドイン）を再現する */
  randomDir?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);
  const chars = splitGraphemes(text);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      <span aria-hidden="true">
        {chars.map((char, index) => (
          <span
            key={index}
            className={`split-char ${animate ? (randomDir ? "split-char-in-dir" : "split-char-in") : ""} ${charClassName}`}
            style={
              animate
                ? ({
                    animationDelay: `${index * staggerMs}ms`,
                    ...(randomDir
                      ? {
                          "--from-transform":
                            RANDOM_DIR_TRANSFORMS[index % RANDOM_DIR_TRANSFORMS.length],
                        }
                      : {}),
                  } as React.CSSProperties)
                : undefined
            }
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </Tag>
  );
}
