// Hand-curated allowlist: only clips verified as Shak's own footage
// (facecam/overlay or his edited long-form). New uploads are NOT added
// automatically, because the channel also hosts other creators' reposts.

export type GameId =
  | 'cs'
  | 'peak'
  | 'arc'
  | 'minecraft'
  | 'palworld'
  | 'golf'
  | 'smash'
  | 'yakuza';

export const GAMES: Record<GameId, { name: string; tag: string }> = {
  cs: { name: 'Counter-Strike', tag: 'CS' },
  peak: { name: 'PEAK', tag: 'PEAK' },
  arc: { name: 'ARC Raiders', tag: 'ARC' },
  minecraft: { name: 'Minecraft', tag: 'MC' },
  palworld: { name: 'Palworld', tag: 'PAL' },
  golf: { name: 'Golf With Your Friends', tag: 'GOLF' },
  smash: { name: 'Smash Bros.', tag: 'SSBU' },
  yakuza: { name: 'Yakuza', tag: 'RGG' },
};

export type ClipKind = 'short' | 'video' | 'stream';

export interface Clip {
  id: string;
  kind: ClipKind;
  title: string;
  game?: GameId;
  published: string;
  /** Top performer among Shak's own uploads; rendered as a headshot mark. */
  headshot?: boolean;
}

export const CLIPS: readonly Clip[] = [
  { id: 'sXuiVAwfCwM', kind: 'short', game: 'peak', published: '2026-11-03', title: "he won't play peak with me ever again.." },
  { id: 'iItuQkXkEU8', kind: 'video', game: 'palworld', published: '2026-09-02', title: 'Palworld Ending...', headshot: true },
  { id: '7vAqnQFewf8', kind: 'short', game: 'cs', published: '2026-09-16', title: 'Counter Strike 6 kill streak!' },
  { id: 'oG9KlJMaZ1M', kind: 'short', game: 'minecraft', published: '2026-04-04', title: "you ain't gonna live if you keep disobeying", headshot: true },
  { id: 'zhqboqjDjhI', kind: 'short', game: 'golf', published: '2026-07-20', title: 'nt ryan' },
  { id: 'qssskVcjWMM', kind: 'video', game: 'peak', published: '2026-10-08', title: 'The Most UNEXPECTED Death in PEAK' },
  { id: 'Afp4u0X1PNU', kind: 'short', game: 'peak', published: '2026-07-27', title: 'the wrath', headshot: true },
  { id: 'v2k817UKtf8', kind: 'video', game: 'arc', published: '2026-01-10', title: 'Someone Play ARC RAIDERS With ME!' },
  { id: '60r2AfoHoQo', kind: 'video', game: 'minecraft', published: '2026-10-02', title: 'This Dog Would NOT Leave Me Alone in Minecraft', headshot: true },
  { id: 'Zqltczcfc1w', kind: 'short', game: 'cs', published: '2026-05-14', title: 'ez 4k!!' },
  { id: 'VMA2jkIW_-8', kind: 'short', game: 'golf', published: '2026-09-15', title: 'SPONGEBOB FANS CAN RELATE LOL', headshot: true },
  { id: 'RuqiQ9rK7G8', kind: 'short', game: 'peak', published: '2026-11-17', title: 'that "wilson!!" is so peak' },
  { id: 'DYBZyRfZSI8', kind: 'video', game: 'arc', published: '2026-01-16', title: 'ARC RAIDERS NIGHT RAID!' },
  { id: '-7mopbvkb3o', kind: 'short', game: 'cs', published: '2026-05-18', title: 'crazy ace!' },
  { id: 'wmhkD8rKGWw', kind: 'short', published: '2026-02-24', title: 'nt McMuslim' },
  { id: 'YW4EL2ADJ9U', kind: 'video', game: 'palworld', published: '2026-08-18', title: 'Did we defeat the Palworld Final Boss?' },
  { id: '2H9MPrOoYc0', kind: 'short', game: 'smash', published: '2026-04-05', title: 'kirby vs falco', headshot: true },
  { id: 'lmxVetznKys', kind: 'short', game: 'peak', published: '2026-11-20', title: 'how did i survive that fall???' },
  { id: 'MrYGdKWIqb8', kind: 'short', game: 'minecraft', published: '2026-10-11', title: "This minecraft DOG just won't leave me alone!!", headshot: true },
  { id: '6jHTvshol-M', kind: 'short', game: 'cs', published: '2026-09-18', title: 'i am so good with the sniper lol' },
  { id: 'vZ9x2lOHQ3w', kind: 'short', game: 'arc', published: '2026-05-31', title: 'fighting players in ARC raiders' },
  { id: 'w5SxtzObAcw', kind: 'short', game: 'golf', published: '2026-08-18', title: 'typical golf day with friends' },
  { id: '_skO0YHygqg', kind: 'short', game: 'palworld', published: '2026-09-01', title: 'Is this the boss from TERRARIA?!', headshot: true },
  { id: 'BX8-00hkonI', kind: 'short', game: 'peak', published: '2026-10-19', title: 'no way that fell directly on his head' },
  { id: '9UknKhjdq_s', kind: 'short', game: 'yakuza', published: '2026-10-23', title: 'homework in Yakuza is easypeasy' },
  { id: 'fpuWFCwUK8Q', kind: 'short', game: 'cs', published: '2026-07-18', title: 'basic 4k' },
  { id: 'qNyI7VDM_gQ', kind: 'short', published: '2026-09-05', title: 'Which HEAD did I shoot?', headshot: true },
  { id: 'XAqmxGguveo', kind: 'short', game: 'peak', published: '2026-10-24', title: 'this is better than nba 2k26' },
  { id: 'uo3nmCsa1xc', kind: 'short', game: 'golf', published: '2026-07-22', title: 'just listen to me bro....' },
  { id: 'pS3lQzkcSyI', kind: 'short', game: 'minecraft', published: '2026-09-25', title: 'anyone feel me?' },
  { id: 'aOuOtKAbbaU', kind: 'short', game: 'cs', published: '2026-05-22', title: '5 kills in a single round on Counter-Strike' },
  { id: 'tJk3AqNyWbQ', kind: 'video', game: 'yakuza', published: '2026-01-13', title: 'BEATING UP THUGS IN YAKUZA!' },
  { id: '19fP4VVBAsc', kind: 'short', game: 'peak', published: '2026-10-25', title: "i guess he's pissed" },
  { id: 'GLEGDAtoCkw', kind: 'stream', game: 'cs', published: '2025-12-01', title: 'cs 1.6 nostalgia trip on dust2' },
  { id: 'v-P2w2TK2tY', kind: 'stream', game: 'cs', published: '2025-12-05', title: 'chat made me use this cs 1.6 setting. wild' },
];
