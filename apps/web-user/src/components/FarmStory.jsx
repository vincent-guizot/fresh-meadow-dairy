import React from 'react';
import { Sun, Heart, Award, ShieldCheck, Sparkles, Droplets } from 'lucide-react';

export default function FarmStory() {
  return (
    <section id="farm-story" className="py-16 md:py-24 bg-white border-t border-[#EBE5D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#356B4B]">
            From Meadow to Table
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#17324D] tracking-tight">
            How Fresh Meadow Dairy is Raised Different
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            We believe dairy should be pure, respectful, and fresh. That starts with organic pastures, unstressed cows, and cold delivery.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-[#FAF8F3] rounded-3xl p-6 sm:p-8 border border-[#EBE5D8] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#356B4B] flex items-center justify-center">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#17324D]">100% Pasture Grazed</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our dairy herd roams freely across 450 hectares of highland grass. Sunshine, clover, and clean spring water result in milk naturally rich in Omega-3 and CLA.
            </p>
          </div>

          <div className="bg-[#FAF8F3] rounded-3xl p-6 sm:p-8 border border-[#EBE5D8] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#2563A6] flex items-center justify-center">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#17324D]">Gentle Low-Temp Pasteurization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never use ultra-high heat that destroys flavor and proteins. Our gentle thermal batch process protects delicate cream layers and wholesome digestive enzymes.
            </p>
          </div>

          <div className="bg-[#FAF8F3] rounded-3xl p-6 sm:p-8 border border-[#EBE5D8] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#F4C95D] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#17324D]" />
            </div>
            <h3 className="text-base font-extrabold text-[#17324D]">Guaranteed 2–6°C Cold Chain</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              From morning milking to your doorstep, our fleet maintains insulated chill monitoring so you get the crispest, richest dairy experience possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
