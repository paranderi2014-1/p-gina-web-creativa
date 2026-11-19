import { useState } from "react";
import { ChevronRight, Landmark } from "lucide-react";
import { calcularIntereses, formatGs } from "@/lib/lexia-calc";
import { PASOS_EJECUTIVO } from "@/lib/lexia-data";
import { CheckItem, DemoCard, ProgressBar, SourceLink, toggleIn } from "../shared";

const ETAPAS = [
  "1 Demanda",
  "2 Embargo Art. 451",
  "3 Excepciones Art. 448",
  "4 Sentencia Art. 453",
  "5 Liquidación 459–466",
];

export function EjecutivosDemo() {
  const [capital, setCapital] = useState(25_000_000);
  const [tasa, setTasa] = useState(2);
  const [dias, setDias] = useState(90);
  const [marcados, setMarcados] = useState([PASOS_EJECUTIVO[0]]);
  const { intereses, total } = calcularIntereses(capital, tasa, dias);
  const avance = (marcados.length / PASOS_EJECUTIVO.length) * 100;

  return (
    <DemoCard
      title="Juicio Ejecutivo — intereses y control"
      icon={<Landmark size={20} className="text-gold" />}
    >
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="field">
          Capital
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value) || 0)}
          />
        </label>
        <label className="field">
          Tasa mensual %
          <input
            type="number"
            value={tasa}
            onChange={(e) => setTasa(Number(e.target.value) || 0)}
          />
        </label>
        <label className="field">
          Días
          <input
            type="number"
            value={dias}
            onChange={(e) => setDias(Number(e.target.value) || 0)}
          />
        </label>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-tint-warm p-4">
          <p className="small">Intereses calculados</p>
          <p className="text-xl font-extrabold">{formatGs(intereses)}</p>
        </div>
        <div className="rounded-xl bg-navy p-4 text-navy-foreground">
          <p className="small opacity-80">Total capital + intereses</p>
          <p className="text-xl font-extrabold">{formatGs(total)}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-bold">Checklist — Arts. 439 a 466</p>
        <p className="small text-muted-foreground">
          {marcados.length} de {PASOS_EJECUTIVO.length} pasos marcados • {Math.round(avance)}%
          completo
        </p>
        <ProgressBar value={avance} />
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {PASOS_EJECUTIVO.map((p) => (
            <CheckItem
              key={p}
              label={p}
              checked={marcados.includes(p)}
              onChange={() => setMarcados((l) => toggleIn(l, p))}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {ETAPAS.map((e, i) => (
          <span key={e} className="flex items-center gap-2">
            <span className="chip">{e}</span>
            {i < ETAPAS.length - 1 && <ChevronRight size={14} />}
          </span>
        ))}
      </div>
      <div className="mt-3">
        <SourceLink idx={5} label="Verificar en CSJ Ingresos Judiciales" />
      </div>
    </DemoCard>
  );
}
