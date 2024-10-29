import { FastifyInstance } from 'fastify';

export default async function messageRoutes(fastify: FastifyInstance) {
  fastify.get('/:id', { websocket: true }, async (connection, req) => {
    const { id } = req.params as { id: string };

    const chatMessages = await fastify.prisma.message.findMany({
      where: {
        chatId: id,
      },
    });

    connection.send(
      JSON.stringify({
        messages: chatMessages,
      })
    );
  });
}
