'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, CloudRain, Sun, Calendar, Sparkles, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/context';

export function KodaikanalTourismView() {
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
            The Complete Kodaikanal Travel & Sightseeing Guide
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

        {/* Recommended Itinerary */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold font-heading text-[#0B3B24] flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-600" />
            How Many Days are Needed in Kodaikanal?
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed">
            A <strong>3-day, 2-night itinerary</strong> is the sweet spot to comfortably enjoy all major attractions without rushing through the Ghat roads:
          </p>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-emerald-800 font-bold block text-sm">Day 1: Kodaikanal Local & City Highlights</span>
              <p className="text-slate-600 mt-1">Coaker's Walk, Bryant Park, Kodai Lake boating, Upper Lake View, and shopping for homemade chocolates & eucalyptus oil.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-emerald-800 font-bold block text-sm">Day 2: Deep Shola Forest & Berijam Lake Safari</span>
              <p className="text-slate-600 mt-1">Silent Valley, Caps Fly Valley, Berijam Lake (requires Forest Department pass coordinated by MB Cabs), and Pine Forest.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-emerald-800 font-bold block text-sm">Day 3: Agrarian Valleys & Grasslands</span>
              <p className="text-slate-600 mt-1">Poombarai 3000-year-old stepped village, Mannavanur Lake coracle boating, and Central Sheep Research Farm.</p>
            </div>
          </div>
        </div>

        {/* Sightseeing Packages Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B3B24]">
              Official Sightseeing Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select any circuit for door-to-door cab pickup and transparent tariffs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/packages/${pkg.slug}`}
                className="group bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                    {pkg.placesCount} Scenic Places
                  </span>
                  <h3 className="font-bold text-slate-900 mt-2 text-base group-hover:text-emerald-700 transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {pkg.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
