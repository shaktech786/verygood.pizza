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
 * Fetch videos from a YouTube channel using RSS feed (no API key required)
 */
export async function fetchChannelVideos(channelId: string): Promise<YouTubeVideo[]> {
  try {
    // YouTube RSS feed endpoint
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    const response = await fetch(rssUrl);
    const xmlText = await response.text();

    // Parse XML to extract video data
    const videos: YouTubeVideo[] = [];
    const videoRegex = /<entry>([\s\S]*?)<\/entry>/g;
    const matches = xmlText.matchAll(videoRegex);

    for (const match of matches) {
      const entry = match[1];

      const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>(.*?)<\/title>/)?.[1];
      const publishedAt = entry.match(/<published>(.*?)<\/published>/)?.[1];
      const description = entry.match(/<media:description>(.*?)<\/media:description>/)?.[1];
      const thumbnailUrl = entry.match(/<media:thumbnail url="(.*?)"/)?.[1];

      if (videoId && title && publishedAt) {
        videos.push({
          id: videoId,
          title: decodeHtmlEntities(title),
          description: decodeHtmlEntities(description || ''),
          publishedAt,
          thumbnailUrl: thumbnailUrl || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        });
      }
    }

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
