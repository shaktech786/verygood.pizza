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
    // Initial fetch
    fetchStatus();

    // Poll every 60 seconds
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
        className="inline-flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg"
        role="status"
        aria-live="polite"
      >
        <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600" />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Checking live status...
        </span>
      </div>
    );
  }

  if (!status) {
    return null;
  }

  if (!status.isLive) {
    return (
      <div
        className="inline-flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg"
        role="status"
        aria-live="polite"
      >
        <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600" />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Currently Offline
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Live Indicator Badge */}
      <div
        className="mb-4 flex items-center justify-center gap-3 flex-wrap"
        role="status"
        aria-live="polite"
      >
        <div className="relative flex items-center gap-2">
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-red-600" />
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-red-600 opacity-75 animate-ping" style={{ animationDuration: '2s' }} />
          </div>
          <span className="text-red-600 dark:text-red-500 font-bold text-base md:text-lg uppercase tracking-wide">
            Live Now
          </span>
        </div>
        {status.viewerCount > 0 && (
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-full border-2 border-gray-200 dark:border-gray-700">
            <svg
              className="w-4 h-4 text-gray-600 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {status.viewerCount.toLocaleString()}
            </span>
            <span className="visually-hidden">viewers</span>
          </div>
        )}
      </div>

      {/* Stream Info */}
      {(status.gameName || status.title) && (
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
          {status.gameName && (
            <div className="text-purple-700 dark:text-purple-400 font-semibold mb-2 flex items-center justify-center gap-2">
              <span aria-hidden="true">🎮</span>
              <span>Playing: {status.gameName}</span>
            </div>
          )}
          {status.title && (
            <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
              {status.title}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
