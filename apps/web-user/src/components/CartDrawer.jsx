import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    grandTotal,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563A6] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#17324D]">Your Fresh Basket</h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  {cartItems.length} unique dairy product{cartItems.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-slate-700">Your basket is currently empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Add fresh milk, artisanal yogurt, and grass-fed butter to get daily cold delivery.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2 bg-[#2563A6] text-white text-xs font-bold rounded-xl"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.key}
                  className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE5D8] flex items-center space-x-3.5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-contain bg-white rounded-xl p-1 border border-slate-100"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/prod-milk.png';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#17324D] truncate">{item.name}</h4>
                    <span className="text-[10px] text-slate-500 block">{item.variant}</span>
                    <span className="text-xs font-extrabold text-[#2563A6] mt-0.5 block">
                      Rp {Number(item.price).toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => removeFromCart(item.key)}
                      className="text-slate-400 hover:text-red-500 p-0.5 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center border border-slate-200 bg-white rounded-lg p-0.5 text-xs font-bold">
                      <button
                        onClick={() => updateQuantity(item.key, -1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-900"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-[11px] text-[#17324D]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.key, 1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-900"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-white space-y-3">
              {/* Free delivery badge */}
              <div className="p-2.5 rounded-xl bg-[#E9F5EE] border border-[#CDE8D8] text-[11px] text-[#356B4B] flex items-center space-x-2 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#356B4B]" />
                <span>
                  {subtotal >= 100000
                    ? '🎉 You unlocked FREE insulated cold delivery!'
                    : `Add Rp ${Number(100000 - subtotal).toLocaleString('id-ID')} more for FREE delivery`}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">Rp {Number(subtotal).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cold-Chain Packaging & Delivery</span>
                  <span className="font-semibold text-slate-800">
                    {deliveryFee === 0 ? <span className="text-[#356B4B]">FREE</span> : `Rp ${Number(deliveryFee).toLocaleString('id-ID')}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100 text-sm font-extrabold text-[#17324D]">
                  <span>Total Amount</span>
                  <span className="text-[#2563A6]">Rp {Number(grandTotal).toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 px-4 bg-[#2563A6] hover:bg-[#1C4E86] text-white text-xs font-bold rounded-2xl shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-95"
              >
                <span>Proceed to Cold Delivery Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
