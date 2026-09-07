"use client";

import { useMemo, useState } from "react";
import { calcularAguinaldo } from "@/lib/aguinaldo";

export default function AguinaldoForm() {
  const [salario, setSalario] = useState("500");
  const [dias, setDias] = useState("365");
  const [diasAguinaldo, setDiasAguinaldo] = useState("15");

  const resultado = useMemo(() => {
    const s = parseFloat(salario);
    const d = parseFloat(dias);
    const da = parseFloat(diasAguinaldo);
    if ([s, d, da].some((v) => Number.isNaN(v) || v < 0)) return null;
    return calcularAguinaldo(s, d, da);
  }, [salario, dias, diasAguinaldo]);

  const formatoMXN = (n: number) =>
    n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Salario diario (MXN)</label>
          <input
            type="text"
            inputMode="decimal"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Días laborados en el año</label>
          <input
            type="text"
            inputMode="numeric"
            value={dias}
            onChange={(e) => setDias(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Días de aguinaldo/año</label>
          <input
            type="text"
            inputMode="numeric"
            value={diasAguinaldo}
            onChange={(e) => setDiasAguinaldo(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <p className="text-xs text-slate-500 mt-1">Mínimo legal: 15 días (Art. 87 LFT)</p>
        </div>
      </div>

      {resultado && (
        <div className="rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Días de aguinaldo proporcionales</span>
            <span className="font-medium">{resultado.diasProporcionales} días</span>
          </div>
          <div className="flex justify-between text-base border-t border-slate-200 pt-3">
            <span className="font-semibold">Aguinaldo bruto estimado</span>
            <span className="font-bold text-emerald-700">
              {formatoMXN(resultado.aguinaldoBruto)}
            </span>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            No incluye la retención de ISR (el aguinaldo está exento hasta 30 UMA, Art. 93
            fracc. XIV LISR; el excedente se acumula al ingreso gravable del mes).
          </p>
        </div>
      )}
    </div>
  );
}
