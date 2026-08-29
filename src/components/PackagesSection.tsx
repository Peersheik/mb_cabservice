'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Clock, ArrowRight, ShieldAlert } from 'lucide-react';
import { useApp } from '@/lib/context';
import { formatCurrency } from '@/lib/utils';

export const PackagesSection: React.FC = () => {
  const { packages, pricingMode, openBookingModal } = useApp();

  return (
    <section id="packages" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[#155E38] text-xs sm:text-sm font-black uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#155E38]" /> OFFICIAL 5 SIGHTSEEING PACKAGES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-[#064E3B] mt-1">
              CHOOSE YOUR KODAIKANAL CIRCUIT
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Official brochure circuits with exact real spots, clean vehicles, and transparent tariffs.
            </p>
          </div>

          {/* Pricing Tag */}
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-600 animate-ping" />
            <div className="text-xs">
              <span className="text-slate-500 block font-medium">Currently Active Rates:</span>
              <strong className="text-[#064E3B] font-extrabold text-sm">
                {pricingMode === 'SEASON' ? '🔥 Season Pricing Active' : '🟢 Off-Season Pricing Active'}
              </strong>
            </div>
          </div>
        </div>

        {/* 5 Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages
            .filter((p) => p.status !== 'HIDDEN')
            .map((pkg) => {
              const isUnavailable = pkg.status === 'TEMPORARILY_UNAVAILABLE';
              const priceObj = pkg.pricing;
              const activeSedanPrice =
                pricingMode === 'SEASON' && priceObj.sedan.season !== null
                  ? priceObj.sedan.season
                  : priceObj.sedan.offSeason;

              return (
                <div
                  key={pkg.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Real Landmark Photo */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#064E3B] text-xs font-black px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#155E38]" />
                      <span>{pkg.placesCount} Scenic Spots</span>
                    </div>

                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-300" />
                      <span>{pkg.duration}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
                        {pkg.category}
                      </span>
                      <h3 className="text-2xl font-black font-heading leading-tight">{pkg.name}</h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white">
                    <div>
                      <p className="text-xs font-bold text-[#155E38] mb-2">
                        {pkg.subtitle}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {pkg.description}
                      </p>

                      {/* Forest Notice if applicable */}
                      {pkg.permissionNotice && (
                        <div className="mt-3 bg-amber-50 border border-amber-200 text-amber-900 text-[11px] p-2.5 rounded-xl flex items-start gap-2">
                          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>Notice:</strong> {pkg.permissionNotice}
                          </span>
                        </div>
                      )}

                      {/* Real Places Preview Pills */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-2">
                          Included Sightseeing Spots:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {pkg.places.slice(0, 5).map((place, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-emerald-50 text-[#064E3B] px-2.5 py-1 rounded-md font-semibold border border-emerald-100"
                            >
                              {place.name}
                            </span>
                          ))}
                          {pkg.places.length > 5 && (
                            <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-bold">
                              +{pkg.places.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Pricing & CTA Row */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">
                            Sedan (4 Passengers)
                          </span>
                          <span className="text-xl sm:text-2xl font-black text-[#064E3B]">
                            {formatCurrency(activeSedanPrice)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">
                            SUV (7 Passengers)
                          </span>
                          <span className="text-sm font-bold text-[#155E38]">
                            {formatCurrency(
                              pricingMode === 'SEASON' && priceObj.suv.season !== null
                                ? priceObj.suv.season
                                : priceObj.suv.offSeason
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/packages/${pkg.slug}`}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1 text-center"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#155E38]" />
                        </Link>

                        <button
                          onClick={() => openBookingModal({ packageSlug: pkg.slug })}
                          disabled={isUnavailable}
                          className="bg-[#155E38] hover:bg-[#0B3B24] disabled:bg-slate-300 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow flex items-center justify-center gap-1"
                        >
                          {isUnavailable ? 'Unavailable' : 'Book Cab'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
