import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (garmentId: string) => void;
  updateQuantity: (garmentId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existing = state.items.find(i => i.garmentId === item.garmentId);
        if (existing) {
          return {
            items: state.items.map(i =>
              i.garmentId === item.garmentId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      
      removeItem: (garmentId) => set((state) => ({
        items: state.items.filter(i => i.garmentId !== garmentId)
      })),
      
      updateQuantity: (garmentId, quantity) => set((state) => ({
        items: state.items.map(i =>
          i.garmentId === garmentId ? { ...i, quantity: Math.max(1, quantity) } : i
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      total: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },
      
      itemCount: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    { name: 'vyuga-cart' }
  )
);
