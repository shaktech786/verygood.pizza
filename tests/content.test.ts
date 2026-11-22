import { describe, expect, it } from 'vitest';
import { CLIPS, GAMES } from '@/content/clips';
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
});
