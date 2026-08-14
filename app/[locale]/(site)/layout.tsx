import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OpeningAnimation from "@/components/layout/OpeningAnimation";

/**
 * ホーム(参照サイト埋め込み)を除く全ページ共通のシェル。
 * ホームは参照HTML側に独自のヘッダー・フッター・オープニング演出を
 * 内包しているため、ここでの二重描画を避けるためにルートlayoutではなく
 * このルートグループにのみ適用する。
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OpeningAnimation />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
