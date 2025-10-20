import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Cart, User } from '@/types';

export const fetchCart = async (): Promise<Cart> => {
  const response = await fetch('/api/cart');
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  return response.json();
};

export const useCart = (user: User | null | undefined) => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    enabled: !!user, // Only fetch cart if user is logged in
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number, quantity: number }) => {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (itemId: number) => {
        const response = await fetch(`/api/cart/items/${itemId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to remove from cart');
        }
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};
