// Reforma de reducción de la jornada laboral (40 horas). Fuente: DECRETO por el que se reforman,
// adicionan y derogan diversas disposiciones de la LFT, DOF 1-may-2026 (edición vespertina),
// https://www.diputados.gob.mx/LeyesBiblio/ref/lft/LFT_ref52_01may26.pdf — Arts. 61, 66, 68,
// 132 fracc. XXXIV, 994 fracc. IV Bis y Transitorios Segundo, Cuarto y Quinto. Cruzado contra el
// análisis de dlvmr.com.mx (mismas cifras). Verificado 2026-10-01.
// A diferencia de las demás tablas de data/, este calendario es multianual por decreto: no se
// re-publica cada año, pero sí hay que revisar si una reforma posterior lo modifica.

/** Transitorio Segundo: jornada ordinaria máxima semanal, vigente desde el 1 de enero de cada año. */
export const JORNADA_ORDINARIA_MAX_SEMANAL: Record<number, number> = {
  2026: 48,
  2027: 46,
  2028: 44,
  2029: 42,
  2030: 40,
};

/** Transitorio Cuarto: horas extraordinarias máximas por semana pagadas al doble (Art. 66). */
export const HORAS_EXTRA_MAX_SEMANAL: Record<number, number> = {
  2026: 9,
  2027: 9,
  2028: 10,
  2029: 11,
  2030: 12,
};

export const ANIO_INICIAL_REFORMA = 2026;
export const ANIO_FINAL_REFORMA = 2030;

/** Art. 66: las horas extra se distribuyen en hasta 4 horas diarias, en máximo 4 días por semana. */
export const HORAS_EXTRA_MAX_DIARIAS = 4;
export const DIAS_CON_HORAS_EXTRA_MAX = 4;

/** Art. 68: lo que exceda el límite del Art. 66 no puede pasar de 4 horas a la semana. */
export const HORAS_EXCEDENTES_MAX_SEMANAL = 4;

/** Art. 68: jornada ordinaria + extraordinaria nunca mayor a 12 horas diarias. */
export const JORNADA_TOTAL_MAX_DIARIA = 12;

/** Art. 66: +100% (pago doble). Art. 68: +200% (pago triple). Expresado como multiplicador del valor hora. */
export const FACTOR_HORA_DOBLE = 2;
export const FACTOR_HORA_TRIPLE = 3;

/** Art. 61: jornada diaria máxima por tipo. */
export const JORNADA_DIARIA_POR_TIPO = {
  diurna: 8,
  nocturna: 7,
  mixta: 7.5,
} as const;
export type TipoJornada = keyof typeof JORNADA_DIARIA_POR_TIPO;

/** Art. 994 fracc. IV Bis: multa por no llevar el registro electrónico (Art. 132 fracc. XXXIV). */
export const MULTA_REGISTRO_JORNADA_UMA = { minimo: 250, maximo: 5000 };

/** Transitorio Quinto: entran en vigor las disposiciones de la STPS sobre el registro electrónico. */
export const REGISTRO_ELECTRONICO_VIGENCIA = "2027-01-01";

/** Devuelve el año dentro del rango de la reforma (antes de 2026 → 2026; después de 2030 → 2030). */
export function anioReforma(anio: number): number {
  return Math.min(Math.max(Math.trunc(anio), ANIO_INICIAL_REFORMA), ANIO_FINAL_REFORMA);
}
