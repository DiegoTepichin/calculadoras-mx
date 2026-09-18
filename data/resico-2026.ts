// Tarifa RESICO (Régimen Simplificado de Confianza) para personas físicas, ISR mensual 2026.
// Fuente: Art. 113-E LISR / Anexo 8 de la Resolución Miscelánea Fiscal. Estas tasas no han
// cambiado desde que el régimen entró en vigor en 2022 (a diferencia de la tarifa general del
// Art. 96, no se ajustan por inflación). Ver memoria "datos_fiscales_2026_mx.md".
// IMPORTANTE: re-verificar cada año contra la fuente oficial antes de reusar.

export interface RenglonResico {
  limiteInferior: number;
  limiteSuperior: number; // en la práctica, ingresos por arriba del límite del régimen ($3,500,000)
  tasa: number; // como fracción, ej. 0.01 = 1%. A diferencia del ISR general, esta tasa se aplica
  // al ingreso TOTAL del mes (no solo al excedente sobre el límite inferior).
}

export const TARIFA_RESICO_MENSUAL_2026: RenglonResico[] = [
  { limiteInferior: 0.01, limiteSuperior: 25000.0, tasa: 0.01 },
  { limiteInferior: 25000.01, limiteSuperior: 50000.0, tasa: 0.011 },
  { limiteInferior: 50000.01, limiteSuperior: 83333.33, tasa: 0.015 },
  { limiteInferior: 83333.34, limiteSuperior: 208333.33, tasa: 0.02 },
  { limiteInferior: 208333.34, limiteSuperior: 3500000.0, tasa: 0.025 },
];

// Límite de ingresos anuales para permanecer en RESICO (personas físicas). Si se rebasa, se
// pierde el régimen y se pasa al régimen general de actividad empresarial.
export const RESICO_LIMITE_INGRESOS_ANUAL = 3500000;
