import { describe, expect, it } from "vitest";
import { diasVacacionesPorAntiguedad } from "@/data/constantes-2026";

describe("diasVacacionesPorAntiguedad", () => {
  it("da 0 días antes de cumplir 1 año", () => {
    expect(diasVacacionesPorAntiguedad(0)).toBe(0);
  });

  it("sigue la tabla del Art. 76 LFT dentro de los 35 años", () => {
    expect(diasVacacionesPorAntiguedad(1)).toBe(12);
    expect(diasVacacionesPorAntiguedad(2)).toBe(14);
    expect(diasVacacionesPorAntiguedad(5)).toBe(20);
    expect(diasVacacionesPorAntiguedad(35)).toBe(32);
  });

  it("agrega 2 días por cada bloque de 5 años después de los 35", () => {
    expect(diasVacacionesPorAntiguedad(36)).toBe(34);
    expect(diasVacacionesPorAntiguedad(40)).toBe(34);
    expect(diasVacacionesPorAntiguedad(41)).toBe(36);
  });
});
