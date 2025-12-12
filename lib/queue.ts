/**
 * Job Queue Configuration
 * Uses BullMQ for background job processing with Redis
 */

import { Queue, Worker, Job, QueueEvents } from 'bullmq';
import Redis from 'ioredis';

// Redis connection configuration
const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null, // Required for BullMQ
};

// Job data interfaces
export interface TranscriptionJobData {
  videoId: string;
  videoUrl: string;
  videoTitle: string;
  channelId?: string;
}

export interface PhraseAnalysisJobData {
  force?: boolean; // Force re-analysis even if transcripts exist
}

// Queue instances
export const transcriptionQueue = new Queue<TranscriptionJobData>('transcription', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 60000, // Start with 1 minute
    },
    removeOnComplete: {
      count: 100, // Keep last 100 completed jobs
    },
    removeOnFail: {
      count: 50, // Keep last 50 failed jobs
    },
  },
});

export const phraseAnalysisQueue = new Queue<PhraseAnalysisJobData>('phrase-analysis', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: 'fixed',
      delay: 30000,
    },
    removeOnComplete: {
      count: 50,
    },
    removeOnFail: {
      count: 20,
    },
  },
});

// Queue events for monitoring
export const transcriptionEvents = new QueueEvents('transcription', {
  connection: redisConnection,
});

export const phraseAnalysisEvents = new QueueEvents('phrase-analysis', {
  connection: redisConnection,
});

// Helper functions
export async function addTranscriptionJob(data: TranscriptionJobData) {
  return await transcriptionQueue.add(`transcribe-${data.videoId}`, data, {
    jobId: `transcribe-${data.videoId}`, // Prevent duplicate jobs
  });
}

export async function addPhraseAnalysisJob(data: PhraseAnalysisJobData = {}) {
  return await phraseAnalysisQueue.add('analyze-phrases', data);
}

export async function getTranscriptionJobStatus(videoId: string) {
  const job = await transcriptionQueue.getJob(`transcribe-${videoId}`);
  if (!job) return null;

  return {
    id: job.id,
    state: await job.getState(),
    progress: job.progress,
    data: job.data,
    returnvalue: job.returnvalue,
    failedReason: job.failedReason,
    finishedOn: job.finishedOn,
    processedOn: job.processedOn,
  };
}

export async function getAllTranscriptionJobs() {
  const [waiting, active, completed, failed] = await Promise.all([
    transcriptionQueue.getWaiting(),
    transcriptionQueue.getActive(),
    transcriptionQueue.getCompleted(0, 20),
    transcriptionQueue.getFailed(0, 20),
  ]);

  return {
    waiting: waiting.map(j => ({ id: j.id, data: j.data })),
    active: active.map(j => ({ id: j.id, data: j.data, progress: j.progress })),
    completed: completed.map(j => ({ id: j.id, data: j.data, finishedOn: j.finishedOn })),
    failed: failed.map(j => ({ id: j.id, data: j.data, failedReason: j.failedReason })),
  };
}

export async function clearAllJobs() {
  await transcriptionQueue.obliterate({ force: true });
  await phraseAnalysisQueue.obliterate({ force: true });
}

export async function getQueueMetrics() {
  const [transcriptionCounts, phraseAnalysisCounts] = await Promise.all([
    transcriptionQueue.getJobCounts(),
    phraseAnalysisQueue.getJobCounts(),
  ]);

  return {
    transcription: transcriptionCounts,
    phraseAnalysis: phraseAnalysisCounts,
  };
}
