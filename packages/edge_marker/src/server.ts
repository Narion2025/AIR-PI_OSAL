import Fastify from 'fastify';
import { analyzeText } from './markerEngine.js';
import { fileURLToPath } from 'url';

const fastify = Fastify();

fastify.post('/analyze', async (request, reply) => {
  const body = request.body as { text?: string };
  if (!body?.text) return reply.status(400).send({ error: 'text required' });
  const packet = analyzeText('req', body.text);
  reply.send(packet);
});

fastify.get('/status', async () => ({ status: 'ok' }));

export async function start() {
  const port = Number(process.env.PORT ?? 3000);
  await fastify.listen({ port, host: '0.0.0.0' });
  console.log(`edge_marker listening on ${port}`);
}

const isCli = process.argv[1] === fileURLToPath(import.meta.url);
if (isCli) {
  start();
}
