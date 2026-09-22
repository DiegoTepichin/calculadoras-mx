import { TABLA_RETENCION_2026_UVT } from "@/data/co/retencion-2026";
import { UVT_2026 } from "@/data/co/constantes-2026";

const round2 = (n: number) => Math.round(n * 100) / 100;

export interface ResultadoRetencion {
  ingresoMensual: number;
  ingresoEnUvt: number;
  retencionEnUvt: number;
  retencionAPagar: number;
  ingresoNeto: number;
  tasaEfectiva: number;
  tasaMarginal: number; // tarifa del renglón donde cae el ingreso
  renglonAplicado: number; // índice 1-based, 0 si el ingreso es $0
}

/**
 * Calcula la retención en la fuente mensual de un asalariado (Art. 383 E.T., procedimiento 1),
 * recorriendo cada renglón de la tabla y sumando su porción gravable × su tarifa (método marginal
 * verdadero) — ver la nota en data/co/retencion-2026.ts sobre por qué no se usan atajos aditivos.
 * No contempla deducciones (dependientes, salud/pensión voluntaria, intereses de vivienda, etc.)
 * ni el procedimiento 2 (retención semestral fija).
 */
export function calcularRetencionFuente(ingresoMensual: number): ResultadoRetencion {
  const ingreso = Math.max(0, ingresoMensual);
  const ingresoEnUvt = ingreso / UVT_2026.valor;

  let retencionEnUvt = 0;
  let tasaMarginal = 0;
  let renglonAplicado = 0;

  for (let i = 0; i < TABLA_RETENCION_2026_UVT.length; i++) {
    const renglon = TABLA_RETENCION_2026_UVT[i];
    if (ingresoEnUvt <= renglon.limiteInferior) break;
    const baseGravable = Math.min(ingresoEnUvt, renglon.limiteSuperior) - renglon.limiteInferior;
    retencionEnUvt += baseGravable * renglon.porcentajeExcedente;
    tasaMarginal = renglon.porcentajeExcedente;
    renglonAplicado = i + 1;
  }

  const retencionAPagar = Math.max(0, retencionEnUvt * UVT_2026.valor);
  const ingresoNeto = ingreso - retencionAPagar;

  return {
    ingresoMensual: ingreso,
    ingresoEnUvt: round2(ingresoEnUvt),
    retencionEnUvt: round2(retencionEnUvt),
    retencionAPagar: round2(retencionAPagar),
    ingresoNeto: round2(ingresoNeto),
    tasaEfectiva: ingreso > 0 ? retencionAPagar / ingreso : 0,
    tasaMarginal,
    renglonAplicado,
  };
}
