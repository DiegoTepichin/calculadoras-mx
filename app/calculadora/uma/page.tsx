import type { Metadata } from "next";
import UmaForm from "@/components/UmaForm";

export const metadata: Metadata = {
  title: "Convertidor de UMA 2026 (pesos a UMA)",
  description:
    "Convierte pesos mexicanos a UMA y viceversa con el valor oficial de la UMA 2026 (INEGI). Consulta el valor diario, mensual y anual.",
  alternates: { canonical: "/calculadora/uma" },
};

export default function UmaPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">Convertidor de UMA 2026</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        La Unidad de Medida y Actualización (UMA) se usa para calcular multas, créditos y
        obligaciones en México. Convierte entre pesos y UMA con el valor vigente 2026.
      </p>
      <UmaForm />
    </div>
  );
}
