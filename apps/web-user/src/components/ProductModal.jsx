import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Thermometer, Clock, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, onClose }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : (product.salePrice || product.price);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
      setIsCartOpen(true);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Visual Product Box */}
          <div className="bg-[#FAF8F3] rounded-2xl p-6 aspect-square flex items-center justify-center border border-[#EBE5D8]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = '/assets/prod-milk.png';
              }}
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-[#356B4B] uppercase tracking-wider">
                {product.category}
              </span>
              <h2 className="text-xl font-extrabold text-[#17324D] mt-0.5">
                {product.name}
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center text-[#F4C95D]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-xs text-slate-700 ml-1">{product.rating}</span>
                </div>
                <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Cold Chain Specs */}
            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-[#2563A6] space-y-1.5">
              <div className="flex items-center space-x-2 font-semibold">
                <Thermometer className="w-4 h-4 shrink-0" />
                <span>Cold Chain: {product.storageTemp}</span>
              </div>
              <div className="flex items-center space-x-2 font-medium text-slate-600">
                <Clock className="w-4 h-4 shrink-0 text-slate-400" />
                <span>Shelf Life: {product.shelfLife}</span>
              </div>
            </div>

            {/* Variant selector */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <span className="block text-xs font-bold text-slate-700 mb-1.5">Select Volume:</span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.size}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedVariant?.size === v.size
                          ? 'bg-[#2563A6] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {v.size} – Rp {Number(v.price).toLocaleString('id-ID')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Actions */}
            <div className="pt-2 flex items-center space-x-3">
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#17324D]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-colors"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 px-5 bg-[#2563A6] hover:bg-[#1C4E86] text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • Rp {Number(currentPrice * quantity).toLocaleString('id-ID')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
