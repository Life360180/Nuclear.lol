import { o as TEMPLATES } from "./profile-BQValIk_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seed-profiles-CZeo_WSr.js
function templateTheme(id) {
	return { ...(TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0]).theme };
}
var SEED_PROFILES = [
	{
		userId: "seed-aurora",
		username: "aurora",
		displayName: "aurora",
		bio: "Between stations. Always moving.",
		location: "Reykjavík",
		views: 24190,
		theme: {
			...templateTheme("frost"),
			statusKind: "listening",
			statusText: "northbound frequencies",
			badge: "og",
			enterEnabled: true
		},
		links: [
			{
				id: "a1",
				kind: "x",
				label: "X",
				url: "https://x.com",
				hidden: false
			},
			{
				id: "a2",
				kind: "spotify",
				label: "Spotify",
				url: "https://open.spotify.com",
				hidden: false
			},
			{
				id: "a3",
				kind: "website",
				label: "journal",
				url: "https://en.wikipedia.org/wiki/Aurora",
				hidden: false
			}
		]
	},
	{
		userId: "seed-kade",
		username: "kade",
		displayName: "KADE",
		bio: "Low light. Long nights. Still here.",
		location: "Osaka",
		views: 18702,
		theme: {
			...templateTheme("rain"),
			statusKind: "playing",
			statusText: "after hours",
			badge: "verified"
		},
		links: [
			{
				id: "k1",
				kind: "x",
				label: "X",
				url: "https://x.com",
				hidden: false
			},
			{
				id: "k2",
				kind: "github",
				label: "GitHub",
				url: "https://github.com",
				hidden: false
			},
			{
				id: "k3",
				kind: "twitch",
				label: "Twitch",
				url: "https://twitch.tv",
				hidden: false
			}
		]
	},
	{
		userId: "seed-mira",
		username: "mira",
		displayName: "mira",
		bio: "Collecting quiet things.",
		location: "Lisbon",
		views: 12440,
		theme: {
			...templateTheme("ember"),
			statusKind: "online",
			statusText: "around",
			badge: "none"
		},
		links: [
			{
				id: "m1",
				kind: "instagram",
				label: "Instagram",
				url: "https://instagram.com",
				hidden: false
			},
			{
				id: "m2",
				kind: "youtube",
				label: "YouTube",
				url: "https://youtube.com",
				hidden: false
			},
			{
				id: "m3",
				kind: "website",
				label: "studio",
				url: "https://en.wikipedia.org/wiki/Mira",
				hidden: false
			}
		]
	},
	{
		userId: "seed-juno",
		username: "juno",
		displayName: "juno",
		bio: "Building in the dark.",
		location: "nowhere",
		views: 9330,
		theme: {
			...templateTheme("grid"),
			statusKind: "playing",
			statusText: "a new layout",
			badge: "staff",
			typewriterBio: true
		},
		links: [
			{
				id: "j1",
				kind: "github",
				label: "GitHub",
				url: "https://github.com",
				hidden: false
			},
			{
				id: "j2",
				kind: "discord",
				label: "Discord",
				url: "https://discord.com",
				hidden: false
			},
			{
				id: "j3",
				kind: "x",
				label: "X",
				url: "https://x.com",
				hidden: false
			}
		]
	}
];
//#endregion
export { SEED_PROFILES };
