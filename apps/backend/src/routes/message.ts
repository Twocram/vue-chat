import { FastifyInstance } from 'fastify';
import { pick } from '../utils/pick';

const clients = new Map<string, any[]>();

export default async function messageRoutes(fastify: FastifyInstance) {
  fastify.get('/:id', { websocket: true }, async (connection, req) => {
    const { id } = req.params as { id: string };

    if (!clients.has(id)) {
      clients.set(id, []);
    }

    clients.get(id)?.push(connection);

    const chatMessages = await fastify.prisma.message.findMany({
      where: {
        chatId: id,
      },
    });

    connection.send(
      JSON.stringify({
        messages: chatMessages.map((message) =>
          pick(message, 'id', 'text', 'createdAt', 'userId')
        ),
      })
    );

    connection.onmessage = async (event) => {
      if (!req.headers['sec-websocket-protocol']) {
        return;
      }
      const userToken = req.headers['sec-websocket-protocol']
        .split(',')[1]
        .trim();

      const user = await fastify.prisma.user.findUnique({
        where: {
          token: userToken.toString(),
        },
      });

      if (!user) {
        return;
      }

      const messageText = JSON.parse(event.data as string).message;

      await fastify.prisma.message.create({
        data: {
          text: messageText,
          userId: user.id,
          chatId: id,
        },
      });

      const _chatMessages = await fastify.prisma.message.findMany({
        where: {
          chatId: id,
        },
      });

      clients.get(id)?.forEach((client) => {
        client.send(
          JSON.stringify({
            messages: _chatMessages.map((message) =>
              pick(message, 'id', 'text', 'createdAt', 'userId')
            ),
          })
        );
      });
    };

    connection.onclose = () => {
      if (clients && clients.has(id)) {
        const clientList = clients.get(id);
        if (clientList) {
          clientList.splice(clientList.indexOf(connection), 1);
        }
      }
    };
  });
}
