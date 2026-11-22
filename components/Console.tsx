'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { complete, runCommand, type ConsoleLine } from '@/lib/console';
import type { ChannelStatus } from '@/lib/twitch';
import styles from './Console.module.css';

const GREETING: ConsoleLine[] = [
  { text: 'Very Good Pizza console' },
  { text: 'Type "help" for commands, or "connect" to join the stream.', tone: 'dim' },
];

export default function Console({ status, onClose }: { status: ChannelStatus; onClose: () => void }) {
  const [lines, setLines] = useState<ConsoleLine[]>(GREETING);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const command = value.trim();
    setValue('');
    setCursor(null);
    if (!command) return;
    setHistory((h) => [...h, command]);
    const result = runCommand(command, { status, now: new Date() });
    if (result.action?.type === 'clear') return setLines([]);
    if (result.action?.type === 'close') return onClose();
    setLines((prev) => [...prev, { text: `] ${command}`, tone: 'dim' }, ...result.lines]);
    if (result.action?.type === 'open') window.open(result.action.url, '_blank', 'noopener,noreferrer');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'Escape' || e.key === '`' || e.key === '~') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Tab' && value.trim()) {
      e.preventDefault();
      const matches = complete(value);
      if (matches.length === 1) setValue(`${matches[0]} `);
      else if (matches.length > 1) setLines((prev) => [...prev, { text: matches.join('   '), tone: 'dim' }]);
    } else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === 'ArrowDown' && cursor !== null) {
      e.preventDefault();
      const next = cursor + 1;
      setCursor(next >= history.length ? null : next);
      setValue(next >= history.length ? '' : history[next]);
    }
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Console">
      <div className={styles.console}>
        <div className={styles.bar}>
          <span>Console</span>
          <button type="button" className={styles.close} onClick={onClose}>
            Close
          </button>
        </div>
        <div ref={log} className={styles.log} aria-live="polite">
          {lines.map((line, i) => (
            <p key={i} className={styles.line} data-tone={line.tone}>
              {line.href ? (
                <a href={line.href} target="_blank" rel="noopener noreferrer">
                  {line.text}
                </a>
              ) : (
                line.text
              )}
            </p>
          ))}
        </div>
        <form
          className={styles.prompt}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label htmlFor="console-input" className="visually-hidden">
            Console command
          </label>
          <span aria-hidden="true">]</span>
          <input
            ref={input}
            id="console-input"
            className={styles.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
          />
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </form>
      </div>
      <button type="button" className={styles.scrim} onClick={onClose} aria-label="Close console" tabIndex={-1} />
    </div>
  );
}
