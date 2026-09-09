import type { MetadataRoute } from "next";

const SITE_URL = "https://calculadoras-mx.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = ["", "/calculadora/isr", "/calculadora/aguinaldo", "/calculadora/finiquito", "/calculadora/uma"];
  return rutas.map((ruta) => ({
    url: `${SITE_URL}${ruta}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: ruta === "" ? 1 : 0.8,
  }));
}
