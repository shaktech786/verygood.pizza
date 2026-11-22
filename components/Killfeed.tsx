'use client';

import { useState } from 'react';
import { GAMES, type Clip, type GameId } from '@/content/clips';
import styles from './Killfeed.module.css';

const PAGE = 10;

function HeadshotMark() {
  return (
    <svg className={styles.headshot} viewBox="0 0 24 24" role="img" aria-label="Top clip">
      <circle cx="12" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9 21h6M12 17.5V21" stroke="currentColor" strokeWidth="2" />
      <path d="M2 3l20 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Killfeed({ clips }: { clips: readonly Clip[] }) {
  const [game, setGame] = useState<GameId | 'all'>('all');
  const [open, setOpen] = useState<string | null>(null);
  const [limit, setLimit] = useState(PAGE);

  const games = (Object.keys(GAMES) as GameId[]).filter((g) => clips.some((c) => c.game === g));
  const filtered = clips.filter((c) => game === 'all' || c.game === game);
  const shown = filtered.slice(0, limit);

  const pick = (next: GameId | 'all') => {
    setGame(next);
    setOpen(null);
    setLimit(PAGE);
  };

  return (
    <div className={styles.root}>
      <div className={styles.filters} role="group" aria-label="Filter clips by game">
        <button type="button" className={styles.filter} aria-pressed={game === 'all'} onClick={() => pick('all')}>
          All
        </button>
        {games.map((g) => (
          <button key={g} type="button" className={styles.filter} aria-pressed={game === g} onClick={() => pick(g)}>
            {GAMES[g].name}
          </button>
        ))}
      </div>

      <ol className={styles.feed}>
        {shown.map((clip) => {
          const isOpen = open === clip.id;
          const panelId = `clip-${clip.id}`;
          return (
            <li key={clip.id} className={styles.item}>
              <button
                type="button"
                className={styles.line}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : clip.id)}
              >
                <span className={styles.attacker}>Shak</span>
                <span className={styles.weapon} title={clip.game ? GAMES[clip.game].name : undefined}>
                  {clip.game ? GAMES[clip.game].tag : clip.kind === 'stream' ? 'VOD' : 'CLIP'}
                </span>
                {clip.headshot && <HeadshotMark />}
                <span className={styles.victim}>{clip.title}</span>
              </button>
              {isOpen && (
                <div id={panelId} className={styles.player} data-kind={clip.kind}>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${clip.id}?autoplay=1&playsinline=1&rel=0`}
                    title={clip.title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {filtered.length > limit && (
        <button type="button" className={styles.more} onClick={() => setLimit((n) => n + PAGE)}>
          Show {Math.min(PAGE, filtered.length - limit)} more
        </button>
      )}
    </div>
  );
}
