import { useState, type ReactNode } from "react";
import {
  Briefcase,
  Calculator,
  Check,
  Copy,
  ExternalLink,
  Eye,
  FileCheck,
  FileText,
  FolderSearch,
  Gavel,
  Landmark,
  Lock,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getSource, type ModuleIconKey } from "@/lib/lexia-data";

export const MODULE_ICONS: Record<ModuleIconKey, LucideIcon> = {
  calculator: Calculator,
  gavel: Gavel,
  eye: Eye,
  "file-text": FileText,
  landmark: Landmark,
  "shield-check": ShieldCheck,
  briefcase: Briefcase,
  "trending-up": TrendingUp,
  users: Users,
  "file-check": FileCheck,
  "folder-search": FolderSearch,
  lock: Lock,
};

export function SectionTitle({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[12px] font-extrabold uppercase tracking-[.18em] text-kicker">{kicker}</p>
      <h1 className="font-display mt-2 text-[clamp(28px,5vw,44px)] font-bold leading-[1.05] text-navy">
        {title}
      </h1>
      {sub && <p className="mt-3 leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function SourceLink({
  idx,
  label = "Verificar en fuente oficial",
}: {
  idx: number;
  label?: string;
}) {
  const s = getSource(idx);
  return (
    <a
      className="inline-flex items-center gap-1 text-[13px] font-bold text-link underline underline-offset-2"
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label.includes(s.name) ? label : `${label} — ${s.name}`} <ExternalLink size={13} />
    </a>
  );
}

export function DemoCard({
  title,
  icon,
  aside,
  children,
}: {
  title: string;
  icon?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="card p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          {icon}
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </div>
  );
}

export function ProgressBar({
  value,
  tone = "success",
}: {
  value: number;
  tone?: "success" | "gold";
}) {
  return (
    <div className="mt-2 h-2 overflow-hidden rounded-full bg-track">
      <div
        className={`h-full transition-all ${tone === "gold" ? "bg-gold" : "bg-success"}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function CheckItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="small flex cursor-pointer gap-2 rounded-lg border p-2">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-line btn-sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? "Copiado" : "Copiar resultado"}
    </button>
  );
}

export function toggleIn<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}
