"use client";

import { useMemo, useState } from "react";
import { calcularAguinaldo } from "@/lib/aguinaldo";
import { formatoMXN, parseMontoNoNegativo } from "@/lib/format";
import CampoNumerico from "@/components/CampoNumerico";

export default function AguinaldoForm() {
  const [salario, setSalario] = useState("500");
  const [dias, setDias] = useState("365");
  const [diasAguinaldo, setDiasAguinaldo] = useState("15");

  const resultado = useMemo(() => {
    const s = parseMontoNoNegativo(salario);
    const d = parseMontoNoNegativo(dias);
    const da = parseMontoNoNegativo(diasAguinaldo);
    if (s === null || d === null || da === null) return null;
    return calcularAguinaldo(s, d, da);
  }, [salario, dias, diasAguinaldo]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <CampoNumerico
          id="salario"
          label="Salario diario (MXN)"
          value={salario}
          onChange={setSalario}
        />
        <CampoNumerico
          id="dias"
          label="Días laborados en el año"
          value={dias}
          onChange={setDias}
          inputMode="numeric"
        />
        <CampoNumerico
          id="diasAguinaldo"
          label="Días de aguinaldo/año"
          value={diasAguinaldo}
          onChange={setDiasAguinaldo}
          inputMode="numeric"
          hint="Mínimo legal: 15 días (Art. 87 LFT)"
        />
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
