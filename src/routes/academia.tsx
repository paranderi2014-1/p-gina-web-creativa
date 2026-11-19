import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/lexia/ServicePage";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/academia")({
  head: () =>
    pageHead(
      "Academia LEX IA — Aprendizaje jurídico paraguayo",
      "Guías, lecciones y evaluaciones de derecho paraguayo y academia profesional en www.lexiapy.com.",
    ),
  component: () => <ServicePage slug="academia" />,
});
