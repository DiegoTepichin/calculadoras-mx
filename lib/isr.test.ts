import { describe, expect, it } from "vitest";
import { calcularISRMensual, calcularISRPeriodo } from "@/lib/isr";

describe("calcularISRMensual", () => {
  it("no explota ni cae en el último renglón (35%) para un ingreso de $0", () => {
    // Regresión: buscarRenglon() caía al ÚLTIMO renglón de la tarifa cuando el ingreso
    // estaba por debajo del primer límite inferior (p. ej. 0), en vez del primero.
    const r = calcularISRMensual(0);
    expect(r.renglonAplicado).toBe(1);
    expect(r.isrCausado).toBeCloseTo(0, 2);
    expect(r.isrAPagar).toBe(0);
    expect(r.ingresoNeto).toBe(0);
  });

  it("trata los ingresos negativos igual que $0 (se acotan a 0)", () => {
    expect(calcularISRMensual(-500)).toEqual(calcularISRMensual(0));
  });

  it("calcula correctamente un ingreso medio (renglón 3 de la tarifa)", () => {
    const r = calcularISRMensual(10000);
    expect(r.renglonAplicado).toBe(3);
    expect(r.isrCausado).toBeCloseTo(729.02, 2);
    // 2026 subsidy = 3,566.22 × 15.02% = 535.65 (income is under the $11,492.66 cap)
    expect(r.subsidioAplicado).toBeCloseTo(535.65, 2);
    expect(r.isrAPagar).toBeCloseTo(193.37, 2);
    expect(r.ingresoNeto).toBeCloseTo(9806.63, 2);
  });

  it("expone los valores crudos del renglón aplicado para el desglose paso a paso", () => {
    const r = calcularISRMensual(10000);
    expect(r.limiteInferiorRenglon).toBeCloseTo(7168.52, 2);
    expect(r.cuotaFijaRenglon).toBeCloseTo(420.95, 2);
    expect(r.porcentajeExcedenteRenglon).toBeCloseTo(0.1088, 4);
    expect(r.excedente).toBeCloseTo(2831.48, 2);
    // cuotaFijaRenglon + excedente * porcentajeExcedenteRenglon debe reconstruir isrCausado
    const reconstruido = r.cuotaFijaRenglon + r.excedente * r.porcentajeExcedenteRenglon;
    expect(reconstruido).toBeCloseTo(r.isrCausado, 2);
  });

  it("caps the subsidy at the ISR owed (it is never paid out)", () => {
    const r = calcularISRMensual(7000);
    expect(r.isrCausado).toBeCloseTo(410.17, 2);
    expect(r.subsidioAplicado).toBeCloseTo(410.17, 2);
    expect(r.isrAPagar).toBe(0);
  });

  it("grants no subsidy above the monthly income cap", () => {
    expect(calcularISRMensual(11492.66).subsidioAplicado).toBeCloseTo(535.65, 2);
    expect(calcularISRMensual(11492.67).subsidioAplicado).toBe(0);
  });

  it("aplica el subsidio para el empleo en ingresos bajos", () => {
    const r = calcularISRMensual(2000);
    expect(r.subsidioAplicado).toBeGreaterThan(0);
    expect(r.isrAPagar).toBeLessThan(r.isrCausado);
  });

  it("calcula correctamente el último renglón de la tarifa (35%)", () => {
    const r = calcularISRMensual(1000000);
    expect(r.renglonAplicado).toBe(11);
    expect(r.isrCausado).toBeCloseTo(334513.84, 2);
    expect(r.subsidioAplicado).toBe(0);
  });
});

describe("calcularISRPeriodo (Anexo 8 RMF 2026 tariffs by pay period)", () => {
  it("uses the 15-day tariff for a biweekly payment", () => {
    // $7,500 falls in 7,225.96–8,651.40: 660.75 + (7,500 − 7,225.96) × 17.92% = 709.86
    // Monthly equivalent 7,500 ÷ 15 × 30.4 = 15,200 > 11,492.66 → no subsidy
    const r = calcularISRPeriodo(7500, "quincenal");
    expect(r.renglonAplicado).toBe(5);
    expect(r.isrCausado).toBeCloseTo(709.86, 2);
    expect(r.subsidioAplicado).toBe(0);
    expect(r.isrAPagar).toBeCloseTo(709.86, 2);
  });

  it("uses the 7-day tariff and prorates the subsidy for a weekly payment", () => {
    // $2,450 falls in 1,650.68–2,900.87: 96.95 + (2,450 − 1,650.68) × 10.88% = 183.92
    // Monthly equivalent 2,450 ÷ 7 × 30.4 = 10,640 ≤ 11,492.66 → subsidy 535.65 ÷ 30.4 × 7 = 123.34
    const r = calcularISRPeriodo(2450, "semanal");
    expect(r.renglonAplicado).toBe(3);
    expect(r.isrCausado).toBeCloseTo(183.92, 2);
    expect(r.subsidioAplicado).toBeCloseTo(123.34, 2);
    expect(r.isrAPagar).toBeCloseTo(60.58, 2);
  });

  it("prorates the subsidy to 264.30 for 15 days", () => {
    // $5,000 biweekly → 10,133.33 monthly equivalent; 535.65 ÷ 30.4 × 15 = 264.30
    // ISR: 207.75 + (5,000 − 3,537.16) × 10.88% = 366.91
    const r = calcularISRPeriodo(5000, "quincenal");
    expect(r.isrCausado).toBeCloseTo(366.91, 2);
    expect(r.subsidioAplicado).toBeCloseTo(264.3, 2);
    expect(r.isrAPagar).toBeCloseTo(102.61, 2);
  });

  it("matches calcularISRMensual for the monthly period", () => {
    expect(calcularISRPeriodo(10000, "mensual")).toEqual(calcularISRMensual(10000));
  });
});

describe("tariff bracket boundaries", () => {
  it("uses the official row 5/6 boundary of the monthly tariff (17,533.64 | 17,533.65)", () => {
    expect(calcularISRMensual(17533.64).renglonAplicado).toBe(5);
    expect(calcularISRMensual(17533.65).renglonAplicado).toBe(6);
  });

  it("keeps amounts with fractions of a cent between two rows in the lower row", () => {
    // Regression: 844.595 matched no row and fell through to the last one (35%).
    const r = calcularISRMensual(844.595);
    expect(r.renglonAplicado).toBe(1);
    expect(r.isrCausado).toBeCloseTo(16.22, 2);
  });
});
