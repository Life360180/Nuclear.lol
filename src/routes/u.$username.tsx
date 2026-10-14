import { useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { NotFound } from "@/components/not-found";
import { ProfileStage } from "@/components/profile-stage";
import { getPublicProfile, incrementViews } from "@/lib/profile-fns";

export const Route = createFileRoute("/u/$username")({
  loader: async ({ params }) => {
    const profile = await getPublicProfile({ data: { username: params.username } });
    return { profile };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.profile?.displayName || loaderData?.profile?.username;
    return {
      meta: [
        { title: name ? `${name} — Nuclear` : "Nuclear" },
        {
          name: "description",
          content: loaderData?.profile?.bio || "A Nuclear page.",
        },
      ],
    };
  },
  component: PublicProfile,
});

function PublicProfile() {
  const { profile } = Route.useLoaderData();
  const { username } = Route.useParams();

  useEffect(() => {
    if (!profile) return;
    const key = `nuclear-viewed:${username}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* continue */
    }
    void incrementViews({ data: { username } });
  }, [profile, username]);

  if (!profile) return <NotFound />;

  return (
    <div className="relative min-h-dvh">
      <ProfileStage profile={profile} mode="live" />
      {profile.isOwner ? (
        <Link
          to="/studio"
          className="absolute top-4 right-4 z-40 inline-flex h-11 items-center gap-2 rounded-md bg-bg/70 px-3 text-sm text-fg backdrop-blur-sm"
        >
          <Pencil className="size-3.5" />
          Edit
        </Link>
      ) : (
        <Link
          to="/"
          className="absolute top-4 right-4 z-40 font-display text-xs tracking-[0.2em] text-fg/50 hover:text-fg"
        >
          Nuclear
        </Link>
      )}
    </div>
  );
}
