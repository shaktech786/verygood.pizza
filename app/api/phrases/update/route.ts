import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import {
  fetchChannelVideos,
  fetchVideoTranscript,
  getChannelIdFromHandle,
} from '@/lib/youtube';
import {
  extractCommonPhrases,
  extractCommonWords,
  extractCatchphrases,
} from '@/lib/phrase-analysis';

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

    // Step 1: Get channel ID from handle
    const channelId = await getChannelIdFromHandle(CHANNEL_HANDLE);
    console.log(`Found channel ID: ${channelId}`);

    // Step 2: Fetch recent videos from channel
    const videos = await fetchChannelVideos(channelId);
    console.log(`Found ${videos.length} videos`);

    // Step 3: Fetch transcripts for all videos (with error handling)
    const transcripts: string[] = [];
    let successCount = 0;
    let failCount = 0;

    for (const video of videos) {
      try {
        const transcript = await fetchVideoTranscript(video.id);
        console.log(`Debug: Raw transcript length for ${video.id}:`, transcript.length);
        if (transcript.length > 0) {
          console.log(`Debug: First transcript item:`, transcript[0]);
        }
        const fullText = transcript.map(item => item.text).join(' ');
        console.log(`Debug: Mapped text length: ${fullText.length}`);
        if (fullText.trim().length > 0) {
          transcripts.push(fullText);
          successCount++;
          console.log(`✓ Transcript fetched for: ${video.title}`);
        } else {
          failCount++;
          console.log(`✗ Empty transcript for: ${video.title}`);
        }
      } catch (error) {
        failCount++;
        console.log(`✗ No transcript for: ${video.title}`);
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

    // Debug: Check transcript data
    console.log(`Total transcript count: ${transcripts.length}`);
    transcripts.forEach((t, i) => {
      console.log(`Transcript ${i + 1}: ${t.length} characters, first 50 chars: "${t.substring(0, 50)}"`);
    });

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
