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

  const resultado = useMemo(() => {
    const s = parseMontoNoNegativo(salario);
    const dp = parseMontoNoNegativo(diasPendientes);
    const a = parseMontoNoNegativo(anios);
    const vt = parseMontoNoNegativo(vacacionesTomadas);
    const dl = parseMontoNoNegativo(diasLaborados);
    if (s === null || dp === null || a === null || vt === null || dl === null) return null;
    return calcularFiniquito({
      salarioDiario: s,
      diasSalarioPendientes: dp,
      aniosAntiguedadCumplidos: a,
      diasVacacionesYaTomadosEsteCiclo: vt,
      diasLaboradosEnElAnioActual: dl,
    });
  }, [salario, diasPendientes, anios, vacacionesTomadas, diasLaborados]);

  const diasQueTocan = useMemo(() => {
    const a = parseMontoNoNegativo(anios);
    return a === null ? 0 : diasVacacionesPorAntiguedad(a);
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
        />
        <CampoNumerico
          id="diasLaborados"
          label="Días laborados en el año calendario actual"
          value={diasLaborados}
          onChange={setDiasLaborados}
          inputMode="numeric"
          hint="Para calcular el aguinaldo proporcional del año en curso"
          className="sm:col-span-2"
        />
      </div>

      {resultado && (
        <div className="rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Salarios pendientes</span>
            <span className="font-medium">{formatoMXN(resultado.salariosPendientes)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Vacaciones no disfrutadas ({resultado.diasVacacionesPendientes} días)</span>
            <span className="font-medium">{formatoMXN(resultado.pagoVacacionesPendientes)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Prima vacacional (25%)</span>
            <span className="font-medium">{formatoMXN(resultado.primaVacacional)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Aguinaldo proporcional ({resultado.diasAguinaldoProporcional} días)</span>
            <span className="font-medium">{formatoMXN(resultado.aguinaldoProporcional)}</span>
          </div>
          <div className="flex justify-between text-base border-t border-slate-200 pt-3">
            <span className="font-semibold">Total finiquito estimado</span>
            <span className="font-bold text-emerald-700">{formatoMXN(resultado.totalFiniquito)}</span>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Este cálculo es para separación voluntaria o sin responsabilidad para el patrón.
            No incluye indemnización por despido injustificado (3 meses + 20 días por año),
            que aplica solo en casos de liquidación.
          </p>
        </div>
      )}
    </div>
  );
}
