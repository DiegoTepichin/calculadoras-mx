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

  it("acota a 366 los días laborados excesivos", () => {
    const conLimite = calcularAguinaldo(500, 366, 15);
    const excedido = calcularAguinaldo(500, 4000, 15);
    expect(excedido).toEqual(conLimite);
  });
});
