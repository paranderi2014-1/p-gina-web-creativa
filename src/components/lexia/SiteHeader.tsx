import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  Menu,
  X,
  Home,
  MessageSquare,
  FileText,
  Calculator,
  Gavel,
  Eye,
  Folder,
  Users,
  Mic,
  Settings2,
  BookOpen,
  Store,
  CreditCard,
  Mail,
  ExternalLink,
  LogOut,
  Grid2X2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLexiaAuth } from "./AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import emblem from "@/assets/lexia-emblem.jpg";
export const NAV = [
  { to: "/", label: "Inicio", icon: Home, group: "PLATAFORMA" },
  { to: "/asistente", label: "Asistente Lexia · LEX IA", icon: MessageSquare },
  { to: "/documentos", label: "Documentos LEX IA", icon: FileText },
  { to: "/jurisprudencia", label: "Legislación y jurisprudencia", icon: Gavel },
  { to: "/calculadoras", label: "Calculadoras y PDF LEX IA", icon: Calculator },
  { to: "/modulos", label: "Los 12 módulos LEX IA", icon: Grid2X2 },
  { to: "/expedientes", label: "Expedientes LEX IA", icon: Folder, group: "ENTORNO PROFESIONAL" },
  { to: "/gestion", label: "Gestión profesional LEX IA", icon: Users },
  { to: "/lexia-live", label: "Lexia Live · Voz LEX IA", icon: Mic },
  { to: "/avanzadas", label: "Herramientas avanzadas", icon: Settings2 },
  { to: "/vigilancia", label: "Vigilancia LEX IA", icon: Eye },
  { to: "/contratos", label: "Contratos LEX IA", icon: FileText },
  { to: "/academia", label: "Academia LEX IA", icon: BookOpen, group: "RECURSOS" },
  { to: "/marketplace", label: "Marketplace LEX IA", icon: Store },
  { to: "/precios", label: "Planes y precios", icon: CreditCard },
  { to: "/fuentes", label: "Fuentes oficiales", icon: ExternalLink },
  { to: "/contacto", label: "Contacto LEX IA", icon: Mail },
  { to: "/admin", label: "Administración LEX IA", icon: ShieldCheck },
] as const;
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("general");
  const { user } = useLexiaAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return (
    <>
      <header className="lexia-topbar">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </Button>
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <img
            src={emblem}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-md lg:hidden"
          />
          <span className="font-display text-base font-bold text-navy">LEX IA PY</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            / Derecho paraguayo
          </span>
        </Link>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {user ? (
            <Button
              variant="ghost"
              size="icon"
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
              onClick={async () => {
                await queryClient.cancelQueries();
                queryClient.clear();
                await supabase.auth.signOut();
                await navigate({ to: "/auth", replace: true });
              }}
            >
              <LogOut />
            </Button>
          ) : (
            <Button asChild size="sm" variant="outline">
              <Link to="/auth">Ingresar</Link>
            </Button>
          )}
        </div>
      </header>
      {open && (
        <Button
          className="lexia-menu-overlay"
          variant="ghost"
          aria-label="Cerrar menú lateral"
          onClick={() => setOpen(false)}
        />
      )}
      <aside className={`lexia-sidebar ${open ? "is-open" : ""}`}>
        <Link to="/" className="flex items-center gap-3 px-2 pb-6" onClick={() => setOpen(false)}>
          <img
            src={emblem}
            alt="LEX IA PY"
            width={44}
            height={44}
            className="h-11 w-11 rounded-md"
          />
          <span>
            <b className="font-display block text-xl">LEX IA PY</b>
            <span className="text-[10px] text-gold-soft">www.lexiapy.com · Paraguay</span>
          </span>
        </Link>
        <label className="mb-4 block rounded-md border border-navy-foreground/20 p-3 text-[10px] uppercase text-navy-foreground/75">
          Vista de trabajo
          <select
            aria-label="Vista de trabajo"
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="mt-2"
          >
            <option value="general">General</option>
            <option value="profesional">Profesional</option>
          </select>
        </label>
        <nav
          aria-label="Principal"
          className={view === "profesional" ? "professional-view" : "general-view"}
        >
          {NAV.map((n) => (
            <div key={n.to}>
              {"group" in n && (
                <p className="mb-2 mt-4 px-3 text-[9px] font-semibold tracking-widest text-navy-foreground/55">
                  {n.group}
                </p>
              )}
              <Link
                to={n.to}
                activeOptions={{ exact: n.to === "/", includeSearch: false }}
                onClick={() => setOpen(false)}
                className="lexia-nav-link"
                activeProps={{ className: "active" }}
              >
                <n.icon size={17} className="shrink-0 text-gold" />
                <span>{n.label}</span>
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-6 border-t border-navy-foreground/20 px-3 pt-4 text-[10px] text-navy-foreground/70">
          <p className="text-gold-soft">Supervisión humana primero</p>
          <p className="mt-1">Legislación paraguaya · Fuentes oficiales</p>
          <Link
            to="/precios"
            className="mt-3 block font-semibold text-gold"
            onClick={() => setOpen(false)}
          >
            Probar gratis →
          </Link>
        </div>
      </aside>
    </>
  );
}
