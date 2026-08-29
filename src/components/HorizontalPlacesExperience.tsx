'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context';

export const HorizontalPlacesExperience: React.FC = () => {
  const { touristPlaces } = useApp();

  return (
    <section className="py-20 bg-[#F9FBFA] text-slate-900 overflow-hidden relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[#155E38] text-xs font-black uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 inline-flex items-center gap-1.5 mb-2">
              <Compass className="w-3.5 h-3.5 text-[#155E38]" /> ICONIC KODAIKANAL LANDMARKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#064E3B]">
              REAL PLACES YOU WILL VISIT
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Exact views from Guna Cave roots, Pillar Rocks, Pine Forest, Poombarai step farms & Mannavanur lake.
            </p>
          </div>

          <Link
            href="/places"
            className="text-xs font-bold text-[#155E38] hover:text-[#064E3B] flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Sightseeing Places</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div className="flex gap-6 overflow-x-auto pb-6 pt-2 px-4 sm:px-8 scrollbar-none snap-x snap-mandatory">
        {touristPlaces.map((place) => (
          <div
            key={place.slug}
            className="flex-shrink-0 w-80 sm:w-96 snap-start bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Real Landmark Photo */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-900">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              <div className="absolute top-3 left-3 bg-white/95 text-[#064E3B] text-[11px] font-black px-2.5 py-1 rounded-full shadow">
                {place.visitDuration}
              </div>

              <div className="absolute top-3 right-3 bg-[#155E38] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md">
                {place.relatedPackageName}
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-xl font-bold font-heading text-white leading-tight">{place.name}</h3>
                <p className="text-xs text-emerald-300 font-medium">{place.subtitle}</p>
              </div>
            </div>

            {/* Content info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-xs text-slate-600 bg-white">
              <p className="line-clamp-3 leading-relaxed">{place.shortStory}</p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-semibold">Best Time: {place.bestTime}</span>
                <Link
                  href={`/places/${place.slug}`}
                  className="bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-colors border border-emerald-200"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#155E38]" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
