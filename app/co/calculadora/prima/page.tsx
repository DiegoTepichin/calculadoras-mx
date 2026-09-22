import type { Metadata } from "next";
import PrimaForm from "@/components/co/PrimaForm";
import CalculadorasRelacionadas from "@/components/CalculadorasRelacionadas";
import { JsonLd } from "@/lib/jsonld";
import { webApplicationSchema, breadcrumbSchema } from "@/lib/seo";

const TITULO = "Calculadora de prima de servicios 2026 (Colombia)";
const DESCRIPCION =
  "Calcula tu prima de servicios semestral en Colombia según los días trabajados, conforme al Art. 306 del Código Sustantivo del Trabajo. Gratis e instantáneo.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/co/calculadora/prima" },
};

export default function PrimaPage() {
  return (
    <div>
      <JsonLd data={webApplicationSchema({ nombre: TITULO, descripcion: DESCRIPCION, ruta: "/co/calculadora/prima" })} />
      <JsonLd
        data={breadcrumbSchema([
          { nombre: "Inicio Colombia", ruta: "/co" },
          { nombre: TITULO, ruta: "/co/calculadora/prima" },
        ])}
      />
      <h1 className="text-2xl font-bold tracking-tight mb-2">{TITULO}</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        La prima de servicios es un derecho laboral: un mes de salario por año, pagado en dos
        cuotas (30 de junio y 20 de diciembre). Si no trabajaste el semestre completo, te
        corresponde de forma proporcional.
      </p>
      <PrimaForm />

      <article className="prose prose-slate max-w-2xl mt-12">
        <h2 className="text-xl font-semibold mb-3">¿Cómo se calcula la prima de servicios?</h2>
        <p>
          El Artículo 306 del Código Sustantivo del Trabajo obliga a todo empleador a pagar una
          prima de servicios equivalente a 30 días de salario por año, dividida en dos pagos
          semestrales. Si trabajaste el semestre completo (180 días), te corresponde medio salario
          mensual; si trabajaste menos, te corresponde la parte proporcional.
        </p>
        <p>La fórmula es:</p>
        <p className="font-mono text-sm bg-slate-50 border border-slate-200 rounded-lg p-3">
          prima semestral = (salario mensual × días trabajados en el semestre) ÷ 360
        </p>
        <p>
          El divisor es 360, no 365, porque la normativa laboral colombiana usa el año comercial de
          360 días (12 meses de 30 días) para el cálculo de prestaciones sociales.
        </p>
        <p className="text-sm text-slate-500">
          Esta calculadora estima la prima de servicios. No cubre otras prestaciones sociales
          colombianas (cesantías, intereses a las cesantías, vacaciones), que se calculan por
          separado.
        </p>
      </article>

      <CalculadorasRelacionadas
        items={[
          { href: "/co/calculadora/retencion", titulo: "Calculadora de retención en la fuente 2026" },
          { href: "/co/calculadora/uvt", titulo: "Convertidor de UVT 2026" },
        ]}
      />
    </div>
  );
}
