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

      <article className="prose prose-slate max-w-2xl mt-12">
        <h2 className="text-xl font-semibold mb-3">¿Qué es la UMA y para qué se usa?</h2>
        <p>
          La Unidad de Medida y Actualización (UMA) es una referencia económica en pesos que el
          INEGI actualiza cada año (vigente del 1 de febrero al 31 de enero siguiente) con base
          en la inflación (INPC). Sustituyó al salario mínimo como unidad de cálculo para
          muchas obligaciones legales, precisamente para separar el salario mínimo de los
          cálculos de créditos, multas e impuestos.
        </p>
        <p>Algunos usos comunes de la UMA:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Multas administrativas y fiscales, expresadas en veces la UMA.</li>
          <li>
            Límites de exención de ISR (por ejemplo, el aguinaldo está exento hasta 30 UMA).
          </li>
          <li>Créditos de Infonavit y topes de cotización del IMSS.</li>
          <li>Pensiones alimenticias y otras obligaciones civiles fijadas en UMA.</li>
        </ul>
        <p className="text-sm text-slate-500">
          Importante: durante enero de cada año todavía aplica el valor de la UMA del año
          anterior; el nuevo valor entra en vigor hasta el 1 de febrero, una vez que el INEGI
          publica el ajuste por inflación de diciembre.
        </p>
      </article>
    </div>
  );
}
