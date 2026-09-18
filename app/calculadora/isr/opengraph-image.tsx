import { generarImagenOG, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Calculadora de ISR mensual 2026";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return generarImagenOG("Calculadora de ISR mensual 2026");
}
