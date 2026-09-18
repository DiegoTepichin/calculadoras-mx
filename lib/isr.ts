import { TARIFA_ISR_MENSUAL_2026, SUBSIDIO_EMPLEO_MENSUAL_2026 } from "@/data/isr-2026";
import { buscarRenglon } from "@/lib/tarifa";

export interface ResultadoISR {
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
  const ingreso = Math.max(0, ingresoMensual);

  const { renglon: renglonISR, indice } = buscarRenglon(TARIFA_ISR_MENSUAL_2026, ingreso);
  const excedente = ingreso - renglonISR.limiteInferior;
  const isrCausado = renglonISR.cuotaFija + excedente * renglonISR.porcentajeExcedente;

  const { renglon: renglonSubsidio } = buscarRenglon(SUBSIDIO_EMPLEO_MENSUAL_2026, ingreso);
  const subsidioAplicado = renglonSubsidio.subsidio;

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
