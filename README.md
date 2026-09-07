# Calculadoras MX — ISR, Aguinaldo, Finiquito y UMA 2026

Sitio de calculadoras fiscales/laborales para México (Pilar 3 del lab: web SEO programática
monetizable). Construido con Next.js 16 (App Router) + TypeScript + Tailwind CSS. Genera
páginas 100% estáticas — cero backend, cero base de datos, cero costo de hosting.

## Por qué este stack
- **Next.js SSG**: cada calculadora es una página estática prerenderizada (ver output de
  `next build`: todas marcadas `○ Static`), lo que da Core Web Vitals excelentes y permite
  indexación inmediata sin esperar renderizado en servidor.
- **Sin base de datos**: los datos fiscales (ISR, UMA, salario mínimo, vacaciones) están en
  `data/*.ts`, versionados en git. Cuando cambien las tablas oficiales (normalmente en
  enero/febrero de cada año), se actualizan esos archivos y se vuelve a desplegar — no hay
  infraestructura que mantener.
- **Cero dependencias de pago**: Tailwind y Next.js son open source; el hosting recomendado
  (Vercel o Cloudflare Pages) tiene tier gratuito más que suficiente para este tráfico.

## Cómo correr en local
```bash
npm install
npm run dev
# abre http://localhost:3000
```

## Cómo desplegar gratis (elige una opción)

### Opción A — Vercel (recomendada, cero configuración)
1. Sube este proyecto a un repositorio de GitHub (puede ser público o privado).
2. Entra a https://vercel.com con tu cuenta de GitHub (plan Hobby, gratis).
3. "Add New Project" → importa el repo → Vercel detecta Next.js automáticamente → Deploy.
4. Cada `git push` a la rama principal vuelve a desplegar automáticamente, gratis.
5. Cuando tengas dominio propio, agrégalo en Project Settings → Domains, y actualiza
   `SITE_URL` en `app/layout.tsx`, `app/sitemap.ts` y `app/robots.ts`.

### Opción B — Cloudflare Pages
1. Sube el proyecto a GitHub.
2. En el dashboard de Cloudflare → Pages → "Create a project" → conecta el repo.
3. Framework preset: Next.js. Build command: `npm run build`. Output: `.next`.
4. Deploy gratis, con CDN global incluido.

## Antes de monetizar con AdSense
1. Verifica el sitio en Google Search Console (gratis) y envía `sitemap.xml`.
2. Espera a tener contenido/tráfico mínimo y solicita Google AdSense (gratis, revisión manual).
3. Considera añadir 2-3 páginas de contenido explicativo por calculadora (ej. "cómo se calcula
   el ISR paso a paso") para reforzar autoridad temática ante el Helpful Content Update.

## Mantenimiento anual obligatorio
Las cifras en `data/isr-2026.ts` y `data/constantes-2026.ts` deben revisarse cada año contra
la fuente oficial (SAT, INEGI, CONASAMI) — ver fuentes documentadas en la memoria del proyecto.
Sugerencia: crear `data/isr-2027.ts` cuando el SAT publique la nueva Resolución Miscelánea
Fiscal, en vez de sobrescribir el archivo del año anterior.
