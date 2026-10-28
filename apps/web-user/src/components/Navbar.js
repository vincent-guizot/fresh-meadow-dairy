'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Sparkles, ThermometerSnowflake, ShieldCheck, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Navbar() {
  const { openCart, getTotalItems, searchQuery, setSearchQuery } = useCartStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = isClient ? getTotalItems() : 0;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-100/95 backdrop-blur-md shadow-sm border-b border-cream-200'
          : 'bg-cream-100 border-b border-cream-200/60'
      }`}
    >
      {/* Top Banner: Cold Chain Assurance */}
      <div className="bg-brand-900 text-brand-50 text-xs py-1.5 px-4 text-center flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5 font-medium">
          <ThermometerSnowflake className="w-3.5 h-3.5 text-cold-200 animate-cold-pulse" />
          <span>Cold Chain Guaranteed (2°C - 4°C)</span>
        </span>
        <span className="hidden sm:inline text-brand-300/40">•</span>
        <span className="hidden sm:flex items-center gap-1 text-cream-200">
          <ShieldCheck className="w-3.5 h-3.5 text-butter-400" />
          <span>Free Insulated Cold-Box on orders above Rp 150.000</span>
        </span>
        <span className="hidden md:inline text-brand-300/40">•</span>
        <span className="hidden md:inline text-butter-300 font-semibold">
          Morning Delivery 06:00 - 08:00 AM
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-brand-700 flex items-center justify-center shadow-md shadow-brand-700/20 group-hover:scale-105 transition-transform overflow-hidden relative">
                <Image
                  src="/assets/logo.png"
                  alt="Fresh Meadow Dairy"
                  width={40}
                  height={40}
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl sm:text-2xl text-brand-900 tracking-tight leading-none group-hover:text-brand-700 transition-colors">
                  Fresh Meadow
                </span>
                <span className="text-[11px] font-semibold text-brand-600 tracking-widest uppercase mt-0.5">
                  Artisan Dairy Farm
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-600/60" />
              <input
                type="text"
                placeholder="Search fresh milk, Greek yogurt, farm butter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-full border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 transition-all placeholder:text-gray-400 text-brand-900 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Links & Cart */}
          <div className="flex items-center gap-3">
            {/* Cold Chain Pill Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cold-50 border border-cold-200 text-cold-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-cold-500 animate-pulse" />
              <span>Temp: 3.2°C Chill Verified</span>
            </div>

            {/* Cart Trigger Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={openCart}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-medium text-sm shadow-md shadow-brand-700/20 transition-colors"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-butter-500 text-brand-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="hidden sm:inline">My Basket</span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-brand-800 hover:bg-cream-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-cream-200 space-y-3">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-600/60" />
              <input
                type="text"
                placeholder="Search dairy items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white rounded-lg border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-brand-700 px-1">
              <span>Cold Chain: 2°C - 4°C active</span>
              <span>Next delivery: Tomorrow 06:00 AM</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
