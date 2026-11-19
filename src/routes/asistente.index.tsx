import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { pageHead } from "@/lib/seo";
import { LexiaChat } from "@/components/lexia/LexiaChat";
import { useLexiaAuth } from "@/components/lexia/AuthProvider";
import { threadsOptions } from "@/lib/lexia-chat.functions";
export const Route = createFileRoute("/asistente/")({
  head: () =>
    pageHead(
      "Lexia, asistente jurídico LEX IA — Paraguay",
      "Consultá a Lexia con investigación en BACN, Poder Judicial y CSJ; conservá tus conversaciones en www.lexiapy.com.",
    ),
  component: Asistente,
});
function Asistente() {
  const { user, ready } = useLexiaAuth();
  const { data: threads } = useQuery({ ...threadsOptions(), enabled: ready && !!user });
  return (
    <div className="py-5">
      <LexiaChat />
      {!!threads?.length && (
        <section className="mt-6">
          <h2 className="font-display text-xl font-bold text-navy">Tus conversaciones LEX IA</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {threads.map((t) => (
              <Link
                key={t.id}
                to="/asistente/$threadId"
                params={{ threadId: t.id }}
                className="rounded-md border bg-card p-3 text-sm hover:border-gold"
              >
                {t.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
