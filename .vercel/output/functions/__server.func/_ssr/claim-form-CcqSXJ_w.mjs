import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as normalizeUsername, p as validateUsername } from "./profile-BQValIk_.mjs";
import { S as ArrowRight } from "../_libs/lucide-react.mjs";
import { c as checkUsername, l as claimUsername } from "./router-nf28IvkW.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as useCurrentUserState } from "./site-nav-DL1Bqr9C.mjs";
import { t as Button } from "./button-u3iLP2jh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/claim-form-CcqSXJ_w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClaimForm({ size = "lg" }) {
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [raw, setRaw] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [reason, setReason] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const username = normalizeUsername(raw);
	(0, import_react.useEffect)(() => {
		if (username.length < 3) {
			setStatus("idle");
			setReason("");
			return;
		}
		const valid = validateUsername(username);
		if (!valid.ok) {
			setStatus("taken");
			setReason(valid.error);
			return;
		}
		setStatus("checking");
		const handle = window.setTimeout(() => {
			checkUsername({ data: { username } }).then((res) => {
				setStatus(res.available ? "free" : "taken");
				setReason(res.available ? "Available" : res.reason ?? "Taken");
			}).catch(() => {
				setStatus("idle");
				setReason("");
			});
		}, 320);
		return () => window.clearTimeout(handle);
	}, [username]);
	const submit = async () => {
		const valid = validateUsername(username);
		if (!valid.ok) {
			setStatus("taken");
			setReason(valid.error);
			return;
		}
		if (isPending) return;
		if (!user) {
			try {
				sessionStorage.setItem("nuclear-claim", username);
			} catch {}
			navigate({
				to: "/login",
				search: { claim: username }
			});
			return;
		}
		setBusy(true);
		try {
			const res = await claimUsername({ data: { username } });
			navigate({
				to: "/studio",
				search: { claim: res.username }
			});
		} catch (err) {
			setStatus("taken");
			setReason(err instanceof Error ? err.message : "Could not claim that name.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: cn("w-full", size === "lg" ? "max-w-xl" : "max-w-md"),
		onSubmit: (e) => {
			e.preventDefault();
			submit();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-12 min-w-0 flex-1 items-center rounded-lg border border-border bg-surface px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 font-display text-sm text-subtle",
					children: "nuclear.lol /"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: raw,
					onChange: (e) => setRaw(e.target.value.toLowerCase()),
					placeholder: "yourname",
					autoCapitalize: "none",
					autoCorrect: "off",
					spellCheck: false,
					maxLength: 20,
					"aria-label": "Username",
					className: "min-w-0 flex-1 bg-transparent px-2 text-base text-fg outline-none placeholder:text-subtle"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				size: "lg",
				disabled: busy || username.length < 3,
				className: "h-12 shrink-0 rounded-lg sm:w-40",
				children: [busy ? "Claiming…" : "Claim", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-2 min-h-5 text-xs", status === "free" && "text-muted", status === "taken" && "text-danger", status === "checking" && "text-subtle"),
			children: username.length < 3 ? "3–20 characters. Letters, numbers, underscore." : status === "checking" ? "Checking…" : reason
		})]
	});
}
//#endregion
export { ClaimForm as t };
