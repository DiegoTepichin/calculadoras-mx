# Calculadoras MX

[English](README.md) | **Español**

Calculadoras fiscales y laborales de código abierto para Latinoamérica (México, Colombia).

**Sitio en vivo: [calculadoras-mx.netlify.app](https://calculadoras-mx.netlify.app)**

[![CI](https://github.com/DiegoTepichin/calculadoras-mx/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/DiegoTepichin/calculadoras-mx/actions/workflows/ci.yml?query=branch%3Amain)
[![Licencia: MIT](https://img.shields.io/github/license/DiegoTepichin/calculadoras-mx)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)

![Página principal con las calculadoras de México](docs/screenshot-home.webp)

![Calculadora de ISR para un sueldo de $10,000 MXN mensuales, con el desglose paso a paso abierto](docs/screenshot-isr.webp)

Cada calculadora muestra el resultado **y** la fórmula con tus números sustituidos ("Ver cómo
se calculó"), para que cualquiera pueda revisar la cuenta contra la ley que cita.

## Calculadoras

### México 🇲🇽

| Calculadora | Ruta | Fundamento |
|---|---|---|
| ISR mensual + subsidio para el empleo | [`/calculadora/isr`](https://calculadoras-mx.netlify.app/calculadora/isr) | Art. 96 LISR, decreto del subsidio para el empleo |
| RESICO | [`/calculadora/resico`](https://calculadoras-mx.netlify.app/calculadora/resico) | Art. 113-E LISR |
| Nómina completa (sueldo neto: ISR + IMSS + Infonavit) | [`/calculadora/nomina`](https://calculadoras-mx.netlify.app/calculadora/nomina) | LISR, LSS |
| Aguinaldo | [`/calculadora/aguinaldo`](https://calculadoras-mx.netlify.app/calculadora/aguinaldo) | Art. 87 LFT |
| Finiquito (separación voluntaria) | [`/calculadora/finiquito`](https://calculadoras-mx.netlify.app/calculadora/finiquito) | Arts. 76, 80, 87 LFT |
| Convertidor de UMA | [`/calculadora/uma`](https://calculadoras-mx.netlify.app/calculadora/uma) | INEGI |
| Cuotas IMSS obrero-patronales | [`/calculadora/imss-patronal`](https://calculadoras-mx.netlify.app/calculadora/imss-patronal) | LSS, Ley del Infonavit |
| Horas extra con la reforma de 40 horas | [`/calculadora/horas-extra`](https://calculadoras-mx.netlify.app/calculadora/horas-extra) | Arts. 61, 66, 68 LFT (DOF 1-may-2026) |
| Guía de la reforma de 40 horas | [`/reforma-40-horas`](https://calculadoras-mx.netlify.app/reforma-40-horas) | DOF 1-may-2026 |

### Colombia 🇨🇴

| Calculadora | Ruta | Fundamento |
|---|---|---|
| Retención en la fuente para asalariados | [`/co/calculadora/retencion`](https://calculadoras-mx.netlify.app/co/calculadora/retencion) | Art. 383 Estatuto Tributario |
| Prima de servicios | [`/co/calculadora/prima`](https://calculadoras-mx.netlify.app/co/calculadora/prima) | Art. 306 CST |
| Convertidor de UVT | [`/co/calculadora/uvt`](https://calculadoras-mx.netlify.app/co/calculadora/uvt) | Resolución DIAN |

## Cómo se verifican las cifras

Una calculadora fiscal vale lo que valen sus números, así que la capa de datos sigue reglas
estrictas:

1. **Una sola fuente de verdad por año.** Cada tasa, tarifa y tope vive en una constante de
   TypeScript con el año en el nombre, dentro de [`data/`](data) (`isr-2026.ts`,
   `imss-2026.ts`, `co/retencion-2026.ts`…). Nada se descarga ni se consulta en tiempo de
   ejecución.
2. **Fuente oficial citada en el archivo.** Cada archivo de datos empieza con la ley, decreto o
   resolución de donde sale (SAT, DOF, INEGI, CONASAMI, DIAN…). La lista completa, con fechas de
   vigencia y cada cuándo se revisa, está en [`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md).
3. **Cruzada contra 2–3 fuentes independientes** antes de escribirla en el código: normalmente
   la publicación oficial más referencias profesionales de contabilidad y nómina.
4. **Primeros principios antes que atajos.** Si una fuente secundaria publica una constante
   "atajo" cuya consistencia no se puede comprobar, el código calcula desde la tabla oficial
   (por ejemplo, la retención de Colombia recorre cada renglón de forma marginal en vez de
   confiar en constantes en UVT presumadas).
5. **Cálculos puros y con pruebas.** Toda la matemática vive en funciones sin framework en
   [`lib/`](lib), cada una con su suite de [Vitest](https://vitest.dev) que fija ejemplos
   resueltos (límites de renglón, topes, entradas en cero y negativas).
6. **Las actualizaciones anuales agregan archivos, no los sobrescriben.** Cuando la autoridad
   publica tablas nuevas, se agrega un archivo `*-2027.ts` y se repuntan los imports, para que
   el historial siga siendo auditable.

¿Encontraste una cifra que no coincide con una fuente oficial?
[Abre un issue de "Wrong number"](../../issues/new?template=wrong-number.md).

## Stack y por qué es 100% estático

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS 4
- Vitest para pruebas unitarias, ESLint y CI en GitHub Actions (lint, tipos, pruebas, build)

Cada página se prerenderiza al compilar (`○ Static`): los cálculos corren en el navegador con
constantes que viajan con la página. No hay backend ni base de datos, y las cifras que escribes
nunca salen de tu dispositivo, así que hospedarlo es gratis, carga rápido en celulares
modestos y se cachea sin esfuerzo. Las imágenes de Open Graph también se generan al compilar.

## Inicio rápido

Requiere Node.js 20 o superior.

```bash
git clone https://github.com/DiegoTepichin/calculadoras-mx.git
cd calculadoras-mx
npm install
npm run dev        # http://localhost:3000
```

## Pruebas y verificaciones

```bash
npm run lint       # ESLint
npx tsc --noEmit   # revisión de tipos
npm run test       # pruebas unitarias de lib/ y data/ con Vitest
npm run build      # build de producción; toda ruta debe seguir siendo ○ Static
```

Para correr una sola suite: `npx vitest run lib/isr.test.ts`.

## Estructura

```
data/          constantes fiscales/laborales por año con su fuente oficial (México en la raíz)
data/co/       constantes de Colombia
lib/           funciones de cálculo puras + sus archivos *.test.ts
lib/co/        cálculos de Colombia
components/    un formulario por calculadora, más los campos compartidos
app/           una ruta por calculadora (México sin prefijo, los demás países bajo /<cc>)
```

## Agregar un país

Los países se agregan de uno en uno bajo su código ISO 3166-1 alfa-2 (Colombia vive en `/co`).
En resumen: `data/<cc>/` con constantes y su fuente, `lib/<cc>/` con funciones probadas,
formularios en `components/<cc>/` y rutas en `app/<cc>/`; luego se registra el país en
`lib/paises.ts` y su menú y pie de página en `components/SiteChrome.tsx`. Las piezas
compartidas (búsqueda en tarifas, campos, SEO, imágenes OG) ya no dependen del país. La lista
completa está en [CONTRIBUTING.md](CONTRIBUTING.md#adding-a-country) (en inglés).

## Contribuir

Las correcciones con fuente oficial son la contribución más valiosa. Ver
[CONTRIBUTING.md](CONTRIBUTING.md).

## Aviso

Este proyecto es **solo informativo y no constituye asesoría fiscal, laboral ni legal**. Los
resultados son estimaciones con las reglas generales de cada ley; tu nómina real puede variar
por tu contrato, salario integrado, otros ingresos o deducciones. Consulta a un contador
certificado o a la autoridad correspondiente antes de tomar decisiones.

## Licencia

[MIT](LICENSE) © Diego Tepichin
