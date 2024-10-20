import { preHandlerHookHandler } from 'fastify';

export const useAuth: preHandlerHookHandler = async function (request, reply) {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    return reply.code(401).send({
      message: 'User is not authorized',
    });
  }

  try {
    const user = await this.prisma.user.findUnique({
      where: {
        token,
      },

      select: {
        id: true,
      },
    });

    if (!user) {
      return reply.code(401).send({
        message: 'Wrong token',
      });
    }

    request.user = user;
  } catch (err) {
    console.log(err);
    return reply.code(500).send({
      message: 'Internal server error',
    });
  }
};
