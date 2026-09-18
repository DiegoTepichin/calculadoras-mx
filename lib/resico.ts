import { TARIFA_RESICO_MENSUAL_2026, RESICO_LIMITE_INGRESOS_ANUAL } from "@/data/resico-2026";
import { buscarRenglon } from "@/lib/tarifa";

export interface ResultadoResico {
  ingresoMensual: number;
  tasaAplicada: number; // fracción, ej. 0.015 = 1.5%
  isrAPagar: number;
  ingresoNeto: number;
  tasaEfectiva: number;
  renglonAplicado: number;
  excedeLimiteRegimen: boolean; // ingreso mensual implica rebasar el tope anual de RESICO
}

/**
 * Calcula el ISR mensual bajo RESICO (Régimen Simplificado de Confianza) para personas físicas
 * (Art. 113-E LISR): una tasa fija según el rango de ingresos, aplicada al ingreso TOTAL del mes
 * (no progresiva sobre el excedente como el régimen general de sueldos y salarios) y sin
 * deducciones personales. No incluye IVA ni contempla actividades excluidas del régimen.
 */
export function calcularISRResico(ingresoMensual: number): ResultadoResico {
  const ingreso = Math.max(0, ingresoMensual);

  const { renglon, indice } = buscarRenglon(TARIFA_RESICO_MENSUAL_2026, ingreso);
  const isrAPagar = ingreso * renglon.tasa;
  const ingresoNeto = ingreso - isrAPagar;

  return {
    ingresoMensual: ingreso,
    tasaAplicada: renglon.tasa,
    isrAPagar: Math.round(isrAPagar * 100) / 100,
    ingresoNeto: Math.round(ingresoNeto * 100) / 100,
    tasaEfectiva: ingreso > 0 ? isrAPagar / ingreso : 0,
    renglonAplicado: indice,
    excedeLimiteRegimen: ingreso * 12 > RESICO_LIMITE_INGRESOS_ANUAL,
  };
}
