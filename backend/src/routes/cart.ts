import { FastifyInstance } from 'fastify';
import { db } from '../db';
import { carts, cartItems } from '../db/schema';
import { and, eq } from 'drizzle-orm';

export const registerCartRoutes = (server: FastifyInstance) => {
  // Middleware to check for authenticated user
  server.addHook('preHandler', async (request, reply) => {
    if (!request.session.userId) {
      reply.status(401).send({ message: 'Unauthorized' });
    }
  });

  // Get the user's cart
  server.get('/api/cart', async (request, reply) => {
    const userId = request.session.userId!;
    const userCart = await db.query.carts.findFirst({
        where: eq(carts.userId, userId),
        with: {
            cartItems: {
                with: {
                    product: true,
                }
            }
        }
    });

    if (userCart) {
      reply.send(userCart);
    } else {
      reply.send({ cartItems: [] });
    }
  });

  // Add an item to the cart
  server.post('/api/cart', async (request, reply) => {
    const userId = request.session.userId!;
    const { productId, quantity } = request.body as { productId: number, quantity: number };

    let userCart = await db.query.carts.findFirst({ where: eq(carts.userId, userId) });

    if (!userCart) {
        userCart = (await db.insert(carts).values({ userId }).returning())[0];
    }

    // Check if the item already exists in the cart
    const existingItem = await db.query.cartItems.findFirst({
        where: and(eq(cartItems.cartId, userCart.id), eq(cartItems.productId, productId))
    });

    if (existingItem) {
        // Update quantity
        await db.update(cartItems).set({ quantity: existingItem.quantity + quantity }).where(eq(cartItems.id, existingItem.id));
    } else {
        // Add new item
        await db.insert(cartItems).values({ cartId: userCart.id, productId, quantity });
    }

    reply.status(201).send({ message: 'Item added to cart' });
  });

  // Remove an item from the cart
  server.delete('/api/cart/items/:id', async (request, reply) => {
    const userId = request.session.userId!;
    const { id } = request.params as { id: number };

    const userCart = await db.query.carts.findFirst({ where: eq(carts.userId, userId) });

    if (userCart) {
        await db.delete(cartItems).where(and(eq(cartItems.id, id), eq(cartItems.cartId, userCart.id)));
        reply.send({ message: 'Item removed from cart' });
    } else {
        reply.status(404).send({ message: 'Cart not found' });
    }
  });
};
