import { TARIFA_ISR_MENSUAL_2026, SUBSIDIO_EMPLEO_MENSUAL_2026 } from "@/data/isr-2026";

export interface ResultadoISR {
  ingresoMensual: number;
  isrCausado: number;
  subsidioAplicado: number;
  isrAPagar: number;
  ingresoNeto: number;
  tasaEfectiva: number; // isrAPagar / ingresoMensual
  renglonAplicado: number; // índice del renglón de tarifa usado (1-based, para transparencia)
}

function buscarRenglon<T extends { limiteInferior: number; limiteSuperior: number }>(
  tabla: T[],
  ingreso: number
): { renglon: T; indice: number } {
  for (let i = 0; i < tabla.length; i++) {
    if (ingreso >= tabla[i].limiteInferior && ingreso <= tabla[i].limiteSuperior) {
      return { renglon: tabla[i], indice: i + 1 };
    }
  }
  const ultimo = tabla[tabla.length - 1];
  return { renglon: ultimo, indice: tabla.length };
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
  };
}
