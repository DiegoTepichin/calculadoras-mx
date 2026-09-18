"use client";

import { useMemo, useState } from "react";
import { UMA_2026 } from "@/data/constantes-2026";
import { formatoMXN, parseMontoNoNegativo } from "@/lib/format";
import CampoNumerico from "@/components/CampoNumerico";

export default function UmaForm() {
  const [pesos, setPesos] = useState("10000");
  const [umas, setUmas] = useState("10");
  const [ultimoEditado, setUltimoEditado] = useState<"pesos" | "umas">("pesos");

  const resultado = useMemo(() => {
    if (ultimoEditado === "pesos") {
      const p = parseMontoNoNegativo(pesos);
      if (p === null) return null;
      return { pesos: p, umas: p / UMA_2026.mensual };
    } else {
      const u = parseMontoNoNegativo(umas);
      if (u === null) return null;
      return { pesos: u * UMA_2026.mensual, umas: u };
    }
  }, [pesos, umas, ultimoEditado]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 p-4 text-sm">
        <p>UMA diaria 2026: <strong>{formatoMXN(UMA_2026.diario)}</strong></p>
        <p>UMA mensual 2026: <strong>{formatoMXN(UMA_2026.mensual)}</strong></p>
        <p>UMA anual 2026: <strong>{formatoMXN(UMA_2026.anual)}</strong></p>
        <p className="text-xs text-slate-500 mt-1">Vigente desde el {UMA_2026.vigenciaDesde}. {UMA_2026.nota}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <CampoNumerico
          id="pesos"
          label="Pesos (MXN)"
          value={pesos}
          onChange={(v) => { setPesos(v); setUltimoEditado("pesos"); }}
        />
        <CampoNumerico
          id="umas"
          label="Veces UMA (mensual)"
          value={umas}
          onChange={(v) => { setUmas(v); setUltimoEditado("umas"); }}
        />
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
