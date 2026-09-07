import Link from "next/link";

const calculadoras = [
  {
    href: "/calculadora/isr",
    titulo: "Calculadora de ISR mensual 2026",
    descripcion: "Calcula la retención de ISR de tu sueldo mensual con la tarifa vigente y el subsidio al empleo.",
  },
  {
    href: "/calculadora/aguinaldo",
    titulo: "Calculadora de aguinaldo 2026",
    descripcion: "Calcula tu aguinaldo proporcional según los días que trabajaste en el año (Art. 87 LFT).",
  },
  {
    href: "/calculadora/finiquito",
    titulo: "Calculadora de finiquito 2026",
    descripcion: "Calcula salarios pendientes, vacaciones no disfrutadas, prima vacacional y aguinaldo proporcional.",
  },
  {
    href: "/calculadora/uma",
    titulo: "Convertidor de UMA 2026",
    descripcion: "Convierte pesos a UMA y viceversa con el valor oficial vigente de la UMA 2026.",
  },
];

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-3">
        Calculadoras fiscales y laborales de México 2026
      </h1>
      <p className="text-slate-600 mb-10 max-w-2xl">
        Herramientas gratuitas y actualizadas con la tarifa de ISR 2026, la UMA 2026, el salario
        mínimo 2026 y la tabla de vacaciones de la Ley Federal del Trabajo. Sin registro, sin
        anuncios intrusivos, resultados instantáneos.
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
