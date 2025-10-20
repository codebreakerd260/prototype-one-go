import { FastifyInstance } from 'fastify';
import { db } from '../db';
import { products } from '../db/schema';
import { eq } from 'drizzle-orm';

export const registerProductRoutes = (server: FastifyInstance) => {
  // Get all products
  server.get('/api/products', async (request, reply) => {
    const allProducts = await db.query.products.findMany();
    reply.send(allProducts);
  });

  // Get a single product by ID
  server.get('/api/products/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    const product = await db.query.products.findFirst({ where: eq(products.id, id) });

    if (product) {
      reply.send(product);
    } else {
      reply.status(404).send({ message: 'Product not found' });
    }
  });
};
