import { generarImagenOG, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Convertidor de UVT 2026 (Colombia)";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return generarImagenOG("Convertidor de UVT 2026 (Colombia)");
}
