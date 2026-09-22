import { describe, expect, it } from "vitest";
import { calcularRetencionFuente } from "@/lib/co/retencion";

describe("calcularRetencionFuente", () => {
  it("no retiene nada por debajo de 95 UVT", () => {
    const r = calcularRetencionFuente(3000000); // 3,000,000 / 52,374 ≈ 57.3 UVT
    expect(r.retencionAPagar).toBe(0);
    expect(r.ingresoNeto).toBe(r.ingresoMensual);
  });

  it("no explota ni retiene nada en $0", () => {
    const r = calcularRetencionFuente(0);
    expect(r.retencionAPagar).toBe(0);
    expect(r.ingresoNeto).toBe(0);
  });

  it("trata los ingresos negativos igual que $0", () => {
    expect(calcularRetencionFuente(-500)).toEqual(calcularRetencionFuente(0));
  });

  it("calcula correctamente un ingreso que cruza dos renglones (ejemplo: $8,000,000 COP/mes)", () => {
    // 8,000,000 / 52,374 ≈ 152.75 UVT → cae en el renglón 3 (150-360 UVT, 28%), pero antes de
    // llegar ahí ya causó retención en el renglón 2 (95-150 UVT, 19%). Método marginal verdadero:
    // (150-95)×19% + (152.75-150)×28% ≈ 10.45 + 0.77 ≈ 11.22 UVT
    const r = calcularRetencionFuente(8000000);
    expect(r.renglonAplicado).toBe(3);
    expect(r.tasaMarginal).toBeCloseTo(0.28, 4);
    expect(r.retencionEnUvt).toBeCloseTo(11.22, 1);
    expect(r.retencionAPagar).toBeCloseTo(587601, -2);
    expect(r.tasaEfectiva).toBeCloseTo(0.0735, 3);
  });

  it("aplica la tarifa máxima (39%) para ingresos muy altos", () => {
    const r = calcularRetencionFuente(500000000); // muy por arriba de 2300 UVT
    expect(r.renglonAplicado).toBe(7);
    expect(r.tasaMarginal).toBeCloseTo(0.39, 4);
  });
});
