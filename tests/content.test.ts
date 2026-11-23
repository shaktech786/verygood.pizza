import { describe, expect, it } from 'vitest';
import { CLIPS } from '@/content/clips';
import { GAMES, LIBRARY } from '@/content/games';
import { REPOSTED_IDS } from '@/content/reposted';

describe('clip allowlist', () => {
  it('never features a reposted upload', () => {
    const reposted = new Set(REPOSTED_IDS);
    const leaked = CLIPS.filter((clip) => reposted.has(clip.id)).map((c) => c.id);
    expect(leaked).toEqual([]);
  });

  it('has no duplicate ids', () => {
    const ids = CLIPS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('uses valid YouTube ids and known games', () => {
    for (const clip of CLIPS) {
      expect(clip.id).toMatch(/^[\w-]{11}$/);
      if (clip.game) expect(GAMES[clip.game]).toBeDefined();
    }
  });

  it('opens on a mix of games, not one genre', () => {
    const firstPage = new Set(CLIPS.slice(0, 10).map((c) => c.game).filter(Boolean));
    expect(firstPage.size).toBeGreaterThanOrEqual(5);
  });
});

describe('game library', () => {
  it('lists the games Shak plays, in his order', () => {
    expect(LIBRARY.map((g) => GAMES[g].name)).toEqual([
      'Counter-Strike 1.6',
      'Minecraft',
      'PEAK',
      'Slay the Spire 2',
      'The Simpsons: Hit & Run',
      'Golf With Your Friends',
      'GTA VI',
    ]);
  });

  it('spans at least six genres', () => {
    expect(new Set(LIBRARY.map((g) => GAMES[g].genre)).size).toBeGreaterThanOrEqual(6);
  });

  it('only marks unreleased games as upcoming', () => {
    expect(LIBRARY.filter((g) => GAMES[g].upcoming)).toEqual(['gta6']);
  });
});
