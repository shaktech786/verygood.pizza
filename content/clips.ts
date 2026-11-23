// Hand-curated allowlist: only clips verified as Shak's own footage
// (facecam/overlay or his edited long-form). New uploads are NOT added
// automatically, because the channel also hosts other creators' reposts.
// Order is the display order: keep the first page a mix of games.

import type { GameId } from './games';

export type ClipKind = 'short' | 'video' | 'stream';

export interface Clip {
  id: string;
  kind: ClipKind;
  title: string;
  game?: GameId;
  published: string;
}

export const CLIPS: readonly Clip[] = [
  { id: 'sXuiVAwfCwM', kind: 'short', game: 'peak', published: '2026-11-03', title: "he won't play peak with me ever again.." },
  { id: '60r2AfoHoQo', kind: 'video', game: 'minecraft', published: '2026-10-02', title: 'This Dog Would NOT Leave Me Alone in Minecraft' },
  { id: '7vAqnQFewf8', kind: 'short', game: 'cs', published: '2026-09-16', title: 'Counter Strike 6 kill streak!' },
  { id: 'oXqyj13NH10', kind: 'stream', game: 'spire', published: '2026-11-12', title: 'late night spire run, climbing till i crash' },
  { id: 'VMA2jkIW_-8', kind: 'short', game: 'golf', published: '2026-09-15', title: 'SPONGEBOB FANS CAN RELATE LOL' },
  { id: 'iItuQkXkEU8', kind: 'video', game: 'palworld', published: '2026-09-02', title: 'Palworld Ending...' },
  { id: 'Afp4u0X1PNU', kind: 'short', game: 'peak', published: '2026-07-27', title: 'the wrath' },
  { id: 'MrYGdKWIqb8', kind: 'short', game: 'minecraft', published: '2026-10-11', title: "This minecraft DOG just won't leave me alone!!" },
  { id: 'Zqltczcfc1w', kind: 'short', game: 'cs', published: '2026-05-14', title: 'ez 4k!!' },
  { id: 'v2k817UKtf8', kind: 'video', game: 'arc', published: '2026-01-10', title: 'Someone Play ARC RAIDERS With ME!' },
  { id: 'MwCKDS1OKBs', kind: 'video', game: 'minecraft', published: '2026-11-01', title: 'I Explored the World of Minecraft With No Plan' },
  { id: 'qssskVcjWMM', kind: 'video', game: 'peak', published: '2026-10-08', title: 'The Most UNEXPECTED Death in PEAK' },
  { id: 'nFc-xSubVFQ', kind: 'stream', game: 'spire', published: '2026-09-07', title: 'our co-op strategy on slay the spire ii' },
  { id: 'zhqboqjDjhI', kind: 'short', game: 'golf', published: '2026-07-20', title: 'nt ryan' },
  { id: '-7mopbvkb3o', kind: 'short', game: 'cs', published: '2026-05-18', title: 'crazy ace!' },
  { id: '2H9MPrOoYc0', kind: 'short', game: 'smash', published: '2026-04-05', title: 'kirby vs falco' },
  { id: 'kwRKyEc0UWc', kind: 'short', game: 'minecraft', published: '2026-11-15', title: 'my own animal crew in minecraft' },
  { id: 'RuqiQ9rK7G8', kind: 'short', game: 'peak', published: '2026-11-17', title: 'that "wilson!!" is so peak' },
  { id: '9UknKhjdq_s', kind: 'short', game: 'yakuza', published: '2026-10-23', title: 'homework in Yakuza is easypeasy' },
  { id: 'w5SxtzObAcw', kind: 'short', game: 'golf', published: '2026-08-18', title: 'typical golf day with friends' },
  { id: 'BOHNgT4DOFk', kind: 'short', game: 'minecraft', published: '2026-11-10', title: 'Minecraft Pets are so clingy' },
  { id: '6jHTvshol-M', kind: 'short', game: 'cs', published: '2026-09-18', title: 'i am so good with the sniper lol' },
  { id: '7gbpBCBHpaY', kind: 'short', game: 'peak', published: '2026-10-10', title: "First time playing PEAK don't judge me..." },
  { id: 'S4gCr4heJHc', kind: 'video', game: 'arc', published: '2026-01-20', title: 'MUSHROOMS IN ARC RAIDERS' },
  { id: 'zbQLuoKyNII', kind: 'video', game: 'minecraft', published: '2026-11-09', title: 'Exploring Minecraft... Guess What We Did?' },
  { id: 'lmxVetznKys', kind: 'short', game: 'peak', published: '2026-11-20', title: 'how did i survive that fall???' },
  { id: '_skO0YHygqg', kind: 'short', game: 'palworld', published: '2026-09-01', title: 'Is this the boss from TERRARIA?!' },
  { id: 'GLEGDAtoCkw', kind: 'stream', game: 'cs', published: '2025-12-01', title: 'cs 1.6 nostalgia trip on dust2' },
  { id: '-bY0m8Ckc7M', kind: 'short', game: 'golf', published: '2026-08-12', title: 'hole in one for me, nt for matt' },
  { id: 'uVWFq6MSSDs', kind: 'short', game: 'minecraft', published: '2026-10-28', title: 'Anyone hate creepers in minecraft??' },
  { id: 'oG9KlJMaZ1M', kind: 'short', game: 'minecraft', published: '2026-04-04', title: "you ain't gonna live if you keep disobeying" },
  { id: 'DYBZyRfZSI8', kind: 'video', game: 'arc', published: '2026-01-16', title: 'ARC RAIDERS NIGHT RAID!' },
  { id: 'wmhkD8rKGWw', kind: 'short', published: '2026-02-24', title: 'nt McMuslim' },
  { id: 'YW4EL2ADJ9U', kind: 'video', game: 'palworld', published: '2026-08-18', title: 'Did we defeat the Palworld Final Boss?' },
  { id: 'vZ9x2lOHQ3w', kind: 'short', game: 'arc', published: '2026-05-31', title: 'fighting players in ARC raiders' },
  { id: 'BX8-00hkonI', kind: 'short', game: 'peak', published: '2026-10-19', title: 'no way that fell directly on his head' },
  { id: 'fpuWFCwUK8Q', kind: 'short', game: 'cs', published: '2026-07-18', title: 'basic 4k' },
  { id: 'qNyI7VDM_gQ', kind: 'short', published: '2026-09-05', title: 'Which HEAD did I shoot?' },
  { id: 'XAqmxGguveo', kind: 'short', game: 'peak', published: '2026-10-24', title: 'this is better than nba 2k26' },
  { id: 'uo3nmCsa1xc', kind: 'short', game: 'golf', published: '2026-07-22', title: 'just listen to me bro....' },
  { id: 'pS3lQzkcSyI', kind: 'short', game: 'minecraft', published: '2026-09-25', title: 'anyone feel me?' },
  { id: 'aOuOtKAbbaU', kind: 'short', game: 'cs', published: '2026-05-22', title: '5 kills in a single round on Counter-Strike' },
  { id: 'tJk3AqNyWbQ', kind: 'video', game: 'yakuza', published: '2026-01-13', title: 'BEATING UP THUGS IN YAKUZA!' },
  { id: '19fP4VVBAsc', kind: 'short', game: 'peak', published: '2026-10-25', title: "i guess he's pissed" },
  { id: 'v-P2w2TK2tY', kind: 'stream', game: 'cs', published: '2025-12-05', title: 'chat made me use this cs 1.6 setting. wild' },
  { id: 'dmtpLvmdCRU', kind: 'stream', game: 'minecraft', published: '2026-11-01', title: 'reentry arc: did i forget how to Minecraft?' },
  { id: '5Zntzaanr9A', kind: 'short', game: 'peak', published: '2026-10-21', title: 'EASY PARKOUR!' },
  { id: 'iQ6laVS3suY', kind: 'short', game: 'arc', published: '2026-02-20', title: 'mines in arc raiders..' },
];
