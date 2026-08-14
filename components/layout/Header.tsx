import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import LangSwitch from "./LangSwitch";
import HeaderScrollController from "./HeaderScrollController";
import MobileMenu from "./MobileMenu";
import HoverFlipText from "@/components/ui/HoverFlipText";

const LEFT_NAV_ITEMS = [
  { href: "/business", key: "business" },
  { href: "/company", key: "company" },
  { href: "/product", key: "product" },
] as const;

const RIGHT_NAV_ITEMS = [
  { href: "/news", key: "news" },
  { href: "/recruit", key: "recruit" },
] as const;

const ALL_NAV_ITEMS = [
  { href: "/", key: "home" },
  ...LEFT_NAV_ITEMS,
  ...RIGHT_NAV_ITEMS,
] as const;

/**
 * 参照元サイトの「静的ヘッダー（ヒーロー上に重なる絶対配置・背が高い）」
 * 「動的ヘッダー（スクロール後に現れる固定配置・背が低い）」という
 * 二層構造を踏襲する（構造・動きのみ、コード非流用）。
 * デスクトップはナビ左右分割＋ロゴ中央、モバイルはロゴ左＋ハンバーガー右という
 * 参照元の配置をそのまま踏襲し、ハンバーガーメニューはデスクトップでも常に表示する。
 */
function HeaderInner({
  t,
  variant,
}: {
  t: Awaited<ReturnType<typeof getTranslations<"nav">>>;
  variant: "static" | "dynamic";
}) {
  const heightClass =
    variant === "static"
      ? "h-[calc(64/var(--screen-size)*var(--effective-viewport-width))] md:h-[calc(80/var(--screen-size)*var(--effective-viewport-width))]"
      : "h-[calc(52/var(--screen-size)*var(--effective-viewport-width))] md:h-[calc(60/var(--screen-size)*var(--effective-viewport-width))]";

  return (
    <div
      id={`site-header-${variant}`}
      className={`${
        variant === "static"
          ? "absolute inset-x-0 top-0 z-40 bg-gradient-to-b from-bg/90 via-bg/40 to-transparent"
          : "border-b border-border/80 bg-bg/95 backdrop-blur"
      } ${heightClass}`}
    >
      <div className="relative mx-auto flex h-full max-w-6xl items-center px-fluid-sm">
        <nav className="hidden flex-1 items-center gap-fluid-sm font-serif-jp text-fluid-sm md:flex">
          {LEFT_NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-fg-muted transition-colors hover:text-fg"
            >
              <HoverFlipText>{t(item.key)}</HoverFlipText>
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="font-serif-en text-fluid-lg font-semibold tracking-tight text-fg md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          Pardes<span className="text-accent">.</span>
        </Link>

        <div className="ml-auto flex flex-1 items-center justify-end gap-fluid-sm md:flex-none">
          <nav className="hidden items-center gap-fluid-sm font-serif-jp text-fluid-sm md:flex">
            {RIGHT_NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-fg-muted transition-colors hover:text-fg"
              >
                <HoverFlipText>{t(item.key)}</HoverFlipText>
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="circle-pop hidden rounded-full border border-accent/60 px-fluid-sm py-2 font-serif-jp text-fluid-sm font-medium text-accent transition-colors hover:text-white md:inline-block"
          >
            <span className="circle-pop__bg bg-accent" />
            <HoverFlipText>{t("contact")}</HoverFlipText>
          </Link>
          <div className="hidden md:block">
            <LangSwitch />
          </div>
          <MobileMenu
            items={[...ALL_NAV_ITEMS, { href: "/contact", key: "contact" } as const].map(
              (item) => ({ href: item.href, label: t(item.key) })
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default async function Header() {
  const t = await getTranslations("nav");

  return (
    <div data-site-shell-header>
      <HeaderInner t={t} variant="static" />
      <HeaderScrollController>
        <HeaderInner t={t} variant="dynamic" />
      </HeaderScrollController>
    </div>
  );
}
