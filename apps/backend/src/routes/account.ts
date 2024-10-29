import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { useAuth } from '../hooks/users/useAuth';
import { pick } from '../utils/pick';

export default async function accountRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', useAuth);

  fastify.get('/info', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.user;

    const user = await fastify.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return reply.code(403).send({
        message: 'User not found',
      });
    }

    return reply.code(200).send({
      data: pick(user, 'id', 'username'),
    });
  });
}
