import { useState } from "react";
import { Calculator, Download } from "lucide-react";
import {
  JORNAL_MINIMO,
  calcularHonorarios,
  calcularLiquidacion,
  formatGs,
  type Instancia,
  type Modalidad,
} from "@/lib/lexia-calc";
import { CopyButton, DemoCard, SourceLink } from "../shared";

export function HonorariosDemo() {
  const [monto, setMonto] = useState(85_000_000);
  const [instancia, setInstancia] = useState<Instancia>("1a");
  const [modalidad, setModalidad] = useState<Modalidad>("porcentaje");
  const [salario, setSalario] = useState(4_200_000);
  const [anios, setAnios] = useState(4);

  const r = calcularHonorarios(monto, instancia, modalidad);
  const liquidacion = calcularLiquidacion(salario, anios);
  const resumen = `LEX IA Honorarios — Monto: ${formatGs(monto)} | Instancia: ${instancia} | Modalidad: ${modalidad} | Rango: ${formatGs(r.min)} a ${formatGs(r.max)} | ${r.fundamento} | Jornal: ${formatGs(JORNAL_MINIMO)} Res. 670/2026`;

  const descargar = () => {
    const blob = new Blob(
      [
        `${resumen}\n\nDesglose: mínimo, máximo, artículo aplicable y jornal vigente. Revisar con supervisión humana.`,
      ],
      { type: "text/plain" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resumen-honorarios-lexia.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 800);
  };

  return (
    <DemoCard
      title="Honorarios LEX IA — calculadora en vivo"
      icon={<Calculator size={20} className="text-gold" />}
      aside={
        <span className="chip">
          Jornal vigente: {formatGs(JORNAL_MINIMO)} • Res. MTESS N° 670/2026
        </span>
      }
    >
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="field">
          Monto del juicio (Gs.)
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value) || 0)}
          />
        </label>
        <label className="field">
          Instancia
          <select value={instancia} onChange={(e) => setInstancia(e.target.value as Instancia)}>
            <option value="1a">1ª instancia</option>
            <option value="2a">2ª instancia</option>
            <option value="3a">3ª instancia</option>
            <option value="ejecutivo">Juicio ejecutivo</option>
          </select>
        </label>
        <label className="field">
          Modalidad
          <select value={modalidad} onChange={(e) => setModalidad(e.target.value as Modalidad)}>
            <option value="porcentaje">Porcentaje — Art. 32</option>
            <option value="jornales">Jornales — Arts. 44+</option>
            <option value="mixta">Mixta</option>
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-muted p-4">
          <p className="small text-muted-foreground">Mínimo estimado</p>
          <p className="kpi mt-1 text-navy">{formatGs(r.min)}</p>
        </div>
        <div className="rounded-xl bg-navy p-4 text-navy-foreground">
          <p className="small opacity-80">Máximo estimado</p>
          <p className="kpi mt-1">{formatGs(r.max)}</p>
        </div>
        <div className="rounded-xl border border-gold-soft p-4">
          <p className="small text-muted-foreground">Fundamento</p>
          <p className="mt-1 font-bold">{r.fundamento}</p>
          <p className="small mt-1">Ley N° 1376/88, mod. Ley N° 4590/12.</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-gold-soft bg-tint-cream p-4">
        <p className="font-bold">Desglose</p>
        <p className="small mt-1">
          Base {formatGs(monto)} • Instancia {instancia} • Modalidad {modalidad} • Rango calculado
          en vivo.{" "}
          {modalidad === "jornales" &&
            `Equivale a ${r.jornalesMin} a ${r.jornalesMax} jornales de ${formatGs(JORNAL_MINIMO)}. `}
          El resultado es una estimación para cotizar y verificar; la regulación final corresponde
          al juzgado.
        </p>
      </div>

      <div className="mt-5 border-t pt-4">
        <p className="font-bold">Liquidación laboral — insumo para Litigios Laborales</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <label className="field">
            Salario mensual
            <input
              type="number"
              value={salario}
              onChange={(e) => setSalario(Number(e.target.value) || 0)}
            />
          </label>
          <label className="field">
            Antigüedad (años)
            <input
              type="number"
              value={anios}
              onChange={(e) => setAnios(Number(e.target.value) || 0)}
            />
          </label>
          <div className="rounded-xl bg-tint-green p-3">
            <p className="small">Estimación referencial</p>
            <p className="text-lg font-extrabold">{formatGs(liquidacion)}</p>
            <p className="small">Arts. 84, 218 y 219 — Ley 213/93.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <CopyButton text={resumen} />
        <button type="button" className="btn btn-navy btn-sm" onClick={descargar}>
          <Download size={15} /> Descargar resumen
        </button>
        <SourceLink idx={0} />
      </div>
    </DemoCard>
  );
}
