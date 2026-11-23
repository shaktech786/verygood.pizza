import { CLIPS } from '@/content/clips';
import { GAMES, LIBRARY, type GameId } from '@/content/games';
import { CS_SINCE, LINKS } from '@/content/links';
import type { ChannelStatus } from '@/lib/twitch';

export interface ConsoleLine {
  text: string;
  tone?: 'dim' | 'accent' | 'error';
  href?: string;
}

export type ConsoleAction = { type: 'open'; url: string } | { type: 'clear' } | { type: 'close' };

export interface ConsoleResult {
  lines: ConsoleLine[];
  action?: ConsoleAction;
}

export interface ConsoleContext {
  status: ChannelStatus;
  now: Date;
}

const youtubeUrl = (id: string, kind: string) =>
  kind === 'short' ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`;

const GAME_IDS = Object.keys(GAMES) as GameId[];

function hoursSince(iso: string, now: Date) {
  return Math.max(0, Math.round((now.getTime() - new Date(iso).getTime()) / 3_600_000));
}

const COMMANDS: Record<string, { help: string; run: (args: string[], ctx: ConsoleContext) => ConsoleResult }> = {
  help: {
    help: 'list commands',
    run: () => ({
      lines: Object.entries(COMMANDS).map(([name, cmd]) => ({ text: `${name.padEnd(10)}${cmd.help}` })),
    }),
  },
  status: {
    help: 'is shak live right now',
    run: (_, { status, now }) => {
      const lines: ConsoleLine[] = [{ text: 'hostname: VGP | verygoodpizza' }];
      if (status.state === 'live') {
        lines.push(
          { text: `map     : ${status.game}` },
          { text: `players : ${status.viewers}` },
          { text: `uptime  : ${hoursSince(status.startedAt, now)}h` },
          { text: `title   : ${status.title}`, tone: 'dim' },
          { text: 'type "connect" to join', tone: 'accent' },
        );
      } else if (status.state === 'offline') {
        lines.push({ text: 'server is offline' });
        if (status.lastBroadcast) {
          lines.push({ text: `last game ${hoursSince(status.lastBroadcast.endedAt, now)}h ago: ${status.lastBroadcast.title}`, tone: 'dim', href: status.lastBroadcast.url });
        }
      } else {
        lines.push({ text: 'server status unavailable — "connect" still works', tone: 'dim' });
      }
      return { lines };
    },
  },
  connect: {
    help: 'join the stream on Twitch',
    run: () => ({ lines: [{ text: 'Connecting to twitch.tv/verygoodpizza...' }], action: { type: 'open', url: LINKS.twitch } }),
  },
  games: {
    help: 'what shak plays',
    run: () => ({
      lines: LIBRARY.map((g) => ({ text: `${GAMES[g].name.padEnd(26)}${GAMES[g].genre}`, tone: GAMES[g].upcoming ? 'dim' : undefined })),
    }),
  },
  clips: {
    help: `clips [${GAME_IDS.join('|')}]`,
    run: ([game]) => {
      if (game && !GAME_IDS.includes(game as GameId)) {
        return { lines: [{ text: `Unknown game "${game}". Try: ${GAME_IDS.join(', ')}`, tone: 'error' }] };
      }
      const picked = CLIPS.filter((c) => !game || c.game === game).slice(0, game ? undefined : 8);
      return {
        lines: picked.map((c) => ({
          text: `[${c.game ? GAMES[c.game].tag : '--'}] ${c.title}`,
          href: youtubeUrl(c.id, c.kind),
        })),
      };
    },
  },
  videos: {
    help: 'open the YouTube channel',
    run: () => ({ lines: [{ text: 'Opening YouTube...' }], action: { type: 'open', url: LINKS.youtube } }),
  },
  prelive: {
    help: 'the streaming tool shak built',
    run: () => ({ lines: [{ text: 'Opening prelive.ai...' }], action: { type: 'open', url: LINKS.prelive } }),
  },
  discord: {
    help: 'join the Discord',
    run: () => ({ lines: [{ text: 'Opening Discord invite...' }], action: { type: 'open', url: LINKS.discord } }),
  },
  version: {
    help: 'how long shak has been playing',
    run: (_, { now }) => ({ lines: [{ text: `Counter-Strike since ${CS_SINCE} (${now.getUTCFullYear() - CS_SINCE} years)` }] }),
  },
  sv_cheats: {
    help: 'nice try',
    run: () => ({ lines: [{ text: 'sv_cheats is locked on this server. Shak plays clean.', tone: 'error' }] }),
  },
  clear: { help: 'clear the console', run: () => ({ lines: [], action: { type: 'clear' } }) },
  quit: { help: 'close the console', run: () => ({ lines: [], action: { type: 'close' } }) },
};

export function runCommand(input: string, ctx: ConsoleContext): ConsoleResult {
  const [name, ...args] = input.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!name) return { lines: [] };
  const command = COMMANDS[name];
  if (!command) return { lines: [{ text: `Unknown command: ${name}`, tone: 'error' }] };
  return command.run(args, ctx);
}

export function complete(input: string): string[] {
  const value = input.trimStart().toLowerCase();
  if (!value) return [];
  const [name, arg] = value.split(/\s+/);
  if (name === 'clips' && arg !== undefined) {
    return GAME_IDS.filter((g) => g.startsWith(arg)).map((g) => `clips ${g}`);
  }
  return Object.keys(COMMANDS).filter((c) => c.startsWith(name)).sort();
}
