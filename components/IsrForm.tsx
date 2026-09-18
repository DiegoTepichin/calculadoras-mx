"use client";

import { useMemo, useState } from "react";
import { calcularISRMensual } from "@/lib/isr";
import { formatoMXN, parseMontoNoNegativo } from "@/lib/format";
import CampoNumerico from "@/components/CampoNumerico";

export default function IsrForm() {
  const [ingreso, setIngreso] = useState<string>("15000");

  const resultado = useMemo(() => {
    const valor = parseMontoNoNegativo(ingreso);
    if (valor === null) return null;
    return calcularISRMensual(valor);
  }, [ingreso]);

  return (
    <div className="space-y-6">
      <CampoNumerico
        id="ingreso"
        label="Ingreso mensual bruto (MXN)"
        value={ingreso}
        onChange={setIngreso}
        placeholder="15000"
        grande
      />

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

          <details className="pt-2 border-t border-slate-100">
            <summary className="cursor-pointer text-sm font-medium text-emerald-700">
              Ver cómo se calculó
            </summary>
            <ol className="mt-3 space-y-2 text-sm text-slate-600 list-decimal pl-5">
              <li>
                Tu ingreso ({formatoMXN(resultado.ingresoMensual)}) cae en el renglón{" "}
                {resultado.renglonAplicado} de la tarifa (límite inferior{" "}
                {formatoMXN(resultado.limiteInferiorRenglon)}).
              </li>
              <li>
                Excedente = {formatoMXN(resultado.ingresoMensual)} −{" "}
                {formatoMXN(resultado.limiteInferiorRenglon)} = {formatoMXN(resultado.excedente)}
              </li>
              <li>
                ISR causado = {formatoMXN(resultado.cuotaFijaRenglon)} (cuota fija) +{" "}
                {formatoMXN(resultado.excedente)} ×{" "}
                {(resultado.porcentajeExcedenteRenglon * 100).toFixed(2)}% ={" "}
                {formatoMXN(resultado.isrCausado)}
              </li>
              <li>
                ISR a retener = {formatoMXN(resultado.isrCausado)} −{" "}
                {formatoMXN(resultado.subsidioAplicado)} (subsidio) ={" "}
                {formatoMXN(resultado.isrAPagar)}
              </li>
            </ol>
          </details>
        </div>
      )}
    </div>
  );
}
