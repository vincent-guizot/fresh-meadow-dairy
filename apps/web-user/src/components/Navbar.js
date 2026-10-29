'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Search,
  ThermometerSnowflake,
  ShieldCheck,
  User,
  LogOut,
  Package,
  ChevronDown,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { useCart, useCustomerAuth, useMounted } from '../hooks';
import { useCartStore } from '../store/useCartStore';

export default function Navbar() {
  const { openCart, totalItems } = useCart();
  const { searchQuery, setSearchQuery } = useCartStore();
  const { user, isAuthenticated, logout, openAuthModal, openOrderHistoryModal } = useCustomerAuth();
  const isClient = useMounted();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const badgeCount = isClient ? totalItems : 0;
  const displayName = user?.name || user?.username || (user?.email ? user.email.split('@')[0] : 'Pelanggan');

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-fmd-cream-100/95 backdrop-blur-md shadow-sm border-b border-fmd-cream-300'
          : 'bg-fmd-cream-100 border-b border-fmd-cream-200'
      }`}
    >
      {/* Top Banner: Cold Chain Assurance */}
      <div className="bg-fmd-navy-900 text-fmd-cream-100 text-xs py-1.5 px-4 text-center flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5 font-medium">
          <ThermometerSnowflake className="w-3.5 h-3.5 text-cold-200 animate-cold-pulse" />
          <span>Cold Chain Guaranteed (2°C - 4°C)</span>
        </span>
        <span className="hidden sm:inline text-white/20">•</span>
        <span className="hidden sm:flex items-center gap-1 text-fmd-cream-200">
          <ShieldCheck className="w-3.5 h-3.5 text-fmd-yellow-400" />
          <span>Kemasan Insulasi Thermal Gratis di atas Rp 150.000</span>
        </span>
        <span className="hidden md:inline text-white/20">•</span>
        <span className="hidden md:inline text-fmd-yellow-400 font-semibold">
          Pengantaran Pagi 06:00 - 08:00 AM
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-fmd-blue-500 flex items-center justify-center shadow-md shadow-fmd-blue-500/20 group-hover:scale-105 transition-transform overflow-hidden relative p-1.5">
                <Image
                  src="/assets/logo.png"
                  alt="Fresh Meadow Dairy"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl sm:text-2xl text-fmd-navy-700 tracking-tight leading-none group-hover:text-fmd-blue-500 transition-colors">
                  Fresh Meadow
                </span>
                <span className="text-[10px] font-bold text-fmd-green-500 tracking-widest uppercase mt-0.5">
                  Artisan Dairy Farm
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fmd-blue-500/60" />
              <input
                type="text"
                placeholder="Cari susu segar, Greek yogurt, butter, keju..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white rounded-full border border-fmd-cream-300 focus:outline-none focus:ring-2 focus:ring-fmd-blue-500/30 focus:border-fmd-blue-500 transition-all placeholder:text-gray-400 text-fmd-navy-700 shadow-xs"
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

          {/* Quick Actions: Cold Pill, Cart, User Auth */}
          <div className="flex items-center gap-3">
            {/* Cold Chain Pill Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cold-50 border border-cold-200 text-cold-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-cold-500 animate-pulse" />
              <span>3.2°C Chill Verified</span>
            </div>

            {/* Cart Trigger Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-fmd-blue-500 hover:bg-fmd-blue-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-fmd-blue-500/20 transition-colors"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                <AnimatePresence>
                  {badgeCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2.5 -right-2.5 bg-fmd-yellow-500 text-fmd-navy-900 text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-xs"
                    >
                      {badgeCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="hidden sm:inline">Keranjang</span>
            </motion.button>

            {/* Customer Account Button & Dropdown */}
            {isClient && isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white border border-fmd-cream-300 hover:bg-fmd-cream-50 text-fmd-navy-700 font-semibold text-xs transition-colors shadow-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-fmd-blue-100 text-fmd-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                    {displayName.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate hidden sm:inline">{displayName}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-dropdown border border-fmd-cream-300 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                    <div className="px-4 py-2 border-b border-fmd-cream-200">
                      <p className="text-xs font-bold text-fmd-navy-700 truncate">{displayName}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        openOrderHistoryModal();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-fmd-navy-700 hover:bg-fmd-cream-100 flex items-center gap-2 transition-colors font-medium"
                    >
                      <Package className="w-4 h-4 text-fmd-blue-500" />
                      <span>Riwayat Pesanan Saya</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-medium border-t border-fmd-cream-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-2 rounded-2xl bg-white hover:bg-fmd-cream-50 border border-fmd-blue-500 text-fmd-blue-500 font-bold text-xs shadow-xs transition-colors"
              >
                Masuk / Daftar
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-fmd-navy-700 hover:bg-fmd-cream-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-fmd-cream-200 space-y-3">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fmd-blue-500/60" />
              <input
                type="text"
                placeholder="Cari susu segar, yogurt, butter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-white rounded-xl border border-fmd-cream-300 focus:outline-none focus:ring-2 focus:ring-fmd-blue-500"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-fmd-green-600 px-1">
              <span>Suhu Dingin: 2°C - 4°C Terjamin</span>
              <span>Pengantaran: Esok 06:00 AM</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
