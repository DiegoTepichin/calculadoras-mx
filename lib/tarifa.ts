export interface RenglonBase {
  limiteInferior: number;
  limiteSuperior: number;
}

/**
 * Ubica el renglón de una tarifa por rangos (ISR, RESICO, etc.) que corresponde a un ingreso.
 * Ingresos por debajo del primer límite inferior (p. ej. 0) van al primer renglón; solo un
 * ingreso mayor al límite superior del último renglón (normalmente Infinity) caería en el último.
 */
export function buscarRenglon<T extends RenglonBase>(
  tabla: T[],
  ingreso: number
): { renglon: T; indice: number } {
  for (let i = 0; i < tabla.length; i++) {
    if (ingreso >= tabla[i].limiteInferior && ingreso <= tabla[i].limiteSuperior) {
      return { renglon: tabla[i], indice: i + 1 };
    }
  }
  if (ingreso < tabla[0].limiteInferior) {
    return { renglon: tabla[0], indice: 1 };
  }
  const ultimo = tabla[tabla.length - 1];
  return { renglon: ultimo, indice: tabla.length };
}
