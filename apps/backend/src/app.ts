import fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import testRoutes from './routes/test';
import fastifyWebsocket from '@fastify/websocket';
import fastifyCors from '@fastify/cors';
import prismaPlugin from './plugins/prismaPlugin';
import typesPlugin from './plugins/types';
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';
import messageRoutes from './routes/message';
import accountRoutes from './routes/account';

const server: FastifyInstance = fastify({
  logger: true,
});

server.register(prismaPlugin);
server.register(typesPlugin);
server.register(fastifyWebsocket, {
  options: {
    maxPayload: 1048576,
  },
});
server.register(fastifyCors);

server.register(testRoutes, { prefix: '/api/v1/test' });
server.register(authRoutes, { prefix: '/api/v1/auth' });
server.register(chatRoutes, { prefix: '/api/v1/chat' });
server.register(messageRoutes, { prefix: '/api/v1/messages' });
server.register(accountRoutes, { prefix: '/api/v1/account' });

async function runServer() {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

runServer();
