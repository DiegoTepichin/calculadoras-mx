import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadoras fiscales y laborales de Colombia 2026",
  description:
    "Calculadoras gratuitas 2026 para Colombia: retención en la fuente, prima de servicios y convertidor de UVT, con las cifras oficiales de la DIAN.",
  alternates: { canonical: "/co" },
};

const calculadoras = [
  {
    href: "/co/calculadora/retencion",
    titulo: "Calculadora de retención en la fuente 2026",
    descripcion: "Calcula la retención en la fuente de tu salario mensual según la tabla del Art. 383 del Estatuto Tributario.",
  },
  {
    href: "/co/calculadora/prima",
    titulo: "Calculadora de prima de servicios 2026",
    descripcion: "Calcula tu prima de servicios semestral según los días trabajados (Art. 306 CST).",
  },
  {
    href: "/co/calculadora/uvt",
    titulo: "Convertidor de UVT 2026",
    descripcion: "Convierte pesos colombianos a UVT y viceversa con el valor oficial vigente de la UVT 2026.",
  },
];

export default function ColombiaHomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-3">
        Calculadoras fiscales y laborales de Colombia 2026
      </h1>
      <p className="text-slate-600 mb-4 max-w-2xl">
        Herramientas gratuitas y actualizadas con la UVT 2026, el salario mínimo 2026 y la tabla de
        retención en la fuente de la DIAN. Sin registro, resultados instantáneos.
      </p>
      <p className="text-sm mb-10">
        <Link href="/" className="text-emerald-700 underline hover:text-emerald-800">
          ¿Buscas calculadoras para México? →
        </Link>
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {calculadoras.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block rounded-xl border border-slate-200 p-5 hover:border-emerald-400 hover:shadow-sm transition"
          >
            <h2 className="font-semibold mb-1">{c.titulo}</h2>
            <p className="text-sm text-slate-600">{c.descripcion}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
