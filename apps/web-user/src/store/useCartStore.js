import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useAuthStore } from './useAuthStore';

const fallbackStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isCheckoutOpen: false,
      selectedProduct: null, // For product quick-view modal
      isColdPackingSelected: true,
      deliverySlot: 'morning', // 'morning' (06:00 - 08:00 AM) | 'afternoon' (03:00 - 05:00 PM)
      searchQuery: '',
      selectedCategory: 'all',
      sortBy: 'featured',

      // Drawer & Modal triggers
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      // Proceed to Checkout with Auth Guard
      handleProceedToCheckout: () => {
        const isAuth = useAuthStore.getState().isAuthenticated;
        if (!isAuth) {
          // Close cart and prompt Login/Register modal first
          set({ isOpen: false });
          useAuthStore.getState().openAuthModal('login');
        } else {
          set({ isCheckoutOpen: true, isOpen: false });
        }
      },

      openCheckout: () => set({ isCheckoutOpen: true, isOpen: false }),
      closeCheckout: () => set({ isCheckoutOpen: false }),

      setSelectedProduct: (product) => set({ selectedProduct: product }),
      closeProductModal: () => set({ selectedProduct: null }),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSortBy: (sort) => set({ sortBy: sort }),

      // Cart Actions
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === product.id);
          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + quantity,
            };
            return { items: updatedItems, isOpen: true };
          }
          return {
            items: [...state.items, { ...product, quantity }],
            isOpen: true,
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId, delta) => {
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.id === productId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean);
          return { items: updatedItems };
        });
      },

      clearCart: () => set({ items: [] }),

      toggleColdPacking: () =>
        set((state) => ({ isColdPackingSelected: !state.isColdPackingSelected })),

      setDeliverySlot: (slot) => set({ deliverySlot: slot }),

      // Computed Helpers
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getColdPackingFee: () => {
        const { isColdPackingSelected, getSubtotal } = get();
        if (!isColdPackingSelected) return 0;
        const subtotal = getSubtotal();
        // Free cold pack packaging for orders >= Rp 150.000
        return subtotal >= 150000 ? 0 : 12000;
      },

      getDeliveryFee: () => {
        const { getSubtotal } = get();
        const subtotal = getSubtotal();
        if (subtotal === 0) return 0;
        // Free delivery for orders >= Rp 200.000
        return subtotal >= 200000 ? 0 : 15000;
      },

      getGrandTotal: () => {
        const { getSubtotal, getColdPackingFee, getDeliveryFee } = get();
        return getSubtotal() + getColdPackingFee() + getDeliveryFee();
      },
    }),
    {
      name: 'fresh-meadow-cart-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : fallbackStorage
      ),
      partialize: (state) => ({
        items: state.items,
        isColdPackingSelected: state.isColdPackingSelected,
        deliverySlot: state.deliverySlot,
      }),
    }
  )
);
