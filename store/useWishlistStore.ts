import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/components/ProductCard';

interface WishlistState {
    items: Product[];
    toggleWishlist: (product: Product) => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            toggleWishlist: (product) => {
                const currentItems = get().items;
                const exists = currentItems.some((item) => item.id === product.id);
                
                if (exists) {
                    set({ items: currentItems.filter((item) => item.id !== product.id) });
                } else {
                    set({ items: [product, ...currentItems] });
                }
            },
        }),
        { name: 'premium-shop-wishlist' }
    )
);