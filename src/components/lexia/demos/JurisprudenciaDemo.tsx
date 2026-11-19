import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Gavel } from "lucide-react";
import { FALLOS } from "@/lib/lexia-data";
import { DemoCard, SourceLink } from "../shared";

export function JurisprudenciaDemo() {
  const [q, setQ] = useState("");
  const [sala, setSala] = useState("Todas");
  const [materia, setMateria] = useState("Todas");
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const resultados = FALLOS.filter(
    (f) =>
      (sala === "Todas" || f.sala === sala) &&
      (materia === "Todas" || f.materia.startsWith(materia)) &&
      (q === "" || (f.extracto + f.n + f.magistrado).toLowerCase().includes(q.toLowerCase())),
  );

  const preguntar = () => {
    const consulta = pregunta || q;
    if (!consulta) {
      setRespuesta(
        "Escribe una pregunta, por ejemplo: ¿cuándo hay despido sin causa justificada? Luego revisa el fallo completo en la fuente oficial.",
      );
      return;
    }
    const top = resultados[0];
    setRespuesta(
      top
        ? `Según ${top.n} (${top.sala}), el criterio visible es el del extracto mostrado. Esta respuesta cita la fuente y no reemplaza la lectura del fallo completo. Consulta: “${consulta}”.`
        : "No encontré jurisprudencia sobre esto en la base de demostración. Prefiero decirlo antes que inventar una respuesta: consulta la base completa en CSJ Jurisprudencia.",
    );
  };

  return (
    <DemoCard title="Buscador de Jurisprudencia" icon={<Gavel size={20} className="text-gold" />}>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="field">
          Buscar
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ej.: despido, prescripción, amparo" />
        </label>
        <label className="field">
          Sala
          <select value={sala} onChange={(e) => setSala(e.target.value)}>
            <option>Todas</option>
            <option>Sala Civil</option>
            <option>Sala Penal</option>
            <option>Sala Constitucional</option>
          </select>
        </label>
        <label className="field">
          Materia
          <select value={materia} onChange={(e) => setMateria(e.target.value)}>
            <option>Todas</option>
            <option>Civil</option>
            <option>Penal</option>
            <option>Constitucional</option>
            <option>Laboral</option>
          </select>
        </label>
      </div>
      <p className="small mt-3 text-muted-foreground">
        {resultados.length} fallos encontrados de {FALLOS.length} en la base de demostración. Base completa: CSJ
        Jurisprudencia desde 1995.
      </p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {resultados.map((f) => (
          <article key={f.n} className="rounded-xl border p-4">
            <p className="font-extrabold text-link">{f.n}</p>
            <p className="small text-muted-foreground">
              {f.fecha} • {f.sala} • {f.magistrado} • {f.materia}
            </p>
            <p className="small mt-2 leading-relaxed">{f.extracto}</p>
            <button type="button" className="mt-3 text-sm font-bold text-link" onClick={() => setPregunta(f.extracto)}>
              Contar el caso →
            </button>
          </article>
        ))}
        {resultados.length === 0 && (
          <p className="small rounded-xl bg-tint-warm p-4 md:col-span-2">
            No encontré un fallo exacto con ese filtro. Ajusta la búsqueda o consulta la base completa en la fuente
            oficial.
          </p>
        )}
      </div>
      <div className="mt-4 rounded-xl bg-tint-blue p-4">
        <p className="font-bold">Lexia — consulta sobre los extractos de demostración</p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end">
          <input value={pregunta} onChange={(e) => setPregunta(e.target.value)} placeholder="Pregunta sobre un caso…" />
          <button type="button" className="btn btn-navy" onClick={preguntar}>
            Consultar extracto
          </button>
        </div>
        {respuesta && <p className="small mt-3 rounded-lg border bg-card p-3">{respuesta}</p>}
        <Button asChild className="mt-3"><Link to="/asistente">Investigar con Lexia en fuentes oficiales</Link></Button>
        <p className="small mt-2">
          Consejo: pide sin datos identificatorios. Ejemplo: “fallo sobre despido sin causa, sin nombres ni cédulas”.
        </p>
      </div>
      <div className="mt-3">
        <SourceLink idx={6} label="Ver en CSJ Jurisprudencia" />
      </div>
    </DemoCard>
  );
}
