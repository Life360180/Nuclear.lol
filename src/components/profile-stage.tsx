import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, MapPin, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { BadgeCheck, Diamond, Shield } from "lucide-react";
import { createAmbient, type AmbientHandle } from "@/lib/ambient";
import {
  initials,
  type Profile,
  type UsernameEffect,
} from "@/lib/profile";
import { cn } from "@/lib/utils";
import { ProfileEffects } from "@/components/profile-effects";
import { SocialGlyph } from "@/components/social-icons";

export function ProfileStage({
  profile,
  mode = "live",
  entered: enteredProp,
  onEntered,
}: {
  profile: Profile;
  mode?: "live" | "preview";
  entered?: boolean;
  onEntered?: () => void;
}) {
  const theme = profile.theme;
  const isPreview = mode === "preview";
  const [entered, setEntered] = useState(
    isPreview || enteredProp === true || !theme.enterEnabled,
  );
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambientRef = useRef<AmbientHandle | null>(null);
  const mixRef = useRef({ muted: false, volume: 0.5 });
  mixRef.current = { muted, volume };

  useEffect(() => {
    if (enteredProp === true) setEntered(true);
  }, [enteredProp]);

  useEffect(() => {
    if (isPreview) setEntered(true);
  }, [isPreview, theme.enterEnabled]);

  const glow = theme.glowColor || theme.accentColor;
  const cursor = theme.cursorUrl
    ? `url(${theme.cursorUrl}) 12 12, auto`
    : undefined;

  const cssVars = {
    "--p-accent": theme.accentColor,
    "--p-text": theme.textColor,
    "--p-icon": theme.iconColor,
    "--p-glow": glow,
  } as React.CSSProperties;

  const background = useMemo(() => {
    if (theme.backgroundType === "image" && theme.backgroundImage) {
      return {
        backgroundColor: theme.backgroundColor,
        backgroundImage: `linear-gradient(to bottom, rgb(0 0 0 / 0.35), rgb(0 0 0 / 0.55)), url(${theme.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } as React.CSSProperties;
    }
    if (theme.backgroundType === "gradient") {
      return {
        backgroundImage: `linear-gradient(160deg, ${theme.backgroundColor}, ${theme.backgroundColor2})`,
      } as React.CSSProperties;
    }
    return { backgroundColor: theme.backgroundColor } as React.CSSProperties;
  }, [theme]);

  useEffect(() => {
    ambientRef.current?.stop();
    ambientRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (!entered || isPreview) return;

    const url = theme.audioUrl;
    if (!url) return;

    const mix = mixRef.current;
    if (url.startsWith("ambient:")) {
      const handle = createAmbient(url, mix.muted ? 0 : mix.volume * 0.7);
      ambientRef.current = handle;
      if (handle) {
        void handle.start().then(() => setPlaying(true));
      }
      return () => {
        handle?.stop();
        setPlaying(false);
      };
    }

    const el = new Audio(url);
    el.loop = true;
    el.volume = mix.muted ? 0 : mix.volume;
    audioRef.current = el;
    void el
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
    return () => {
      el.pause();
      audioRef.current = null;
      setPlaying(false);
    };
  }, [entered, isPreview, theme.audioUrl]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
    ambientRef.current?.setVolume(muted ? 0 : volume * 0.7);
  }, [muted, volume]);

  const enter = () => {
    if (entered) return;
    setEntered(true);
    onEntered?.();
  };

  const visibleLinks = profile.links.filter((l) => !l.hidden);
  const iconLinks = visibleLinks.filter(
    (l) => l.kind !== "website" && l.kind !== "custom",
  );
  const buttonLinks = visibleLinks.filter(
    (l) => l.kind === "website" || l.kind === "custom",
  );

  const panelStyle: React.CSSProperties =
    theme.layout === "panel"
      ? {
          background: `rgb(8 8 10 / ${theme.cardOpacity / 100})`,
          backdropFilter: `blur(${theme.cardBlur}px)`,
          WebkitBackdropFilter: `blur(${theme.cardBlur}px)`,
          border: `1px solid color-mix(in oklab, ${theme.accentColor} 22%, transparent)`,
          boxShadow: theme.glowEnabled
            ? `0 0 80px -24px ${glow}`
            : "0 20px 60px -32px rgb(0 0 0 / 0.7)",
        }
      : {};

  return (
    <div
      className={cn(
        "nox-grain relative isolate overflow-hidden",
        isPreview ? "h-full w-full" : "h-dvh w-full",
      )}
      style={{ ...cssVars, ...background, color: theme.textColor, cursor }}
    >
      <ProfileEffects effect={theme.bgEffect} color={theme.accentColor} />
      <div className="pointer-events-none absolute inset-0 bg-bg/25" />

      {(entered || isPreview) && (
        <div
          className={cn(
            "relative z-10 flex h-full flex-col items-center justify-center overflow-y-auto px-5 py-16",
            isPreview ? "scale-[0.92]" : "",
          )}
        >
          <div
            className={cn(
              "flex w-full max-w-md flex-col items-center text-center",
              theme.layout === "panel" && "rounded-2xl px-8 py-10",
            )}
            style={panelStyle}
          >
            <Avatar profile={profile} glow={theme.glowEnabled ? glow : undefined} />
            <Username
              name={profile.displayName || profile.username}
              effect={theme.usernameEffect}
              entered={entered}
            />
            {theme.badge !== "none" ? <BadgeMark kind={theme.badge} /> : null}
            {profile.location ? (
              <p className="mt-2 flex items-center gap-1.5 text-xs tracking-wide opacity-70">
                <MapPin className="size-3.5" />
                {profile.location}
              </p>
            ) : null}
            <Bio text={profile.bio} typewriter={theme.typewriterBio && entered} />
            <StatusWidget
              kind={theme.statusKind}
              text={theme.statusText}
              accent={theme.accentColor}
            />

            {iconLinks.length > 0 ? (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {iconLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label || link.kind}
                    className="grid size-11 place-items-center rounded-full transition-transform duration-150 hover:scale-105"
                    style={{
                      color: theme.iconColor,
                      background: `color-mix(in oklab, ${theme.iconColor} 12%, transparent)`,
                      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${theme.iconColor} 22%, transparent)`,
                    }}
                  >
                    <SocialGlyph kind={link.kind} className="size-4" />
                  </a>
                ))}
              </div>
            ) : null}

            {buttonLinks.length > 0 ? (
              <div className="mt-5 flex w-full flex-col gap-2">
                {buttonLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 items-center justify-center rounded-md text-sm font-medium transition-opacity duration-150 hover:opacity-90"
                    style={{
                      background: theme.accentColor,
                      color: theme.backgroundColor,
                    }}
                  >
                    {link.label || "link"}
                  </a>
                ))}
              </div>
            ) : null}

            <p className="mt-8 flex items-center gap-1.5 text-[11px] tabular-nums tracking-wide opacity-50">
              <Eye className="size-3" />
              {profile.views.toLocaleString()} views
            </p>
          </div>
        </div>
      )}

      {theme.volumeControl && entered && theme.audioUrl && !isPreview ? (
        <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2">
          <button
            type="button"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={() => setMuted((m) => !m)}
            className="grid size-11 place-items-center rounded-full bg-bg/50 text-fg"
          >
            {muted || volume === 0 ? (
              <VolumeX className="size-4" />
            ) : (
              <Volume2 className="size-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            aria-label="Volume"
            onChange={(e) => {
              const v = Number(e.target.value);
              setVolume(v);
              if (v > 0) setMuted(false);
            }}
            className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-fg/20"
          />
          {playing ? (
            <Pause className="size-3.5 opacity-40" />
          ) : (
            <Play className="size-3.5 opacity-40" />
          )}
        </div>
      ) : null}

      {theme.audioTitle && entered && theme.audioUrl && !isPreview ? (
        <p className="absolute bottom-6 right-5 z-20 max-w-[40%] truncate text-right text-[11px] tracking-wide opacity-50">
          {theme.audioTitle}
        </p>
      ) : null}

      {!entered && !isPreview ? (
        <button
          type="button"
          onClick={enter}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-bg/70 backdrop-blur-md"
        >
          <span className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            {profile.displayName || profile.username}
          </span>
          <span className="mt-8 text-sm tracking-[0.32em] uppercase opacity-80">
            {theme.enterText || "click to enter"}
          </span>
          <span
            className="nox-anim mt-5 h-px w-28 origin-center bg-current"
            style={{ animation: "nox-pulse-line 2.2s ease-in-out infinite" }}
          />
        </button>
      ) : null}
    </div>
  );
}

function Avatar({ profile, glow }: { profile: Profile; glow?: string }) {
  return (
    <div
      className="mb-5 grid size-28 place-items-center overflow-hidden rounded-full"
      style={{
        boxShadow: glow ? `0 0 40px ${glow}` : undefined,
        outline: `2px solid color-mix(in oklab, var(--p-accent) 70%, transparent)`,
        outlineOffset: "3px",
      }}
    >
      {profile.avatarUrl ? (
        <img
          src={profile.avatarUrl}
          alt=""
          className="size-full object-cover"
        />
      ) : (
        <span
          className="grid size-full place-items-center font-display text-2xl font-semibold"
          style={{
            background: "color-mix(in oklab, var(--p-accent) 18%, #111)",
            color: "var(--p-accent)",
          }}
        >
          {initials(profile.displayName || profile.username)}
        </span>
      )}
    </div>
  );
}

function Username({
  name,
  effect,
  entered,
}: {
  name: string;
  effect: UsernameEffect;
  entered: boolean;
}) {
  const typed = useTypewriter(name, effect === "typewriter" && entered, false);
  const shown = effect === "typewriter" ? typed : name;
  return (
    <h1
      className={cn(
        "font-display text-3xl font-semibold tracking-tight sm:text-4xl",
        effect === "glow" && "nox-name-glow",
        effect === "gradient" && "nox-name-gradient",
        effect === "glitch" && "nox-name-glitch",
      )}
    >
      {shown}
      {effect === "typewriter" ? (
        <span
          className="nox-anim ml-0.5 inline-block w-2 bg-current"
          style={{ animation: "nox-caret 1s steps(1) infinite" }}
        >
          &nbsp;
        </span>
      ) : null}
    </h1>
  );
}

function Bio({ text, typewriter }: { text: string; typewriter: boolean }) {
  const typed = useTypewriter(text, typewriter, true);
  if (!text) return null;
  return (
    <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-80">
      {typewriter ? typed : text}
      {typewriter ? (
        <span
          className="nox-anim ml-0.5 inline-block w-1.5 bg-current align-baseline"
          style={{ animation: "nox-caret 1s steps(1) infinite" }}
        >
          &nbsp;
        </span>
      ) : null}
    </p>
  );
}

function useTypewriter(text: string, enabled: boolean, loop: boolean) {
  const [out, setOut] = useState(enabled ? "" : text);
  useEffect(() => {
    if (!enabled) {
      setOut(text);
      return;
    }
    let i = 0;
    let dir: 1 | -1 = 1;
    let pause = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOut(text);
      return;
    }
    setOut("");
    const id = window.setInterval(() => {
      if (pause > 0) {
        pause -= 1;
        return;
      }
      i += dir;
      if (i >= text.length) {
        if (!loop) {
          setOut(text);
          window.clearInterval(id);
          return;
        }
        pause = 18;
        dir = -1;
      } else if (i <= 0) {
        pause = 8;
        dir = 1;
      }
      setOut(text.slice(0, Math.max(0, i)));
    }, 55);
    return () => window.clearInterval(id);
  }, [text, enabled, loop]);
  return out;
}

function BadgeMark({ kind }: { kind: "verified" | "og" | "staff" }) {
  const Icon = kind === "verified" ? BadgeCheck : kind === "staff" ? Shield : Diamond;
  const label = kind === "verified" ? "Verified" : kind === "staff" ? "Staff" : "Original";
  return (
    <span className="mt-2 inline-flex items-center gap-1 text-[11px] tracking-wide opacity-70">
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}

function StatusWidget({
  kind,
  text,
  accent,
}: {
  kind: Profile["theme"]["statusKind"];
  text: string;
  accent: string;
}) {
  if (kind === "none" || !text) return null;
  const prefix =
    kind === "online" ? "Online" : kind === "playing" ? "Playing" : "Listening";
  return (
    <div
      className="mt-5 flex w-full max-w-xs items-center gap-3 rounded-md px-3 py-2 text-left text-xs"
      style={{
        background: `color-mix(in oklab, ${accent} 12%, transparent)`,
        boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${accent} 20%, transparent)`,
      }}
    >
      <span
        className="size-2 shrink-0 rounded-full"
        style={{ background: accent }}
      />
      <span className="min-w-0">
        <span className="opacity-60">{prefix}</span>
        <span className="ml-1.5 truncate">{text}</span>
      </span>
    </div>
  );
}
