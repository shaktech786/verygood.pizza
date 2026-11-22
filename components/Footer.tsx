import { LINKS } from '@/content/links';
import styles from './Footer.module.css';

const PLACES = [
  { label: 'Twitch', note: 'live streams', href: LINKS.twitch },
  { label: 'YouTube', note: 'clips and videos', href: LINKS.youtube },
  { label: 'Discord', note: 'hang out between streams', href: LINKS.discord },
  { label: 'TikTok', note: 'short clips', href: LINKS.tiktok },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <nav aria-label="Very Good Pizza elsewhere">
          <ul className={styles.places}>
            {PLACES.map((p) => (
              <li key={p.label}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className={styles.place}>
                  <span className={styles.label}>{p.label}</span>
                  <span className={styles.note}>{p.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.side}>
          <p>
            I also built{' '}
            <a href={LINKS.soundpad} target="_blank" rel="noopener noreferrer">
              SoundPad Pro
            </a>
            , a free soundboard for leverless and hitbox controllers, and I make music at{' '}
            <a href={LINKS.shakbbx} target="_blank" rel="noopener noreferrer">
              shakbbx.com
            </a>
            .
          </p>
          <p className={styles.small}>It’s gaming. Not DiGiorno.</p>
        </div>
      </div>
    </footer>
  );
}
