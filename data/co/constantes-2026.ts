// Constantes fiscales/laborales de Colombia 2026.
// Fuente: DIAN, Resolución 000238 del 15-dic-2025 (UVT); Decreto 1469 de 2025 (salario mínimo);
// Decreto 1470 de 2025 (auxilio de transporte). Ver memoria "datos_fiscales_2026_co.md".
// IMPORTANTE: re-verificar cada año contra la fuente oficial antes de reusar.

export const UVT_2026 = {
  valor: 52374,
  vigenciaDesde: "2026-01-01",
};

export const SALARIO_MINIMO_CO_2026 = {
  mensual: 1750905,
  auxilioTransporte: 249095,
  // El auxilio de transporte solo aplica a quien gana hasta 2 salarios mínimos.
  topeAuxilioTransporteVecesSMLMV: 2,
};
