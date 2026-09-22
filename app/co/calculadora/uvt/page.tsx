import type { Metadata } from "next";
import UvtForm from "@/components/co/UvtForm";
import CalculadorasRelacionadas from "@/components/CalculadorasRelacionadas";
import { JsonLd } from "@/lib/jsonld";
import { webApplicationSchema, breadcrumbSchema } from "@/lib/seo";

const TITULO = "Convertidor de UVT 2026 (Colombia)";
const DESCRIPCION =
  "Convierte pesos colombianos a UVT y viceversa con el valor oficial de la UVT 2026 (DIAN). Consulta el valor vigente y su uso en trámites tributarios.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/co/calculadora/uvt" },
};

export default function UvtPage() {
  return (
    <div>
      <JsonLd data={webApplicationSchema({ nombre: TITULO, descripcion: DESCRIPCION, ruta: "/co/calculadora/uvt" })} />
      <JsonLd
        data={breadcrumbSchema([
          { nombre: "Inicio Colombia", ruta: "/co" },
          { nombre: TITULO, ruta: "/co/calculadora/uvt" },
        ])}
      />
      <h1 className="text-2xl font-bold tracking-tight mb-2">{TITULO}</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        La Unidad de Valor Tributario (UVT) se usa para calcular impuestos, multas y topes en
        Colombia. Convierte entre pesos y UVT con el valor vigente 2026.
      </p>
      <UvtForm />

      <article className="prose prose-slate max-w-2xl mt-12">
        <h2 className="text-xl font-semibold mb-3">¿Qué es la UVT y para qué se usa?</h2>
        <p>
          La Unidad de Valor Tributario (UVT) es una medida que la DIAN actualiza cada año según la
          inflación, usada para expresar valores tributarios en Colombia sin tener que reescribir
          la ley cada vez que cambian los montos en pesos.
        </p>
        <p>Algunos usos comunes de la UVT:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>La tabla de retención en la fuente sobre salarios (Art. 383 E.T.).</li>
          <li>Los topes para estar obligado a declarar renta.</li>
          <li>Multas y sanciones tributarias.</li>
          <li>Topes de ingresos y patrimonio en distintos trámites ante la DIAN.</li>
        </ul>
        <p className="text-sm text-slate-500">
          El valor de la UVT se fija por resolución de la DIAN a finales de cada año y entra en
          vigor el 1 de enero siguiente.
        </p>
      </article>

      <CalculadorasRelacionadas
        items={[
          { href: "/co/calculadora/retencion", titulo: "Calculadora de retención en la fuente 2026" },
          { href: "/co/calculadora/prima", titulo: "Calculadora de prima de servicios 2026" },
        ]}
      />
    </div>
  );
}
