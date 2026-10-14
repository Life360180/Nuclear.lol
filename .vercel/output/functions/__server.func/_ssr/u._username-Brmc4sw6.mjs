import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Pencil } from "../_libs/lucide-react.mjs";
import { d as incrementViews, n as NotFound, r as Route$1 } from "./router-nf28IvkW.mjs";
import { t as ProfileStage } from "./profile-stage-DPufXOP1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/u._username-Brmc4sw6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PublicProfile() {
	const { profile } = Route$1.useLoaderData();
	const { username } = Route$1.useParams();
	(0, import_react.useEffect)(() => {
		if (!profile) return;
		const key = `nuclear-viewed:${username}`;
		try {
			if (sessionStorage.getItem(key)) return;
			sessionStorage.setItem(key, "1");
		} catch {}
		incrementViews({ data: { username } });
	}, [profile, username]);
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFound, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileStage, {
			profile,
			mode: "live"
		}), profile.isOwner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/studio",
			className: "absolute top-4 right-4 z-40 inline-flex h-11 items-center gap-2 rounded-md bg-bg/70 px-3 text-sm text-fg backdrop-blur-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), "Edit"]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "absolute top-4 right-4 z-40 font-display text-xs tracking-[0.2em] text-fg/50 hover:text-fg",
			children: "Nuclear"
		})]
	});
}
//#endregion
export { PublicProfile as component };
