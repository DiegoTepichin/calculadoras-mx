import type { Metadata } from "next";
import IsrForm from "@/components/IsrForm";
import CalculadorasRelacionadas from "@/components/CalculadorasRelacionadas";
import { JsonLd } from "@/lib/jsonld";
import { webApplicationSchema, breadcrumbSchema, howToSchema } from "@/lib/seo";

const TITULO = "Calculadora de ISR mensual 2026";
const DESCRIPCION =
  "Calcula el ISR mensual de tu sueldo 2026 con la tarifa vigente del SAT y el subsidio para el empleo. Gratis e instantáneo.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/calculadora/isr" },
};

export default function IsrPage() {
  return (
    <div>
      <JsonLd data={webApplicationSchema({ nombre: TITULO, descripcion: DESCRIPCION, ruta: "/calculadora/isr" })} />
      <JsonLd
        data={breadcrumbSchema([
          { nombre: "Inicio", ruta: "/" },
          { nombre: TITULO, ruta: "/calculadora/isr" },
        ])}
      />
      <JsonLd
        data={howToSchema({
          nombre: "Cómo calcular el ISR mensual paso a paso",
          descripcion: DESCRIPCION,
          pasos: [
            "Ubica tu ingreso mensual bruto dentro del rango correspondiente de la tarifa del SAT (Art. 96 LISR).",
            "Resta el límite inferior de ese rango a tu ingreso para obtener el excedente.",
            "Multiplica el excedente por el porcentaje del rango.",
            "Suma la cuota fija del rango al resultado anterior para obtener el ISR causado.",
            "Resta el subsidio para el empleo (si calificas) al ISR causado para obtener el ISR que realmente se retiene.",
          ],
        })}
      />
      <h1 className="text-2xl font-bold tracking-tight mb-2">{TITULO}</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        Ingresa tu sueldo mensual bruto para estimar la retención de ISR según la tarifa 2026
        del SAT (Art. 96 LISR), ya con el subsidio para el empleo aplicado.
      </p>
      <IsrForm />

      <article className="prose prose-slate max-w-2xl mt-12">
        <h2 className="text-xl font-semibold mb-3">¿Cómo se calcula el ISR mensual paso a paso?</h2>
        <p>
          El Impuesto Sobre la Renta que retiene tu patrón cada mes sigue el procedimiento del
          Artículo 96 de la Ley del Impuesto Sobre la Renta (LISR). No es un porcentaje fijo:
          la tarifa está dividida en once rangos, y cada rango tiene una cuota fija más un
          porcentaje que se aplica solo al excedente sobre el límite inferior de ese rango.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Se ubica tu ingreso mensual bruto dentro del rango correspondiente de la tarifa del
            SAT (por ejemplo, un sueldo de $10,000 cae en el rango de $7,168.52 a $12,598.02).
          </li>
          <li>
            Se resta el límite inferior de ese rango a tu ingreso, para obtener el excedente.
          </li>
          <li>
            El excedente se multiplica por el porcentaje del rango (en el ejemplo, 10.88%).
          </li>
          <li>
            Al resultado se le suma la cuota fija del rango (en el ejemplo, $420.95), dando el
            ISR causado.
          </li>
          <li>
            Si tu ingreso califica para el subsidio para el empleo, ese monto se le resta al ISR
            causado para obtener el ISR que realmente se retiene.
          </li>
        </ol>
        <p>
          El subsidio para el empleo es un estímulo que reduce la retención de quienes ganan
          menos: es máximo para los ingresos más bajos y desaparece por completo a partir de
          $7,382.34 mensuales.
        </p>
        <p className="text-sm text-slate-500">
          Esta calculadora aplica el régimen general de sueldos y salarios. No cubre honorarios,
          actividad empresarial, ni asimilados a salarios, que tienen reglas distintas.
        </p>
      </article>

      <CalculadorasRelacionadas
        items={[
          { href: "/calculadora/resico", titulo: "Calculadora RESICO 2026" },
          { href: "/calculadora/nomina", titulo: "Calculadora de nómina completa 2026" },
          { href: "/calculadora/uma", titulo: "Convertidor de UMA 2026" },
        ]}
      />
    </div>
  );
}
