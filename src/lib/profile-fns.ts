import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  DEFAULT_THEME,
  normalizeUsername,
  parseJson,
  sanitizeLinks,
  sanitizeTheme,
  validateUsername,
  type Profile,
  type ProfileLink,
  type ProfileTheme,
} from "@/lib/profile";

type ProfileRow = {
  user_id: string;
  username: string;
  display_name: string;
  bio: string;
  location: string;
  avatar_url: string;
  published: boolean;
  views: number;
  theme: string | ProfileTheme;
  links: string | ProfileLink[];
};

function mapRow(row: ProfileRow, userId?: string | null): Profile {
  return {
    username: row.username,
    displayName: row.display_name,
    bio: row.bio ?? "",
    location: row.location ?? "",
    avatarUrl: row.avatar_url ?? "",
    published: Boolean(row.published),
    views: Number(row.views) || 0,
    theme: sanitizeTheme(parseJson(row.theme, DEFAULT_THEME)),
    links: sanitizeLinks(parseJson(row.links, [])),
    isOwner: userId ? userId === row.user_id : false,
  };
}

async function db() {
  const { getSql } = await import("@/lib/db");
  return getSql();
}

async function optionalUserId(): Promise<string | null> {
  try {
    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const user = await getSessionUser();
    return user?.id ?? null;
  } catch {
    return null;
  }
}

async function ensurePublicDirectory() {
  const sql = await db();
  await sql`delete from profiles where user_id like 'seed-%'`;
  await sql`update profiles set published = true where published = false`;
}

export const checkUsername = createServerFn({ method: "GET" })
  .validator(z.object({ username: z.string() }))
  .handler(async ({ data }) => {
    const username = normalizeUsername(data.username);
    const valid = validateUsername(username);
    if (!valid.ok) return { available: false, reason: valid.error };
    await ensurePublicDirectory();
    const sql = await db();
    const rows = await sql`select 1 from profiles where username = ${username} limit 1`;
    if (rows.length) return { available: false, reason: "That name is taken." };
    return { available: true as const };
  });

export const claimUsername = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ username: z.string() }))
  .handler(async ({ context, data }) => {
    const username = normalizeUsername(data.username);
    const valid = validateUsername(username);
    if (!valid.ok) throw new Error(valid.error);
    await ensurePublicDirectory();
    const sql = await db();
    const mine = await sql<{ username: string }>`
      select username from profiles where user_id = ${context.userId} limit 1
    `;
    if (mine[0]) return { username: mine[0].username, already: true as const };
    const taken = await sql`
      select 1 from profiles where username = ${username} limit 1
    `;
    if (taken.length) throw new Error("That name is taken.");
    await sql`
      insert into profiles (user_id, username, display_name, theme, links)
      values (
        ${context.userId},
        ${username},
        ${username},
        ${JSON.stringify(DEFAULT_THEME)},
        ${"[]"}
      )
    `;
    return { username, already: false as const };
  });

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensurePublicDirectory();
    const sql = await db();
    const rows = await sql<ProfileRow>`
      select user_id, username, display_name, bio, location, avatar_url,
             published, views, theme, links
      from profiles
      where user_id = ${context.userId}
      limit 1
    `;
    if (!rows[0]) return null;
    return mapRow(rows[0], context.userId);
  });

const saveSchema = z.object({
  displayName: z.string().max(32),
  bio: z.string().max(280),
  location: z.string().max(48),
  avatarUrl: z.string().max(220_000),
  published: z.boolean(),
  theme: z.unknown(),
  links: z.unknown(),
});

export const saveMyProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(saveSchema)
  .handler(async ({ context, data }) => {
    const theme = sanitizeTheme(data.theme);
    const links = sanitizeLinks(data.links);
    const avatarUrl =
      data.avatarUrl.startsWith("data:image/") ||
      data.avatarUrl.startsWith("http://") ||
      data.avatarUrl.startsWith("https://") ||
      data.avatarUrl === ""
        ? data.avatarUrl.slice(0, 220_000)
        : "";
    const sql = await db();
    const updated = await sql`
      update profiles
      set display_name = ${data.displayName.trim().slice(0, 32)},
          bio = ${data.bio.trim().slice(0, 280)},
          location = ${data.location.trim().slice(0, 48)},
          avatar_url = ${avatarUrl},
          published = ${true},
          theme = ${JSON.stringify(theme)},
          links = ${JSON.stringify(links)},
          updated_at = now()
      where user_id = ${context.userId}
      returning username
    `;
    if (!updated[0]) throw new Error("No page to save. Claim a name first.");
    return { ok: true as const };
  });

export const renameMyUsername = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ username: z.string() }))
  .handler(async ({ context, data }) => {
    const username = normalizeUsername(data.username);
    const valid = validateUsername(username);
    if (!valid.ok) throw new Error(valid.error);
    const sql = await db();
    const taken = await sql`
      select 1 from profiles
      where username = ${username} and user_id <> ${context.userId}
      limit 1
    `;
    if (taken.length) throw new Error("That name is taken.");
    const updated = await sql`
      update profiles
      set username = ${username}, updated_at = now()
      where user_id = ${context.userId}
      returning username
    `;
    if (!updated[0]) throw new Error("No page to rename.");
    return { username };
  });

export const getPublicProfile = createServerFn({ method: "GET" })
  .validator(z.object({ username: z.string() }))
  .handler(async ({ data }) => {
    const username = normalizeUsername(data.username);
    if (!username) return null;
    await ensurePublicDirectory();
    const sql = await db();
    const viewer = await optionalUserId();
    const rows = await sql<ProfileRow>`
      select user_id, username, display_name, bio, location, avatar_url,
             published, views, theme, links
      from profiles
      where username = ${username}
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    if (!row.published && row.user_id !== viewer) return null;
    return mapRow(row, viewer);
  });

export const listPublicProfiles = createServerFn({ method: "GET" })
  .handler(async () => {
    await ensurePublicDirectory();
    const sql = await db();
    const rows = await sql<ProfileRow>`
      select user_id, username, display_name, bio, location, avatar_url,
             published, views, theme, links
      from profiles
      where published = true
      order by views desc, updated_at desc
      limit 60
    `;
    return rows.map((row) => mapRow(row));
  });

export const incrementViews = createServerFn({ method: "POST" })
  .validator(z.object({ username: z.string() }))
  .handler(async ({ data }) => {
    const username = normalizeUsername(data.username);
    const sql = await db();
    const rows = await sql<{ views: number }>`
      update profiles
      set views = views + 1
      where username = ${username} and published = true
      returning views
    `;
    return { views: rows[0]?.views ?? 0 };
  });

export const countPages = createServerFn({ method: "GET" }).handler(async () => {
  await ensurePublicDirectory();
  const sql = await db();
  const rows = await sql<{ n: number }>`
    select count(*)::int as n from profiles where published = true
  `;
  return { count: rows[0]?.n ?? 0 };
});
