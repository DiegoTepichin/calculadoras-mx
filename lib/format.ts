export function formatoMoneda(
  n: number,
  opts: { locale: string; currency: string; decimales?: number }
): string {
  return n.toLocaleString(opts.locale, {
    style: "currency",
    currency: opts.currency,
    minimumFractionDigits: opts.decimales,
    maximumFractionDigits: opts.decimales,
  });
}

export function formatoMXN(n: number): string {
  return formatoMoneda(n, { locale: "es-MX", currency: "MXN" });
}

export function formatoCOP(n: number): string {
  return formatoMoneda(n, { locale: "es-CO", currency: "COP", decimales: 0 });
}

/**
 * Convierte texto de un input (posiblemente con comas de miles) a número.
 * Devuelve null si el texto no es un número válido no negativo.
 */
export function parseMontoNoNegativo(texto: string): number | null {
  const valor = parseFloat(texto.replace(/,/g, ""));
  if (Number.isNaN(valor) || valor < 0) return null;
  return valor;
}
