/**
 * YouTube utility functions for fetching channel videos and transcripts
 */

import { YoutubeTranscript } from 'youtube-transcript';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  duration?: string;
}

export interface TranscriptItem {
  text: string;
  offset: number;
  duration: number;
}

/**
 * Fetch videos from a YouTube channel using yt-dlp (no API key required)
 * @param channelId - YouTube channel ID
 * @param maxVideos - Maximum number of videos to fetch (default: 25)
 */
export async function fetchChannelVideos(channelId: string, maxVideos: number = 25): Promise<YouTubeVideo[]> {
  try {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    // Use yt-dlp to fetch video metadata without downloading
    // --flat-playlist: Don't download, just list
    // --print-json: Output JSON for each video
    // --playlist-end: Limit number of videos
    // Use /streams tab instead of /videos (which doesn't work for all channels)
    const command = `yt-dlp --flat-playlist --print-json --playlist-end ${maxVideos} --cookies-from-browser chrome "https://www.youtube.com/@verygoodpizzaofficial/streams"`;

    const { stdout } = await execAsync(command, { maxBuffer: 1024 * 1024 * 10 });

    // Parse JSON lines (one video per line)
    const videos: YouTubeVideo[] = [];
    const lines = stdout.trim().split('\n').filter(line => line.trim());

    for (const line of lines) {
      try {
        const data = JSON.parse(line);

        videos.push({
          id: data.id,
          title: data.title,
          description: data.description || '',
          publishedAt: data.upload_date
            ? `${data.upload_date.slice(0, 4)}-${data.upload_date.slice(4, 6)}-${data.upload_date.slice(6, 8)}`
            : new Date().toISOString(),
          thumbnailUrl: data.thumbnail || `https://i.ytimg.com/vi/${data.id}/hqdefault.jpg`,
          duration: data.duration ? `${data.duration}` : undefined,
        });
      } catch (parseError) {
        console.error('Error parsing video JSON:', parseError);
      }
    }

    console.log(`Fetched ${videos.length} videos from channel ${channelId}`);
    return videos;
  } catch (error) {
    console.error('Error fetching YouTube channel videos:', error);
    throw new Error('Failed to fetch YouTube videos');
  }
}

/**
 * Get channel ID from channel handle (e.g., @verygoodpizzaofficial)
 */
export async function getChannelIdFromHandle(handle: string): Promise<string> {
  try {
    // Remove @ if present
    const cleanHandle = handle.replace('@', '');

    // Fetch the channel page
    const response = await fetch(`https://www.youtube.com/${handle}`);
    const html = await response.text();

    // Extract channel ID from meta tags
    const channelIdMatch = html.match(/"channelId":"([^"]+)"/);
    const externalIdMatch = html.match(/"externalId":"([^"]+)"/);

    const channelId = channelIdMatch?.[1] || externalIdMatch?.[1];

    if (!channelId) {
      throw new Error('Channel ID not found');
    }

    return channelId;
  } catch (error) {
    console.error('Error getting channel ID from handle:', error);
    throw new Error('Failed to get channel ID');
  }
}

/**
 * Fetch transcript for a YouTube video
 */
export async function fetchVideoTranscript(videoId: string): Promise<TranscriptItem[]> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return transcript.map(item => ({
      text: item.text,
      offset: item.offset,
      duration: item.duration,
    }));
  } catch (error) {
    console.error(`Error fetching transcript for video ${videoId}:`, error);
    throw new Error('Failed to fetch video transcript');
  }
}

/**
 * Decode HTML entities in text
 */
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
  };

  return text.replace(/&[#\w]+;/g, entity => entities[entity] || entity);
}
