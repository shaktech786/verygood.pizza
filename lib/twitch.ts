export const TWITCH_LOGIN = 'verygoodpizza';

export interface Broadcast {
  title: string;
  url: string;
  endedAt: string;
}

export type ChannelStatus =
  | { state: 'live'; title: string; game: string; viewers: number; startedAt: string }
  | { state: 'offline'; lastBroadcast?: Broadcast }
  | { state: 'unknown' };

// Helix video durations look like "2h44m10s" or "44m5s".
function durationMs(duration: string): number {
  const [, h = '0', m = '0', s = '0'] = duration.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/) ?? [];
  return ((Number(h) * 60 + Number(m)) * 60 + Number(s)) * 1000;
}

interface StatusOptions {
  clientId: string | undefined;
  clientSecret: string | undefined;
  fetchImpl?: typeof fetch;
}

interface HelixList<T> {
  data: T[];
}

export async function getChannelStatus({ clientId, clientSecret, fetchImpl = fetch }: StatusOptions): Promise<ChannelStatus> {
  if (!clientId || !clientSecret) return { state: 'unknown' };

  try {
    const tokenRes = await fetchImpl('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, grant_type: 'client_credentials' }),
    });
    if (!tokenRes.ok) return { state: 'unknown' };
    const { access_token } = (await tokenRes.json()) as { access_token: string };

    const helix = async <T,>(path: string): Promise<T[]> => {
      const res = await fetchImpl(`https://api.twitch.tv/helix/${path}`, {
        headers: { 'Client-Id': clientId, Authorization: `Bearer ${access_token}` },
      });
      if (!res.ok) throw new Error(`Helix ${path} -> ${res.status}`);
      return ((await res.json()) as HelixList<T>).data;
    };

    const [stream] = await helix<{ type: string; title: string; game_name: string; viewer_count: number; started_at: string }>(
      `streams?user_login=${TWITCH_LOGIN}`,
    );
    if (stream?.type === 'live') {
      return { state: 'live', title: stream.title, game: stream.game_name, viewers: stream.viewer_count, startedAt: stream.started_at };
    }

    const [user] = await helix<{ id: string }>(`users?login=${TWITCH_LOGIN}`);
    if (!user) return { state: 'offline' };
    const [vod] = await helix<{ title: string; url: string; created_at: string; duration: string }>(
      `videos?user_id=${user.id}&type=archive&first=1`,
    );
    if (!vod) return { state: 'offline' };
    const endedAt = new Date(Date.parse(vod.created_at) + durationMs(vod.duration)).toISOString();
    return { state: 'offline', lastBroadcast: { title: vod.title, url: vod.url, endedAt } };
  } catch (error) {
    console.error('[twitch] status lookup failed', error);
    return { state: 'unknown' };
  }
}
