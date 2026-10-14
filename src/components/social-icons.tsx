import type { SVGProps } from "react";
import { Globe, Link as LinkIcon } from "lucide-react";
import type { SocialKind } from "@/lib/profile";

type IconProps = SVGProps<SVGSVGElement>;

function Ico(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    />
  );
}

export function SocialGlyph({ kind, className }: { kind: SocialKind; className?: string }) {
  switch (kind) {
    case "x":
      return (
        <Ico className={className}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </Ico>
      );
    case "instagram":
      return (
        <Ico className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
        </Ico>
      );
    case "youtube":
      return (
        <Ico className={className}>
          <path d="M23.5 6.2a4 4 0 0 0-2.8-2.8C18.7 3 12 3 12 3s-6.7 0-8.7.4A4 4 0 0 0 .5 6.2 42 42 0 0 0 0 12a42 42 0 0 0 .5 5.8 4 4 0 0 0 2.8 2.8C5.3 21 12 21 12 21s6.7 0 8.7-.4a4 4 0 0 0 2.8-2.8A42 42 0 0 0 24 12a42 42 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
        </Ico>
      );
    case "twitch":
      return (
        <Ico className={className}>
          <path d="M4 3h16v11.2L16.3 21H12l-2.2 2H7.3v-2H4V3zm2.2 2.2v12.3h4v2.1l2.1-2.1h3.6l2.5-2.5V5.2H6.2zm7.2 8.2h2.2V8.3h-2.2v5.1zm-4.3 0h2.2V8.3H9.1v5.1z" />
        </Ico>
      );
    case "discord":
      return (
        <Ico className={className}>
          <path d="M19.7 5.3A18 18 0 0 0 15.2 4l-.4.8a16 16 0 0 1 3 1.2 13 13 0 0 0-12.6 0 16 16 0 0 1 3-1.2L8 4a18 18 0 0 0-4.5 1.3C1.3 9.4.6 13.4 1 17.3A18 18 0 0 0 6.6 20l.8-1.1a12 12 0 0 1-1.9-1l.4-.3h.1c4 1.8 8.3 1.8 12.2 0l.5.3a12 12 0 0 1-1.9 1l.8 1.1a18 18 0 0 0 5.6-2.7c.5-4.5-.7-8.4-2.9-12zM8.7 14.7c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2zm6.6 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2z" />
        </Ico>
      );
    case "github":
      return (
        <Ico className={className}>
          <path d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.2 3.4 9.6 8.1 10.2.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C16.9 4.7 18 5 18 5c.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.4 6 .4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.7-.6 8.1-5 8.1-10.2A11.5 11.5 0 0 0 12 .5z" />
        </Ico>
      );
    case "tiktok":
      return (
        <Ico className={className}>
          <path d="M14.5 3h2.3c.2 2 1.5 3.6 3.5 4v2.4c-1.2 0-2.3-.3-3.3-.9v6.7A6.7 6.7 0 1 1 9.2 8.6v2.5a4.3 4.3 0 1 0 3.1 4.1V3z" />
        </Ico>
      );
    case "spotify":
      return (
        <Ico className={className}>
          <path d="M12 1.5A10.5 10.5 0 1 0 22.5 12 10.5 10.5 0 0 0 12 1.5zm4.8 15.1a.7.7 0 0 1-1 .2 8.7 8.7 0 0 0-8.7-.2.7.7 0 1 1-.7-1.2 10.1 10.1 0 0 1 10.1.2.7.7 0 0 1 .3 1zm1.3-2.9a.85.85 0 0 1-1.2.3 10.7 10.7 0 0 0-10.6-.2.85.85 0 1 1-.8-1.5 12.4 12.4 0 0 1 12.3.3.85.85 0 0 1 .3 1.1zm.1-3a1 1 0 0 1-1.4.3 13.5 13.5 0 0 0-13.4-.3 1 1 0 1 1-1-1.8 15.5 15.5 0 0 1 15.4.3 1 1 0 0 1 .4 1.5z" />
        </Ico>
      );
    case "website":
      return <Globe className={className} strokeWidth={1.8} />;
    default:
      return <LinkIcon className={className} strokeWidth={1.8} />;
  }
}
