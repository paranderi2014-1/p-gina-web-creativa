import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useLexiaAuth } from "@/components/lexia/AuthProvider";
import { pageHead } from "@/lib/seo";
import emblem from "@/assets/lexia-emblem.jpg";
import "@lovable.dev/cloud-auth-js/styles.css";
export const Route = createFileRoute("/auth")({
  head: () =>
    pageHead(
      "Tu cuenta LEX IA PY — Acceso",
      "Ingresá para conservar tus consultas privadas con Lexia en www.lexiapy.com.",
    ),
  component: Auth,
});
function Auth() {
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const { user, ready } = useLexiaAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (ready && user) void navigate({ to: "/asistente", replace: true });
  }, [ready, user, navigate]);
  const social = async (provider: "google" | "lovable") => {
    setMessage("");
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: `${window.location.origin}/auth`,
    });
    if (result.error) setMessage("No se pudo iniciar sesión. Intentá de nuevo.");
  };
  return (
    <section className="mx-auto max-w-md py-10">
      <img src={emblem} alt="LEX IA PY" width={56} height={56} className="mb-5 rounded-md" />
      <p className="text-xs font-bold uppercase text-kicker">www.lexiapy.com</p>
      <h1 className="font-display mt-2 text-3xl font-bold text-navy">
        {mode === "signup"
          ? "Creá tu cuenta LEX IA"
          : mode === "reset"
            ? "Recuperá tu acceso"
            : "Tu cuenta LEX IA"}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Tus consultas y respuestas de Lexia, en un historial privado.
      </p>
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setMessage("");
          try {
            if (mode === "reset") {
              const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
              });
              if (error) throw error;
              setMessage("Revisá tu correo para recuperar el acceso.");
            } else if (mode === "signup") {
              const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: { emailRedirectTo: `${window.location.origin}/auth` },
              });
              if (error) throw error;
              setMessage(
                data.session
                  ? "Cuenta creada."
                  : "Revisá tu correo y confirmá tu cuenta antes de ingresar.",
              );
            } else {
              const { error } = await supabase.auth.signInWithPassword({ email, password });
              if (error) throw error;
              await navigate({ to: "/asistente" });
            }
          } catch {
            setMessage("No se pudo completar. Verificá tus datos y la confirmación del correo.");
          } finally {
            setBusy(false);
          }
        }}
      >
        <label className="field">
          Correo electrónico
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {mode !== "reset" && (
          <label className="field">
            Contraseña
            <input
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        )}
        <Button disabled={busy} className="w-full" type="submit">
          {busy
            ? "Procesando…"
            : mode === "signup"
              ? "Crear cuenta"
              : mode === "reset"
                ? "Enviar correo de recuperación"
                : "Ingresar"}
        </Button>
      </form>
      {message && (
        <p role="status" className="mt-4 text-sm text-link">
          {message}
        </p>
      )}
      {mode !== "reset" && (
        <div className="mt-5 space-y-3">
          <Button
            variant="outline"
            className="google-signin w-full"
            onClick={() => void social("google")}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            Continuar con Google
          </Button>
          <Button className="lovable-auth-button w-full" onClick={() => void social("lovable")}>
            Continuar con Lovable
          </Button>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="link"
          onClick={() => {
            setMode(mode === "signup" ? "login" : "signup");
            setMessage("");
          }}
        >
          {mode === "signup" ? "Ya tengo cuenta" : "Crear una cuenta"}
        </Button>
        <Button
          variant="link"
          onClick={() => {
            setMode(mode === "reset" ? "login" : "reset");
            setMessage("");
          }}
        >
          {mode === "reset" ? "Volver a ingresar" : "Olvidé mi contraseña"}
        </Button>
      </div>
      <Link to="/" className="mt-4 block text-sm text-link underline">
        Volver a LEX IA PY
      </Link>
    </section>
  );
}
