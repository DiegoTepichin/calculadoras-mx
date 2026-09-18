"use client";

import type { ReactNode } from "react";

interface OpcionSelect {
  value: string;
  label: string;
}

interface CampoSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (valor: string) => void;
  opciones: OpcionSelect[];
  hint?: ReactNode;
  className?: string;
}

export default function CampoSelect({
  id,
  label,
  value,
  onChange,
  opciones,
  hint,
  className,
}: CampoSelectProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {opciones.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}
