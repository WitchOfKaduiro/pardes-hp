"use client";

import { usePathname } from "@/lib/i18n/navigation";
import { useParams } from "next/navigation";
import { routing } from "@/lib/i18n/routing";

/**
 * home/business/company は言語によって全く別のレンダリング経路
 * (参照サイトの生HTML+Alpine.js 埋め込み ⇔ 通常のReactページ)を持つため、
 * next-intlのソフト（クライアントサイド）遷移でこれらの間を移動すると、
 * 埋め込み側のCSS/JSの初期化・破棄タイミングが競合してレイアウト崩れや
 * 例外が発生する。そのため言語切り替えは常に通常の<a>タグによる
 * ハードナビゲーション(フルページ遷移)のみを使う。
 */
export default function LangSwitch() {
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  return (
    <div className="flex items-center gap-fluid-xs text-fluid-sm font-medium">
      {routing.locales.map((locale, index) => {
        const active = locale === currentLocale;
        const href = `/${locale}${pathname === "/" ? "" : pathname}`;
        return (
          <span key={locale} className="flex items-center gap-fluid-xs">
            {index > 0 && (
              <span className="text-fg-subtle" aria-hidden="true">
                /
              </span>
            )}
            <a
              href={href}
              aria-current={active ? "true" : undefined}
              className={
                active
                  ? "text-accent underline underline-offset-4"
                  : "text-fg-muted hover:text-fg transition-colors"
              }
            >
              {locale.toUpperCase()}
            </a>
          </span>
        );
      })}
    </div>
  );
}
