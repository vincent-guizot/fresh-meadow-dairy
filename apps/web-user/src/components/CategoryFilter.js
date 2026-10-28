'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/products';
import { useCartStore } from '../store/useCartStore';

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useCartStore();

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2.5 min-w-max">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 border ${
                isActive
                  ? 'bg-brand-700 text-white border-brand-700 shadow-md shadow-brand-700/20'
                  : 'bg-white hover:bg-cream-200 text-brand-900 border-cream-300'
              }`}
            >
              <span className="text-sm">{cat.icon}</span>
              <span>{cat.name}</span>

              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-full border-2 border-brand-900/10 pointer-events-none"
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
