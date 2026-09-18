import {
  SBC_TOPE_VECES_UMA,
  CUOTA_OBRERA_2026,
  CUOTA_PATRONAL_2026,
  CEAV_PATRONAL_2026,
} from "@/data/imss-2026";
import { UMA_2026, SALARIO_MINIMO_2026 } from "@/data/constantes-2026";

const round2 = (n: number) => Math.round(n * 100) / 100;

function toparSbc(sbcDiario: number): number {
  const tope = UMA_2026.diario * SBC_TOPE_VECES_UMA;
  return Math.min(Math.max(0, sbcDiario), tope);
}

function excedenteTresUma(sbcDiario: number): number {
  return Math.max(0, sbcDiario - UMA_2026.diario * 3);
}

/**
 * Determina la tasa patronal de Cesantía en Edad Avanzada y Vejez para un SBC diario dado
 * (Art. 168 fracc. II LSS + Segundo Transitorio del Decreto 16-dic-2020). Ver el comentario en
 * data/imss-2026.ts sobre por qué algunos escalones intermedios de la tabla son inalcanzables.
 */
export function determinarTasaCeavPatronal(sbcDiario: number): number {
  if (sbcDiario <= SALARIO_MINIMO_2026.zonaGeneral) {
    return CEAV_PATRONAL_2026.tasaEnSalarioMinimo;
  }
  const vecesUma = sbcDiario / UMA_2026.diario;
  for (const escalon of CEAV_PATRONAL_2026.escalones) {
    if (vecesUma <= escalon.hastaVecesUma) return escalon.tasa;
  }
  return CEAV_PATRONAL_2026.escalones[CEAV_PATRONAL_2026.escalones.length - 1].tasa;
}

export interface DesgloseCuotaObrera {
  sbcDiario: number;
  prestacionesEnDinero: number;
  gastosMedicosPensionados: number;
  invalidezYVida: number;
  cesantiaYVejez: number;
  excedenteTresUma: number;
  total: number;
}

/**
 * Cuota obrera diaria (lo que se descuenta al trabajador). Todos los porcentajes son fijos —
 * a diferencia de la cuota patronal, aquí Cesantía y Vejez no varía por rango salarial.
 */
export function calcularCuotaObreraDiaria(sbcDiario: number): DesgloseCuotaObrera {
  const sbc = toparSbc(sbcDiario);
  const excedente = excedenteTresUma(sbc);

  const prestacionesEnDinero = sbc * CUOTA_OBRERA_2026.prestacionesEnDinero;
  const gastosMedicosPensionados = sbc * CUOTA_OBRERA_2026.gastosMedicosPensionados;
  const invalidezYVida = sbc * CUOTA_OBRERA_2026.invalidezYVida;
  const cesantiaYVejez = sbc * CUOTA_OBRERA_2026.cesantiaYVejez;
  const excedenteCalculado = excedente * CUOTA_OBRERA_2026.excedenteTresUma;

  const total =
    prestacionesEnDinero + gastosMedicosPensionados + invalidezYVida + cesantiaYVejez + excedenteCalculado;

  return {
    sbcDiario: sbc,
    prestacionesEnDinero: round2(prestacionesEnDinero),
    gastosMedicosPensionados: round2(gastosMedicosPensionados),
    invalidezYVida: round2(invalidezYVida),
    cesantiaYVejez: round2(cesantiaYVejez),
    excedenteTresUma: round2(excedenteCalculado),
    total: round2(total),
  };
}

export interface DesgloseCuotaPatronal {
  sbcDiario: number;
  cuotaFijaEM: number;
  excedenteTresUmaEM: number;
  prestacionesEnDineroEM: number;
  gastosMedicosPensionados: number;
  invalidezYVida: number;
  guarderiasYPrestacionesSociales: number;
  retiro: number;
  cesantiaYVejez: number;
  tasaCesantiaYVejezAplicada: number;
  riesgoTrabajo: number;
  infonavit: number;
  total: number;
}

/**
 * Cuota patronal diaria (lo que paga la empresa). primaRiesgo es la prima de riesgo de trabajo
 * de la empresa (como fracción, ej. 0.0054355) — usa PRIMA_MEDIA_POR_CLASE_2026 como default por
 * clase, o la prima real de la empresa si ya la conoce.
 */
export function calcularCuotaPatronalDiaria(
  sbcDiario: number,
  primaRiesgo: number
): DesgloseCuotaPatronal {
  const sbc = toparSbc(sbcDiario);
  const excedente = excedenteTresUma(sbc);

  const cuotaFijaEM = UMA_2026.diario * CUOTA_PATRONAL_2026.emCuotaFijaSobreUma;
  const excedenteTresUmaEM = excedente * CUOTA_PATRONAL_2026.emExcedenteTresUma;
  const prestacionesEnDineroEM = sbc * CUOTA_PATRONAL_2026.emPrestacionesEnDinero;
  const gastosMedicosPensionados = sbc * CUOTA_PATRONAL_2026.gastosMedicosPensionados;
  const invalidezYVida = sbc * CUOTA_PATRONAL_2026.invalidezYVida;
  const guarderiasYPrestacionesSociales = sbc * CUOTA_PATRONAL_2026.guarderiasYPrestacionesSociales;
  const retiro = sbc * CUOTA_PATRONAL_2026.retiro;
  const tasaCesantiaYVejezAplicada = determinarTasaCeavPatronal(sbc);
  const cesantiaYVejez = sbc * tasaCesantiaYVejezAplicada;
  const riesgoTrabajo = sbc * Math.max(0, primaRiesgo);
  const infonavit = sbc * CUOTA_PATRONAL_2026.infonavit;

  const total =
    cuotaFijaEM +
    excedenteTresUmaEM +
    prestacionesEnDineroEM +
    gastosMedicosPensionados +
    invalidezYVida +
    guarderiasYPrestacionesSociales +
    retiro +
    cesantiaYVejez +
    riesgoTrabajo +
    infonavit;

  return {
    sbcDiario: sbc,
    cuotaFijaEM: round2(cuotaFijaEM),
    excedenteTresUmaEM: round2(excedenteTresUmaEM),
    prestacionesEnDineroEM: round2(prestacionesEnDineroEM),
    gastosMedicosPensionados: round2(gastosMedicosPensionados),
    invalidezYVida: round2(invalidezYVida),
    guarderiasYPrestacionesSociales: round2(guarderiasYPrestacionesSociales),
    retiro: round2(retiro),
    cesantiaYVejez: round2(cesantiaYVejez),
    tasaCesantiaYVejezAplicada,
    riesgoTrabajo: round2(riesgoTrabajo),
    infonavit: round2(infonavit),
    total: round2(total),
  };
}
