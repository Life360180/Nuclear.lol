export const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

export const RESERVED_USERNAMES = new Set([
  "login",
  "studio",
  "explore",
  "api",
  "auth",
  "u",
  "admin",
  "settings",
  "account",
  "nuclear",
  "nox",
  "templates",
  "www",
  "help",
  "support",
  "status",
]);

export type BgEffect =
  | "none"
  | "particles"
  | "rain"
  | "snow"
  | "stars"
  | "grid"
  | "orbs";

export type UsernameEffect = "none" | "glow" | "glitch" | "gradient" | "typewriter";

export type LayoutKind = "float" | "panel";

export type BackgroundType = "solid" | "gradient" | "image";

export type SocialKind =
  | "x"
  | "instagram"
  | "youtube"
  | "twitch"
  | "discord"
  | "github"
  | "tiktok"
  | "spotify"
  | "website"
  | "custom";

export type StatusKind = "none" | "online" | "playing" | "listening";

export type BadgeKind = "none" | "verified" | "og" | "staff";

export type AmbientKind = "off" | "drone" | "rain" | "pulse" | "hum";

export type ProfileLink = {
  id: string;
  kind: SocialKind;
  label: string;
  url: string;
  hidden: boolean;
};

export type ProfileTheme = {
  backgroundType: BackgroundType;
  backgroundColor: string;
  backgroundColor2: string;
  backgroundImage: string;
  accentColor: string;
  textColor: string;
  iconColor: string;
  cardOpacity: number;
  cardBlur: number;
  glowEnabled: boolean;
  glowColor: string;
  usernameEffect: UsernameEffect;
  bgEffect: BgEffect;
  layout: LayoutKind;
  enterEnabled: boolean;
  enterText: string;
  audioUrl: string;
  audioTitle: string;
  typewriterBio: boolean;
  volumeControl: boolean;
  cursorUrl: string;
  statusText: string;
  statusKind: StatusKind;
  badge: BadgeKind;
};

export type Profile = {
  username: string;
  displayName: string;
  bio: string;
  location: string;
  avatarUrl: string;
  published: boolean;
  views: number;
  theme: ProfileTheme;
  links: ProfileLink[];
  isOwner?: boolean;
};

export const DEFAULT_THEME: ProfileTheme = {
  backgroundType: "solid",
  backgroundColor: "#070707",
  backgroundColor2: "#140808",
  backgroundImage: "",
  accentColor: "#e10600",
  textColor: "#f5f5f5",
  iconColor: "#ffd4d4",
  cardOpacity: 38,
  cardBlur: 18,
  glowEnabled: true,
  glowColor: "",
  usernameEffect: "glow",
  bgEffect: "stars",
  layout: "float",
  enterEnabled: true,
  enterText: "click to enter",
  audioUrl: "ambient:drone",
  audioTitle: "Signal",
  typewriterBio: false,
  volumeControl: true,
  cursorUrl: "",
  statusText: "",
  statusKind: "none",
  badge: "none",
};

const HEX = /^#([0-9a-fA-F]{6})$/;

function hex(value: unknown, fallback: string): string {
  return typeof value === "string" && HEX.test(value) ? value : fallback;
}

function str(value: unknown, fallback: string, max = 500): string {
  if (typeof value !== "string") return fallback;
  return value.slice(0, max);
}

function num(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function bool(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

const BG_EFFECTS: BgEffect[] = [
  "none",
  "particles",
  "rain",
  "snow",
  "stars",
  "grid",
  "orbs",
];
const NAME_EFFECTS: UsernameEffect[] = [
  "none",
  "glow",
  "glitch",
  "gradient",
  "typewriter",
];
const LAYOUTS: LayoutKind[] = ["float", "panel"];
const BG_TYPES: BackgroundType[] = ["solid", "gradient", "image"];
const STATUSES: StatusKind[] = ["none", "online", "playing", "listening"];
const BADGES: BadgeKind[] = ["none", "verified", "og", "staff"];
export const SOCIAL_KINDS: SocialKind[] = [
  "x",
  "instagram",
  "youtube",
  "twitch",
  "discord",
  "github",
  "tiktok",
  "spotify",
  "website",
  "custom",
];

function oneOf<T extends string>(value: unknown, list: readonly T[], fallback: T): T {
  return typeof value === "string" && (list as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}

function safeAssetUrl(value: unknown, max = 220_000): string {
  const v = str(value, "", max).trim();
  if (!v) return "";
  if (v.startsWith("data:image/")) return v;
  if (v.startsWith("/backgrounds/")) return v;
  try {
    const u = new URL(v);
    if (u.protocol === "http:" || u.protocol === "https:") return v;
  } catch {
    return "";
  }
  return "";
}

function safeLinkUrl(value: unknown): string {
  const v = str(value, "", 500).trim();
  if (!v) return "";
  try {
    const u = new URL(v);
    if (u.protocol === "http:" || u.protocol === "https:" || u.protocol === "mailto:") {
      return v;
    }
  } catch {
    return "";
  }
  return "";
}

function safeAudio(value: unknown): string {
  const v = str(value, "", 500).trim();
  if (!v) return "";
  if (v.startsWith("ambient:")) {
    const kind = v.slice("ambient:".length);
    if (["drone", "rain", "pulse", "hum"].includes(kind)) return v;
    return "";
  }
  try {
    const u = new URL(v);
    if (u.protocol === "http:" || u.protocol === "https:") return v;
  } catch {
    return "";
  }
  return "";
}

export function sanitizeTheme(input: unknown): ProfileTheme {
  const t = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const d = DEFAULT_THEME;
  return {
    backgroundType: oneOf(t.backgroundType, BG_TYPES, d.backgroundType),
    backgroundColor: hex(t.backgroundColor, d.backgroundColor),
    backgroundColor2: hex(t.backgroundColor2, d.backgroundColor2),
    backgroundImage: safeAssetUrl(t.backgroundImage),
    accentColor: hex(t.accentColor, d.accentColor),
    textColor: hex(t.textColor, d.textColor),
    iconColor: hex(t.iconColor, d.iconColor),
    cardOpacity: num(t.cardOpacity, d.cardOpacity, 0, 90),
    cardBlur: num(t.cardBlur, d.cardBlur, 0, 40),
    glowEnabled: bool(t.glowEnabled, d.glowEnabled),
    glowColor: hex(t.glowColor, "") || "",
    usernameEffect: oneOf(t.usernameEffect, NAME_EFFECTS, d.usernameEffect),
    bgEffect: oneOf(t.bgEffect, BG_EFFECTS, d.bgEffect),
    layout: oneOf(t.layout, LAYOUTS, d.layout),
    enterEnabled: bool(t.enterEnabled, d.enterEnabled),
    enterText: str(t.enterText, d.enterText, 48),
    audioUrl: safeAudio(t.audioUrl),
    audioTitle: str(t.audioTitle, d.audioTitle, 48),
    typewriterBio: bool(t.typewriterBio, d.typewriterBio),
    volumeControl: bool(t.volumeControl, d.volumeControl),
    cursorUrl: safeAssetUrl(t.cursorUrl, 80_000),
    statusText: str(t.statusText, d.statusText, 64),
    statusKind: oneOf(t.statusKind, STATUSES, d.statusKind),
    badge: oneOf(t.badge, BADGES, d.badge),
  };
}

export function sanitizeLinks(input: unknown): ProfileLink[] {
  if (!Array.isArray(input)) return [];
  const out: ProfileLink[] = [];
  for (const raw of input.slice(0, 16)) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    const kind = oneOf(r.kind, SOCIAL_KINDS, "custom");
    const url = safeLinkUrl(r.url);
    if (!url) continue;
    out.push({
      id: str(r.id, cryptoRandomId(), 40) || cryptoRandomId(),
      kind,
      label: str(r.label, kind, 32),
      url,
      hidden: bool(r.hidden, false),
    });
  }
  return out;
}

export function cryptoRandomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `l_${Math.random().toString(36).slice(2, 10)}`;
}

export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
}

export function validateUsername(username: string): { ok: true } | { ok: false; error: string } {
  if (!USERNAME_RE.test(username)) {
    return { ok: false, error: "3–20 characters, lowercase letters, numbers, underscore." };
  }
  if (RESERVED_USERNAMES.has(username)) {
    return { ok: false, error: "That name is reserved." };
  }
  return { ok: true };
}

export function parseJson<T>(value: unknown, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value as T;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "N";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export type Template = {
  id: string;
  name: string;
  blurb: string;
  theme: ProfileTheme;
};

export const TEMPLATES: Template[] = [
  {
    id: "void",
    name: "Void",
    blurb: "Black field, red type, slow stars.",
    theme: {
      ...DEFAULT_THEME,
    },
  },
  {
    id: "ridge",
    name: "Ridge",
    blurb: "Fog over a night range.",
    theme: {
      ...DEFAULT_THEME,
      backgroundType: "image",
      backgroundColor: "#07090c",
      backgroundImage: "/backgrounds/ridge.jpg",
      accentColor: "#e10600",
      textColor: "#f5f5f5",
      iconColor: "#ffd4d4",
      layout: "panel",
      bgEffect: "particles",
      usernameEffect: "glow",
      audioUrl: "ambient:hum",
      audioTitle: "Altitude",
      cardOpacity: 28,
      cardBlur: 16,
    },
  },
  {
    id: "rain",
    name: "Rain",
    blurb: "Wet streets, glitch name.",
    theme: {
      ...DEFAULT_THEME,
      backgroundType: "image",
      backgroundColor: "#050507",
      backgroundImage: "/backgrounds/rain.jpg",
      accentColor: "#e10600",
      textColor: "#f5f5f5",
      layout: "float",
      bgEffect: "rain",
      usernameEffect: "glitch",
      audioUrl: "ambient:rain",
      audioTitle: "Downpour",
      enterText: "step inside",
      typewriterBio: true,
    },
  },
  {
    id: "ember",
    name: "Ember",
    blurb: "Warm smoke, slow orbs.",
    theme: {
      ...DEFAULT_THEME,
      backgroundType: "image",
      backgroundColor: "#100c0a",
      backgroundColor2: "#1c1410",
      backgroundImage: "/backgrounds/ember.jpg",
      accentColor: "#e10600",
      textColor: "#f6efe8",
      iconColor: "#ffd4d4",
      layout: "panel",
      bgEffect: "orbs",
      usernameEffect: "gradient",
      audioUrl: "ambient:pulse",
      audioTitle: "Low heat",
      cardOpacity: 34,
      cardBlur: 20,
    },
  },
  {
    id: "grid",
    name: "Grid",
    blurb: "Blueprint night, typewriter bio.",
    theme: {
      ...DEFAULT_THEME,
      backgroundType: "solid",
      backgroundColor: "#0b0b0d",
      accentColor: "#e10600",
      layout: "float",
      bgEffect: "grid",
      usernameEffect: "none",
      typewriterBio: true,
      audioUrl: "ambient:drone",
      audioTitle: "Carrier",
      glowEnabled: false,
    },
  },
  {
    id: "frost",
    name: "Core",
    blurb: "Black wash, red glow, falling ash.",
    theme: {
      ...DEFAULT_THEME,
      backgroundType: "gradient",
      backgroundColor: "#070707",
      backgroundColor2: "#1a0505",
      accentColor: "#e10600",
      textColor: "#f5f5f5",
      iconColor: "#ffd4d4",
      layout: "panel",
      bgEffect: "snow",
      usernameEffect: "glow",
      audioUrl: "ambient:hum",
      audioTitle: "Core",
      cardOpacity: 22,
      cardBlur: 14,
    },
  },
];

export const BG_EFFECT_OPTIONS: { id: BgEffect; label: string }[] = [
  { id: "none", label: "None" },
  { id: "stars", label: "Stars" },
  { id: "particles", label: "Dust" },
  { id: "rain", label: "Rain" },
  { id: "snow", label: "Snow" },
  { id: "orbs", label: "Orbs" },
  { id: "grid", label: "Grid" },
];

export const NAME_EFFECT_OPTIONS: { id: UsernameEffect; label: string }[] = [
  { id: "none", label: "None" },
  { id: "glow", label: "Glow" },
  { id: "gradient", label: "Shift" },
  { id: "glitch", label: "Glitch" },
  { id: "typewriter", label: "Type" },
];

export const SOCIAL_META: Record<SocialKind, { label: string; placeholder: string }> = {
  x: { label: "X", placeholder: "https://x.com/you" },
  instagram: { label: "Instagram", placeholder: "https://instagram.com/you" },
  youtube: { label: "YouTube", placeholder: "https://youtube.com/@you" },
  twitch: { label: "Twitch", placeholder: "https://twitch.tv/you" },
  discord: { label: "Discord", placeholder: "https://discord.gg/invite" },
  github: { label: "GitHub", placeholder: "https://github.com/you" },
  tiktok: { label: "TikTok", placeholder: "https://tiktok.com/@you" },
  spotify: { label: "Spotify", placeholder: "https://open.spotify.com/user/you" },
  website: { label: "Website", placeholder: "https://" },
  custom: { label: "Custom", placeholder: "https://" },
};
