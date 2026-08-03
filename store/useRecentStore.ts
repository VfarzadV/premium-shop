import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/components/ProductCard';

interface RecentState {
    recentItems: Product[];
    addRecent: (product: Product) => void;
    clearRecent: () => void;
}

export const useRecentStore = create<RecentState>()(
    persist(
        (set) => ({
            recentItems: [],
            addRecent: (product) => set((state) => {
                const filteredItems = state.recentItems.filter((item) => item.id !== product.id);
                filteredItems.unshift(product);
                return { recentItems: filteredItems.slice(0, 12) };
            }),
            clearRecent: () => set({ recentItems: [] }),
        }),
        {
            name: 'recent-storage',
        }
    )
);