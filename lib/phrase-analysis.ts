/**
 * Phrase analysis utility for extracting common phrases from transcripts
 */

import natural from 'natural';

const { WordTokenizer, stopwords } = natural;

export interface PhraseResult {
  phrase: string;
  count: number;
  percentage: number;
}

export interface PhraseAnalysisResult {
  topPhrases: PhraseResult[];
  totalWords: number;
  totalPhrases: number;
  lastUpdated: string;
}

/**
 * Extract common phrases from an array of transcripts
 */
export function extractCommonPhrases(
  transcripts: string[],
  options: {
    minPhraseLength?: number;
    maxPhraseLength?: number;
    minOccurrences?: number;
    topN?: number;
  } = {}
): PhraseAnalysisResult {
  const {
    minPhraseLength = 2,
    maxPhraseLength = 5,
    minOccurrences = 3,
    topN = 50,
  } = options;

  const tokenizer = new WordTokenizer();
  const phraseCounts = new Map<string, number>();
  let totalWords = 0;

  // Combine all transcripts
  const combinedText = transcripts.join(' ');
  const tokens = tokenizer.tokenize(combinedText.toLowerCase()) || [];
  totalWords = tokens.length;

  // Filter out stop words and short words
  const filteredTokens = tokens.filter(
    token =>
      token.length > 2 &&
      !stopwords.includes(token) &&
      /^[a-z]+$/.test(token) // Only alphabetic characters
  );

  // Extract n-grams (phrases of different lengths)
  for (let n = minPhraseLength; n <= maxPhraseLength; n++) {
    for (let i = 0; i <= filteredTokens.length - n; i++) {
      const phrase = filteredTokens.slice(i, i + n).join(' ');

      // Skip phrases with repetitive words
      const uniqueWords = new Set(phrase.split(' '));
      if (uniqueWords.size < n) continue;

      phraseCounts.set(phrase, (phraseCounts.get(phrase) || 0) + 1);
    }
  }

  // Filter by minimum occurrences and sort by count
  const topPhrases: PhraseResult[] = Array.from(phraseCounts.entries())
    .filter(([_, count]) => count >= minOccurrences)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([phrase, count]) => ({
      phrase,
      count,
      percentage: Math.round((count / totalWords) * 10000) / 100, // 2 decimal places
    }));

  return {
    topPhrases,
    totalWords,
    totalPhrases: phraseCounts.size,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Extract single words with high frequency
 */
export function extractCommonWords(
  transcripts: string[],
  options: {
    minOccurrences?: number;
    topN?: number;
  } = {}
): PhraseResult[] {
  const { minOccurrences = 5, topN = 30 } = options;

  const tokenizer = new WordTokenizer();
  const wordCounts = new Map<string, number>();
  let totalWords = 0;

  // Combine all transcripts
  const combinedText = transcripts.join(' ');
  const tokens = tokenizer.tokenize(combinedText.toLowerCase()) || [];
  totalWords = tokens.length;

  // Count word occurrences (excluding stop words)
  tokens.forEach(token => {
    if (
      token.length > 3 &&
      !stopwords.includes(token) &&
      /^[a-z]+$/.test(token)
    ) {
      wordCounts.set(token, (wordCounts.get(token) || 0) + 1);
    }
  });

  // Sort by count and return top N
  return Array.from(wordCounts.entries())
    .filter(([_, count]) => count >= minOccurrences)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([phrase, count]) => ({
      phrase,
      count,
      percentage: Math.round((count / totalWords) * 10000) / 100,
    }));
}

/**
 * Find streamer-specific catchphrases and signatures
 * These are phrases that appear frequently and are likely unique to the streamer
 */
export function extractCatchphrases(
  transcripts: string[],
  minOccurrences: number = 5
): PhraseResult[] {
  // Common gaming/streaming phrases to exclude
  const commonStreamingPhrases = [
    'thank you',
    'thanks for',
    'appreciate it',
    'see you',
    'talk to you',
    'right now',
    'over here',
    'lets go',
    'lets get',
    'make sure',
  ];

  const result = extractCommonPhrases(transcripts, {
    minPhraseLength: 2,
    maxPhraseLength: 4,
    minOccurrences,
    topN: 100,
  });

  // Filter out generic phrases
  return result.topPhrases.filter(
    item => !commonStreamingPhrases.some(common => item.phrase.includes(common))
  ).slice(0, 20);
}
