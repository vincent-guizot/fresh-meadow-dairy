import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Heart, Snowflake } from 'lucide-react';

export default function Hero({ onShopClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F3] to-[#FAF7EF] py-12 md:py-20 border-b border-[#EBE5D8]">
      {/* Background Subtle Pasture Illustration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
        <img
          src="/assets/login0hero.png"
          alt=""
          className="w-full h-full object-cover filter blur-[1px]"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Banner */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E9F5EE] border border-[#CDE8D8] text-[#356B4B] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#356B4B] animate-pulse" />
              <span>Morning Harvest Bottling • Shipped Cold Today</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#17324D] tracking-tight leading-tight">
              Pure pasture dairy, <br />
              <span className="text-[#2563A6]">delivered cold</span> to your family.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Fresh Meadow Dairy provides 100% wholesome milk, artisanal strained yogurt, and grass-fed butter produced with uncompromising ethical standards. From free-roaming highland cows to your doorstep in 24 hours.
            </p>

            {/* Badges List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#356B4B] shrink-0" />
                <span>Zero Antibiotics</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                <Snowflake className="w-4 h-4 text-[#2563A6] shrink-0" />
                <span>2–6°C Insulated</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Highland Grazed</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4">
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#2563A6] hover:bg-[#1C4E86] text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              >
                <span>Shop Fresh Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#farm-story"
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-[#17324D] text-sm font-bold rounded-2xl transition-colors text-center"
              >
                Learn Our Process
              </a>
            </div>
          </div>

          {/* Right Product Hero Visual */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-[#EBE5D8]">
              <div className="relative rounded-2xl overflow-hidden bg-[#FAF8F3] p-4 flex items-center justify-center aspect-square">
                <img
                  src="/assets/login.png"
                  alt="Fresh Meadow Dairy Farm"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-bold text-[#356B4B] border border-emerald-100 shadow-xs">
                  🏆 Farm of the Year
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#17324D] text-sm">Farmhouse Whole Milk 1L</h4>
                  <p className="text-xs text-slate-400">Bottled cold daily at 05:00 AM</p>
                </div>
                <span className="text-base font-extrabold text-[#2563A6]">Rp 22.000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
