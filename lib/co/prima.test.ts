import { describe, expect, it } from "vitest";
import { calcularPrimaServicios } from "@/lib/co/prima";

describe("calcularPrimaServicios", () => {
  it("paga medio salario si se trabajó el semestre completo (180 días)", () => {
    const r = calcularPrimaServicios(1750905, 180);
    expect(r.diasTrabajados).toBe(180);
    expect(r.primaSemestral).toBeCloseTo(875452.5, 1);
  });

  it("prorratea correctamente para medio semestre trabajado", () => {
    const r = calcularPrimaServicios(1750905, 90);
    expect(r.primaSemestral).toBeCloseTo(437726.25, 1);
  });

  it("acota a 0 los días negativos", () => {
    const r = calcularPrimaServicios(1750905, -10);
    expect(r.diasTrabajados).toBe(0);
    expect(r.primaSemestral).toBe(0);
  });

  it("acota a 180 los días excesivos (un semestre no tiene más de 180 días)", () => {
    const conLimite = calcularPrimaServicios(1750905, 180);
    const excedido = calcularPrimaServicios(1750905, 200);
    expect(excedido).toEqual(conLimite);
  });
});
