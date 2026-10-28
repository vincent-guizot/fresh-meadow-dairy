'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Sun, Droplets, Leaf } from 'lucide-react';

export default function FarmStory() {
  const highlights = [
    {
      icon: <Sun className="w-5 h-5 text-butter-500" />,
      title: '300+ Days Open Pasture',
      desc: 'Our Jersey cows roam freely across green highland meadows with unlimited sunshine and clean mountain spring water.',
    },
    {
      icon: <Leaf className="w-5 h-5 text-brand-600" />,
      title: '100% Organic Grass Diet',
      desc: 'No grain feeds, zero GMOs, and absolutely no synthetic growth hormones or antibiotics.',
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: 'Cruelty-Free Milking',
      desc: 'Cows choose when to be milked in voluntary robotic stations, eliminating stress and maximizing milk quality.',
    },
    {
      icon: <Droplets className="w-5 h-5 text-cold-600" />,
      title: 'Eco Circular Packaging',
      desc: 'Return your glass bottles and insulated bags on your next delivery for a Rp 5.000 farm credit per bottle.',
    },
  ];

  return (
    <section className="bg-cream-50 py-16 sm:py-24 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-cream-300">
              <Image
                src="/assets/sidebar-pasture.png"
                alt="Fresh Meadow Pasture"
                width={600}
                height={500}
                className="object-cover w-full h-[380px] sm:h-[450px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold text-butter-400 uppercase tracking-widest">
                  Highland Meadows • 1,400m ASL
                </span>
                <h4 className="font-serif font-bold text-2xl text-cream-100">
                  Where Happy Cows Make Better Milk
                </h4>
              </div>
            </div>
          </div>

          {/* Text & Value Pillars */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div>
              <span className="text-xs font-bold text-brand-700 uppercase tracking-widest block mb-2">
                Our Farming Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-900 tracking-tight leading-tight">
                Honoring the Land, Respecting the Herd.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                Fresh Meadow Dairy was founded on a simple conviction: the best dairy comes from healthy, calm cows eating natural pasture in crisp highland air. We never cut corners with industrial homogenizers or synthetic stabilizers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl border border-cream-200 shadow-xs space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center">
                    {h.icon}
                  </div>
                  <h4 className="font-serif font-bold text-base text-brand-900">{h.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
