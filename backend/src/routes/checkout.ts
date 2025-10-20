import { FastifyInstance } from 'fastify';
import { db } from '../db';
import { carts, orders, orderItems } from '../db/schema';
import { eq } from 'drizzle-orm';

export const registerCheckoutRoutes = (server: FastifyInstance) => {
  // Middleware to check for authenticated user
  server.addHook('preHandler', async (request, reply) => {
    if (!request.session.userId) {
      reply.status(401).send({ message: 'Unauthorized' });
    }
  });

  // Simplified checkout process
  server.post('/api/checkout', async (request, reply) => {
    const userId = request.session.userId!;

    const userCart = await db.query.carts.findFirst({
        where: eq(carts.userId, userId),
        with: {
            cartItems: {
                with: {
                    product: true
                }
            }
        }
    });

    if (!userCart || userCart.cartItems.length === 0) {
      return reply.status(400).send({ message: 'Your cart is empty' });
    }

    const total = userCart.cartItems.reduce((acc, item) => acc + (Number(item.product.price) * item.quantity), 0);

    // Create the order
    const newOrder = (await db.insert(orders).values({ userId, total: total.toString() }).returning())[0];

    // Create order items
    await db.insert(orderItems).values(userCart.cartItems.map(item => ({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
    })));

    // Clear the cart (optional)
    await db.delete(cartItems).where(eq(cartItems.cartId, userCart.id));

    reply.status(201).send({ message: 'Checkout successful', orderId: newOrder.id });
  });
};
