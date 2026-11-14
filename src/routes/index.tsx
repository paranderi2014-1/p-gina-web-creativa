import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Scale, Search } from "lucide-react";
import { JORNAL_MINIMO, formatGs } from "@/lib/lexia-calc";
import { LEGISLACION_CITADA, MODULES } from "@/lib/lexia-data";
import { pageHead } from "@/lib/seo";
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
      <section className="grid items-center gap-6 pt-6 sm:pt-10 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <span className="chip border border-gold-soft !bg-card">Asunción, Paraguay • www.lexiapy.com</span>
          <h1 className="font-display mt-4 text-[clamp(38px,7vw,68px)] font-bold leading-[.95] text-navy">
            Tecnología justa
            <br />
            para el derecho
            <br />
            <span className="text-kicker">paraguayo.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            12 Módulos en funcionamiento. Precisión, confidencialidad y control, con supervisión humana primero.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/precios" className="btn btn-gold">
              Probar gratis <ArrowRight size={16} />
            </Link>
            <Link to="/modulos" className="btn btn-navy">
              Ver los 12 Módulos
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="chip">✓ Supervisión humana primero</span>
            <span className="chip">✓ Fuentes verificables</span>
            <span className="chip">✓ Ley N° 7593/2025</span>
          </div>
        </div>

        <div className="card !border-navy bg-navy p-5 text-navy-foreground">
          <p className="text-[12px] font-bold tracking-widest text-gold">ESTADO EN VIVO — DEMOSTRACIÓN</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              ["12", "Módulos en funcionamiento"],
              ["+3.000", "Fallos en la base"],
              ["3×", "Monitoreo CSJ al día"],
            ].map(([k, l]) => (
              <div key={l} className="min-w-0">
                <p className="kpi">{k}</p>
                <p className="mt-1 break-words text-[11px] leading-tight opacity-80">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-navy-foreground/10 p-4">
            <p className="flex gap-2 font-bold">
              <Scale size={18} /> Honorarios, hoy
            </p>
            <p className="small mt-1 opacity-90">
              Jornal mínimo vigente: <b>{formatGs(JORNAL_MINIMO)}</b> • Res. MTESS N° 670/2026, desde el 01/01/2026.
            </p>
            <Link to="/calculadoras" className="btn btn-gold btn-sm mt-3">
              Calcular ahora
            </Link>
          </div>
          <p className="small mt-3 opacity-75">
            Todos los resultados de esta vista previa son de demostración y se verifican en la fuente oficial
            correspondiente.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-4 text-muted-foreground" size={18} />
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
        <p className="text-[12px] font-extrabold uppercase tracking-[.18em] text-kicker">Los 12 Módulos</p>
        <h2 className="font-display mt-2 text-[clamp(28px,5vw,44px)] font-bold leading-[1.05] text-navy">
          Todo el estudio, en una sola plataforma
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Elige un Módulo para ver sus funciones, su fundamento legal y su demo en vivo.
        </p>
        <ModuleGrid modules={filtrados} />
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
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
        <div className="card p-5">
          <h2 className="text-xl font-bold">Legislación citada en toda la web</h2>
          <p className="small mt-3 leading-relaxed text-muted-foreground">{LEGISLACION_CITADA}</p>
          <Link to="/fuentes" className="btn btn-line mt-4">
            Ver Fuentes Oficiales en Vivo
          </Link>
        </div>
      </section>
    </>
  );
}
