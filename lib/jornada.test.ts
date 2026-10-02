import { describe, expect, it } from "vitest";
import { calcularHorasExtra } from "@/lib/jornada";
import { HORAS_EXTRA_MAX_SEMANAL, JORNADA_ORDINARIA_MAX_SEMANAL, anioReforma } from "@/data/jornada-reforma-2026";

const base = { salarioDiario: 500, tipoJornada: "diurna" as const, anio: 2027 };

describe("calendario de la reforma (DOF 1-may-2026)", () => {
  it("reduce la jornada ordinaria de 48 a 40 horas entre 2026 y 2030", () => {
    expect([2026, 2027, 2028, 2029, 2030].map((a) => JORNADA_ORDINARIA_MAX_SEMANAL[a])).toEqual([48, 46, 44, 42, 40]);
  });

  it("sube el límite de horas extra al doble de 9 a 12 entre 2026 y 2030", () => {
    expect([2026, 2027, 2028, 2029, 2030].map((a) => HORAS_EXTRA_MAX_SEMANAL[a])).toEqual([9, 9, 10, 11, 12]);
  });

  it("acota años fuera de rango a 2026–2030", () => {
    expect(anioReforma(2025)).toBe(2026);
    expect(anioReforma(2035)).toBe(2030);
  });
});

describe("calcularHorasExtra", () => {
  it("paga al doble las horas dentro del límite (ejemplo: $500 diarios, 8 h → $62.50/h)", () => {
    const r = calcularHorasExtra({ ...base, horasExtraSemana: 6 });
    expect(r.valorHora).toBe(62.5);
    expect(r.horasDobles).toBe(6);
    expect(r.horasTriples).toBe(0);
    expect(r.pagoTotal).toBe(750); // 6 × 62.50 × 2
    expect(r.alertas).toEqual([]);
  });

  it("paga al triple lo que excede el límite del año (2027: 9 dobles + 3 triples)", () => {
    const r = calcularHorasExtra({ ...base, horasExtraSemana: 12 });
    expect(r.pagoDobles).toBe(1125); // 9 × 62.50 × 2
    expect(r.pagoTriples).toBe(562.5); // 3 × 62.50 × 3
    expect(r.pagoTotal).toBe(1687.5);
    expect(r.alertas).toEqual([]);
  });

  it("en 2030 las mismas 12 horas son todas al doble", () => {
    const r = calcularHorasExtra({ ...base, anio: 2030, horasExtraSemana: 12 });
    expect(r.horasTriples).toBe(0);
    expect(r.pagoTotal).toBe(1500);
  });

  it("usa la jornada diaria por tipo para el valor hora (nocturna = 7 h)", () => {
    const r = calcularHorasExtra({ ...base, tipoJornada: "nocturna", horasExtraSemana: 1 });
    expect(r.valorHora).toBeCloseTo(71.43, 2);
  });

  it("alerta cuando se rebasa el máximo semanal total (límite + 4)", () => {
    const r = calcularHorasExtra({ ...base, horasExtraSemana: 14 });
    expect(r.horasTriples).toBe(5);
    expect(r.alertas).toHaveLength(1);
  });

  it("alerta por más de 4 días o más de 4 horas en un día", () => {
    const r = calcularHorasExtra({ ...base, horasExtraSemana: 8, diasConHorasExtra: 5, maxHorasExtraEnUnDia: 5 });
    expect(r.alertas).toHaveLength(3); // 5 días, 5 h/día, y 8 + 5 > 12 h diarias
  });

  it("trata horas negativas como cero", () => {
    expect(calcularHorasExtra({ ...base, horasExtraSemana: -3 }).pagoTotal).toBe(0);
  });
});
