import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkUsername, claimUsername } from "@/lib/profile-fns";
import { normalizeUsername, validateUsername } from "@/lib/profile";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

export function ClaimForm({ size = "lg" }: { size?: "lg" | "sm" }) {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [raw, setRaw] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "free" | "taken">("idle");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  const username = normalizeUsername(raw);

  useEffect(() => {
    if (username.length < 3) {
      setStatus("idle");
      setReason("");
      return;
    }
    const valid = validateUsername(username);
    if (!valid.ok) {
      setStatus("taken");
      setReason(valid.error);
      return;
    }
    setStatus("checking");
    const handle = window.setTimeout(() => {
      void checkUsername({ data: { username } })
        .then((res) => {
          setStatus(res.available ? "free" : "taken");
          setReason(res.available ? "Available" : (res.reason ?? "Taken"));
        })
        .catch(() => {
          setStatus("idle");
          setReason("");
        });
    }, 320);
    return () => window.clearTimeout(handle);
  }, [username]);

  const submit = async () => {
    const valid = validateUsername(username);
    if (!valid.ok) {
      setStatus("taken");
      setReason(valid.error);
      return;
    }
    if (isPending) return;
    if (!user) {
      try {
        sessionStorage.setItem("nuclear-claim", username);
      } catch {
        /* ignore */
      }
      void navigate({ to: "/login", search: { claim: username } });
      return;
    }
    setBusy(true);
    try {
      const res = await claimUsername({ data: { username } });
      void navigate({ to: "/studio", search: { claim: res.username } });
    } catch (err) {
      setStatus("taken");
      setReason(err instanceof Error ? err.message : "Could not claim that name.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      className={cn("w-full", size === "lg" ? "max-w-xl" : "max-w-md")}
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex h-12 min-w-0 flex-1 items-center rounded-lg border border-border bg-surface px-4">
          <span className="shrink-0 font-display text-sm text-subtle">nuclear.lol /</span>
          <input
            value={raw}
            onChange={(e) => setRaw(e.target.value.toLowerCase())}
            placeholder="yourname"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            maxLength={20}
            aria-label="Username"
            className="min-w-0 flex-1 bg-transparent px-2 text-base text-fg outline-none placeholder:text-subtle"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={busy || username.length < 3}
          className="h-12 shrink-0 rounded-lg sm:w-40"
        >
          {busy ? "Claiming…" : "Claim"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
      <p
        className={cn(
          "mt-2 min-h-5 text-xs",
          status === "free" && "text-muted",
          status === "taken" && "text-danger",
          status === "checking" && "text-subtle",
        )}
      >
        {username.length < 3
          ? "3–20 characters. Letters, numbers, underscore."
          : status === "checking"
            ? "Checking…"
            : reason}
      </p>
    </form>
  );
}
