import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'data', 'phrases-cache.json');

/**
 * GET /api/phrases
 * Returns cached phrase analysis data
 */
export async function GET() {
  try {
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });

    // Try to read cached data
    try {
      const data = await fs.readFile(CACHE_FILE, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    } catch (error) {
      // If no cache exists, return empty data
      return NextResponse.json({
        topPhrases: [],
        topWords: [],
        catchphrases: [],
        totalWords: 0,
        totalPhrases: 0,
        lastUpdated: null,
        videosAnalyzed: 0,
      });
    }
  } catch (error) {
    console.error('Error fetching phrases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch phrases' },
      { status: 500 }
    );
  }
}
