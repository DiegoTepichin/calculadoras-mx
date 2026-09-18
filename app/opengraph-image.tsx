import { generarImagenOG, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Calculadoras MX — ISR, Aguinaldo, Finiquito y UMA 2026";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return generarImagenOG("ISR, Aguinaldo, Finiquito y UMA 2026");
}
