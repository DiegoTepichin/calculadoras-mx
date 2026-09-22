import type { Metadata } from "next";
import RetencionForm from "@/components/co/RetencionForm";
import CalculadorasRelacionadas from "@/components/CalculadorasRelacionadas";
import { JsonLd } from "@/lib/jsonld";
import { webApplicationSchema, breadcrumbSchema, howToSchema } from "@/lib/seo";

const TITULO = "Calculadora de retención en la fuente 2026 (Colombia)";
const DESCRIPCION =
  "Calcula la retención en la fuente de tu salario mensual en Colombia según la tabla del Art. 383 del Estatuto Tributario y el valor de la UVT 2026. Gratis e instantáneo.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/co/calculadora/retencion" },
};

export default function RetencionPage() {
  return (
    <div>
      <JsonLd data={webApplicationSchema({ nombre: TITULO, descripcion: DESCRIPCION, ruta: "/co/calculadora/retencion" })} />
      <JsonLd
        data={breadcrumbSchema([
          { nombre: "Inicio Colombia", ruta: "/co" },
          { nombre: TITULO, ruta: "/co/calculadora/retencion" },
        ])}
      />
      <JsonLd
        data={howToSchema({
          nombre: "Cómo calcular la retención en la fuente en Colombia",
          descripcion: DESCRIPCION,
          pasos: [
            "Convierte tu ingreso laboral mensual a UVT, dividiéndolo entre el valor de la UVT vigente.",
            "Recorre la tabla del Art. 383 del Estatuto Tributario renglón por renglón: cada tramo de tu ingreso paga solo la tarifa de su propio renglón (método marginal), desde 0% hasta 39%.",
            "Suma la retención de cada renglón en UVT y multiplícala por el valor de la UVT para obtener el monto en pesos.",
          ],
        })}
      />
      <h1 className="text-2xl font-bold tracking-tight mb-2">{TITULO}</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        Ingresa tu sueldo mensual para estimar la retención en la fuente según la tabla vigente de
        la DIAN (Art. 383 E.T.) y el valor de la UVT 2026.
      </p>
      <RetencionForm />

      <article className="prose prose-slate max-w-2xl mt-12">
        <h2 className="text-xl font-semibold mb-3">¿Cómo se calcula la retención en la fuente?</h2>
        <p>
          La retención en la fuente sobre salarios en Colombia sigue el procedimiento 1 del
          Artículo 383 del Estatuto Tributario: una tabla de 7 rangos expresados en UVT (Unidad de
          Valor Tributario), con tarifas que van de 0% a 39%.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Se convierte tu ingreso laboral mensual a UVT, dividiéndolo entre el valor de la UVT
            vigente (para 2026, $52,374).
          </li>
          <li>
            Se recorre la tabla renglón por renglón: cada tramo de tu ingreso paga solo la tarifa
            de su propio renglón, no la tarifa más alta sobre el total (es un cálculo marginal,
            igual que el impuesto de renta).
          </li>
          <li>
            La suma de todos los tramos, convertida de vuelta a pesos con el valor de la UVT, es tu
            retención en la fuente del mes.
          </li>
        </ol>
        <p>
          Los primeros 95 UVT (unos $4,975,530 en 2026) no pagan retención — es la base mínima
          exenta para asalariados.
        </p>
        <p className="text-sm text-slate-500">
          Esta calculadora no incluye deducciones que reducen la base gravable (aportes
          voluntarios a pensión, intereses de vivienda, dependientes económicos, medicina prepagada,
          etc.), ni el procedimiento 2 (retención semestral fija). Es una herramienta de
          referencia — verifica tu caso con tu contador.
        </p>
      </article>

      <CalculadorasRelacionadas
        items={[
          { href: "/co/calculadora/prima", titulo: "Calculadora de prima de servicios 2026" },
          { href: "/co/calculadora/uvt", titulo: "Convertidor de UVT 2026" },
        ]}
      />
    </div>
  );
}
