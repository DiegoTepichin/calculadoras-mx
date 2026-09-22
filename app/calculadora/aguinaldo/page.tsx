import type { Metadata } from "next";
import AguinaldoForm from "@/components/AguinaldoForm";
import CalculadorasRelacionadas from "@/components/CalculadorasRelacionadas";
import { JsonLd } from "@/lib/jsonld";
import { webApplicationSchema, breadcrumbSchema } from "@/lib/seo";

const TITULO = "Calculadora de aguinaldo 2026";
const DESCRIPCION =
  "Calcula tu aguinaldo proporcional 2026 según los días trabajados en el año, conforme al Art. 87 de la Ley Federal del Trabajo.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/calculadora/aguinaldo" },
};

export default function AguinaldoPage() {
  return (
    <div>
      <JsonLd data={webApplicationSchema({ nombre: TITULO, descripcion: DESCRIPCION, ruta: "/calculadora/aguinaldo" })} />
      <JsonLd
        data={breadcrumbSchema([
          { nombre: "Inicio", ruta: "/" },
          { nombre: TITULO, ruta: "/calculadora/aguinaldo" },
        ])}
      />
      <h1 className="text-2xl font-bold tracking-tight mb-2">Calculadora de aguinaldo 2026</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        El aguinaldo es un derecho laboral: mínimo 15 días de salario por año completo (Art. 87
        LFT), pagado antes del 20 de diciembre. Si no trabajaste el año completo, te corresponde
        de forma proporcional.
      </p>
      <AguinaldoForm />

      <article className="prose prose-slate max-w-2xl mt-12">
        <h2 className="text-xl font-semibold mb-3">¿Cómo se calcula el aguinaldo proporcional?</h2>
        <p>
          El Artículo 87 de la Ley Federal del Trabajo obliga a pagar un aguinaldo anual
          equivalente a mínimo 15 días de salario, antes del 20 de diciembre de cada año. Si
          trabajaste todo el año, te corresponden los 15 días completos (o más, si tu contrato o
          contrato colectivo ofrece un aguinaldo mayor). Si trabajaste solo una parte del año —
          por ejemplo, si ingresaste en julio — te corresponde la parte proporcional.
        </p>
        <p>La fórmula es:</p>
        <p className="font-mono text-sm bg-slate-50 border border-slate-200 rounded-lg p-3">
          días de aguinaldo proporcional = (días de aguinaldo anual × días trabajados en el año) ÷ 365
        </p>
        <p>
          Ese resultado se multiplica por tu salario diario para obtener el monto en pesos. Por
          ejemplo, con un salario diario de $500 y 180 días trabajados en el año: 15 × 180 ÷ 365
          = 7.4 días, es decir $3,698.63 pesos de aguinaldo.
        </p>
        <p className="text-sm text-slate-500">
          El aguinaldo está exento de ISR hasta el equivalente a 30 UMA (Art. 93 fracción XIV
          LISR); si tu aguinaldo excede ese monto, la diferencia se acumula a tus ingresos
          gravables del mes en que se paga.
        </p>
      </article>

      <CalculadorasRelacionadas
        items={[
          { href: "/calculadora/finiquito", titulo: "Calculadora de finiquito 2026" },
          { href: "/calculadora/uma", titulo: "Convertidor de UMA 2026" },
        ]}
      />
    </div>
  );
}
