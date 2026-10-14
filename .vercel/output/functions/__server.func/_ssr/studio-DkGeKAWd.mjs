import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link, v as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SOCIAL_META, i as SOCIAL_KINDS, l as normalizeUsername, o as TEMPLATES, r as NAME_EFFECT_OPTIONS, s as cryptoRandomId, t as BG_EFFECT_OPTIONS } from "./profile-BQValIk_.mjs";
import { d as LoaderCircle, g as ExternalLink, i as Trash2, o as Plus, p as ImagePlus, v as Copy, y as Check } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as renameMyUsername, i as Route$2, l as claimUsername, p as saveMyProfile, u as getMyProfile } from "./router-nf28IvkW.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as useCurrentUserState, t as SiteNav } from "./site-nav-DL1Bqr9C.mjs";
import { t as Button } from "./button-u3iLP2jh.mjs";
import { i as Textarea, n as Input, r as NativeSelect, t as Field } from "./input-C-4aFUtt.mjs";
import { t as ClaimForm } from "./claim-form-CcqSXJ_w.mjs";
import { n as SocialGlyph, t as ProfileStage } from "./profile-stage-DPufXOP1.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-DkGeKAWd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Slider({ value, min = 0, max = 100, step = 1, onValueChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [label ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-xs font-medium text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums text-fg",
				children: value
			})]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
			value: [value],
			min,
			max,
			step,
			onValueChange: (v) => onValueChange(v[0] ?? value),
			className: "relative flex h-11 w-full touch-none items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
				className: "relative h-1.5 w-full grow rounded-full bg-elevated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full rounded-full bg-accent" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: cn("block size-4 rounded-full bg-fg shadow-sm", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70") })]
		})]
	});
}
function Switch({ checked, onCheckedChange, disabled, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex min-h-11 items-center justify-between gap-3",
		children: [label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-fg",
			children: label
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
			checked,
			onCheckedChange,
			disabled,
			className: cn("relative h-6 w-11 shrink-0 rounded-full border border-border bg-elevated transition-colors duration-150", "data-[state=checked]:bg-accent data-[state=checked]:border-accent", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70", "disabled:opacity-40"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("block size-5 translate-x-0.5 rounded-full bg-fg transition-transform duration-150", "data-[state=checked]:translate-x-5 data-[state=checked]:bg-accent-fg") })
		})]
	});
}
async function compressImageFile(file, opts = {
	maxEdge: 1280,
	maxBytes: 14e4
}) {
	if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, opts.maxEdge / Math.max(bitmap.width, bitmap.height));
	const width = Math.max(1, Math.round(bitmap.width * scale));
	const height = Math.max(1, Math.round(bitmap.height * scale));
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not process that image.");
	ctx.drawImage(bitmap, 0, 0, width, height);
	bitmap.close();
	let quality = opts.quality ?? .82;
	let data = canvas.toDataURL("image/jpeg", quality);
	while (data.length > opts.maxBytes && quality > .42) {
		quality -= .08;
		data = canvas.toDataURL("image/jpeg", quality);
	}
	if (data.length > opts.maxBytes) throw new Error("Image is still too large. Try a smaller file.");
	return data;
}
var TABS = [
	{
		id: "identity",
		label: "Identity"
	},
	{
		id: "look",
		label: "Look"
	},
	{
		id: "effects",
		label: "Effects"
	},
	{
		id: "audio",
		label: "Audio"
	},
	{
		id: "links",
		label: "Links"
	},
	{
		id: "templates",
		label: "Presets"
	}
];
function StudioForm({ profile, tab, onTab, onChange, onTheme, onLinks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-16 z-20 -mx-1 flex gap-1 overflow-x-auto bg-bg/95 px-1 py-2 backdrop-blur-md",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onTab(t.id),
				className: cn("h-10 shrink-0 rounded-md px-3 text-sm transition-colors duration-150", tab === t.id ? "bg-elevated text-fg" : "text-muted hover:text-fg"),
				children: t.label
			}, t.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5 py-4",
			children: [
				tab === "identity" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityFields, {
					profile,
					onChange,
					onTheme
				}) : null,
				tab === "look" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookFields, {
					theme: profile.theme,
					onTheme
				}) : null,
				tab === "effects" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EffectsFields, {
					theme: profile.theme,
					onTheme
				}) : null,
				tab === "audio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioFields, {
					theme: profile.theme,
					onTheme
				}) : null,
				tab === "links" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinksFields, {
					links: profile.links,
					onLinks
				}) : null,
				tab === "templates" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateFields, { onApply: (theme) => onTheme(theme) }) : null
			]
		})]
	});
}
function IdentityFields({ profile, onChange, onTheme }) {
	const fileRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Display name",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: profile.displayName,
				maxLength: 32,
				onChange: (e) => onChange({ displayName: e.target.value })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Bio",
			hint: `${profile.bio.length}/280`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: profile.bio,
				maxLength: 280,
				onChange: (e) => onChange({ bio: e.target.value })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Location",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: profile.location,
				maxLength: 48,
				onChange: (e) => onChange({ location: e.target.value })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium tracking-wide text-muted",
				children: "Avatar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: profile.avatarUrl.startsWith("data:") ? "" : profile.avatarUrl,
						placeholder: "Image URL",
						onChange: (e) => onChange({ avatarUrl: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "shrink-0",
						onClick: () => fileRef.current?.click(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), "Upload"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (e) => {
							const file = e.target.files?.[0];
							e.target.value = "";
							if (!file) return;
							compressImageFile(file, {
								maxEdge: 512,
								maxBytes: 9e4
							}).then((url) => onChange({ avatarUrl: url })).catch((err) => {
								window.alert(err instanceof Error ? err.message : "Upload failed");
							});
						}
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Badge",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
				value: profile.theme.badge,
				onChange: (e) => onTheme({ badge: e.target.value }),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "none",
						children: "No badge"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "verified",
						children: "Verified"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "og",
						children: "Original"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "staff",
						children: "Staff"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Status",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
				value: profile.theme.statusKind,
				onChange: (e) => onTheme({ statusKind: e.target.value }),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "none",
						children: "Hidden"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "online",
						children: "Online"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "playing",
						children: "Playing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "listening",
						children: "Listening"
					})
				]
			})
		}),
		profile.theme.statusKind !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Status text",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: profile.theme.statusText,
				maxLength: 64,
				onChange: (e) => onTheme({ statusText: e.target.value })
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			label: "Publish this page",
			checked: profile.published,
			onCheckedChange: (published) => onChange({ published })
		})
	] });
}
function LookFields({ theme, onTheme }) {
	const bgRef = (0, import_react.useRef)(null);
	const cursorRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Layout",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
				value: theme.layout,
				onChange: (e) => onTheme({ layout: e.target.value }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "float",
					children: "Float"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "panel",
					children: "Glass panel"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
				value: theme.backgroundType,
				onChange: (e) => onTheme({ backgroundType: e.target.value }),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "solid",
						children: "Solid"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "gradient",
						children: "Gradient"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "image",
						children: "Image"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
			label: "Background color",
			value: theme.backgroundColor,
			onChange: (backgroundColor) => onTheme({ backgroundColor })
		}),
		theme.backgroundType === "gradient" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
			label: "Second color",
			value: theme.backgroundColor2,
			onChange: (backgroundColor2) => onTheme({ backgroundColor2 })
		}) : null,
		theme.backgroundType === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium tracking-wide text-muted",
					children: "Background image"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: theme.backgroundImage.startsWith("data:") ? "" : theme.backgroundImage,
						placeholder: "Image URL or preset",
						onChange: (e) => onTheme({ backgroundImage: e.target.value })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "shrink-0",
						onClick: () => bgRef.current?.click(),
						children: "Upload"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						["/backgrounds/ridge.jpg", "Ridge"],
						["/backgrounds/rain.jpg", "Rain"],
						["/backgrounds/ember.jpg", "Ember"]
					].map(([src, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onTheme({
							backgroundType: "image",
							backgroundImage: src
						}),
						className: "overflow-hidden rounded-md border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: label,
							className: "aspect-video w-full object-cover"
						})
					}, src))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: bgRef,
					type: "file",
					accept: "image/*",
					className: "hidden",
					onChange: (e) => {
						const file = e.target.files?.[0];
						e.target.value = "";
						if (!file) return;
						compressImageFile(file, {
							maxEdge: 1600,
							maxBytes: 18e4
						}).then((url) => onTheme({
							backgroundType: "image",
							backgroundImage: url
						})).catch((err) => {
							window.alert(err instanceof Error ? err.message : "Upload failed");
						});
					}
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
			label: "Accent",
			value: theme.accentColor,
			onChange: (accentColor) => onTheme({ accentColor })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
			label: "Text",
			value: theme.textColor,
			onChange: (textColor) => onTheme({ textColor })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
			label: "Icons",
			value: theme.iconColor,
			onChange: (iconColor) => onTheme({ iconColor })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
			label: "Panel opacity",
			value: theme.cardOpacity,
			onValueChange: (cardOpacity) => onTheme({ cardOpacity })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
			label: "Panel blur",
			value: theme.cardBlur,
			max: 40,
			onValueChange: (cardBlur) => onTheme({ cardBlur })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			label: "Glow",
			checked: theme.glowEnabled,
			onCheckedChange: (glowEnabled) => onTheme({ glowEnabled })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium tracking-wide text-muted",
				children: "Custom cursor"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: theme.cursorUrl.startsWith("data:") ? "" : theme.cursorUrl,
						placeholder: "Cursor image URL",
						onChange: (e) => onTheme({ cursorUrl: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "shrink-0",
						onClick: () => cursorRef.current?.click(),
						children: "Upload"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: cursorRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (e) => {
							const file = e.target.files?.[0];
							e.target.value = "";
							if (!file) return;
							compressImageFile(file, {
								maxEdge: 64,
								maxBytes: 4e4,
								quality: .7
							}).then((url) => onTheme({ cursorUrl: url })).catch((err) => {
								window.alert(err instanceof Error ? err.message : "Upload failed");
							});
						}
					})
				]
			})]
		})
	] });
}
function EffectsFields({ theme, onTheme }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Atmosphere",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: BG_EFFECT_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onTheme({ bgEffect: opt.id }),
					className: cn("h-11 rounded-md border text-sm", theme.bgEffect === opt.id ? "border-accent bg-elevated text-fg" : "border-border text-muted hover:text-fg"),
					children: opt.label
				}, opt.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Name effect",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: NAME_EFFECT_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onTheme({ usernameEffect: opt.id }),
					className: cn("h-11 rounded-md border text-sm", theme.usernameEffect === opt.id ? "border-accent bg-elevated text-fg" : "border-border text-muted hover:text-fg"),
					children: opt.label
				}, opt.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			label: "Typewriter bio",
			checked: theme.typewriterBio,
			onCheckedChange: (typewriterBio) => onTheme({ typewriterBio })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			label: "Click to enter",
			checked: theme.enterEnabled,
			onCheckedChange: (enterEnabled) => onTheme({ enterEnabled })
		}),
		theme.enterEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Enter text",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: theme.enterText,
				maxLength: 48,
				onChange: (e) => onTheme({ enterText: e.target.value })
			})
		}) : null
	] });
}
function AudioFields({ theme, onTheme }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Atmosphere track",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [
					{
						id: "",
						label: "Silent"
					},
					{
						id: "ambient:drone",
						label: "Drone"
					},
					{
						id: "ambient:hum",
						label: "Hum"
					},
					{
						id: "ambient:rain",
						label: "Rain"
					},
					{
						id: "ambient:pulse",
						label: "Pulse"
					}
				].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onTheme({
						audioUrl: a.id,
						audioTitle: a.label === "Silent" ? "" : a.label
					}),
					className: cn("h-11 rounded-md border text-sm", theme.audioUrl === a.id ? "border-accent bg-elevated text-fg" : "border-border text-muted hover:text-fg"),
					children: a.label
				}, a.id || "off"))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Or paste an audio URL",
			hint: "Direct mp3/ogg link. Starts after enter.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: theme.audioUrl.startsWith("ambient:") ? "" : theme.audioUrl,
				placeholder: "https://…",
				onChange: (e) => onTheme({ audioUrl: e.target.value })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Track title",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: theme.audioTitle,
				maxLength: 48,
				onChange: (e) => onTheme({ audioTitle: e.target.value })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			label: "Show volume control",
			checked: theme.volumeControl,
			onCheckedChange: (volumeControl) => onTheme({ volumeControl })
		})
	] });
}
function LinksFields({ links, onLinks }) {
	const add = () => {
		onLinks([...links, {
			id: cryptoRandomId(),
			kind: "website",
			label: "link",
			url: "https://",
			hidden: false
		}]);
	};
	const update = (id, patch) => {
		onLinks(links.map((l) => l.id === id ? {
			...l,
			...patch
		} : l));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 rounded-xl border border-border bg-surface p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-md bg-elevated text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialGlyph, {
							kind: link.kind,
							className: "size-4"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
						value: link.kind,
						className: "h-11",
						onChange: (e) => {
							const kind = e.target.value;
							update(link.id, {
								kind,
								label: SOCIAL_META[kind].label
							});
						},
						children: SOCIAL_KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: k,
							children: SOCIAL_META[k].label
						}, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-11 shrink-0 text-muted",
						onClick: () => onLinks(links.filter((l) => l.id !== link.id)),
						"aria-label": "Remove link",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: link.url,
				placeholder: SOCIAL_META[link.kind].placeholder,
				onChange: (e) => update(link.id, { url: e.target.value })
			}),
			(link.kind === "website" || link.kind === "custom") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: link.label,
				placeholder: "Label",
				onChange: (e) => update(link.id, { label: e.target.value })
			})
		]
	}, link.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "outline",
		onClick: add,
		disabled: links.length >= 16,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add link"]
	})] });
}
function TemplateFields({ onApply }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: TEMPLATES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onApply(t.theme),
			className: "rounded-xl border border-border bg-surface p-4 text-left transition-colors duration-150 hover:bg-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-fg",
					children: t.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: t.blurb
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-8 shrink-0 rounded-full",
					style: { background: t.theme.accentColor }
				})]
			})
		}, t.id))
	});
}
function ColorField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-11 items-center gap-2 rounded-md border border-border bg-elevated px-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "color",
				value,
				onChange: (e) => onChange(e.target.value),
				className: "size-7 cursor-pointer rounded-xs bg-transparent",
				"aria-label": label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				onChange: (e) => onChange(e.target.value),
				className: "min-w-0 flex-1 bg-transparent font-mono text-sm text-fg outline-none"
			})]
		})
	});
}
function StudioPage() {
	const { user, isPending } = useCurrentUserState();
	const { claim } = Route$2.useSearch();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { solid: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid min-h-[60vh] place-items-center text-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin" })
		})]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		search: { claim }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, { claim });
}
function Studio({ claim }) {
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [tab, setTab] = (0, import_react.useState)("identity");
	const [saving, setSaving] = (0, import_react.useState)("idle");
	const [mobile, setMobile] = (0, import_react.useState)("edit");
	const [newName, setNewName] = (0, import_react.useState)("");
	const saveTimer = (0, import_react.useRef)(void 0);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			let stored = "";
			try {
				stored = sessionStorage.getItem("nuclear-claim") ?? "";
			} catch {
				stored = "";
			}
			const wanted = normalizeUsername(claim || stored);
			let mine = await getMyProfile();
			if (!mine && wanted) {
				await claimUsername({ data: { username: wanted } });
				try {
					sessionStorage.removeItem("nuclear-claim");
				} catch {}
				mine = await getMyProfile();
			}
			setProfile(mine);
			setNewName(mine?.username ?? wanted);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not load your page.");
		} finally {
			setLoading(false);
		}
	}, [claim]);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const persist = (0, import_react.useCallback)(async (next) => {
		setSaving("saving");
		try {
			await saveMyProfile({ data: {
				displayName: next.displayName,
				bio: next.bio,
				location: next.location,
				avatarUrl: next.avatarUrl,
				published: next.published,
				theme: next.theme,
				links: next.links
			} });
			setSaving("saved");
			window.setTimeout(() => setSaving((s) => s === "saved" ? "idle" : s), 1600);
		} catch (err) {
			setSaving("dirty");
			toast.error(err instanceof Error ? err.message : "Save failed.");
		}
	}, []);
	const scheduleSave = (0, import_react.useCallback)((next) => {
		setSaving("dirty");
		if (saveTimer.current) window.clearTimeout(saveTimer.current);
		saveTimer.current = window.setTimeout(() => {
			persist(next);
		}, 700);
	}, [persist]);
	(0, import_react.useEffect)(() => () => {
		if (saveTimer.current) window.clearTimeout(saveTimer.current);
	}, []);
	const patch = (partial) => {
		setProfile((prev) => {
			if (!prev) return prev;
			const next = {
				...prev,
				...partial
			};
			scheduleSave(next);
			return next;
		});
	};
	const onTheme = (partial) => {
		setProfile((prev) => {
			if (!prev) return prev;
			const next = {
				...prev,
				theme: {
					...prev.theme,
					...partial
				}
			};
			scheduleSave(next);
			return next;
		});
	};
	const onLinks = (links) => {
		setProfile((prev) => {
			if (!prev) return prev;
			const next = {
				...prev,
				links
			};
			scheduleSave(next);
			return next;
		});
	};
	const rename = async () => {
		const username = normalizeUsername(newName);
		try {
			const res = await renameMyUsername({ data: { username } });
			setProfile((prev) => prev ? {
				...prev,
				username: res.username
			} : prev);
			toast.success(`Now /${res.username}`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not rename.");
		}
	};
	const copy = async () => {
		if (!profile) return;
		const url = `${window.location.origin}/u/${profile.username}`;
		try {
			await navigator.clipboard.writeText(url);
			toast.success("Link copied");
		} catch {
			toast.error("Could not copy");
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { solid: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid min-h-[60vh] place-items-center text-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin" })
		})]
	});
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { solid: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex max-w-lg flex-col px-5 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold tracking-tight",
					children: "Claim your name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Pick a handle. You can restyle everything after."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClaimForm, {})
				})
			]
		})]
	});
	const saveLabel = saving === "saving" ? "Saving" : saving === "saved" ? "Saved" : saving === "dirty" ? "Unsaved" : "Saved";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { solid: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-12 items-center justify-between gap-3 border-b border-border px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-xs text-subtle sm:inline",
							children: "nuclear.lol /"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: newName,
							onChange: (e) => setNewName(e.target.value.toLowerCase()),
							className: "h-9 w-36 sm:w-44",
							"aria-label": "Username"
						}),
						newName !== profile.username ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => void rename(),
							children: "Rename"
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 sm:gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden items-center gap-1 text-xs text-subtle sm:inline-flex",
							children: [saving === "saved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : null, saveLabel]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => void copy(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Copy"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/u/$username",
							params: { username: profile.username },
							className: "inline-flex h-9 items-center gap-1 rounded-sm px-3 text-sm text-muted hover:text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Open"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-11 items-center gap-1 border-b border-border px-3 lg:hidden",
				children: ["edit", "preview"].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMobile(id),
					className: mobile === id ? "h-9 rounded-md bg-elevated px-3 text-sm" : "h-9 rounded-md px-3 text-sm text-muted",
					children: id === "edit" ? "Edit" : "Preview"
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: mobile === "preview" ? "relative h-[70vh] lg:h-[calc(100dvh-7rem)]" : "relative hidden h-[calc(100dvh-7rem)] lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileStage, {
						profile,
						mode: "preview",
						entered: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: mobile === "edit" ? "max-h-[calc(100dvh-7.75rem)] overflow-y-auto border-l border-border px-4 lg:max-h-[calc(100dvh-7rem)]" : "hidden max-h-[calc(100dvh-7rem)] overflow-y-auto border-l border-border px-4 lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioForm, {
						profile,
						tab,
						onTab: setTab,
						onChange: patch,
						onTheme,
						onLinks
					})
				})]
			})
		]
	});
}
//#endregion
export { StudioPage as component };
