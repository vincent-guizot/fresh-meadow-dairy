'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Check, Star, ThermometerSnowflake, Eye } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function ProductCard({ product }) {
  const { addItem, setSelectedProduct } = useCartStore();
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-900/10 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative w-full h-52 sm:h-56 bg-gradient-to-b from-cream-100 to-cream-50/50 flex items-center justify-center p-6 overflow-hidden">
        {/* Cold Storage Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-cold-200 text-cold-700 text-[11px] font-bold shadow-xs">
          <ThermometerSnowflake className="w-3 h-3 text-cold-500" />
          <span>{product.storageTemp || '2°C - 4°C'}</span>
        </div>

        {/* Feature Badge */}
        {product.badge && (
          <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-butter-500 text-brand-950 text-[10px] font-bold uppercase tracking-wider shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Product Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={product.image || '/assets/prod-milk.png'}
            alt={product.name}
            width={180}
            height={180}
            className="object-contain max-h-44 group-hover:scale-108 transition-transform duration-300 drop-shadow-md"
          />
        </div>

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-brand-900/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1.5 rounded-full bg-white text-brand-900 text-xs font-bold shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Volume */}
          <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-1">
            <span className="text-brand-600 font-semibold uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <span>{product.volume}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-base sm:text-lg text-brand-900 line-clamp-1 group-hover:text-brand-700 transition-colors">
            {product.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
            <div className="flex items-center text-butter-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-gray-700">{product.rating || '4.9'}</span>
            <span className="text-gray-400">({product.reviewsCount || 85})</span>
          </div>
        </div>

        {/* Bottom Price & Add Action */}
        <div className="pt-2 border-t border-cream-200/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block font-medium">Price</span>
            <span className="font-bold text-lg text-brand-900 leading-none">{formattedPrice}</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all duration-200 ${
              justAdded
                ? 'bg-brand-600 text-white'
                : product.stock <= 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-brand-50 hover:bg-brand-700 text-brand-700 hover:text-white border border-brand-200 hover:border-brand-700'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : product.stock <= 0 ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
