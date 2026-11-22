import Link from 'next/link';
import type { ChannelStatus } from '@/lib/twitch';
import { ConsoleToggle } from './ConsoleToggle';
import styles from './TopBar.module.css';

export function TopBar({ status }: { status: ChannelStatus }) {
  return (
    <header className={styles.bar}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.mark}>
          VGP
        </Link>
        <ConsoleToggle status={status} />
      </div>
    </header>
  );
}
