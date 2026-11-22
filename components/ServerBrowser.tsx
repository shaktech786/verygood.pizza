import { LINKS } from '@/content/links';
import type { ChannelStatus } from '@/lib/twitch';
import styles from './ServerBrowser.module.css';

function ago(iso: string, now: Date) {
  const hours = Math.round((now.getTime() - new Date(iso).getTime()) / 3_600_000);
  if (hours < 1) return 'less than an hour ago';
  if (hours < 48) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  return `${Math.round(hours / 24)} days ago`;
}

export function ServerBrowser({ status, now }: { status: ChannelStatus; now: Date }) {
  const live = status.state === 'live';

  return (
    <section className={`panel ${styles.browser}`} aria-labelledby="servers-title">
      <div className={styles.titlebar}>
        <h2 id="servers-title" className={styles.windowTitle}>
          Servers
        </h2>
        <span className={styles.state} data-state={status.state}>
          <span className={styles.dot} aria-hidden="true" />
          {live ? 'Live now' : status.state === 'offline' ? 'Offline' : 'Status unavailable'}
        </span>
      </div>

      <div className={`sunken ${styles.row}`}>
        <p className={styles.host}>VGP | verygoodpizza</p>
        {live && (
          <dl className={styles.stats}>
            <div>
              <dt>Game</dt>
              <dd>{status.game}</dd>
            </div>
            <div>
              <dt>Watching</dt>
              <dd>{status.viewers}</dd>
            </div>
          </dl>
        )}
        {live && <p className={styles.streamTitle}>{status.title}</p>}
        {status.state === 'offline' && status.lastBroadcast && (
          <p className={styles.streamTitle}>
            Last on {ago(status.lastBroadcast.startedAt, now)}: {status.lastBroadcast.title}
          </p>
        )}
        {status.state === 'unknown' && <p className={styles.streamTitle}>Check Twitch to see if Shak is on.</p>}
      </div>

      <div className={styles.actions}>
        <a className={styles.connect} href={LINKS.twitch} target="_blank" rel="noopener noreferrer">
          {live ? 'Connect: watch live on Twitch' : status.state === 'offline' ? 'Follow on Twitch for the next stream' : 'Open Twitch'}
        </a>
        {status.state === 'offline' && status.lastBroadcast && (
          <a className={styles.secondary} href={status.lastBroadcast.url} target="_blank" rel="noopener noreferrer">
            Watch the last stream
          </a>
        )}
      </div>
    </section>
  );
}
