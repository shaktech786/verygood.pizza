# verygood.pizza

Shak's gaming stream site. One job: get visitors into the Twitch stream (twitch.tv/verygoodpizza), or into YouTube clips when he's offline.

## Design system

A 2007 LAN-era game client: olive bevelled panels, tan text, amber console, pepperoni red only for "live" and the primary action. No UI library — tokens live in `app/globals.css`, components use CSS Modules.

- **Server browser** (`components/ServerBrowser.tsx`) — live/offline status from Twitch Helix, rendered on the server (ISR, 60s). No client JS.
- **Games** (`components/GameList.tsx`, `content/games.ts`) — every game Shak plays with its genre, so the site isn't read as CS-only. Adding a game is one entry in `GAMES` plus its id in `LIBRARY`.
- **Killfeed** (`components/Killfeed.tsx`) — Shak's own clips as killfeed lines, filterable by game, click-to-play.
- **Prelive** (`components/Prelive.tsx`) — promo for Shak's own streaming toolkit, always below the Twitch action.
- **Console** (`components/Console.tsx`, `lib/console.ts`) — press `~` or tap Console. `help`, `status`, `connect`, `clips <game>`, ...

Fonts: Saira Stencil One (display), Verdana/Tahoma stack (body), Share Tech Mono (console only).

## Content rule: only Shak's own clips

The YouTube channel also hosts reposts of other creators' content. Featured clips come from the hand-curated allowlist in `content/clips.ts`; new uploads are never pulled in automatically. `content/reposted.ts` lists known reposts and `tests/content.test.ts` fails if any of them is featured.

## Develop

```bash
npm install
npm run dev          # local dev
npm test             # vitest unit tests
npm run build && npm run test:e2e   # Playwright layout + axe guard (port 3107)
npm run typecheck && npm run lint
```

Env (`.env.local`, and Vercel): `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`. Without valid credentials the server browser shows a neutral "status unavailable" state and still links to Twitch.
