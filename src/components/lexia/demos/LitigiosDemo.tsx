import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase } from "lucide-react";
import { DemoCard, SourceLink } from "../shared";

const JUICIOS = [
  {
    c: "Despido — Ana Benítez",
    e: "Etapa de prueba",
    p: "Traslado 3 días",
    j: "Laboral 2° Asunción",
  },
  {
    c: "Cobro de salarios — Carlos Fleitas",
    e: "Demanda admitida",
    p: "Audiencia 12/06",
    j: "Laboral 1° Central",
  },
  {
    c: "Indemnización — Laura Ortiz",
    e: "Sentencia",
    p: "Liquidación en curso",
    j: "Laboral 3° Asunción",
  },
  {
    c: "Horas extras — Diego Cáceres",
    e: "Conciliación",
    p: "Propuesta en revisión",
    j: "Laboral 2° Luque",
  },
];

export function LitigiosDemo() {
  const [q, setQ] = useState("");
  const lista = JUICIOS.filter((u) => (u.c + u.e + u.j).toLowerCase().includes(q.toLowerCase()));
  return (
    <DemoCard
      title="Litigios Laborales — tabla de juicios"
      icon={<Briefcase size={20} className="text-gold" />}
    >
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por carátula, etapa o juzgado…"
        />
        <Link to="/calculadoras" className="btn btn-navy">
          Ir a calculadora de liquidación <ArrowRight size={15} />
        </Link>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="small w-full">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="py-2 pr-2">Caso</th>
              <th className="py-2 pr-2">Etapa</th>
              <th className="py-2">Plazo</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((u) => (
              <tr key={u.c} className="border-t">
                <td className="py-3 pr-2 font-semibold">
                  {u.c}
                  <span className="block font-normal text-muted-foreground">{u.j}</span>
                </td>
                <td className="py-3 pr-2">{u.e}</td>
                <td className="py-3">{u.p}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="small mt-2 text-muted-foreground">
        {lista.length} juicios mostrados. Ley 213/93, Arts. 84, 205–207, 218 y 219.
      </p>
      <SourceLink idx={2} />
    </DemoCard>
  );
}
