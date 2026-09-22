"use client";

import { useMemo, useState } from "react";
import { calcularRetencionFuente } from "@/lib/co/retencion";
import { formatoCOP, parseMontoNoNegativo } from "@/lib/format";
import CampoNumerico from "@/components/CampoNumerico";

export default function RetencionForm() {
  const [ingreso, setIngreso] = useState<string>("4000000");

  const resultado = useMemo(() => {
    const valor = parseMontoNoNegativo(ingreso);
    if (valor === null) return null;
    return calcularRetencionFuente(valor);
  }, [ingreso]);

  return (
    <div className="space-y-6">
      <CampoNumerico
        id="ingreso"
        label="Ingreso laboral mensual (COP)"
        value={ingreso}
        onChange={setIngreso}
        placeholder="4000000"
        grande
      />

      {resultado && (
        <div className="rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Ingreso en UVT</span>
            <span className="font-medium">{resultado.ingresoEnUvt.toFixed(2)} UVT</span>
          </div>
          <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
            <span className="text-slate-600">Retención en la fuente</span>
            <span className="font-semibold">{formatoCOP(resultado.retencionAPagar)}</span>
          </div>
          <div className="flex justify-between text-base border-t border-slate-200 pt-3">
            <span className="font-semibold">Ingreso neto estimado</span>
            <span className="font-bold text-emerald-700">{formatoCOP(resultado.ingresoNeto)}</span>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Tasa efectiva: {(resultado.tasaEfectiva * 100).toFixed(2)}%. No incluye aportes a
            salud/pensión ni deducciones (dependientes, intereses de vivienda, etc.), que reducen
            la base gravable antes de calcular la retención.
          </p>

          <details className="pt-2 border-t border-slate-100">
            <summary className="cursor-pointer text-sm font-medium text-emerald-700">
              Ver cómo se calculó
            </summary>
            <ol className="mt-3 space-y-2 text-sm text-slate-600 list-decimal pl-5">
              <li>
                Tu ingreso ({formatoCOP(resultado.ingresoMensual)}) equivale a{" "}
                {resultado.ingresoEnUvt.toFixed(2)} UVT.
              </li>
              <li>
                Se recorre la tabla del Art. 383 E.T. renglón por renglón: cada tramo de tu ingreso
                paga solo la tarifa de su propio renglón (método marginal), hasta llegar al
                renglón {resultado.renglonAplicado} (tarifa {(resultado.tasaMarginal * 100).toFixed(0)}%).
              </li>
              <li>
                La suma de esos tramos da {resultado.retencionEnUvt.toFixed(2)} UVT de retención,
                que al valor de la UVT 2026 equivale a {formatoCOP(resultado.retencionAPagar)}.
              </li>
            </ol>
          </details>
        </div>
      )}
    </div>
  );
}
