import Reveal from "@/components/ui/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import AbstractVisual from "./AbstractVisual";

type ContactPurpose = {
  tag: string;
  label: string;
  description: string;
};

/**
 * 参照元サイトの Contact セクション（薄いグレー背景の左カラムに英語タグ＋
 * 日本語リンク＋矢印の用途別問い合わせ導線、右カラムにビジュアル）を踏襲する。
 * 実際の代表電話番号は掲載しない。
 */
export default function ContactPanel({
  heading,
  body,
  purposes,
}: {
  heading: string;
  body: string;
  purposes: ContactPurpose[];
  ctaLabel: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-fluid-sm py-fluid-xl">
      <div className="grid overflow-hidden rounded-3xl md:grid-cols-2">
        <Reveal className="bg-bg-light p-fluid-md text-fg-on-light">
          <h2 className="font-serif-en text-fluid-2xl font-semibold">{heading}</h2>
          <p className="mt-fluid-sm max-w-sm text-fluid-base text-fg-muted-on-light">
            {body}
          </p>

          <ul className="mt-fluid-lg">
            {purposes.map((purpose) => (
              <li
                key={purpose.label}
                className="border-t border-border-on-light py-fluid-sm last:border-b"
              >
                {purpose.tag ? (
                  <p className="font-serif-en text-fluid-xs uppercase tracking-widest text-fg-muted-on-light">
                    {purpose.tag}
                  </p>
                ) : null}
                <ArrowLink
                  href="/contact"
                  underline={false}
                  className="mt-1 justify-between text-fluid-lg font-medium text-fg-on-light"
                >
                  {purpose.label}
                </ArrowLink>
              </li>
            ))}
          </ul>
        </Reveal>

        <AbstractVisual variant="contact" className="hidden min-h-[20rem] md:block" />
      </div>
    </section>
  );
}
