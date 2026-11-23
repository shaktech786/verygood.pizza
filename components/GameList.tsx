import type { Clip } from '@/content/clips';
import { GAMES, LIBRARY } from '@/content/games';
import { LINKS } from '@/content/links';
import styles from './GameList.module.css';

export function GameList({ clips }: { clips: readonly Clip[] }) {
  return (
    <section className={`panel ${styles.window}`} aria-labelledby="games-title">
      <h2 id="games-title" className={styles.windowTitle}>
        What I play
      </h2>
      <div className={`sunken ${styles.scroll}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Game</th>
              <th scope="col">Genre</th>
              <th scope="col">Clips</th>
            </tr>
          </thead>
          <tbody>
            {LIBRARY.map((id) => {
              const game = GAMES[id];
              const count = clips.filter((c) => c.game === id).length;
              return (
                <tr key={id}>
                  <th scope="row">
                    <span className={styles.name}>{game.name}</span>
                    {game.note && <span className={styles.note}>{game.note}</span>}
                  </th>
                  <td className={styles.genre}>{game.genre}</td>
                  <td className={styles.clips}>
                    {count > 0 ? (
                      <a href={`#clips/${id}`} aria-label={`${game.name} clips, ${count}`}>
                        {count} {count === 1 ? 'clip' : 'clips'}
                      </a>
                    ) : game.upcoming ? (
                      <span className={styles.dim}>Not on PC yet</span>
                    ) : (
                      <>
                        <span className={styles.dim}>No clips yet. </span>
                        <a href={LINKS.twitch} target="_blank" rel="noopener noreferrer">
                          Catch it live
                        </a>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
