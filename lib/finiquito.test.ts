import { describe, expect, it } from "vitest";
import { calcularFiniquito } from "@/lib/finiquito";

describe("calcularFiniquito", () => {
  const base = {
    salarioDiario: 500,
    diasSalarioPendientes: 10,
    aniosAntiguedadCumplidos: 2,
    diasVacacionesYaTomadosEsteCiclo: 0,
    diasLaboradosEnElAnioActual: 180,
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
});
