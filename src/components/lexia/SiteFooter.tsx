import { Link } from "@tanstack/react-router";
import { MODULES, SOURCES } from "@/lib/lexia-data";

const SITES = [
  "www.lexiapy.com",
  "docs.lexiapy.com",
  "honorarios.lexiapy.com",
  "vigilancia.lexiapy.com",
];

export function SiteFooter() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
      <footer className="mt-12 border-t bg-navy p-5 text-navy-foreground sm:p-8">
        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-bold">LEX IA PY</p>
            <p className="small mt-2 opacity-80">
              Tecnología justa para el derecho paraguayo.
              <br />
              Asunción, Paraguay.
            </p>
            <ul className="small mt-3 space-y-1">
              {SITES.map((s) => (
                <li key={s}>
                  <a
                    className="underline"
                    href={`https://${s}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {[MODULES.slice(0, 6), MODULES.slice(6)].map((group, gi) => (
            <div key={gi}>
              <p className="font-bold">Módulos</p>
              <ul className="small mt-2 space-y-1 opacity-90">
                {group.map((m) => (
                  <li key={m.id}>
                    <Link to="/modulos" search={{ m: m.id }} className="hover:underline">
                      {m.code}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="font-bold">Fuentes Oficiales</p>
            <ul className="small mt-2 space-y-1 opacity-90">
              {SOURCES.map((s) => (
                <li key={s.url}>
                  <a
                    className="hover:underline"
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-between gap-2 border-t border-navy-foreground/15 pt-4 sm:flex-row">
          <p className="small opacity-75">© LEX IA PY — Supervisión humana primero.</p>
          <p className="small opacity-75">
            Ley N° 7593/2025 • Ley N° 1376/88 • Ley N° 213/93 • Ley N° 1183/85 • Ley N° 6380/19
          </p>
        </div>
      </footer>
    </div>
  );
}
