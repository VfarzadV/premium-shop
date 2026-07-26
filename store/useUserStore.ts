import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  phone: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  
  login: (phone: string) => void;
  updateProfile: (data: Partial<UserState>) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      phone: '',
      firstName: '',
      lastName: '',
      displayName: '',
      email: '',
      
      login: (phone) => set({ phone }),
      updateProfile: (data) => set((state) => ({ ...state, ...data })),
      logout: () => set({ phone: '', firstName: '', lastName: '', displayName: '', email: '' }),
    }),
    {
      name: 'user-storage', 
    }
  )
);