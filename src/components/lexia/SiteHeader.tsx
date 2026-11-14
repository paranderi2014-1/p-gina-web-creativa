import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

export const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/modulos", label: "Módulos" },
  { to: "/calculadoras", label: "Calculadoras" },
  { to: "/jurisprudencia", label: "Jurisprudencia" },
  { to: "/vigilancia", label: "Vigilancia" },
  { to: "/contratos", label: "Contratos" },
  { to: "/precios", label: "Precios" },
  { to: "/fuentes", label: "Fuentes Oficiales" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-navy text-navy-foreground shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="font-display grid h-10 w-10 place-items-center rounded-xl bg-gold text-xl font-bold text-navy">
            L
          </span>
          <span>
            <span className="font-display block text-lg font-bold leading-none">LEX IA PY</span>
            <span className="block text-[11px] tracking-wider text-gold-soft">www.lexiapy.com • Paraguay</span>
          </span>
        </Link>
        <nav className="hidden gap-1 lg:flex" aria-label="Principal">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true, includeSearch: false }}
              className="rounded-full px-3 py-2 text-[13px] font-semibold hover:bg-navy-foreground/10"
              activeProps={{ className: "bg-gold text-navy hover:bg-gold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-2">
          <Link to="/precios" className="btn btn-gold btn-sm hidden sm:inline-flex">
            Probar gratis
          </Link>
          <button
            type="button"
            className="rounded-lg border border-navy-foreground/20 p-2 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="grid grid-cols-2 gap-2 px-4 pb-4 lg:hidden" aria-label="Menú móvil">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true, includeSearch: false }}
              onClick={() => setOpen(false)}
              className="rounded-xl bg-navy-foreground/10 px-3 py-2.5 text-sm font-semibold"
              activeProps={{ className: "!bg-gold text-navy" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
