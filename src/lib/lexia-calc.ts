/** Pure calculation rules used by the LEX IA PY demos. Keep in sync with lexia-calc.test.ts. */

/** Jornal mínimo vigente — Res. MTESS N° 670/2026, desde el 01/01/2026. */
export const JORNAL_MINIMO = 117077;

export function formatGs(value: number): string {
  const n = new Intl.NumberFormat("es-PY", { maximumFractionDigits: 0 }).format(Math.round(value));
  return `Gs. ${n}`;
}

export type Instancia = "1a" | "2a" | "3a" | "ejecutivo";
export type Modalidad = "porcentaje" | "jornales" | "mixta";

export interface HonorariosResult {
  min: number;
  max: number;
  fundamento: string;
  jornalesMin: number;
  jornalesMax: number;
}

/** Ley N° 1376/88, mod. Ley N° 4590/12 — Arts. 32, 33, 44 y sgtes. */
export function calcularHonorarios(
  monto: number,
  instancia: Instancia,
  modalidad: Modalidad,
): HonorariosResult {
  if (modalidad === "porcentaje") {
    // 1ª instancia: 5% a 20%. 2ª/3ª: 25% a 35% de la 1ª (1,25% a 7%).
    const [lo, hi] = instancia === "1a" ? [0.05, 0.2] : [0.0125, 0.07];
    return {
      min: monto * lo,
      max: monto * hi,
      fundamento:
        instancia === "1a"
          ? "Art. 32 — 5% a 20% en 1ª instancia"
          : "Arts. 32 y 33 — 2ª/3ª instancia: 25% a 35% de la 1ª",
      jornalesMin: 0,
      jornalesMax: 0,
    };
  }
  if (modalidad === "jornales") {
    const jornalesMin = instancia === "1a" ? 8 : 2;
    const jornalesMax = instancia === "1a" ? 28 : 10;
    return {
      min: jornalesMin * JORNAL_MINIMO,
      max: jornalesMax * JORNAL_MINIMO,
      fundamento: "Arts. 44 y sgtes. — Por jornales",
      jornalesMin,
      jornalesMax,
    };
  }
  return {
    min: monto * 0.025 + 6 * JORNAL_MINIMO,
    max: monto * 0.1 + 16 * JORNAL_MINIMO,
    fundamento: "Modalidad mixta — Arts. 32 y 44 y sgtes.",
    jornalesMin: 0,
    jornalesMax: 0,
  };
}

/** Estimación referencial de liquidación laboral — Arts. 84, 218 y 219, Ley 213/93. */
export function calcularLiquidacion(salarioMensual: number, antiguedadAnios: number): number {
  return salarioMensual * antiguedadAnios + salarioMensual * 0.5 + salarioMensual / 12;
}

/** Intereses simples de juicio ejecutivo: capital × tasa mensual × (días / 30). */
export function calcularIntereses(capital: number, tasaMensualPct: number, dias: number) {
  const intereses = capital * (tasaMensualPct / 100) * (dias / 30);
  return { intereses, total: capital + intereses };
}

export type Gravedad = "Leve" | "Media" | "Grave";
export type TamanoEmpresa = "Pequeña" | "Mediana" | "Grande";

/** Multa MTESS estimada en jornales — Decreto N° 1989/24. */
export function calcularMulta(gravedad: Gravedad, tamano: TamanoEmpresa) {
  const base = gravedad === "Leve" ? 10 : gravedad === "Media" ? 30 : 80;
  const factor = tamano === "Pequeña" ? 1 : tamano === "Mediana" ? 1.8 : 3;
  const jornales = Math.round(base * factor);
  return { jornales, monto: jornales * JORNAL_MINIMO };
}

/** Simulador de predicción: ponderación 35/40/25 con intervalo ±14 (acotado a 5–97). */
export function calcularPrediccion(fuerza: number, prueba: number, precedente: number) {
  const prob = Math.round(fuerza * 0.35 + prueba * 0.4 + precedente * 0.25);
  const desde = Math.max(5, prob - 14);
  const hasta = Math.min(97, prob + 14);
  const lectura =
    prob >= 70
      ? "Escenario favorable: avanzar con estrategia documentada."
      : prob >= 45
        ? "Escenario equilibrado: reforzar prueba y precedente antes de decidir."
        : "Escenario sensible: evaluar conciliación o fortalecer el caso con más prueba.";
  return { prob, desde, hasta, lectura };
}

/** Anonimización local (en el navegador) — Ley N° 7593/2025. */
export function anonimizar(texto: string): string {
  return texto
    .replace(/\b\d{6,9}-\d\b/g, "[RUC]")
    .replace(/\b\d{1,2}\.\d{3}\.\d{3}\b|\b\d{6,9}\b/g, "[CÉDULA]")
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, "[CORREO]")
    .replace(/\b[A-ZÁÉÍÓÚÑ][A-Za-záéíóúñ ]+ S\.A\./g, "[EMPRESA]")
    .replace(/\b[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+ [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+\b/g, "[NOMBRE]");
}
