import type { FastifyRequest, FastifyInstance, FastifyReply } from 'fastify';
import { useAuth } from '../hooks/users/useAuth';
import { pick } from '../utils/pick';

export default async function chatRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', useAuth);

  fastify.get(
    '/my-chats',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.user;

      const { searchName } = request.query as { searchName: string };

      const userChats = await fastify.prisma.chat.findMany({
        where: {
          participants: {
            some: {
              id,
            },
          },

          name: {
            contains: searchName,
          },
        },

        include: {
          messages: true,
        },
      });

      const _userChats = userChats.map((chat) => {
        return {
          ...pick(chat, 'id', 'name'),
          lastMessage: chat.messages[chat.messages.length - 1] || null,
        };
      });
      return reply.send({
        data: _userChats,
      });
    }
  );

  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const { name } = request.body as { name: string };

    const chat = await fastify.prisma.chat.create({
      data: {
        name,
        participants: {
          connect: {
            id: request.user.id,
          },
        },
      },
    });

    return reply.send({
      data: chat,
    });
  });
}
