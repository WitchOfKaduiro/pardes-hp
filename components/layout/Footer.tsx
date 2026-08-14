import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import HoverFlipText from "@/components/ui/HoverFlipText";

const SITEMAP_ITEMS = [
  { href: "/", key: "home" },
  { href: "/business", key: "business" },
  { href: "/company", key: "company" },
  { href: "/product", key: "product" },
  { href: "/recruit", key: "recruit" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
] as const;

/**
 * 参照元サイトのfooter装飾（区切りのジグザグ罫線、背景に大きく滲む
 * ワードマーク）を、実写ロゴ画像ではなくCSSのみで再構築する。
 */
export default async function Footer() {
  const t = await getTranslations("nav");
  const tf = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer
      data-site-shell-footer
      className="relative overflow-hidden border-t border-border/80 bg-bg"
    >
      <div className="relative mx-auto max-w-6xl px-fluid-sm pt-fluid-lg">
        <p className="font-serif-en text-fluid-lg font-semibold text-fg">
          Pardes<span className="text-accent">.</span>
        </p>

        <div className="relative mt-fluid-md h-[80px] sm:h-[160px]">
          <svg
            aria-hidden="true"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full text-border"
          >
            <polyline
              points="0,0 50,100 100,0"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
          <p className="absolute bottom-0 right-0 font-serif-en text-[clamp(1.75rem,6vw,3.5rem)] font-bold leading-none text-fg">
            Pardes<span className="text-accent">.</span>
          </p>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-fluid-sm pb-fluid-lg pt-fluid-md">
        <div className="flex flex-col gap-fluid-md sm:flex-row sm:justify-between">
          <p className="max-w-sm font-serif-jp-body text-fluid-sm text-fg-muted">
            {tf("tagline")}
          </p>

          <nav aria-label={tf("sitemap")}>
            <p className="font-serif-en text-fluid-xs uppercase tracking-widest text-fg-subtle">
              {tf("sitemap")}
            </p>
            <ul className="mt-fluid-xs grid grid-cols-2 gap-x-fluid-md gap-y-2 font-serif-jp text-fluid-sm sm:grid-cols-1">
              {SITEMAP_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="whitespace-nowrap text-fg-muted transition-colors hover:text-fg"
                  >
                    <HoverFlipText>{t(item.key)}</HoverFlipText>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/legal/privacy"
                  className="whitespace-nowrap text-fg-muted transition-colors hover:text-fg"
                >
                  <HoverFlipText>{tf("privacy")}</HoverFlipText>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-fluid-lg text-fluid-xs text-fg-subtle">
          {tf("copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
