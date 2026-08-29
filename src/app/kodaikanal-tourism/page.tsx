'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, CloudRain, Sun, Calendar, Sparkles, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/context';

export default function KodaikanalTourismPage() {
  const { packages } = useApp();

  return (
    <div className="min-h-screen bg-[#FAFCFA] text-slate-900 pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 inline-flex items-center gap-1.5 mb-2">
            <Compass className="w-3.5 h-3.5 text-emerald-700" /> PRINCESS OF HILL STATIONS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-[#0B3B24] mt-2">
            The Complete Kodaikanal Travel & Tourism Guide
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Perched at an altitude of 2,133 metres in the Palani Hills of Tamil Nadu, Kodaikanal is celebrated for its rolling meadows, dense shola forests, ancient granite pillars, and perennial mountain mist.
          </p>
        </div>

        {/* Best Time to Visit */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold font-heading text-[#0B3B24] flex items-center gap-2">
            <Sun className="w-6 h-6 text-amber-500" />
            Best Time to Visit Kodaikanal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200">
              <strong className="text-emerald-900 font-bold block text-base mb-1">
                Summer (April - June)
              </strong>
              <p className="text-slate-700 leading-relaxed">
                Pleasant weather with temperatures between 15°C to 25°C. Perfect for lake boating, flower shows at Bryant Park, and forest sightseeing.
              </p>
            </div>

            <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-200">
              <strong className="text-blue-900 font-bold block text-base mb-1">
                Monsoon (July - September)
              </strong>
              <p className="text-slate-700 leading-relaxed">
                Fresh misty green hills with roaring waterfalls like Silver Cascade and Vattakanal. Ideal for nature lovers seeking serenity.
              </p>
            </div>

            <div className="bg-slate-100 p-5 rounded-2xl border border-slate-200">
              <strong className="text-slate-900 font-bold block text-base mb-1">
                Winter (October - March)
              </strong>
              <p className="text-slate-700 leading-relaxed">
                Crisp chilly weather dropping to 8°C with morning frost and clear star-filled nights. Best for couples and trekking.
              </p>
            </div>
          </div>
        </div>

        {/* How to Reach */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold font-heading text-[#0B3B24]">
            How to Reach Kodaikanal
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span>
                <strong>By Air:</strong> Madurai Airport (IXM - 120 km) or Coimbatore Airport (CJB - 175 km). MB Cabs offers direct airport pickup & drop.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span>
                <strong>By Train:</strong> Kodai Road Railway Station (KQN - 80 km) or Dindigul Junction (DG - 95 km). Direct mountain cab transfers available.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span>
                <strong>By Road:</strong> Beautiful scenic Ghat roads connected from Batlagundu (Madurai side) or Palani Ghat.
              </span>
            </div>
          </div>
        </div>

        {/* Suggested Itineraries Linking to MB Packages */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-heading text-[#0B3B24]">
            Recommended Itineraries with MB Cabs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <span className="text-[11px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                2 Days Weekend Itinerary
              </span>
              <h3 className="text-xl font-bold text-slate-900">Classic Kodaikanal & Village Meadows</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Day 1: Official Local Tour (Coaker's Walk, Pillar Rocks, Pine Forest, Kodai Lake).<br />
                Day 2: Village Tour (Poombarai Terraced Hamlets & Mannavanur Lake Coracle rides).
              </p>
              <Link
                href="/#packages"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-2"
              >
                <span>View Circuit Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <span className="text-[11px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                3 Days Comprehensive Itinerary
              </span>
              <h3 className="text-xl font-bold text-slate-900">Wilderness, Heritage & Adventure Trek</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Day 1: City Tour & Kurinji Temple.<br />
                Day 2: Forest Tour & Protected Berijam Lake.<br />
                Day 3: Picnic Tour with Dolphin Nose Trek & Vattakanal Waterfalls.
              </p>
              <Link
                href="/custom-tour"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-2"
              >
                <span>Plan Custom 3-Day Tour</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
