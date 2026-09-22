import Link from "next/link";

interface CalculadoraRelacionada {
  href: string;
  titulo: string;
}

export default function CalculadorasRelacionadas({ items }: { items: CalculadoraRelacionada[] }) {
  return (
    <nav aria-label="Calculadoras relacionadas" className="max-w-2xl mt-10 pt-6 border-t border-slate-200">
      <h2 className="text-sm font-semibold text-slate-500 mb-3">Calculadoras relacionadas</h2>
      <ul className="flex flex-wrap gap-3 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-block rounded-full border border-slate-200 px-3 py-1.5 hover:border-emerald-400 hover:text-emerald-700 transition"
            >
              {item.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
