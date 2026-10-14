import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, createFileRoute } from "@tanstack/react-router";
import { Check, Copy, ExternalLink, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { ProfileStage } from "@/components/profile-stage";
import { SiteNav } from "@/components/site-nav";
import { StudioForm, type StudioTab } from "@/components/studio-form";
import { Button } from "@/components/ui/button";
import { ClaimForm } from "@/components/claim-form";
import { Input } from "@/components/ui/input";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  claimUsername,
  getMyProfile,
  renameMyUsername,
  saveMyProfile,
} from "@/lib/profile-fns";
import {
  normalizeUsername,
  type Profile,
  type ProfileLink,
  type ProfileTheme,
} from "@/lib/profile";

type Search = { claim?: string };

export const Route = createFileRoute("/studio")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    claim: typeof raw.claim === "string" ? raw.claim : undefined,
  }),
  component: StudioPage,
});

function StudioPage() {
  const { user, isPending } = useCurrentUserState();
  const { claim } = Route.useSearch();

  if (isPending) {
    return (
      <div className="min-h-dvh bg-bg">
        <SiteNav solid />
        <div className="grid min-h-[60vh] place-items-center text-muted">
          <LoaderCircle className="size-6 animate-spin" />
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" search={{ claim }} />;
  }
  return <Studio claim={claim} />;
}

function Studio({ claim }: { claim?: string }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<StudioTab>("identity");
  const [saving, setSaving] = useState<"idle" | "dirty" | "saving" | "saved">("idle");
  const [mobile, setMobile] = useState<"preview" | "edit">("edit");
  const [newName, setNewName] = useState("");
  const saveTimer = useRef<number | undefined>(undefined);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      let stored = "";
      try {
        stored = sessionStorage.getItem("nuclear-claim") ?? "";
      } catch {
        stored = "";
      }
      const wanted = normalizeUsername(claim || stored);
      let mine = await getMyProfile();
      if (!mine && wanted) {
        await claimUsername({ data: { username: wanted } });
        try {
          sessionStorage.removeItem("nuclear-claim");
        } catch {
          /* ignore */
        }
        mine = await getMyProfile();
      }
      setProfile(mine);
      setNewName(mine?.username ?? wanted);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load your page.");
    } finally {
      setLoading(false);
    }
  }, [claim]);

  useEffect(() => {
    void load();
  }, [load]);

  const persist = useCallback(async (next: Profile) => {
    setSaving("saving");
    try {
      await saveMyProfile({
        data: {
          displayName: next.displayName,
          bio: next.bio,
          location: next.location,
          avatarUrl: next.avatarUrl,
          published: next.published,
          theme: next.theme,
          links: next.links,
        },
      });
      setSaving("saved");
      window.setTimeout(() => setSaving((s) => (s === "saved" ? "idle" : s)), 1600);
    } catch (err) {
      setSaving("dirty");
      toast.error(err instanceof Error ? err.message : "Save failed.");
    }
  }, []);

  const scheduleSave = useCallback(
    (next: Profile) => {
      setSaving("dirty");
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => {
        void persist(next);
      }, 700);
    },
    [persist],
  );

  useEffect(() => () => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
  }, []);

  const patch = (partial: Partial<Profile>) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...partial };
      scheduleSave(next);
      return next;
    });
  };

  const onTheme = (partial: Partial<ProfileTheme>) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const next = { ...prev, theme: { ...prev.theme, ...partial } };
      scheduleSave(next);
      return next;
    });
  };

  const onLinks = (links: ProfileLink[]) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const next = { ...prev, links };
      scheduleSave(next);
      return next;
    });
  };

  const rename = async () => {
    const username = normalizeUsername(newName);
    try {
      const res = await renameMyUsername({ data: { username } });
      setProfile((prev) => (prev ? { ...prev, username: res.username } : prev));
      toast.success(`Now /${res.username}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not rename.");
    }
  };

  const copy = async () => {
    if (!profile) return;
    const url = `${window.location.origin}/u/${profile.username}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  if (loading) {
    return (
      <div className="min-h-dvh bg-bg">
        <SiteNav solid />
        <div className="grid min-h-[60vh] place-items-center text-muted">
          <LoaderCircle className="size-6 animate-spin" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-dvh bg-bg">
        <SiteNav solid />
        <main className="mx-auto flex max-w-lg flex-col px-5 py-16">
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Claim your name
          </h1>
          <p className="mt-3 text-sm text-muted">
            Pick a handle. You can restyle everything after.
          </p>
          <div className="mt-8">
            <ClaimForm />
          </div>
        </main>
      </div>
    );
  }

  const saveLabel =
    saving === "saving" ? "Saving" : saving === "saved" ? "Saved" : saving === "dirty" ? "Unsaved" : "Saved";

  return (
    <div className="min-h-dvh bg-bg">
      <SiteNav solid />
      <div className="flex h-12 items-center justify-between gap-3 border-b border-border px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <span className="hidden text-xs text-subtle sm:inline">nuclear.lol /</span>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value.toLowerCase())}
            className="h-9 w-36 sm:w-44"
            aria-label="Username"
          />
          {newName !== profile.username ? (
            <Button size="sm" variant="outline" onClick={() => void rename()}>
              Rename
            </Button>
          ) : null}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="hidden items-center gap-1 text-xs text-subtle sm:inline-flex">
            {saving === "saved" ? <Check className="size-3.5" /> : null}
            {saveLabel}
          </span>
          <Button variant="ghost" size="sm" onClick={() => void copy()}>
            <Copy className="size-3.5" />
            <span className="hidden sm:inline">Copy</span>
          </Button>
          <Link
            to="/u/$username"
            params={{ username: profile.username }}
            className="inline-flex h-9 items-center gap-1 rounded-sm px-3 text-sm text-muted hover:text-fg"
          >
            <ExternalLink className="size-3.5" />
            <span className="hidden sm:inline">Open</span>
          </Link>
        </div>
      </div>

      <div className="flex h-11 items-center gap-1 border-b border-border px-3 lg:hidden">
        {(["edit", "preview"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setMobile(id)}
            className={
              mobile === id
                ? "h-9 rounded-md bg-elevated px-3 text-sm"
                : "h-9 rounded-md px-3 text-sm text-muted"
            }
          >
            {id === "edit" ? "Edit" : "Preview"}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]">
        <div
          className={
            mobile === "preview"
              ? "relative h-[70vh] lg:h-[calc(100dvh-7rem)]"
              : "relative hidden h-[calc(100dvh-7rem)] lg:block"
          }
        >
          <ProfileStage profile={profile} mode="preview" entered />
        </div>
        <div
          className={
            mobile === "edit"
              ? "max-h-[calc(100dvh-7.75rem)] overflow-y-auto border-l border-border px-4 lg:max-h-[calc(100dvh-7rem)]"
              : "hidden max-h-[calc(100dvh-7rem)] overflow-y-auto border-l border-border px-4 lg:block"
          }
        >
          <StudioForm
            profile={profile}
            tab={tab}
            onTab={setTab}
            onChange={patch}
            onTheme={onTheme}
            onLinks={onLinks}
          />
        </div>
      </div>
    </div>
  );
}
