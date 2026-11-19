import { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { formatGs } from "@/lib/lexia-calc";
import { CLAUSULAS } from "@/lib/lexia-data";
import { DemoCard, ProgressBar, SourceLink, toggleIn } from "../shared";

export function ContratosDemo() {
  const [paso, setPaso] = useState(1);
  const [tipo, setTipo] = useState("Laboral — plazo indefinido");
  const [parteA, setParteA] = useState("Estudio Jurídico Asunción");
  const [parteB, setParteB] = useState("María González");
  const [monto, setMonto] = useState(4_200_000);
  const [plazo, setPlazo] = useState("Indefinido");
  const [clausulas, setClausulas] = useState([
    "Confidencialidad",
    "Honorarios y forma de pago",
    "Protección de datos — Ley 7593/2025",
  ]);

  return (
    <DemoCard
      title={`Wizard de Contratos — ${paso} de 3`}
      icon={<FileText size={20} className="text-gold" />}
    >
      <ProgressBar value={(paso / 3) * 100} tone="gold" />

      {paso === 1 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="field">
            Tipo de contrato
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option>Laboral — plazo indefinido</option>
              <option>Laboral — plazo fijo</option>
              <option>Laboral — obra determinada</option>
              <option>Servicios profesionales</option>
              <option>Consultoría</option>
              <option>Outsourcing</option>
            </select>
          </label>
          <label className="field">
            Plazo
            <select value={plazo} onChange={(e) => setPlazo(e.target.value)}>
              <option>Indefinido</option>
              <option>6 meses</option>
              <option>12 meses</option>
              <option>Por obra determinada</option>
            </select>
          </label>
        </div>
      )}

      {paso === 2 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="field">
            Parte A / Empleador
            <input value={parteA} onChange={(e) => setParteA(e.target.value)} />
          </label>
          <label className="field">
            Parte B / Trabajador o prestador
            <input value={parteB} onChange={(e) => setParteB(e.target.value)} />
          </label>
          <label className="field">
            Salario / honorario mensual
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(Number(e.target.value) || 0)}
            />
          </label>
          <p className="small self-end text-muted-foreground">
            Usa datos de ejemplo para la vista previa. Antes de firmar, revisa con supervisión
            humana.
          </p>
        </div>
      )}

      {paso === 3 && (
        <div className="mt-4">
          <p className="mb-2 font-bold">Cláusulas — elige las que quieras incluir</p>
          <div className="flex flex-wrap gap-2">
            {CLAUSULAS.map((c) => (
              <button
                type="button"
                key={c}
                className="pill"
                data-active={clausulas.includes(c)}
                onClick={() => setClausulas((l) => toggleIn(l, c))}
              >
                {clausulas.includes(c) ? "✓ " : ""}
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        {paso > 1 && (
          <button type="button" className="btn btn-line" onClick={() => setPaso((p) => p - 1)}>
            Anterior
          </button>
        )}
        {paso < 3 ? (
          <button type="button" className="btn btn-navy" onClick={() => setPaso((p) => p + 1)}>
            Siguiente <ArrowRight size={15} />
          </button>
        ) : (
          <button type="button" className="btn btn-gold" onClick={() => setPaso(1)}>
            Crear otro contrato
          </button>
        )}
      </div>

      <div className="mt-4 rounded-xl border bg-paper p-4">
        <p className="text-[11px] font-bold tracking-widest text-muted-foreground">
          VISTA PREVIA EN VIVO
        </p>
        <h3 className="font-display mt-2 text-xl font-bold">Contrato — {tipo}</h3>
        <p className="small mt-2 leading-relaxed">
          Entre <b>{parteA}</b> y <b>{parteB}</b>, se acuerda un contrato de tipo <b>{tipo}</b>, por
          plazo <b>{plazo}</b>, con contraprestación mensual de <b>{formatGs(monto)}</b>. Se rige
          por la Ley N° 213/93 y/o la Ley N° 1183/85 (Código Civil), según el tipo elegido. La Ley
          N° 6380/19 corresponde a obligaciones tributarias.
        </p>
        <ul className="small mt-2 space-y-1">
          {clausulas.map((c) => (
            <li key={c}>• Cláusula: {c}</li>
          ))}
        </ul>
        <p className="small mt-2 text-muted-foreground">
          Documento de demostración. Generación DOCX / PDF disponible en el plan del estudio.
        </p>
      </div>
      <div className="mt-3">
        <SourceLink idx={7} />
      </div>
    </DemoCard>
  );
}
