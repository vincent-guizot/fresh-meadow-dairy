import React from 'react';
import { dairyCategories } from '../data/products';

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
      {dairyCategories.map((cat) => {
        const isSelected = selectedCategory === cat.id || (cat.id === 'all' && selectedCategory === 'All');
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id === 'all' ? 'All' : cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              isSelected
                ? 'bg-[#2563A6] text-white shadow-md shadow-blue-600/20'
                : 'bg-white hover:bg-[#FAF8F3] text-[#17324D] border border-slate-200'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
