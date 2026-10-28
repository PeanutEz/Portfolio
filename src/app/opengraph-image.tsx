import { ImageResponse } from "next/og";

export const alt =
  "Luke — Backend Developer. Behind the interface. Beyond the ordinary.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#f3f7fc",
        color: "#18334f",
        padding: "90px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: 5,
          color: "#2463ba",
          marginBottom: 38,
        }}
      >
        BACKEND DEVELOPER
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 130,
          fontWeight: 700,
          letterSpacing: -7,
        }}
      >
        Luke<span style={{ color: "#2463ba" }}>.</span>
      </div>
      <div style={{ fontSize: 36, color: "#53677f", marginTop: 28 }}>
        Behind the interface. Beyond the ordinary.
      </div>
      <div
        style={{ width: 90, height: 4, background: "#2463ba", marginTop: 45 }}
      />
    </div>,
    size,
  );
}
