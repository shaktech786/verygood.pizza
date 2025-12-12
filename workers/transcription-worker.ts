/**
 * Transcription Worker
 * Processes video transcription jobs in the background
 */

import { Worker, Job } from 'bullmq';
import { TranscriptGenerator } from '@/lib/transcript-generator';
import { TranscriptionJobData, addPhraseAnalysisJob } from '@/lib/queue';

const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
};

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

if (!DEEPGRAM_API_KEY) {
  console.error('❌ DEEPGRAM_API_KEY is not configured');
  process.exit(1);
}

const transcriptGenerator = new TranscriptGenerator(DEEPGRAM_API_KEY);

// Worker to process transcription jobs
export const transcriptionWorker = new Worker<TranscriptionJobData>(
  'transcription',
  async (job: Job<TranscriptionJobData>) => {
    const { videoId, videoUrl, videoTitle } = job.data;

    console.log(`\n🎬 [Job ${job.id}] Starting transcription: ${videoTitle} (${videoId})`);

    try {
      // Update progress: Checking cache
      await job.updateProgress(10);
      console.log(`   → Checking cache...`);

      // Check if already transcribed
      const cached = await transcriptGenerator.getCachedTranscript(videoId);
      if (cached) {
        console.log(`   ✓ Using cached transcript`);
        await job.updateProgress(100);
        return {
          videoId,
          videoTitle,
          cached: true,
          wordCount: cached.fullText.split(' ').length,
          duration: cached.duration,
        };
      }

      // Update progress: Downloading video
      await job.updateProgress(20);
      console.log(`   → Downloading video...`);

      // Generate new transcript
      const result = await transcriptGenerator.generateFromYouTube(videoUrl, videoTitle);

      // Update progress: Transcription complete
      await job.updateProgress(90);
      console.log(`   → Transcribing with Deepgram...`);

      // Cache the transcript
      await transcriptGenerator.cacheTranscript(videoId, result);

      await job.updateProgress(100);

      const wordCount = result.fullText.split(' ').length;
      console.log(`   ✓ Success: ${result.duration.toFixed(1)}s duration, ${wordCount} words`);

      return {
        videoId,
        videoTitle,
        cached: false,
        wordCount,
        duration: result.duration,
        segmentsCount: result.segments.length,
      };
    } catch (error) {
      console.error(`   ✗ Failed: ${error instanceof Error ? error.message : error}`);
      throw error;
    }
  },
  {
    connection: redisConnection,
    concurrency: 2, // Process 2 videos at a time
    limiter: {
      max: 5,
      duration: 60000, // Max 5 jobs per minute
    },
  }
);

// Event handlers
transcriptionWorker.on('completed', async (job: Job, result: any) => {
  console.log(`\n✅ [Job ${job.id}] Completed: ${job.data.videoTitle}`);
  console.log(`   Duration: ${result.duration?.toFixed(1)}s | Words: ${result.wordCount} | Cached: ${result.cached}`);

  // Trigger phrase analysis after each video completes
  // This will analyze all available transcripts
  await addPhraseAnalysisJob();
});

transcriptionWorker.on('failed', (job: Job | undefined, error: Error) => {
  if (job) {
    console.error(`\n❌ [Job ${job.id}] Failed: ${job.data.videoTitle}`);
    console.error(`   Error: ${error.message}`);
    console.error(`   Attempt ${job.attemptsMade} of ${job.opts.attempts}`);
  }
});

transcriptionWorker.on('progress', (job, progress) => {
  if (typeof progress === 'number') {
    console.log(`   Progress: ${progress}%`);
  }
});

transcriptionWorker.on('error', (error: Error) => {
  console.error('Worker error:', error);
});

console.log('🚀 Transcription worker started');
console.log('   Concurrency: 2 videos at a time');
console.log('   Rate limit: 5 jobs per minute');
console.log('   Waiting for jobs...\n');

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n⏹️  Shutting down worker...');
  await transcriptionWorker.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n⏹️  Shutting down worker...');
  await transcriptionWorker.close();
  process.exit(0);
});
