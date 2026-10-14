import { useState } from "react";
import { Link, Navigate, createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SiteNav } from "@/components/site-nav";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

type Search = { claim?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    claim: typeof raw.claim === "string" ? raw.claim : undefined,
  }),
  component: Login,
});

function Login() {
  const { claim } = Route.useSearch();
  const { user, isPending } = useCurrentUserState();
  const callbackURL = claim ? `/studio?claim=${encodeURIComponent(claim)}` : "/studio";
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (isPending) {
    return (
      <div className="min-h-dvh bg-bg">
        <SiteNav />
        <main className="grid min-h-[calc(100dvh-4rem)] place-items-center px-5">
          <div className="h-80 w-full max-w-md animate-pulse rounded-2xl bg-surface" />
        </main>
      </div>
    );
  }
  if (user) {
    return <Navigate to="/studio" search={{ claim }} />;
  }

  const onEmail = async () => {
    setError("");
    setBusy(true);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: name || email.split("@")[0] || "member",
          callbackURL,
        });
        if (err) throw new Error(err.message || "Could not create account.");
      } else {
        const { error: err } = await authClient.signIn.email({
          email,
          password,
          callbackURL,
        });
        if (err) throw new Error(err.message || "Could not sign in.");
      }
      window.location.href = callbackURL;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-dvh bg-bg">
      <SiteNav />
      <main className="mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-md place-items-center px-5 py-12">
        <div className="w-full rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="font-display text-sm tracking-[0.2em] text-muted">NUCLEAR</p>
          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight">
            {mode === "in" ? "Sign in" : "Create account"}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {claim
              ? `Then claim /${claim}`
              : "Your page follows you across devices."}
          </p>

          {authEnabled ? (
            <div className="mt-6 flex flex-col gap-2">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  variant="outline"
                  className="w-full"
                  onClick={() => void signIn(p.providerId, { callbackURL })}
                >
                  Continue with {p.label}
                </Button>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted">Sign-in is disabled.</p>
          )}

          <div className="my-6 flex items-center gap-3 text-[11px] tracking-wide text-subtle uppercase">
            <span className="h-px flex-1 bg-border" />
            or email
            <span className="h-px flex-1 bg-border" />
          </div>

          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              void onEmail();
            }}
          >
            {mode === "up" ? (
              <Field label="Name">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </Field>
            ) : null}
            <Field label="Email">
              <Input
                type="email"
                value={email}
                required
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                value={password}
                required
                minLength={8}
                autoComplete={mode === "up" ? "new-password" : "current-password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <Button type="submit" className="mt-1 w-full" disabled={busy}>
              {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <button
            type="button"
            className="mt-5 text-sm text-muted hover:text-fg"
            onClick={() => {
              setMode(mode === "in" ? "up" : "in");
              setError("");
            }}
          >
            {mode === "in" ? "Need an account? Create one" : "Have an account? Sign in"}
          </button>
          <p className="mt-6 text-xs text-subtle">
            <Link to="/" className="hover:text-muted">
              Back home
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
