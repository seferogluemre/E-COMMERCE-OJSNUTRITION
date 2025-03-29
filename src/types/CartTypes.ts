export interface CartProps {
    show: boolean;
    handleCloseTwo: () => void;
}

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
    clearCart: () => void;
}