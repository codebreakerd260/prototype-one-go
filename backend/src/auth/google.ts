import { FastifyInstance } from 'fastify';
import oauthPlugin from '@fastify/oauth2';

export const registerGoogleOAuth = (server: FastifyInstance) => {
  server.register(oauthPlugin, {
    name: 'googleOAuth2',
    scope: ['profile', 'email'],
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID!,
        secret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/api/auth/google',
    callbackUri: `http://localhost:3000/api/auth/google/callback`,
  });
};
