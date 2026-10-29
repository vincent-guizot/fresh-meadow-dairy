'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const CartDrawer = dynamic(() => import('./CartDrawer'), { ssr: false });
const ProductModal = dynamic(() => import('./ProductModal'), { ssr: false });
const CheckoutModal = dynamic(() => import('./CheckoutModal'), { ssr: false });
const AuthModal = dynamic(() => import('./AuthModal'), { ssr: false });
const OrderHistoryModal = dynamic(() => import('./OrderHistoryModal'), { ssr: false });

export default function GlobalModals() {
  return (
    <>
      <CartDrawer />
      <ProductModal />
      <CheckoutModal />
      <AuthModal />
      <OrderHistoryModal />
    </>
  );
}
