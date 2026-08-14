const VARIANTS = [
  "hero",
  "about-business",
  "about-company",
  "about-product",
  "showcase-1",
  "showcase-2",
  "showcase-3",
  "contact",
  "recruit",
  "news",
] as const;

export type AbstractVisualVariant = (typeof VARIANTS)[number];

function hashSeed(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Pardes向けの生成ビジュアル。外部の写真素材を一切使わず、ニューラルネットワークの
 * ノード・エッジを模した抽象グラフィックをvariantごとに決定論的に生成する
 * （REQ-DESIGN-06「抽象的なグラフィック/データビジュアライゼーション中心」に対応）。
 * 参照元サイトの物件写真・ロゴ画像はどの部分にも使用しない。
 */
export default function AbstractVisual({
  variant,
  className = "",
  fill = false,
  seed = "",
}: {
  variant: AbstractVisualVariant;
  className?: string;
  /** true の場合 absolute inset-0 で親要素いっぱいに敷き詰める（背景として使う場合）。
   * className に直接 "absolute" を渡すと、この要素が既定で持つ "relative" と
   * 衝突して高さ0に潰れてしまうため、必ずこのプロパティ経由で指定すること。 */
  fill?: boolean;
  /** 同じvariantのまま別パターンを生成したい場合に指定する（スクロール連動の
   * クロスフェード演出で複数フレームを用意する用途など） */
  seed?: string;
}) {
  const random = mulberry32(hashSeed(variant + seed));
  const nodeCount = 14 + Math.floor(random() * 6);
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: i,
    x: random() * 100,
    y: random() * 100,
    r: 1.2 + random() * 2.4,
  }));

  const edges: { a: number; b: number }[] = [];
  nodes.forEach((node, i) => {
    const next = nodes[(i + 1 + Math.floor(random() * 2)) % nodes.length];
    edges.push({ a: node.id, b: next.id });
  });

  const gradientId = `av-grad-${variant}`;
  const glowId = `av-glow-${variant}`;

  return (
    <div
      className={`overflow-hidden bg-bg-elevated ${fill ? "absolute inset-0" : "relative"} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id={gradientId} cx="30%" cy="20%" r="90%">
            <stop offset="0%" stopColor="#004e82" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <filter id={glowId}>
            <feGaussianBlur stdDeviation="1.1" />
          </filter>
        </defs>
        <rect width="100" height="100" fill={`url(#${gradientId})`} />
        {edges.map((edge, i) => {
          const a = nodes[edge.a];
          const b = nodes[edge.b];
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#0068b6"
              strokeOpacity={0.18}
              strokeWidth={0.15}
            />
          );
        })}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="#0068b6"
            fillOpacity={0.55}
            filter={`url(#${glowId})`}
          />
        ))}
      </svg>
    </div>
  );
}
