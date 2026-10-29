'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';

export const CATEGORIES = [
  { id: 'all', name: 'Semua Produk', icon: '🥛' },
  { id: 'Milk', name: 'Susu Segar (Milk)', icon: '🥛' },
  { id: 'Yogurt', name: 'Greek Yogurt', icon: '🥣' },
  { id: 'Butter', name: 'Mentega (Butter)', icon: '🧈' },
  { id: 'Cheese', name: 'Keju (Cheese)', icon: '🧀' },
  { id: 'Cream', name: 'Krim Kental (Cream)', icon: '🍶' },
  { id: 'Desserts', name: 'Olahan Susu', icon: '🍨' },
];

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useCartStore();

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 min-w-max">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-fmd-blue-500 text-white border-fmd-blue-500 shadow-md shadow-fmd-blue-500/20'
                  : 'bg-white hover:bg-fmd-cream-200 text-fmd-navy-700 border-fmd-cream-300'
              }`}
            >
              <span className="text-sm">{cat.icon}</span>
              <span>{cat.name}</span>

              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-2xl border-2 border-white/20 pointer-events-none"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
