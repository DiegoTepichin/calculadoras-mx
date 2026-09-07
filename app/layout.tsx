import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const SITE_NAME = "Calculadoras MX";
const SITE_URL = "https://calculadoras-mx.example.com"; // TODO: reemplazar por el dominio real al desplegar

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ISR, Aguinaldo, Finiquito y Vacaciones 2026`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Calculadoras gratuitas y actualizadas 2026 de ISR mensual, aguinaldo, finiquito y vacaciones según la Ley Federal del Trabajo y el SAT.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
        <header className="border-b border-slate-200">
          <nav className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold text-lg tracking-tight">
              Calculadoras<span className="text-emerald-600">MX</span>
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/calculadora/isr" className="hover:text-emerald-600">ISR</Link>
              <Link href="/calculadora/aguinaldo" className="hover:text-emerald-600">Aguinaldo</Link>
              <Link href="/calculadora/finiquito" className="hover:text-emerald-600">Finiquito</Link>
              <Link href="/calculadora/uma" className="hover:text-emerald-600">UMA</Link>
            </div>
          </nav>
        </header>
        <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-10">{children}</main>
        <footer className="border-t border-slate-200 mt-16">
          <div className="mx-auto max-w-4xl px-4 py-8 text-xs text-slate-500 space-y-2">
            <p>
              Las cifras usadas (tarifa ISR, subsidio al empleo, UMA, salario mínimo, tabla de
              vacaciones) corresponden a 2026 y provienen de fuentes públicas (SAT, INEGI,
              CONASAMI, Ley Federal del Trabajo). Este sitio es una herramienta de referencia,
              no constituye asesoría fiscal o legal — verifica siempre con tu contador o abogado
              laboral antes de tomar decisiones.
            </p>
            <p>© {new Date().getFullYear()} {SITE_NAME}. Hecho en México.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
