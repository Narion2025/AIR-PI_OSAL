import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { buildServer } from '../index';

const fakeRedis = { rpush: vi.fn().mockResolvedValue(1) } as any;
const server = buildServer(fakeRedis);

beforeAll(async () => {
  await server.ready();
});

afterAll(async () => {
  await server.close();
});

describe('POST /ingest', () => {
  it('queues valid packet', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/ingest',
      payload: {
        id: 't1',
        timestamp: new Date().toISOString(),
        markers: { joy: 1 },
        ttl: 60
      }
    });
    expect(response.statusCode).toBe(201);
  });

  it('rejects invalid packet', async () => {
    const response = await server.inject({ method: 'POST', url: '/ingest', payload: {} });
    expect(response.statusCode).toBe(400);
  });
});
