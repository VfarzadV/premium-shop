import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/components/ProductCard";

interface CompareState {
  compareItems: Product[];
  addToCompare: (product: Product) => { success: boolean; message: string };
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareItems: [],
      addToCompare: (product) => {
        const { compareItems } = get();
        if (compareItems.some((item) => item.id === product.id)) {
          return {
            success: false,
            message: "این محصول از قبل در لیست مقایسه شما قرار دارد.",
          };
        }
        if (compareItems.length >= 3) {
          return {
            success: false,
            message:
              "لیست مقایسه پر است! حداکثر ۳ محصول را می‌توانید مقایسه کنید.",
          };
        }
        set({ compareItems: [...compareItems, product] });
        return {
          success: true,
          message: "محصول با موفقیت به لیست مقایسه اضافه شد.",
        };
      },
      removeFromCompare: (productId) =>
        set((state) => ({
          compareItems: state.compareItems.filter(
            (item) => item.id !== productId,
          ),
        })),
      clearCompare: () => set({ compareItems: [] }),
    }),
    {
      name: "compare-storage",
    },
  ),
);
