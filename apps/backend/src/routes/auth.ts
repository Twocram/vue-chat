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
        return reply.code(200).send({
          data: {
            error: 'User not found',
          },
        });
      }

      const _password = await generateHash(password);

      if (!_password.equals(user.password)) {
        return reply.code(200).send({
          data: {
            error: 'Wrong password',
          },
        });
      }

      return reply.send({
        data: {
          user: {
            id: user.id,
            username: user.username,
          },
          token: user.token,
        },
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
        return reply.code(200).send({
          data: {
            error: 'User already exists',
          },
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
