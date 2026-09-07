import type { Metadata } from "next";
import AguinaldoForm from "@/components/AguinaldoForm";

export const metadata: Metadata = {
  title: "Calculadora de aguinaldo 2026",
  description:
    "Calcula tu aguinaldo proporcional 2026 según los días trabajados en el año, conforme al Art. 87 de la Ley Federal del Trabajo.",
  alternates: { canonical: "/calculadora/aguinaldo" },
};

export default function AguinaldoPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">Calculadora de aguinaldo 2026</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        El aguinaldo es un derecho laboral: mínimo 15 días de salario por año completo (Art. 87
        LFT), pagado antes del 20 de diciembre. Si no trabajaste el año completo, te corresponde
        de forma proporcional.
      </p>
      <AguinaldoForm />
    </div>
  );
}
