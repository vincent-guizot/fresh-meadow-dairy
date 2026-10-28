'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ThermometerSnowflake, ShieldCheck, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    openCheckout,
    removeItem,
    updateQuantity,
    clearCart,
    isColdPackingSelected,
    toggleColdPacking,
    deliverySlot,
    setDeliverySlot,
    getSubtotal,
    getColdPackingFee,
    getDeliveryFee,
    getGrandTotal,
    getTotalItems,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const coldFee = getColdPackingFee();
  const deliveryFee = getDeliveryFee();
  const grandTotal = getGrandTotal();
  const totalCount = getTotalItems();

  const formatIDR = (val) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-brand-950/50 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-cream-200"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 bg-cream-100 border-b border-cream-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-700 text-white flex items-center justify-center shadow-xs">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-brand-900 leading-tight">
                      My Fresh Basket
                    </h2>
                    <p className="text-xs text-gray-500 font-medium">
                      {totalCount} {totalCount === 1 ? 'item' : 'items'} ready for morning dispatch
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-cream-200 text-gray-500 flex items-center justify-center transition-colors border border-cream-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-cream-100">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center text-brand-600">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-brand-900">
                        Your basket is empty
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 max-w-xs">
                        Add fresh pasteurized milk, cultured butter, or artisan cheeses to start your farm order.
                      </p>
                    </div>
                    <button
                      onClick={closeCart}
                      className="px-6 py-2.5 rounded-full bg-brand-700 text-white text-xs font-bold hover:bg-brand-800 transition-colors shadow-sm"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      className="pt-4 first:pt-0 flex items-center gap-3"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 rounded-xl bg-cream-50 border border-cream-200 flex items-center justify-center p-2 shrink-0">
                        <Image
                          src={item.image || '/assets/prod-milk.png'}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-brand-900 truncate">
                          {item.name}
                        </h4>
                        <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                          <span>{item.volume}</span>
                          <span>•</span>
                          <span className="font-bold text-brand-700">
                            {formatIDR(item.price)}
                          </span>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center bg-cream-100 rounded-lg border border-cream-300 p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded bg-white flex items-center justify-center text-gray-700 hover:bg-cream-200"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-brand-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded bg-white flex items-center justify-center text-gray-700 hover:bg-cream-200"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal per Item */}
                      <div className="text-right">
                        <span className="font-bold text-sm text-brand-900">
                          {formatIDR(item.price * item.quantity)}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Footer: Upsell & Order Checkout */}
              {items.length > 0 && (
                <div className="p-6 bg-cream-50 border-t border-cream-200 space-y-4">
                  {/* Cold Chain Packaging Box Toggle */}
                  <div
                    onClick={toggleColdPacking}
                    className="p-3 bg-white rounded-2xl border border-cold-200 flex items-center justify-between cursor-pointer hover:border-cold-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-cold-100 text-cold-700 flex items-center justify-center">
                        <ThermometerSnowflake className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-brand-900">
                            Insulated Foil & Gel Ice Pack
                          </span>
                          {subtotal >= 150000 && (
                            <span className="text-[10px] bg-brand-100 text-brand-800 font-bold px-1.5 py-0.2 rounded">
                              FREE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500">
                          Maintains strict 2°C - 4°C up to 6 hours
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-cold-700">
                        {coldFee === 0 ? 'Rp 0' : formatIDR(coldFee)}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Slot Option */}
                  <div className="bg-white p-3 rounded-2xl border border-cream-200 space-y-2">
                    <span className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-butter-500" />
                      <span>Preferred Delivery Window</span>
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => setDeliverySlot('morning')}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          deliverySlot === 'morning'
                            ? 'bg-brand-50 border-brand-700 text-brand-800 font-bold shadow-xs'
                            : 'bg-white border-cream-200 text-gray-600 hover:bg-cream-100'
                        }`}
                      >
                        <span className="block font-bold">Morning Drop</span>
                        <span className="text-[10px] text-gray-500">06:00 - 08:00 AM</span>
                      </button>
                      <button
                        onClick={() => setDeliverySlot('afternoon')}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          deliverySlot === 'afternoon'
                            ? 'bg-brand-50 border-brand-700 text-brand-800 font-bold shadow-xs'
                            : 'bg-white border-cream-200 text-gray-600 hover:bg-cream-100'
                        }`}
                      >
                        <span className="block font-bold">Afternoon</span>
                        <span className="text-[10px] text-gray-500">03:00 - 05:00 PM</span>
                      </button>
                    </div>
                  </div>

                  {/* Bill Breakdown */}
                  <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-brand-900">{formatIDR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cold Chain Packaging</span>
                      <span className="font-semibold text-brand-900">
                        {coldFee === 0 ? 'FREE' : formatIDR(coldFee)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Farm Delivery</span>
                      <span className="font-semibold text-brand-900">
                        {deliveryFee === 0 ? 'FREE' : formatIDR(deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-cream-300 text-sm font-bold text-brand-900">
                      <span>Total</span>
                      <span className="text-base text-brand-700">{formatIDR(grandTotal)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={openCheckout}
                    className="w-full py-3.5 rounded-2xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm shadow-lg shadow-brand-700/25 flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Proceed to Delivery & Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
