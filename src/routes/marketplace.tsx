import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/lexia/ServicePage";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/marketplace")({
  head: () =>
    pageHead(
      "Marketplace LEX IA — Recursos y servicios",
      "Catálogo e integraciones profesionales de LEX IA PY, sin productos ni proveedores ficticios, en www.lexiapy.com.",
    ),
  component: () => <ServicePage slug="marketplace" />,
});
