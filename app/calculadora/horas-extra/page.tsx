import type { Metadata } from "next";
import HorasExtraForm from "@/components/HorasExtraForm";
import CalculadorasRelacionadas from "@/components/CalculadorasRelacionadas";
import { JsonLd } from "@/lib/jsonld";
import { webApplicationSchema, breadcrumbSchema } from "@/lib/seo";

const TITULO = "Calculadora de horas extra 2026–2027";
const DESCRIPCION =
  "Calcula el pago de horas extra dobles y triples con las reglas de la reforma de 40 horas (DOF 1 de mayo de 2026): límites semanales por año y alertas de incumplimiento.";
const RUTA = "/calculadora/horas-extra";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: RUTA },
};

export default function HorasExtraPage() {
  return (
    <div>
      <JsonLd data={webApplicationSchema({ nombre: TITULO, descripcion: DESCRIPCION, ruta: RUTA })} />
      <JsonLd
        data={breadcrumbSchema([
          { nombre: "Inicio", ruta: "/" },
          { nombre: TITULO, ruta: RUTA },
        ])}
      />
      <h1 className="text-2xl font-bold tracking-tight mb-2">{TITULO}</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        La reforma de la jornada laboral cambió las reglas del tiempo extra: cuántas horas se pagan
        al doble ahora depende del año, y hay nuevos límites por día y por semana. Calcula cuánto
        corresponde pagar y si la jornada cumple con la ley.
      </p>
      <HorasExtraForm />

      <article className="prose prose-slate max-w-2xl mt-12">
        <h2 className="text-xl font-semibold mb-3">¿Cómo se pagan las horas extra con la reforma?</h2>
        <p>
          El decreto publicado en el Diario Oficial de la Federación el 1 de mayo de 2026 reformó
          los artículos 66 y 68 de la Ley Federal del Trabajo. Las horas extra dentro del límite
          semanal se pagan con un 100% adicional (al doble). Ese límite sube de forma gradual:
        </p>
        <table>
          <thead>
            <tr>
              <th>Año</th>
              <th>Horas extra al doble por semana</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>2026</td><td>9</td></tr>
            <tr><td>2027</td><td>9</td></tr>
            <tr><td>2028</td><td>10</td></tr>
            <tr><td>2029</td><td>11</td></tr>
            <tr><td>2030</td><td>12</td></tr>
          </tbody>
        </table>
        <p>
          Esas horas solo pueden repartirse en hasta 4 horas diarias y en máximo 4 días de la
          semana. Lo que exceda el límite semanal se paga con un 200% adicional (al triple) y no
          puede pasar de 4 horas por semana. La jornada ordinaria más la extraordinaria nunca puede
          superar 12 horas en un día.
        </p>
        <p>
          Ejemplo para 2027: con un salario diario de $500 y jornada diurna de 8 horas, el valor
          hora es $62.50. Si se trabajan 12 horas extra en la semana, 9 van al doble ($1,125.00) y
          3 al triple ($562.50): $1,687.50 en total.
        </p>
        <p className="text-sm text-slate-500">
          El valor hora se calcula dividiendo el salario diario entre las horas de la jornada
          diaria (8 diurna, 7 nocturna, 7.5 mixta, Art. 61 LFT). Tu contrato puede pactar otra base.
        </p>
      </article>

      <CalculadorasRelacionadas
        items={[
          { href: "/reforma-40-horas", titulo: "Guía de la reforma de 40 horas" },
          { href: "/calculadora/nomina", titulo: "Calculadora de nómina completa 2026" },
          { href: "/calculadora/finiquito", titulo: "Calculadora de finiquito 2026" },
        ]}
      />
    </div>
  );
}
