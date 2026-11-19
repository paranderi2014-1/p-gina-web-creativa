import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Scale, Search } from "lucide-react";
import { JORNAL_MINIMO, formatGs } from "@/lib/lexia-calc";
import { LEGISLACION_CITADA, MODULES } from "@/lib/lexia-data";
import { pageHead } from "@/lib/seo";
import { LexiaChat } from "@/components/lexia/LexiaChat";
import { HonorariosDemo } from "@/components/lexia/demos/HonorariosDemo";
import { EXTRA_SERVICES } from "@/lib/lexia-services";
import { Button } from "@/components/ui/button";
import { ModuleGrid } from "@/components/lexia/ModuleGrid";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "LEX IA PY — Tecnología justa para el derecho paraguayo",
      "12 módulos legales en funcionamiento para Paraguay: honorarios, jurisprudencia, vigilancia CSJ, contratos, ejecutivos, compliance y más. Supervisión humana primero.",
    ),
  component: Inicio,
});

const PROTOCOLO = [
  "Supervisión humana primero: ninguna salida se presenta como fallo o consejo sin revisión.",
  "Fuentes verificables: cada respuesta muestra su base legal y su enlace oficial.",
  "Datos del cliente nunca para entrenar modelos.",
  "Aislamiento por tenant y cifrado en tránsito y en reposo.",
  "Ley N° 7593/2025 — Protección de Datos Personales.",
];

function Inicio() {
  const [q, setQ] = useState("");
  const filtrados = MODULES.filter((m) =>
    (m.title + m.code + m.short + m.legal).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <div className="pt-5">
        <LexiaChat />
      </div>
      <section className="mt-8" aria-label="Honorarios LEX IA en vivo">
        <HonorariosDemo />
      </section>
      <section className="mt-8">
        <p className="text-xs font-bold uppercase text-kicker">Acceso rápido · LEX IA PY</p>
        <h2 className="font-display mt-2 text-2xl font-bold text-navy">
          Tu espacio jurídico, en un solo lugar.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tecnología justa para el derecho paraguayo. 12 módulos en funcionamiento, con supervisión
          humana primero.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              to: "/asistente",
              label: "Consultar a Lexia",
              description: "Investigación jurídica y fuentes oficiales",
            },
            {
              to: "/documentos",
              label: "Documentos LEX IA",
              description: "Contratos, notas y escritos guiados",
            },
            {
              to: "/jurisprudencia",
              label: "Legislación LEX IA",
              description: "Normas y jurisprudencia paraguayas",
            },
            {
              to: "/calculadoras",
              label: "Calculadoras LEX IA",
              description: "Honorarios, liquidación e intereses",
            },
          ].map((item) => (
            <Button
              key={item.to}
              asChild
              variant="outline"
              className="h-auto justify-start whitespace-normal p-4"
            >
              <Link to={item.to}>
                <span>
                  <b className="block">{item.label}</b>
                  <span className="mt-1 block text-xs font-normal text-muted-foreground">
                    {item.description}
                  </span>
                </span>
                <ArrowRight className="ml-auto shrink-0" />
              </Link>
            </Button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="chip">✓ Supervisión humana primero</span>
          <span className="chip">✓ Fuentes verificables</span>
          <span className="chip">✓ Ley N° 7593/2025</span>
        </div>
      </section>

      <section className="mt-8">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-4 text-muted-foreground"
            size={18}
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscador global: escribe honorarios, contratos, vigilancia, privacidad…"
            aria-label="Buscar módulos"
            className="!pl-10"
          />
        </div>
      </section>

      <section className="mt-10">
        <p className="text-[12px] font-extrabold uppercase tracking-[.18em] text-kicker">
          Los 12 Módulos
        </p>
        <h2 className="font-display mt-2 text-[clamp(28px,5vw,44px)] font-bold leading-[1.05] text-navy">
          Todo el estudio, en una sola plataforma
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Elige un Módulo para ver sus funciones, su fundamento legal y su demo en vivo.
        </p>
        <ModuleGrid modules={filtrados} />
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="border-t pt-5">
          <h2 className="text-xl font-bold">Protocolo LEX IA</h2>
          <ul className="small mt-3 space-y-2">
            {PROTOCOLO.map((p) => (
              <li key={p} className="flex gap-2">
                <CheckCircle2 size={17} className="shrink-0 text-success" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t pt-5">
          <h2 className="text-xl font-bold">Legislación citada en toda la web</h2>
          <p className="small mt-3 leading-relaxed text-muted-foreground">{LEGISLACION_CITADA}</p>
          <Link to="/fuentes" className="btn btn-line mt-4">
            Ver Fuentes Oficiales en Vivo
          </Link>
        </div>
      </section>
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-navy">
          Servicios y entorno profesional LEX IA
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {EXTRA_SERVICES.map((service) => (
            <Link
              key={service.slug}
              to={`/${service.slug}`}
              className="rounded-md border bg-card p-4"
            >
              <h3 className="font-bold">{service.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-5 border-l-2 border-gold pl-4 text-xs leading-relaxed text-muted-foreground">
          Las demostraciones anteriores se conservan. La base de 8 fallos es ilustrativa, no una
          base real de +3.000 fallos. El monitoreo CSJ de 3 consultas diarias sigue siendo
          demostrativo; no hay conexión automática ni credenciales CSJ almacenadas. Voz, firma,
          Marketplace y API requieren sus servicios externos.
        </p>
      </section>
    </>
  );
}
