import { createFileRoute } from "@tanstack/react-router";
import { SOURCES } from "@/lib/lexia-data";
import { pageHead } from "@/lib/seo";
import { SectionTitle } from "@/components/lexia/shared";

export const Route = createFileRoute("/fuentes")({
  head: () =>
    pageHead(
      "Fuentes oficiales — LEX IA PY",
      "Accesos directos a BACN, Poder Judicial y los sistemas de la Corte Suprema de Justicia del Paraguay para verificar cada resultado.",
    ),
  component: Fuentes,
});

function Fuentes() {
  return (
    <section className="pt-6">
      <SectionTitle
        kicker="Fuentes Oficiales en Vivo"
        title="Verifica siempre en la fuente oficial"
        sub="Cada tarjeta abre en una pestaña nueva. LEX IA PY cita y resume; la fuente oficial manda."
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SOURCES.map((s, i) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card block p-4 transition-shadow hover:shadow-lg"
          >
            <span className="chip">{String(i + 1).padStart(2, "0")} • Oficial</span>
            <h2 className="mt-3 font-bold leading-tight">{s.name}</h2>
            <p className="small mt-2 leading-relaxed text-muted-foreground">{s.desc}</p>
            <p className="small mt-3">
              <b>Lo usa:</b> {s.uses}
            </p>
            <p className="small mt-3 font-bold text-link underline">Abrir fuente ↗</p>
          </a>
        ))}
      </div>
    </section>
  );
}
