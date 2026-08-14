"use client";

import { useEffect, useState } from "react";
import { Link } from "@/lib/i18n/navigation";
import LangSwitch from "./LangSwitch";

/**
 * 参照元サイトのハンバーガーメニュー挙動を参考にした
 * 円形リビール式のフルスクリーンメニュー（構造・動きのみ踏襲、コード非流用）。
 * 参照元同様、デスクトップのナビが表示されている状態でもハンバーガーは常に表示する。
 * ボタン位置を中心に clip-path の circle() を 0% → 150% へアニメーションさせ、
 * リンクは開閉に連動して段階的にフェードイン・アウトする。
 */
export default function MobileMenu({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className="h-px w-6 bg-current"
          style={{
            transform: open ? "translateY(5px) rotate(45deg)" : "none",
            transition: "transform 0.4s var(--ease-out-expo)",
          }}
        />
        <span
          className="h-px w-6 bg-current"
          style={{
            opacity: open ? 0 : 1,
            transition: "opacity 0.2s var(--ease-out-expo)",
          }}
        />
        <span
          className="h-px w-6 bg-current"
          style={{
            transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
            transition: "transform 0.4s var(--ease-out-expo)",
          }}
        />
      </button>

      <div
        inert={!open || undefined}
        aria-hidden={!open}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-fluid-md bg-bg-elevated-2"
        style={{
          clipPath: open
            ? "circle(150% at calc(100% - 2.5rem) 2.5rem)"
            : "circle(0% at calc(100% - 2.5rem) 2.5rem)",
          transition: "clip-path 0.6s var(--ease-sharp)",
        }}
      >
        <nav className="flex flex-col items-center gap-fluid-sm text-fluid-xl">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-fg"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.5s var(--ease-out-expo), transform 0.5s var(--ease-out-expo)",
                transitionDelay: open ? `${150 + index * 60}ms` : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-fluid-md">
          <LangSwitch />
        </div>
      </div>
    </div>
  );
}
