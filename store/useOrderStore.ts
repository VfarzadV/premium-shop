import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./useCartStore";

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalPrice: number;
  status: string;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  removeOrder: (id: string) => void;
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            orders: [],
            addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
            removeOrder: (id) => set((state) => ({ 
                orders: state.orders.filter(order => order.id !== id) 
            })),
        }),
        { name: 'premium-shop-orders' }
    )
);