"use client";

import type { ReactNode } from "react";

interface CampoNumericoProps {
  id: string;
  label: string;
  value: string;
  onChange: (valor: string) => void;
  inputMode?: "decimal" | "numeric";
  placeholder?: string;
  hint?: ReactNode;
  className?: string;
  grande?: boolean;
}

export default function CampoNumerico({
  id,
  label,
  value,
  onChange,
  inputMode = "decimal",
  placeholder,
  hint,
  className,
  grande = false,
}: CampoNumericoProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${grande ? "text-lg" : ""}`}
      />
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}
