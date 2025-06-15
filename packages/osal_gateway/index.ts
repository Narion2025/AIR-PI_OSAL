import Fastify from 'fastify';
import Redis from 'ioredis';

export interface MarkerPacket {
  id: string;
  timestamp: string;
  markers: Record<string, number>;
  ttl: number;
}

function verifyDummy(_packet: MarkerPacket): boolean {
  return true;
}

function laplaceNoise(scale: number): number {
  const u = Math.random() - 0.5;
  return -scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u));
}

function applyDifferentialPrivacy(pkt: MarkerPacket, epsilon = 0.8): MarkerPacket {
  const scale = 1 / epsilon;
  const markers: Record<string, number> = {};
  for (const [k, v] of Object.entries(pkt.markers)) {
    markers[k] = v + laplaceNoise(scale);
  }
  return { ...pkt, markers };
}

function buildConsentCapsule(purpose = 'analysis', ttl = 3600) {
  return { purpose, ttl };
}

export function buildServer(redis?: Redis) {
  const fastify = Fastify();
  const client = redis ?? new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

  fastify.post('/ingest', async (request, reply) => {
    const packet = request.body as Partial<MarkerPacket>;
    if (!packet || !packet.markers || !verifyDummy(packet as MarkerPacket)) {
      return reply.status(400).send({ error: 'invalid packet' });
    }
    const capsule = buildConsentCapsule();
    const noisy = applyDifferentialPrivacy(packet as MarkerPacket);
    await client.rpush('packets', JSON.stringify({ capsule, packet: noisy }));
    reply.status(201).send({ status: 'queued' });
  });

  fastify.get('/status', async () => ({ status: 'ok' }));

  return fastify;
}

export async function start() {
  const server = buildServer();
  const port = Number(process.env.PORT || 3001);
  await server.listen({ port, host: '0.0.0.0' });
  console.log(`osal_gateway listening on ${port}`);
}

if (require.main === module) {
  start();
}
