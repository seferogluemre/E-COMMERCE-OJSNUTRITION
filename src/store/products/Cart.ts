import { create } from "zustand";
import { useToastStore } from "../toast/ToastStore";
import { BASE_URL } from "../../routes/pages/Products/components/types";
import { getAccessToken } from "../../services/api/collections/storage";

export interface CartItem {
  id: string;
  name: string;
  product_variant_id: string;
  aroma: string;
  size: {
    gram: number;
    total_services: number;
  };
  price: number;
  pieces: number;
  photo_src: string;
}

export interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

// Helper function to load items from localStorage based on user status
const loadFromLocalStorage = (): CartItem[] => {
  const accessToken = getAccessToken();
  const storageKey = accessToken ? "BasketItems" : "GuessBasketItems";
  const storedItems = localStorage.getItem(storageKey);
  return storedItems ? JSON.parse(storedItems) : [];
};

// Helper function to save items to localStorage based on user status
const saveToLocalStorage = (items: CartItem[]) => {
  const accessToken = getAccessToken();
  const storageKey = accessToken ? "BasketItems" : "GuessBasketItems";
  localStorage.setItem(storageKey, JSON.stringify(items));
};

// Sepet temizleme ve geçiş fonksiyonu
export const clearUserCart = () => {
  // Mevcut misafir sepetini koru
  const guestItems = localStorage.getItem("GuessBasketItems") || "[]";

  // Kullanıcı sepetini temizle
  localStorage.removeItem("BasketItems");

  // Store'u güncelle - misafir sepetine geç
  useCartStore.setState({ items: JSON.parse(guestItems) });
};

export const useCartStore = create<CartStore>((set, get) => {
  const fetchUserCart = async () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      const items = loadFromLocalStorage();
      set({ items });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Sepet bilgileri alınamadı");
      }

      const cartData = await response.json();
      console.log("cartData", cartData);
      if (cart.status === "success" && cartData.data.items) {
        const formattedItems: CartItem[] = cartData.data.items.map(
          (item: any) => ({
            id: item.product_id,
            name: item.product,
            product_variant_id: item.product_variant_id,
            aroma: item.product_variant_detail.aroma,
            size: {
              gram: item.product_variant_detail.size.gram,
              total_services: item.product_variant_detail.size.total_services,
            },
            price: item.unit_price,
            pieces: item.pieces,
            photo_src: item.product_variant_detail.photo_src,
          })
        );

        set({ items: formattedItems });
        saveToLocalStorage(formattedItems);
      } else {
        set({ items: [] });
        saveToLocalStorage([]);
      }
    } catch (error) {
      console.error("Sepet bilgileri alınırken hata:", error);
      const items = loadFromLocalStorage();
      set({ items: items });
    }
  };

  fetchUserCart();

  return {
    items: loadFromLocalStorage(),
    addToCart: async (item) => {
      try {
        const accessToken = getAccessToken();

        if (accessToken) {
          const response = await fetch(`${BASE_URL}/users/cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              product_id: item.id,
              product_variant_id: item.product_variant_id,
              pieces: item.pieces,
            }),
          });

          if (!response.ok) {
            throw new Error("Sepet güncellenemedi");
          }
        }

        set((state) => {
          const existingItem = state.items.find(
            (i) =>
              i.id === item.id &&
              i.aroma === item.aroma &&
              i.size.gram === item.size.gram &&
              i.size.total_services === item.size.total_services
          );

          let newItems;
          if (existingItem) {
            newItems = state.items.map((i) =>
              i.id === item.id &&
              i.aroma === item.aroma &&
              i.size.gram === item.size.gram &&
              i.size.total_services === item.size.total_services
                ? { ...i, pieces: i.pieces + item.pieces }
                : i
            );
          } else {
            newItems = [...state.items, item];
          }

          // Local storage güncelleme
          saveToLocalStorage(newItems);

          useToastStore.getState().showToast("Ürün sepetinize eklendi");

          return { items: newItems };
        });
      } catch (error) {
        useToastStore
          .getState()
          .showToast("Sepet güncellenirken bir hata oluştu");
        console.error("Sepet güncelleme hatası:", error);
      }
    },

    removeFromCart: async (itemId: string) => {
      try {
        const accessToken = getAccessToken();
        const state = get();
        const itemToRemove = state.items.find((item) => item.id === itemId);

        if (!itemToRemove) {
          throw new Error("Ürün bulunmadı");
        }

        if (accessToken) {
          const response = await fetch(`${BASE_URL}/users/cart`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              product_id: itemToRemove.id,
              product_variant_id: itemToRemove.product_variant_id,
              pieces: itemToRemove.pieces,
            }),
          });

          if (!response.ok) {
            throw new Error("Ürün sepetten silinemedi");
          }
        }

        set((state) => {
          const newItems = state.items.filter((item) => item.id !== itemId);
          saveToLocalStorage(newItems);

          useToastStore.getState().showToast("Ürün sepetinizden kaldırıldı");

          return { items: newItems };
        });
      } catch (error) {
        console.error("Ürün silme hatası:", error);
        useToastStore.getState().showToast("Ürün silinirken bir hata oluştu");
      }
    },

    updateQuantity: async (itemId: string, quantity: number) => {
      try {
        const state = get();
        const targetItem = state.items.find((item) => item.id === itemId);
        if (!targetItem) return;

        const newPieces = targetItem.pieces + quantity;

        if (newPieces <= 0) {
          get().removeFromCart(itemId);
          return;
        }

        const accessToken = getAccessToken();
        if (accessToken) {
          const response = await fetch(`${BASE_URL}/users/cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              product_id: targetItem.id,
              product_variant_id: targetItem.product_variant_id,
              pieces: newPieces,
            }),
          });
          console.log("Yeni miktar:", newPieces);
          if (!response.ok) {
            throw new Error("Ürün miktarı güncellenemedi");
          }
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === itemId &&
            item.aroma === targetItem.aroma &&
            item.size.gram === targetItem.size.gram
              ? { ...item, pieces: newPieces }
              : item
          );

          saveToLocalStorage(newItems);
          useToastStore.getState().showToast("Ürün miktarı güncellendi");
          return { items: newItems };
        });
      } catch (error) {
        console.error("Miktar güncelleme hatası:", error);
        useToastStore
          .getState()
          .showToast("Miktar güncellenirken bir hata oluştu");
      }
    },

    getTotalPrice: () => {
      const { items } = get();
      return items.reduce((total, item) => total + item.price * item.pieces, 0);
    },

    getTotalItems: () => {
      const { items } = get();
      return items.length;
    },
  };
});

useCartStore.getState();

console.log(localStorage.getItem("BasketItems"));
