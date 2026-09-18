import { generarImagenOG, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Convertidor de UMA 2026";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return generarImagenOG("Convertidor de UMA 2026");
}
