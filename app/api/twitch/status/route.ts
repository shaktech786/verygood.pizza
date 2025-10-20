import { NextResponse } from 'next/server';
import { getStreamStatus } from '@/lib/twitch';

export const runtime = 'edge';
export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const channelName = process.env.TWITCH_CHANNEL_NAME || 'verygoodpizza';
    const status = await getStreamStatus(channelName);

    return NextResponse.json(status, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('Error fetching Twitch status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stream status', isLive: false },
      { status: 500 }
    );
  }
}
