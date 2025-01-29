import { create } from "zustand";
import { useToastStore } from "../toast/ToastStore";
import { BASE_URL } from "../../routes/pages/Products/components/types";
import { getAccessToken } from "../../services/api/collections/storage";
import { createAxiosInstance } from "../../services/api/axios";

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
  variant_name: string;
}

export interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  fetchUserCart: () => Promise<void>;
}

const loadFromLocalStorage = (): CartItem[] => {
  const accessToken = getAccessToken();
  const storageKey = !accessToken ? "GuessBasketItems" : "GuessBasketItems";
  const storedItems = localStorage.getItem(storageKey);
  return storedItems ? JSON.parse(storedItems) : [];
};

// Sepet temizleme ve geçiş fonksiyonu
export const clearUserCart = () => {
  const guestItems = localStorage.getItem("GuessBasketItems") || "[]";

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
      if (cartData.status === "success" && cartData.data.items) {
        const formattedItems: CartItem[] = cartData.data.items.map((item: any) => ({
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
          variant_name: item.product_variant_detail.variant_name,
        }));
        set({ items: formattedItems });
      } else {
        set({ items: [] });
      }
    } catch (error) {
      console.error("Sepet bilgileri alınırken hata:", error);
      const items = loadFromLocalStorage();
      set({ items: items });
    }
  };

  // Initialize store
  fetchUserCart();

  return {
    items: [], // Start with empty array instead of Promise
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

          useToastStore
            .getState()
            .showToast("Ürün sepetinize eklendi", "success");

          return { items: newItems };
        });
      } catch (error) {
        useToastStore
          .getState()
          .showToast("Sepet güncellenirken bir hata oluştu", "error");
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

          useToastStore
            .getState()
            .showToast("Ürün sepetinizden kaldırıldı", "success");

          return { items: newItems };
        });
      } catch (error) {
        useToastStore
          .getState()
          .showToast("Ürün silinirken bir hata oluştu", "error");
        console.error("Ürün silme hatası:", error);
      }
    },

    updateQuantity: async (itemId: string, quantity: number) => {
      try {
        const state = get();
        const targetItem = state.items.find((item) => item.id === itemId);
        if (!targetItem) return;

        const accessToken = getAccessToken();

        if (accessToken) {
          // Önce mevcut ürünü sepetten sil
          await createAxiosInstance().delete("/users/cart", {
            data: {
              product_id: targetItem.id,
              product_variant_id: targetItem.product_variant_id,
              pieces: targetItem.pieces,
            },
          });

          // Sonra yeni adet ile ekle
          const response = await createAxiosInstance().post("/users/cart", {
            product_id: targetItem.id,
            product_variant_id: targetItem.product_variant_id,
            pieces: quantity,
          });

          if (response.status !== 201) {
            throw new Error("Ürün miktarı güncellenemedi");
          }

          const cartResponse = await createAxiosInstance().get("/users/cart");
          const cartData = cartResponse.data;

          if (cartData.status === "success" && cartData.data.items) {
            const formattedItems: CartItem[] = cartData.data.items.map(
              (item: any) => ({
                id: item.product_id,
                name: item.product,
                product_variant_id: item.product_variant_id,
                aroma: item.product_variant_detail.aroma,
                size: {
                  gram: item.product_variant_detail.size.gram,
                  total_services:
                    item.product_variant_detail.size.total_services,
                },
                price: item.unit_price,
                pieces: item.pieces,
                photo_src: item.product_variant_detail.photo_src,
                variant_name: item.product_variant_detail.variant_name,
              })
            );

            set({ items: formattedItems });
          }
        } else {
          // Local storage için güncelleme
          set((state) => {
            const newItems = state.items.map((item) =>
              item.id === itemId ? { ...item, pieces: quantity } : item
            );
            return { items: newItems };
          });
        }
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

    fetchUserCart,
  };
});

useCartStore.getState();
