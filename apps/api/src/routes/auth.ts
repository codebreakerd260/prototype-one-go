import { FastifyInstance, FastifyRequest } from 'fastify';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

interface GoogleProfile {
  id: string;
  email: string;
  name: string;
}

export const registerAuthRoutes = (server: FastifyInstance) => {
  // Callback route for Google OAuth
  server.get('/api/auth/google/callback', async function (request, reply) {
    const token = await server.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

    const googleProfile: GoogleProfile = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            'Authorization': `Bearer ${token.access_token}`
        }
    }).then(res => res.json());

    let user = await db.query.users.findFirst({ where: eq(users.providerId, googleProfile.id) });

    if (!user) {
      user = (await db.insert(users).values({
        email: googleProfile.email,
        name: googleProfile.name,
        provider: 'google',
        providerId: googleProfile.id,
      }).returning())[0];
    }

    request.session.userId = user.id;

    // Redirect to the frontend application
    reply.redirect('http://localhost:8080/');
  });

  // Logout route
  server.post('/api/auth/logout', async (request, reply) => {
    if (request.session.userId) {
      await request.session.destroy();
      reply.send({ message: 'Logged out successfully' });
    } else {
      reply.status(400).send({ message: 'Not logged in' });
    }
  });

  // Route to get the current user's profile
  server.get('/api/me', async (request, reply) => {
    if (request.session.userId) {
      const user = await db.query.users.findFirst({ where: eq(users.id, request.session.userId) });
      if (user) {
        reply.send(user);
      } else {
        reply.status(404).send({ message: 'User not found' });
      }
    } else {
      reply.status(401).send({ message: 'Unauthorized' });
    }
  });
};
