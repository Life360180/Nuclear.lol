import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as initials } from "./profile-BQValIk_.mjs";
import { h as Eye } from "../_libs/lucide-react.mjs";
import { o as Route$4 } from "./router-nf28IvkW.mjs";
import { t as SiteNav } from "./site-nav-DL1Bqr9C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore-CKEtgEL1.js
var import_jsx_runtime = require_jsx_runtime();
function Explore() {
	const { profiles } = Route$4.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { solid: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-5xl px-5 py-12 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold tracking-tight",
					children: "Explore"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Public pages, ranked by views."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { profile: p }, p.username))
				})
			]
		})]
	});
}
function Card({ profile }) {
	const bg = profile.theme.backgroundType === "image" && profile.theme.backgroundImage ? `url(${profile.theme.backgroundImage})` : `linear-gradient(160deg, ${profile.theme.backgroundColor}, ${profile.theme.backgroundColor2})`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/u/$username",
		params: { username: profile.username },
		className: "overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-150 hover:bg-elevated",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-28 bg-cover bg-center",
			style: { backgroundImage: bg }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-11 place-items-center overflow-hidden rounded-full bg-elevated",
					children: profile.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: profile.avatarUrl,
						alt: "",
						className: "size-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: initials(profile.displayName || profile.username)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-medium",
						children: profile.displayName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-xs text-muted",
						children: ["/", profile.username]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1 text-xs tabular-nums text-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3" }), profile.views.toLocaleString()]
				})
			]
		})]
	});
}
//#endregion
export { Explore as component };
