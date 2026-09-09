import type { Metadata } from "next";
import FiniquitoForm from "@/components/FiniquitoForm";

export const metadata: Metadata = {
  title: "Calculadora de finiquito 2026",
  description:
    "Calcula tu finiquito 2026: salarios pendientes, vacaciones no disfrutadas, prima vacacional y aguinaldo proporcional, según la Ley Federal del Trabajo.",
  alternates: { canonical: "/calculadora/finiquito" },
};

export default function FiniquitoPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">Calculadora de finiquito 2026</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        Estima cuánto te corresponde al terminar una relación laboral por separación voluntaria
        o sin responsabilidad para el patrón: salarios pendientes, vacaciones no disfrutadas,
        prima vacacional y aguinaldo proporcional.
      </p>
      <FiniquitoForm />

      <article className="prose prose-slate max-w-2xl mt-12">
        <h2 className="text-xl font-semibold mb-3">¿Qué incluye el finiquito y cómo se calcula?</h2>
        <p>
          El finiquito es lo que te corresponde al terminar la relación laboral por renuncia o
          por causas no imputables al patrón. Es distinto de la <strong>liquidación</strong>,
          que aplica en despidos injustificados e incluye además una indemnización de 3 meses
          de salario más 20 días por año trabajado — esta calculadora NO cubre ese escenario.
        </p>
        <p>El finiquito se compone de cuatro partes:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Salarios pendientes</strong>: los días que ya trabajaste y aún no te han
            pagado.
          </li>
          <li>
            <strong>Vacaciones no disfrutadas</strong>: los días de vacaciones que te
            correspondían según tu antigüedad (tabla del Art. 76 LFT) y que no tomaste.
          </li>
          <li>
            <strong>Prima vacacional</strong>: un 25% adicional sobre el pago de esas vacaciones
            pendientes (Art. 80 LFT — es el mínimo legal, algunos contratos ofrecen más).
          </li>
          <li>
            <strong>Aguinaldo proporcional</strong>: la parte del aguinaldo del año en curso que
            ya generaste, calculada igual que en la{" "}
            <a href="/calculadora/aguinaldo" className="text-emerald-700 underline">
              calculadora de aguinaldo
            </a>
            .
          </li>
        </ol>
        <p className="text-sm text-slate-500">
          Esta herramienta da una estimación de referencia. Un finiquito real puede incluir
          otros conceptos (comisiones pendientes, prestaciones superiores a la ley, etc.) —
          revisa siempre tu contrato y, si tienes dudas, consulta a un abogado laboral.
        </p>
      </article>
    </div>
  );
}
