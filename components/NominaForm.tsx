"use client";

import { useMemo, useState } from "react";
import { calcularISRMensual } from "@/lib/isr";
import { calcularCuotaObreraDiaria } from "@/lib/imss";
import { formatoMXN, parseMontoNoNegativo } from "@/lib/format";
import CampoNumerico from "@/components/CampoNumerico";

export default function NominaForm() {
  const [salarioDiario, setSalarioDiario] = useState("500");
  const [diasPeriodo, setDiasPeriodo] = useState("30");
  const [infonavit, setInfonavit] = useState("0");

  const calculo = useMemo(() => {
    const sd = parseMontoNoNegativo(salarioDiario);
    const dp = parseMontoNoNegativo(diasPeriodo);
    const inf = parseMontoNoNegativo(infonavit);
    if (sd === null || dp === null || inf === null) return null;

    const ingresoMensual = sd * dp;
    const isr = calcularISRMensual(ingresoMensual);
    const imssObreraDiaria = calcularCuotaObreraDiaria(sd);
    const imssObreraMensual = imssObreraDiaria.total * dp;
    const netoFinal = ingresoMensual - isr.isrAPagar - imssObreraMensual - inf;

    return { salarioDiario: sd, diasPeriodo: dp, infonavit: inf, ingresoMensual, isr, imssObreraDiaria, imssObreraMensual, netoFinal };
  }, [salarioDiario, diasPeriodo, infonavit]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <CampoNumerico
          id="salarioDiario"
          label="Salario diario (MXN)"
          value={salarioDiario}
          onChange={setSalarioDiario}
        />
        <CampoNumerico
          id="diasPeriodo"
          label="Días del periodo"
          value={diasPeriodo}
          onChange={setDiasPeriodo}
          inputMode="numeric"
          hint="Normalmente 30 o 30.4 para un mes"
        />
        <CampoNumerico
          id="infonavit"
          label="Descuento Infonavit del periodo (si tienes crédito)"
          value={infonavit}
          onChange={setInfonavit}
          hint="Déjalo en 0 si no tienes un crédito de vivienda activo"
        />
      </div>

      {calculo && (
        <div className="rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Ingreso bruto del periodo</span>
            <span className="font-medium">{formatoMXN(calculo.ingresoMensual)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">ISR a retener</span>
            <span className="font-medium text-red-700">− {formatoMXN(calculo.isr.isrAPagar)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              IMSS obrero ({formatoMXN(calculo.imssObreraDiaria.total)}/día)
            </span>
            <span className="font-medium text-red-700">
              − {formatoMXN(calculo.imssObreraMensual)}
            </span>
          </div>
          {calculo.infonavit > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Descuento Infonavit</span>
              <span className="font-medium text-red-700">− {formatoMXN(calculo.infonavit)}</span>
            </div>
          )}
          <div className="flex justify-between text-base border-t border-slate-200 pt-3">
            <span className="font-semibold">Neto a recibir</span>
            <span className="font-bold text-emerald-700">{formatoMXN(calculo.netoFinal)}</span>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            El IMSS obrero incluye prestaciones en dinero, gastos médicos de pensionados,
            invalidez y vida, cesantía y vejez, y el excedente sobre 3 UMA. No incluye otros
            descuentos de nómina (ahorro, préstamos de la empresa, etc.).
          </p>

          <details className="pt-2 border-t border-slate-100">
            <summary className="cursor-pointer text-sm font-medium text-emerald-700">
              Ver desglose del IMSS obrero
            </summary>
            <ul className="mt-3 space-y-1 text-sm text-slate-600">
              <li className="flex justify-between">
                <span>Prestaciones en dinero (0.25%)</span>
                <span>{formatoMXN(calculo.imssObreraDiaria.prestacionesEnDinero * calculo.diasPeriodo)}</span>
              </li>
              <li className="flex justify-between">
                <span>Gastos médicos de pensionados (0.375%)</span>
                <span>{formatoMXN(calculo.imssObreraDiaria.gastosMedicosPensionados * calculo.diasPeriodo)}</span>
              </li>
              <li className="flex justify-between">
                <span>Invalidez y vida (0.625%)</span>
                <span>{formatoMXN(calculo.imssObreraDiaria.invalidezYVida * calculo.diasPeriodo)}</span>
              </li>
              <li className="flex justify-between">
                <span>Cesantía y vejez (1.125%)</span>
                <span>{formatoMXN(calculo.imssObreraDiaria.cesantiaYVejez * calculo.diasPeriodo)}</span>
              </li>
              <li className="flex justify-between">
                <span>Excedente sobre 3 UMA (0.4%)</span>
                <span>{formatoMXN(calculo.imssObreraDiaria.excedenteTresUma * calculo.diasPeriodo)}</span>
              </li>
            </ul>
          </details>
        </div>
      )}
    </div>
  );
}
