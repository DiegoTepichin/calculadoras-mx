"use client";

import { useMemo, useState } from "react";
import { calcularISRMensual } from "@/lib/isr";

export default function IsrForm() {
  const [ingreso, setIngreso] = useState<string>("15000");

  const resultado = useMemo(() => {
    const valor = parseFloat(ingreso.replace(/,/g, ""));
    if (Number.isNaN(valor) || valor < 0) return null;
    return calcularISRMensual(valor);
  }, [ingreso]);

  const formatoMXN = (n: number) =>
    n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="ingreso" className="block text-sm font-medium mb-1">
          Ingreso mensual bruto (MXN)
        </label>
        <input
          id="ingreso"
          type="text"
          inputMode="decimal"
          value={ingreso}
          onChange={(e) => setIngreso(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="15000"
        />
      </div>

      {resultado && (
        <div className="rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">ISR causado</span>
            <span className="font-medium">{formatoMXN(resultado.isrCausado)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Subsidio para el empleo</span>
            <span className="font-medium text-emerald-700">
              − {formatoMXN(resultado.subsidioAplicado)}
            </span>
          </div>
          <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
            <span className="text-slate-600">ISR a retener</span>
            <span className="font-semibold">{formatoMXN(resultado.isrAPagar)}</span>
          </div>
          <div className="flex justify-between text-base border-t border-slate-200 pt-3">
            <span className="font-semibold">Ingreso neto estimado</span>
            <span className="font-bold text-emerald-700">{formatoMXN(resultado.ingresoNeto)}</span>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Tasa efectiva de ISR: {(resultado.tasaEfectiva * 100).toFixed(2)}%. No incluye
            retenciones de IMSS ni Infonavit, que se calculan por separado.
          </p>
        </div>
      )}
    </div>
  );
}
