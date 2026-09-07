"use client";

import { useMemo, useState } from "react";
import { calcularFiniquito } from "@/lib/finiquito";
import { diasVacacionesPorAntiguedad } from "@/data/constantes-2026";

export default function FiniquitoForm() {
  const [salario, setSalario] = useState("500");
  const [diasPendientes, setDiasPendientes] = useState("10");
  const [anios, setAnios] = useState("2");
  const [vacacionesTomadas, setVacacionesTomadas] = useState("0");
  const [diasLaborados, setDiasLaborados] = useState("180");

  const resultado = useMemo(() => {
    const s = parseFloat(salario);
    const dp = parseFloat(diasPendientes);
    const a = parseFloat(anios);
    const vt = parseFloat(vacacionesTomadas);
    const dl = parseFloat(diasLaborados);
    if ([s, dp, a, vt, dl].some((v) => Number.isNaN(v) || v < 0)) return null;
    return calcularFiniquito({
      salarioDiario: s,
      diasSalarioPendientes: dp,
      aniosAntiguedadCumplidos: a,
      diasVacacionesYaTomadosEsteCiclo: vt,
      diasLaboradosEnElAnioActual: dl,
    });
  }, [salario, diasPendientes, anios, vacacionesTomadas, diasLaborados]);

  const diasQueTocan = useMemo(() => {
    const a = parseFloat(anios);
    return Number.isNaN(a) ? 0 : diasVacacionesPorAntiguedad(a);
  }, [anios]);

  const formatoMXN = (n: number) =>
    n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Salario diario (MXN)</label>
          <input
            type="text" inputMode="decimal" value={salario}
            onChange={(e) => setSalario(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Días de salario pendientes de pago</label>
          <input
            type="text" inputMode="numeric" value={diasPendientes}
            onChange={(e) => setDiasPendientes(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Años de antigüedad cumplidos</label>
          <input
            type="text" inputMode="numeric" value={anios}
            onChange={(e) => setAnios(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <p className="text-xs text-slate-500 mt-1">Te tocan {diasQueTocan} días de vacaciones/año (Art. 76 LFT)</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Días de vacaciones ya tomados este ciclo</label>
          <input
            type="text" inputMode="numeric" value={vacacionesTomadas}
            onChange={(e) => setVacacionesTomadas(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Días laborados en el año calendario actual</label>
          <input
            type="text" inputMode="numeric" value={diasLaborados}
            onChange={(e) => setDiasLaborados(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <p className="text-xs text-slate-500 mt-1">Para calcular el aguinaldo proporcional del año en curso</p>
        </div>
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
