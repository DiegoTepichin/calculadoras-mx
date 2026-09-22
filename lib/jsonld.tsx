// Ver node_modules/next/dist/docs/01-app/02-guides/json-ld.md: patrón recomendado por Next.js
// para insertar JSON-LD, incluyendo el escape de "<" para evitar inyección en el HTML.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
