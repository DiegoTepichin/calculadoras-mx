"use client";

import { useMemo, useState } from "react";
import { UMA_2026 } from "@/data/constantes-2026";

export default function UmaForm() {
  const [pesos, setPesos] = useState("10000");
  const [umas, setUmas] = useState("10");
  const [ultimoEditado, setUltimoEditado] = useState<"pesos" | "umas">("pesos");

  const resultado = useMemo(() => {
    if (ultimoEditado === "pesos") {
      const p = parseFloat(pesos);
      if (Number.isNaN(p)) return null;
      return { pesos: p, umas: p / UMA_2026.mensual };
    } else {
      const u = parseFloat(umas);
      if (Number.isNaN(u)) return null;
      return { pesos: u * UMA_2026.mensual, umas: u };
    }
  }, [pesos, umas, ultimoEditado]);

  const formatoMXN = (n: number) =>
    n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 p-4 text-sm">
        <p>UMA diaria 2026: <strong>{formatoMXN(UMA_2026.diario)}</strong></p>
        <p>UMA mensual 2026: <strong>{formatoMXN(UMA_2026.mensual)}</strong></p>
        <p>UMA anual 2026: <strong>{formatoMXN(UMA_2026.anual)}</strong></p>
        <p className="text-xs text-slate-500 mt-1">Vigente desde el {UMA_2026.vigenciaDesde}. {UMA_2026.nota}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Pesos (MXN)</label>
          <input
            type="text" inputMode="decimal" value={pesos}
            onChange={(e) => { setPesos(e.target.value); setUltimoEditado("pesos"); }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Veces UMA (mensual)</label>
          <input
            type="text" inputMode="decimal" value={umas}
            onChange={(e) => { setUmas(e.target.value); setUltimoEditado("umas"); }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {resultado && (
        <div className="rounded-xl border border-slate-200 p-5 flex justify-between text-base">
          <span className="font-semibold">Equivalencia</span>
          <span className="font-bold text-emerald-700">
            {formatoMXN(resultado.pesos)} = {resultado.umas.toFixed(4)} UMA
          </span>
        </div>
      )}
    </div>
  );
}
