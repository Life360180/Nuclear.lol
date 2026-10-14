import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

export function SiteNav({ solid = false }: { solid?: boolean }) {
  const { user, isPending } = useCurrentUserState();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 items-center justify-between gap-4 px-5 sm:px-8",
        solid ? "border-b border-border bg-bg/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Link to="/" className="font-display text-lg font-semibold tracking-tight text-fg">
        Nuclear
      </Link>
      <nav className="flex items-center gap-1 sm:gap-2">
        <Link
          to="/explore"
          className="inline-flex h-11 items-center px-3 text-sm text-muted transition-colors duration-150 hover:text-fg"
        >
          Explore
        </Link>
        {isPending ? (
          <div className="h-8 w-24 animate-pulse rounded-md bg-elevated" />
        ) : user ? (
          <>
            <Link
              to="/studio"
              className="inline-flex h-11 items-center px-3 text-sm text-muted transition-colors duration-150 hover:text-fg"
            >
              Studio
            </Link>
            <div className="hidden max-w-[220px] truncate sm:block">
              <UserButton />
            </div>
          </>
        ) : (
          <Link
            to="/login"
            search={{}}
            className="inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg"
          >
            Sign in
          </Link>
        )}
      </nav>
    </header>
  );
}
