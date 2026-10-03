import { describe, expect, it } from "vitest";
import { calcularAguinaldo } from "@/lib/aguinaldo";

describe("calcularAguinaldo", () => {
  it("paga el aguinaldo completo cuando se trabajó el año entero", () => {
    const r = calcularAguinaldo(500, 365, 15);
    expect(r.diasProporcionales).toBe(15);
    expect(r.aguinaldoBruto).toBe(7500);
  });

  it("prorratea correctamente para medio año trabajado", () => {
    const r = calcularAguinaldo(500, 180, 15);
    expect(r.diasProporcionales).toBeCloseTo(7.4, 2);
    expect(r.aguinaldoBruto).toBeCloseTo(3698.63, 2);
  });

  it("usa 15 días como mínimo legal por defecto (Art. 87 LFT)", () => {
    const r = calcularAguinaldo(500, 365);
    expect(r.diasProporcionales).toBe(15);
  });

  it("acota a 0 los días laborados negativos", () => {
    const r = calcularAguinaldo(500, -10, 15);
    expect(r.diasProporcionales).toBe(0);
    expect(r.aguinaldoBruto).toBe(0);
  });

  it("never exceeds the annual aguinaldo: 2026 has 365 days, so 366+ days caps at 15", () => {
    // Regression: days were capped at 366 but divided by 365, so 366 days gave 15.04 days.
    expect(calcularAguinaldo(500, 366, 15)).toEqual({ diasProporcionales: 15, aguinaldoBruto: 7500 });
    expect(calcularAguinaldo(500, 4000, 15)).toEqual({ diasProporcionales: 15, aguinaldoBruto: 7500 });
  });

  it("divides by 366 in a leap year", () => {
    // 15 × 183 ÷ 366 = 7.5 days; 500 × 7.5 = 3,750
    const r = calcularAguinaldo(500, 183, 15, 366);
    expect(r.diasProporcionales).toBe(7.5);
    expect(r.aguinaldoBruto).toBe(3750);
    expect(calcularAguinaldo(500, 366, 15, 366).diasProporcionales).toBe(15);
  });
});
