import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { SectionTitle } from "@/components/lexia/shared";
import { VigilanciaDemo } from "@/components/lexia/demos";

export const Route = createFileRoute("/vigilancia")({
  head: () =>
    pageHead(
      "Vigilancia de expedientes CSJ — LEX IA PY",
      "Monitoreo de expedientes de la CSJ a las 7:01, 9:30 y 13:01 con alertas por WhatsApp y correo. Prueba 14 días hasta 10 expedientes.",
    ),
  component: Vigilancia,
});

const PASOS = [
  "Vinculas tus credenciales CSJ con cifrado AES-256.",
  "Importas por matrícula o das de alta expedientes manualmente.",
  "Recibes alertas por WhatsApp o correo cuando hay una nueva actuación.",
  "Descargas la providencia y lees el resumen IA, siempre con revisión humana.",
];

function Vigilancia() {
  return (
    <section className="pt-6">
      <SectionTitle
        kicker="Vigilancia CSJ"
        title="Tus expedientes, vigilados tres veces al día"
        sub="Monitoreo 7:01, 9:30 y 13:01. Prueba 14 días hasta 10 expedientes."
      />
      <div className="mt-6">
        <VigilanciaDemo />
      </div>
      <div className="card mt-4 p-5">
        <h2 className="font-bold">Cómo funciona</h2>
        <ol className="small mt-2 list-decimal space-y-1 pl-5">
          {PASOS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
