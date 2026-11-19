import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { SectionTitle } from "@/components/lexia/shared";
import { ComplianceDemo, EjecutivosDemo, HonorariosDemo } from "@/components/lexia/demos";
import { EXTRA_CALCULATORS } from "@/lib/lexia-services";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

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
      <section className="mt-8 border-t pt-5">
        <h2 className="font-display text-xl font-bold text-navy">Cálculos y PDF LEX IA</h2>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {EXTRA_CALCULATORS.map((c) => (
            <li key={c}>• {c}</li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Se conservan todas las categorías del modelo. Plazos, horas extras, asistencia alimenticia
          y herramientas PDF aún requieren su motor validado; no se presentan cifras ni documentos
          ficticios.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/asistente">Consultar fundamento con Lexia</Link>
        </Button>
      </section>
    </section>
  );
}
