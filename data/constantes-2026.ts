// Fuente: INEGI (UMA), CONASAMI (salario mínimo), LFT Art. 76/80/87 (vacaciones/aguinaldo).
// Ver memoria del proyecto "datos_fiscales_2026_mx.md" para fuentes exactas.
// IMPORTANTE: re-verificar cada año contra la fuente oficial antes de reusar.

export const UMA_2026 = {
  diario: 117.31,
  mensual: 3566.22,
  anual: 42794.64,
  vigenciaDesde: "2026-02-01",
  nota: "Durante enero 2026 sigue vigente la UMA 2025 ($113.14 diario).",
};

export const SALARIO_MINIMO_2026 = {
  zonaGeneral: 315.04,
  zonaFronteraNorte: 440.87,
  vigenciaDesde: "2026-01-01",
};

// Art. 76 LFT (reforma "vacaciones dignas" 2023): días de vacaciones por años de antigüedad cumplidos.
export const VACACIONES_LFT: { hastaAnios: number; dias: number }[] = [
  { hastaAnios: 1, dias: 12 },
  { hastaAnios: 2, dias: 14 },
  { hastaAnios: 3, dias: 16 },
  { hastaAnios: 4, dias: 18 },
  { hastaAnios: 5, dias: 20 },
  { hastaAnios: 10, dias: 22 },
  { hastaAnios: 15, dias: 24 },
  { hastaAnios: 20, dias: 26 },
  { hastaAnios: 25, dias: 28 },
  { hastaAnios: 30, dias: 30 },
  { hastaAnios: 35, dias: 32 },
];

export function diasVacacionesPorAntiguedad(aniosCumplidos: number): number {
  if (aniosCumplidos < 1) return 0;
  const tabla = VACACIONES_LFT;
  for (const renglon of tabla) {
    if (aniosCumplidos <= renglon.hastaAnios) return renglon.dias;
  }
  // Después de 35 años: +2 días por cada 5 años adicionales (regla del Art. 76).
  const ultimo = tabla[tabla.length - 1];
  const aniosExtra = aniosCumplidos - ultimo.hastaAnios;
  const bloquesDe5 = Math.ceil(aniosExtra / 5);
  return ultimo.dias + bloquesDe5 * 2;
}

export const PRIMA_VACACIONAL_MINIMA = 0.25; // Art. 80 LFT
export const AGUINALDO_DIAS_MINIMOS = 15; // Art. 87 LFT
