'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Car, CheckCircle2, Phone, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context';

export const CabJourneySection: React.FC = () => {
  const { openBookingModal } = useApp();

  const journeyHighlights = [
    {
      title: 'Expert Mountain Drivers',
      desc: 'Local drivers born and raised in Kodaikanal who navigate misty Ghat hairpin turns with supreme safety.'
    },
    {
      title: 'Spotless Clean Cabs',
      desc: 'Comfortable Sedans (Etios) and spacious 7-seater SUVs (Kia Carens) maintained in peak hill condition.'
    },
    {
      title: 'No-Rush Sightseeing',
      desc: 'Spend as much time as you want taking photos, enjoying waterfalls, and boating without driver rush.'
    },
    {
      title: 'Instant WhatsApp Booking',
      desc: 'Direct dispatch coordination with zero advance hassle and clear fixed brochure pricing.'
    }
  ];

  return (
    <section id="journey-starts" className="py-20 bg-[#F9FBFA] text-slate-900 border-t border-b border-emerald-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#155E38] text-xs font-black uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 inline-flex items-center gap-1.5 mb-2">
            <Car className="w-3.5 h-3.5 text-[#155E38]" /> YOUR LOCAL TRAVEL PARTNER
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#064E3B] mt-2">
            YOUR JOURNEY STARTS HERE.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            You are not just booking a taxi. You are travelling with a reliable local friend who knows the best viewpoint timings, shortcut routes, and fresh hill tea spots.
          </p>
        </div>

        {/* Crisp White Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block bg-emerald-50 text-[#155E38] text-xs font-bold px-3 py-1 rounded-md border border-emerald-200">
                MB Travels • Proprietor: P. Murugaboopathi
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] leading-snug">
                Experience every curve of the Palani Hills in total peace and comfort.
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether arriving from Madurai, Kodai Road Railway Station, or Dindigul, our drivers meet you right on time with clean vehicles and friendly local assistance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {journeyHighlights.map((item, idx) => (
                  <div key={idx} className="bg-emerald-50/60 border border-emerald-100 p-3.5 rounded-2xl">
                    <div className="flex items-center gap-2 text-[#064E3B] font-bold text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#155E38] flex-shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => openBookingModal()}
                  className="bg-[#155E38] hover:bg-[#0B3B24] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
                >
                  <Car className="w-4 h-4" /> Book A Cab Now
                </button>
                <span className="text-xs text-slate-500 font-medium">Sedan & SUV Fleet Available</span>
              </div>
            </div>

            {/* Right Column: Road and Vehicle Photo */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
                <img
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop"
                  alt="Scenic Kodaikanal Mountain Road"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-md flex items-center justify-between">
                  <div>
                    <strong className="block text-sm text-[#064E3B] font-black">MB Travels Kodaikanal</strong>
                    <span className="text-xs text-slate-500">Fern Hill Road • +91 9942472778</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-amber-500">★★★★★ 4.9/5</span>
                    <span className="text-[10px] text-slate-400 block font-semibold">Verified Local Partner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
