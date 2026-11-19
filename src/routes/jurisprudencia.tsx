import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { SectionTitle } from "@/components/lexia/shared";
import { JurisprudenciaDemo } from "@/components/lexia/demos";

export const Route = createFileRoute("/jurisprudencia")({
  head: () =>
    pageHead(
      "Jurisprudencia CSJ con fuente trazable — LEX IA PY",
      "Busca fallos de la Corte Suprema de Justicia por sala, materia y magistrado, y consulta a Lexia con investigación oficial y fuentes citadas.",
    ),
  component: Jurisprudencia,
});

function Jurisprudencia() {
  return (
    <section className="pt-6">
      <SectionTitle
        kicker="Jurisprudencia"
        title="Busca fallos con fuente trazable"
        sub="Base de demostración con 8 fallos. La base completa vive en CSJ Jurisprudencia desde 1995."
      />
      <div className="mt-6">
        <JurisprudenciaDemo />
      </div>
    </section>
  );
}
