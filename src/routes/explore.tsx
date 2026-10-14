import { Link, createFileRoute } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { listPublicProfiles } from "@/lib/profile-fns";
import { initials, type Profile } from "@/lib/profile";

export const Route = createFileRoute("/explore")({
  loader: async () => ({ profiles: await listPublicProfiles() }),
  component: Explore,
});

function Explore() {
  const { profiles } = Route.useLoaderData();
  return (
    <div className="min-h-dvh bg-bg">
      <SiteNav solid />
      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Explore</h1>
        <p className="mt-2 text-sm text-muted">
          Every page on Nuclear. Open one, or claim your own.
        </p>
        {profiles.length === 0 ? (
          <div className="mt-16 max-w-md">
            <p className="font-display text-xl font-semibold">No pages yet</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Claim a name and it shows up here for everyone. There are no sample pages.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg"
            >
              Claim a name
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((p) => (
              <Card key={p.username} profile={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Card({ profile }: { profile: Profile }) {
  const bg =
    profile.theme.backgroundType === "image" && profile.theme.backgroundImage
      ? `url(${profile.theme.backgroundImage})`
      : `linear-gradient(160deg, ${profile.theme.backgroundColor}, ${profile.theme.backgroundColor2})`;
  return (
    <Link
      to="/u/$username"
      params={{ username: profile.username }}
      className="overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-150 hover:bg-elevated"
    >
      <div
        className="h-28 bg-cover bg-center"
        style={{ backgroundImage: bg }}
      />
      <div className="flex items-center gap-3 p-4">
        <div className="grid size-11 place-items-center overflow-hidden rounded-full bg-elevated">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="" className="size-full object-cover" />
          ) : (
            <span className="text-xs text-muted">
              {initials(profile.displayName || profile.username)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{profile.displayName}</p>
          <p className="truncate text-xs text-muted">/{profile.username}</p>
        </div>
        <span className="flex items-center gap-1 text-xs tabular-nums text-subtle">
          <Eye className="size-3" />
          {profile.views.toLocaleString()}
        </span>
      </div>
    </Link>
  );
}
