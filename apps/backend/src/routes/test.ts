import { FastifyInstance, FastifyReply } from 'fastify';

export default async function testRoutes(fastify: FastifyInstance) {
  fastify.get('/', async function (_, reply: FastifyReply) {
    reply.send({
      message: 'API IS WORKING',
    });
  });
}
