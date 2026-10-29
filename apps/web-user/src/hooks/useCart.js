'use client';

import { useCartStore } from '../store/useCartStore';

/**
 * Custom hook providing access to cart state, calculations, and actions
 */
export function useCart() {
  const {
    items,
    isOpen,
    isCheckoutOpen,
    isColdPackingSelected,
    deliverySlot,
    selectedProduct,
    isProductModalOpen,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
    handleProceedToCheckout,
    openProductModal,
    closeProductModal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleColdPacking,
    setDeliverySlot,
    getTotalItems,
    getSubtotal,
    getColdPackingFee,
    getDeliveryFee,
    getGrandTotal,
  } = useCartStore();

  return {
    items,
    isOpen,
    isCartOpen: isOpen,
    totalItems: getTotalItems(),
    subtotal: getSubtotal(),
    coldPackingFee: getColdPackingFee(),
    deliveryFee: getDeliveryFee(),
    grandTotal: getGrandTotal(),
    isCheckoutOpen,
    isColdPackingSelected,
    deliverySlot,
    selectedProduct,
    isProductModalOpen,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
    proceedToCheckout: handleProceedToCheckout,
    openProductModal,
    closeProductModal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleColdPacking,
    setDeliverySlot,
  };
}

export default useCart;
