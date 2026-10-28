import React from 'react';
import { ShoppingBag, Search, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onSearch, searchTerm }) {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EBE5D8] shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-[#356B4B] text-white text-[11px] py-1.5 px-4 text-center font-medium flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
        <span>Free Cold-Chain Delivery for Orders above Rp 100.000 • Delivered Fresh 06:00 - 09:00 AM Daily</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="/" className="flex items-center space-x-3 shrink-0">
          <img
            src="/assets/logo.png"
            alt="Fresh Meadow Dairy"
            className="h-11 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="hidden sm:block">
            <span className="block text-base font-extrabold text-[#17324D] tracking-tight leading-none">
              Fresh Meadow Dairy
            </span>
            <span className="text-[10px] text-[#356B4B] font-bold tracking-wider uppercase">
              100% Pasture Raised
            </span>
          </div>
        </a>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search pure milk, yogurt, grass-fed butter..."
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F3] border border-[#EBE5D8] rounded-full text-xs text-[#17324D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <a
            href="#farm-story"
            className="hidden lg:inline-flex text-xs font-semibold text-[#17324D] hover:text-[#2563A6] transition-colors"
          >
            Our Farm Story
          </a>

          <a
            href="#cold-chain"
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold text-[#356B4B] bg-[#E9F5EE] px-3 py-1.5 rounded-full"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cold-Chain 2–6°C</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-2xl bg-[#2563A6] hover:bg-[#1C4E86] text-white shadow-md shadow-blue-600/20 transition-all active:scale-95 flex items-center space-x-2 cursor-pointer"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#F4C95D] text-[#17324D] text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
