import type { Metadata } from "next";
import ImssPatronalForm from "@/components/ImssPatronalForm";
import CalculadorasRelacionadas from "@/components/CalculadorasRelacionadas";
import { JsonLd } from "@/lib/jsonld";
import { webApplicationSchema, breadcrumbSchema } from "@/lib/seo";

const TITULO = "Calculadora de cuotas IMSS obrero-patronales 2026";
const DESCRIPCION =
  "Calcula cuánto paga tu empresa de cuotas patronales al IMSS por cada trabajador: Enfermedades y Maternidad, Invalidez y Vida, Cesantía y Vejez, Riesgo de Trabajo e Infonavit. Desglose completo 2026.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/calculadora/imss-patronal" },
};

export default function ImssPatronalPage() {
  return (
    <div>
      <JsonLd data={webApplicationSchema({ nombre: TITULO, descripcion: DESCRIPCION, ruta: "/calculadora/imss-patronal" })} />
      <JsonLd
        data={breadcrumbSchema([
          { nombre: "Inicio", ruta: "/" },
          { nombre: TITULO, ruta: "/calculadora/imss-patronal" },
        ])}
      />
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        Calculadora de cuotas IMSS obrero-patronales 2026
      </h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        Para empleadores: calcula el costo real de la cuota patronal del IMSS por cada trabajador,
        rama por rama, según su Salario Base de Cotización y la clase de riesgo de tu empresa.
      </p>
      <ImssPatronalForm />

      <article className="prose prose-slate max-w-2xl mt-12">
        <h2 className="text-xl font-semibold mb-3">¿Por qué la cuota patronal no es un solo porcentaje?</h2>
        <p>
          A diferencia de lo que muchas calculadoras simplifican, la cuota patronal del IMSS no es
          un porcentaje fijo del salario: se compone de varias ramas del Seguro Social, cada una
          con su propia base y regla:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            La <strong>cuota fija de Enfermedades y Maternidad</strong> (20.4%) no se calcula
            sobre el salario del trabajador, sino sobre 1 UMA diaria — es el mismo monto en pesos
            para cualquier trabajador, sin importar cuánto gane.
          </li>
          <li>
            <strong>Cesantía en Edad Avanzada y Vejez</strong> sube por escalones según cuántas
            veces el UMA representa el salario del trabajador, conforme a la reforma del 16 de
            diciembre de 2020, que aumenta gradualmente esta cuota cada año hasta 2030.
          </li>
          <li>
            <strong>Riesgo de Trabajo</strong> depende de la clase de riesgo de la actividad de tu
            empresa (I a V) y, después del primer año, de tu siniestralidad real — esta
            calculadora usa la prima media legal por clase como punto de partida.
          </li>
        </ul>
        <p className="text-sm text-slate-500">
          Esta calculadora no determina tu prima de riesgo real (requiere tu historial de
          accidentes de trabajo, Art. 72 LSS) ni incluye el Impuesto Sobre Nóminas estatal. Es una
          herramienta de referencia — verifica las cifras exactas de tu empresa con tu contador.
        </p>
      </article>

      <CalculadorasRelacionadas
        items={[
          { href: "/calculadora/nomina", titulo: "Calculadora de nómina completa 2026" },
          { href: "/calculadora/uma", titulo: "Convertidor de UMA 2026" },
        ]}
      />
    </div>
  );
}
