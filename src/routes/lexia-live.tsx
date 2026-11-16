import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/lexia/ServicePage";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/lexia-live")({ head: () => pageHead("Lexia Live — Voz en vivo LEX IA", "Servicios de voz para audiencias y reuniones; alcance y privacidad del módulo Lexia Live en www.lexiapy.com."), component: () => <ServicePage slug="lexia-live" /> });