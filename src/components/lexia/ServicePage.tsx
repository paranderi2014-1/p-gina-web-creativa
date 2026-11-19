import { Link } from "@tanstack/react-router";
import { Check, ExternalLink } from "lucide-react";
import { EXTRA_SERVICES } from "@/lib/lexia-services";
import { getModule, getSource } from "@/lib/lexia-data";
import { SectionTitle } from "./shared";
import { Button } from "@/components/ui/button";
import { ModuleDemo } from "./demos";
import { useState } from "react";
export function ServicePage({ slug }: { slug: string }) {
  const service = EXTRA_SERVICES.find((s) => s.slug === slug);
  const [selected, setSelected] = useState<number | undefined>(service?.modules[0]);
  if (!service) return null;
  const source = getSource(service.source);
  return (
    <section className="py-6">
      <SectionTitle kicker="www.lexiapy.com" title={service.title} sub={service.description} />
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-bold text-navy">Funciones y servicios</h2>
          <ul className="mt-4 space-y-3">
            {service.functions.map((f) => (
              <li key={f} className="flex gap-2 text-sm">
                <Check size={16} className="mt-1 shrink-0 text-success" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-l-2 border-gold pl-5">
          <h2 className="font-bold">Normativa paraguaya</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {service.legal}. Su aplicación y vigencia requieren verificar el texto oficial y la
            revisión del profesional.
          </p>
          <a
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-link underline"
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {source.name}
            <ExternalLink size={14} />
          </a>
          <Button asChild variant="outline" className="mt-5">
            <Link to="/asistente">Investigar con Lexia</Link>
          </Button>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Se conserva el alcance del modelo. Las conexiones externas de voz, firma, pagos, API y
            sistemas CSJ no están activadas. Los módulos existentes mantienen sus demostraciones; no
            representan una conexión con el expediente real.
          </p>
        </div>
      </div>
      {service.modules.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            {service.modules.map((id) => (
              <Button
                key={id}
                variant={selected === id ? "default" : "outline"}
                onClick={() => setSelected(id)}
              >
                {getModule(id).code}
              </Button>
            ))}
          </div>
          {selected && (
            <div className="mt-4">
              <ModuleDemo key={selected} id={selected} />
              <Button asChild variant="link" className="mt-3">
                <Link to="/modulos" search={{ m: selected }}>
                  Ver todas las funciones de {getModule(selected).code}
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
