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
    </div>
  );
}
