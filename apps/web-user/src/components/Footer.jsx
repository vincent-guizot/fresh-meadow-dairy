import React from 'react';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#17324D] text-white pt-12 pb-8 border-t border-[#122437]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <img
                src="/assets/logo.png"
                alt="Fresh Meadow Dairy"
                className="h-9 w-auto brightness-200"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-extrabold text-base tracking-tight text-white">
                Fresh Meadow
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Highland dairy farm producing ethical, 100% pasture-raised cow milk, strained yogurt, and artisan butter.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-[#F4C95D] uppercase tracking-wider mb-3">Our Dairy</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#catalog" className="hover:text-white transition-colors">Pure Whole Milk</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Greek Strained Yogurt</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Grass-Fed Butter</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Aged Artisan Cheeses</a></li>
            </ul>
          </div>

          {/* Standards */}
          <div>
            <h4 className="text-xs font-bold text-[#F4C95D] uppercase tracking-wider mb-3">Farm Standards</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>Highland Pasture Raised</li>
              <li>Non-GMO Forage Diet</li>
              <li>Cold Chain Delivery (2–6°C)</li>
              <li>Zero Synthetic Additives</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-[#F4C95D] uppercase tracking-wider mb-3">Customer Support</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#F4C95D]" />
                <span>WhatsApp: +62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#F4C95D]" />
                <span>support@freshmeadow.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#F4C95D]" />
                <span>Puncak Highland Valley, West Java</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Fresh Meadow Dairy Co. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
            <span>for healthy dairy living.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
