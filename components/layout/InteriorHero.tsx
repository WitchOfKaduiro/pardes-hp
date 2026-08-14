import { Link } from "@/lib/i18n/navigation";

export default function InteriorHero({
  title,
}: {
  title: string;
}) {
  return (
    <header className="pardes-interior-hero">
      <div className="pardes-interior-hero__inner">
        <h1 className="pardes-interior-hero__title font-shippori">{title}</h1>
        <nav className="pardes-interior-hero__breadcrumb" aria-label="Breadcrumb">
          <Link href="/">HOME</Link>
          <span aria-hidden="true">&gt;</span>
          <span aria-current="page">{title}</span>
        </nav>
      </div>
    </header>
  );
}
