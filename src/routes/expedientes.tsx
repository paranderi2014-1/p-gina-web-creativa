import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/lexia/ServicePage";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/expedientes")({
  head: () =>
    pageHead(
      "Expedientes LEX IA — Seguimiento judicial",
      "Casos, cronología, personas, documentos y tareas con acceso a las fuentes de la CSJ en www.lexiapy.com.",
    ),
  component: () => <ServicePage slug="expedientes" />,
});
