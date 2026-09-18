import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function generarImagenOG(titulo: string) {
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
          background: "linear-gradient(135deg, #064e3b 0%, #047857 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.85, marginBottom: 24 }}>{SITE_NAME}</div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>{titulo}</div>
      </div>
    ),
    ogImageSize
  );
}
