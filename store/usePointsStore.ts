import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PointsState {
  points: number;
  addPoints: (amount: number) => void;
  redeemPoints: (pointsToRedeem: number) => {
    success: boolean;
    discountCode?: string;
    message: string;
  }; 
}

export const usePointsStore = create<PointsState>()(
  persist(
    (set, get) => ({
      points: 0,
      addPoints: (amount) =>
        set((state) => ({
          points: state.points + amount,
        })),
      redeemPoints: (pointsToRedeem) => {
        const currentPoints = get().points;
        if (currentPoints >= pointsToRedeem) {
          set({ points: currentPoints - pointsToRedeem });
          const randomCode = `PRM-${Math.floor(1000 + Math.random() * 9000)}`;

          return {
            success: true,
            discountCode: randomCode,
            message: `تبریک! ${pointsToRedeem} امتیاز شما با موفقیت به کد تخفیف تبدیل شد.`,
          };
        }

        return {
          success: false,
          message: "امتیاز شما برای دریافت این کد تخفیف کافی نیست!",
        };
      },
    }),
    {
      name: "premium-club-storage", 
    },
  ),
);
