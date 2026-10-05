// Tarifa de ISR mensual 2026 para sueldos y salarios.
// Fuente: Anexo 8 de la Resolución Miscelánea Fiscal 2026 (DOF 2025-12-28), SAT:
// https://www.sat.gob.mx/minisitio/NormatividadRMFyRGCE/documentos2026/rmf/anexos/Anexo-8-RMF-2026_DOF-28122025.pdf
// See docs/DATA_SOURCES.md.
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
  { limiteInferior: 14644.65, limiteSuperior: 17533.64, cuotaFija: 1339.14, porcentajeExcedente: 0.1792 },
  { limiteInferior: 17533.65, limiteSuperior: 35362.83, cuotaFija: 1856.84, porcentajeExcedente: 0.2136 },
  { limiteInferior: 35362.84, limiteSuperior: 55736.68, cuotaFija: 5665.16, porcentajeExcedente: 0.2352 },
  { limiteInferior: 55736.69, limiteSuperior: 106410.5, cuotaFija: 10457.09, porcentajeExcedente: 0.3 },
  { limiteInferior: 106410.51, limiteSuperior: 141880.66, cuotaFija: 25659.23, porcentajeExcedente: 0.32 },
  { limiteInferior: 141880.67, limiteSuperior: 425641.99, cuotaFija: 37009.69, porcentajeExcedente: 0.34 },
  { limiteInferior: 425642.0, limiteSuperior: Infinity, cuotaFija: 133488.54, porcentajeExcedente: 0.35 },
];

// Tariffs for 7-day and 15-day pay periods (Anexo 8 RMF 2026; Art. 96
// LISR and Art. 175 of its Regulations). Transcribed from the official SAT PDF (DOF 2025-12-28)
// and cross-checked against El Contribuyente and SDV.
export const TARIFA_ISR_SEMANAL_2026: RenglonTarifa[] = [
  { limiteInferior: 0.01, limiteSuperior: 194.46, cuotaFija: 0.0, porcentajeExcedente: 0.0192 },
  { limiteInferior: 194.47, limiteSuperior: 1650.67, cuotaFija: 3.71, porcentajeExcedente: 0.064 },
  { limiteInferior: 1650.68, limiteSuperior: 2900.87, cuotaFija: 96.95, porcentajeExcedente: 0.1088 },
  { limiteInferior: 2900.88, limiteSuperior: 3372.11, cuotaFija: 232.96, porcentajeExcedente: 0.16 },
  { limiteInferior: 3372.12, limiteSuperior: 4037.32, cuotaFija: 308.35, porcentajeExcedente: 0.1792 },
  { limiteInferior: 4037.33, limiteSuperior: 8142.75, cuotaFija: 427.56, porcentajeExcedente: 0.2136 },
  { limiteInferior: 8142.76, limiteSuperior: 12834.08, cuotaFija: 1304.45, porcentajeExcedente: 0.2352 },
  { limiteInferior: 12834.09, limiteSuperior: 24502.45, cuotaFija: 2407.86, porcentajeExcedente: 0.3 },
  { limiteInferior: 24502.46, limiteSuperior: 32669.91, cuotaFija: 5908.35, porcentajeExcedente: 0.32 },
  { limiteInferior: 32669.92, limiteSuperior: 98009.66, cuotaFija: 8521.94, porcentajeExcedente: 0.34 },
  { limiteInferior: 98009.67, limiteSuperior: Infinity, cuotaFija: 30737.49, porcentajeExcedente: 0.35 },
];

export const TARIFA_ISR_QUINCENAL_2026: RenglonTarifa[] = [
  { limiteInferior: 0.01, limiteSuperior: 416.7, cuotaFija: 0.0, porcentajeExcedente: 0.0192 },
  { limiteInferior: 416.71, limiteSuperior: 3537.15, cuotaFija: 7.95, porcentajeExcedente: 0.064 },
  { limiteInferior: 3537.16, limiteSuperior: 6216.15, cuotaFija: 207.75, porcentajeExcedente: 0.1088 },
  { limiteInferior: 6216.16, limiteSuperior: 7225.95, cuotaFija: 499.2, porcentajeExcedente: 0.16 },
  { limiteInferior: 7225.96, limiteSuperior: 8651.4, cuotaFija: 660.75, porcentajeExcedente: 0.1792 },
  { limiteInferior: 8651.41, limiteSuperior: 17448.75, cuotaFija: 916.2, porcentajeExcedente: 0.2136 },
  { limiteInferior: 17448.76, limiteSuperior: 27501.6, cuotaFija: 2795.25, porcentajeExcedente: 0.2352 },
  { limiteInferior: 27501.61, limiteSuperior: 52505.25, cuotaFija: 5159.7, porcentajeExcedente: 0.3 },
  { limiteInferior: 52505.26, limiteSuperior: 70006.95, cuotaFija: 12660.75, porcentajeExcedente: 0.32 },
  { limiteInferior: 70006.96, limiteSuperior: 210020.7, cuotaFija: 18261.3, porcentajeExcedente: 0.34 },
  { limiteInferior: 210020.71, limiteSuperior: Infinity, cuotaFija: 65866.05, porcentajeExcedente: 0.35 },
];

// Employment subsidy (subsidio para el empleo) 2026. Since May 2024 it is no longer a bracket
// table: it is a flat percentage of the monthly UMA, granted only to workers whose monthly
// taxable income does not exceed a cap, and applied against the month's ISR (never paid out).
// Source: "Decreto por el que se modifica el diverso que otorga el subsidio para el empleo",
// DOF Dec 2025 (https://sidof.segob.gob.mx/notas/docFuente/5777649), Art. Segundo; cross-checked
// against IDC Online and El Contribuyente. January 2026 used 15.59% of the 2025 UMA instead
// (Transitorio Segundo); this site models February–December.
// For pay periods shorter than a month the monthly amount is divided by 30.4 and multiplied by
// the days of the period (same decree, Art. Segundo).
export const SUBSIDIO_EMPLEO_2026 = {
  porcentajeUmaMensual: 0.1502,
  limiteIngresoMensual: 11492.66,
  diasDelMes: 30.4,
};
