import { NextResponse } from 'next/server';
import { getQueueMetrics, getAllTranscriptionJobs } from '@/lib/queue';

/**
 * GET /api/jobs/status
 * Returns detailed status of all job queues
 */
export async function GET() {
  try {
    const [metrics, jobs] = await Promise.all([
      getQueueMetrics(),
      getAllTranscriptionJobs(),
    ]);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      metrics: {
        transcription: {
          waiting: metrics.transcription.waiting || 0,
          active: metrics.transcription.active || 0,
          completed: metrics.transcription.completed || 0,
          failed: metrics.transcription.failed || 0,
          delayed: metrics.transcription.delayed || 0,
        },
        phraseAnalysis: {
          waiting: metrics.phraseAnalysis.waiting || 0,
          active: metrics.phraseAnalysis.active || 0,
          completed: metrics.phraseAnalysis.completed || 0,
          failed: metrics.phraseAnalysis.failed || 0,
          delayed: metrics.phraseAnalysis.delayed || 0,
        },
      },
      transcriptionJobs: {
        waiting: jobs.waiting.map(j => ({
          id: j.id,
          videoId: j.data.videoId,
          videoTitle: j.data.videoTitle,
        })),
        active: jobs.active.map(j => ({
          id: j.id,
          videoId: j.data.videoId,
          videoTitle: j.data.videoTitle,
          progress: j.progress,
        })),
        recentCompleted: jobs.completed.slice(0, 5).map(j => ({
          id: j.id,
          videoId: j.data.videoId,
          videoTitle: j.data.videoTitle,
          finishedOn: j.finishedOn,
        })),
        recentFailed: jobs.failed.slice(0, 5).map(j => ({
          id: j.id,
          videoId: j.data.videoId,
          videoTitle: j.data.videoTitle,
          failedReason: j.failedReason,
        })),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch job status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
