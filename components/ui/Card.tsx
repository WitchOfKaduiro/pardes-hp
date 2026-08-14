export default function Card({
  title,
  eyebrow,
  children,
  className = "",
}: {
  title: string;
  eyebrow?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-bg-elevated p-fluid-sm ${className}`}
    >
      {eyebrow && (
        <p className="text-fluid-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h3 className="mt-fluid-xs text-fluid-lg font-semibold text-fg">
        {title}
      </h3>
      {children && (
        <div className="mt-fluid-xs text-fluid-sm text-fg-muted">
          {children}
        </div>
      )}
    </div>
  );
}
