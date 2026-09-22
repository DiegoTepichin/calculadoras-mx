import { SITE_NAME, SITE_URL } from "@/lib/site";

export function webApplicationSchema(opts: { nombre: string; descripcion: string; ruta: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.nombre,
    description: opts.descripcion,
    url: `${SITE_URL}${opts.ruta}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    inLanguage: "es-MX",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "MXN",
    },
  };
}

export function breadcrumbSchema(items: { nombre: string; ruta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nombre,
      item: `${SITE_URL}${item.ruta}`,
    })),
  };
}

/** Solo úsalo cuando la página ya muestre esos mismos pasos como una lista ordenada visible —
 * el texto debe reflejar fielmente el contenido de la página, no inventarlo para SEO. */
export function howToSchema(opts: { nombre: string; descripcion: string; pasos: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.nombre,
    description: opts.descripcion,
    step: opts.pasos.map((texto, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: texto,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "es-MX",
  };
}
