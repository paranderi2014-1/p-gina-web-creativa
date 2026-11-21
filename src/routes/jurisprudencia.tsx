import { createFileRoute } from "@tanstack/react-router";
import { csjOptions } from "@/lib/lexia-legal.functions";
import { csjSearchSchema } from "@/lib/lexia-legal";
import { pageHead } from "@/lib/seo";
import { SectionTitle } from "@/components/lexia/shared";
import { JurisprudenciaDemo } from "@/components/lexia/demos";

export const Route = createFileRoute("/jurisprudencia")({
  head: () =>
    pageHead(
      "Jurisprudencia CSJ con fuente trazable — LEX IA PY",
      "Busca fallos de la Corte Suprema de Justicia por sala, materia y magistrado, y consulta a Lexia con investigación oficial y fuentes citadas.",
    ),
  loader: ({ context }) => context.queryClient.ensureQueryData(csjOptions(csjSearchSchema.parse({}))),
  component: Jurisprudencia,
});

function Jurisprudencia() {
  return (
    <section className="pt-6">
      <SectionTitle
        kicker="Jurisprudencia"
        title="Busca fallos con fuente trazable"
        sub="Consulta directa a la jurisprudencia oficial de la CSJ. Cada resultado conserva su ficha y documento original."
      />
      <div className="mt-6">
        <JurisprudenciaDemo />
      </div>
    </section>
  );
}
