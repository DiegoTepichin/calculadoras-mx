import type { Metadata } from "next";
import ResicoForm from "@/components/ResicoForm";
import CalculadorasRelacionadas from "@/components/CalculadorasRelacionadas";
import { JsonLd } from "@/lib/jsonld";
import { webApplicationSchema, breadcrumbSchema, howToSchema } from "@/lib/seo";

const TITULO = "Calculadora RESICO 2026 (personas físicas)";
const DESCRIPCION =
  "Calcula tu ISR mensual bajo RESICO 2026 con la tasa fija de tu rango de ingresos (1% a 2.5%), según el Art. 113-E de la LISR. Gratis e instantáneo.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/calculadora/resico" },
};

export default function ResicoPage() {
  return (
    <div>
      <JsonLd data={webApplicationSchema({ nombre: TITULO, descripcion: DESCRIPCION, ruta: "/calculadora/resico" })} />
      <JsonLd
        data={breadcrumbSchema([
          { nombre: "Inicio", ruta: "/" },
          { nombre: "Calculadora RESICO 2026", ruta: "/calculadora/resico" },
        ])}
      />
      <JsonLd
        data={howToSchema({
          nombre: "Cómo calcular el ISR en RESICO",
          descripcion: DESCRIPCION,
          pasos: [
            "Suma los ingresos efectivamente cobrados en el mes (no facturados, cobrados).",
            "Ubica ese total en la tabla de RESICO, que tiene 5 rangos con tasas de 1% a 2.5%.",
            "Aplica la tasa del rango al ingreso total del mes, no solo al excedente sobre el límite inferior del rango.",
          ],
        })}
      />
      <h1 className="text-2xl font-bold tracking-tight mb-2">Calculadora RESICO 2026</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        Ingresa lo que cobraste en el mes para estimar tu ISR bajo el Régimen Simplificado de
        Confianza (RESICO) para personas físicas, con las tasas vigentes desde 2022.
      </p>
      <ResicoForm />

      <article className="prose prose-slate max-w-2xl mt-12">
        <h2 className="text-xl font-semibold mb-3">¿Cómo se calcula el ISR en RESICO?</h2>
        <p>
          RESICO (Régimen Simplificado de Confianza) es un régimen fiscal para personas físicas
          con actividad empresarial, profesional o arrendamiento, creado en 2022 (Art. 113-E
          LISR). A diferencia del régimen general, no permite deducciones y aplica una tasa fija
          directamente sobre el ingreso cobrado en el mes — no sobre una utilidad.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Se suman los ingresos efectivamente cobrados en el mes (no facturados, cobrados).</li>
          <li>
            Se ubica ese total en la tabla de RESICO, que tiene 5 rangos con tasas de 1% a 2.5%.
          </li>
          <li>
            La tasa del rango se aplica al ingreso <strong>total</strong> del mes, no solo al
            excedente sobre el límite inferior del rango (a diferencia de la tarifa de sueldos y
            salarios del Art. 96).
          </li>
        </ol>
        <p>
          Para permanecer en RESICO, los ingresos anuales de la persona física no pueden superar
          $3,500,000. Si se rebasa ese límite, se pasa automáticamente al régimen general de
          actividad empresarial y profesional a partir del mes siguiente.
        </p>
        <p className="text-sm text-slate-500">
          Esta calculadora no incluye IVA (que se calcula y traslada aparte) ni retenciones
          aplicables cuando facturas a personas morales. Tampoco determina si calificas para
          RESICO según tu actividad — consulta los requisitos del Art. 113-E LISR con tu contador.
        </p>
      </article>

      <CalculadorasRelacionadas
        items={[
          { href: "/calculadora/isr", titulo: "Calculadora de ISR mensual 2026" },
          { href: "/calculadora/nomina", titulo: "Calculadora de nómina completa 2026" },
        ]}
      />
    </div>
  );
}
