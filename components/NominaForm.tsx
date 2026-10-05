"use client";

import { useMemo, useState } from "react";
import { calcularISRPeriodo, type PeriodoPago } from "@/lib/isr";
import { calcularCuotaObreraDiaria, calcularSbcMinimoDeLey, factorIntegracionMinimo } from "@/lib/imss";
import { formatoMXN, parseMontoNoNegativo } from "@/lib/format";
import CampoNumerico from "@/components/CampoNumerico";
import CampoSelect from "@/components/CampoSelect";

const PERIODOS: Record<PeriodoPago, { dias: number; label: string }> = {
  semanal: { dias: 7, label: "Semanal (7 días)" },
  quincenal: { dias: 15, label: "Quincenal (15 días)" },
  mensual: { dias: 30, label: "Mensual (30 días)" },
};

export default function NominaForm() {
  const [salarioDiario, setSalarioDiario] = useState("500");
  const [periodo, setPeriodo] = useState<PeriodoPago>("quincenal");
  const [anios, setAnios] = useState("0");
  const [infonavit, setInfonavit] = useState("0");

  const calculo = useMemo(() => {
    const sd = parseMontoNoNegativo(salarioDiario);
    const a = parseMontoNoNegativo(anios);
    const inf = parseMontoNoNegativo(infonavit);
    if (sd === null || a === null || inf === null) return null;

    const diasPeriodo = PERIODOS[periodo].dias;
    const ingresoPeriodo = sd * diasPeriodo;
    const isr = calcularISRPeriodo(ingresoPeriodo, periodo);
    const sbc = calcularSbcMinimoDeLey(sd, a);
    const imssObreraDiaria = calcularCuotaObreraDiaria(sbc);
    const imssObreraPeriodo = imssObreraDiaria.total * diasPeriodo;
    const netoFinal = ingresoPeriodo - isr.isrAPagar - imssObreraPeriodo - inf;

    return {
      diasPeriodo,
      infonavit: inf,
      ingresoPeriodo,
      isr,
      factorIntegracion: factorIntegracionMinimo(a),
      imssObreraDiaria,
      imssObreraPeriodo,
      netoFinal,
    };
  }, [salarioDiario, periodo, anios, infonavit]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <CampoNumerico
          id="salarioDiario"
          label="Salario diario (MXN)"
          value={salarioDiario}
          onChange={setSalarioDiario}
        />
        <CampoSelect
          id="periodo"
          label="Periodo de pago"
          value={periodo}
          onChange={(v) => setPeriodo(v as PeriodoPago)}
          opciones={(Object.keys(PERIODOS) as PeriodoPago[]).map((p) => ({ value: p, label: PERIODOS[p].label }))}
          hint="Cada periodo usa su propia tarifa de ISR (Anexo 8 de la RMF 2026)"
        />
        <CampoNumerico
          id="anios"
          label="Años de antigüedad cumplidos"
          value={anios}
          onChange={setAnios}
          inputMode="numeric"
          hint="Define tu salario base de cotización (SBC) con prestaciones mínimas de ley"
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
            <span className="font-medium">{formatoMXN(calculo.ingresoPeriodo)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              ISR a retener
              {calculo.isr.subsidioAplicado > 0 &&
                ` (ya con ${formatoMXN(calculo.isr.subsidioAplicado)} de subsidio para el empleo)`}
            </span>
            <span className="font-medium text-red-700">− {formatoMXN(calculo.isr.isrAPagar)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              IMSS obrero ({formatoMXN(calculo.imssObreraDiaria.total)}/día × {calculo.diasPeriodo} días)
            </span>
            <span className="font-medium text-red-700">
              − {formatoMXN(calculo.imssObreraPeriodo)}
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
            El IMSS obrero se calcula sobre un SBC de {formatoMXN(calculo.imssObreraDiaria.sbcDiario)}{" "}
            diarios (salario diario × factor de integración {calculo.factorIntegracion.toFixed(4)},
            Art. 27 LSS). Incluye prestaciones en dinero, gastos médicos de pensionados, invalidez
            y vida, cesantía y vejez, y el excedente sobre 3 UMA. No incluye otros descuentos de
            nómina (ahorro, préstamos de la empresa, etc.).
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
