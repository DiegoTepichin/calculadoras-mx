export interface RenglonBase {
  limiteInferior: number;
  limiteSuperior: number;
}

/**
 * Ubica el renglón de una tarifa por rangos (ISR, RESICO, etc.) que corresponde a un ingreso.
 * Ingresos por debajo del primer límite inferior (p. ej. 0) van al primer renglón.
 * The row is chosen by lower limit only: official tables leave a one-cent gap between a row's
 * upper limit and the next lower limit, and an amount with fractions of a cent inside that gap
 * (e.g. 844.595) must stay in the lower row instead of matching none.
 */
export function buscarRenglon<T extends RenglonBase>(
  tabla: T[],
  ingreso: number
): { renglon: T; indice: number } {
  let i = 0;
  while (i + 1 < tabla.length && ingreso >= tabla[i + 1].limiteInferior) i++;
  return { renglon: tabla[i], indice: i + 1 };
}
