'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Award, Sun, Droplets, Truck } from 'lucide-react';

export default function Hero() {
  const scrollToProducts = () => {
    const el = document.getElementById('dairy-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-cream-100 py-12 sm:py-20 border-b border-cream-200">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-butter-300/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-butter-500" />
              <span>100% Grass-Fed • Unbroken Cold Chain (2°C - 4°C)</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 tracking-tight leading-[1.12]">
              Pure Mountain Pasture Milk,{' '}
              <span className="text-brand-700 italic font-normal">Delivered Chilled</span> to Your
              Door.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Harvested daily from free-roaming Jersey cows grazing on highland meadows. Never
              ultra-processed, naturally rich in A2 protein, and guarded with temperature-locked
              insulation from milking parlor to your breakfast table.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToProducts}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm sm:text-base shadow-lg shadow-brand-700/25 flex items-center justify-center gap-2 transition-colors"
              >
                <span>Explore Farm Catalog</span>
                <ArrowDown className="w-4 h-4" />
              </motion.button>

              <a
                href="#cold-chain"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-cream-200 text-brand-900 border border-brand-200 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>How Cold Chain Works</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-cream-300/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif font-bold text-2xl text-brand-900">4.9★</span>
                <span className="text-xs text-gray-500 font-medium">Over 2,400 Reviews</span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-x border-cream-300 px-4">
                <span className="font-serif font-bold text-2xl text-brand-900">&lt; 4°C</span>
                <span className="text-xs text-gray-500 font-medium">Strict Cold Guarantee</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif font-bold text-2xl text-brand-900">06:00 AM</span>
                <span className="text-xs text-gray-500 font-medium">Daily Porch Drop</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md bg-white p-4 sm:p-6 rounded-3xl shadow-xl shadow-brand-900/10 border border-brand-100">
              {/* Product Spotlight Image */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-cream-50 to-brand-50/50 flex items-center justify-center p-6 border border-cream-200">
                <Image
                  src="/assets/prod-milk.png"
                  alt="Fresh Meadow Whole Milk"
                  width={280}
                  height={280}
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  priority
                />

                {/* Floating Temp Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-cold-200 px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cold-500 animate-pulse" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase leading-none">
                      Chamber Temp
                    </span>
                    <span className="text-xs font-bold text-cold-700 leading-none mt-0.5">
                      3.4°C Chilled
                    </span>
                  </div>
                </div>

                {/* Floating Award Badge */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm border border-butter-300 px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-butter-500" />
                  <span className="text-xs font-bold text-brand-900">100% Organic A2</span>
                </div>
              </div>

              {/* Quick Info Beneath Image */}
              <div className="mt-4 pt-4 border-t border-cream-200 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-brand-900 text-base">
                    Morning Harvest Batch #142
                  </h4>
                  <p className="text-xs text-gray-500">Milked at 05:00 AM • Bottled Chilled</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
                  In Stock
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
