import { useRef } from "react";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { Field, NativeSelect } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { SocialGlyph } from "@/components/social-icons";
import { compressImageFile } from "@/lib/image";
import {
  BG_EFFECT_OPTIONS,
  NAME_EFFECT_OPTIONS,
  SOCIAL_KINDS,
  SOCIAL_META,
  TEMPLATES,
  cryptoRandomId,
  type Profile,
  type ProfileLink,
  type ProfileTheme,
  type SocialKind,
} from "@/lib/profile";
import { cn } from "@/lib/utils";

export type StudioTab = "identity" | "look" | "effects" | "audio" | "links" | "templates";

type Tab = StudioTab;

const TABS: { id: Tab; label: string }[] = [
  { id: "identity", label: "Identity" },
  { id: "look", label: "Look" },
  { id: "effects", label: "Effects" },
  { id: "audio", label: "Audio" },
  { id: "links", label: "Links" },
  { id: "templates", label: "Presets" },
];

export function StudioForm({
  profile,
  tab,
  onTab,
  onChange,
  onTheme,
  onLinks,
}: {
  profile: Profile;
  tab: Tab;
  onTab: (tab: Tab) => void;
  onChange: (patch: Partial<Profile>) => void;
  onTheme: (patch: Partial<ProfileTheme>) => void;
  onLinks: (links: ProfileLink[]) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="sticky top-16 z-20 -mx-1 flex gap-1 overflow-x-auto bg-bg/95 px-1 py-2 backdrop-blur-md">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onTab(t.id)}
            className={cn(
              "h-10 shrink-0 rounded-md px-3 text-sm transition-colors duration-150",
              tab === t.id ? "bg-elevated text-fg" : "text-muted hover:text-fg",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-5 py-4">
        {tab === "identity" ? (
          <IdentityFields profile={profile} onChange={onChange} onTheme={onTheme} />
        ) : null}
        {tab === "look" ? <LookFields theme={profile.theme} onTheme={onTheme} /> : null}
        {tab === "effects" ? (
          <EffectsFields theme={profile.theme} onTheme={onTheme} />
        ) : null}
        {tab === "audio" ? <AudioFields theme={profile.theme} onTheme={onTheme} /> : null}
        {tab === "links" ? <LinksFields links={profile.links} onLinks={onLinks} /> : null}
        {tab === "templates" ? (
          <TemplateFields
            onApply={(theme) => onTheme(theme)}
          />
        ) : null}
      </div>
    </div>
  );
}

function IdentityFields({
  profile,
  onChange,
  onTheme,
}: {
  profile: Profile;
  onChange: (patch: Partial<Profile>) => void;
  onTheme: (patch: Partial<ProfileTheme>) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Field label="Display name">
        <Input
          value={profile.displayName}
          maxLength={32}
          onChange={(e) => onChange({ displayName: e.target.value })}
        />
      </Field>
      <Field label="Bio" hint={`${profile.bio.length}/280`}>
        <Textarea
          value={profile.bio}
          maxLength={280}
          onChange={(e) => onChange({ bio: e.target.value })}
        />
      </Field>
      <Field label="Location">
        <Input
          value={profile.location}
          maxLength={48}
          onChange={(e) => onChange({ location: e.target.value })}
        />
      </Field>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium tracking-wide text-muted">Avatar</span>
        <div className="flex gap-2">
          <Input
            value={profile.avatarUrl.startsWith("data:") ? "" : profile.avatarUrl}
            placeholder="Image URL"
            onChange={(e) => onChange({ avatarUrl: e.target.value })}
          />
          <Button
            variant="outline"
            className="shrink-0"
            onClick={() => fileRef.current?.click()}
          >
            <ImagePlus className="size-4" />
            Upload
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              void compressImageFile(file, { maxEdge: 512, maxBytes: 90_000 })
                .then((url) => onChange({ avatarUrl: url }))
                .catch((err: unknown) => {
                  window.alert(err instanceof Error ? err.message : "Upload failed");
                });
            }}
          />
        </div>
      </div>
      <Field label="Badge">
        <NativeSelect
          value={profile.theme.badge}
          onChange={(e) =>
            onTheme({ badge: e.target.value as ProfileTheme["badge"] })
          }
        >
          <option value="none">No badge</option>
          <option value="verified">Verified</option>
          <option value="og">Original</option>
          <option value="staff">Staff</option>
        </NativeSelect>
      </Field>
      <Field label="Status">
        <NativeSelect
          value={profile.theme.statusKind}
          onChange={(e) =>
            onTheme({ statusKind: e.target.value as ProfileTheme["statusKind"] })
          }
        >
          <option value="none">Hidden</option>
          <option value="online">Online</option>
          <option value="playing">Playing</option>
          <option value="listening">Listening</option>
        </NativeSelect>
      </Field>
      {profile.theme.statusKind !== "none" ? (
        <Field label="Status text">
          <Input
            value={profile.theme.statusText}
            maxLength={64}
            onChange={(e) => onTheme({ statusText: e.target.value })}
          />
        </Field>
      ) : null}
    </>
  );
}

function LookFields({
  theme,
  onTheme,
}: {
  theme: ProfileTheme;
  onTheme: (patch: Partial<ProfileTheme>) => void;
}) {
  const bgRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Field label="Layout">
        <NativeSelect
          value={theme.layout}
          onChange={(e) => onTheme({ layout: e.target.value as ProfileTheme["layout"] })}
        >
          <option value="float">Float</option>
          <option value="panel">Glass panel</option>
        </NativeSelect>
      </Field>
      <Field label="Background">
        <NativeSelect
          value={theme.backgroundType}
          onChange={(e) =>
            onTheme({ backgroundType: e.target.value as ProfileTheme["backgroundType"] })
          }
        >
          <option value="solid">Solid</option>
          <option value="gradient">Gradient</option>
          <option value="image">Image</option>
        </NativeSelect>
      </Field>
      <ColorField
        label="Background color"
        value={theme.backgroundColor}
        onChange={(backgroundColor) => onTheme({ backgroundColor })}
      />
      {theme.backgroundType === "gradient" ? (
        <ColorField
          label="Second color"
          value={theme.backgroundColor2}
          onChange={(backgroundColor2) => onTheme({ backgroundColor2 })}
        />
      ) : null}
      {theme.backgroundType === "image" ? (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-wide text-muted">
            Background image
          </span>
          <div className="flex gap-2">
            <Input
              value={
                theme.backgroundImage.startsWith("data:") ? "" : theme.backgroundImage
              }
              placeholder="Image URL or preset"
              onChange={(e) => onTheme({ backgroundImage: e.target.value })}
            />
            <Button variant="outline" className="shrink-0" onClick={() => bgRef.current?.click()}>
              Upload
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              ["/backgrounds/ridge.jpg", "Ridge"],
              ["/backgrounds/rain.jpg", "Rain"],
              ["/backgrounds/ember.jpg", "Ember"],
            ].map(([src, label]) => (
              <button
                key={src}
                type="button"
                onClick={() =>
                  onTheme({ backgroundType: "image", backgroundImage: src })
                }
                className="overflow-hidden rounded-md border border-border"
              >
                <img src={src} alt={label} className="aspect-video w-full object-cover" />
              </button>
            ))}
          </div>
          <input
            ref={bgRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              void compressImageFile(file, { maxEdge: 1600, maxBytes: 180_000 })
                .then((url) => onTheme({ backgroundType: "image", backgroundImage: url }))
                .catch((err: unknown) => {
                  window.alert(err instanceof Error ? err.message : "Upload failed");
                });
            }}
          />
        </div>
      ) : null}
      <ColorField
        label="Accent"
        value={theme.accentColor}
        onChange={(accentColor) => onTheme({ accentColor })}
      />
      <ColorField
        label="Text"
        value={theme.textColor}
        onChange={(textColor) => onTheme({ textColor })}
      />
      <ColorField
        label="Icons"
        value={theme.iconColor}
        onChange={(iconColor) => onTheme({ iconColor })}
      />
      <Slider
        label="Panel opacity"
        value={theme.cardOpacity}
        onValueChange={(cardOpacity) => onTheme({ cardOpacity })}
      />
      <Slider
        label="Panel blur"
        value={theme.cardBlur}
        max={40}
        onValueChange={(cardBlur) => onTheme({ cardBlur })}
      />
      <Switch
        label="Glow"
        checked={theme.glowEnabled}
        onCheckedChange={(glowEnabled) => onTheme({ glowEnabled })}
      />
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium tracking-wide text-muted">Custom cursor</span>
        <div className="flex gap-2">
          <Input
            value={theme.cursorUrl.startsWith("data:") ? "" : theme.cursorUrl}
            placeholder="Cursor image URL"
            onChange={(e) => onTheme({ cursorUrl: e.target.value })}
          />
          <Button variant="outline" className="shrink-0" onClick={() => cursorRef.current?.click()}>
            Upload
          </Button>
          <input
            ref={cursorRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              void compressImageFile(file, { maxEdge: 64, maxBytes: 40_000, quality: 0.7 })
                .then((url) => onTheme({ cursorUrl: url }))
                .catch((err: unknown) => {
                  window.alert(err instanceof Error ? err.message : "Upload failed");
                });
            }}
          />
        </div>
      </div>
    </>
  );
}

function EffectsFields({
  theme,
  onTheme,
}: {
  theme: ProfileTheme;
  onTheme: (patch: Partial<ProfileTheme>) => void;
}) {
  return (
    <>
      <Field label="Atmosphere">
        <div className="grid grid-cols-2 gap-2">
          {BG_EFFECT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onTheme({ bgEffect: opt.id })}
              className={cn(
                "h-11 rounded-md border text-sm",
                theme.bgEffect === opt.id
                  ? "border-accent bg-elevated text-fg"
                  : "border-border text-muted hover:text-fg",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Name effect">
        <div className="grid grid-cols-2 gap-2">
          {NAME_EFFECT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onTheme({ usernameEffect: opt.id })}
              className={cn(
                "h-11 rounded-md border text-sm",
                theme.usernameEffect === opt.id
                  ? "border-accent bg-elevated text-fg"
                  : "border-border text-muted hover:text-fg",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Field>
      <Switch
        label="Typewriter bio"
        checked={theme.typewriterBio}
        onCheckedChange={(typewriterBio) => onTheme({ typewriterBio })}
      />
      <Switch
        label="Click to enter"
        checked={theme.enterEnabled}
        onCheckedChange={(enterEnabled) => onTheme({ enterEnabled })}
      />
      {theme.enterEnabled ? (
        <Field label="Enter text">
          <Input
            value={theme.enterText}
            maxLength={48}
            onChange={(e) => onTheme({ enterText: e.target.value })}
          />
        </Field>
      ) : null}
    </>
  );
}

function AudioFields({
  theme,
  onTheme,
}: {
  theme: ProfileTheme;
  onTheme: (patch: Partial<ProfileTheme>) => void;
}) {
  const ambients = [
    { id: "", label: "Silent" },
    { id: "ambient:drone", label: "Drone" },
    { id: "ambient:hum", label: "Hum" },
    { id: "ambient:rain", label: "Rain" },
    { id: "ambient:pulse", label: "Pulse" },
  ];
  return (
    <>
      <Field label="Atmosphere track">
        <div className="grid grid-cols-2 gap-2">
          {ambients.map((a) => (
            <button
              key={a.id || "off"}
              type="button"
              onClick={() => onTheme({ audioUrl: a.id, audioTitle: a.label === "Silent" ? "" : a.label })}
              className={cn(
                "h-11 rounded-md border text-sm",
                theme.audioUrl === a.id
                  ? "border-accent bg-elevated text-fg"
                  : "border-border text-muted hover:text-fg",
              )}
            >
              {a.label}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Or paste an audio URL" hint="Direct mp3/ogg link. Starts after enter.">
        <Input
          value={theme.audioUrl.startsWith("ambient:") ? "" : theme.audioUrl}
          placeholder="https://…"
          onChange={(e) => onTheme({ audioUrl: e.target.value })}
        />
      </Field>
      <Field label="Track title">
        <Input
          value={theme.audioTitle}
          maxLength={48}
          onChange={(e) => onTheme({ audioTitle: e.target.value })}
        />
      </Field>
      <Switch
        label="Show volume control"
        checked={theme.volumeControl}
        onCheckedChange={(volumeControl) => onTheme({ volumeControl })}
      />
    </>
  );
}

function LinksFields({
  links,
  onLinks,
}: {
  links: ProfileLink[];
  onLinks: (links: ProfileLink[]) => void;
}) {
  const add = () => {
    onLinks([
      ...links,
      {
        id: cryptoRandomId(),
        kind: "website",
        label: "link",
        url: "https://",
        hidden: false,
      },
    ]);
  };
  const update = (id: string, patch: Partial<ProfileLink>) => {
    onLinks(links.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };
  return (
    <>
      {links.map((link) => (
        <div
          key={link.id}
          className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-3"
        >
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-md bg-elevated text-muted">
              <SocialGlyph kind={link.kind} className="size-4" />
            </span>
            <NativeSelect
              value={link.kind}
              className="h-11"
              onChange={(e) => {
                const kind = e.target.value as SocialKind;
                update(link.id, {
                  kind,
                  label: SOCIAL_META[kind].label,
                });
              }}
            >
              {SOCIAL_KINDS.map((k) => (
                <option key={k} value={k}>
                  {SOCIAL_META[k].label}
                </option>
              ))}
            </NativeSelect>
            <Button
              variant="ghost"
              size="icon"
              className="size-11 shrink-0 text-muted"
              onClick={() => onLinks(links.filter((l) => l.id !== link.id))}
              aria-label="Remove link"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
          <Input
            value={link.url}
            placeholder={SOCIAL_META[link.kind].placeholder}
            onChange={(e) => update(link.id, { url: e.target.value })}
          />
          {(link.kind === "website" || link.kind === "custom") && (
            <Input
              value={link.label}
              placeholder="Label"
              onChange={(e) => update(link.id, { label: e.target.value })}
            />
          )}
        </div>
      ))}
      <Button variant="outline" onClick={add} disabled={links.length >= 16}>
        <Plus className="size-4" />
        Add link
      </Button>
    </>
  );
}

function TemplateFields({ onApply }: { onApply: (theme: ProfileTheme) => void }) {
  return (
    <div className="grid gap-3">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onApply(t.theme)}
          className="rounded-xl border border-border bg-surface p-4 text-left transition-colors duration-150 hover:bg-elevated"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-fg">{t.name}</p>
              <p className="mt-1 text-xs text-muted">{t.blurb}</p>
            </div>
            <span
              className="size-8 shrink-0 rounded-full"
              style={{ background: t.theme.accentColor }}
            />
          </div>
        </button>
      ))}
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex h-11 items-center gap-2 rounded-md border border-border bg-elevated px-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="size-7 cursor-pointer rounded-xs bg-transparent"
          aria-label={label}
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent font-mono text-sm text-fg outline-none"
        />
      </div>
    </Field>
  );
}
