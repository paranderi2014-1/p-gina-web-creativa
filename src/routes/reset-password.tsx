import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { pageHead } from "@/lib/seo";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/reset-password")({
  head: () =>
    pageHead(
      "Recuperar contraseña — LEX IA PY",
      "Restablecé el acceso a tu cuenta privada de www.lexiapy.com.",
    ),
  component: Reset,
});
function Reset() {
  const [recovery, setRecovery] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    setRecovery(window.location.hash.includes("type=recovery"));
  }, []);
  return (
    <section className="mx-auto max-w-md py-12">
      <h1 className="font-display text-3xl font-bold text-navy">Nueva contraseña LEX IA</h1>
      {recovery ? (
        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (password !== confirm) {
              setMessage("Las contraseñas no coinciden.");
              return;
            }
            setBusy(true);
            const { error } = await supabase.auth.updateUser({ password });
            setMessage(
              error
                ? "El enlace no es válido o venció. Solicitá otro correo de recuperación."
                : "Contraseña actualizada.",
            );
            setBusy(false);
          }}
        >
          <label className="field">
            Nueva contraseña
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="field">
            Confirmar contraseña
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>
          <Button type="submit" disabled={busy}>
            Guardar contraseña
          </Button>
        </form>
      ) : (
        <p className="mt-5 text-sm">Abrí esta página desde el correo de recuperación.</p>
      )}
      {message && (
        <p role="status" className="mt-4 text-sm">
          {message}
        </p>
      )}
      <Link to="/auth" className="mt-6 block text-link underline">
        Ingresar a mi cuenta
      </Link>
    </section>
  );
}
