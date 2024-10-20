import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { generateHash } from '../utils/generateHash';
import { uid } from 'uid/secure';
import { pick } from '../utils/pick';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/login',
    async function (request: FastifyRequest, reply: FastifyReply) {
      const { username, password } = request.body as {
        username: string;
        password: string;
      };

      const user = await fastify.prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return reply.code(403).send({
          message: 'User not found',
          data: null,
        });
      }

      const _password = await generateHash(password);

      if (!_password.equals(user.password)) {
        return reply.code(403).send({
          message: 'Wrong password',
          data: null,
        });
      }

      return reply.send({
        user: {
          id: user.id,
          username: user.username,
        },
        token: user.token,
      });
    }
  );

  fastify.post(
    '/register',
    async function (request: FastifyRequest, reply: FastifyReply) {
      const { username, password } = request.body as {
        username: string;
        password: string;
      };

      const _password = await generateHash(password);

      const userExists = await fastify.prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (userExists) {
        return reply.code(409).send({
          message: 'User already exists',
          data: null,
        });
      }

      const user = await fastify.prisma.user.create({
        data: {
          username,
          password: _password,
          token: uid(40),
        },
      });

      const _user = pick(user, 'id', 'username', 'token');

      return reply.send({
        data: _user,
      });
    }
  );
}
