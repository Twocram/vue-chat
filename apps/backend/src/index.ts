import fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import testRoutes from './routes/test';

const server: FastifyInstance = fastify({
  logger: true,
});

server.get('/api', async () => {
  return {
    message: 'Hello World!',
  };
});

server.register(testRoutes, { prefix: '/api/v1/test' });

async function runServer() {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

runServer();
