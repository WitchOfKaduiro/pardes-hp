/**
 * 参照元サイトの text-rotate-anime（ホバーで文字が上にロールし、複製テキストが
 * 下から現れる）を CSS のみで再現する。祖先の a / button 要素がホバー・
 * フォーカスされると globals.css の .hover-flip 系クラスがアニメーションする。
 */
export default function HoverFlipText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`hover-flip relative ${className}`}>
      <span className="hover-flip__row">{children}</span>
      <span aria-hidden="true" className="hover-flip__row hover-flip__row--dup">
        {children}
      </span>
    </span>
  );
}
