import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";

export const alt = `${SITE.brandFull}: a family of home-grown brands`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social card drawn in code: black field, white type, the one red. The little
// house mark in white with the red door. No external image assets.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#ffffff",
          padding: 72,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* the solid house mark */}
          <svg width="84" height="84" viewBox="0 0 96 96">
            <path d="M20 82 L20 45 L48 19 L58 28.3 L58 21 L68 21 L68 37.6 L76 45 L76 82 Z" fill="#ffffff" />
            <path d="M41 82 L41 64 A7 7 0 0 1 55 64 L55 82 Z" fill="#e10600" />
          </svg>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, color: "#e10600", fontWeight: 700 }}>
            OUR LITTLE COMPANY LLC
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.0,
              maxWidth: 1020,
              textTransform: "uppercase",
              letterSpacing: -2,
            }}
          >
            A little company. A family of home-grown brands.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#9a9a9a" }}>
            Our Little Book LLC · Chorzle LLC · Carroll Consulting LLC
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#9a9a9a", letterSpacing: 2 }}>
          {`IMAGINED, DESIGNED, AND BUILT FROM THE GROUND UP · ${SITE.domain.toUpperCase()}`}
        </div>
      </div>
    ),
    { ...size },
  );
}
