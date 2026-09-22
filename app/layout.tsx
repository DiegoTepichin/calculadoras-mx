import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE_NAME, SITE_URL, ADSENSE_CLIENT_ID } from "@/lib/site";
import { JsonLd } from "@/lib/jsonld";
import { websiteSchema } from "@/lib/seo";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ISR, Aguinaldo, Finiquito y Vacaciones 2026`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Calculadoras gratuitas y actualizadas 2026 de ISR mensual, aguinaldo, finiquito y vacaciones según la Ley Federal del Trabajo y el SAT.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <JsonLd data={websiteSchema()} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
