'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye } from 'lucide-react';

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
      <div className="flex items-center justify-center gap-2 text-gray-400">
        <div className="w-3 h-3 rounded-full bg-gray-600 animate-pulse" />
        <span className="text-sm">Checking live status...</span>
      </div>
    );
  }

  if (!status) {
    return null;
  }

  if (!status.isLive) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-400">
        <div className="w-3 h-3 rounded-full bg-gray-600" />
        <span className="text-sm">Currently Offline</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Live Indicator Badge */}
      <div className="mb-4 flex items-center justify-center gap-3">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <div className="absolute inset-0 w-4 h-4 rounded-full bg-red-500 animate-ping" />
        </motion.div>
        <span className="text-red-500 font-bold text-lg uppercase tracking-wider">
          LIVE NOW
        </span>
        {status.viewerCount > 0 && (
          <div className="flex items-center gap-1 text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full">
            <Eye className="w-4 h-4" />
            <span className="font-semibold">{status.viewerCount.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Stream Info */}
      {(status.gameName || status.title) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 text-center"
        >
          {status.gameName && (
            <div className="text-cyan-400 font-semibold mb-2">
              🎮 Playing: {status.gameName}
            </div>
          )}
          {status.title && (
            <div className="text-gray-300 text-sm line-clamp-2">
              {status.title}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
