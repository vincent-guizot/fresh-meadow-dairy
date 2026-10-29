'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ThermometerSnowflake, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ColdChainBanner() {
  const steps = [
    {
      step: '01',
      title: 'Pemerahan & Pendinginan Kilat',
      desc: 'Susu langsung didinginkan kilat ke 3°C dalam 15 menit pasca-perah untuk mengunci kesegaran nutrisi alami.',
      icon: <ThermometerSnowflake className="w-6 h-6 text-cold-500" />,
      tag: 'Puncak Kesegaran',
    },
    {
      step: '02',
      title: 'Armada Berpendingin Aktif',
      desc: 'Mobil logistik khusus menjaga suhu 2°C - 4°C secara konstan dengan sensor pemantau IoT waktu-nyata.',
      icon: <Truck className="w-6 h-6 text-fmd-green-500" />,
      tag: 'Sensor GPS & Suhu',
    },
    {
      step: '03',
      title: 'Kotak Insulasi Foil Termal',
      desc: 'Dikemas dalam wadah foil ganda dengan ice gel pack daur ulang yang menahan dingin selama lebih dari 6 jam.',
      icon: <ShieldCheck className="w-6 h-6 text-fmd-yellow-500" />,
      tag: 'Nol Kerusakan Panas',
    },
    {
      step: '04',
      title: 'Pengantaran Pagi Buta',
      desc: 'Tiba di depan pintu rumah Anda antara pukul 06:00 - 08:00 WIB sebelum paparan panas terik matahari.',
      icon: <CheckCircle2 className="w-6 h-6 text-fmd-blue-400" />,
      tag: 'Siap untuk Sarapan',
    },
  ];

  return (
    <section id="cold-chain" className="bg-fmd-navy-800 text-white py-16 sm:py-24 relative overflow-hidden">
      {/* Decorative Gradient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-fmd-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-cold-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fmd-navy-700 border border-fmd-navy-600 text-cold-200 text-xs font-semibold">
            <ThermometerSnowflake className="w-4 h-4 text-cold-500" />
            <span>Standar Rantai Dingin Tanpa Putus</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-fmd-cream-100">
            Jaminan Kesegaran dari Padang Rumput ke Meja Makan
          </h2>

          <p className="text-sm sm:text-base text-fmd-navy-200 leading-relaxed">
            Susu murni berkualitas tinggi tidak boleh dibiarkan di rak toko yang hangat. Kami memanen, mengemas dalam botol kaca tebal, dan mengantarkannya dalam pendinginan terus-menerus agar Anda dapat merasakan susu sebagaimana alam menciptakannya.
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
              className="bg-fmd-navy-700/60 backdrop-blur-sm p-6 rounded-2xl border border-fmd-navy-600 flex flex-col justify-between hover:border-fmd-blue-400 transition-colors shadow-card"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-serif font-bold text-2xl text-fmd-navy-300">
                    {item.step}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-fmd-yellow-500 block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-fmd-navy-200 leading-relaxed">
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
