// Cuotas obrero-patronales del IMSS 2026. Fuente: Ley del Seguro Social (arts. 25, 28, 73, 74,
// 106, 107, 147, 168, 211-212) y Ley del Infonavit (art. 29 fracc. II) para las tasas fijas;
// Segundo Transitorio del Decreto de reforma a la LSS (16-dic-2020) para la tabla escalonada de
// Cesantía en Edad Avanzada y Vejez (CEAV) patronal. Ver memoria "datos_fiscales_2026_mx.md".
// IMPORTANTE: re-verificar cada año contra la fuente oficial antes de reusar.

// Tope de cotización: ningún SBC (Salario Base de Cotización) puede rebasar 25 UMA (Art. 28 LSS).
export const SBC_TOPE_VECES_UMA = 25;

// Cuota obrera (lo que se descuenta al trabajador): porcentajes fijos, no varían por rango
// salarial. Todas se calculan sobre el SBC diario, excepto "excedenteTresUma" que solo aplica
// sobre la parte del SBC que rebasa 3 UMA.
export const CUOTA_OBRERA_2026 = {
  prestacionesEnDinero: 0.0025, // Art. 107 LSS
  gastosMedicosPensionados: 0.00375, // Art. 25 LSS
  invalidezYVida: 0.00625, // Art. 147 LSS
  cesantiaYVejez: 0.01125, // Art. 168 fracc. II LSS — fija para el trabajador, a diferencia de la patronal
  excedenteTresUma: 0.004, // Art. 106 fracc. II LSS, sobre el excedente de 3 UMA
};

// Cuota patronal: porcentajes fijos sobre el SBC diario, salvo donde se indique lo contrario.
export const CUOTA_PATRONAL_2026 = {
  // Enfermedades y Maternidad, cuota fija: NO es porcentaje del SBC, es 20.4% de 1 UMA diaria
  // (Art. 106 fracc. I LSS) — mismo monto en pesos para cualquier trabajador, sin importar su SBC.
  emCuotaFijaSobreUma: 0.204,
  emExcedenteTresUma: 0.011, // Art. 106 fracc. II LSS, sobre el excedente de 3 UMA
  emPrestacionesEnDinero: 0.007, // Art. 107 LSS
  gastosMedicosPensionados: 0.0105, // Art. 25 LSS
  invalidezYVida: 0.0175, // Art. 147 LSS
  guarderiasYPrestacionesSociales: 0.01, // Arts. 211-212 LSS
  retiro: 0.02, // Art. 168 fracc. I LSS
  infonavit: 0.05, // Art. 29 fracc. II Ley del Infonavit
};

// Cesantía en Edad Avanzada y Vejez patronal (Art. 168 fracc. II LSS): a diferencia de las demás
// ramas, NO es un porcentaje fijo — sube por escalones definidos en el Segundo Transitorio del
// Decreto de reforma del 16-dic-2020, hasta converger en 11.875% en 2030. La tabla 2026 compara
// el SBC contra el salario mínimo para el primer renglón y contra múltiplos de UMA para el resto.
//
// NOTA: como el salario mínimo (~2.69 UMA en 2026) ya rebasa los primeros renglones "en UMA" de
// esta tabla, esos renglones intermedios son, en la práctica, inalcanzables para 2026 (nadie
// puede tener un SBC legal por debajo del salario mínimo). Esto es un efecto real y documentado
// de la desindexación del salario mínimo respecto a la UMA desde 2016 — no es un bug de esta
// tabla ni de la función que la usa (lib/imss.ts busca el renglón por comparación directa, así
// que los renglones inalcanzables simplemente nunca se seleccionan).
export const CEAV_PATRONAL_2026 = {
  tasaEnSalarioMinimo: 0.0315, // exactamente 1 salario mínimo (SBC = salario mínimo)
  escalones: [
    { hastaVecesUma: 1.5, tasa: 0.03676 },
    { hastaVecesUma: 2.0, tasa: 0.04851 },
    { hastaVecesUma: 2.5, tasa: 0.05556 },
    { hastaVecesUma: 3.0, tasa: 0.06026 },
    { hastaVecesUma: 3.5, tasa: 0.06361 },
    { hastaVecesUma: 4.0, tasa: 0.06613 },
    { hastaVecesUma: Infinity, tasa: 0.07513 },
  ],
};

// Prima media de riesgo de trabajo por clase (Art. 73 LSS) — es la que paga toda empresa que se
// inscribe por primera vez o cambia de actividad. Después del primer año, cada empresa calcula
// su propia prima según su siniestralidad real (Art. 72 LSS), algo que esta calculadora no
// determina: si ya conoces tu prima registrada ante el IMSS, captúrala directamente.
export const PRIMA_MEDIA_POR_CLASE_2026 = [
  { clase: "I", descripcion: "Mínimo (oficinas, servicios)", prima: 0.0054355 },
  { clase: "II", descripcion: "Bajo (comercio)", prima: 0.0113065 },
  { clase: "III", descripcion: "Medio (industria manufacturera)", prima: 0.025984 },
  { clase: "IV", descripcion: "Alto (construcción)", prima: 0.0465325 },
  { clase: "V", descripcion: "Máximo (minería, alto riesgo)", prima: 0.0758875 },
];
