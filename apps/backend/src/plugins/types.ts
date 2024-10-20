import { User } from '@prisma/client';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyRequest {
    user: Pick<User, 'id'>;
  }
}

const typesPlugin = fp(async (fastify) => {
  fastify.decorate('user', null);
});

export default typesPlugin;
