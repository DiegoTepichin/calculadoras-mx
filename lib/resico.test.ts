import { describe, expect, it } from "vitest";
import { calcularISRResico } from "@/lib/resico";

describe("calcularISRResico", () => {
  it("aplica 1% al ingreso total en el primer renglón", () => {
    const r = calcularISRResico(20000);
    expect(r.renglonAplicado).toBe(1);
    expect(r.tasaAplicada).toBeCloseTo(0.01, 4);
    expect(r.isrAPagar).toBeCloseTo(200, 2);
    expect(r.ingresoNeto).toBeCloseTo(19800, 2);
  });

  it("aplica la tasa del renglón al ingreso TOTAL, no solo al excedente (a diferencia del ISR general)", () => {
    const r = calcularISRResico(30000);
    expect(r.renglonAplicado).toBe(2);
    expect(r.tasaAplicada).toBeCloseTo(0.011, 4);
    expect(r.isrAPagar).toBeCloseTo(330, 2); // 30,000 × 1.1%, no (30,000 − 25,000) × 1.1%
  });

  it("calcula correctamente el renglón más alto de la tabla", () => {
    const r = calcularISRResico(100000);
    expect(r.renglonAplicado).toBe(4);
    expect(r.tasaAplicada).toBeCloseTo(0.02, 4);
    expect(r.isrAPagar).toBeCloseTo(2000, 2);
  });

  it("no explota en $0 y usa el primer renglón (mismo bug de fallback que ISR general)", () => {
    const r = calcularISRResico(0);
    expect(r.renglonAplicado).toBe(1);
    expect(r.isrAPagar).toBe(0);
  });

  it("marca cuando el ingreso mensual, anualizado, rebasa el límite del régimen", () => {
    const dentro = calcularISRResico(200000);
    const fuera = calcularISRResico(300000);
    expect(dentro.excedeLimiteRegimen).toBe(false);
    expect(fuera.excedeLimiteRegimen).toBe(true);
  });
});
