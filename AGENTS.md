<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- LEX IA PY site: each section (Inicio, Módulos, Calculadoras, Jurisprudencia, Vigilancia, Contratos, Precios, Fuentes) is its own route; the selected module lives in the `/modulos?m=N` search param so module links are shareable.
- Legal/calculation rules (honorarios, liquidación, intereses, multas, predicción, anonimización) live as pure functions in `src/lib/lexia-calc.ts` with tests in `lexia-calc.test.ts`; demos only render them, so rules change in one place.
- Site content (modules, official sources, demo fallos/documentos, FAQ) lives in `src/lib/lexia-data.ts`; pages read from it instead of hardcoding copy.
- The CRM demo stores added clients only in the visitor's browser; account-backed persistence is reserved for private AI conversations.
- AI conversations are account-owned threads on dedicated URLs; persist messages once after successful streaming and enforce ownership with RLS and endpoint authentication so histories cannot cross accounts.
- The chat uses AI Elements primitives and the Gateway Responses surface with domain-restricted official research; raw streaming stays in a server route while history operations use authenticated server functions.
- Additional service inventory is centralized in `src/lib/lexia-services.ts` with separate leaf routes; preserve existing demos and explicitly distinguish inactive external services from connected capabilities.
- The shared root shell wraps all pages with the account provider and platform sidebar; keep all navigation destinations registered in the same change.
