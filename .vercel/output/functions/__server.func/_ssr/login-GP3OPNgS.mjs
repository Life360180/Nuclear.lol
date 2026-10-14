import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link, v as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-CVqXY6bk.mjs";
import { t as GROK_PROVIDERS } from "./server-9ammAjWz.mjs";
import { a as Route$3 } from "./router-nf28IvkW.mjs";
import { n as useCurrentUserState, t as SiteNav } from "./site-nav-DL1Bqr9C.mjs";
import { t as Button } from "./button-u3iLP2jh.mjs";
import { n as Input, t as Field } from "./input-C-4aFUtt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-GP3OPNgS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { claim } = Route$3.useSearch();
	const { user, isPending } = useCurrentUserState();
	const callbackURL = claim ? `/studio?claim=${encodeURIComponent(claim)}` : "/studio";
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "grid min-h-[calc(100dvh-4rem)] place-items-center px-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 w-full max-w-md animate-pulse rounded-2xl bg-surface" })
		})]
	});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/studio",
		search: { claim }
	});
	const onEmail = async () => {
		setError("");
		setBusy(true);
		try {
			if (mode === "up") {
				const { error: err } = await authClient.signUp.email({
					email,
					password,
					name: name || email.split("@")[0] || "member",
					callbackURL
				});
				if (err) throw new Error(err.message || "Could not create account.");
			} else {
				const { error: err } = await authClient.signIn.email({
					email,
					password,
					callbackURL
				});
				if (err) throw new Error(err.message || "Could not sign in.");
			}
			window.location.href = callbackURL;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-md place-items-center px-5 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full rounded-2xl border border-border bg-surface p-6 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm tracking-[0.2em] text-muted",
						children: "NUCLEAR"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-2xl font-semibold tracking-tight",
						children: mode === "in" ? "Sign in" : "Create account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: claim ? `Then claim /${claim}` : "Your page follows you across devices."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-col gap-2",
						children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "w-full",
							onClick: () => void signIn(p.providerId, { callbackURL }),
							children: ["Continue with ", p.label]
						}, p.providerId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-6 flex items-center gap-3 text-[11px] tracking-wide text-subtle uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
							"or email",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex flex-col gap-3",
						onSubmit: (e) => {
							e.preventDefault();
							onEmail();
						},
						children: [
							mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: name,
									onChange: (e) => setName(e.target.value),
									autoComplete: "name"
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									value: email,
									required: true,
									autoComplete: "email",
									onChange: (e) => setEmail(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Password",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									value: password,
									required: true,
									minLength: 8,
									autoComplete: mode === "up" ? "new-password" : "current-password",
									onChange: (e) => setPassword(e.target.value)
								})
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-danger",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "mt-1 w-full",
								disabled: busy,
								children: busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-5 text-sm text-muted hover:text-fg",
						onClick: () => {
							setMode(mode === "in" ? "up" : "in");
							setError("");
						},
						children: mode === "in" ? "Need an account? Create one" : "Have an account? Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-xs text-subtle",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-muted",
							children: "Back home"
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { Login as component };
