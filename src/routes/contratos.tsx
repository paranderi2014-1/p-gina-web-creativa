import { createFileRoute } from "@tanstack/react-router";
import { TIPOS_CONTRATO } from "@/lib/lexia-data";
import { pageHead } from "@/lib/seo";
import { SectionTitle } from "@/components/lexia/shared";
import { ContratosDemo } from "@/components/lexia/demos";

export const Route = createFileRoute("/contratos")({
  head: () =>
    pageHead(
      "Contratos laborales y de servicios — LEX IA PY",
      "Wizards de contratos laborales (Ley 213/93) y de servicios (Código Civil) con 92 cláusulas y vista previa en vivo.",
    ),
  component: Contratos,
});

function Contratos() {
  return (
    <section className="pt-6">
      <SectionTitle
        kicker="Contratos"
        title="Del wizard al documento, sin fricción"
        sub="Wizard laboral de 7 pasos y wizard de servicios de 5 pasos, resumidos aquí en 3 pasos de demostración. Sistema de 92 cláusulas."
      />
      <div className="mt-6">
        <ContratosDemo />
      </div>
      <h2 className="mt-8 font-bold">10 tipos de contrato</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {TIPOS_CONTRATO.map((t) => (
          <div key={t} className="card small p-3 font-semibold">
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}
