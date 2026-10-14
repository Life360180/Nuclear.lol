import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { L as string, P as object, k as boolean, z as unknown } from "../_libs/@better-auth/core+[...].mjs";
import { d as sanitizeLinks, f as sanitizeTheme, l as normalizeUsername, n as DEFAULT_THEME, p as validateUsername, u as parseJson } from "./profile-BQValIk_.mjs";
import { t as authMiddleware } from "./middleware-BglKVhOR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-fns-CRXUhLO7.js
function mapRow(row, userId) {
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
		isOwner: userId ? userId === row.user_id : false
	};
}
async function db() {
	const { getSql } = await import("./db-x1k9AWgB.mjs").then((n) => n.t).then((n) => n.t);
	return getSql();
}
async function optionalUserId() {
	try {
		const { getSessionUser } = await import("./verify.server-AX9eLJ2C.mjs");
		return (await getSessionUser())?.id ?? null;
	} catch {
		return null;
	}
}
async function ensureSeedProfiles() {
	const sql = await db();
	const { SEED_PROFILES } = await import("./seed-profiles-CZeo_WSr.mjs");
	for (const seed of SEED_PROFILES) await sql`
      insert into profiles (
        user_id, username, display_name, bio, location, avatar_url,
        published, views, theme, links
      )
      values (
        ${seed.userId},
        ${seed.username},
        ${seed.displayName},
        ${seed.bio},
        ${seed.location},
        ${""},
        ${true},
        ${seed.views},
        ${JSON.stringify(seed.theme)},
        ${JSON.stringify(seed.links)}
      )
      on conflict (username) do nothing
    `;
}
var checkUsername_createServerFn_handler = createServerRpc({
	id: "e00ca0aebcd78e4f653f6cc6a61e1cbcf8dc6bcde074e7d39d4c67700c34dccc",
	name: "checkUsername",
	filename: "src/lib/profile-fns.ts"
}, (opts) => checkUsername.__executeServer(opts));
var checkUsername = createServerFn({ method: "GET" }).validator(object({ username: string() })).handler(checkUsername_createServerFn_handler, async ({ data }) => {
	const username = normalizeUsername(data.username);
	const valid = validateUsername(username);
	if (!valid.ok) return {
		available: false,
		reason: valid.error
	};
	await ensureSeedProfiles();
	if ((await (await db())`select 1 from profiles where username = ${username} limit 1`).length) return {
		available: false,
		reason: "That name is taken."
	};
	return { available: true };
});
var claimUsername_createServerFn_handler = createServerRpc({
	id: "c3f88531c7428073e430f7084e86c1f5888cff5633c4b3d8634311f177736763",
	name: "claimUsername",
	filename: "src/lib/profile-fns.ts"
}, (opts) => claimUsername.__executeServer(opts));
var claimUsername = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ username: string() })).handler(claimUsername_createServerFn_handler, async ({ context, data }) => {
	const username = normalizeUsername(data.username);
	const valid = validateUsername(username);
	if (!valid.ok) throw new Error(valid.error);
	await ensureSeedProfiles();
	const sql = await db();
	const mine = await sql`
      select username from profiles where user_id = ${context.userId} limit 1
    `;
	if (mine[0]) return {
		username: mine[0].username,
		already: true
	};
	if ((await sql`
      select 1 from profiles where username = ${username} limit 1
    `).length) throw new Error("That name is taken.");
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
	return {
		username,
		already: false
	};
});
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "5ad7593ea431e842fd1e864dea54953b4f70cb83510ce693183446a89b0ebaa9",
	name: "getMyProfile",
	filename: "src/lib/profile-fns.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	await ensureSeedProfiles();
	const rows = await (await db())`
      select user_id, username, display_name, bio, location, avatar_url,
             published, views, theme, links
      from profiles
      where user_id = ${context.userId}
      limit 1
    `;
	if (!rows[0]) return null;
	return mapRow(rows[0], context.userId);
});
var saveSchema = object({
	displayName: string().max(32),
	bio: string().max(280),
	location: string().max(48),
	avatarUrl: string().max(22e4),
	published: boolean(),
	theme: unknown(),
	links: unknown()
});
var saveMyProfile_createServerFn_handler = createServerRpc({
	id: "78e47f8d89237bbf4feca1b160faac4b9eaadece2390885ea1de56123181666e",
	name: "saveMyProfile",
	filename: "src/lib/profile-fns.ts"
}, (opts) => saveMyProfile.__executeServer(opts));
var saveMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(saveSchema).handler(saveMyProfile_createServerFn_handler, async ({ context, data }) => {
	const theme = sanitizeTheme(data.theme);
	const links = sanitizeLinks(data.links);
	const avatarUrl = data.avatarUrl.startsWith("data:image/") || data.avatarUrl.startsWith("http://") || data.avatarUrl.startsWith("https://") || data.avatarUrl === "" ? data.avatarUrl.slice(0, 22e4) : "";
	if (!(await (await db())`
      update profiles
      set display_name = ${data.displayName.trim().slice(0, 32)},
          bio = ${data.bio.trim().slice(0, 280)},
          location = ${data.location.trim().slice(0, 48)},
          avatar_url = ${avatarUrl},
          published = ${data.published},
          theme = ${JSON.stringify(theme)},
          links = ${JSON.stringify(links)},
          updated_at = now()
      where user_id = ${context.userId}
      returning username
    `)[0]) throw new Error("No page to save. Claim a name first.");
	return { ok: true };
});
var renameMyUsername_createServerFn_handler = createServerRpc({
	id: "3bb7a56b066bc45defff1b8f3a34a29aa9086548239e866ee8c1765a6a408fce",
	name: "renameMyUsername",
	filename: "src/lib/profile-fns.ts"
}, (opts) => renameMyUsername.__executeServer(opts));
var renameMyUsername = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ username: string() })).handler(renameMyUsername_createServerFn_handler, async ({ context, data }) => {
	const username = normalizeUsername(data.username);
	const valid = validateUsername(username);
	if (!valid.ok) throw new Error(valid.error);
	const sql = await db();
	if ((await sql`
      select 1 from profiles
      where username = ${username} and user_id <> ${context.userId}
      limit 1
    `).length) throw new Error("That name is taken.");
	if (!(await sql`
      update profiles
      set username = ${username}, updated_at = now()
      where user_id = ${context.userId}
      returning username
    `)[0]) throw new Error("No page to rename.");
	return { username };
});
var getPublicProfile_createServerFn_handler = createServerRpc({
	id: "5c617d7a05ad19934e8d5264dff486e3c7a92cb50fd8c539f7d9cedb5e3b1e86",
	name: "getPublicProfile",
	filename: "src/lib/profile-fns.ts"
}, (opts) => getPublicProfile.__executeServer(opts));
var getPublicProfile = createServerFn({ method: "GET" }).validator(object({ username: string() })).handler(getPublicProfile_createServerFn_handler, async ({ data }) => {
	const username = normalizeUsername(data.username);
	if (!username) return null;
	await ensureSeedProfiles();
	const sql = await db();
	const viewer = await optionalUserId();
	const row = (await sql`
      select user_id, username, display_name, bio, location, avatar_url,
             published, views, theme, links
      from profiles
      where username = ${username}
      limit 1
    `)[0];
	if (!row) return null;
	if (!row.published && row.user_id !== viewer) return null;
	return mapRow(row, viewer);
});
var listPublicProfiles_createServerFn_handler = createServerRpc({
	id: "04f13ae51b3508932a80c6dba2e04f47f45a24f10425963ae7d6b83a4d84ff7a",
	name: "listPublicProfiles",
	filename: "src/lib/profile-fns.ts"
}, (opts) => listPublicProfiles.__executeServer(opts));
var listPublicProfiles = createServerFn({ method: "GET" }).handler(listPublicProfiles_createServerFn_handler, async () => {
	await ensureSeedProfiles();
	return (await (await db())`
      select user_id, username, display_name, bio, location, avatar_url,
             published, views, theme, links
      from profiles
      where published = true
      order by views desc
      limit 24
    `).map((row) => mapRow(row));
});
var incrementViews_createServerFn_handler = createServerRpc({
	id: "dedcb6900f2e6c1c602502d965186fa12678752a28bfadfd5b76460ad3525cc5",
	name: "incrementViews",
	filename: "src/lib/profile-fns.ts"
}, (opts) => incrementViews.__executeServer(opts));
var incrementViews = createServerFn({ method: "POST" }).validator(object({ username: string() })).handler(incrementViews_createServerFn_handler, async ({ data }) => {
	const username = normalizeUsername(data.username);
	return { views: (await (await db())`
      update profiles
      set views = views + 1
      where username = ${username} and published = true
      returning views
    `)[0]?.views ?? 0 };
});
var countPages_createServerFn_handler = createServerRpc({
	id: "b864fea4417768b570b2499f111e0c217305538158177cfbda8c491640b64920",
	name: "countPages",
	filename: "src/lib/profile-fns.ts"
}, (opts) => countPages.__executeServer(opts));
var countPages = createServerFn({ method: "GET" }).handler(countPages_createServerFn_handler, async () => {
	await ensureSeedProfiles();
	return { count: (await (await db())`
    select count(*)::int as n from profiles where published = true
  `)[0]?.n ?? 0 };
});
//#endregion
export { checkUsername_createServerFn_handler, claimUsername_createServerFn_handler, countPages_createServerFn_handler, getMyProfile_createServerFn_handler, getPublicProfile_createServerFn_handler, incrementViews_createServerFn_handler, listPublicProfiles_createServerFn_handler, renameMyUsername_createServerFn_handler, saveMyProfile_createServerFn_handler };
