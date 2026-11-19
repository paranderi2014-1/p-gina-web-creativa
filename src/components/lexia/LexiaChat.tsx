import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import type { UIMessage, ChatStatus } from "ai";
import { ArrowUp, BookOpen, ExternalLink, Plus, ShieldCheck } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageAction,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Tool, ToolHeader, ToolContent } from "@/components/ai-elements/tool";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { createThread } from "@/lib/lexia-chat.functions";
import { isOfficialUrl, streamEventSchema } from "@/lib/lexia-chat";
import { SOURCES } from "@/lib/lexia-data";
import { useLexiaAuth } from "./AuthProvider";
import emblem from "@/assets/lexia-emblem.jpg";
import { Copy } from "lucide-react";

export function LexiaChat({
  threadId,
  initialMessages = [],
}: {
  threadId?: string;
  initialMessages?: UIMessage[];
}) {
  const [messages, setMessages] = useState<UIMessage[]>(initialMessages);
  const [status, setStatus] = useState<ChatStatus>("ready");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { user, ready } = useLexiaAuth();
  const navigate = useNavigate();
  const create = useServerFn(createThread);
  const queryClient = useQueryClient();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const abort = useRef<AbortController | null>(null);
  const sendRef = useRef<((question: string) => Promise<void>) | null>(null);
  const busy = status === "submitted" || status === "streaming";
  useEffect(() => {
    textarea.current?.focus({ preventScroll: true });
    return () => abort.current?.abort();
  }, []);
  const send = async (question: string) => {
    if (!user || busy || !question.trim()) return;
    setError("");
    if (!threadId) {
      setStatus("submitted");
      try {
        const thread = await create({ data: { title: question.slice(0, 150) } });
        sessionStorage.setItem(`lexia-pending-${thread.id}`, question);
        await queryClient.invalidateQueries({ queryKey: ["lexia-threads"] });
        await navigate({ to: "/asistente/$threadId", params: { threadId: thread.id } });
      } catch {
        setError("No se pudo crear la conversación.");
        setStatus("error");
      }
      return;
    }
    const assistantId = crypto.randomUUID();
    setMessages((old) => [
      ...old,
      { id: crypto.randomUUID(), role: "user", parts: [{ type: "text", text: question }] },
      { id: assistantId, role: "assistant", parts: [] },
    ]);
    setInput("");
    setStatus("submitted");
    textarea.current?.focus();
    const control = new AbortController();
    abort.current = control;
    let text = "";
    const sources = new Map<string, string>();
    let toolState: "input-available" | "output-available" | "output-error" = "input-available";
    const update = () => {
      const toolBase = {
        type: "dynamic-tool" as const,
        toolName: "investigacion-oficial",
        toolCallId: assistantId,
        input: { fuentes: SOURCES.map((s) => s.name) },
      };
      const tool: UIMessage["parts"][number] =
        toolState === "output-available"
          ? { ...toolBase, state: "output-available", output: { fuentes: [...sources.keys()] } }
          : toolState === "output-error"
            ? { ...toolBase, state: "output-error", errorText: "Investigación no completada." }
            : { ...toolBase, state: "input-available" };
      setMessages((old) =>
        old.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                parts: [
                  tool,
                  { type: "text", text },
                  ...[...sources].map(([url, title], i) => ({
                    type: "source-url" as const,
                    sourceId: String(i),
                    url,
                    title,
                  })),
                ],
              }
            : m,
        ),
      );
    };
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) throw new Error("Iniciá sesión para continuar.");
      const response = await fetch("/api/lexia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify({ threadId, question }),
        signal: control.signal,
      });
      if (!response.ok || !response.body)
        throw new Error("No pude iniciar la investigación. Revisá tu sesión.");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let doneReceived = false;
      while (true) {
        const result = await reader.read();
        if (result.done) break;
        buffer += decoder.decode(result.value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line) continue;
          const event = streamEventSchema.parse(JSON.parse(line));
          if (event.kind === "text") {
            text += event.delta;
            setStatus("streaming");
          }
          if (event.kind === "search") toolState = event.state;
          if (event.kind === "source" && isOfficialUrl(event.url))
            sources.set(event.url, event.title);
          if (event.kind === "error") throw new Error(event.message);
          if (event.kind === "done") doneReceived = true;
          update();
        }
      }
      if (!doneReceived)
        throw new Error("La respuesta quedó incompleta; no reintenté automáticamente.");
      setStatus("ready");
      await queryClient.invalidateQueries({ queryKey: ["lexia-thread", threadId] });
    } catch (e) {
      if (control.signal.aborted) {
        setError("Consulta detenida. La respuesta parcial no se guardó.");
        setStatus("ready");
      } else {
        setError(e instanceof Error ? e.message : "No pude completar la consulta.");
        setInput(question);
        setStatus("error");
        toolState = "output-error";
        update();
      }
    } finally {
      abort.current = null;
      textarea.current?.focus({ preventScroll: true });
    }
  };
  useEffect(() => {
    sendRef.current = send;
  });
  useEffect(() => {
    if (!threadId || !user) return;
    const pending = sessionStorage.getItem(`lexia-pending-${threadId}`);
    if (!pending) return;
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      sessionStorage.removeItem(`lexia-pending-${threadId}`);
      void sendRef.current?.(pending);
    });
    return () => {
      active = false;
    };
  }, [threadId, user]);
  return (
    <section className="lexia-chat" aria-label="Chat Lexia" data-client-ready={ready}>
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <img src={emblem} alt="" width={40} height={40} className="h-10 w-10 rounded-md" />
          <div>
            <h2 className="font-display text-lg font-bold text-navy">
              Lexia{" "}
              <span className="font-sans text-xs font-normal text-muted-foreground">
                · Asistente LEX IA
              </span>
            </h2>
            <p className="flex items-center gap-1 text-xs text-success">
              <ShieldCheck size={12} /> Investigación en fuentes oficiales
            </p>
          </div>
        </div>
        {threadId && (
          <Button asChild size="icon" variant="ghost" title="Nueva conversación">
            <Link to="/asistente">
              <Plus />
              <span className="sr-only">Nueva conversación</span>
            </Link>
          </Button>
        )}
      </div>
      <Conversation className="min-h-0 flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6 p-4 sm:p-6">
          {messages.length === 0 && (
            <div className="flex min-h-56 flex-col items-center justify-center text-center sm:min-h-72">
              <img
                src={emblem}
                alt="Emblema de Lexia"
                width={68}
                height={68}
                className="mb-5 h-16 w-16 rounded-md"
              />
              <p className="text-xs font-bold uppercase tracking-widest text-kicker">
                Derecho paraguayo · www.lexiapy.com
              </p>
              <h1 className="font-display mt-3 text-3xl font-semibold text-navy">
                ¿Qué necesitás resolver?
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Consultas, normas y procedimientos, con fundamentos verificables y supervisión
                humana.
              </p>
              <div className="mt-6 grid w-full gap-2 sm:grid-cols-2">
                {[
                  "¿Qué establece el Código del Trabajo sobre despido sin causa?",
                  "¿Qué ley regula los contratos de alquiler en Paraguay?",
                  "¿Cómo se regulan los honorarios judiciales?",
                  "¿Cómo se solicita asistencia alimenticia?",
                ].map((q) => (
                  <Button
                    key={q}
                    variant="outline"
                    className="h-auto min-h-12 whitespace-normal text-left text-xs"
                    onClick={() => {
                      setInput(q);
                      textarea.current?.focus();
                    }}
                  >
                    <BookOpen className="shrink-0" />
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent
                className={
                  m.role === "user"
                    ? "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground"
                    : "w-full"
                }
              >
                {m.parts.map((part, i) => {
                  if (part.type === "text")
                    return (
                      <MessageResponse key={i} isAnimating={busy && m.id === messages.at(-1)?.id}>
                        {part.text}
                      </MessageResponse>
                    );
                  if (part.type === "dynamic-tool")
                    return (
                      <Tool key={i} defaultOpen={false}>
                        <ToolHeader
                          type="dynamic-tool"
                          toolName="investigacion-oficial"
                          title="Investigación oficial"
                          state={part.state}
                        />
                        <ToolContent>
                          <p className="text-xs text-muted-foreground">
                            BACN · Poder Judicial · CSJ · Legislación y jurisprudencia paraguayas
                          </p>
                        </ToolContent>
                      </Tool>
                    );
                  if (part.type === "source-url" && isOfficialUrl(part.url))
                    return (
                      <a
                        key={i}
                        href={part.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 break-words text-xs font-semibold text-link underline"
                      >
                        <ExternalLink size={13} className="shrink-0" />
                        {part.title ?? part.url}
                      </a>
                    );
                  return null;
                })}
              </MessageContent>
              {m.role === "assistant" && m.parts.some((p) => p.type === "text" && p.text) && (
                <MessageAction
                  tooltip="Copiar respuesta"
                  label="Copiar respuesta"
                  onClick={() =>
                    void navigator.clipboard.writeText(
                      m.parts
                        .filter((p) => p.type === "text")
                        .map((p) => p.text)
                        .join("\n"),
                    )
                  }
                >
                  <Copy />
                </MessageAction>
              )}
            </Message>
          ))}
          {status === "submitted" && (
            <Shimmer className="text-sm">Investigando legislación paraguaya…</Shimmer>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="mx-auto w-full max-w-3xl px-4 pb-4 sm:px-6">
        {error && (
          <p role="alert" className="mb-2 text-sm text-destructive">
            {error}
          </p>
        )}
        {!user && (
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
            <span className="text-xs text-muted-foreground">
              Iniciá sesión para consultar y guardar tus conversaciones.
            </span>
            <Button asChild size="sm">
              <Link to="/auth">Ingresar a mi cuenta</Link>
            </Button>
          </div>
        )}
        <PromptInput onSubmit={({ text }) => send(text)} className="lexia-composer">
          <PromptInputTextarea
            ref={textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Tu consulta a Lexia"
            placeholder="Escribí tu consulta jurídica, sin datos identificatorios…"
            disabled={busy}
          />
          <PromptInputFooter>
            <span className="text-[10px] text-muted-foreground">
              Paraguay · Fuentes verificables
            </span>
            <PromptInputSubmit
              status={status}
              aria-label={busy ? "Detener consulta" : "Enviar consulta"}
              title={busy ? "Detener consulta" : "Enviar consulta"}
              disabled={!user || (!busy && !input.trim())}
              onStop={() => abort.current?.abort()}
            >
              {!busy && <ArrowUp />}
            </PromptInputSubmit>
          </PromptInputFooter>
        </PromptInput>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          Lexia puede cometer errores. Verificá las citas y la vigencia con un profesional.
        </p>
      </div>
    </section>
  );
}
