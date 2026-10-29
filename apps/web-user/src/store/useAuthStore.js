import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAuthModalOpen: false,
      authMode: 'login', // 'login' | 'register'
      isOrderHistoryModalOpen: false,
      orders: [],

      // Modal Triggers
      openAuthModal: (mode = 'login') =>
        set({ isAuthModalOpen: true, authMode: mode }),
      closeAuthModal: () => set({ isAuthModalOpen: false }),
      setAuthMode: (mode) => set({ authMode: mode }),

      openOrderHistoryModal: () => set({ isOrderHistoryModalOpen: true }),
      closeOrderHistoryModal: () => set({ isOrderHistoryModalOpen: false }),

      // Auth Actions
      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isAuthModalOpen: false,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      // Order Management
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),

      updateUserProfile: (profileData) =>
        set((state) => ({
          user: { ...state.user, ...profileData },
        })),
    }),
    {
      name: 'fresh-meadow-customer-auth',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : null)),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        orders: state.orders,
      }),
    }
  )
);
