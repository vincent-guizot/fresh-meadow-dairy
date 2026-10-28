'use client';

import React from 'react';
import Image from 'next/image';
import { ThermometerSnowflake, ShieldCheck, Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100 border-t border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center p-1">
                <Image
                  src="/assets/logo.png"
                  alt="Fresh Meadow Dairy"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white block leading-none">
                  Fresh Meadow
                </span>
                <span className="text-[10px] font-semibold text-brand-300 uppercase tracking-widest">
                  Artisan Dairy Farm
                </span>
              </div>
            </div>

            <p className="text-xs text-brand-200/80 leading-relaxed max-w-sm">
              Single-origin organic pasteurized dairy harvested daily from grass-fed cows. Delivered cold to your doorstep with guaranteed unbroken refrigeration.
            </p>

            <div className="flex items-center gap-2 text-xs text-cold-200 bg-brand-800/80 px-3.5 py-2 rounded-xl border border-brand-700 w-fit">
              <ThermometerSnowflake className="w-4 h-4 text-cold-400" />
              <span>Certified Cold Chain Standard • 2°C - 4°C</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Dairy Products</h4>
            <ul className="space-y-2 text-xs text-brand-200/80">
              <li><a href="#dairy-catalog" className="hover:text-white transition-colors">A2 Whole Milk</a></li>
              <li><a href="#dairy-catalog" className="hover:text-white transition-colors">Greek Yogurt</a></li>
              <li><a href="#dairy-catalog" className="hover:text-white transition-colors">Slow-Churned Butter</a></li>
              <li><a href="#dairy-catalog" className="hover:text-white transition-colors">Aged Farm Cheese</a></li>
              <li><a href="#dairy-catalog" className="hover:text-white transition-colors">Highland Whipping Cream</a></li>
            </ul>
          </div>

          {/* Farm Pillars */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">About the Farm</h4>
            <ul className="space-y-2 text-xs text-brand-200/80">
              <li><a href="#cold-chain" className="hover:text-white transition-colors">Cold Chain Assurance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pasture Grazing Ethics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Glass Bottle Recycling</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Creamery Lab Reports</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Farm Concierge</h4>
            <ul className="space-y-2.5 text-xs text-brand-200/80">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-butter-400" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-butter-400" />
                <span>order@freshmeadowdairy.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-butter-400 shrink-0 mt-0.5" />
                <span>Highland Valley Pasture #8, Lembang, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-brand-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-300">
          <p>© {new Date().getFullYear()} Fresh Meadow Dairy Co. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Terms of Delivery</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Cold Chain Guarantee</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
