import { useState } from "react";
import { FolderSearch } from "lucide-react";
import { DOCUMENTOS } from "@/lib/lexia-data";
import { DemoCard, SourceLink } from "../shared";

export function RevisionDemo() {
  const [q, setQ] = useState("");
  const [tema, setTema] = useState("Todos");
  const lista = DOCUMENTOS.filter(
    (d) =>
      (tema === "Todos" || d.tema === tema) &&
      (d.t + d.tema).toLowerCase().includes(q.toLowerCase()),
  ).sort((a, b) => b.rel - a.rel);
  return (
    <DemoCard
      title="Revisión masiva — E-Discovery"
      icon={<FolderSearch size={20} className="text-gold" />}
    >
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Buscar en ${DOCUMENTOS.length} documentos…`}
          aria-label="Buscar documentos"
        />
        <select
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          className="sm:max-w-56"
          aria-label="Tema"
        >
          {[
            "Todos",
            "Contratos",
            "Laboral",
            "Ejecutivo",
            "Compliance",
            "Jurisprudencia",
            "Gestión",
          ].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="mt-3 space-y-2">
        {lista.map((d) => (
          <div key={d.t} className="flex flex-wrap justify-between gap-2 rounded-xl border p-3">
            <div>
              <p className="font-bold">{d.t}</p>
              <p className="small text-muted-foreground">
                {d.tema} • {d.fecha}
              </p>
            </div>
            <span className="chip h-fit">Relevancia {d.rel}%</span>
          </div>
        ))}
        {lista.length === 0 && (
          <p className="small rounded-xl bg-tint-warm p-3">Sin documentos con ese criterio.</p>
        )}
      </div>
      <div className="mt-3">
        <SourceLink idx={6} />
      </div>
    </DemoCard>
  );
}
