'use client';

import React from 'react';
import Image from 'next/image';
import { ThermometerSnowflake, ShieldCheck, Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-fmd-navy-800 text-fmd-navy-100 border-t border-fmd-navy-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-fmd-navy-700 flex items-center justify-center p-1 border border-fmd-navy-600">
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
                  Fresh Meadow Dairy
                </span>
                <span className="text-[10px] font-semibold text-fmd-yellow-500 uppercase tracking-widest">
                  Artisan Dairy Farm
                </span>
              </div>
            </div>

            <p className="text-xs text-fmd-navy-200 leading-relaxed max-w-sm">
              Susu pasteurisasi organik single-origin yang dipanen segar setiap hari dari sapi grass-fed. Diantar langsung dalam temperatur rantai dingin terjaga 2°C - 4°C ke pintu rumah Anda.
            </p>

            <div className="flex items-center gap-2 text-xs text-cold-200 bg-fmd-navy-900/80 px-3.5 py-2 rounded-xl border border-fmd-navy-700 w-fit">
              <ThermometerSnowflake className="w-4 h-4 text-cold-500" />
              <span>Sertifikasi Cold Chain • 2°C - 4°C Terjamin</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Produk Susu</h4>
            <ul className="space-y-2 text-xs text-fmd-navy-200">
              <li><a href="#dairy-catalog" className="hover:text-white transition-colors">Susu Segar Murni A2</a></li>
              <li><a href="#dairy-catalog" className="hover:text-white transition-colors">Yogurt Yunani Kental</a></li>
              <li><a href="#dairy-catalog" className="hover:text-white transition-colors">Mentega Tradisional</a></li>
              <li><a href="#dairy-catalog" className="hover:text-white transition-colors">Keju Artisan Matang</a></li>
              <li><a href="#dairy-catalog" className="hover:text-white transition-colors">Krim Kocok Segar</a></li>
            </ul>
          </div>

          {/* Farm Pillars */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Tentang Peternakan</h4>
            <ul className="space-y-2 text-xs text-fmd-navy-200">
              <li><a href="#cold-chain" className="hover:text-white transition-colors">Jaminan Rantai Dingin</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Etika Pasture Grazing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Daur Ulang Botol Kaca</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Laporan Lab Creamery</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Layanan Pelanggan</h4>
            <ul className="space-y-2.5 text-xs text-fmd-navy-200">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-fmd-yellow-500" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-fmd-yellow-500" />
                <span>order@freshmeadowdairy.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-fmd-yellow-500 shrink-0 mt-0.5" />
                <span>Highland Valley Pasture #8, Lembang, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-fmd-navy-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-fmd-navy-300">
          <p>© {new Date().getFullYear()} Fresh Meadow Dairy Co. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Syarat Pengiriman</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Garansi Rantai Dingin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
