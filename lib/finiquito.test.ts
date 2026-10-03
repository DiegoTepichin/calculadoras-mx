import { describe, expect, it } from "vitest";
import { calcularFiniquito } from "@/lib/finiquito";

describe("calcularFiniquito", () => {
  const base = {
    salarioDiario: 500,
    diasSalarioPendientes: 10,
    aniosAntiguedadCumplidos: 2,
    diasVacacionesYaTomadosEsteCiclo: 0,
    diasLaboradosEnElAnioActual: 180,
    diasDesdeUltimoAniversario: 0,
  };

  it("suma salarios pendientes, vacaciones, prima vacacional y aguinaldo proporcional", () => {
    const r = calcularFiniquito(base);
    expect(r.salariosPendientes).toBe(5000);
    expect(r.diasVacacionesPendientes).toBe(14); // 2 años cumplidos -> 14 días (Art. 76 LFT)
    expect(r.pagoVacacionesPendientes).toBe(7000);
    expect(r.primaVacacional).toBe(1750); // 25% de las vacaciones pendientes
    expect(r.diasAguinaldoProporcional).toBeCloseTo(7.4, 2);
    expect(r.aguinaldoProporcional).toBeCloseTo(3698.63, 2);
    expect(r.totalFiniquito).toBeCloseTo(17448.63, 2);
  });

  it("descuenta los días de vacaciones ya tomados en el ciclo", () => {
    const r = calcularFiniquito({ ...base, diasVacacionesYaTomadosEsteCiclo: 5 });
    expect(r.diasVacacionesPendientes).toBe(9);
    expect(r.pagoVacacionesPendientes).toBe(4500);
    expect(r.primaVacacional).toBe(1125);
  });

  it("no deja vacaciones pendientes negativas si ya tomó más de las que le tocaban", () => {
    const r = calcularFiniquito({ ...base, diasVacacionesYaTomadosEsteCiclo: 999 });
    expect(r.diasVacacionesPendientes).toBe(0);
    expect(r.pagoVacacionesPendientes).toBe(0);
    expect(r.primaVacacional).toBe(0);
  });

  it("adds proportional vacations of the service year in progress, with their 25% premium (Art. 79-80 LFT)", () => {
    // 2 full years + 120 days: the 3rd year earns 16 days -> 16 × 120 ÷ 365 = 5.2603 days
    const r = calcularFiniquito({ ...base, diasDesdeUltimoAniversario: 120 });
    expect(r.diasVacacionesProporcionales).toBeCloseTo(5.26, 2);
    expect(r.pagoVacacionesProporcionales).toBeCloseTo(2630.14, 2); // 500 × 5.260274
    expect(r.primaVacacional).toBeCloseTo(2407.53, 2); // (7,000 + 2,630.14) × 25%
    // 5,000 + 7,000 + 2,630.14 + 2,407.53 + 3,698.63
    expect(r.totalFiniquito).toBeCloseTo(20736.3, 2);
  });

  it("pays proportional vacations in the first year of service (Art. 79 LFT)", () => {
    // 0 full years, 240 days: 12 × 240 ÷ 365 = 7.8904 days -> $3,945.21 (matches tucalculolaboral.com)
    const r = calcularFiniquito({
      ...base,
      diasSalarioPendientes: 0,
      aniosAntiguedadCumplidos: 0,
      diasLaboradosEnElAnioActual: 0,
      diasDesdeUltimoAniversario: 240,
    });
    expect(r.diasVacacionesPendientes).toBe(0);
    expect(r.diasVacacionesProporcionales).toBeCloseTo(7.89, 2);
    expect(r.pagoVacacionesProporcionales).toBeCloseTo(3945.21, 2);
    expect(r.primaVacacional).toBeCloseTo(986.3, 2);
    expect(r.totalFiniquito).toBeCloseTo(4931.51, 2);
  });

  it("caps the days since the last anniversary at one service year", () => {
    const tope = calcularFiniquito({ ...base, diasDesdeUltimoAniversario: 365 });
    const excedido = calcularFiniquito({ ...base, diasDesdeUltimoAniversario: 9999 });
    expect(excedido).toEqual(tope);
    expect(tope.diasVacacionesProporcionales).toBe(16);
  });
});
