"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 松尾工務店サイトのヘッダー挙動（構造・動きのみ踏襲、コード非流用）:
 * - ページ上部では絶対配置のヘッダー（header-static）がヒーロー上に重なって表示され、
 *   スクロールとともに自然に流れて消える。
 * - header-static の高さを超えてスクロールすると、固定ヘッダー（header-dynamic、
 *   このコンポーネントがラップする）が現れる。下スクロールで隠れ、上スクロールで
 *   再表示される（一般的なsticky-hide-revealパターン）。
 * - 非表示中は `inert` を付与し、フォーカス・読み上げ順序から除外する。
 * - JS未実行時は常に表示状態（transformなし）のため、初回HTMLレンダリングでは
 *   ナビゲーションリンクが確実に存在する。
 */
export default function HeaderScrollController({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hidden, setHidden] = useState(true);
  const lastYRef = useRef(0);

  useEffect(() => {
    lastYRef.current = window.scrollY;
    let ticking = false;

    const getThreshold = () => {
      const staticEl = document.getElementById("site-header-static");
      return staticEl?.getBoundingClientRect().height ?? 96;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const threshold = getThreshold();

        if (y < threshold) {
          setHidden(true);
        } else if (y < lastYRef.current) {
          setHidden(false);
        } else if (y > lastYRef.current) {
          setHidden(true);
        }

        lastYRef.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      inert={hidden || undefined}
      aria-hidden={hidden}
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.5s var(--ease-sharp)",
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {children}
    </div>
  );
}
