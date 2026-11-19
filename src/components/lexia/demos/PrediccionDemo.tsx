import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { calcularPrediccion } from "@/lib/lexia-calc";
import { DemoCard, SourceLink } from "../shared";

export function PrediccionDemo() {
  const [fuerza, setFuerza] = useState(68);
  const [prueba, setPrueba] = useState(72);
  const [precedente, setPrecedente] = useState(60);
  const r = calcularPrediccion(fuerza, prueba, precedente);
  const sliders: [string, number, (n: number) => void][] = [
    ["Fuerza del caso", fuerza, setFuerza],
    ["Calidad de la prueba", prueba, setPrueba],
    ["Precedente favorable", precedente, setPrecedente],
  ];
  return (
    <DemoCard title="Predicción — simulador" icon={<TrendingUp size={20} className="text-gold" />}>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {sliders.map(([label, v, set]) => (
          <label key={label} className="field">
            {label}: {v}
            <input
              type="range"
              min={0}
              max={100}
              value={v}
              onChange={(e) => set(Number(e.target.value))}
            />
          </label>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-navy p-5 text-navy-foreground">
        <p className="small opacity-80">Probabilidad estimada de éxito</p>
        <p className="kpi">{r.prob}%</p>
        <p className="small mt-1">
          Intervalo de confianza: {r.desde}% a {r.hasta}% • Sobre jurisprudencia real de 2ª
          instancia.
        </p>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-navy-foreground/20">
          <div className="h-full bg-gold transition-all" style={{ width: `${r.prob}%` }} />
        </div>
        <p className="small mt-3">{r.lectura}</p>
      </div>
      <p className="small mt-3 text-muted-foreground">
        Estimación de apoyo a la decisión. No predice el fallo de un tribunal. La decisión final
        siempre es humana.
      </p>
      <SourceLink idx={6} />
    </DemoCard>
  );
}
