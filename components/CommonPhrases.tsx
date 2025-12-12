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
      if (result.error || !result.topPhrases) {
        setData(null);
      } else {
        setData(result);
      }
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted">Loading phrases...</p>
      </div>
    );
  }

  if (!data || data.videosAnalyzed === 0 || (data.topPhrases?.length === 0 && data.topWords?.length === 0 && data.catchphrases?.length === 0)) {
    return (
      <div className="pizza-box p-6 max-w-xl mx-auto text-center">
        <p className="font-bold mb-2">Gathering Voice Data...</p>
        <p className="text-sm text-muted m-0">
          Phrase analysis will appear here once we have video transcripts to analyze.
        </p>
      </div>
    );
  }

  const currentData = activeTab === 'phrases' ? data.topPhrases :
                     activeTab === 'words' ? data.topWords :
                     data.catchphrases;

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 id="phrases-heading" className="text-2xl font-bold mb-1">
          Signature Phrases
        </h2>
        <p className="text-sm text-muted">
          From {data.videosAnalyzed} videos
          {data.lastUpdated && ` · Updated ${new Date(data.lastUpdated).toLocaleDateString()}`}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {(['catchphrases', 'phrases', 'words'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-pill ${activeTab === tab ? 'active' : ''}`}
          >
            {tab === 'catchphrases' ? 'Catchphrases' : tab === 'phrases' ? 'Phrases' : 'Words'}
          </button>
        ))}
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {currentData?.slice(0, 12).map((item, index) => (
          <div
            key={item.phrase}
            className={`phrase-card ${index < 3 ? 'top-3' : ''}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className={`text-sm font-black ${index < 3 ? 'text-red' : 'text-muted'}`}>
                #{index + 1}
              </span>
              <span className="text-xs text-muted">{item.count}×</span>
            </div>
            <p className="text-sm font-medium mt-1 m-0">
              &quot;{item.phrase}&quot;
            </p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="pizza-box grid grid-cols-3">
        <div className="stat-block border-r border-[var(--border)]">
          <div className="stat-number">{data.videosAnalyzed}</div>
          <div className="stat-label">Videos</div>
        </div>
        <div className="stat-block border-r border-[var(--border)]">
          <div className="stat-number">{(data.totalWords / 1000).toFixed(0)}k</div>
          <div className="stat-label">Words</div>
        </div>
        <div className="stat-block">
          <div className="stat-number">{data.catchphrases?.length || 0}</div>
          <div className="stat-label">Catchphrases</div>
        </div>
      </div>
    </div>
  );
}
