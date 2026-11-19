import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { MODULES, getModule, getSource } from "@/lib/lexia-data";
import { pageHead } from "@/lib/seo";
import { SectionTitle } from "@/components/lexia/shared";
import { ModuleDemo } from "@/components/lexia/demos";

export const Route = createFileRoute("/modulos")({
  validateSearch: (search: Record<string, unknown>): { m?: number } => {
    const m = Number(search["m"]);
    return Number.isInteger(m) && m >= 1 && m <= 12 ? { m } : {};
  },
  head: () =>
    pageHead(
      "Los 12 Módulos — LEX IA PY",
      "Funciones completas, fundamento legal y demo interactiva de cada módulo de LEX IA PY: Honorarios, Jurisprudencia, Vigilancia, Contratos, Ejecutivos y más.",
    ),
  component: Modulos,
});

function Modulos() {
  const { m } = Route.useSearch();
  const [filtro, setFiltro] = useState("");
  const actual = getModule(m);
  const visibles = MODULES.filter((x) =>
    (x.title + x.code + x.short + x.legal + x.functions.join(" "))
      .toLowerCase()
      .includes(filtro.toLowerCase()),
  );
  const fuente = getSource(actual.source);

  return (
    <section className="pt-6">
      <SectionTitle
        kicker="Módulos LEX IA"
        title="Los 12 Módulos, sin omitir ninguno"
        sub="Cada Módulo tiene su lista completa de funciones, su fundamento legal y una demo interactiva. Usa el buscador para filtrar."
      />
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
        <input
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Filtrar Módulos…"
          aria-label="Filtrar módulos"
        />
        <button type="button" className="btn btn-line" onClick={() => setFiltro("")}>
          Limpiar
        </button>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {visibles.map((x) => (
          <Link
            key={x.id}
            to="/modulos"
            search={{ m: x.id }}
            resetScroll={false}
            className="pill shrink-0"
            data-active={actual.id === x.id}
          >
            {x.id}. {x.title}
          </Link>
        ))}
        {visibles.length === 0 && (
          <p className="small text-muted-foreground">Ningún módulo coincide.</p>
        )}
      </div>

      <div className="card mt-4 p-4 sm:p-6">
        <div className="flex flex-wrap justify-between gap-3">
          <div>
            <p className="text-[12px] font-extrabold tracking-widest text-kicker">
              MÓDULO {actual.id} DE 12
            </p>
            <h2 className="font-display mt-1 text-3xl font-bold text-navy">{actual.code}</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">{actual.short}</p>
          </div>
          <span className="chip h-fit">En funcionamiento</span>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div>
            <h3 className="font-bold">Funciones completas</h3>
            <ul className="small mt-2 space-y-1.5">
              {actual.functions.map((f) => (
                <li key={f} className="flex gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="rounded-xl bg-tint-blue p-4">
              <p className="font-bold">Fundamento legal</p>
              <p className="small mt-1 leading-relaxed">{actual.legal}</p>
            </div>
            <div className="mt-3 rounded-xl border p-4">
              <p className="font-bold">Fuente oficial que usa este Módulo</p>
              <p className="small mt-1">{fuente.name}</p>
              <a
                className="small break-all font-bold text-link underline"
                href={fuente.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {fuente.url} ↗
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ModuleDemo key={actual.id} id={actual.id} />
      </div>
    </section>
  );
}
