import { generarImagenOG, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Calculadoras MX — Colombia 2026";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return generarImagenOG("Retención, Prima de Servicios y UVT (Colombia) 2026");
}
