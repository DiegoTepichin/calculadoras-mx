"use client";

import { useMemo, useState } from "react";
import { calcularCuotaPatronalDiaria } from "@/lib/imss";
import { PRIMA_MEDIA_POR_CLASE_2026 } from "@/data/imss-2026";
import { formatoMXN, parseMontoNoNegativo } from "@/lib/format";
import CampoNumerico from "@/components/CampoNumerico";
import CampoSelect from "@/components/CampoSelect";

const OPCION_PRIMA_PROPIA = "propia";

export default function ImssPatronalForm() {
  const [salarioDiario, setSalarioDiario] = useState("500");
  const [clase, setClase] = useState(PRIMA_MEDIA_POR_CLASE_2026[0].clase);
  const [primaPropia, setPrimaPropia] = useState("0.54355");

  const primaAplicada = useMemo(() => {
    if (clase === OPCION_PRIMA_PROPIA) {
      const p = parseMontoNoNegativo(primaPropia);
      return p === null ? null : p / 100;
    }
    const encontrada = PRIMA_MEDIA_POR_CLASE_2026.find((c) => c.clase === clase);
    return encontrada ? encontrada.prima : null;
  }, [clase, primaPropia]);

  const calculo = useMemo(() => {
    const sd = parseMontoNoNegativo(salarioDiario);
    if (sd === null || primaAplicada === null) return null;
    return { salarioDiario: sd, resultado: calcularCuotaPatronalDiaria(sd, primaAplicada) };
  }, [salarioDiario, primaAplicada]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <CampoNumerico
          id="salarioDiario"
          label="Salario Base de Cotización diario (MXN)"
          value={salarioDiario}
          onChange={setSalarioDiario}
        />
        <CampoSelect
          id="clase"
          label="Clase de riesgo de trabajo"
          value={clase}
          onChange={setClase}
          opciones={[
            ...PRIMA_MEDIA_POR_CLASE_2026.map((c) => ({
              value: c.clase,
              label: `Clase ${c.clase} — ${c.descripcion} (${(c.prima * 100).toFixed(4)}%)`,
            })),
            { value: OPCION_PRIMA_PROPIA, label: "Ya conozco mi prima de riesgo registrada" },
          ]}
          hint="La prima media es la que paga una empresa nueva; después del primer año, cada empresa calcula la suya según su siniestralidad."
        />
      </div>

      {clase === OPCION_PRIMA_PROPIA && (
        <CampoNumerico
          id="primaPropia"
          label="Tu prima de riesgo registrada (%)"
          value={primaPropia}
          onChange={setPrimaPropia}
          hint="El % que te notificó el IMSS en tu última determinación de prima"
        />
      )}

      {calculo && (
        <div className="rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Enfermedades y Maternidad (cuota fija + excedente)</span>
            <span className="font-medium">
              {formatoMXN(calculo.resultado.cuotaFijaEM + calculo.resultado.excedenteTresUmaEM)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Prestaciones en dinero + gastos médicos pensionados</span>
            <span className="font-medium">
              {formatoMXN(calculo.resultado.prestacionesEnDineroEM + calculo.resultado.gastosMedicosPensionados)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Invalidez y vida</span>
            <span className="font-medium">{formatoMXN(calculo.resultado.invalidezYVida)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Guarderías y prestaciones sociales</span>
            <span className="font-medium">{formatoMXN(calculo.resultado.guarderiasYPrestacionesSociales)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Retiro</span>
            <span className="font-medium">{formatoMXN(calculo.resultado.retiro)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              Cesantía y vejez ({(calculo.resultado.tasaCesantiaYVejezAplicada * 100).toFixed(3)}%)
            </span>
            <span className="font-medium">{formatoMXN(calculo.resultado.cesantiaYVejez)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Riesgo de trabajo</span>
            <span className="font-medium">{formatoMXN(calculo.resultado.riesgoTrabajo)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Infonavit</span>
            <span className="font-medium">{formatoMXN(calculo.resultado.infonavit)}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-slate-200 pt-3">
            <span className="text-slate-600">Cuota patronal diaria</span>
            <span className="font-semibold">{formatoMXN(calculo.resultado.total)}</span>
          </div>
          <div className="flex justify-between text-base border-t border-slate-200 pt-3">
            <span className="font-semibold">Costo diario total (salario + cuota patronal)</span>
            <span className="font-bold text-emerald-700">
              {formatoMXN(calculo.salarioDiario + calculo.resultado.total)}
            </span>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            No incluye el Impuesto Sobre Nóminas (ISN) estatal, que varía por entidad federativa
            (típicamente 2-3% del total de nóminas), ni prestaciones adicionales que la empresa
            otorgue por su cuenta (aguinaldo, vales, seguro de gastos médicos mayores, etc.).
          </p>
        </div>
      )}
    </div>
  );
}
