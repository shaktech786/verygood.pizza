'use client';

import { useEffect, useRef, useState } from 'react';
import type { Clip } from '@/content/clips';
import { GAMES, type GameId } from '@/content/games';
import styles from './Killfeed.module.css';

const PAGE = 10;

export function Killfeed({ clips }: { clips: readonly Clip[] }) {
  const [game, setGame] = useState<GameId | 'all'>('all');
  const [open, setOpen] = useState<string | null>(null);
  const [limit, setLimit] = useState(PAGE);
  const root = useRef<HTMLDivElement>(null);

  const games = (Object.keys(GAMES) as GameId[]).filter((g) => clips.some((c) => c.game === g));
  const filtered = clips.filter((c) => game === 'all' || c.game === game);
  const shown = filtered.slice(0, limit);

  const pick = (next: GameId | 'all') => {
    setGame(next);
    setOpen(null);
    setLimit(PAGE);
  };

  // The games list links to #clips/<game>; follow it here.
  useEffect(() => {
    const follow = () => {
      const match = /^#clips\/(\w+)$/.exec(window.location.hash);
      if (!match || !(match[1] in GAMES)) return;
      setGame(match[1] as GameId);
      setOpen(null);
      setLimit(PAGE);
      root.current?.scrollIntoView({ block: 'start' });
    };
    follow();
    window.addEventListener('hashchange', follow);
    return () => window.removeEventListener('hashchange', follow);
  }, []);

  return (
    <div ref={root} className={styles.root}>
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
