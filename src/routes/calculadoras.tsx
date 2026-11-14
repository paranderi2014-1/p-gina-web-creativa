import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { SectionTitle } from "@/components/lexia/shared";
import { ComplianceDemo, EjecutivosDemo, HonorariosDemo } from "@/components/lexia/demos";

export const Route = createFileRoute("/calculadoras")({
  head: () =>
    pageHead(
      "Calculadoras legales — LEX IA PY",
      "Calcula honorarios (Ley 1376/88), liquidación laboral, intereses de juicio ejecutivo y multas MTESS con el artículo aplicable y el jornal vigente.",
    ),
  component: Calculadoras,
});

function Calculadoras() {
  return (
    <section className="pt-6">
      <SectionTitle
        kicker="Calculadoras"
        title="Calcula en vivo, con fundamento y fuente"
        sub="Honorarios, liquidación laboral, intereses ejecutivos y multas MTESS. Cada resultado muestra el artículo aplicable."
      />
      <div className="mt-6 space-y-5">
        <HonorariosDemo />
        <EjecutivosDemo />
        <ComplianceDemo />
      </div>
    </section>
  );
}
