import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/lexia/ServicePage";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/gestion")({
  head: () =>
    pageHead(
      "Gestión profesional LEX IA — Estudio jurídico",
      "Clientes, proyectos, agenda, horas, facturación y equipo profesional en www.lexiapy.com.",
    ),
  component: () => <ServicePage slug="gestion" />,
});
