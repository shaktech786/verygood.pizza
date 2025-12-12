/**
 * Phrase Analysis Worker
 * Analyzes all transcripts and updates phrase cache
 */

import { Worker, Job } from 'bullmq';
import { promises as fs } from 'fs';
import path from 'path';
import {
  extractCommonPhrases,
  extractCommonWords,
  extractCatchphrases,
} from '@/lib/phrase-analysis';
import { TranscriptGenerator } from '@/lib/transcript-generator';
import { PhraseAnalysisJobData } from '@/lib/queue';

const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
};

const CACHE_FILE = path.join(process.cwd(), 'data', 'phrases-cache.json');
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

if (!DEEPGRAM_API_KEY) {
  console.error('❌ DEEPGRAM_API_KEY is not configured');
  process.exit(1);
}

const transcriptGenerator = new TranscriptGenerator(DEEPGRAM_API_KEY);

export const phraseAnalysisWorker = new Worker<PhraseAnalysisJobData>(
  'phrase-analysis',
  async (job: Job<PhraseAnalysisJobData>) => {
    console.log(`\n📊 [Job ${job.id}] Starting phrase analysis...`);

    try {
      // Get all cached transcripts
      const transcriptIds = await transcriptGenerator.getAllCachedTranscripts();

      if (transcriptIds.length === 0) {
        console.log(`   ⚠️  No transcripts available for analysis`);
        return {
          success: false,
          message: 'No transcripts available',
          videosAnalyzed: 0,
        };
      }

      console.log(`   → Found ${transcriptIds.length} transcripts`);

      // Load all transcripts
      const transcripts: string[] = [];
      for (const videoId of transcriptIds) {
        const transcript = await transcriptGenerator.getCachedTranscript(videoId);
        if (transcript && transcript.fullText.trim().length > 0) {
          transcripts.push(transcript.fullText);
        }
      }

      console.log(`   → Loaded ${transcripts.length} valid transcripts`);

      if (transcripts.length === 0) {
        return {
          success: false,
          message: 'No valid transcripts',
          videosAnalyzed: 0,
        };
      }

      // Analyze phrases
      console.log(`   → Analyzing phrases...`);
      const phraseAnalysis = extractCommonPhrases(transcripts, {
        minPhraseLength: 2,
        maxPhraseLength: 5,
        minOccurrences: 2,
        topN: 50,
      });

      const topWords = extractCommonWords(transcripts, {
        minOccurrences: 3,
        topN: 30,
      });

      const catchphrases = extractCatchphrases(transcripts, 3);

      // Save to cache
      const cacheData = {
        topPhrases: phraseAnalysis.topPhrases,
        topWords,
        catchphrases,
        totalWords: phraseAnalysis.totalWords,
        totalPhrases: phraseAnalysis.totalPhrases,
        lastUpdated: new Date().toISOString(),
        videosAnalyzed: transcripts.length,
      };

      const dataDir = path.join(process.cwd(), 'data');
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2));

      console.log(`   ✓ Analysis complete!`);
      console.log(`      - Top phrases: ${phraseAnalysis.topPhrases.length}`);
      console.log(`      - Top words: ${topWords.length}`);
      console.log(`      - Catchphrases: ${catchphrases.length}`);
      console.log(`      - Total words: ${phraseAnalysis.totalWords}`);
      console.log(`      - Videos analyzed: ${transcripts.length}`);

      return {
        success: true,
        videosAnalyzed: transcripts.length,
        topPhrasesCount: phraseAnalysis.topPhrases.length,
        topWordsCount: topWords.length,
        catchphrasesCount: catchphrases.length,
        totalWords: phraseAnalysis.totalWords,
      };
    } catch (error) {
      console.error(`   ✗ Failed: ${error instanceof Error ? error.message : error}`);
      throw error;
    }
  },
  {
    connection: redisConnection,
    concurrency: 1, // Only one analysis at a time
  }
);

phraseAnalysisWorker.on('completed', (job: Job, result: any) => {
  console.log(`\n✅ [Job ${job.id}] Phrase analysis completed`);
  console.log(`   Videos: ${result.videosAnalyzed} | Words: ${result.totalWords}`);
});

phraseAnalysisWorker.on('failed', (job: Job | undefined, error: Error) => {
  if (job) {
    console.error(`\n❌ [Job ${job.id}] Phrase analysis failed: ${error.message}`);
  }
});

console.log('🚀 Phrase analysis worker started');
console.log('   Waiting for jobs...\n');

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n⏹️  Shutting down worker...');
  await phraseAnalysisWorker.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n⏹️  Shutting down worker...');
  await phraseAnalysisWorker.close();
  process.exit(0);
});
