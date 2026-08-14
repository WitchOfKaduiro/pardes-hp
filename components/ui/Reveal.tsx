"use client";

import { useEffect, useRef, useState } from "react";

/**
 * スクロールで要素が視界に入ったタイミングでフェードインさせる。
 * 松尾工務店ミラーの IntersectionObserver 連動リビール手法を参考にしているが、
 * 重要な違いとして、デフォルト（SSR・JS未実行時）は必ず可視状態にする。
 * JSが読み込まれない・失敗した場合でもコンテンツが opacity:0 のまま
 * 消えてしまわないようにするため（松尾工務店サイトの調査で見つかった不具合と
 * 同種の問題を避けるための設計）。
 */
export default function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

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
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${animate ? "reveal" : ""} ${className}`}
      style={animate ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
