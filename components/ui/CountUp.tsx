"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 数値をカウントアップ演出で表示する。参照元サイトの mv-count-up を参考にした
 * 演出だが、デフォルト（SSR・JS未実行時）は常に最終値を表示する。JSは
 * IntersectionObserver発火時に0→最終値への一時的なアニメーションを加えるのみで、
 * 表示される数値自体はアニメーション開始前・完了後ともに常に正しい最終値になる。
 */
export default function CountUp({
  value,
  durationMs = 1200,
  className = "",
}: {
  value: number;
  durationMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          setDisplay(Math.round(value * progress));
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplay(value);
          }
        };
        setDisplay(0);
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}
    </span>
  );
}
