# Data sources

Every figure the calculators use lives in [`data/`](../data). This table lists each file, what it
contains, the official source it was taken from, when the figures are in force and when they
must be reviewed. The header comment of each file repeats its source.

Each figure was cross-checked against at least two independent sources before being added (see
[How the numbers are verified](../README.md#how-the-numbers-are-verified)).

## Mexico

| File | Contents | Official source | In force | Review |
|---|---|---|---|---|
| [`data/isr-2026.ts`](../data/isr-2026.ts) | ISR withholding tariffs for wages: monthly, 15-day and 7-day (11 brackets each) | Art. 96 LISR and Art. 175 RLISR; [Anexo 8 of the Resolución Miscelánea Fiscal 2026](https://www.sat.gob.mx/minisitio/NormatividadRMFyRGCE/documentos2026/rmf/anexos/Anexo-8-RMF-2026_DOF-28122025.pdf) (SAT, DOF 2025-12-28) | 2026-01-01 → 2026-12-31 | Each January, when SAT publishes Anexo 8 |
| [`data/isr-2026.ts`](../data/isr-2026.ts) | Employment subsidy: 15.02% of the monthly UMA, for monthly income ≤ $11,492.66 | Decree amending the subsidio para el empleo decree, [DOF Dec 2025](https://sidof.segob.gob.mx/notas/docFuente/5777649) (Art. Segundo; shorter pay periods: monthly amount ÷ 30.4 × days; January used 15.59% of the 2025 UMA) | 2026-02-01 → 2026-12-31 | Each December/January, when the DOF publishes the yearly update |
| [`data/resico-2026.ts`](../data/resico-2026.ts) | RESICO rates for individuals (1%–2.5%) and the $3.5M annual cap | Art. 113-E [LISR](https://www.diputados.gob.mx/LeyesBiblio/pdf/LISR.pdf) | Unchanged since 2022 (not inflation-indexed) | Each January, in case of a LISR reform |
| [`data/constantes-2026.ts`](../data/constantes-2026.ts) | UMA (daily, monthly, yearly) | [INEGI](https://www.inegi.org.mx/temas/uma/), published in the DOF | 2026-02-01 → 2027-01-31 (January 2026 used the 2025 UMA) | Each January, when INEGI publishes the new UMA |
| [`data/constantes-2026.ts`](../data/constantes-2026.ts) | Minimum wage (general and northern border zone) | CONASAMI resolution published in the DOF | 2026-01-01 → 2026-12-31 | Each December, when CONASAMI sets the next year's wage |
| [`data/constantes-2026.ts`](../data/constantes-2026.ts) | Vacation days by seniority, 25% vacation premium, 15-day minimum aguinaldo; proportional vacations and aguinaldo at termination | Arts. 76, 79, 80 and 87 [LFT](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf) (2023 "vacaciones dignas" reform; text checked against the version last amended DOF 2026-05-14) | Since 2023-01-01 | When the LFT is amended |
| [`data/constantes-2026.ts`](../data/constantes-2026.ts) | Days in the year for proportional aguinaldo (365 in 2026; 366 in leap years) | Calendar; leap-year divisor per Aspel NOI payroll documentation and calculadorasat.org | 2026 | Each year (next leap year: 2028) |
| [`data/imss-2026.ts`](../data/imss-2026.ts) | IMSS employer/employee contribution rates, 25-UMA SBC cap, average risk premium by class | Arts. 25, 28, 72, 73, 74, 106, 107, 147, 168, 211–212 [LSS](https://www.diputados.gob.mx/LeyesBiblio/pdf/LSS.pdf); Art. 29 fr. II Ley del Infonavit | 2026-01-01 → 2026-12-31 | Each January |
| [`lib/imss.ts`](../lib/imss.ts) | Minimum SBC integration factor: 1 + (15 + vacation days × 25%) ÷ 365 (1.0493 in year 1) | Art. 27 [LSS](https://www.diputados.gob.mx/LeyesBiblio/pdf/LSS.pdf) with Arts. 76, 80 and 87 LFT; published factor tables (Siempre al Día, SDV) | Since the 2023 vacation reform | When the LFT or LSS is amended |
| [`data/imss-2026.ts`](../data/imss-2026.ts) | Employer CEAV (old-age) rate table for 2026 | Second Transitory article of the LSS reform decree, DOF 2020-12-16 (rates step up yearly until 2030) | 2026-01-01 → 2026-12-31 | Each January: the decree sets a new table every year until 2030 |
| [`data/jornada-reforma-2026.ts`](../data/jornada-reforma-2026.ts) | 40-hour workweek reform: yearly overtime limits 2026–2030, double/triple pay rules | LFT reform decree, [DOF 2026-05-01](https://www.diputados.gob.mx/LeyesBiblio/ref/lft/LFT_ref52_01may26.pdf) (Arts. 61, 66, 68 and Transitories) | Multi-year schedule set by the decree | When a later reform changes the schedule |

## Colombia

| File | Contents | Official source | In force | Review |
|---|---|---|---|---|
| [`data/co/constantes-2026.ts`](../data/co/constantes-2026.ts) | UVT ($52,374 COP) | DIAN, Resolución 000238 of 2025-12-15 | 2026-01-01 → 2026-12-31 | Each December, when DIAN sets the next UVT |
| [`data/co/constantes-2026.ts`](../data/co/constantes-2026.ts) | Minimum wage and transport allowance | Decrees 1469 and 1470 of 2025 | 2026-01-01 → 2026-12-31 | Each December/January |
| [`data/co/retencion-2026.ts`](../data/co/retencion-2026.ts) | Withholding table for employees, in UVT (procedure 1) | Art. 383 Estatuto Tributario (as amended by Ley 2277 of 2022) | Structure fixed since 2023; only the UVT value changes yearly | When the Estatuto Tributario is amended |

## Yearly update process

1. Between December and February, check every row above against its official source.
2. For figures that changed, add a new file (`data/isr-2027.ts`) instead of editing the 2026 one,
   and repoint the imports in `lib/`.
3. Cite the source in the new file's header and update this table.
4. Update or add the tests that pin worked examples, and make sure `npm run test` and
   `npm run build` pass.
