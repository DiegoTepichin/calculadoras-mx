import { generarImagenOG, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Reforma de 40 horas: calendario y registro de jornada";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return generarImagenOG("Reforma de 40 horas: calendario y registro de jornada");
}
