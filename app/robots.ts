import type { MetadataRoute } from "next";

const SITE_URL = "https://calculadoras-mx.example.com"; // TODO: reemplazar por el dominio real al desplegar

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
