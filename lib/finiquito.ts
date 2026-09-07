import { diasVacacionesPorAntiguedad, PRIMA_VACACIONAL_MINIMA, AGUINALDO_DIAS_MINIMOS } from "@/data/constantes-2026";
import { calcularAguinaldo } from "@/lib/aguinaldo";

export interface ResultadoFiniquito {
  salariosPendientes: number;
  diasVacacionesPendientes: number;
  pagoVacacionesPendientes: number;
  primaVacacional: number;
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
}

/**
 * Finiquito (separación voluntaria/sin responsabilidad para el patrón): salarios pendientes +
 * vacaciones no disfrutadas + prima vacacional + aguinaldo proporcional.
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
  } = entrada;

  const salariosPendientes = salarioDiario * Math.max(0, diasSalarioPendientes);

  const diasVacacionesQueLeTocan = diasVacacionesPorAntiguedad(aniosAntiguedadCumplidos);
  const diasVacacionesPendientes = Math.max(
    0,
    diasVacacionesQueLeTocan - Math.max(0, diasVacacionesYaTomadosEsteCiclo)
  );
  const pagoVacacionesPendientes = salarioDiario * diasVacacionesPendientes;
  const primaVacacional = pagoVacacionesPendientes * PRIMA_VACACIONAL_MINIMA;

  const { diasProporcionales, aguinaldoBruto } = calcularAguinaldo(
    salarioDiario,
    diasLaboradosEnElAnioActual,
    AGUINALDO_DIAS_MINIMOS
  );

  const totalFiniquito =
    salariosPendientes + pagoVacacionesPendientes + primaVacacional + aguinaldoBruto;

  const round2 = (n: number) => Math.round(n * 100) / 100;

  return {
    salariosPendientes: round2(salariosPendientes),
    diasVacacionesPendientes,
    pagoVacacionesPendientes: round2(pagoVacacionesPendientes),
    primaVacacional: round2(primaVacacional),
    diasAguinaldoProporcional: diasProporcionales,
    aguinaldoProporcional: round2(aguinaldoBruto),
    totalFiniquito: round2(totalFiniquito),
  };
}
