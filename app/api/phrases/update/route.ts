import { NextResponse } from 'next/server';
import {
  fetchChannelVideos,
  getChannelIdFromHandle,
} from '@/lib/youtube';
import { addTranscriptionJob, getAllTranscriptionJobs } from '@/lib/queue';

const CHANNEL_HANDLE = '@verygoodpizzaofficial';

/**
 * POST /api/phrases/update
 * Enqueues transcription jobs for all channel videos
 * Jobs are processed asynchronously by background workers
 */
export async function POST(request: Request) {
  try {
    // Optional: Add authentication/secret key for cron jobs
    const { secret } = await request.json().catch(() => ({}));
    const expectedSecret = process.env.CRON_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Enqueuing transcription jobs...');

    // Step 1: Get channel ID from handle
    const channelId = await getChannelIdFromHandle(CHANNEL_HANDLE);
    console.log(`Found channel ID: ${channelId}`);

    // Step 2: Fetch recent videos from channel
    const videos = await fetchChannelVideos(channelId);
    console.log(`Found ${videos.length} videos`);

    if (videos.length === 0) {
      return NextResponse.json(
        { error: 'No videos found for channel' },
        { status: 404 }
      );
    }

    // Step 3: Enqueue transcription jobs for all videos
    const jobs = [];
    for (const video of videos) {
      try {
        const job = await addTranscriptionJob({
          videoId: video.id,
          videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
          videoTitle: video.title,
          channelId,
        });
        jobs.push({
          jobId: job.id,
          videoId: video.id,
          videoTitle: video.title,
        });
        console.log(`  ✓ Enqueued: ${video.title} (${video.id})`);
      } catch (error) {
        // Job might already exist (using jobId prevents duplicates)
        console.log(`  ⚠️  Skipped: ${video.title} (already queued)`);
      }
    }

    console.log(`\n📋 Total jobs enqueued: ${jobs.length}/${videos.length}`);

    return NextResponse.json({
      success: true,
      message: `Enqueued ${jobs.length} transcription jobs`,
      totalVideos: videos.length,
      jobsEnqueued: jobs.length,
      jobs: jobs.slice(0, 10), // Return first 10 for reference
    });
  } catch (error) {
    console.error('Error enqueuing transcription jobs:', error);
    return NextResponse.json(
      {
        error: 'Failed to enqueue transcription jobs',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/phrases/update
 * Returns status of all transcription jobs
 */
export async function GET() {
  try {
    const jobs = await getAllTranscriptionJobs();

    return NextResponse.json({
      success: true,
      jobs: {
        waiting: jobs.waiting,
        active: jobs.active,
        completed: jobs.completed.slice(0, 10), // Last 10 completed
        failed: jobs.failed.slice(0, 10), // Last 10 failed
      },
      summary: {
        waiting: jobs.waiting.length,
        active: jobs.active.length,
        completed: jobs.completed.length,
        failed: jobs.failed.length,
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
