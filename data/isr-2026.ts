// Tarifa de ISR mensual 2026 para sueldos y salarios.
// Fuente: Anexo 8 de la Resolución Miscelánea Fiscal 2026, SAT. See docs/DATA_SOURCES.md.
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

// Employment subsidy (subsidio para el empleo) 2026. Since May 2024 it is no longer a bracket
// table: it is a flat percentage of the monthly UMA, granted only to workers whose monthly
// taxable income does not exceed a cap, and applied against the month's ISR (never paid out).
// Source: "Decreto por el que se modifica el diverso que otorga el subsidio para el empleo",
// DOF Dec 2025 (https://sidof.segob.gob.mx/notas/docFuente/5777649), Art. Segundo; cross-checked
// against IDC Online and El Contribuyente. January 2026 used 15.59% of the 2025 UMA instead
// (Transitorio Segundo); this site models February–December.
export const SUBSIDIO_EMPLEO_2026 = {
  porcentajeUmaMensual: 0.1502,
  limiteIngresoMensual: 11492.66,
};
