// Tarifa de ISR mensual 2026 para sueldos y salarios.
// Fuente: Resolución Miscelánea Fiscal 2026, SAT. Ver memoria "datos_fiscales_2026_mx.md".
export interface RenglonTarifa {
  limiteInferior: number;
  limiteSuperior: number; // Infinity para el último renglón
  cuotaFija: number;
  porcentajeExcedente: number; // como fracción, ej. 0.0192 = 1.92%
}

export const TARIFA_ISR_MENSUAL_2026: RenglonTarifa[] = [
  { limiteInferior: 0.01, limiteSuperior: 844.59, cuotaFija: 0.0, porcentajeExcedente: 0.0192 },
  { limiteInferior: 844.6, limiteSuperior: 7168.51, cuotaFija: 16.22, porcentajeExcedente: 0.064 },
  { limiteInferior: 7168.52, limiteSuperior: 12598.02, cuotaFija: 420.95, porcentajeExcedente: 0.1088 },
  { limiteInferior: 12598.03, limiteSuperior: 14644.64, cuotaFija: 1011.68, porcentajeExcedente: 0.16 },
  { limiteInferior: 14644.65, limiteSuperior: 17533.63, cuotaFija: 1339.14, porcentajeExcedente: 0.1792 },
  { limiteInferior: 17533.64, limiteSuperior: 35362.83, cuotaFija: 1856.84, porcentajeExcedente: 0.2136 },
  { limiteInferior: 35362.84, limiteSuperior: 55736.68, cuotaFija: 5665.16, porcentajeExcedente: 0.2352 },
  { limiteInferior: 55736.69, limiteSuperior: 106410.5, cuotaFija: 10457.09, porcentajeExcedente: 0.3 },
  { limiteInferior: 106410.51, limiteSuperior: 141880.66, cuotaFija: 25659.23, porcentajeExcedente: 0.32 },
  { limiteInferior: 141880.67, limiteSuperior: 425641.99, cuotaFija: 37009.69, porcentajeExcedente: 0.34 },
  { limiteInferior: 425642.0, limiteSuperior: Infinity, cuotaFija: 133488.54, porcentajeExcedente: 0.35 },
];

// Subsidio para el empleo mensual 2026 (misma fuente).
export interface RenglonSubsidio {
  limiteInferior: number;
  limiteSuperior: number;
  subsidio: number;
}

export const SUBSIDIO_EMPLEO_MENSUAL_2026: RenglonSubsidio[] = [
  { limiteInferior: 0.01, limiteSuperior: 1768.96, subsidio: 407.02 },
  { limiteInferior: 1768.97, limiteSuperior: 2653.38, subsidio: 406.83 },
  { limiteInferior: 2653.39, limiteSuperior: 3472.84, subsidio: 406.62 },
  { limiteInferior: 3472.85, limiteSuperior: 3537.87, subsidio: 392.77 },
  { limiteInferior: 3537.88, limiteSuperior: 4446.15, subsidio: 382.46 },
  { limiteInferior: 4446.16, limiteSuperior: 4717.18, subsidio: 354.23 },
  { limiteInferior: 4717.19, limiteSuperior: 5335.42, subsidio: 324.87 },
  { limiteInferior: 5335.43, limiteSuperior: 6224.67, subsidio: 294.63 },
  { limiteInferior: 6224.68, limiteSuperior: 7113.9, subsidio: 253.54 },
  { limiteInferior: 7113.91, limiteSuperior: 7382.33, subsidio: 217.61 },
  { limiteInferior: 7382.34, limiteSuperior: Infinity, subsidio: 0.0 },
];
