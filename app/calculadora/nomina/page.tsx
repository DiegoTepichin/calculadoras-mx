import type { Metadata } from "next";
import NominaForm from "@/components/NominaForm";
import CalculadorasRelacionadas from "@/components/CalculadorasRelacionadas";
import { JsonLd } from "@/lib/jsonld";
import { webApplicationSchema, breadcrumbSchema } from "@/lib/seo";

const TITULO = "Calculadora de nómina completa 2026 (ISR + IMSS)";
const DESCRIPCION =
  "Calcula tu sueldo neto 2026: ISR mensual, cuota obrera del IMSS y descuento de Infonavit si tienes crédito. Desglose completo, gratis e instantáneo.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/calculadora/nomina" },
};

export default function NominaPage() {
  return (
    <div>
      <JsonLd data={webApplicationSchema({ nombre: TITULO, descripcion: DESCRIPCION, ruta: "/calculadora/nomina" })} />
      <JsonLd
        data={breadcrumbSchema([
          { nombre: "Inicio", ruta: "/" },
          { nombre: "Calculadora de nómina completa 2026", ruta: "/calculadora/nomina" },
        ])}
      />
      <h1 className="text-2xl font-bold tracking-tight mb-2">Calculadora de nómina completa 2026</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        Ingresa tu salario diario para ver todo lo que se descuenta de tu recibo de nómina — ISR
        e IMSS obrero, más Infonavit si tienes un crédito de vivienda — y cuánto recibes neto.
      </p>
      <NominaForm />

      <article className="prose prose-slate max-w-2xl mt-12">
        <h2 className="text-xl font-semibold mb-3">¿Qué se descuenta de un sueldo en México?</h2>
        <p>
          El sueldo bruto que aparece en tu contrato no es lo que recibes en tu cuenta. Tu patrón
          está obligado a retener y enterar tres cosas antes de pagarte:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>ISR</strong> (Impuesto Sobre la Renta), según la tarifa del Art. 96 LISR que
            corresponde a tu periodo de pago (semanal, quincenal o mensual, Anexo 8 de la RMF
            2026), ya con el subsidio para el empleo aplicado si calificas. En periodos menores
            a un mes el subsidio se prorratea: el monto mensual ÷ 30.4 × los días del periodo.
          </li>
          <li>
            <strong>Cuota obrera del IMSS</strong>: tu parte de las cuotas de seguridad social
            (prestaciones en dinero, gastos médicos de pensionados, invalidez y vida, y cesantía
            en edad avanzada y vejez), calculada sobre tu Salario Base de Cotización (SBC).
          </li>
          <li>
            <strong>Infonavit</strong>: solo si tienes un crédito de vivienda activo. El
            descuento lo determina Infonavit según tu crédito específico (no hay una tasa única
            publicada), así que aquí lo capturas tú directamente.
          </li>
        </ol>
        <p className="text-sm text-slate-500">
          Esta calculadora integra tu Salario Base de Cotización con las prestaciones mínimas de
          ley (Art. 27 LSS): salario diario × (1 + (15 días de aguinaldo + días de vacaciones ×
          25% de prima) ÷ 365), es decir un factor de 1.0493 en tu primer año. Si tu empresa da
          prestaciones superiores, bonos o comisiones, tu SBC real es mayor. El sueldo mensual
          se toma como 30 días de salario. No incluye otros descuentos de nómina que dependen
          de cada empresa (ahorro voluntario, préstamos, seguros privados, etc.).
        </p>
      </article>

      <CalculadorasRelacionadas
        items={[
          { href: "/calculadora/isr", titulo: "Calculadora de ISR mensual 2026" },
          { href: "/calculadora/imss-patronal", titulo: "Calculadora de cuotas IMSS obrero-patronales 2026" },
          { href: "/calculadora/finiquito", titulo: "Calculadora de finiquito 2026" },
        ]}
      />
    </div>
  );
}
