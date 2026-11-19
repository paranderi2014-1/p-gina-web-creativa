import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/lexia/ServicePage";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/documentos")({
  head: () =>
    pageHead(
      "Documentos LEX IA — Paraguay",
      "Contratos, notas, cartas, escritos, dictámenes, PDF y revisión jurídica con fuentes oficiales paraguayas en www.lexiapy.com.",
    ),
  component: () => <ServicePage slug="documentos" />,
});
