import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/lexia/ServicePage";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/avanzadas")({
  head: () =>
    pageHead(
      "Herramientas avanzadas LEX IA — Paraguay",
      "Transcripción, vigilancia, firma, agentes, diagnóstico IA, seguridad, Marketplace y API en www.lexiapy.com.",
    ),
  component: () => <ServicePage slug="avanzadas" />,
});
