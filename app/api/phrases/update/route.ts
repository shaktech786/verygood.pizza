import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import {
  fetchChannelVideos,
  getChannelIdFromHandle,
} from '@/lib/youtube';
import {
  extractCommonPhrases,
  extractCommonWords,
  extractCatchphrases,
} from '@/lib/phrase-analysis';
import { TranscriptGenerator } from '@/lib/transcript-generator';

const CACHE_FILE = path.join(process.cwd(), 'data', 'phrases-cache.json');
const CHANNEL_HANDLE = '@verygoodpizzaofficial';

/**
 * POST /api/phrases/update
 * Fetches latest videos, analyzes transcripts, and updates phrase cache
 * This can be triggered manually or by a cron job
 */
export async function POST(request: Request) {
  try {
    // Optional: Add authentication/secret key for cron jobs
    const { secret } = await request.json().catch(() => ({}));
    const expectedSecret = process.env.CRON_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Starting phrase analysis update...');

    // Verify Deepgram API key
    const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
    if (!deepgramApiKey) {
      return NextResponse.json(
        { error: 'DEEPGRAM_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // Step 1: Get channel ID from handle
    const channelId = await getChannelIdFromHandle(CHANNEL_HANDLE);
    console.log(`Found channel ID: ${channelId}`);

    // Step 2: Fetch recent videos from channel
    const videos = await fetchChannelVideos(channelId);
    console.log(`Found ${videos.length} videos`);

    // Step 3: Generate transcripts using Deepgram
    const transcriptGenerator = new TranscriptGenerator(deepgramApiKey);
    const transcripts: string[] = [];
    let successCount = 0;
    let failCount = 0;

    // Limit to 5 most recent videos to avoid long processing times
    const videosToProcess = videos.slice(0, 5);

    for (const video of videosToProcess) {
      try {
        console.log(`Processing video: ${video.title} (${video.id})`);

        // Check cache first
        const cached = await transcriptGenerator.getCachedTranscript(video.id);
        let result;

        if (cached) {
          console.log(`Using cached transcript for ${video.id}`);
          result = cached;
        } else {
          // Generate new transcript
          const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
          result = await transcriptGenerator.generateFromYouTube(videoUrl);

          // Cache the result
          await transcriptGenerator.cacheTranscript(video.id, result);
        }

        if (result.fullText.trim().length > 0) {
          transcripts.push(result.fullText);
          successCount++;
          console.log(`✓ Transcript generated for: ${video.title} (${result.duration.toFixed(1)}s, ${result.fullText.length} chars)`);
        } else {
          failCount++;
          console.log(`✗ Empty transcript for: ${video.title}`);
        }
      } catch (error) {
        failCount++;
        console.log(`✗ Failed to generate transcript for: ${video.title}`, error);
      }
    }

    console.log(
      `Transcripts: ${successCount} successful, ${failCount} failed`
    );

    if (transcripts.length === 0) {
      return NextResponse.json(
        { error: 'No transcripts available for analysis' },
        { status: 400 }
      );
    }

    console.log(`Total transcripts for analysis: ${transcripts.length}`);

    // Step 4: Analyze phrases
    console.log('Analyzing phrases...');
    const phraseAnalysis = extractCommonPhrases(transcripts, {
      minPhraseLength: 2,
      maxPhraseLength: 5,
      minOccurrences: 2, // Lowered from 3 for shorter content
      topN: 50,
    });

    const topWords = extractCommonWords(transcripts, {
      minOccurrences: 3, // Lowered from 5 for shorter content
      topN: 30,
    });

    const catchphrases = extractCatchphrases(transcripts, 3); // Lowered from 5

    // Step 5: Save to cache
    const cacheData = {
      topPhrases: phraseAnalysis.topPhrases,
      topWords,
      catchphrases,
      totalWords: phraseAnalysis.totalWords,
      totalPhrases: phraseAnalysis.totalPhrases,
      lastUpdated: new Date().toISOString(),
      videosAnalyzed: successCount,
    };

    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2));

    console.log('Phrase analysis complete!');

    return NextResponse.json({
      success: true,
      ...cacheData,
    });
  } catch (error) {
    console.error('Error updating phrases:', error);
    return NextResponse.json(
      {
        error: 'Failed to update phrases',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Support GET requests for testing
export async function GET() {
  return NextResponse.json({
    message: 'Use POST request to trigger phrase analysis update',
    endpoint: '/api/phrases/update',
    method: 'POST',
  });
}
