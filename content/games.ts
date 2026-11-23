export type GameId =
  | 'cs'
  | 'minecraft'
  | 'peak'
  | 'spire'
  | 'hitandrun'
  | 'golf'
  | 'gta6'
  | 'arc'
  | 'palworld'
  | 'smash'
  | 'yakuza';

export interface Game {
  name: string;
  tag: string;
  genre: string;
  note?: string;
  upcoming?: boolean;
}

export const GAMES: Record<GameId, Game> = {
  cs: { name: 'Counter-Strike 1.6', tag: 'CS', genre: 'Shooter', note: 'My best game. Playing since 2007.' },
  minecraft: { name: 'Minecraft', tag: 'MC', genre: 'Sandbox', note: 'Survival with a dog that will not leave me alone.' },
  peak: { name: 'PEAK', tag: 'PEAK', genre: 'Co-op climbing', note: 'Where most of my funniest clips come from.' },
  spire: { name: 'Slay the Spire 2', tag: 'STS2', genre: 'Deckbuilder', note: 'Late-night runs, sometimes co-op.' },
  hitandrun: { name: 'The Simpsons: Hit & Run', tag: 'H&R', genre: 'Retro', note: 'Retro nights.' },
  golf: { name: 'Golf With Your Friends', tag: 'GOLF', genre: 'Party', note: 'Rounds with friends we never finish.' },
  gta6: { name: 'GTA VI', tag: 'GTA', genre: 'Open world', note: 'Playing it when it comes out on PC.', upcoming: true },
  arc: { name: 'ARC Raiders', tag: 'ARC', genre: 'Extraction shooter' },
  palworld: { name: 'Palworld', tag: 'PAL', genre: 'Survival' },
  smash: { name: 'Smash Bros.', tag: 'SSBU', genre: 'Fighting' },
  yakuza: { name: 'Yakuza', tag: 'RGG', genre: 'Action' },
};

/** The games list on the home page, in Shak's order. */
export const LIBRARY: readonly GameId[] = ['cs', 'minecraft', 'peak', 'spire', 'hitandrun', 'golf', 'gta6'];
