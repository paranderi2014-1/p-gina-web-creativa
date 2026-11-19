import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/lexia/ServicePage";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/contacto")({
  head: () =>
    pageHead(
      "Contacto LEX IA PY — Paraguay",
      "Información institucional de LEX IA PY, Asunción, Paraguay; www.lexiapy.com.",
    ),
  component: () => <ServicePage slug="contacto" />,
});
