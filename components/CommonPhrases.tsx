'use client';

import { useEffect, useState } from 'react';

interface PhraseData {
  phrase: string;
  count: number;
  percentage: number;
}

interface PhrasesData {
  topPhrases: PhraseData[];
  topWords: PhraseData[];
  catchphrases: PhraseData[];
  totalWords: number;
  videosAnalyzed: number;
  lastUpdated: string | null;
}

export function CommonPhrases() {
  const [data, setData] = useState<PhrasesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'phrases' | 'words' | 'catchphrases'>('catchphrases');

  useEffect(() => {
    fetchPhrases();
  }, []);

  async function fetchPhrases() {
    try {
      const response = await fetch('/api/phrases');
      const result = await response.json();

      // Handle error responses from API
      if (result.error || !result.topPhrases) {
        console.error('API error:', result.error);
        setData(null);
      } else {
        setData(result);
      }
    } catch (error) {
      console.error('Failed to fetch phrases:', error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse text-xl font-bold uppercase tracking-wider neon-glow" style={{color: 'var(--neon-cyan)'}}>
          Loading Phrases...
        </div>
      </div>
    );
  }

  if (!data || data.videosAnalyzed === 0 || (data.topPhrases?.length === 0 && data.topWords?.length === 0 && data.catchphrases?.length === 0)) {
    return (
      <div className="text-center py-12 bg-black/60 backdrop-blur-md neon-border" style={{borderColor: 'var(--neon-pink)'}}>
        <p className="text-lg font-bold uppercase mb-4" style={{color: 'var(--neon-yellow)'}}>
          🎤 GATHERING VOICE DATA...
        </p>
        <div className="max-w-2xl mx-auto text-left space-y-3 text-gray-300">
          <p>The phrase analysis feature is ready, but we need videos with transcripts/captions to analyze!</p>
          <p className="text-sm">📹 <strong>For streamers:</strong> Enable auto-generated captions on your YouTube videos to unlock this feature.</p>
          <p className="text-sm">🔄 The system checks for new content weekly and will automatically display your signature phrases once transcripts are available.</p>
          {data && data.videosAnalyzed > 0 && (
            <p className="text-sm text-gray-400 mt-4">
              ({data.videosAnalyzed} videos checked, transcripts not available or disabled)
            </p>
          )}
        </div>
      </div>
    );
  }

  const currentData = activeTab === 'phrases' ? data.topPhrases :
                     activeTab === 'words' ? data.topWords :
                     data.catchphrases;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 neon-glow" style={{
          color: 'var(--neon-cyan)',
          textShadow: '0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan)'
        }}>
          VGP SIGNATURE PHRASES
        </h2>
        <p className="text-lg font-bold uppercase tracking-wider" style={{color: 'var(--neon-green)'}}>
          Analyzed from {data.videosAnalyzed} videos
        </p>
        {data.lastUpdated && (
          <p className="text-sm text-gray-400 mt-2">
            Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <button
          onClick={() => setActiveTab('catchphrases')}
          className={`px-6 py-3 font-black text-sm uppercase tracking-wider transition-all duration-300 neon-border ${
            activeTab === 'catchphrases' ? 'pulse-glow' : ''
          }`}
          style={{
            borderColor: activeTab === 'catchphrases' ? 'var(--neon-pink)' : 'var(--neon-cyan)',
            color: activeTab === 'catchphrases' ? 'var(--neon-pink)' : 'var(--neon-cyan)',
            background: activeTab === 'catchphrases' ? 'rgba(255, 0, 255, 0.1)' : 'transparent'
          }}
        >
          Catchphrases
        </button>
        <button
          onClick={() => setActiveTab('phrases')}
          className={`px-6 py-3 font-black text-sm uppercase tracking-wider transition-all duration-300 neon-border ${
            activeTab === 'phrases' ? 'pulse-glow' : ''
          }`}
          style={{
            borderColor: activeTab === 'phrases' ? 'var(--neon-pink)' : 'var(--neon-cyan)',
            color: activeTab === 'phrases' ? 'var(--neon-pink)' : 'var(--neon-cyan)',
            background: activeTab === 'phrases' ? 'rgba(255, 0, 255, 0.1)' : 'transparent'
          }}
        >
          Common Phrases
        </button>
        <button
          onClick={() => setActiveTab('words')}
          className={`px-6 py-3 font-black text-sm uppercase tracking-wider transition-all duration-300 neon-border ${
            activeTab === 'words' ? 'pulse-glow' : ''
          }`}
          style={{
            borderColor: activeTab === 'words' ? 'var(--neon-pink)' : 'var(--neon-cyan)',
            color: activeTab === 'words' ? 'var(--neon-pink)' : 'var(--neon-cyan)',
            background: activeTab === 'words' ? 'rgba(255, 0, 255, 0.1)' : 'transparent'
          }}
        >
          Top Words
        </button>
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentData?.slice(0, 15).map((item, index) => (
          <div
            key={item.phrase}
            className="bg-black/60 backdrop-blur-md neon-border p-6 hover-glow transition-all duration-300"
            style={{
              borderColor: index < 3 ? 'var(--neon-pink)' :
                          index < 6 ? 'var(--neon-cyan)' :
                          'var(--neon-green)'
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl font-black neon-glow" style={{
                color: index < 3 ? 'var(--neon-pink)' :
                       index < 6 ? 'var(--neon-cyan)' :
                       'var(--neon-green)'
              }}>
                #{index + 1}
              </span>
              <span className="text-sm font-bold px-3 py-1 rounded-full neon-border" style={{
                borderColor: 'var(--neon-yellow)',
                color: 'var(--neon-yellow)'
              }}>
                {item.count}×
              </span>
            </div>
            <p className="text-lg font-bold uppercase tracking-wide text-gray-100">
              &quot;{item.phrase}&quot;
            </p>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/60 backdrop-blur-md neon-border p-6 text-center" style={{borderColor: 'var(--neon-pink)'}}>
          <div className="text-4xl font-black neon-glow mb-2" style={{color: 'var(--neon-pink)'}}>
            {data.videosAnalyzed}
          </div>
          <div className="text-sm font-bold uppercase tracking-wider text-gray-300">
            Videos Analyzed
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur-md neon-border p-6 text-center" style={{borderColor: 'var(--neon-cyan)'}}>
          <div className="text-4xl font-black neon-glow mb-2" style={{color: 'var(--neon-cyan)'}}>
            {data.totalWords.toLocaleString()}
          </div>
          <div className="text-sm font-bold uppercase tracking-wider text-gray-300">
            Words Analyzed
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur-md neon-border p-6 text-center" style={{borderColor: 'var(--neon-green)'}}>
          <div className="text-4xl font-black neon-glow mb-2" style={{color: 'var(--neon-green)'}}>
            {data.catchphrases?.length || 0}
          </div>
          <div className="text-sm font-bold uppercase tracking-wider text-gray-300">
            Unique Catchphrases
          </div>
        </div>
      </div>
    </div>
  );
}
