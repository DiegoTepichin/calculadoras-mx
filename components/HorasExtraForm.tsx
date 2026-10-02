"use client";

import { useMemo, useState } from "react";
import { calcularHorasExtra } from "@/lib/jornada";
import { formatoMXN, parseMontoNoNegativo } from "@/lib/format";
import { JORNADA_DIARIA_POR_TIPO, type TipoJornada } from "@/data/jornada-reforma-2026";
import CampoNumerico from "@/components/CampoNumerico";
import CampoSelect from "@/components/CampoSelect";

const ANIOS = ["2026", "2027", "2028", "2029", "2030"];

export default function HorasExtraForm() {
  const [salario, setSalario] = useState("500");
  const [tipo, setTipo] = useState<TipoJornada>("diurna");
  const [horas, setHoras] = useState("12");
  const [anio, setAnio] = useState("2027");
  const [dias, setDias] = useState("");
  const [maxDia, setMaxDia] = useState("");

  const calculo = useMemo(() => {
    const s = parseMontoNoNegativo(salario);
    const h = parseMontoNoNegativo(horas);
    if (s === null || h === null) return null;
    const d = dias.trim() === "" ? undefined : parseMontoNoNegativo(dias) ?? undefined;
    const m = maxDia.trim() === "" ? undefined : parseMontoNoNegativo(maxDia) ?? undefined;
    return calcularHorasExtra({
      salarioDiario: s,
      tipoJornada: tipo,
      horasExtraSemana: h,
      anio: Number(anio),
      diasConHorasExtra: d,
      maxHorasExtraEnUnDia: m,
    });
  }, [salario, tipo, horas, anio, dias, maxDia]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <CampoNumerico id="salario" label="Salario diario (MXN)" value={salario} onChange={setSalario} />
        <CampoSelect
          id="tipo"
          label="Tipo de jornada"
          value={tipo}
          onChange={(v) => setTipo(v as TipoJornada)}
          opciones={[
            { value: "diurna", label: `Diurna (${JORNADA_DIARIA_POR_TIPO.diurna} h)` },
            { value: "nocturna", label: `Nocturna (${JORNADA_DIARIA_POR_TIPO.nocturna} h)` },
            { value: "mixta", label: `Mixta (${JORNADA_DIARIA_POR_TIPO.mixta} h)` },
          ]}
          hint="Art. 61 LFT"
        />
        <CampoNumerico
          id="horas"
          label="Horas extra en la semana"
          value={horas}
          onChange={setHoras}
          hint="Total de horas trabajadas por encima de tu jornada ordinaria"
        />
        <CampoSelect
          id="anio"
          label="Año"
          value={anio}
          onChange={setAnio}
          opciones={ANIOS.map((a) => ({ value: a, label: a }))}
          hint="El límite de horas al doble cambia cada año"
        />
        <CampoNumerico
          id="dias"
          label="Días con horas extra (opcional)"
          value={dias}
          onChange={setDias}
          inputMode="numeric"
          hint="Para revisar el límite de 4 días por semana"
        />
        <CampoNumerico
          id="maxDia"
          label="Máximo de horas extra en un día (opcional)"
          value={maxDia}
          onChange={setMaxDia}
          hint="Para revisar el límite de 4 horas diarias"
        />
      </div>

      {calculo && (
        <div className="rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Horas al doble ({calculo.horasDobles} h)</span>
            <span className="font-medium">{formatoMXN(calculo.pagoDobles)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Horas al triple ({calculo.horasTriples} h)</span>
            <span className="font-medium">{formatoMXN(calculo.pagoTriples)}</span>
          </div>
          <div className="flex justify-between text-base border-t border-slate-200 pt-3">
            <span className="font-semibold">Pago de horas extra en la semana</span>
            <span className="font-bold text-emerald-700">{formatoMXN(calculo.pagoTotal)}</span>
          </div>

          {calculo.alertas.length > 0 && (
            <ul className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-1 list-disc pl-6">
              {calculo.alertas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          )}

          <p className="text-xs text-slate-500 pt-1">
            Montos brutos. No incluye la retención de ISR ni la parte exenta de las horas extra
            (Art. 93 fracc. I LISR).
          </p>

          <details className="pt-2 border-t border-slate-100">
            <summary className="cursor-pointer text-sm font-medium text-emerald-700">
              Ver cómo se calculó
            </summary>
            <ol className="mt-3 space-y-2 text-sm text-slate-600 list-decimal pl-5">
              <li>
                Valor hora = {formatoMXN(Number(salario.replace(/,/g, "")))} ÷{" "}
                {JORNADA_DIARIA_POR_TIPO[tipo]} h = {formatoMXN(calculo.valorHora)}
              </li>
              <li>
                Límite al doble en {calculo.anio}: {calculo.limiteSemanalDobles} h por semana
                (Transitorio Cuarto del decreto del 1-may-2026)
              </li>
              <li>
                Al doble: {calculo.horasDobles} h × {formatoMXN(calculo.valorHora)} × 2 ={" "}
                {formatoMXN(calculo.pagoDobles)}
              </li>
              <li>
                Al triple: {calculo.horasTriples} h × {formatoMXN(calculo.valorHora)} × 3 ={" "}
                {formatoMXN(calculo.pagoTriples)}
              </li>
            </ol>
          </details>
        </div>
      )}
    </div>
  );
}
