import { diasVacacionesPorAntiguedad, PRIMA_VACACIONAL_MINIMA, AGUINALDO_DIAS_MINIMOS } from "@/data/constantes-2026";
import { calcularAguinaldo } from "@/lib/aguinaldo";

export interface ResultadoFiniquito {
  salariosPendientes: number;
  diasVacacionesPendientes: number;
  pagoVacacionesPendientes: number;
  diasVacacionesProporcionales: number;
  pagoVacacionesProporcionales: number;
  primaVacacional: number; // 25% of pending + proportional vacation pay
  diasAguinaldoProporcional: number;
  aguinaldoProporcional: number;
  totalFiniquito: number;
}

export interface EntradaFiniquito {
  salarioDiario: number;
  diasSalarioPendientes: number; // días trabajados no pagados aún
  aniosAntiguedadCumplidos: number;
  diasVacacionesYaTomadosEsteCiclo: number; // de los que le tocan por antigüedad, cuántos ya tomó
  diasLaboradosEnElAnioActual: number; // para aguinaldo proporcional
  /** Days of service since the last work anniversary (the incomplete service year). */
  diasDesdeUltimoAniversario: number;
}

// Proportional vacations are prorated over a 365-day service year.
const DIAS_ANIO_DE_SERVICIO = 365;

/**
 * Finiquito (separación voluntaria/sin responsabilidad para el patrón): salarios pendientes +
 * vacaciones no disfrutadas + vacaciones proporcionales + prima vacacional + aguinaldo proporcional.
 * - Pending vacations: the entitlement of the last completed year (Art. 76 LFT) minus days taken.
 * - Proportional vacations (Art. 79 LFT): the entitlement of the service year in progress
 *   (the one the worker would earn on the next anniversary) × days since the last anniversary
 *   ÷ 365. Applies from the first year of service.
 * - Vacation premium (Art. 80 LFT): 25% minimum over both pending and proportional vacation pay.
 * NO incluye indemnizaciones de despido injustificado (3 meses + 20 días/año), que aplican
 * solo en liquidación por despido y están fuera del alcance de esta calculadora.
 */
export function calcularFiniquito(entrada: EntradaFiniquito): ResultadoFiniquito {
  const {
    salarioDiario,
    diasSalarioPendientes,
    aniosAntiguedadCumplidos,
    diasVacacionesYaTomadosEsteCiclo,
    diasLaboradosEnElAnioActual,
    diasDesdeUltimoAniversario,
  } = entrada;
  const aniosCumplidos = Math.floor(Math.max(0, aniosAntiguedadCumplidos));

  const salariosPendientes = salarioDiario * Math.max(0, diasSalarioPendientes);

  const diasVacacionesQueLeTocan = diasVacacionesPorAntiguedad(aniosCumplidos);
  const diasVacacionesPendientes = Math.max(
    0,
    diasVacacionesQueLeTocan - Math.max(0, diasVacacionesYaTomadosEsteCiclo)
  );
  const pagoVacacionesPendientes = salarioDiario * diasVacacionesPendientes;

  const diasServicioAnioEnCurso = Math.min(Math.max(0, diasDesdeUltimoAniversario), DIAS_ANIO_DE_SERVICIO);
  const diasVacacionesProporcionales =
    (diasVacacionesPorAntiguedad(aniosCumplidos + 1) * diasServicioAnioEnCurso) / DIAS_ANIO_DE_SERVICIO;
  const pagoVacacionesProporcionales = salarioDiario * diasVacacionesProporcionales;

  const primaVacacional = (pagoVacacionesPendientes + pagoVacacionesProporcionales) * PRIMA_VACACIONAL_MINIMA;

  const { diasProporcionales, aguinaldoBruto } = calcularAguinaldo(
    salarioDiario,
    diasLaboradosEnElAnioActual,
    AGUINALDO_DIAS_MINIMOS
  );

  const totalFiniquito =
    salariosPendientes +
    pagoVacacionesPendientes +
    pagoVacacionesProporcionales +
    primaVacacional +
    aguinaldoBruto;

  const round2 = (n: number) => Math.round(n * 100) / 100;

  return {
    salariosPendientes: round2(salariosPendientes),
    diasVacacionesPendientes,
    pagoVacacionesPendientes: round2(pagoVacacionesPendientes),
    diasVacacionesProporcionales: round2(diasVacacionesProporcionales),
    pagoVacacionesProporcionales: round2(pagoVacacionesProporcionales),
    primaVacacional: round2(primaVacacional),
    diasAguinaldoProporcional: diasProporcionales,
    aguinaldoProporcional: round2(aguinaldoBruto),
    totalFiniquito: round2(totalFiniquito),
  };
}
