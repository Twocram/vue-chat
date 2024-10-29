import { FastifyInstance, FastifyReply } from 'fastify';

export default async function testRoutes(fastify: FastifyInstance) {
  fastify.get('/', async function (_, reply: FastifyReply) {
    reply.send({
      message: 'API IS WORKING',
    });
  });

  fastify.get('/ws', { websocket: true }, (socket) => {
    socket.on('message', async function (message) {
      socket.send(`your message is: ${message}`);
    });
  });
}
