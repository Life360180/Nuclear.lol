import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-6 text-center text-fg">
      <div className="max-w-sm">
        <p className="font-display text-sm tracking-[0.2em] text-muted">NUCLEAR</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
          No page here
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          That name is free — or it never existed. Claim it and make it yours.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg"
        >
          Back to Nuclear
        </Link>
      </div>
    </main>
  );
}
