import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import {
  JORNAL_MINIMO,
  calcularMulta,
  formatGs,
  type Gravedad,
  type TamanoEmpresa,
} from "@/lib/lexia-calc";
import { CheckItem, DemoCard, ProgressBar, SourceLink, toggleIn } from "../shared";

const CHECKLIST = [
  "Contratos firmados y archivados",
  "Planillas y salarios al día",
  "Horario y horas extras registrados",
  "Seguridad y salud en el trabajo",
  "Registros ante MTESS actualizados",
  "Política de datos — Ley 7593/2025",
];

export function ComplianceDemo() {
  const [infraccion, setInfraccion] = useState("Falta de registro laboral");
  const [gravedad, setGravedad] = useState<Gravedad>("Media");
  const [tamano, setTamano] = useState<TamanoEmpresa>("Pequeña");
  const [marcados, setMarcados] = useState([CHECKLIST[0]]);
  const multa = calcularMulta(gravedad, tamano);
  const avance = (marcados.length / CHECKLIST.length) * 100;

  return (
    <DemoCard
      title="Compliance MTESS — multa y checklist"
      icon={<ShieldCheck size={20} className="text-gold" />}
    >
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="field">
          Tipo de infracción
          <select value={infraccion} onChange={(e) => setInfraccion(e.target.value)}>
            <option>Falta de registro laboral</option>
            <option>Horas extras sin pago</option>
            <option>Falta de seguridad en el trabajo</option>
            <option>Documentación incompleta</option>
          </select>
        </label>
        <label className="field">
          Gravedad
          <select value={gravedad} onChange={(e) => setGravedad(e.target.value as Gravedad)}>
            <option>Leve</option>
            <option>Media</option>
            <option>Grave</option>
          </select>
        </label>
        <label className="field">
          Tamaño de empresa
          <select value={tamano} onChange={(e) => setTamano(e.target.value as TamanoEmpresa)}>
            <option>Pequeña</option>
            <option>Mediana</option>
            <option>Grande</option>
          </select>
        </label>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-tint-warm p-4">
          <p className="small">Multa estimada — {infraccion}</p>
          <p className="text-2xl font-extrabold">
            {multa.jornales} jornales • {formatGs(multa.monto)}
          </p>
          <p className="small">Decreto N° 1989/24. Jornal {formatGs(JORNAL_MINIMO)}.</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="font-bold">Checklist de auditoría</p>
          <p className="small">
            {marcados.length} de {CHECKLIST.length} • {Math.round(avance)}% de avance
          </p>
          <ProgressBar value={avance} />
        </div>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {CHECKLIST.map((c) => (
          <CheckItem
            key={c}
            label={c}
            checked={marcados.includes(c)}
            onChange={() => setMarcados((l) => toggleIn(l, c))}
          />
        ))}
      </div>
      <div className="mt-3">
        <SourceLink idx={7} />
      </div>
    </DemoCard>
  );
}
