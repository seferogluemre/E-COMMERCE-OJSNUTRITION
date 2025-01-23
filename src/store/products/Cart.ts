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

// Helper function to load items from localStorage
const loadFromLocalStorage = (): CartItem[] => {
  const storedItems = localStorage.getItem("BasketItems");
  return storedItems ? JSON.parse(storedItems) : [];
};

// Helper function to save items to localStorage
const saveToLocalStorage = (items: CartItem[]) => {
  localStorage.setItem("BasketItems", JSON.stringify(items));
};

export const useCartStore = create<CartStore>((set, get) => ({
  // Initialize items from localStorage
  items: loadFromLocalStorage(),

  addToCart: (item) => {
    set((state) => {
      const existingItem = state.items.find(
        (i) =>
          i.id === item.id &&
          i.aroma === item.aroma &&
          i.size.gram === item.size.gram
      );

      let newItems;
      if (existingItem) {
        newItems = state.items.map((i) =>
          i.id === item.id &&
          i.aroma === item.aroma &&
          i.size.gram === item.size.gram
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        newItems = [...state.items, item];
      }

      // Save to localStorage
      saveToLocalStorage(newItems);
      return { items: newItems };
    });
  },

  removeFromCart: (itemId) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== itemId);
      // Save to localStorage
      saveToLocalStorage(newItems);
      return { items: newItems };
    });
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity < 1) return; // Prevent negative quantities

    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      // Save to localStorage
      saveToLocalStorage(newItems);
      return { items: newItems };
    });
  },

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getTotalItems: () => {
    const { items } = get();
    return items.length;
  },
}));
