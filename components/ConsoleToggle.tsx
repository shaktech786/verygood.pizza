'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChannelStatus } from '@/lib/twitch';
import styles from './TopBar.module.css';

const Console = dynamic(() => import('./Console'), { ssr: false });

export function ConsoleToggle({ status }: { status: ChannelStatus }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '`' && e.key !== '~') return;
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, [contenteditable="true"]')) return;
      e.preventDefault();
      setOpen(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button ref={trigger} type="button" className={styles.consoleButton} onClick={() => setOpen(true)} aria-haspopup="dialog">
        <span aria-hidden="true" className={styles.prompt}>
          &gt;_
        </span>
        Console
        <kbd className={styles.kbd}>~</kbd>
      </button>
      {open && <Console status={status} onClose={close} />}
    </>
  );
}
