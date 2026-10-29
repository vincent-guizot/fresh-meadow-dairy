'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, AlertCircle, Search, X } from 'lucide-react';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import { useProducts } from '../hooks/useProducts';

export default function ProductGrid() {
  const {
    filteredProducts,
    loading,
    sortBy,
    setSortBy,
    searchQuery,
    clearSearch,
  } = useProducts();

  return (
    <section id="dairy-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header & Filter Bar */}
      <div className="space-y-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-fmd-green-600 text-xs font-bold uppercase tracking-wider mb-1">
              <span>Hasil Panen Segar</span>
              <span>•</span>
              <span>Diperah & Dibotolkan Dingin</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-fmd-navy-700 tracking-tight">
              Katalog Produk Susu & Olahan
            </h2>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 hidden sm:inline">Urutkan:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white text-xs sm:text-sm font-bold text-fmd-navy-700 border border-fmd-cream-300 rounded-2xl px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-fmd-blue-500/30 cursor-pointer shadow-xs"
              >
                <option value="featured">✨ Pilihan Utama</option>
                <option value="price-low">💰 Harga: Terendah ke Tertinggi</option>
                <option value="price-high">💎 Harga: Tertinggi ke Terendah</option>
                <option value="rating">⭐ Rating Tertinggi</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <CategoryFilter />

        {/* Active Search Filter Banner */}
        {searchQuery && (
          <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 bg-fmd-blue-500/10 border border-fmd-blue-500/20 rounded-2xl">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-fmd-navy-700 font-medium">
              <Search className="w-4 h-4 text-fmd-blue-500 shrink-0" />
              <span>
                Menampilkan hasil pencarian untuk <strong className="text-fmd-blue-600 font-bold">&quot;{searchQuery}&quot;</strong> ({filteredProducts.length} produk ditemukan)
              </span>
            </div>
            <button
              onClick={clearSearch}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-fmd-navy-700 hover:text-red-600 bg-white hover:bg-red-50 border border-fmd-cream-300 rounded-xl transition shadow-2xs"
            >
              <X className="w-3.5 h-3.5" />
              <span>Hapus Pencarian</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid Content */}
      {loading ? (
        /* Skeleton Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-fmd-cream-300 p-4 space-y-4 animate-pulse shadow-xs"
            >
              <div className="w-full h-48 bg-fmd-cream-200/80 rounded-xl" />
              <div className="h-4 bg-fmd-cream-200/80 rounded w-1/3" />
              <div className="h-5 bg-fmd-cream-200/80 rounded w-3/4" />
              <div className="h-8 bg-fmd-cream-200/80 rounded-2xl w-full" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-fmd-cream-300 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-fmd-cream-200 flex items-center justify-center mx-auto text-fmd-blue-500">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-xl text-fmd-navy-700">Produk Tidak Ditemukan</h3>
          <p className="text-xs text-gray-500">
            {searchQuery
              ? `Tidak ada produk yang cocok dengan kata kunci "${searchQuery}".`
              : 'Tidak ada produk pada kategori ini saat ini.'}
          </p>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-fmd-blue-500 hover:bg-fmd-blue-600 rounded-xl transition shadow-xs"
            >
              Lihat Semua Produk
            </button>
          )}
        </div>
      )}
    </section>
  );
}
