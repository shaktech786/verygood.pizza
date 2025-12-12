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
      <div className="badge-offline" role="status" aria-live="polite">
        <div className="w-2 h-2 rounded-full bg-gray-400" />
        <span>Checking...</span>
      </div>
    );
  }

  if (!status || !status.isLive) {
    return (
      <div className="badge-offline" role="status" aria-live="polite">
        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--offline)' }} />
        <span>Currently Offline</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <div className="badge-live">
          <div className="live-dot" />
          <span>Live</span>
        </div>
        {status.viewerCount > 0 && (
          <span className="text-sm text-muted">
            {status.viewerCount.toLocaleString()} watching
          </span>
        )}
      </div>

      {(status.gameName || status.title) && (
        <div className="pizza-box p-4 text-center max-w-md">
          {status.gameName && (
            <p className="text-sm font-bold text-orange m-0 mb-1">
              Playing {status.gameName}
            </p>
          )}
          {status.title && (
            <p className="text-sm text-muted m-0">{status.title}</p>
          )}
        </div>
      )}
    </div>
  );
}
