import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = ["", "/calculadora/isr", "/calculadora/resico", "/calculadora/aguinaldo", "/calculadora/finiquito", "/calculadora/uma", "/aviso-de-privacidad"];
  return rutas.map((ruta) => ({
    url: `${SITE_URL}${ruta}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: ruta === "" ? 1 : 0.8,
  }));
}
