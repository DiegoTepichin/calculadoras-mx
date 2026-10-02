import {
  DIAS_CON_HORAS_EXTRA_MAX,
  FACTOR_HORA_DOBLE,
  FACTOR_HORA_TRIPLE,
  HORAS_EXCEDENTES_MAX_SEMANAL,
  HORAS_EXTRA_MAX_DIARIAS,
  HORAS_EXTRA_MAX_SEMANAL,
  JORNADA_DIARIA_POR_TIPO,
  JORNADA_TOTAL_MAX_DIARIA,
  anioReforma,
  type TipoJornada,
} from "@/data/jornada-reforma-2026";

export interface EntradaHorasExtra {
  salarioDiario: number;
  tipoJornada: TipoJornada;
  /** Total de horas trabajadas por encima de la jornada ordinaria en la semana. */
  horasExtraSemana: number;
  anio: number;
  /** Opcionales, solo para revisar los límites de distribución del Art. 66/68. */
  diasConHorasExtra?: number;
  maxHorasExtraEnUnDia?: number;
}

export interface ResultadoHorasExtra {
  anio: number;
  valorHora: number;
  limiteSemanalDobles: number;
  horasDobles: number;
  horasTriples: number;
  pagoDobles: number;
  pagoTriples: number;
  pagoTotal: number;
  /** Incumplimientos detectados (la ley no los permite aunque se paguen). */
  alertas: string[];
}

const redondear = (n: number) => Math.round(n * 100) / 100;

/**
 * Pago de horas extra con las reglas de la reforma de 40 horas (DOF 1-may-2026).
 * - Valor hora = salario diario ÷ horas de la jornada diaria según su tipo (Art. 61).
 *   Es la convención usual; un contrato puede pactar otra base.
 * - Hasta el límite semanal del año (Transitorio Cuarto) se pagan al doble (Art. 66).
 * - Lo que exceda ese límite se paga al triple (Art. 68). Se calcula aunque rebase lo
 *   permitido, porque el trabajador tiene derecho al pago, y se emite una alerta.
 */
export function calcularHorasExtra(e: EntradaHorasExtra): ResultadoHorasExtra {
  const anio = anioReforma(e.anio);
  const horasJornada = JORNADA_DIARIA_POR_TIPO[e.tipoJornada];
  const valorHora = e.salarioDiario / horasJornada;
  const limite = HORAS_EXTRA_MAX_SEMANAL[anio];
  const horas = Math.max(0, e.horasExtraSemana);

  const horasDobles = Math.min(horas, limite);
  const horasTriples = Math.max(0, horas - limite);
  const pagoDobles = horasDobles * valorHora * FACTOR_HORA_DOBLE;
  const pagoTriples = horasTriples * valorHora * FACTOR_HORA_TRIPLE;

  const alertas: string[] = [];
  if (horasTriples > HORAS_EXCEDENTES_MAX_SEMANAL) {
    alertas.push(
      `Se rebasan las ${limite + HORAS_EXCEDENTES_MAX_SEMANAL} horas extra semanales permitidas en ${anio} (${limite} al doble + ${HORAS_EXCEDENTES_MAX_SEMANAL} al triple, Arts. 66 y 68 LFT).`
    );
  }
  if (e.diasConHorasExtra !== undefined && e.diasConHorasExtra > DIAS_CON_HORAS_EXTRA_MAX) {
    alertas.push(`Las horas extra solo pueden repartirse en máximo ${DIAS_CON_HORAS_EXTRA_MAX} días por semana (Art. 66 LFT).`);
  }
  if (e.maxHorasExtraEnUnDia !== undefined) {
    if (e.maxHorasExtraEnUnDia > HORAS_EXTRA_MAX_DIARIAS) {
      alertas.push(`Máximo ${HORAS_EXTRA_MAX_DIARIAS} horas extra en un mismo día (Art. 66 LFT).`);
    }
    if (horasJornada + e.maxHorasExtraEnUnDia > JORNADA_TOTAL_MAX_DIARIA) {
      alertas.push(`La jornada ordinaria más la extraordinaria no puede pasar de ${JORNADA_TOTAL_MAX_DIARIA} horas en un día (Art. 68 LFT).`);
    }
  }

  return {
    anio,
    valorHora: redondear(valorHora),
    limiteSemanalDobles: limite,
    horasDobles,
    horasTriples,
    pagoDobles: redondear(pagoDobles),
    pagoTriples: redondear(pagoTriples),
    pagoTotal: redondear(pagoDobles + pagoTriples),
    alertas,
  };
}
