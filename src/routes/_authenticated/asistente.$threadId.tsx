import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { ThreadWorkspace } from "@/components/lexia/ThreadWorkspace";
import { threadOptions, threadsOptions } from "@/lib/lexia-chat.functions";
export const Route = createFileRoute("/_authenticated/asistente/$threadId")({
  head: () =>
    pageHead(
      "Conversación con Lexia — LEX IA PY",
      "Investigación jurídica paraguaya y conversaciones privadas en www.lexiapy.com.",
    ),
  loader: async ({ context, params }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(threadOptions(params.threadId)),
      context.queryClient.ensureQueryData(threadsOptions()),
    ]);
  },
  component: ThreadPage,
});
function ThreadPage() {
  const { threadId } = Route.useParams();
  return <ThreadWorkspace id={threadId} />;
}
