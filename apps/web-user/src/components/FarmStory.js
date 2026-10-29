'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Sun, Droplets, Leaf } from 'lucide-react';

export default function FarmStory() {
  const highlights = [
    {
      icon: <Sun className="w-5 h-5 text-fmd-yellow-500" />,
      title: '300+ Hari Rumput Terbuka',
      desc: 'Kawanan sapi Jersey kami merumput bebas di padang rumput dataran tinggi dengan limpahan sinar matahari dan mata air pegunungan yang murni.',
    },
    {
      icon: <Leaf className="w-5 h-5 text-fmd-green-500" />,
      title: '100% Pakan Rumput Alami',
      desc: 'Tanpa konsentrat industri, bebas GMO, dan nol hormon pertumbuhan sintetis atau antibiotik rutin.',
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: 'Pemerahan Bebas Stres',
      desc: 'Sapi memasuki stasiun pemerahan otomatis secara sukarela kapan pun mereka siap, menjaga ketenangan kawanan dan kemurnian rasa susu.',
    },
    {
      icon: <Droplets className="w-5 h-5 text-cold-500" />,
      title: 'Sirkularitas Botol Kaca',
      desc: 'Kembalikan botol kaca tebal dan kantong thermal kami pada pengantaran berikutnya untuk saldo deposit Rp 5.000 per botol.',
    },
  ];

  return (
    <section className="bg-fmd-cream-50 py-16 sm:py-24 border-b border-fmd-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-fmd-cream-300">
              <Image
                src="/assets/sidebar-pasture.png"
                alt="Fresh Meadow Pasture"
                width={600}
                height={500}
                className="object-cover w-full h-[380px] sm:h-[450px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fmd-navy-900/90 via-fmd-navy-900/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold text-fmd-yellow-500 uppercase tracking-widest">
                  Highland Meadows • 1.400 mdpl
                </span>
                <h4 className="font-serif font-bold text-2xl text-fmd-cream-100">
                  Sapi Bahagia Menghasilkan Susu Terbaik
                </h4>
              </div>
            </div>
          </div>

          {/* Text & Value Pillars */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div>
              <span className="text-xs font-bold text-fmd-green-600 uppercase tracking-widest block mb-2">
                Filosofi Peternakan Kami
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-fmd-navy-700 tracking-tight leading-tight">
                Menghargai Alam, Merawat Kawanan Sapi.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-fmd-navy-500 leading-relaxed">
                Fresh Meadow Dairy didirikan atas komitmen teguh: susu artisan berkualitas tinggi berakar dari sapi sehat yang hidup alami menghirup udara segar pegunungan. Kami menolak homogenisasi berlebihan demi mempertahankan rasa krim asli yang manis alami.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl border border-fmd-cream-300 shadow-card space-y-2 hover:border-fmd-blue-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-fmd-cream-100 flex items-center justify-center">
                    {h.icon}
                  </div>
                  <h4 className="font-serif font-bold text-base text-fmd-navy-700">{h.title}</h4>
                  <p className="text-xs text-fmd-navy-500 leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
