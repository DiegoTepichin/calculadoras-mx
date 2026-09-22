// Tabla de retención en la fuente para asalariados, procedimiento 1 (Art. 383 Estatuto
// Tributario). Los rangos están expresados en UVT porque la estructura de la tabla (límites y
// tarifas) es fija desde la Ley 2277 de 2022 — solo cambia el valor en pesos de la UVT cada año
// (ver data/co/constantes-2026.ts). Ver memoria "datos_fiscales_2026_co.md".
// IMPORTANTE: re-verificar cada año contra la fuente oficial (DIAN) antes de reusar.
//
// NOTA: algunas fuentes secundarias publican constantes aditivas ("+10 UVT", "+69 UVT"...) para
// saltar directo a un renglón sin recorrer los anteriores. No se pudo verificar que esas
// constantes fueran correctas (no cuadraban con el cálculo marginal en los límites de renglón), así
// que lib/co/retencion.ts NO las usa: calcula la retención recorriendo cada renglón y sumando su
// porción gravable × su tarifa (método marginal verdadero), que solo depende de los límites y
// tarifas de esta tabla — sí verificados contra 2 fuentes independientes.
export interface RenglonRetencion {
  limiteInferior: number; // en UVT
  limiteSuperior: number; // en UVT
  porcentajeExcedente: number; // fracción, ej. 0.19 = 19%
}

export const TABLA_RETENCION_2026_UVT: RenglonRetencion[] = [
  { limiteInferior: 0, limiteSuperior: 95, porcentajeExcedente: 0 },
  { limiteInferior: 95, limiteSuperior: 150, porcentajeExcedente: 0.19 },
  { limiteInferior: 150, limiteSuperior: 360, porcentajeExcedente: 0.28 },
  { limiteInferior: 360, limiteSuperior: 640, porcentajeExcedente: 0.33 },
  { limiteInferior: 640, limiteSuperior: 945, porcentajeExcedente: 0.35 },
  { limiteInferior: 945, limiteSuperior: 2300, porcentajeExcedente: 0.37 },
  { limiteInferior: 2300, limiteSuperior: Infinity, porcentajeExcedente: 0.39 },
];
