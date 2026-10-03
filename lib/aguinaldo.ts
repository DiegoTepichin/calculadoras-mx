import { AGUINALDO_DIAS_MINIMOS, DIAS_DEL_ANIO_2026 } from "@/data/constantes-2026";

export interface ResultadoAguinaldo {
  diasProporcionales: number;
  aguinaldoBruto: number;
  // El aguinaldo es ingreso gravable, exento hasta 30 UMA (Art. 93 fracc. XIV LISR);
  // aquí solo se informa el bruto, no se calcula el ISR retenido (requiere el sueldo anual acumulado).
}

/**
 * Calcula el aguinaldo proporcional según días laborados en el año (Art. 87 LFT).
 * diasLaboradosEnElAnio: días naturales trabajados en el año calendario.
 * diasAguinaldoAnual: días de aguinaldo que paga la empresa por año completo (mínimo legal 15).
 * diasDelAnio: length of the calendar year (366 in leap years). Days worked are capped at it,
 * so a full year never yields more than the annual aguinaldo.
 */
export function calcularAguinaldo(
  salarioDiario: number,
  diasLaboradosEnElAnio: number,
  diasAguinaldoAnual: number = AGUINALDO_DIAS_MINIMOS,
  diasDelAnio: number = DIAS_DEL_ANIO_2026
): ResultadoAguinaldo {
  const dias = Math.min(Math.max(0, diasLaboradosEnElAnio), diasDelAnio);
  const diasProporcionales = (diasAguinaldoAnual * dias) / diasDelAnio;
  const aguinaldoBruto = salarioDiario * diasProporcionales;

  return {
    diasProporcionales: Math.round(diasProporcionales * 100) / 100,
    aguinaldoBruto: Math.round(aguinaldoBruto * 100) / 100,
  };
}
