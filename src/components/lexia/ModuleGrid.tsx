import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { LexModule } from "@/lib/lexia-data";
import { MODULE_ICONS } from "./shared";

export function ModuleGrid({ modules }: { modules: LexModule[] }) {
  if (modules.length === 0) {
    return (
      <p className="small mt-6 rounded-xl bg-tint-warm p-4">
        Ningún módulo coincide con esa búsqueda.
      </p>
    );
  }
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {modules.map((m) => {
        const Icon = MODULE_ICONS[m.icon];
        return (
          <article key={m.id} className="card flex flex-col p-4 transition-shadow hover:shadow-lg">
            <div className="flex justify-between">
              <span
                className="grid h-11 w-11 place-items-center rounded-xl text-navy-foreground"
                style={{ background: `var(--module-${m.id})` }}
              >
                <Icon size={20} />
              </span>
              <span className="text-[12px] font-extrabold text-muted-foreground">
                MÓDULO {String(m.id).padStart(2, "0")}/12
              </span>
            </div>
            <h3 className="mt-3 font-bold leading-tight">{m.code}</h3>
            <p className="small mt-1 flex-1 text-muted-foreground">{m.short}</p>
            <Link
              to="/modulos"
              search={{ m: m.id }}
              className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-link"
            >
              Probar en vivo <ArrowRight size={15} />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
