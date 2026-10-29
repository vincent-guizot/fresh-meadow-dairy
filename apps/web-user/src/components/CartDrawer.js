'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ThermometerSnowflake,
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useCart, useCustomerAuth, useMounted } from '../hooks';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    proceedToCheckout,
    removeItem,
    updateQuantity,
    isColdPackingSelected,
    toggleColdPacking,
    deliverySlot,
    setDeliverySlot,
    subtotal,
    coldPackingFee: coldFee,
    deliveryFee,
    grandTotal,
    totalItems: totalCount,
  } = useCart();

  const { isAuthenticated } = useCustomerAuth();
  const mounted = useMounted();

  if (!mounted) return null;

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
            className="absolute inset-0 bg-fmd-navy-900/50 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-modal flex flex-col border-l border-fmd-cream-300"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 bg-fmd-cream-100 border-b border-fmd-cream-300 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-fmd-blue-500 text-white flex items-center justify-center shadow-xs">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-fmd-navy-700 leading-tight">
                      Keranjang Segar Anda
                    </h2>
                    <p className="text-xs text-gray-500 font-medium">
                      {totalCount} {totalCount === 1 ? 'produk' : 'produk'} siap dikirim dingin
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-fmd-cream-200 text-gray-500 flex items-center justify-center transition-colors border border-fmd-cream-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-fmd-cream-200">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-fmd-cream-200 flex items-center justify-center text-fmd-blue-500">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-fmd-navy-700">
                        Keranjang Anda masih kosong
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 max-w-xs">
                        Pilih susu segar pasteurisasi, yogurt kental, atau mentega artisanal untuk memulai pesanan.
                      </p>
                    </div>
                    <button
                      onClick={closeCart}
                      className="px-6 py-2.5 rounded-2xl bg-fmd-blue-500 text-white text-xs font-bold hover:bg-fmd-blue-600 transition-colors shadow-xs"
                    >
                      Mulai Belanja Susu
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
                      <div className="w-16 h-16 rounded-2xl bg-fmd-cream-50 border border-fmd-cream-300 flex items-center justify-center p-2 shrink-0">
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
                        <h4 className="font-serif font-bold text-sm text-fmd-navy-700 truncate">
                          {item.name}
                        </h4>
                        <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                          <span>{item.volume}</span>
                          <span>•</span>
                          <span className="font-bold text-fmd-blue-600">
                            {formatIDR(item.price)}
                          </span>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center bg-fmd-cream-100 rounded-xl border border-fmd-cream-300 p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-fmd-cream-200"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-fmd-navy-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-fmd-cream-200"
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
                        <span className="font-bold text-sm text-fmd-navy-700">
                          {formatIDR(item.price * item.quantity)}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Footer: Options & Checkout */}
              {items.length > 0 && (
                <div className="p-6 bg-fmd-cream-50 border-t border-fmd-cream-300 space-y-3.5">
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
                          <span className="text-xs font-bold text-fmd-navy-700">
                            Box Insulasi Thermal & Ice Gel
                          </span>
                          {subtotal >= 150000 && (
                            <span className="text-[10px] bg-fmd-green-100 text-fmd-green-700 font-bold px-1.5 py-0.2 rounded">
                              GRATIS
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500">
                          Menjaga suhu 2°C - 4°C stabil hingga 6 jam
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
                  <div className="bg-white p-3 rounded-2xl border border-fmd-cream-300 space-y-2">
                    <span className="text-xs font-bold text-fmd-navy-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-fmd-yellow-500" />
                      <span>Slot Jadwal Pengantaran</span>
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => setDeliverySlot('morning')}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          deliverySlot === 'morning'
                            ? 'bg-fmd-blue-50 border-fmd-blue-500 text-fmd-blue-600 font-bold shadow-xs'
                            : 'bg-white border-fmd-cream-300 text-gray-600 hover:bg-fmd-cream-100'
                        }`}
                      >
                        <span className="block font-bold">Panen Pagi (Rekomendasi)</span>
                        <span className="text-[10px] text-gray-500">06:00 - 08:00 AM</span>
                      </button>
                      <button
                        onClick={() => setDeliverySlot('afternoon')}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          deliverySlot === 'afternoon'
                            ? 'bg-fmd-blue-50 border-fmd-blue-500 text-fmd-blue-600 font-bold shadow-xs'
                            : 'bg-white border-fmd-cream-300 text-gray-600 hover:bg-fmd-cream-100'
                        }`}
                      >
                        <span className="block font-bold">Pengantaran Sore</span>
                        <span className="text-[10px] text-gray-500">03:00 - 05:00 PM</span>
                      </button>
                    </div>
                  </div>

                  {/* Bill Breakdown */}
                  <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                    <div className="flex justify-between">
                      <span>Subtotal Produk</span>
                      <span className="font-semibold text-fmd-navy-700">{formatIDR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kemasan Insulasi Dingin</span>
                      <span className="font-semibold text-fmd-navy-700">
                        {coldFee === 0 ? 'GRATIS' : formatIDR(coldFee)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ongkos Kirim Peternakan</span>
                      <span className="font-semibold text-fmd-navy-700">
                        {deliveryFee === 0 ? 'GRATIS' : formatIDR(deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-fmd-cream-300 text-sm font-bold text-fmd-navy-700">
                      <span>Total Pembayaran</span>
                      <span className="text-base text-fmd-blue-500 font-serif font-bold">{formatIDR(grandTotal)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={proceedToCheckout}
                    className="w-full py-3.5 rounded-2xl bg-fmd-blue-500 hover:bg-fmd-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-fmd-blue-500/20 flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>{isAuthenticated ? 'Lanjut ke Pengiriman & Checkout' : 'Masuk untuk Checkout'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
