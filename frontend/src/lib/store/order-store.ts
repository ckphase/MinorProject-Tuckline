import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  shopId: number;
};

interface OrderStore {
  items: CartItem[];
  shippingAddress: string;
  paymentMethod: string;
  setShippingAddress: (address: string) => void;
  setPaymentMethod: (method: string) => void;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getQuantity: () => number;
  setCart: (items: CartItem[]) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      items: [],
      shippingAddress: '',
      paymentMethod: '',

      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeItem: (variantId) => {
        set({ items: get().items.filter((i) => i.id !== variantId) });
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === variantId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getQuantity: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      setCart: (items) => set({ items }),
      setShippingAddress: (address) => set({ shippingAddress: address }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
    }),
    {
      name: 'order-store',
    }
  )
);
