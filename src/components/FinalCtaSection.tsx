'use client';

import React from 'react';
import { Sparkles, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/context';
import { generateWhatsAppBookingUrl } from '@/lib/utils';

export const FinalCtaSection: React.FC = () => {
  const { settings, openBookingModal } = useApp();

  return (
    <section className="py-24 bg-[#071710] text-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop"
          alt="Sunset over Kodaikanal Hills"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071710] via-[#071710]/80 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <span className="text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-950/90 px-4 py-1.5 rounded-full border border-emerald-700/50 inline-flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-4 h-4 text-emerald-400" /> READY FOR YOUR MOUNTAIN GETAWAY?
        </span>

        <h2 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white leading-tight">
          KODAIKANAL IS WAITING FOR YOU.
        </h2>

        <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Tell us where you want to go. Whether it is a full day of sightseeing, a serene village drive to Mannavanur, or a private cottage among the clouds, we will take care of every detail.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => openBookingModal()}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 text-base active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-emerald-950" />
            <span>BOOK YOUR TRIP NOW</span>
          </button>

          <a
            href={generateWhatsAppBookingUrl({ phone: settings.phone1 })}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold px-7 py-4 rounded-2xl transition-all shadow flex items-center justify-center gap-2 text-base"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WHATSAPP US</span>
          </a>

          <a
            href={`tel:${settings.phone1}`}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold px-7 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 text-base"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>CALL {settings.phone1}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
