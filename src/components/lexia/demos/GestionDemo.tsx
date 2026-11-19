import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { DemoCard } from "../shared";

interface Cliente {
  nombre: string;
  caratula: string;
  estado: string;
  creado?: string;
}

const STORAGE_KEY = "lexia_clients";
const EJEMPLOS: Cliente[] = [
  {
    nombre: "Estudio Jurídico Asunción",
    caratula: "Ejemplo — Revisión de contratos",
    estado: "Activo",
  },
  { nombre: "Comercial Central S.A.", caratula: "Ejemplo — Auditoría MTESS", estado: "En espera" },
];

export function GestionDemo() {
  const [guardados, setGuardados] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [estado, setEstado] = useState("");
  const [nombre, setNombre] = useState("");
  const [caratula, setCaratula] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("Activo");
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setGuardados(JSON.parse(raw) as Cliente[]);
    } catch {
      setGuardados([]);
    }
    setCargando(false);
  }, []);

  const anadir = () => {
    if (!nombre.trim() || !caratula.trim()) {
      setEstado("Completa nombre y carátula para añadir el cliente.");
      return;
    }
    const nuevo: Cliente = {
      nombre: nombre.trim(),
      caratula: caratula.trim(),
      estado: nuevoEstado,
      creado: new Date().toISOString().slice(0, 10),
    };
    const lista = [nuevo, ...guardados];
    setGuardados(lista);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    setNombre("");
    setCaratula("");
    setEstado("Cliente guardado en el CRM.");
  };

  const visibles = [...guardados, ...EJEMPLOS].filter(
    (c) =>
      (filtro === "Todos" || c.estado === filtro) &&
      (c.nombre + c.caratula).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <DemoCard title="CRM Legal — clientes y casos" icon={<Users size={20} className="text-gold" />}>
      <div className="mt-4 grid gap-2 sm:grid-cols-4 sm:items-end">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del cliente"
          aria-label="Nombre del cliente"
        />
        <input
          value={caratula}
          onChange={(e) => setCaratula(e.target.value)}
          placeholder="Caso / carátula"
          aria-label="Caso / carátula"
        />
        <select
          value={nuevoEstado}
          onChange={(e) => setNuevoEstado(e.target.value)}
          aria-label="Estado"
        >
          <option>Activo</option>
          <option>En espera</option>
          <option>Cerrado</option>
        </select>
        <button type="button" className="btn btn-navy" onClick={anadir}>
          Añadir cliente en vivo
        </button>
      </div>
      {estado && (
        <p className="small mt-2 rounded-lg bg-tint-blue p-2" role="status">
          {estado}
        </p>
      )}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar cliente o caso…"
          aria-label="Buscar cliente o caso"
        />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="sm:max-w-48"
          aria-label="Filtrar por estado"
        >
          <option>Todos</option>
          <option>Activo</option>
          <option>En espera</option>
          <option>Cerrado</option>
        </select>
      </div>
      {cargando ? (
        <p className="small mt-3">Cargando clientes guardados…</p>
      ) : (
        <div className="mt-3 space-y-2">
          {visibles.map((c, i) => (
            <div
              key={`${c.nombre}-${i}`}
              className="flex flex-wrap justify-between gap-2 rounded-xl border p-3"
            >
              <div>
                <p className="font-bold">{c.nombre}</p>
                <p className="small text-muted-foreground">{c.caratula}</p>
              </div>
              <span className="chip h-fit">{c.estado}</span>
            </div>
          ))}
          {visibles.length === 0 && (
            <p className="small rounded-xl bg-tint-warm p-3">Sin resultados para ese filtro.</p>
          )}
        </div>
      )}
      <p className="small mt-3 text-muted-foreground">
        Los clientes que añades se guardan solo en este navegador. Los dos últimos son ejemplos de
        la demostración.
      </p>
    </DemoCard>
  );
}
