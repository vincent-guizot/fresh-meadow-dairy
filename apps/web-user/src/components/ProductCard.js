'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Check, Star, ThermometerSnowflake, Eye, AlertTriangle } from 'lucide-react';
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

  const isLowStock = product.stock > 0 && product.stock <= 8;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-2xl border border-fmd-cream-300 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative w-full h-52 sm:h-56 bg-gradient-to-b from-fmd-cream-50 to-white flex items-center justify-center p-5 overflow-hidden border-b border-fmd-cream-200">
        {/* Cold Storage Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-cold-200 text-cold-700 text-[10px] font-bold shadow-xs">
          <ThermometerSnowflake className="w-3 h-3 text-cold-500" />
          <span>{product.storageTemp || '2°C - 4°C'}</span>
        </div>

        {/* Low Stock or Feature Badge */}
        {isLowStock ? (
          <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 text-[10px] font-bold flex items-center gap-1 shadow-xs">
            <AlertTriangle className="w-3 h-3 text-red-500" />
            <span>Sisa {product.stock}</span>
          </div>
        ) : product.badge ? (
          <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-fmd-yellow-500 text-fmd-navy-900 text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
            {product.badge}
          </div>
        ) : null}

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
        <div className="absolute inset-0 bg-fmd-navy-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-2xl bg-white text-fmd-navy-700 text-xs font-bold shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-fmd-blue-500" />
            <span>Detail Produk</span>
          </span>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Volume */}
          <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-1">
            <span className="text-fmd-green-600 font-bold uppercase tracking-wider text-[10px]">
              {product.category}
            </span>
            <span>{product.volume}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-base text-fmd-navy-700 line-clamp-1 group-hover:text-fmd-blue-500 transition-colors">
            {product.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
            <div className="flex items-center text-fmd-yellow-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-fmd-navy-700">{product.rating || '4.9'}</span>
            <span className="text-gray-400">({product.reviewsCount || 85} ulasan)</span>
          </div>
        </div>

        {/* Bottom Price & Add Action */}
        <div className="pt-2 border-t border-fmd-cream-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block font-medium">Harga</span>
            <span className="font-bold text-base sm:text-lg text-fmd-navy-700 leading-none">
              {formattedPrice}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold shadow-xs transition-all duration-200 ${
              justAdded
                ? 'bg-fmd-green-500 text-white'
                : product.stock <= 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-fmd-blue-50 hover:bg-fmd-blue-500 text-fmd-blue-500 hover:text-white border border-fmd-blue-200 hover:border-fmd-blue-500'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </>
            ) : product.stock <= 0 ? (
              <span>Habis</span>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Beli</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
