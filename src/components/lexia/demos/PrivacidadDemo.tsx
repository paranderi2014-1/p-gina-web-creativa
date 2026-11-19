import { useState } from "react";
import { Lock } from "lucide-react";
import { anonimizar } from "@/lib/lexia-calc";
import { DemoCard } from "../shared";

export function PrivacidadDemo() {
  const [texto, setTexto] = useState(
    "María González, cédula 3.456.789, RUC 3456789-1, trabaja en Comercial Central S.A. y su correo es maria@ejemplo.com",
  );
  const [mostrar, setMostrar] = useState(false);
  return (
    <DemoCard
      title="Anonimización local — Ley N° 7593/2025"
      icon={<Lock size={20} className="text-gold" />}
    >
      <p className="small mt-1 text-muted-foreground">
        Escribe o edita el texto. La anonimización ocurre en tu navegador, antes de enviar algo a un
        modelo externo.
      </p>
      <textarea
        rows={3}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="mt-3"
        aria-label="Texto original"
      />
      <div className="mt-3 rounded-xl bg-tint-green p-4">
        <p className="font-bold">Texto anonimizado</p>
        <p className="small mt-1 leading-relaxed">{anonimizar(texto)}</p>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" className="btn btn-navy" onClick={() => setMostrar((m) => !m)}>
          {mostrar ? "Ocultar original" : "Re-identificar (solo en el estudio)"}
        </button>
        {mostrar && (
          <span className="chip">Original visible solo en esta sesión de demostración</span>
        )}
      </div>
      {mostrar && <p className="small mt-3 rounded-xl border p-3">{texto}</p>}
      <p className="small mt-3 text-muted-foreground">
        La re-identificación controlada queda en el estudio y solo con autorización. Nunca uses
        datos reales de clientes en una demostración pública.
      </p>
    </DemoCard>
  );
}
