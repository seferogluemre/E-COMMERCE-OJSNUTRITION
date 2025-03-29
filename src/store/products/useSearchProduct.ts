import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "../../services/api/collections/Auth";
import { SearchState } from "../../types/ProductTypes";


export const useSearchProduct = create<SearchState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  searchProducts: async (query: string) => {
    try {
      const response = await axios.get(
        BASE_URL + `/products/?limit=1000&search=${query}`
      );
      set({ products: response.data.data.results });
    } catch (err) {
      console.log("Hata tespit edildi ürün ararken" + (err as Error).message);
    }
  },
}));
