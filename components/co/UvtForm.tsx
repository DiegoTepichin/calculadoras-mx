"use client";

import { useMemo, useState } from "react";
import { UVT_2026 } from "@/data/co/constantes-2026";
import { formatoCOP, parseMontoNoNegativo } from "@/lib/format";
import CampoNumerico from "@/components/CampoNumerico";

export default function UvtForm() {
  const [pesos, setPesos] = useState("1000000");
  const [uvt, setUvt] = useState("19.09");
  const [ultimoEditado, setUltimoEditado] = useState<"pesos" | "uvt">("pesos");

  const resultado = useMemo(() => {
    if (ultimoEditado === "pesos") {
      const p = parseMontoNoNegativo(pesos);
      if (p === null) return null;
      return { pesos: p, uvt: p / UVT_2026.valor };
    } else {
      const u = parseMontoNoNegativo(uvt);
      if (u === null) return null;
      return { pesos: u * UVT_2026.valor, uvt: u };
    }
  }, [pesos, uvt, ultimoEditado]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 p-4 text-sm">
        <p>Valor de la UVT 2026: <strong>{formatoCOP(UVT_2026.valor)}</strong></p>
        <p className="text-xs text-slate-500 mt-1">
          Vigente desde el {UVT_2026.vigenciaDesde} (Resolución DIAN 000238 de 2025).
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <CampoNumerico
          id="pesos"
          label="Pesos (COP)"
          value={pesos}
          onChange={(v) => { setPesos(v); setUltimoEditado("pesos"); }}
        />
        <CampoNumerico
          id="uvt"
          label="UVT"
          value={uvt}
          onChange={(v) => { setUvt(v); setUltimoEditado("uvt"); }}
        />
      </div>

      {resultado && (
        <div className="rounded-xl border border-slate-200 p-5 flex justify-between text-base">
          <span className="font-semibold">Equivalencia</span>
          <span className="font-bold text-emerald-700">
            {formatoCOP(resultado.pesos)} = {resultado.uvt.toFixed(4)} UVT
          </span>
        </div>
      )}
    </div>
  );
}
