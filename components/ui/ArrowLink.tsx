import { Link } from "@/lib/i18n/navigation";
import HoverFlipText from "./HoverFlipText";

/**
 * 参照元サイトの「文字ロールホバー＋下線スライドイン＋矢印アイコン入れ替え」の
 * 組み合わせリンク（"詳しく見る" 等の case-by-case a 要素群）を汎用化したもの。
 * underline/arrow は個別にオフにできる。
 */
export default function ArrowLink({
  href,
  children,
  className = "",
  underline = true,
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
  arrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative inline-flex items-center gap-fluid-xs ${className}`}
    >
      <HoverFlipText>{children}</HoverFlipText>
      {arrow && (
        <span
          aria-hidden="true"
          className="arrow-slide inline-block h-[1em] w-[1.2em] shrink-0"
        >
          <span className="arrow-slide__icon">→</span>
          <span className="arrow-slide__icon arrow-slide__icon--in">→</span>
        </span>
      )}
      {underline && <span aria-hidden="true" className="hover-underline" />}
    </Link>
  );
}
