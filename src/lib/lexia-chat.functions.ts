import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { chatPartsSchema } from "./lexia-chat";

export const listThreads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("lexia_threads")
      .select("id,title,created_at")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error("No se pudo cargar el historial.");
    return data;
  });
export const createThread = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ title: z.string().min(1).max(150) }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("lexia_threads")
      .insert({ user_id: context.userId, title: data.title })
      .select("id")
      .single();
    if (error || !row) throw new Error("No se pudo crear la conversación.");
    return row;
  });
export const getThread = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: thread, error } = await context.supabase
      .from("lexia_threads")
      .select("id,title")
      .eq("id", data.id)
      .eq("user_id", context.userId)
      .single();
    if (error || !thread) throw new Error("Conversación no disponible.");
    const { data: rows, error: messageError } = await context.supabase
      .from("lexia_messages")
      .select("id,role,parts")
      .eq("thread_id", data.id)
      .order("created_at", { ascending: true })
      .range(0, 9999);
    if (messageError) throw new Error("No se pudieron cargar los mensajes.");
    return {
      thread,
      messages: rows.map((row) => ({
        id: row.id,
        role: z.enum(["user", "assistant"]).parse(row.role),
        parts: chatPartsSchema.parse(row.parts),
      })),
    };
  });
export const deleteThread = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("lexia_threads")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    if (error) throw new Error("No se pudo borrar la conversación.");
    return { ok: true };
  });
export const threadsOptions = () =>
  queryOptions({ queryKey: ["lexia-threads"], queryFn: () => listThreads() });
export const threadOptions = (id: string) =>
  queryOptions({ queryKey: ["lexia-thread", id], queryFn: () => getThread({ data: { id } }) });
