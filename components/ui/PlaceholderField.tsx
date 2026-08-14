/**
 * 会社概要の所在地・設立日・資本金など、事業計画書の時点で確定情報が
 * 存在しない項目を「準備中」表記するためのコンポーネント（REQ-COMPANY-03）。
 * 確定情報が判明したら value を渡すだけで表示が切り替わる。
 */
export default function PlaceholderField({
  label,
  value,
  pendingLabel,
}: {
  label: string;
  value?: string | null;
  pendingLabel: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-fluid-xs sm:flex-row sm:justify-between">
      <dt className="text-fluid-sm text-fg-muted">{label}</dt>
      <dd className="text-fluid-sm">
        {value ? (
          <span className="text-fg">{value}</span>
        ) : (
          <span className="rounded-full border border-fg-subtle/60 px-3 py-0.5 text-fluid-xs text-fg-subtle">
            {pendingLabel}
          </span>
        )}
      </dd>
    </div>
  );
}
