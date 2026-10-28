'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@base-ui-components/react/dialog';
import { Tabs } from '@base-ui-components/react/tabs';
import { X, Plus, Minus, Check, Star, ThermometerSnowflake, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function ProductModal() {
  const { selectedProduct, closeProductModal, addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addItem(selectedProduct, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeProductModal();
      setQuantity(1);
    }, 900);
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(selectedProduct.price * quantity);

  return (
    <Dialog.Root open={Boolean(selectedProduct)} onOpenChange={(open) => !open && closeProductModal()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-brand-950/60 backdrop-blur-sm z-50 transition-opacity animate-in fade-in" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <Dialog.Popup className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-cream-200 overflow-hidden my-8">
            {/* Close Button */}
            <Dialog.Close
              onClick={closeProductModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-cream-100 text-gray-500 hover:text-brand-900 flex items-center justify-center transition-colors border border-cream-200 shadow-sm"
            >
              <X className="w-5 h-5" />
            </Dialog.Close>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Product Visual Column */}
              <div className="md:col-span-5 bg-gradient-to-br from-cream-100 via-cream-50 to-brand-50/40 p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-cream-200">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                  <Image
                    src={selectedProduct.image || '/assets/prod-milk.png'}
                    alt={selectedProduct.name}
                    width={220}
                    height={220}
                    className="object-contain drop-shadow-xl"
                  />
                </div>

                {/* Cold Chain Pill */}
                <div className="mt-4 px-3 py-1.5 rounded-full bg-white border border-cold-200 text-cold-700 text-xs font-bold shadow-xs flex items-center gap-1.5">
                  <ThermometerSnowflake className="w-3.5 h-3.5 text-cold-500" />
                  <span>Target Temp: {selectedProduct.storageTemp || '2°C - 4°C'}</span>
                </div>
              </div>

              {/* Product Details Column */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
                    <span>{selectedProduct.category}</span>
                    <span>•</span>
                    <span>{selectedProduct.volume}</span>
                  </div>

                  <Dialog.Title className="font-serif font-bold text-2xl text-brand-900 leading-snug">
                    {selectedProduct.name}
                  </Dialog.Title>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center text-butter-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-700">
                      {selectedProduct.rating || '4.9'}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({selectedProduct.reviewsCount || 110} verified reviews)
                    </span>
                  </div>

                  {/* Base UI Tabs for Specs */}
                  <div className="mt-5">
                    <Tabs.Root defaultValue="story" className="w-full">
                      <Tabs.List className="flex border-b border-cream-200 text-xs font-bold gap-4">
                        <Tabs.Tab
                          value="story"
                          className="pb-2 text-gray-500 data-[selected]:text-brand-700 data-[selected]:border-b-2 data-[selected]:border-brand-700 transition-colors"
                        >
                          Story & Origin
                        </Tabs.Tab>
                        <Tabs.Tab
                          value="nutrition"
                          className="pb-2 text-gray-500 data-[selected]:text-brand-700 data-[selected]:border-b-2 data-[selected]:border-brand-700 transition-colors"
                        >
                          Nutrition
                        </Tabs.Tab>
                        <Tabs.Tab
                          value="coldchain"
                          className="pb-2 text-gray-500 data-[selected]:text-brand-700 data-[selected]:border-b-2 data-[selected]:border-brand-700 transition-colors"
                        >
                          Cold Specs
                        </Tabs.Tab>
                      </Tabs.List>

                      <Tabs.Panel value="story" className="pt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        <p>{selectedProduct.description}</p>
                        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-brand-800">
                          <MapPin className="w-3.5 h-3.5 text-brand-600" />
                          <span>Origin: {selectedProduct.origin || 'Fresh Meadow Pastures'}</span>
                        </div>
                      </Tabs.Panel>

                      <Tabs.Panel value="nutrition" className="pt-3">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-cream-50 p-2.5 rounded-xl border border-cream-200">
                            <span className="text-gray-400 block">Energy / Calories</span>
                            <span className="font-bold text-brand-900">
                              {selectedProduct.nutrition?.calories || '150 kcal'}
                            </span>
                          </div>
                          <div className="bg-cream-50 p-2.5 rounded-xl border border-cream-200">
                            <span className="text-gray-400 block">Protein Content</span>
                            <span className="font-bold text-brand-900">
                              {selectedProduct.nutrition?.protein || '8g'}
                            </span>
                          </div>
                          <div className="bg-cream-50 p-2.5 rounded-xl border border-cream-200">
                            <span className="text-gray-400 block">Natural Butterfat</span>
                            <span className="font-bold text-brand-900">
                              {selectedProduct.nutrition?.fat || '8g'}
                            </span>
                          </div>
                          <div className="bg-cream-50 p-2.5 rounded-xl border border-cream-200">
                            <span className="text-gray-400 block">Calcium</span>
                            <span className="font-bold text-brand-900">
                              {selectedProduct.nutrition?.calcium || '300mg'}
                            </span>
                          </div>
                        </div>
                      </Tabs.Panel>

                      <Tabs.Panel value="coldchain" className="pt-3 space-y-2 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <ThermometerSnowflake className="w-4 h-4 text-cold-600" />
                          <span>Strict chill storage: <strong>{selectedProduct.storageTemp || '2°C - 4°C'}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-butter-600" />
                          <span>Shelf Life: <strong>{selectedProduct.shelfLife || '7 Days'}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-brand-600" />
                          <span>Packed in sealed insulated vacuum pouch with gel ice.</span>
                        </div>
                      </Tabs.Panel>
                    </Tabs.Root>
                  </div>
                </div>

                {/* Bottom Action Section */}
                <div className="pt-4 border-t border-cream-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 font-medium">Calculated Price</span>
                      <div className="font-serif font-bold text-2xl text-brand-900">{formattedPrice}</div>
                    </div>

                    {/* Quantity Picker */}
                    <div className="flex items-center bg-cream-100 rounded-xl border border-cream-300 p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-900 hover:bg-cream-200 shadow-xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-bold text-sm text-brand-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-900 hover:bg-cream-200 shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
                      added
                        ? 'bg-brand-600 text-white'
                        : 'bg-brand-700 hover:bg-brand-800 text-white shadow-brand-700/20'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Fresh Basket!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add {quantity} to Basket • {formattedPrice}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
