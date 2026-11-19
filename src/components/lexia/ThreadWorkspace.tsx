import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LexiaChat } from "./LexiaChat";
import { threadOptions, threadsOptions, deleteThread } from "@/lib/lexia-chat.functions";

export function ThreadWorkspace({ id }: { id: string }) {
  const { data } = useSuspenseQuery(threadOptions(id));
  const { data: threads } = useSuspenseQuery(threadsOptions());
  const remove = useServerFn(deleteThread);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return (
    <div className="py-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase text-kicker">Consultas LEX IA</p>
          <h1 className="font-display mt-1 text-2xl font-bold text-navy break-words">
            {data.thread.title}
          </h1>
        </div>
        <Button asChild variant="outline" size="icon" title="Nueva conversación">
          <Link to="/asistente">
            <Plus />
            <span className="sr-only">Nueva conversación</span>
          </Link>
        </Button>
      </div>
      <div className="thread-workspace">
        <aside className="thread-list" aria-label="Tus conversaciones">
          <p className="mb-3 text-xs font-bold uppercase text-muted-foreground">
            Tus conversaciones
          </p>
          {threads.map((t) => (
            <div key={t.id} className="mb-1 flex items-center gap-1">
              <Link
                to="/asistente/$threadId"
                params={{ threadId: t.id }}
                className={`flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-3 text-xs ${id === t.id ? "bg-secondary font-bold" : "hover:bg-muted"}`}
              >
                <MessageSquare size={14} className="shrink-0" />
                <span className="truncate">{t.title}</span>
              </Link>
              <Button
                variant="ghost"
                size="icon-sm"
                title="Borrar conversación"
                aria-label={`Borrar ${t.title}`}
                onClick={async () => {
                  if (!window.confirm("¿Borrar esta conversación y sus mensajes?")) return;
                  try {
                    await remove({ data: { id: t.id } });
                    await queryClient.invalidateQueries({ queryKey: ["lexia-threads"] });
                    queryClient.removeQueries({ queryKey: ["lexia-thread", t.id] });
                    if (t.id === id) await navigate({ to: "/asistente" });
                  } catch {
                    toast.error("No se pudo borrar la conversación.");
                  }
                }}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </aside>
        <LexiaChat key={id} threadId={id} initialMessages={data.messages} />
      </div>
    </div>
  );
}
