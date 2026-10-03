"use client";

import { useMemo, useState } from "react";
import { calcularFiniquito } from "@/lib/finiquito";
import { diasVacacionesPorAntiguedad } from "@/data/constantes-2026";
import { formatoMXN, parseMontoNoNegativo } from "@/lib/format";
import CampoNumerico from "@/components/CampoNumerico";

export default function FiniquitoForm() {
  const [salario, setSalario] = useState("500");
  const [diasPendientes, setDiasPendientes] = useState("10");
  const [anios, setAnios] = useState("2");
  const [vacacionesTomadas, setVacacionesTomadas] = useState("0");
  const [diasLaborados, setDiasLaborados] = useState("180");
  const [diasAniversario, setDiasAniversario] = useState("120");

  const calculo = useMemo(() => {
    const s = parseMontoNoNegativo(salario);
    const dp = parseMontoNoNegativo(diasPendientes);
    const a = parseMontoNoNegativo(anios);
    const vt = parseMontoNoNegativo(vacacionesTomadas);
    const dl = parseMontoNoNegativo(diasLaborados);
    const da = parseMontoNoNegativo(diasAniversario);
    if (s === null || dp === null || a === null || vt === null || dl === null || da === null) return null;
    return {
      salario: s,
      diasPendientes: dp,
      diasAniversario: Math.min(da, 365),
      resultado: calcularFiniquito({
        salarioDiario: s,
        diasSalarioPendientes: dp,
        aniosAntiguedadCumplidos: a,
        diasVacacionesYaTomadosEsteCiclo: vt,
        diasLaboradosEnElAnioActual: dl,
        diasDesdeUltimoAniversario: da,
      }),
    };
  }, [salario, diasPendientes, anios, vacacionesTomadas, diasLaborados, diasAniversario]);

  const { diasQueTocan, diasAnioEnCurso } = useMemo(() => {
    const a = parseMontoNoNegativo(anios);
    const cumplidos = a === null ? 0 : Math.floor(a);
    return {
      diasQueTocan: diasVacacionesPorAntiguedad(cumplidos),
      diasAnioEnCurso: diasVacacionesPorAntiguedad(cumplidos + 1),
    };
  }, [anios]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <CampoNumerico
          id="salario"
          label="Salario diario (MXN)"
          value={salario}
          onChange={setSalario}
        />
        <CampoNumerico
          id="diasPendientes"
          label="Días de salario pendientes de pago"
          value={diasPendientes}
          onChange={setDiasPendientes}
          inputMode="numeric"
        />
        <CampoNumerico
          id="anios"
          label="Años de antigüedad cumplidos"
          value={anios}
          onChange={setAnios}
          inputMode="numeric"
          hint={`Te tocan ${diasQueTocan} días de vacaciones/año (Art. 76 LFT)`}
        />
        <CampoNumerico
          id="vacacionesTomadas"
          label="Días de vacaciones ya tomados este ciclo"
          value={vacacionesTomadas}
          onChange={setVacacionesTomadas}
          inputMode="numeric"
          hint="De los que te tocaron al cumplir tu último aniversario"
        />
        <CampoNumerico
          id="diasAniversario"
          label="Días trabajados desde tu último aniversario laboral"
          value={diasAniversario}
          onChange={setDiasAniversario}
          inputMode="numeric"
          hint={`Para las vacaciones proporcionales del año en curso (${diasAnioEnCurso} días/año, Art. 79 LFT). Si no has cumplido un año, cuenta desde tu fecha de ingreso.`}
        />
        <CampoNumerico
          id="diasLaborados"
          label="Días laborados en el año calendario actual"
          value={diasLaborados}
          onChange={setDiasLaborados}
          inputMode="numeric"
          hint="Para calcular el aguinaldo proporcional del año en curso"
        />
      </div>

      {calculo && (
        <div className="rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Salarios pendientes</span>
            <span className="font-medium">{formatoMXN(calculo.resultado.salariosPendientes)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Vacaciones no disfrutadas ({calculo.resultado.diasVacacionesPendientes} días)</span>
            <span className="font-medium">{formatoMXN(calculo.resultado.pagoVacacionesPendientes)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Vacaciones proporcionales del año en curso ({calculo.resultado.diasVacacionesProporcionales} días)</span>
            <span className="font-medium">{formatoMXN(calculo.resultado.pagoVacacionesProporcionales)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Prima vacacional (25%)</span>
            <span className="font-medium">{formatoMXN(calculo.resultado.primaVacacional)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Aguinaldo proporcional ({calculo.resultado.diasAguinaldoProporcional} días)</span>
            <span className="font-medium">{formatoMXN(calculo.resultado.aguinaldoProporcional)}</span>
          </div>
          <div className="flex justify-between text-base border-t border-slate-200 pt-3">
            <span className="font-semibold">Total finiquito estimado</span>
            <span className="font-bold text-emerald-700">{formatoMXN(calculo.resultado.totalFiniquito)}</span>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Este cálculo es para separación voluntaria o sin responsabilidad para el patrón.
            No incluye indemnización por despido injustificado (3 meses + 20 días por año),
            que aplica solo en casos de liquidación.
          </p>

          <details className="pt-2 border-t border-slate-100">
            <summary className="cursor-pointer text-sm font-medium text-emerald-700">
              Ver cómo se calculó
            </summary>
            <ol className="mt-3 space-y-2 text-sm text-slate-600 list-decimal pl-5">
              <li>
                Salarios pendientes = {formatoMXN(calculo.salario)} × {calculo.diasPendientes}{" "}
                días = {formatoMXN(calculo.resultado.salariosPendientes)}
              </li>
              <li>
                Vacaciones no disfrutadas = {formatoMXN(calculo.salario)} ×{" "}
                {calculo.resultado.diasVacacionesPendientes} días ={" "}
                {formatoMXN(calculo.resultado.pagoVacacionesPendientes)}
              </li>
              <li>
                Vacaciones proporcionales = {formatoMXN(calculo.salario)} × ({diasAnioEnCurso} días ×{" "}
                {calculo.diasAniversario} días ÷ 365) ={" "}
                {formatoMXN(calculo.resultado.pagoVacacionesProporcionales)}
              </li>
              <li>
                Prima vacacional = ({formatoMXN(calculo.resultado.pagoVacacionesPendientes)} +{" "}
                {formatoMXN(calculo.resultado.pagoVacacionesProporcionales)}) × 25% ={" "}
                {formatoMXN(calculo.resultado.primaVacacional)}
              </li>
              <li>
                Aguinaldo proporcional = {formatoMXN(calculo.salario)} ×{" "}
                {calculo.resultado.diasAguinaldoProporcional} días ={" "}
                {formatoMXN(calculo.resultado.aguinaldoProporcional)}
              </li>
              <li>
                Total = {formatoMXN(calculo.resultado.salariosPendientes)} +{" "}
                {formatoMXN(calculo.resultado.pagoVacacionesPendientes)} +{" "}
                {formatoMXN(calculo.resultado.pagoVacacionesProporcionales)} +{" "}
                {formatoMXN(calculo.resultado.primaVacacional)} +{" "}
                {formatoMXN(calculo.resultado.aguinaldoProporcional)} ={" "}
                {formatoMXN(calculo.resultado.totalFiniquito)}
              </li>
            </ol>
          </details>
        </div>
      )}
    </div>
  );
}
