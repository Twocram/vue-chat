import fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import testRoutes from './routes/test';
import prismaPlugin from './plugins/prismaPlugin';
import authRoutes from './routes/auth';

const server: FastifyInstance = fastify({
  logger: true,
});

server.register(prismaPlugin);

server.register(testRoutes, { prefix: '/api/v1/test' });
server.register(authRoutes, { prefix: '/api/v1/auth' });

async function runServer() {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

runServer();
