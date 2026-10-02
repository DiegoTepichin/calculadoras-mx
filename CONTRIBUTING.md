# Contributing

Thanks for helping keep these calculators accurate. Because people use the results for real
financial decisions, **every change to a figure needs an official source**.

## Setup

Requires Node.js 20+.

```bash
git clone https://github.com/DiegoTepichin/calculadoras-mx.git
cd calculadoras-mx
npm install
npm run dev
```

Before opening a pull request, run the same checks as CI:

```bash
npm run lint
npx tsc --noEmit
npm run test
npm run build   # every route must still be ○ Static
```

## Reporting or fixing a wrong number

1. If you only want to report it, open a
   [Wrong number issue](../../issues/new?template=wrong-number.md) with the calculator, the
   input you used, the value you expected and a link to the official source.
2. If you want to fix it:
   - Change the constant in the matching `data/*.ts` file and **cite the official source**
     (law article, DOF/SAT/INEGI/CONASAMI/DIAN publication) in the file's header comment.
     Secondary sources (blogs, payroll vendors) are welcome as cross-checks, not as the only
     source.
   - If the change belongs to a new year, add `data/<name>-<year>.ts` instead of overwriting the
     current file, and repoint the imports in `lib/`.
   - Add or update a test in `lib/*.test.ts` with a worked example you checked by hand, and
     include that example in the pull request description.
   - Update [`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md).

Pull requests that change figures without a source will not be merged.

## Code conventions

- Calculation logic goes in pure functions in `lib/` (no React), with a test file next to it.
- Every form field uses `components/CampoNumerico.tsx` or `components/CampoSelect.tsx`.
- Each calculator page exports `metadata`, renders its form plus an explainer `<article>`, and
  has a sibling `opengraph-image.tsx`. New routes go into `app/sitemap.ts`.
- Pages must stay statically prerendered: no server-only data fetching, no API routes.
- User-facing copy is in Spanish; code, comments and commit messages are in English.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`,
  `docs:`, `chore:`, `ci:`, `test:`).

## Adding a country

Countries are added one at a time. Mexico's routes are unprefixed and must stay that way; every
other country lives under its ISO 3166-1 alpha-2 code.

1. **Data:** `data/<cc>/` with year-suffixed constants (`constantes-2026.ts`…), each citing its
   official source and cross-checked against at least two independent sources.
2. **Logic:** `lib/<cc>/` with pure functions and tests. Reuse `lib/tarifa.ts`
   (`buscarRenglon`) for bracket tables, and prefer computing from the official table over
   unverifiable shortcut constants (see `lib/co/retencion.ts`).
3. **Currency:** add a `formatoXXX` wrapper over `formatoMoneda` in `lib/format.ts`.
4. **UI:** forms in `components/<cc>/`, routes in `app/<cc>/` (landing page plus one
   `calculadora/<name>/` per calculator, each with its `opengraph-image.tsx`).
5. **Wiring:** register the country in `lib/paises.ts`, add its nav and footer (including the
   "not tax advice" disclaimer) to `components/SiteChrome.tsx`, and add its routes to
   `app/sitemap.ts`.
6. **Docs:** add the country's rows to `docs/DATA_SOURCES.md` and its calculators to both
   READMEs.
7. In the pull request, include one worked numeric example per calculator so a reviewer can
   check it against the official source.
