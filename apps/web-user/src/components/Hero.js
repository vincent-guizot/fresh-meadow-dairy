'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Award, ThermometerSnowflake, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const scrollToProducts = () => {
    const el = document.getElementById('dairy-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-fmd-cream-100 via-white to-fmd-cream-100 py-12 sm:py-20 border-b border-fmd-cream-300">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-fmd-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-fmd-green-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fmd-green-50 border border-fmd-green-200 text-fmd-green-600 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-fmd-yellow-500" />
              <span>100% Sapi Jersey Grass-Fed • Rantai Dingin 2°C - 4°C</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-fmd-navy-700 tracking-tight leading-[1.12]">
              Susu Segar Padang Rumput,{' '}
              <span className="text-fmd-blue-500 italic font-normal">Diantar Dingin</span> ke Pintu Rumah Anda.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-fmd-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Diperah segar setiap pagi dari kawanan sapi Jersey yang merumput bebas di dataran tinggi. Tanpa proses ultra-pasteurisasi yang merusak nutrisi, kaya protein alami A2, dan terlindungi dalam kemasan dingin terkunci dari kandang hingga meja sarapan keluarga Anda.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToProducts}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-fmd-blue-500 hover:bg-fmd-blue-600 text-white font-bold text-sm sm:text-base shadow-md shadow-fmd-blue-500/25 flex items-center justify-center gap-2 transition-colors"
              >
                <span>Lihat Produk Susu Segar</span>
                <ArrowDown className="w-4 h-4" />
              </motion.button>

              <a
                href="#farm-story"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-fmd-cream-50 text-fmd-navy-700 border border-fmd-cream-300 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Cerita Peternakan Kami</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-fmd-cream-300 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif font-bold text-2xl text-fmd-navy-700">4.9★</span>
                <span className="text-xs text-gray-500 font-medium">Ulasan Pelanggan</span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-x border-fmd-cream-300 px-4">
                <span className="font-serif font-bold text-2xl text-fmd-navy-700">&lt; 4°C</span>
                <span className="text-xs text-gray-500 font-medium">Suhu Dingin Terkunci</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif font-bold text-2xl text-fmd-navy-700">06:00 AM</span>
                <span className="text-xs text-gray-500 font-medium">Pengantaran Pagi</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md bg-white p-5 rounded-3xl shadow-card border border-fmd-cream-300">
              {/* Product Spotlight Image */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-fmd-cream-100 to-fmd-blue-50/50 flex items-center justify-center p-6 border border-fmd-cream-200">
                <Image
                  src="/assets/prod-milk.png"
                  alt="Fresh Meadow Whole Milk"
                  width={280}
                  height={280}
                  className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                  priority
                />

                {/* Floating Temp Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-cold-200 px-3 py-1.5 rounded-2xl shadow-xs flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cold-500 animate-pulse" />
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">
                      Suhu Ruang Dingin
                    </span>
                    <span className="text-xs font-bold text-cold-700 leading-none mt-0.5">
                      3.4°C Chilled
                    </span>
                  </div>
                </div>

                {/* Floating Award Badge */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm border border-fmd-yellow-300 px-3 py-1.5 rounded-2xl shadow-xs flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-fmd-yellow-500" />
                  <span className="text-xs font-bold text-fmd-navy-700">100% Organik A2</span>
                </div>
              </div>

              {/* Quick Info Beneath Image */}
              <div className="mt-4 pt-4 border-t border-fmd-cream-200 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-fmd-navy-700 text-base">
                    Panen Subuh Batch #142
                  </h4>
                  <p className="text-xs text-gray-500">Diperah 05:00 AM • Dibotolkan Dingin</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-fmd-green-50 text-fmd-green-600 text-xs font-bold border border-fmd-green-200">
                  Stok Siap Kirim
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
