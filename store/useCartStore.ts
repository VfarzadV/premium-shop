import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/components/ProductCard";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === product.id,
        );
        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },
      increaseQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        });
      },
      decreaseQuantity: (productId) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === productId);
        if (existingItem?.quantity === 1) {
          get().removeFromCart(productId);
        } else {
          set({
            items: currentItems.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            ),
          });
        }
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const fakeExchangeRate = 200000;
          const tomanPrice = item.price * fakeExchangeRate;
          return total + tomanPrice * item.quantity;
        }, 0);
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
