'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Compass, Clock, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context';

export default function PlacesDirectoryPage() {
  const { touristPlaces } = useApp();

  return (
    <div className="min-h-screen bg-[#FAFCFA] text-slate-900 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 inline-flex items-center gap-1.5 mb-2">
            <Compass className="w-3.5 h-3.5 text-emerald-700" /> KODAIKANAL SIGHTSEEING DIRECTORY
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-[#0B3B24] mt-2">
            Must-Visit Places in Kodaikanal
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Explore detailed guides, photo spots, ideal visiting hours, and the best MB Cabs packages for each landmark.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {touristPlaces.map((place) => (
            <div
              key={place.slug}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                <div className="absolute top-4 left-4 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {place.relatedPackageName}
                </div>

                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{place.visitDuration}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold font-heading">{place.name}</h3>
                  <p className="text-xs text-emerald-300">{place.subtitle}</p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {place.shortStory}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Best: {place.bestTime}
                  </span>
                  <Link
                    href={`/places/${place.slug}`}
                    className="bg-[#0B3B24] hover:bg-[#1E5128] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
