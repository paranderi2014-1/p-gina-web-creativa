import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { formatGs } from "@/lib/lexia-calc";
import { FAQ } from "@/lib/lexia-data";
import { pageHead } from "@/lib/seo";
import { SectionTitle } from "@/components/lexia/shared";

export const Route = createFileRoute("/precios")({
  head: () =>
    pageHead(
      "Precios en guaraníes — LEX IA PY",
      "Honorarios Pro y Jurisprudencia Profesional a Gs. 99.000 por mes, o Miembro Fundador con acceso vitalicio a los 12 módulos por Gs. 1.290.000. IVA incluido.",
    ),
  component: Precios,
});

function Precios() {
  const [abierta, setAbierta] = useState<number | null>(0);
  return (
    <section className="pt-6">
      <SectionTitle
        kicker="Precios en guaraníes"
        title="Precios claros, con IVA incluido"
        sub="Elige el plan del estudio. Sin sorpresas: cada plan indica qué Módulo incluye."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="card flex flex-col p-5">
          <p className="font-bold">Honorarios Pro</p>
          <p className="kpi mt-2">
            {formatGs(99000)}
            <span className="text-base font-medium text-muted-foreground"> / mes</span>
          </p>
          <p className="small text-muted-foreground">IVA incluido.</p>
          <ul className="small mt-4 flex-1 space-y-2">
            {[
              "Calculadora judicial completa",
              "PDF con citas",
              "Liquidación y horas extras",
              "Historial",
            ].map((g) => (
              <li key={g}>✓ {g}</li>
            ))}
          </ul>
          <Link to="/calculadoras" className="btn btn-navy mt-5 w-full">
            Probar Honorarios
          </Link>
        </div>
        <div className="card relative flex flex-col !border-gold p-5 ring-2 ring-gold-soft">
          <span className="chip absolute -top-3 right-4 !bg-gold !text-gold-foreground">
            Más elegido
          </span>
          <p className="font-bold">Jurisprudencia Profesional</p>
          <p className="kpi mt-2">
            {formatGs(99000)}
            <span className="text-base font-medium text-muted-foreground"> / mes</span>
          </p>
          <p className="small text-muted-foreground">IVA incluido · Sin contrato anual.</p>
          <ul className="small mt-4 flex-1 space-y-2">
            {[
              "Búsqueda semántica, híbrida y exacta",
              "Chat Lexia con fuente trazable",
              "Visor PDF y “Contar el caso”",
              "Filtros por sala, año y magistrado",
            ].map((g) => (
              <li key={g}>✓ {g}</li>
            ))}
          </ul>
          <Link to="/jurisprudencia" className="btn btn-gold mt-5 w-full">
            Probar Jurisprudencia
          </Link>
        </div>
        <div className="card flex flex-col !border-navy bg-navy p-5 text-navy-foreground">
          <p className="font-bold">Miembro Fundador</p>
          <p className="kpi mt-2">{formatGs(1290000)}</p>
          <p className="small opacity-80">Pago único • Acceso vitalicio • IVA incluido.</p>
          <ul className="small mt-4 flex-1 space-y-2">
            {[
              "Acceso a los 12 Módulos",
              "Vigilancia con prueba extendida",
              "Actualizaciones de legislación",
              "Soporte prioritario",
            ].map((g) => (
              <li key={g}>✓ {g}</li>
            ))}
          </ul>
          <Link to="/modulos" className="btn btn-gold mt-5 w-full">
            Ver los 12 Módulos
          </Link>
        </div>
      </div>

      <div className="card mt-6 p-5">
        <h2 className="text-xl font-bold">Preguntas frecuentes</h2>
        <div className="mt-3 space-y-2">
          {FAQ.map(([q, a], i) => (
            <div key={q} className="rounded-xl border">
              <button
                type="button"
                className="flex w-full justify-between gap-2 p-3 text-left font-bold"
                onClick={() => setAbierta(abierta === i ? null : i)}
                aria-expanded={abierta === i}
              >
                {q}
                <span aria-hidden>{abierta === i ? "−" : "+"}</span>
              </button>
              {abierta === i && (
                <p className="small px-3 pb-3 leading-relaxed text-muted-foreground">{a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
