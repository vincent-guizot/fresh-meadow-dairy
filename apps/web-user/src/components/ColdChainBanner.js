'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ThermometerSnowflake, ShieldCheck, Truck, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ColdChainBanner() {
  const steps = [
    {
      step: '01',
      title: 'Milking & Rapid Chilling',
      desc: 'Milk is flash-chilled to 3°C within 15 minutes of milking to stop bacterial development naturally.',
      icon: <ThermometerSnowflake className="w-6 h-6 text-cold-600" />,
      tag: 'Peak Freshness',
    },
    {
      step: '02',
      title: 'Active Refrigerated Transit',
      desc: 'Our electric logistics fleet maintains locked temperatures between 2°C - 4°C with live IoT sensors.',
      icon: <Truck className="w-6 h-6 text-brand-600" />,
      tag: 'GPS & Temp Tracked',
    },
    {
      step: '03',
      title: 'Thermal Insulated Pouch',
      desc: 'Packed inside double-walled metallic foil boxes with recyclable cold-gel packs that hold chill for 6+ hours.',
      icon: <ShieldCheck className="w-6 h-6 text-butter-600" />,
      tag: 'Zero Thermal Loss',
    },
    {
      step: '04',
      title: 'Dawn Porch Delivery',
      desc: 'Placed safely at your doorstep between 06:00 - 08:00 AM before the morning sun begins to warm.',
      icon: <CheckCircle2 className="w-6 h-6 text-brand-700" />,
      tag: 'Breakfast Ready',
    },
  ];

  return (
    <section id="cold-chain" className="bg-brand-900 text-white py-16 sm:py-24 relative overflow-hidden">
      {/* Decorative Gradient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-800/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-cold-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800 border border-brand-700 text-cold-200 text-xs font-semibold">
            <ThermometerSnowflake className="w-4 h-4 text-cold-400" />
            <span>Unbroken Cold Chain Standard</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream-100">
            Guaranteed Freshness from Pasture to Porch
          </h2>

          <p className="text-sm sm:text-base text-brand-200/80 leading-relaxed">
            Real dairy should never sit on warm supermarket shelves. We harvest, bottle, and transport every batch under continuous refrigeration so you taste dairy the way nature intended.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-brand-800/50 backdrop-blur-sm p-6 rounded-2xl border border-brand-700 flex flex-col justify-between hover:border-brand-500 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-serif font-bold text-2xl text-brand-400/40">
                    {item.step}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-butter-400 block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-brand-100/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
