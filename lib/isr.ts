import {
  TARIFA_ISR_MENSUAL_2026,
  TARIFA_ISR_QUINCENAL_2026,
  TARIFA_ISR_SEMANAL_2026,
  SUBSIDIO_EMPLEO_2026,
  type RenglonTarifa,
} from "@/data/isr-2026";
import { UMA_2026 } from "@/data/constantes-2026";
import { buscarRenglon } from "@/lib/tarifa";

export type PeriodoPago = "semanal" | "quincenal" | "mensual";

// Each pay period has its own official tariff (Anexo 8 RMF). `dias` is the length used to
// prorate the monthly employment subsidy; `null` means the full monthly amount.
const PERIODOS: Record<PeriodoPago, { tarifa: RenglonTarifa[]; dias: number | null }> = {
  semanal: { tarifa: TARIFA_ISR_SEMANAL_2026, dias: 7 },
  quincenal: { tarifa: TARIFA_ISR_QUINCENAL_2026, dias: 15 },
  mensual: { tarifa: TARIFA_ISR_MENSUAL_2026, dias: null },
};

const round2 = (n: number) => Math.round(n * 100) / 100;

export interface ResultadoISR {
  /** Gross income of the pay period (monthly for calcularISRMensual). */
  ingresoMensual: number;
  isrCausado: number;
  subsidioAplicado: number;
  isrAPagar: number;
  ingresoNeto: number;
  tasaEfectiva: number; // isrAPagar / ingresoMensual
  renglonAplicado: number; // índice del renglón de tarifa usado (1-based, para transparencia)
  // Valores crudos del renglón de tarifa aplicado, para mostrar la fórmula sustituida en la UI
  // sin tener que reimplementar buscarRenglon() en el componente.
  limiteInferiorRenglon: number;
  cuotaFijaRenglon: number;
  porcentajeExcedenteRenglon: number;
  excedente: number;
}

/**
 * Calcula el ISR mensual de un sueldo bajo el régimen general de sueldos y salarios (Art. 96 LISR),
 * incluyendo subsidio para el empleo. No contempla otros regímenes (asimilados, honorarios, etc.)
 * ni retenciones adicionales (IMSS/Infonavit se calculan aparte).
 */
export function calcularISRMensual(ingresoMensual: number): ResultadoISR {
  return calcularISRPeriodo(ingresoMensual, "mensual");
}

/**
 * ISR withholding for a weekly, biweekly or monthly pay period, using that period's official
 * tariff. The employment subsidy is the monthly amount ÷ 30.4 × days of the period, granted
 * when the period's income, taken to a 30.4-day month, does not exceed the monthly cap.
 */
export function calcularISRPeriodo(ingresoPeriodo: number, periodo: PeriodoPago): ResultadoISR {
  const ingreso = Math.max(0, ingresoPeriodo);
  const { tarifa, dias } = PERIODOS[periodo];
  const { diasDelMes, limiteIngresoMensual, porcentajeUmaMensual } = SUBSIDIO_EMPLEO_2026;

  const { renglon: renglonISR, indice } = buscarRenglon(tarifa, ingreso);
  const excedente = ingreso - renglonISR.limiteInferior;
  const isrCausado = renglonISR.cuotaFija + excedente * renglonISR.porcentajeExcedente;

  // The subsidy only offsets ISR; any excess over the ISR owed is not paid to the worker.
  const ingresoMensualEquivalente = dias === null ? ingreso : (ingreso / dias) * diasDelMes;
  const califica = ingreso > 0 && round2(ingresoMensualEquivalente) <= limiteIngresoMensual;
  const subsidioMensual = round2(UMA_2026.mensual * porcentajeUmaMensual);
  const subsidioDelPeriodo = dias === null ? subsidioMensual : round2((subsidioMensual / diasDelMes) * dias);
  const subsidioMaximo = califica ? subsidioDelPeriodo : 0;
  const subsidioAplicado = Math.min(subsidioMaximo, Math.round(isrCausado * 100) / 100);

  const isrAPagar = Math.max(0, isrCausado - subsidioAplicado);
  const ingresoNeto = ingreso - isrAPagar;

  return {
    ingresoMensual: ingreso,
    isrCausado: Math.round(isrCausado * 100) / 100,
    subsidioAplicado: Math.round(subsidioAplicado * 100) / 100,
    isrAPagar: Math.round(isrAPagar * 100) / 100,
    ingresoNeto: Math.round(ingresoNeto * 100) / 100,
    tasaEfectiva: ingreso > 0 ? isrAPagar / ingreso : 0,
    renglonAplicado: indice,
    limiteInferiorRenglon: renglonISR.limiteInferior,
    cuotaFijaRenglon: renglonISR.cuotaFija,
    porcentajeExcedenteRenglon: renglonISR.porcentajeExcedente,
    excedente: Math.round(excedente * 100) / 100,
  };
}
