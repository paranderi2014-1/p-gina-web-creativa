import { useState } from "react";
import { Bell, Eye, Sparkles } from "lucide-react";
import { DemoCard, SourceLink } from "../shared";

const EXPEDIENTES = [
  { n: "1234/2024 — Cobro de guaraníes", j: "Juzgado Civil 4° Turno, Asunción", e: "Activo" },
  { n: "118/2025 — Despido y liquidación", j: "Juzgado Laboral 2° Turno, Asunción", e: "Activo" },
  { n: "77/2023 — Ejecutivo pagaré", j: "Juzgado Civil 1° Turno, San Lorenzo", e: "Archivado" },
];

export function VigilanciaDemo() {
  const [alertas, setAlertas] = useState([
    { t: "09:30", msg: "Expediente 1234/2024 — Nueva providencia disponible." },
    { t: "07:01", msg: "Expediente 118/2025 — Se ordenó traslado por 3 días." },
  ]);
  const [nuevas, setNuevas] = useState(2);

  const simular = () => {
    const t = new Date().toLocaleTimeString("es-PY", { hour: "2-digit", minute: "2-digit" });
    setAlertas((a) => [
      {
        t,
        msg: "Expediente 1234/2024 — Simulación en vivo: nueva actuación detectada y resumen IA generado.",
      },
      ...a,
    ]);
    setNuevas((n) => n + 1);
  };

  return (
    <DemoCard
      title="Panel de Vigilancia"
      icon={<Eye size={20} className="text-gold" />}
      aside={
        <span className="chip">
          <Bell size={13} /> {nuevas} notificaciones nuevas
        </span>
      }
    >
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {EXPEDIENTES.map((x) => (
          <div key={x.n} className="rounded-xl border p-4">
            <p className="font-bold">{x.n}</p>
            <p className="small text-muted-foreground">{x.j}</p>
            <span className="chip mt-2">{x.e}</span>
          </div>
        ))}
      </div>
      <button type="button" className="btn btn-gold mt-4" onClick={simular}>
        <Sparkles size={16} /> Simular nueva actuación en vivo
      </button>
      <div className="mt-4 space-y-2">
        {alertas.map((a, i) => (
          <div key={`${a.t}-${i}`} className="flex gap-3 rounded-xl bg-tint-green p-3">
            <Bell size={16} className="mt-0.5 shrink-0" />
            <div>
              <p className="small font-bold">{a.t}</p>
              <p className="small">{a.msg}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="small mt-3 text-muted-foreground">
        Horarios de monitoreo: 7:01 • 9:30 • 13:01. Límite: 12 consultas por minuto. La contraseña
        nunca queda en registros.
      </p>
      <div className="mt-2 flex flex-wrap gap-4">
        <SourceLink idx={2} label="Abrir CSJ Gestión" />
        <SourceLink idx={4} label="Abrir CSJ Login" />
      </div>
    </DemoCard>
  );
}
