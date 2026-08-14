import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Pardes Inc.";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tagline =
    locale === "ja"
      ? "自由意志を持つ汎用人工知能（AGI）の実現へ"
      : "Toward artificial general intelligence with free will";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#000000",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 32 32"
          style={{ marginBottom: 32 }}
        >
          <rect width="32" height="32" rx="8" fill="#232323" />
          <g stroke="#0068b6" strokeWidth="1.6" fill="none" opacity={0.9}>
            <line x1="9" y1="22" x2="16" y2="9" />
            <line x1="16" y1="9" x2="23" y2="22" />
            <line x1="9" y1="22" x2="23" y2="22" />
            <line x1="16" y1="9" x2="16" y2="17" />
          </g>
          <circle cx="16" cy="9" r="2.4" fill="#0068b6" />
          <circle cx="9" cy="22" r="2.4" fill="#0068b6" />
          <circle cx="23" cy="22" r="2.4" fill="#0068b6" />
        </svg>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>
          Pardes<span style={{ color: "#0068b6" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 32,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 900,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
