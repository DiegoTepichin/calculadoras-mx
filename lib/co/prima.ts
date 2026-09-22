export interface ResultadoPrima {
  diasTrabajados: number;
  primaSemestral: number;
}

/**
 * Calcula la prima de servicios de un semestre (Art. 306 CST): salario mensual × días trabajados
 * en el semestre ÷ 360. Se paga en dos cuotas al año (30 de junio y 20 de diciembre), cada una
 * calculada por separado con esta misma fórmula sobre su propio semestre.
 */
export function calcularPrimaServicios(
  salarioMensual: number,
  diasTrabajadosSemestre: number
): ResultadoPrima {
  const dias = Math.min(Math.max(0, diasTrabajadosSemestre), 180);
  const primaSemestral = (salarioMensual * dias) / 360;

  return {
    diasTrabajados: dias,
    primaSemestral: Math.round(primaSemestral * 100) / 100,
  };
}
