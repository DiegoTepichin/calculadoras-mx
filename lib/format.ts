export function formatoMXN(n: number): string {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
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
