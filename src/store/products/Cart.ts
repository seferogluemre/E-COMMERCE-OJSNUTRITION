import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  aroma: string;
  size: {
    gram: number;
    total_services: number;
  };
  price: number;
  quantity: number;
  photo_src: string;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (item) => {
    set((state) => {
      const existingItem = state.items.find(
        (i) =>
          i.id === item.id &&
          i.aroma === item.aroma &&
          i.size.gram === item.size.gram
      );

      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id &&
            i.aroma === item.aroma &&
            i.size.gram === item.size.gram
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }

      return { items: [...state.items, item] };
    });
  },

  removeFromCart: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity < 1) return; // Prevent negative quantities

    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }));
  },

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getTotalItems: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },
}));
