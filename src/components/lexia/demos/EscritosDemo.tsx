import { useState } from "react";
import { FileCheck } from "lucide-react";
import { DemoCard, SourceLink } from "../shared";

export function EscritosDemo() {
  const [caratula, setCaratula] = useState("Cobro de guaraníes — Pagaré");
  const [juzgado, setJuzgado] = useState("Juzgado Civil 4° Turno, Asunción");
  const [pretension, setPretension] = useState("Cobro de Gs. 25.000.000 más intereses");
  const [monto, setMonto] = useState("Gs. 25.000.000");
  return (
    <DemoCard title="Generador de Escritos" icon={<FileCheck size={20} className="text-gold" />}>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="field">
          Carátula
          <input value={caratula} onChange={(e) => setCaratula(e.target.value)} />
        </label>
        <label className="field">
          Juzgado
          <input value={juzgado} onChange={(e) => setJuzgado(e.target.value)} />
        </label>
        <label className="field">
          Pretensión
          <input value={pretension} onChange={(e) => setPretension(e.target.value)} />
        </label>
        <label className="field">
          Monto
          <input value={monto} onChange={(e) => setMonto(e.target.value)} />
        </label>
      </div>
      <div className="small mt-4 rounded-xl border bg-paper p-4 leading-relaxed">
        <p className="font-bold">SEÑOR JUEZ — {juzgado}</p>
        <p className="mt-3">
          En los autos caratulados “{caratula}”, vengo a promover demanda por {pretension}, por la
          suma de {monto}.
        </p>
        <p className="mt-3">
          I. HECHOS — Se exponen los hechos en orden cronológico, con la documentación acompañada.
        </p>
        <p className="mt-3">
          II. DERECHO — Fundamento en la legislación paraguaya aplicable al caso y en la
          jurisprudencia citada con fuente.
        </p>
        <p className="mt-3">
          III. PETITORIO — Se solicita admitir la demanda, correr traslado y, en su momento, hacer
          lugar a lo peticionado, con costas.
        </p>
        <p className="mt-3 text-muted-foreground">
          Borrador generado para revisión. La supervisión humana es obligatoria antes de presentar.
        </p>
      </div>
      <div className="mt-3">
        <SourceLink idx={5} />
      </div>
    </DemoCard>
  );
}
