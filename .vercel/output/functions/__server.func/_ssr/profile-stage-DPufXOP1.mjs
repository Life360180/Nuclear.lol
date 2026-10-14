import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as initials } from "./profile-BQValIk_.mjs";
import { _ as Diamond, a as Shield, b as BadgeCheck, f as Link, h as Eye, l as Pause, m as Globe, n as Volume2, s as Play, t as VolumeX, u as MapPin } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-stage-DPufXOP1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function noiseBuffer(ctx, seconds = 2) {
	const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
	return buffer;
}
function createAmbient(kind, initialVolume = .45) {
	if (!kind.startsWith("ambient:")) return null;
	const name = kind.slice(8);
	if (![
		"drone",
		"rain",
		"pulse",
		"hum"
	].includes(name)) return null;
	let ctx = null;
	let master = null;
	let nodes = [];
	let interval;
	let volume = initialVolume;
	const stop = () => {
		if (interval) window.clearInterval(interval);
		interval = void 0;
		for (const node of nodes) try {
			if ("stop" in node && typeof node.stop === "function") node.stop();
			node.disconnect();
		} catch {}
		nodes = [];
		if (ctx) ctx.close().catch(() => void 0);
		ctx = null;
		master = null;
	};
	const start = async () => {
		stop();
		ctx = new (window.AudioContext || window.webkitAudioContext)();
		master = ctx.createGain();
		master.gain.value = volume;
		master.connect(ctx.destination);
		if (name === "rain") {
			const src = ctx.createBufferSource();
			src.buffer = noiseBuffer(ctx, 2.5);
			src.loop = true;
			const filter = ctx.createBiquadFilter();
			filter.type = "highpass";
			filter.frequency.value = 900;
			const dry = ctx.createGain();
			dry.gain.value = .22;
			src.connect(filter);
			filter.connect(dry);
			dry.connect(master);
			src.start();
			nodes.push(src, filter, dry);
		}
		if (name === "drone" || name === "hum") {
			const freqs = name === "hum" ? [92, 138] : [55, 82.5];
			for (const f of freqs) {
				const osc = ctx.createOscillator();
				osc.type = "sine";
				osc.frequency.value = f;
				const g = ctx.createGain();
				g.gain.value = .12;
				osc.connect(g);
				g.connect(master);
				osc.start();
				nodes.push(osc, g);
			}
		}
		if (name === "pulse") {
			const osc = ctx.createOscillator();
			osc.type = "sine";
			osc.frequency.value = 48;
			const g = ctx.createGain();
			g.gain.value = .02;
			osc.connect(g);
			g.connect(master);
			osc.start();
			nodes.push(osc, g);
			const tick = () => {
				if (!ctx || !g) return;
				const now = ctx.currentTime;
				g.gain.cancelScheduledValues(now);
				g.gain.setValueAtTime(.02, now);
				g.gain.linearRampToValueAtTime(.16, now + .08);
				g.gain.exponentialRampToValueAtTime(.02, now + 1.4);
			};
			tick();
			interval = window.setInterval(tick, 1600);
		}
		if (ctx.state === "suspended") await ctx.resume();
	};
	return {
		start,
		stop,
		setVolume: (value) => {
			volume = Math.max(0, Math.min(1, value));
			if (master) master.gain.value = volume;
		}
	};
}
function usePrefersReducedMotion() {
	const ref = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		ref.current = mq.matches;
		const on = () => {
			ref.current = mq.matches;
		};
		mq.addEventListener("change", on);
		return () => mq.removeEventListener("change", on);
	}, []);
	return ref;
}
function ProfileEffects({ effect, color }) {
	if (effect === "none") return null;
	if (effect === "grid") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nox-grid-bg pointer-events-none absolute inset-0" });
	if (effect === "orbs") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbs, { color });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleCanvas, {
		effect,
		color
	});
}
function Orbs({ color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "nox-anim absolute -left-10 top-1/4 size-[42vmax] rounded-full blur-3xl",
			style: {
				background: color,
				opacity: .16,
				animation: "nox-float 16s ease-in-out infinite"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "nox-anim absolute -right-8 bottom-0 size-[36vmax] rounded-full blur-3xl",
			style: {
				background: color,
				opacity: .12,
				animation: "nox-float-alt 22s ease-in-out infinite"
			}
		})]
	});
}
function ParticleCanvas({ effect, color }) {
	const canvasRef = (0, import_react.useRef)(null);
	const reduced = usePrefersReducedMotion();
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let width = 0;
		let height = 0;
		let raf = 0;
		let running = true;
		const resize = () => {
			const parent = canvas.parentElement;
			width = parent?.clientWidth ?? window.innerWidth;
			height = parent?.clientHeight ?? window.innerHeight;
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();
		window.addEventListener("resize", resize);
		const isMobile = width < 640;
		const count = effect === "stars" ? isMobile ? 48 : 90 : effect === "rain" ? isMobile ? 40 : 70 : isMobile ? 32 : 56;
		const spawn = () => {
			if (effect === "rain") return {
				x: Math.random() * width,
				y: Math.random() * height,
				vx: -.4,
				vy: 8 + Math.random() * 10,
				r: 1,
				a: .18 + Math.random() * .35
			};
			if (effect === "snow") return {
				x: Math.random() * width,
				y: Math.random() * height,
				vx: -.3 + Math.random() * .6,
				vy: .4 + Math.random() * .9,
				r: 1 + Math.random() * 2,
				a: .25 + Math.random() * .45
			};
			return {
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - .5) * (effect === "stars" ? .15 : .35),
				vy: (Math.random() - .5) * (effect === "stars" ? .15 : .35),
				r: effect === "stars" ? .6 + Math.random() * 1.4 : 1 + Math.random() * 1.8,
				a: .2 + Math.random() * .6
			};
		};
		let particles = Array.from({ length: count }, spawn);
		const tick = () => {
			if (!running) return;
			ctx.clearRect(0, 0, width, height);
			if (reduced.current) {
				ctx.fillStyle = color;
				for (const p of particles) {
					ctx.globalAlpha = p.a * .5;
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
					ctx.fill();
				}
				ctx.globalAlpha = 1;
				return;
			}
			ctx.fillStyle = color;
			ctx.strokeStyle = color;
			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;
				if (effect === "rain") {
					if (p.y > height + 10 || p.x < -10) {
						p.x = Math.random() * width + 20;
						p.y = -8;
					}
					ctx.globalAlpha = p.a;
					ctx.beginPath();
					ctx.moveTo(p.x, p.y);
					ctx.lineTo(p.x + p.vx * 2, p.y + 10);
					ctx.lineWidth = 1;
					ctx.stroke();
				} else {
					if (p.x < -4) p.x = width + 4;
					if (p.x > width + 4) p.x = -4;
					if (p.y < -4) p.y = height + 4;
					if (p.y > height + 4) p.y = -4;
					if (effect === "stars") {
						p.a += (Math.random() - .5) * .04;
						p.a = Math.min(.9, Math.max(.12, p.a));
					}
					ctx.globalAlpha = p.a;
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
					ctx.fill();
				}
			}
			ctx.globalAlpha = 1;
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => {
			running = false;
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			particles = [];
		};
	}, [effect, color]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "pointer-events-none absolute inset-0 h-full w-full"
	});
}
function Ico(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		width: "1em",
		height: "1em",
		...props
	});
}
function SocialGlyph({ kind, className }) {
	switch (kind) {
		case "x": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
			className,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
		});
		case "instagram": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Ico, {
			className,
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "3.5",
					y: "3.5",
					width: "17",
					height: "17",
					rx: "5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "12",
					r: "4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "17.4",
					cy: "6.6",
					r: "0.9",
					fill: "currentColor",
					stroke: "none"
				})
			]
		});
		case "youtube": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
			className,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M23.5 6.2a4 4 0 0 0-2.8-2.8C18.7 3 12 3 12 3s-6.7 0-8.7.4A4 4 0 0 0 .5 6.2 42 42 0 0 0 0 12a42 42 0 0 0 .5 5.8 4 4 0 0 0 2.8 2.8C5.3 21 12 21 12 21s6.7 0 8.7-.4a4 4 0 0 0 2.8-2.8A42 42 0 0 0 24 12a42 42 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" })
		});
		case "twitch": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
			className,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 3h16v11.2L16.3 21H12l-2.2 2H7.3v-2H4V3zm2.2 2.2v12.3h4v2.1l2.1-2.1h3.6l2.5-2.5V5.2H6.2zm7.2 8.2h2.2V8.3h-2.2v5.1zm-4.3 0h2.2V8.3H9.1v5.1z" })
		});
		case "discord": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
			className,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.7 5.3A18 18 0 0 0 15.2 4l-.4.8a16 16 0 0 1 3 1.2 13 13 0 0 0-12.6 0 16 16 0 0 1 3-1.2L8 4a18 18 0 0 0-4.5 1.3C1.3 9.4.6 13.4 1 17.3A18 18 0 0 0 6.6 20l.8-1.1a12 12 0 0 1-1.9-1l.4-.3h.1c4 1.8 8.3 1.8 12.2 0l.5.3a12 12 0 0 1-1.9 1l.8 1.1a18 18 0 0 0 5.6-2.7c.5-4.5-.7-8.4-2.9-12zM8.7 14.7c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2zm6.6 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2z" })
		});
		case "github": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
			className,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.2 3.4 9.6 8.1 10.2.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C16.9 4.7 18 5 18 5c.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.4 6 .4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.7-.6 8.1-5 8.1-10.2A11.5 11.5 0 0 0 12 .5z" })
		});
		case "tiktok": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
			className,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14.5 3h2.3c.2 2 1.5 3.6 3.5 4v2.4c-1.2 0-2.3-.3-3.3-.9v6.7A6.7 6.7 0 1 1 9.2 8.6v2.5a4.3 4.3 0 1 0 3.1 4.1V3z" })
		});
		case "spotify": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ico, {
			className,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 1.5A10.5 10.5 0 1 0 22.5 12 10.5 10.5 0 0 0 12 1.5zm4.8 15.1a.7.7 0 0 1-1 .2 8.7 8.7 0 0 0-8.7-.2.7.7 0 1 1-.7-1.2 10.1 10.1 0 0 1 10.1.2.7.7 0 0 1 .3 1zm1.3-2.9a.85.85 0 0 1-1.2.3 10.7 10.7 0 0 0-10.6-.2.85.85 0 1 1-.8-1.5 12.4 12.4 0 0 1 12.3.3.85.85 0 0 1 .3 1.1zm.1-3a1 1 0 0 1-1.4.3 13.5 13.5 0 0 0-13.4-.3 1 1 0 1 1-1-1.8 15.5 15.5 0 0 1 15.4.3 1 1 0 0 1 .4 1.5z" })
		});
		case "website": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
			className,
			strokeWidth: 1.8
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			className,
			strokeWidth: 1.8
		});
	}
}
function ProfileStage({ profile, mode = "live", entered: enteredProp, onEntered }) {
	const theme = profile.theme;
	const isPreview = mode === "preview";
	const [entered, setEntered] = (0, import_react.useState)(isPreview || enteredProp === true || !theme.enterEnabled);
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [volume, setVolume] = (0, import_react.useState)(.5);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const audioRef = (0, import_react.useRef)(null);
	const ambientRef = (0, import_react.useRef)(null);
	const mixRef = (0, import_react.useRef)({
		muted: false,
		volume: .5
	});
	mixRef.current = {
		muted,
		volume
	};
	(0, import_react.useEffect)(() => {
		if (enteredProp === true) setEntered(true);
	}, [enteredProp]);
	(0, import_react.useEffect)(() => {
		if (isPreview) setEntered(true);
	}, [isPreview, theme.enterEnabled]);
	const glow = theme.glowColor || theme.accentColor;
	const cursor = theme.cursorUrl ? `url(${theme.cursorUrl}) 12 12, auto` : void 0;
	const cssVars = {
		"--p-accent": theme.accentColor,
		"--p-text": theme.textColor,
		"--p-icon": theme.iconColor,
		"--p-glow": glow
	};
	const background = (0, import_react.useMemo)(() => {
		if (theme.backgroundType === "image" && theme.backgroundImage) return {
			backgroundColor: theme.backgroundColor,
			backgroundImage: `linear-gradient(to bottom, rgb(0 0 0 / 0.35), rgb(0 0 0 / 0.55)), url(${theme.backgroundImage})`,
			backgroundSize: "cover",
			backgroundPosition: "center"
		};
		if (theme.backgroundType === "gradient") return { backgroundImage: `linear-gradient(160deg, ${theme.backgroundColor}, ${theme.backgroundColor2})` };
		return { backgroundColor: theme.backgroundColor };
	}, [theme]);
	(0, import_react.useEffect)(() => {
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
			const handle = createAmbient(url, mix.muted ? 0 : mix.volume * .7);
			ambientRef.current = handle;
			if (handle) handle.start().then(() => setPlaying(true));
			return () => {
				handle?.stop();
				setPlaying(false);
			};
		}
		const el = new Audio(url);
		el.loop = true;
		el.volume = mix.muted ? 0 : mix.volume;
		audioRef.current = el;
		el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
		return () => {
			el.pause();
			audioRef.current = null;
			setPlaying(false);
		};
	}, [
		entered,
		isPreview,
		theme.audioUrl
	]);
	(0, import_react.useEffect)(() => {
		if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
		ambientRef.current?.setVolume(muted ? 0 : volume * .7);
	}, [muted, volume]);
	const enter = () => {
		if (entered) return;
		setEntered(true);
		onEntered?.();
	};
	const visibleLinks = profile.links.filter((l) => !l.hidden);
	const iconLinks = visibleLinks.filter((l) => l.kind !== "website" && l.kind !== "custom");
	const buttonLinks = visibleLinks.filter((l) => l.kind === "website" || l.kind === "custom");
	const panelStyle = theme.layout === "panel" ? {
		background: `rgb(8 8 10 / ${theme.cardOpacity / 100})`,
		backdropFilter: `blur(${theme.cardBlur}px)`,
		WebkitBackdropFilter: `blur(${theme.cardBlur}px)`,
		border: `1px solid color-mix(in oklab, ${theme.accentColor} 22%, transparent)`,
		boxShadow: theme.glowEnabled ? `0 0 80px -24px ${glow}` : "0 20px 60px -32px rgb(0 0 0 / 0.7)"
	} : {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("nox-grain relative isolate overflow-hidden", isPreview ? "h-full w-full" : "h-dvh w-full"),
		style: {
			...cssVars,
			...background,
			color: theme.textColor,
			cursor
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileEffects, {
				effect: theme.bgEffect,
				color: theme.accentColor
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-bg/25" }),
			(entered || isPreview) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("relative z-10 flex h-full flex-col items-center justify-center overflow-y-auto px-5 py-16", isPreview ? "scale-[0.92]" : ""),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex w-full max-w-md flex-col items-center text-center", theme.layout === "panel" && "rounded-2xl px-8 py-10"),
					style: panelStyle,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							profile,
							glow: theme.glowEnabled ? glow : void 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Username, {
							name: profile.displayName || profile.username,
							effect: theme.usernameEffect,
							entered
						}),
						theme.badge !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeMark, { kind: theme.badge }) : null,
						profile.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 flex items-center gap-1.5 text-xs tracking-wide opacity-70",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), profile.location]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bio, {
							text: profile.bio,
							typewriter: theme.typewriterBio && entered
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusWidget, {
							kind: theme.statusKind,
							text: theme.statusText,
							accent: theme.accentColor
						}),
						iconLinks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 flex flex-wrap items-center justify-center gap-3",
							children: iconLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: link.url,
								target: "_blank",
								rel: "noreferrer",
								"aria-label": link.label || link.kind,
								className: "grid size-11 place-items-center rounded-full transition-transform duration-150 hover:scale-105",
								style: {
									color: theme.iconColor,
									background: `color-mix(in oklab, ${theme.iconColor} 12%, transparent)`,
									boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${theme.iconColor} 22%, transparent)`
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialGlyph, {
									kind: link.kind,
									className: "size-4"
								})
							}, link.id))
						}) : null,
						buttonLinks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex w-full flex-col gap-2",
							children: buttonLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: link.url,
								target: "_blank",
								rel: "noreferrer",
								className: "flex h-11 items-center justify-center rounded-md text-sm font-medium transition-opacity duration-150 hover:opacity-90",
								style: {
									background: theme.accentColor,
									color: theme.backgroundColor
								},
								children: link.label || "link"
							}, link.id))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-8 flex items-center gap-1.5 text-[11px] tabular-nums tracking-wide opacity-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3" }),
								profile.views.toLocaleString(),
								" views"
							]
						})
					]
				})
			}),
			theme.volumeControl && entered && theme.audioUrl && !isPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-5 left-5 z-20 flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": muted ? "Unmute" : "Mute",
						onClick: () => setMuted((m) => !m),
						className: "grid size-11 place-items-center rounded-full bg-bg/50 text-fg",
						children: muted || volume === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 1,
						step: .01,
						value: muted ? 0 : volume,
						"aria-label": "Volume",
						onChange: (e) => {
							const v = Number(e.target.value);
							setVolume(v);
							if (v > 0) setMuted(false);
						},
						className: "h-1 w-24 cursor-pointer appearance-none rounded-full bg-fg/20"
					}),
					playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5 opacity-40" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 opacity-40" })
				]
			}) : null,
			theme.audioTitle && entered && theme.audioUrl && !isPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "absolute bottom-6 right-5 z-20 max-w-[40%] truncate text-right text-[11px] tracking-wide opacity-50",
				children: theme.audioTitle
			}) : null,
			!entered && !isPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: enter,
				className: "absolute inset-0 z-30 flex flex-col items-center justify-center bg-bg/70 backdrop-blur-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-4xl font-semibold tracking-tight sm:text-6xl",
						children: profile.displayName || profile.username
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-8 text-sm tracking-[0.32em] uppercase opacity-80",
						children: theme.enterText || "click to enter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "nox-anim mt-5 h-px w-28 origin-center bg-current",
						style: { animation: "nox-pulse-line 2.2s ease-in-out infinite" }
					})
				]
			}) : null
		]
	});
}
function Avatar({ profile, glow }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-5 grid size-28 place-items-center overflow-hidden rounded-full",
		style: {
			boxShadow: glow ? `0 0 40px ${glow}` : void 0,
			outline: `2px solid color-mix(in oklab, var(--p-accent) 70%, transparent)`,
			outlineOffset: "3px"
		},
		children: profile.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: profile.avatarUrl,
			alt: "",
			className: "size-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-full place-items-center font-display text-2xl font-semibold",
			style: {
				background: "color-mix(in oklab, var(--p-accent) 18%, #111)",
				color: "var(--p-accent)"
			},
			children: initials(profile.displayName || profile.username)
		})
	});
}
function Username({ name, effect, entered }) {
	const typed = useTypewriter(name, effect === "typewriter" && entered, false);
	const shown = effect === "typewriter" ? typed : name;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
		className: cn("font-display text-3xl font-semibold tracking-tight sm:text-4xl", effect === "glow" && "nox-name-glow", effect === "gradient" && "nox-name-gradient", effect === "glitch" && "nox-name-glitch"),
		children: [shown, effect === "typewriter" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "nox-anim ml-0.5 inline-block w-2 bg-current",
			style: { animation: "nox-caret 1s steps(1) infinite" },
			children: "\xA0"
		}) : null]
	});
}
function Bio({ text, typewriter }) {
	const typed = useTypewriter(text, typewriter, true);
	if (!text) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-4 max-w-sm text-sm leading-relaxed opacity-80",
		children: [typewriter ? typed : text, typewriter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "nox-anim ml-0.5 inline-block w-1.5 bg-current align-baseline",
			style: { animation: "nox-caret 1s steps(1) infinite" },
			children: "\xA0"
		}) : null]
	});
}
function useTypewriter(text, enabled, loop) {
	const [out, setOut] = (0, import_react.useState)(enabled ? "" : text);
	(0, import_react.useEffect)(() => {
		if (!enabled) {
			setOut(text);
			return;
		}
		let i = 0;
		let dir = 1;
		let pause = 0;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
	}, [
		text,
		enabled,
		loop
	]);
	return out;
}
function BadgeMark({ kind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "mt-2 inline-flex items-center gap-1 text-[11px] tracking-wide opacity-70",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(kind === "verified" ? BadgeCheck : kind === "staff" ? Shield : Diamond, { className: "size-3.5" }), kind === "verified" ? "Verified" : kind === "staff" ? "Staff" : "Original"]
	});
}
function StatusWidget({ kind, text, accent }) {
	if (kind === "none" || !text) return null;
	const prefix = kind === "online" ? "Online" : kind === "playing" ? "Playing" : "Listening";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 flex w-full max-w-xs items-center gap-3 rounded-md px-3 py-2 text-left text-xs",
		style: {
			background: `color-mix(in oklab, ${accent} 12%, transparent)`,
			boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${accent} 20%, transparent)`
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-2 shrink-0 rounded-full",
			style: { background: accent }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "opacity-60",
				children: prefix
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1.5 truncate",
				children: text
			})]
		})]
	});
}
//#endregion
export { SocialGlyph as n, ProfileStage as t };
