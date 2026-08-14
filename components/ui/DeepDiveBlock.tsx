import ArrowLink from "./ArrowLink";

export default function DeepDiveBlock({
  label,
  title,
  meta,
  body,
  ctaLabel,
  ctaHref,
}: {
  label: string;
  title: string;
  meta?: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="pardes-deep-dive">
      <p className="pardes-deep-dive__label font-en" aria-hidden="true">
        {label}
      </p>
      <h3 className="pardes-deep-dive__title font-shippori">{title}</h3>
      {meta && <p className="pardes-deep-dive__meta font-kozuka">{meta}</p>}
      <p className="pardes-deep-dive__body font-kozuka">{body}</p>
      <ArrowLink href={ctaHref} className="pardes-deep-dive__cta font-shippori">
        {ctaLabel}
      </ArrowLink>
    </div>
  );
}
