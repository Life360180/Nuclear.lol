import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as initials } from "./profile-BQValIk_.mjs";
import { x as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { s as Route$5 } from "./router-nf28IvkW.mjs";
import { t as SiteNav } from "./site-nav-DL1Bqr9C.mjs";
import { t as ClaimForm } from "./claim-form-CcqSXJ_w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cz6x_96I.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { profiles, count } = Route$5.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative overflow-hidden px-5 pb-24 pt-10 sm:px-8 sm:pt-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute inset-0 opacity-40",
							style: {
								backgroundImage: "linear-gradient(to bottom, rgb(9 9 11 / 0.2), rgb(9 9 11)), url(/backgrounds/ridge.jpg)",
								backgroundSize: "cover",
								backgroundPosition: "center"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nox-grain pointer-events-none absolute inset-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto flex max-w-3xl flex-col items-start nox-stagger",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-[0.28em] text-muted uppercase",
									children: "Link in bio, actually designed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl",
									children: [
										"A page that's",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"actually yours."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg",
									children: [
										"Claim a name. Tune the atmosphere, the type, the sound. Share one link. ",
										count.toLocaleString(),
										" live pages on Nuclear."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-10 w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClaimForm, {})
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-t border-border px-5 py-20 sm:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid max-w-5xl gap-10 sm:grid-cols-3",
						children: [
							{
								n: "01",
								t: "Claim a name",
								d: "Your address is short and yours. Sign in and it stays claimed."
							},
							{
								n: "02",
								t: "Shape the page",
								d: "Colors, glass, weather, type effects, audio, custom cursor — live as you edit."
							},
							{
								n: "03",
								t: "Share the link",
								d: "One URL for every social, site, and project. No ads. No clutter."
							}
						].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs tracking-wide text-subtle",
								children: step.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-xl font-semibold",
								children: step.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: step.d
							})
						] }, step.n))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-t border-border px-5 py-20 sm:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-5xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold tracking-tight",
								children: "Live pages"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "Open one. Click to enter."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/explore",
								className: "inline-flex h-11 items-center gap-1 text-sm text-muted hover:text-fg",
								children: ["All pages", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileTile, { profile: p }, p.username))
						})]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border px-5 py-10 text-sm text-subtle sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-fg",
						children: "Nuclear"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your name, your atmosphere." })]
				})
			})
		]
	});
}
function ProfileTile({ profile }) {
	const bg = profile.theme.backgroundType === "image" && profile.theme.backgroundImage ? `url(${profile.theme.backgroundImage})` : `linear-gradient(160deg, ${profile.theme.backgroundColor}, ${profile.theme.backgroundColor2})`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/u/$username",
		params: { username: profile.username },
		className: "group overflow-hidden rounded-xl border border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/5] bg-elevated bg-cover bg-center",
			style: { backgroundImage: bg },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/45" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center px-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 grid size-16 place-items-center overflow-hidden rounded-full",
						style: {
							outline: `1px solid ${profile.theme.accentColor}`,
							outlineOffset: "2px"
						},
						children: profile.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: profile.avatarUrl,
							alt: "",
							className: "size-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-full place-items-center text-sm font-medium",
							style: {
								background: profile.theme.backgroundColor,
								color: profile.theme.accentColor
							},
							children: initials(profile.displayName || profile.username)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold",
						children: profile.displayName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: ["/", profile.username]
					})
				]
			})]
		})
	});
}
//#endregion
export { Home as component };
