import { LINKS } from '@/content/links';
import styles from './Prelive.module.css';

export function Prelive() {
  return (
    <section className={`panel ${styles.window}`} aria-labelledby="prelive-title">
      <div className={styles.titlebar}>
        <h2 id="prelive-title" className={styles.windowTitle}>
          Prelive
        </h2>
        <span className={styles.badge}>Something I built</span>
      </div>
      <div className={`sunken ${styles.body}`}>
        <p className={styles.lead}>Streaming tools that handle the busywork.</p>
        <p>
          I made Prelive for streamers like me. It drafts titles for you to approve, sends one OBS stream to Twitch, YouTube and Kick at once, and gets clips posted after the stream. The
          creative part stays yours.
        </p>
        <div className={styles.actions}>
          <a className={styles.primary} href={LINKS.prelive} target="_blank" rel="noopener noreferrer">
            See Prelive at prelive.ai
          </a>
          <a className={styles.secondary} href={LINKS.preliveDeck} target="_blank" rel="noopener noreferrer">
            Get Prelive Deck, my soundboard
          </a>
        </div>
      </div>
    </section>
  );
}
