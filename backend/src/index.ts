import fastify from 'fastify';
import { registerGoogleOAuth } from './auth/google';
import { registerAuthRoutes } from './routes/auth';
import { registerProductRoutes } from './routes/products';
import { registerCartRoutes } from './routes/cart';
import { registerCheckoutRoutes } from './routes/checkout';
import cookie from '@fastify/cookie';
import session from '@fastify/session';
import * as dotenv from 'dotenv';
dotenv.config();

const server = fastify({ logger: true });

// Register session management
server.register(cookie);
server.register(session, {
  secret: process.env.SESSION_SECRET || 'a-very-long-and-random-secret-string-for-session',
  cookie: { secure: false }, // Set to true in production with HTTPS
  expires: 1800000 // 30 minutes
});

// Register routes
registerGoogleOAuth(server);
server.register(registerAuthRoutes);
server.register(registerProductRoutes);
server.register(registerCartRoutes);
server.register(registerCheckoutRoutes);


server.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

// Extend the Fastify session interface
declare module 'fastify' {
    interface Session {
        userId?: number;
    }
}
