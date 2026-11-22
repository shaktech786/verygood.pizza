import { describe, expect, it, vi } from 'vitest';
import { getChannelStatus } from '@/lib/twitch';

type Routes = Record<string, { status?: number; body: unknown }>;

function fakeFetch(routes: Routes) {
  return vi.fn(async (input: string | URL | Request) => {
    const url = String(input);
    const key = Object.keys(routes).find((k) => url.includes(k));
    if (!key) throw new Error(`unexpected fetch ${url}`);
    const { status = 200, body } = routes[key];
    return new Response(JSON.stringify(body), { status });
  });
}

const creds = { clientId: 'id', clientSecret: 'secret' };
const token = { 'oauth2/token': { body: { access_token: 't', expires_in: 100, token_type: 'bearer' } } };
const user = { 'helix/users': { body: { data: [{ id: '42', login: 'verygoodpizza' }] } } };

describe('getChannelStatus', () => {
  it('reports live with title, game and viewers', async () => {
    const fetchImpl = fakeFetch({
      ...token,
      ...user,
      'helix/streams': {
        body: { data: [{ type: 'live', title: 'one bad round and we switch games', game_name: 'Counter-Strike', viewer_count: 12, started_at: '2026-11-22T01:00:00Z' }] },
      },
    });
    const status = await getChannelStatus({ ...creds, fetchImpl });
    expect(status).toEqual({
      state: 'live',
      title: 'one bad round and we switch games',
      game: 'Counter-Strike',
      viewers: 12,
      startedAt: '2026-11-22T01:00:00Z',
    });
  });

  it('reports offline with the latest archived broadcast', async () => {
    const fetchImpl = fakeFetch({
      ...token,
      ...user,
      'helix/streams': { body: { data: [] } },
      'helix/videos': {
        body: { data: [{ title: "the spire doesn't care what time it is", url: 'https://www.twitch.tv/videos/1', created_at: '2026-11-22T06:28:31Z', duration: '2h44m10s' }] },
      },
    });
    const status = await getChannelStatus({ ...creds, fetchImpl });
    expect(status).toEqual({
      state: 'offline',
      lastBroadcast: {
        title: "the spire doesn't care what time it is",
        url: 'https://www.twitch.tv/videos/1',
        startedAt: '2026-11-22T06:28:31Z',
      },
    });
  });

  it('reports offline without a broadcast when there are no archives', async () => {
    const fetchImpl = fakeFetch({
      ...token,
      ...user,
      'helix/streams': { body: { data: [] } },
      'helix/videos': { body: { data: [] } },
    });
    expect(await getChannelStatus({ ...creds, fetchImpl })).toEqual({ state: 'offline' });
  });

  it('reports unknown when credentials are rejected', async () => {
    const fetchImpl = fakeFetch({ 'oauth2/token': { status: 403, body: { message: 'invalid client secret' } } });
    expect(await getChannelStatus({ ...creds, fetchImpl })).toEqual({ state: 'unknown' });
  });

  it('reports unknown when credentials are missing', async () => {
    const fetchImpl = fakeFetch({});
    expect(await getChannelStatus({ clientId: undefined, clientSecret: undefined, fetchImpl })).toEqual({ state: 'unknown' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
