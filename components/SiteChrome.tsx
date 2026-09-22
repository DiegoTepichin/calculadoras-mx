"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/site";
import { PAISES } from "@/lib/paises";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const esColombia = pathname.startsWith("/co");
  const otroPais = esColombia ? PAISES.find((p) => p.codigo === "mx")! : PAISES.find((p) => p.codigo === "co")!;
  const inicio = esColombia ? "/co" : "/";

  return (
    <>
      <header className="border-b border-slate-200">
        <nav className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <Link href={inicio} className="font-semibold text-lg tracking-tight">
            Calculadoras<span className="text-emerald-600">MX</span>
          </Link>
          <div className="flex flex-wrap justify-end gap-x-4 gap-y-1 text-sm">
            {esColombia ? (
              <>
                <Link href="/co/calculadora/retencion" className="hover:text-emerald-600">Retención en la fuente</Link>
                <Link href="/co/calculadora/prima" className="hover:text-emerald-600">Prima de servicios</Link>
                <Link href="/co/calculadora/uvt" className="hover:text-emerald-600">UVT</Link>
              </>
            ) : (
              <>
                <Link href="/calculadora/isr" className="hover:text-emerald-600">ISR</Link>
                <Link href="/calculadora/resico" className="hover:text-emerald-600">RESICO</Link>
                <Link href="/calculadora/nomina" className="hover:text-emerald-600">Nómina</Link>
                <Link href="/calculadora/aguinaldo" className="hover:text-emerald-600">Aguinaldo</Link>
                <Link href="/calculadora/finiquito" className="hover:text-emerald-600">Finiquito</Link>
                <Link href="/calculadora/uma" className="hover:text-emerald-600">UMA</Link>
                <Link href="/calculadora/imss-patronal" className="hover:text-emerald-600">IMSS patronal</Link>
              </>
            )}
            <Link href={otroPais.ruta} className="hover:text-emerald-600">
              {otroPais.bandera} {otroPais.nombre}
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-10">{children}</main>
      <footer className="border-t border-slate-200 mt-16">
        <div className="mx-auto max-w-4xl px-4 py-8 text-xs text-slate-500 space-y-2">
          {esColombia ? (
            <p>
              Las cifras usadas (UVT, salario mínimo, auxilio de transporte, tabla de retención en
              la fuente) corresponden a 2026 y provienen de fuentes públicas (DIAN, Ministerio del
              Trabajo). Este sitio es una herramienta de referencia, no constituye asesoría fiscal
              o legal — verifica siempre con tu contador o abogado laboral antes de tomar
              decisiones.
            </p>
          ) : (
            <p>
              Las cifras usadas (tarifa ISR, subsidio al empleo, UMA, salario mínimo, tabla de
              vacaciones) corresponden a 2026 y provienen de fuentes públicas (SAT, INEGI,
              CONASAMI, Ley Federal del Trabajo). Este sitio es una herramienta de referencia,
              no constituye asesoría fiscal o legal — verifica siempre con tu contador o abogado
              laboral antes de tomar decisiones.
            </p>
          )}
          <p>
            <Link href="/aviso-de-privacidad" className="underline hover:text-slate-700">
              Aviso de privacidad
            </Link>
          </p>
          <p>© {new Date().getFullYear()} {SITE_NAME}. Hecho en {esColombia ? "Colombia" : "México"}.</p>
        </div>
      </footer>
    </>
  );
}
