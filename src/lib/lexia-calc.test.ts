import { describe, expect, it } from "vitest";
import {
  JORNAL_MINIMO,
  anonimizar,
  calcularHonorarios,
  calcularIntereses,
  calcularLiquidacion,
  calcularMulta,
  calcularPrediccion,
  formatGs,
} from "./lexia-calc";

describe("LEX IA PY calculation rules", () => {
  it("uses the jornal mínimo Gs. 117.077 (Res. MTESS 670/2026)", () => {
    expect(JORNAL_MINIMO).toBe(117077);
    expect(formatGs(117077)).toBe("Gs. 117.077");
  });

  it("honorarios 1ª instancia por porcentaje: 5% a 20% del monto", () => {
    const r = calcularHonorarios(100_000_000, "1a", "porcentaje");
    expect(r.min).toBe(5_000_000);
    expect(r.max).toBe(20_000_000);
  });

  it("honorarios 2ª instancia: 25% a 35% de la 1ª", () => {
    const r = calcularHonorarios(100_000_000, "2a", "porcentaje");
    expect(r.min).toBeCloseTo(1_250_000);
    expect(r.max).toBeCloseTo(7_000_000);
  });

  it("honorarios por jornales en 1ª instancia: 8 a 28 jornales", () => {
    const r = calcularHonorarios(0, "1a", "jornales");
    expect(r.min).toBe(8 * 117077);
    expect(r.max).toBe(28 * 117077);
  });

  it("liquidación referencial: salario × años + medio salario + aguinaldo proporcional", () => {
    expect(calcularLiquidacion(1_200_000, 4)).toBe(1_200_000 * 4 + 600_000 + 100_000);
  });

  it("intereses ejecutivos: 2% mensual durante 90 días sobre Gs. 25.000.000", () => {
    const r = calcularIntereses(25_000_000, 2, 90);
    expect(r.intereses).toBe(1_500_000);
    expect(r.total).toBe(26_500_000);
  });

  it("multa MTESS grave en empresa grande: 240 jornales", () => {
    expect(calcularMulta("Grave", "Grande").jornales).toBe(240);
    expect(calcularMulta("Media", "Pequeña").monto).toBe(30 * 117077);
  });

  it("predicción acota el intervalo de confianza entre 5% y 97%", () => {
    const alto = calcularPrediccion(100, 100, 100);
    expect(alto.prob).toBe(100);
    expect(alto.hasta).toBe(97);
    expect(calcularPrediccion(0, 0, 0).desde).toBe(5);
  });

  it("anonimiza cédula, RUC y correo", () => {
    const out = anonimizar("cédula 3.456.789, RUC 3456789-1, correo maria@ejemplo.com");
    expect(out).toContain("[CÉDULA]");
    expect(out).toContain("[RUC]");
    expect(out).toContain("[CORREO]");
    expect(out).not.toContain("3.456.789");
  });
});
