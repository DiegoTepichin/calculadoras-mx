"use client";

import { useMemo, useState } from "react";
import { calcularISRResico } from "@/lib/resico";
import { formatoMXN, parseMontoNoNegativo } from "@/lib/format";
import CampoNumerico from "@/components/CampoNumerico";

export default function ResicoForm() {
  const [ingreso, setIngreso] = useState<string>("30000");

  const resultado = useMemo(() => {
    const valor = parseMontoNoNegativo(ingreso);
    if (valor === null) return null;
    return calcularISRResico(valor);
  }, [ingreso]);

  return (
    <div className="space-y-6">
      <CampoNumerico
        id="ingreso"
        label="Ingresos cobrados en el mes (MXN)"
        value={ingreso}
        onChange={setIngreso}
        placeholder="30000"
        grande
      />

      {resultado && (
        <div className="rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Tasa RESICO aplicada</span>
            <span className="font-medium">{(resultado.tasaAplicada * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
            <span className="text-slate-600">ISR a pagar</span>
            <span className="font-semibold">{formatoMXN(resultado.isrAPagar)}</span>
          </div>
          <div className="flex justify-between text-base border-t border-slate-200 pt-3">
            <span className="font-semibold">Ingreso neto estimado</span>
            <span className="font-bold text-emerald-700">{formatoMXN(resultado.ingresoNeto)}</span>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Tasa efectiva: {(resultado.tasaEfectiva * 100).toFixed(2)}%. No incluye IVA (que se
            calcula y traslada por separado) ni retenciones si emites factura a personas morales.
          </p>
          {resultado.excedeLimiteRegimen && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2">
              Un ingreso mensual como este, sostenido todo el año, superaría el límite de
              $3,500,000 anuales de RESICO — ya no calificarías para este régimen.
            </p>
          )}

          <details className="pt-2 border-t border-slate-100">
            <summary className="cursor-pointer text-sm font-medium text-emerald-700">
              Ver cómo se calculó
            </summary>
            <ol className="mt-3 space-y-2 text-sm text-slate-600 list-decimal pl-5">
              <li>
                Tus ingresos del mes ({formatoMXN(resultado.ingresoMensual)}) caen en el renglón{" "}
                {resultado.renglonAplicado} de la tabla RESICO, con tasa{" "}
                {(resultado.tasaAplicada * 100).toFixed(2)}%.
              </li>
              <li>
                A diferencia del ISR de sueldos y salarios, en RESICO la tasa se aplica al ingreso
                total del mes, no solo al excedente sobre un límite inferior.
              </li>
              <li>
                ISR a pagar = {formatoMXN(resultado.ingresoMensual)} ×{" "}
                {(resultado.tasaAplicada * 100).toFixed(2)}% = {formatoMXN(resultado.isrAPagar)}
              </li>
            </ol>
          </details>
        </div>
      )}
    </div>
  );
}
