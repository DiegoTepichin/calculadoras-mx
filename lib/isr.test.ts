import { describe, expect, it } from "vitest";
import { calcularISRMensual } from "@/lib/isr";

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
    expect(r.subsidioAplicado).toBe(0);
    expect(r.isrAPagar).toBeCloseTo(729.02, 2);
    expect(r.ingresoNeto).toBeCloseTo(9270.98, 2);
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
