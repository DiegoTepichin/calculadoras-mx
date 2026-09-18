# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Calculadoras MX — a Next.js 16 (App Router) + TypeScript + Tailwind CSS site of Mexican
tax/labor calculators (ISR, RESICO, nómina completa, aguinaldo, finiquito, UMA, cuotas IMSS
obrero-patronales), built as "Pilar 3" of a monetization lab (programmatic SEO). It ships as
100% static pages: no backend, no database, no server cost.

Fiscal/labor figures in `data/*.ts` that aren't simple published tables (e.g. the IMSS employer
CEAV bracket table, prima de riesgo por clase) were verified against ≥2-3 independent sources via
web research before being hardcoded — see the source comments at the top of each `data/*.ts`
file. Treat any new fiscal/labor constant the same way before adding it: this site's only real
liability risk is publishing wrong numbers that people use for financial decisions.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verify pages remain fully static (○ Static) before shipping
npm run lint     # eslint (flat config: eslint-config-next core-web-vitals + typescript)
npm run test     # vitest run — unit tests for lib/*.ts and data/*.ts
```

Run a single test file with `npx vitest run lib/isr.test.ts`. CI (`.github/workflows/ci.yml`)
runs lint, `tsc --noEmit`, tests, and build on every push/PR to `main`.

## Workflow

After every significant change (a bug fix, a new/refactored feature, a dependency bump, etc.),
create a git commit for it — don't let multiple unrelated changes pile up uncommitted. Group
each commit around one coherent piece of work with a clear message, run lint/test/build first,
and prefer several small commits over one large one.

## Architecture

- **`data/*.ts`** — the source of truth for all tax/labor figures for the current year (ISR
  brackets, subsidio para el empleo, UMA, salario mínimo, LFT vacation table). These are plain
  versioned constants, not fetched from anywhere. Each file is year-suffixed (`isr-2026.ts`,
  `constantes-2026.ts`); when the official tables change (SAT/INEGI/CONASAMI, typically
  Jan/Feb), add a new `*-YYYY.ts` file rather than overwriting the old one, and repoint the
  imports in `lib/*`.
- **`lib/*.ts`** — pure calculation functions (`calcularISRMensual`, `calcularISRResico`,
  `calcularAguinaldo`, `calcularFiniquito`, `calcularCuotaObreraDiaria`/`calcularCuotaPatronalDiaria`)
  that import from `data/*` and contain no React/UI code. This is where the actual tax/labor
  logic and its legal citations (LFT/LISR/LSS articles) live, and where the matching `*.test.ts`
  files (Vitest) live alongside each module. `lib/tarifa.ts` has the shared `buscarRenglon()` used
  by both ISR and RESICO (any new bracket-based tariff should reuse it, not reimplement the
  lookup). `lib/format.ts` holds `formatoMXN`/`parseMontoNoNegativo`; `lib/site.ts` is the single
  source for `SITE_NAME`/`SITE_URL`; `lib/og.tsx` generates the Open Graph preview images.
  "Nómina completa" and the IMSS patronal calculator both build on `lib/imss.ts` rather than each
  reimplementing IMSS math — any new calculator needing IMSS quotas should do the same.
- **`components/CampoNumerico.tsx`** / **`CampoSelect.tsx`** — the shared numeric input and
  dropdown (label + control + optional hint), used by every calculator form. Any new field should
  use one of these rather than hand-rolling an `<input>`/`<select>`, to keep label/id association
  (a11y) and styling consistent.
- **`components/*Form.tsx`** — one `"use client"` form component per calculator, built from
  `CampoNumerico`/`CampoSelect` fields. Each holds its own input state and calls the matching
  `lib/*` function(s) synchronously (via `useMemo`, no debouncing/validation library), and renders
  a `<details>` "Ver cómo se calculó" block substituting the actual numbers into the formula. No
  shared form-orchestration abstraction exists across calculators — only the field components and
  the desglose pattern are shared, by design.
- **`app/calculadora/<nombre>/page.tsx`** — one route per calculator. Each is a server component
  that exports `metadata` (title/description/canonical) for SEO, renders the intro copy + the
  matching form, and an `<article>` "how it's calculated" explainer section for topical
  authority (Helpful Content). New calculators should follow this same page shape: metadata +
  form + explainer article, plus a sibling `opengraph-image.tsx` (see below).
- **`app/**/opengraph-image.tsx`** — one per route (root + each calculator + aviso-de-privacidad),
  each a thin wrapper calling `generarImagenOG(titulo)` from `lib/og.tsx` via `next/og`'s
  `ImageResponse`. Statically generated at build time — no external design asset needed. Add one
  for any new page.
- **`app/layout.tsx`** — global chrome (header nav, footer disclaimer) and the base `metadata`
  (title template, `openGraph`, `twitter`), all built from `lib/site.ts`. `app/sitemap.ts` still
  hardcodes the route list — when adding a calculator route, update the nav in `layout.tsx` and
  the `rutas` array in `sitemap.ts`.
- All copy and UI strings are in Spanish (es-MX); numbers/currency are formatted with the shared
  `formatoMXN` helper (`lib/format.ts`).
- This site is a reference tool, not tax/legal advice — that disclaimer is load-bearing copy in
  `app/layout.tsx`'s footer and should be preserved on any related changes.
