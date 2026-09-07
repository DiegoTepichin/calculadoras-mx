import { AGUINALDO_DIAS_MINIMOS } from "@/data/constantes-2026";

export interface ResultadoAguinaldo {
  diasProporcionales: number;
  aguinaldoBruto: number;
  // El aguinaldo es ingreso gravable, exento hasta 30 UMA (Art. 93 fracc. XIV LISR);
  // aquí solo se informa el bruto, no se calcula el ISR retenido (requiere el sueldo anual acumulado).
}

/**
 * Calcula el aguinaldo proporcional según días laborados en el año (Art. 87 LFT).
 * diasLaboradosEnElAnio: días naturales trabajados en el año calendario (máx. 365/366).
 * diasAguinaldoAnual: días de aguinaldo que paga la empresa por año completo (mínimo legal 15).
 */
export function calcularAguinaldo(
  salarioDiario: number,
  diasLaboradosEnElAnio: number,
  diasAguinaldoAnual: number = AGUINALDO_DIAS_MINIMOS
): ResultadoAguinaldo {
  const dias = Math.min(Math.max(0, diasLaboradosEnElAnio), 366);
  const diasProporcionales = (diasAguinaldoAnual * dias) / 365;
  const aguinaldoBruto = salarioDiario * diasProporcionales;

  return {
    diasProporcionales: Math.round(diasProporcionales * 100) / 100,
    aguinaldoBruto: Math.round(aguinaldoBruto * 100) / 100,
  };
}
