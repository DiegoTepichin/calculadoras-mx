import type { Metadata } from "next";
import IsrForm from "@/components/IsrForm";

export const metadata: Metadata = {
  title: "Calculadora de ISR mensual 2026",
  description:
    "Calcula el ISR mensual de tu sueldo 2026 con la tarifa vigente del SAT y el subsidio para el empleo. Gratis e instantáneo.",
  alternates: { canonical: "/calculadora/isr" },
};

export default function IsrPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">Calculadora de ISR mensual 2026</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        Ingresa tu sueldo mensual bruto para estimar la retención de ISR según la tarifa 2026
        del SAT (Art. 96 LISR), ya con el subsidio para el empleo aplicado.
      </p>
      <IsrForm />
    </div>
  );
}
