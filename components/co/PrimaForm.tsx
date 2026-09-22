"use client";

import { useMemo, useState } from "react";
import { calcularPrimaServicios } from "@/lib/co/prima";
import { formatoCOP, parseMontoNoNegativo } from "@/lib/format";
import CampoNumerico from "@/components/CampoNumerico";

export default function PrimaForm() {
  const [salario, setSalario] = useState("1750905");
  const [dias, setDias] = useState("180");

  const calculo = useMemo(() => {
    const s = parseMontoNoNegativo(salario);
    const d = parseMontoNoNegativo(dias);
    if (s === null || d === null) return null;
    return { salario: s, dias: d, resultado: calcularPrimaServicios(s, d) };
  }, [salario, dias]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <CampoNumerico
          id="salario"
          label="Salario mensual (COP)"
          value={salario}
          onChange={setSalario}
        />
        <CampoNumerico
          id="dias"
          label="Días trabajados en el semestre"
          value={dias}
          onChange={setDias}
          inputMode="numeric"
          hint="Máximo 180 días (un semestre completo)"
        />
      </div>

      {calculo && (
        <div className="rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex justify-between text-base">
            <span className="font-semibold">Prima de servicios del semestre</span>
            <span className="font-bold text-emerald-700">
              {formatoCOP(calculo.resultado.primaSemestral)}
            </span>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            La prima de servicios se paga en dos cuotas al año (30 de junio y 20 de diciembre),
            cada una calculada por separado sobre su propio semestre.
          </p>

          <details className="pt-2 border-t border-slate-100">
            <summary className="cursor-pointer text-sm font-medium text-emerald-700">
              Ver cómo se calculó
            </summary>
            <ol className="mt-3 space-y-2 text-sm text-slate-600 list-decimal pl-5">
              <li>
                Prima = {formatoCOP(calculo.salario)} (salario mensual) ×{" "}
                {calculo.resultado.diasTrabajados} días trabajados ÷ 360 ={" "}
                {formatoCOP(calculo.resultado.primaSemestral)}
              </li>
            </ol>
          </details>
        </div>
      )}
    </div>
  );
}
