import { describe, expect, it } from "vitest";
import {
  calcularCuotaObreraDiaria,
  calcularCuotaPatronalDiaria,
  determinarTasaCeavPatronal,
} from "@/lib/imss";
import { UMA_2026, SALARIO_MINIMO_2026 } from "@/data/constantes-2026";

describe("determinarTasaCeavPatronal", () => {
  it("da la tasa protegida de salario mínimo para un SBC igual o menor al salario mínimo", () => {
    expect(determinarTasaCeavPatronal(SALARIO_MINIMO_2026.zonaGeneral)).toBeCloseTo(0.0315, 4);
    // Un SBC por debajo del salario mínimo sería ilegal en la práctica, pero la función no debe
    // explotar ni caer en un renglón "en UMA" que en teoría le tocaría por ser tan bajo.
    expect(determinarTasaCeavPatronal(250)).toBeCloseTo(0.0315, 4);
  });

  it("los renglones bajos de la tabla (1.5, 2.0, 2.5 veces UMA) son inalcanzables en 2026 porque el salario mínimo ya los rebasa", () => {
    // 1.5, 2.0 y 2.5 veces UMA equivalen a menos que el salario mínimo (~2.69 UMA), así que
    // cualquier SBC ahí cae en la rama de "salario mínimo", no en esos renglones.
    const sbcEnRenglonTeoricoBajo = 2.0 * UMA_2026.diario;
    expect(sbcEnRenglonTeoricoBajo).toBeLessThan(SALARIO_MINIMO_2026.zonaGeneral);
    expect(determinarTasaCeavPatronal(sbcEnRenglonTeoricoBajo)).toBeCloseTo(0.0315, 4);
  });

  it("recorre correctamente los renglones alcanzables (3.01 en adelante)", () => {
    expect(determinarTasaCeavPatronal(3.2 * UMA_2026.diario)).toBeCloseTo(0.06361, 5); // 3.01-3.50
    expect(determinarTasaCeavPatronal(3.75 * UMA_2026.diario)).toBeCloseTo(0.06613, 5); // 3.51-4.00
    expect(determinarTasaCeavPatronal(4.5 * UMA_2026.diario)).toBeCloseTo(0.07513, 5); // 4.01+
  });
});

describe("calcularCuotaObreraDiaria", () => {
  it("aplica los porcentajes fijos sobre el SBC", () => {
    const r = calcularCuotaObreraDiaria(500);
    expect(r.prestacionesEnDinero).toBeCloseTo(1.25, 2);
    expect(r.gastosMedicosPensionados).toBeCloseTo(1.88, 2);
    expect(r.invalidezYVida).toBeCloseTo(3.13, 2);
    expect(r.cesantiaYVejez).toBeCloseTo(5.63, 2);
    expect(r.total).toBeCloseTo(12.47, 1);
  });

  it("aplica el 0.4% adicional solo sobre el excedente de 3 UMA", () => {
    const bajoTresUma = calcularCuotaObreraDiaria(2 * UMA_2026.diario);
    expect(bajoTresUma.excedenteTresUma).toBe(0);

    const sobreTresUma = calcularCuotaObreraDiaria(4 * UMA_2026.diario);
    const excedenteEsperado = (4 - 3) * UMA_2026.diario * 0.004;
    expect(sobreTresUma.excedenteTresUma).toBeCloseTo(excedenteEsperado, 2);
  });

  it("topa el SBC a 25 UMA antes de calcular", () => {
    const tope = 25 * UMA_2026.diario;
    const enElTope = calcularCuotaObreraDiaria(tope);
    const arribaDelTope = calcularCuotaObreraDiaria(tope + 10000);
    expect(arribaDelTope.sbcDiario).toBeCloseTo(tope, 2);
    expect(arribaDelTope).toEqual(enElTope);
  });
});

describe("calcularCuotaPatronalDiaria", () => {
  it("la cuota fija de Enfermedades y Maternidad no depende del SBC (es sobre 1 UMA)", () => {
    const salarioBajo = calcularCuotaPatronalDiaria(400, 0.0054355);
    const salarioAlto = calcularCuotaPatronalDiaria(2000, 0.0054355);
    expect(salarioBajo.cuotaFijaEM).toBeCloseTo(salarioAlto.cuotaFijaEM, 2);
    expect(salarioBajo.cuotaFijaEM).toBeCloseTo(UMA_2026.diario * 0.204, 2);
  });

  it("usa la prima de riesgo recibida para calcular riesgo de trabajo", () => {
    const r = calcularCuotaPatronalDiaria(500, 0.01);
    expect(r.riesgoTrabajo).toBeCloseTo(5, 2);
  });

  it("topa el SBC a 25 UMA antes de calcular", () => {
    const tope = 25 * UMA_2026.diario;
    const enElTope = calcularCuotaPatronalDiaria(tope, 0.005);
    const arribaDelTope = calcularCuotaPatronalDiaria(tope + 10000, 0.005);
    expect(arribaDelTope).toEqual(enElTope);
  });
});
