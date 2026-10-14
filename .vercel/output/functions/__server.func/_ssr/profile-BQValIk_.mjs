//#region node_modules/.nitro/vite/services/ssr/assets/profile-BQValIk_.js
var USERNAME_RE = /^[a-z0-9_]{3,20}$/;
var RESERVED_USERNAMES = /* @__PURE__ */ new Set([
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
	"status"
]);
var DEFAULT_THEME = {
	backgroundType: "solid",
	backgroundColor: "#09090b",
	backgroundColor2: "#16161c",
	backgroundImage: "",
	accentColor: "#c8ccd4",
	textColor: "#f4f4f5",
	iconColor: "#d4d4d8",
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
	badge: "none"
};
var HEX = /^#([0-9a-fA-F]{6})$/;
function hex(value, fallback) {
	return typeof value === "string" && HEX.test(value) ? value : fallback;
}
function str(value, fallback, max = 500) {
	if (typeof value !== "string") return fallback;
	return value.slice(0, max);
}
function num(value, fallback, min, max) {
	const n = typeof value === "number" ? value : Number(value);
	if (!Number.isFinite(n)) return fallback;
	return Math.min(max, Math.max(min, Math.round(n)));
}
function bool(value, fallback) {
	return typeof value === "boolean" ? value : fallback;
}
var BG_EFFECTS = [
	"none",
	"particles",
	"rain",
	"snow",
	"stars",
	"grid",
	"orbs"
];
var NAME_EFFECTS = [
	"none",
	"glow",
	"glitch",
	"gradient",
	"typewriter"
];
var LAYOUTS = ["float", "panel"];
var BG_TYPES = [
	"solid",
	"gradient",
	"image"
];
var STATUSES = [
	"none",
	"online",
	"playing",
	"listening"
];
var BADGES = [
	"none",
	"verified",
	"og",
	"staff"
];
var SOCIAL_KINDS = [
	"x",
	"instagram",
	"youtube",
	"twitch",
	"discord",
	"github",
	"tiktok",
	"spotify",
	"website",
	"custom"
];
function oneOf(value, list, fallback) {
	return typeof value === "string" && list.includes(value) ? value : fallback;
}
function safeAssetUrl(value, max = 22e4) {
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
function safeLinkUrl(value) {
	const v = str(value, "", 500).trim();
	if (!v) return "";
	try {
		const u = new URL(v);
		if (u.protocol === "http:" || u.protocol === "https:" || u.protocol === "mailto:") return v;
	} catch {
		return "";
	}
	return "";
}
function safeAudio(value) {
	const v = str(value, "", 500).trim();
	if (!v) return "";
	if (v.startsWith("ambient:")) {
		const kind = v.slice(8);
		if ([
			"drone",
			"rain",
			"pulse",
			"hum"
		].includes(kind)) return v;
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
function sanitizeTheme(input) {
	const t = input && typeof input === "object" ? input : {};
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
		cursorUrl: safeAssetUrl(t.cursorUrl, 8e4),
		statusText: str(t.statusText, d.statusText, 64),
		statusKind: oneOf(t.statusKind, STATUSES, d.statusKind),
		badge: oneOf(t.badge, BADGES, d.badge)
	};
}
function sanitizeLinks(input) {
	if (!Array.isArray(input)) return [];
	const out = [];
	for (const raw of input.slice(0, 16)) {
		if (!raw || typeof raw !== "object") continue;
		const r = raw;
		const kind = oneOf(r.kind, SOCIAL_KINDS, "custom");
		const url = safeLinkUrl(r.url);
		if (!url) continue;
		out.push({
			id: str(r.id, cryptoRandomId(), 40) || cryptoRandomId(),
			kind,
			label: str(r.label, kind, 32),
			url,
			hidden: bool(r.hidden, false)
		});
	}
	return out;
}
function cryptoRandomId() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `l_${Math.random().toString(36).slice(2, 10)}`;
}
function normalizeUsername(raw) {
	return raw.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
}
function validateUsername(username) {
	if (!USERNAME_RE.test(username)) return {
		ok: false,
		error: "3–20 characters, lowercase letters, numbers, underscore."
	};
	if (RESERVED_USERNAMES.has(username)) return {
		ok: false,
		error: "That name is reserved."
	};
	return { ok: true };
}
function parseJson(value, fallback) {
	if (value == null) return fallback;
	if (typeof value === "string") try {
		return JSON.parse(value);
	} catch {
		return fallback;
	}
	return value;
}
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "N";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[1][0]).toUpperCase();
}
var TEMPLATES = [
	{
		id: "void",
		name: "Void",
		blurb: "Black field, silver type, slow stars.",
		theme: { ...DEFAULT_THEME }
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
			accentColor: "#d7dde6",
			textColor: "#f5f7fa",
			iconColor: "#e6ebf2",
			layout: "panel",
			bgEffect: "particles",
			usernameEffect: "glow",
			audioUrl: "ambient:hum",
			audioTitle: "Altitude",
			cardOpacity: 28,
			cardBlur: 16
		}
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
			accentColor: "#cfd3da",
			textColor: "#f4f4f5",
			layout: "float",
			bgEffect: "rain",
			usernameEffect: "glitch",
			audioUrl: "ambient:rain",
			audioTitle: "Downpour",
			enterText: "step inside",
			typewriterBio: true
		}
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
			accentColor: "#e4d2c2",
			textColor: "#f6efe8",
			iconColor: "#eadccf",
			layout: "panel",
			bgEffect: "orbs",
			usernameEffect: "gradient",
			audioUrl: "ambient:pulse",
			audioTitle: "Low heat",
			cardOpacity: 34,
			cardBlur: 20
		}
	},
	{
		id: "grid",
		name: "Grid",
		blurb: "Blueprint night, typewriter bio.",
		theme: {
			...DEFAULT_THEME,
			backgroundType: "solid",
			backgroundColor: "#0b0b0d",
			accentColor: "#c8ccd4",
			layout: "float",
			bgEffect: "grid",
			usernameEffect: "none",
			typewriterBio: true,
			audioUrl: "ambient:drone",
			audioTitle: "Carrier",
			glowEnabled: false
		}
	},
	{
		id: "frost",
		name: "Frost",
		blurb: "Ice wash, falling snow.",
		theme: {
			...DEFAULT_THEME,
			backgroundType: "gradient",
			backgroundColor: "#071018",
			backgroundColor2: "#13202c",
			accentColor: "#c5d8e6",
			textColor: "#eef6fb",
			iconColor: "#d5e6f1",
			layout: "panel",
			bgEffect: "snow",
			usernameEffect: "glow",
			audioUrl: "ambient:hum",
			audioTitle: "Icefield",
			cardOpacity: 22,
			cardBlur: 14
		}
	}
];
var BG_EFFECT_OPTIONS = [
	{
		id: "none",
		label: "None"
	},
	{
		id: "stars",
		label: "Stars"
	},
	{
		id: "particles",
		label: "Dust"
	},
	{
		id: "rain",
		label: "Rain"
	},
	{
		id: "snow",
		label: "Snow"
	},
	{
		id: "orbs",
		label: "Orbs"
	},
	{
		id: "grid",
		label: "Grid"
	}
];
var NAME_EFFECT_OPTIONS = [
	{
		id: "none",
		label: "None"
	},
	{
		id: "glow",
		label: "Glow"
	},
	{
		id: "gradient",
		label: "Shift"
	},
	{
		id: "glitch",
		label: "Glitch"
	},
	{
		id: "typewriter",
		label: "Type"
	}
];
var SOCIAL_META = {
	x: {
		label: "X",
		placeholder: "https://x.com/you"
	},
	instagram: {
		label: "Instagram",
		placeholder: "https://instagram.com/you"
	},
	youtube: {
		label: "YouTube",
		placeholder: "https://youtube.com/@you"
	},
	twitch: {
		label: "Twitch",
		placeholder: "https://twitch.tv/you"
	},
	discord: {
		label: "Discord",
		placeholder: "https://discord.gg/invite"
	},
	github: {
		label: "GitHub",
		placeholder: "https://github.com/you"
	},
	tiktok: {
		label: "TikTok",
		placeholder: "https://tiktok.com/@you"
	},
	spotify: {
		label: "Spotify",
		placeholder: "https://open.spotify.com/user/you"
	},
	website: {
		label: "Website",
		placeholder: "https://"
	},
	custom: {
		label: "Custom",
		placeholder: "https://"
	}
};
//#endregion
export { SOCIAL_META as a, initials as c, sanitizeLinks as d, sanitizeTheme as f, SOCIAL_KINDS as i, normalizeUsername as l, DEFAULT_THEME as n, TEMPLATES as o, validateUsername as p, NAME_EFFECT_OPTIONS as r, cryptoRandomId as s, BG_EFFECT_OPTIONS as t, parseJson as u };
