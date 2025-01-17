import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "../../services/api/products";

interface SearchState {
    products: [];
    searchProducts: (query: string) => Promise<void>;
}

export const useSearchProduct = create<SearchState>(
        (set) => ({
            products: [],
            searchProducts: async (query: string) => {
                try {
                    const response = await axios.get(BASE_URL+`/products/?limit=1000&search=${query}`);
                    set({ products: response.data.data.results});
                } catch (error) {
                }
            },
        }),
    
);