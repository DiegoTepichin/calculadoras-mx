import type { Metadata } from "next";
import Link from "next/link";
import CalculadorasRelacionadas from "@/components/CalculadorasRelacionadas";
import { JsonLd } from "@/lib/jsonld";
import { breadcrumbSchema } from "@/lib/seo";
import { formatoMXN } from "@/lib/format";
import { CHECADOR_URL } from "@/lib/site";
import { UMA_2026 } from "@/data/constantes-2026";
import {
  HORAS_EXTRA_MAX_SEMANAL,
  JORNADA_ORDINARIA_MAX_SEMANAL,
  MULTA_REGISTRO_JORNADA_UMA,
} from "@/data/jornada-reforma-2026";

const TITULO = "Reforma de 40 horas: calendario, horas extra y registro de jornada";
const DESCRIPCION =
  "Qué cambia con la reforma laboral de 40 horas (DOF 1 de mayo de 2026): reducción de la jornada año por año, nuevas reglas de horas extra y el registro electrónico obligatorio desde 2027.";
const RUTA = "/reforma-40-horas";
const ANIOS = [2026, 2027, 2028, 2029, 2030];

const multaMin = MULTA_REGISTRO_JORNADA_UMA.minimo * UMA_2026.diario;
const multaMax = MULTA_REGISTRO_JORNADA_UMA.maximo * UMA_2026.diario;

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: RUTA },
};

export default function Reforma40HorasPage() {
  return (
    <div>
      <JsonLd
        data={breadcrumbSchema([
          { nombre: "Inicio", ruta: "/" },
          { nombre: "Reforma de 40 horas", ruta: RUTA },
        ])}
      />
      <article className="prose prose-slate max-w-2xl">
        <h1>{TITULO}</h1>
        <p>
          El 1 de mayo de 2026 se publicó en el Diario Oficial de la Federación el decreto que
          reforma la Ley Federal del Trabajo para reducir la jornada a 40 horas semanales. El
          cambio es gradual: cada 1 de enero, de 2026 a 2030, baja el máximo de horas ordinarias y
          sube el límite de horas extra pagadas al doble.
        </p>

        <h2>Calendario de la reducción</h2>
        <table>
          <thead>
            <tr>
              <th>Año</th>
              <th>Jornada ordinaria máxima</th>
              <th>Horas extra al doble por semana</th>
            </tr>
          </thead>
          <tbody>
            {ANIOS.map((a) => (
              <tr key={a}>
                <td>{a}</td>
                <td>{JORNADA_ORDINARIA_MAX_SEMANAL[a]} h</td>
                <td>{HORAS_EXTRA_MAX_SEMANAL[a]} h</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          La reducción no puede implicar una baja de sueldos, salarios ni prestaciones
          (Transitorio Séptimo). La jornada diaria sigue siendo de 8 horas la diurna, 7 la nocturna
          y 7.5 la mixta, y debe haber al menos un día de descanso por cada seis de trabajo.
        </p>

        <h2>Nuevas reglas de horas extra</h2>
        <ul>
          <li>Se pagan al doble hasta el límite semanal del año (tabla de arriba).</li>
          <li>Se reparten en hasta 4 horas diarias, en máximo 4 días por semana (Art. 66).</li>
          <li>Lo que exceda el límite se paga al triple y no puede pasar de 4 horas por semana (Art. 68).</li>
          <li>Ordinaria más extraordinaria: nunca más de 12 horas en un día (Art. 68).</li>
          <li>El trabajo en domingo da derecho a una prima de al menos 25% (Art. 71).</li>
        </ul>
        <p>
          <Link href="/calculadora/horas-extra">Calcula el pago de horas extra con estas reglas →</Link>
        </p>

        <h2>Registro electrónico de jornada obligatorio desde 2027</h2>
        <p>
          La nueva fracción XXXIV del artículo 132 obliga a todo patrón a registrar de manera
          electrónica la jornada de cada trabajador, con su hora de inicio y de fin, y a entregar
          ese registro a la autoridad cuando lo pida. Las disposiciones de la Secretaría del Trabajo
          sobre este registro entran en vigor el <strong>1 de enero de 2027</strong>.
        </p>
        <ul>
          <li>
            <strong>Multa por no cumplir:</strong> de {MULTA_REGISTRO_JORNADA_UMA.minimo} a{" "}
            {MULTA_REGISTRO_JORNADA_UMA.maximo.toLocaleString("es-MX")} UMA (Art. 994 fracc. IV
            Bis), es decir de {formatoMXN(multaMin)} a {formatoMXN(multaMax)} con la UMA 2026.
          </li>
          <li>
            <strong>Valor como prueba:</strong> el registro hace prueba plena si se acredita que
            fue acordado entre el trabajador y el patrón. Conviene que cada trabajador confirme sus
            registros.
          </li>
          <li>
            <strong>Pendiente:</strong> la STPS debe publicar las disposiciones generales que
            definan a quién aplica y qué excepciones habrá. Al momento de escribir esto no se han
            publicado.
          </li>
        </ul>

        <h2>Checklist para patrones antes del 1 de enero de 2027</h2>
        <ol>
          <li>Revisar horarios y turnos para no pasar de 46 horas ordinarias por semana en 2027.</li>
          <li>Ajustar contratos y reglamento interior de trabajo.</li>
          <li>Definir cómo se van a registrar electrónicamente las entradas y salidas.</li>
          <li>Acordar el registro con cada trabajador para que tenga valor de prueba plena.</li>
          <li>Recalcular la nómina con las nuevas reglas de horas extra.</li>
        </ol>
      </article>

      {CHECADOR_URL && (
        <div className="max-w-2xl mt-10 rounded-xl border border-emerald-300 bg-emerald-50 p-5">
          <p className="font-semibold mb-1">¿Ya tienes tu registro electrónico de jornada?</p>
          <p className="text-sm text-slate-700 mb-3">
            Registra entradas y salidas desde el celular de cada trabajador, sin aparatos.
          </p>
          <a href={CHECADOR_URL} className="text-sm font-medium text-emerald-700 underline">
            Conocer el checador →
          </a>
        </div>
      )}

      <p className="text-xs text-slate-500 max-w-2xl mt-8">
        Fuente: Decreto por el que se reforman, adicionan y derogan diversas disposiciones de la Ley
        Federal del Trabajo, en materia de reducción de la jornada laboral, DOF 1 de mayo de 2026.
      </p>

      <CalculadorasRelacionadas
        items={[
          { href: "/calculadora/horas-extra", titulo: "Calculadora de horas extra 2026–2027" },
          { href: "/calculadora/nomina", titulo: "Calculadora de nómina completa 2026" },
          { href: "/calculadora/imss-patronal", titulo: "Cuotas IMSS obrero-patronales 2026" },
        ]}
      />
    </div>
  );
}
