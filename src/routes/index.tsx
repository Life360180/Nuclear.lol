import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ClaimForm } from "@/components/claim-form";
import { SiteNav } from "@/components/site-nav";
import { countPages, listPublicProfiles } from "@/lib/profile-fns";
import { initials, type Profile } from "@/lib/profile";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [listed, counted] = await Promise.all([
      listPublicProfiles(),
      countPages(),
    ]);
    return { profiles: listed.slice(0, 4), count: counted.count };
  },
  component: Home,
});

function Home() {
  const { profiles, count } = Route.useLoaderData();

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <SiteNav />
      <main>
        <section className="relative overflow-hidden px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgb(7 7 7 / 0.25), rgb(7 7 7)), linear-gradient(100deg, rgb(225 6 0 / 0.38), transparent 55%), url(/backgrounds/ridge.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="nox-grain pointer-events-none absolute inset-0" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-start nox-stagger">
            <p className="text-xs tracking-[0.28em] text-muted uppercase">
              Link in bio, actually designed
            </p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              A page that's
              <br />
              actually yours.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Claim a name. Tune the atmosphere, the type, the sound. Share one
              link.
              {count > 0
                ? ` ${count.toLocaleString()} live ${count === 1 ? "page" : "pages"} on Nuclear.`
                : " Yours will be the first."}
            </p>
            <div className="mt-10 w-full">
              <ClaimForm />
            </div>
          </div>
        </section>

        <section className="border-t border-border px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "Claim a name",
                d: "Your address is short and yours. Sign in and it stays claimed.",
              },
              {
                n: "02",
                t: "Shape the page",
                d: "Colors, glass, weather, type effects, audio, custom cursor — live as you edit.",
              },
              {
                n: "03",
                t: "Share the link",
                d: "One URL for every social, site, and project. No ads. No clutter.",
              },
            ].map((step) => (
              <div key={step.n}>
                <p className="font-mono text-xs tracking-wide text-subtle">{step.n}</p>
                <h2 className="mt-3 font-display text-xl font-semibold">{step.t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  Live pages
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {profiles.length
                    ? "Real pages, from people who claimed a name."
                    : "Nothing here until someone claims a name."}
                </p>
              </div>
              <Link
                to="/explore"
                className="inline-flex h-11 items-center gap-1 text-sm text-muted hover:text-fg"
              >
                All pages
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
            {profiles.length === 0 ? (
              <p className="mt-8 text-sm text-muted">
                Explore stays empty until the first page goes live.
              </p>
            ) : (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {profiles.map((p) => (
                  <ProfileTile key={p.username} profile={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="border-t border-border px-5 py-10 text-sm text-subtle sm:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-display text-fg">Nuclear</span>
          <span>Your name, your atmosphere.</span>
        </div>
      </footer>
    </div>
  );
}

function ProfileTile({ profile }: { profile: Profile }) {
  const bg =
    profile.theme.backgroundType === "image" && profile.theme.backgroundImage
      ? `url(${profile.theme.backgroundImage})`
      : `linear-gradient(160deg, ${profile.theme.backgroundColor}, ${profile.theme.backgroundColor2})`;
  return (
    <Link
      to="/u/$username"
      params={{ username: profile.username }}
      className="group overflow-hidden rounded-xl border border-border bg-surface"
    >
      <div
        className="relative aspect-[4/5] bg-elevated bg-cover bg-center"
        style={{ backgroundImage: bg }}
      >
        <div className="absolute inset-0 bg-bg/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div
            className="mb-3 grid size-16 place-items-center overflow-hidden rounded-full"
            style={{
              outline: `1px solid ${profile.theme.accentColor}`,
              outlineOffset: "2px",
            }}
          >
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="" className="size-full object-cover" />
            ) : (
              <span
                className="grid size-full place-items-center text-sm font-medium"
                style={{
                  background: profile.theme.backgroundColor,
                  color: profile.theme.accentColor,
                }}
              >
                {initials(profile.displayName || profile.username)}
              </span>
            )}
          </div>
          <p className="font-display text-lg font-semibold">{profile.displayName}</p>
          <p className="mt-1 text-xs text-muted">/{profile.username}</p>
        </div>
      </div>
    </Link>
  );
}
