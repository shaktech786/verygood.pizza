import { describe, expect, it } from 'vitest';
import { complete, runCommand, type ConsoleContext } from '@/lib/console';

const live: ConsoleContext = {
  status: { state: 'live', title: 'one bad round and we switch games', game: 'Counter-Strike', viewers: 12, startedAt: '2026-11-22T01:00:00Z' },
  now: new Date('2026-11-22T03:00:00Z'),
};
const offline: ConsoleContext = { status: { state: 'offline' }, now: new Date('2026-11-22T03:00:00Z') };

const text = (ctx: ConsoleContext, input: string) => runCommand(input, ctx).lines.map((l) => l.text).join('\n');

describe('runCommand', () => {
  it('lists commands on help', () => {
    const out = text(offline, 'help');
    for (const cmd of ['status', 'connect', 'games', 'clips', 'videos', 'prelive', 'discord', 'clear']) expect(out).toContain(cmd);
  });

  it('prints a CS-style status block when live', () => {
    const out = text(live, 'status');
    expect(out).toContain('hostname: VGP | verygoodpizza');
    expect(out).toContain('map     : Counter-Strike');
    expect(out).toContain('players : 12');
  });

  it('says the server is empty when offline', () => {
    expect(text(offline, 'status')).toContain('offline');
  });

  it('connect opens Twitch', () => {
    const result = runCommand('connect', offline);
    expect(result.action).toEqual({ type: 'open', url: 'https://www.twitch.tv/verygoodpizza' });
  });

  it('clips <game> lists only that game', () => {
    const out = text(offline, 'clips cs');
    expect(out).toContain('6 kill streak');
    expect(out).not.toContain('peak with me');
  });

  it('games lists every game with its genre', () => {
    const out = text(offline, 'games');
    expect(out).toContain('Slay the Spire 2');
    expect(out).toContain('Deckbuilder');
    expect(out).toContain('Minecraft');
  });

  it('prelive opens prelive.ai', () => {
    expect(runCommand('prelive', offline).action).toEqual({ type: 'open', url: 'https://prelive.ai' });
  });

  it('clips spire lists Slay the Spire 2 streams', () => {
    expect(text(offline, 'clips spire')).toContain('spire');
  });

  it('clips with an unknown game lists valid games', () => {
    const out = text(offline, 'clips fortnite');
    expect(out).toContain('Unknown game "fortnite"');
    expect(out).toContain('peak');
  });

  it('is case- and whitespace-insensitive', () => {
    expect(runCommand('  CONNECT ', offline).action).toEqual({ type: 'open', url: 'https://www.twitch.tv/verygoodpizza' });
  });

  it('reports unknown commands like the real console', () => {
    expect(text(offline, 'noclip')).toBe('Unknown command: noclip');
  });

  it('clear returns a clear action', () => {
    expect(runCommand('clear', offline).action).toEqual({ type: 'clear' });
  });

  it('empty input does nothing', () => {
    expect(runCommand('   ', offline)).toEqual({ lines: [] });
  });
});

describe('complete', () => {
  it('completes command prefixes', () => {
    expect(complete('con')).toEqual(['connect']);
    expect(complete('c')).toEqual(['clear', 'clips', 'connect']);
  });

  it('completes clip game arguments', () => {
    expect(complete('clips pe')).toEqual(['clips peak']);
  });

  it('returns nothing for empty input', () => {
    expect(complete('')).toEqual([]);
  });
});
