'use client';

import { useEffect, useState } from 'react';

interface StreamStatus {
  isLive: boolean;
  viewerCount: number;
  gameName: string | null;
  title: string | null;
  startedAt: string | null;
}

export function LiveStatus() {
  const [status, setStatus] = useState<StreamStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  async function fetchStatus() {
    try {
      const response = await fetch('/api/twitch/status');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Failed to fetch stream status:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div
        className="inline-flex items-center gap-3 px-6 py-3 bg-black/60 backdrop-blur-md neon-border pulse-glow"
        style={{borderColor: 'var(--neon-cyan)'}}
        role="status"
        aria-live="polite"
      >
        <div className="w-3 h-3 rounded-full" style={{background: 'var(--neon-cyan)'}} />
        <span className="text-sm font-bold uppercase tracking-wider" style={{color: 'var(--neon-cyan)'}}>
          Checking Status...
        </span>
      </div>
    );
  }

  if (!status || !status.isLive) {
    return (
      <div
        className="inline-flex items-center gap-3 px-6 py-3 bg-black/60 backdrop-blur-md neon-border"
        style={{borderColor: 'var(--neon-pink)'}}
        role="status"
        aria-live="polite"
      >
        <div className="w-3 h-3 rounded-full animate-pulse" style={{background: 'var(--neon-pink)'}} />
        <span className="text-sm font-bold uppercase tracking-wider" style={{color: 'var(--neon-pink)'}}>
          Currently Offline
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Live Indicator Badge */}
      <div
        className="mb-6 flex items-center justify-center gap-4 flex-wrap"
        role="status"
        aria-live="polite"
      >
        <div className="relative flex items-center gap-3 px-8 py-4 bg-black/60 backdrop-blur-md neon-border pulse-glow" style={{borderColor: 'var(--neon-green)'}}>
          <div className="relative">
            <div className="w-4 h-4 rounded-full animate-ping absolute" style={{background: 'var(--neon-green)'}} />
            <div className="w-4 h-4 rounded-full" style={{background: 'var(--neon-green)'}} />
          </div>
          <span className="font-black text-xl uppercase tracking-widest neon-glow" style={{
            color: 'var(--neon-green)',
            textShadow: '0 0 10px var(--neon-green)'
          }}>
            LIVE NOW
          </span>
        </div>
        {status.viewerCount > 0 && (
          <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-6 py-4 neon-border" style={{borderColor: 'var(--neon-cyan)'}}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{color: 'var(--neon-cyan)'}}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span className="font-black text-lg" style={{color: 'var(--neon-cyan)'}}>
              {status.viewerCount.toLocaleString()}
            </span>
            <span className="visually-hidden">viewers</span>
          </div>
        )}
      </div>

      {/* Stream Info */}
      {(status.gameName || status.title) && (
        <div className="bg-black/60 backdrop-blur-md neon-border p-6 text-center" style={{borderColor: 'var(--neon-pink)'}}>
          {status.gameName && (
            <div className="font-bold text-lg uppercase tracking-wide mb-3 flex items-center justify-center gap-2 neon-glow" style={{
              color: 'var(--neon-yellow)',
              textShadow: '0 0 5px var(--neon-yellow)'
            }}>
              <span aria-hidden="true">🎮</span>
              <span>Playing: {status.gameName}</span>
            </div>
          )}
          {status.title && (
            <p className="text-gray-200 text-base font-medium">
              {status.title}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
