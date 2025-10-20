/**
 * Twitch API Integration
 * Handles authentication and fetching stream data
 */

interface TwitchTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
}

interface TwitchStream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: 'live' | '';
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  is_mature: boolean;
}

interface TwitchUserResponse {
  data: TwitchUser[];
}

interface TwitchStreamResponse {
  data: TwitchStream[];
}

/**
 * Get Twitch API access token using client credentials
 */
export async function getTwitchAccessToken(): Promise<string> {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET');
  }

  const url = 'https://id.twitch.tv/oauth2/token';
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  });

  const response = await fetch(`${url}?${params}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get Twitch access token: ${response.status}`);
  }

  const data = (await response.json()) as TwitchTokenResponse;
  return data.access_token;
}

/**
 * Get Twitch user information by username
 */
export async function getTwitchUser(username: string): Promise<TwitchUser | null> {
  try {
    const accessToken = await getTwitchAccessToken();
    const clientId = process.env.TWITCH_CLIENT_ID;

    const response = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: {
        'Client-ID': clientId!,
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error(`Twitch API error: ${response.status}`);
      return null;
    }

    const data = (await response.json()) as TwitchUserResponse;
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching Twitch user:', error);
    return null;
  }
}

/**
 * Check if a channel is currently live and get stream info
 */
export async function getTwitchStream(username: string): Promise<TwitchStream | null> {
  try {
    const accessToken = await getTwitchAccessToken();
    const clientId = process.env.TWITCH_CLIENT_ID;

    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${username}`, {
      headers: {
        'Client-ID': clientId!,
        'Authorization': `Bearer ${accessToken}`,
      },
      // Cache for 1 minute to avoid rate limits
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Twitch streams API error: ${response.status}`);
      return null;
    }

    const data = (await response.json()) as TwitchStreamResponse;
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching Twitch stream:', error);
    return null;
  }
}

/**
 * Check if channel is live (simplified)
 */
export async function isChannelLive(username: string): Promise<boolean> {
  const stream = await getTwitchStream(username);
  return stream !== null && stream.type === 'live';
}

/**
 * Get comprehensive stream status
 */
export async function getStreamStatus(username: string) {
  const [user, stream] = await Promise.all([
    getTwitchUser(username),
    getTwitchStream(username),
  ]);

  return {
    isLive: stream !== null && stream.type === 'live',
    user,
    stream,
    viewerCount: stream?.viewer_count || 0,
    gameName: stream?.game_name || null,
    title: stream?.title || null,
    startedAt: stream?.started_at || null,
    thumbnailUrl: stream?.thumbnail_url || null,
  };
}
