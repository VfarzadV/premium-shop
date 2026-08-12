import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  phone: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  isAdmin: boolean;
  login: (phone: string) => void;
  updateProfile: (data: Partial<UserState>) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      phone: "",
      firstName: "",
      lastName: "",
      displayName: "",
      email: "",
      isAdmin: false,

      login: (phone) => {
        const isUserAdmin = phone === "09999999999";
        set({
          phone,
          isAdmin: isUserAdmin,
        });
      },
      updateProfile: (data) => set((state) => ({ ...state, ...data })),
      logout: () =>
        set({
          phone: "",
          firstName: "",
          lastName: "",
          displayName: "",
          email: "",
          isAdmin: false,
        }),
    }),
    {
      name: "user-storage",
    },
  ),
);
