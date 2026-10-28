import React, { useState } from 'react';
import { Plus, Star, Check, Snowflake } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const currentPrice = selectedVariant ? selectedVariant.price : (product.salePrice || product.price);
  const formattedPrice = `Rp ${Number(currentPrice).toLocaleString('id-ID')}`;

  return (
    <div
      onClick={() => onQuickView(product)}
      className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* Image & Badge Container */}
        <div className="relative rounded-2xl bg-[#FAF8F3] overflow-hidden aspect-square mb-4 flex items-center justify-center p-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = '/assets/prod-milk.png';
            }}
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FAF7EF] text-[#356B4B] border border-[#CDE8D8] shadow-xs">
              {product.badge}
            </span>
          )}

          {/* Cold storage pill */}
          <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[9px] font-bold bg-white/90 text-[#2563A6] border border-blue-100 flex items-center space-x-1 shadow-2xs">
            <Snowflake className="w-2.5 h-2.5" />
            <span>2–6°C</span>
          </span>
        </div>

        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#356B4B]">
            {product.category}
          </span>
          <div className="flex items-center space-x-1 text-slate-500">
            <Star className="w-3.5 h-3.5 fill-[#F4C95D] text-[#F4C95D]" />
            <span className="font-bold text-[11px] text-slate-700">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-extrabold text-[#17324D] line-clamp-1 group-hover:text-[#2563A6] transition-colors">
          {product.name}
        </h3>

        {/* Description snippet */}
        <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-normal leading-relaxed">
          {product.description}
        </p>

        {/* Variant Selector */}
        {product.variants && product.variants.length > 1 && (
          <div className="flex items-center space-x-1.5 mt-3" onClick={(e) => e.stopPropagation()}>
            {product.variants.map((v) => (
              <button
                key={v.size}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all ${
                  selectedVariant?.size === v.size
                    ? 'bg-[#2563A6] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer Price & Add button */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-base font-black text-[#17324D]">
            {formattedPrice}
          </span>
          {product.salePrice > 0 && (
            <span className="block text-[10px] text-slate-400 line-through">
              Rp {Number(product.price).toLocaleString('id-ID')}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`p-2.5 rounded-xl text-white font-bold transition-all cursor-pointer flex items-center space-x-1 active:scale-95 shadow-sm ${
            isAdded ? 'bg-[#356B4B]' : 'bg-[#2563A6] hover:bg-[#1C4E86]'
          }`}
          aria-label="Add to cart"
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-[11px] font-bold">Added</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span className="text-[11px] font-bold">Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
