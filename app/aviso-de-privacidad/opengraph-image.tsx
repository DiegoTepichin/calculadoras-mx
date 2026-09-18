import { generarImagenOG, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Aviso de Privacidad — Calculadoras MX";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return generarImagenOG("Aviso de Privacidad");
}
