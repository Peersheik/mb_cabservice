'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, ShieldAlert, Sparkles, ChevronRight, Check, MessageCircle, Phone, HelpCircle } from 'lucide-react';
import { useApp } from '@/lib/context';
import { formatCurrency, generateWhatsAppBookingUrl } from '@/lib/utils';
import { PackageData } from '@/lib/data';

export function PackageDetailView({ pkg }: { pkg: PackageData }) {
  const { pricingMode, openBookingModal, settings } = useApp();

  const isUnavailable = pkg.status === 'TEMPORARILY_UNAVAILABLE';
  const priceObj = pkg.pricing;
  const activeSedanPrice =
    pricingMode === 'SEASON' && priceObj.sedan.season !== null
      ? priceObj.sedan.season
      : priceObj.sedan.offSeason;
  const activeSuvPrice =
    pricingMode === 'SEASON' && priceObj.suv.season !== null
      ? priceObj.suv.season
      : priceObj.suv.offSeason;

  return (
    <div className="min-h-screen bg-[#FAFCFA] text-slate-900 pb-24">
      {/* Hero Banner */}
      <div className="relative h-[65vh] min-h-[480px] bg-slate-950 text-white flex items-end">
        <Image
          src={pkg.bannerImage}
          alt={`${pkg.name} — Kodaikanal Sightseeing Tour Cab`}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A12] via-black/40 to-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/#packages" className="hover:underline">Sightseeing Packages</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{pkg.name}</span>
          </div>

          <div className="inline-block bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            {pkg.category} • {pkg.placesCount} Scenic Places
          </div>

          {/* Long-tail SEO optimized H1 */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading leading-tight">
            {pkg.name} — Kodaikanal Cab Service
          </h1>
          <p className="text-emerald-100 text-sm sm:text-lg max-w-2xl mt-2 font-light">
            {pkg.subtitle}. Experience premium, hassle-free Kodaikanal taxi service with seasoned local mountain drivers.
          </p>

          {/* Quick Action Bar on Banner */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-xs sm:text-sm">
              <span className="text-emerald-300 block text-[10px] uppercase font-bold">Sedan Rate ({pricingMode === 'SEASON' ? 'Season' : 'Off-Season'})</span>
              <strong className="text-lg font-bold text-white">{formatCurrency(activeSedanPrice)}</strong>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-xs sm:text-sm">
              <span className="text-emerald-300 block text-[10px] uppercase font-bold">SUV 7-Seater Rate</span>
              <strong className="text-lg font-bold text-white">{formatCurrency(activeSuvPrice)}</strong>
            </div>

            <button
              onClick={() => openBookingModal({ packageSlug: pkg.slug })}
              disabled={isUnavailable}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-500 text-slate-950 font-black px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isUnavailable ? 'Unavailable' : 'Book This Package'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Itinerary Storytelling */}
        <div className="lg:col-span-8 space-y-12">
          {/* Overview */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold font-heading text-[#0B3B24]">About this Tour</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{pkg.description}</p>

            {pkg.permissionNotice && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-amber-900 text-xs">
                <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block text-sm">Mandatory Forest Notice:</strong>
                  {pkg.permissionNotice}
                </div>
              </div>
            )}
          </div>

          {/* Places You Will Explore */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-heading text-[#0B3B24]">
                Places You Will Explore ({pkg.places.length} Stops)
              </h2>
              <span className="text-xs text-slate-500 font-medium">Full Day Sightseeing Flow</span>
            </div>

            <div className="space-y-8">
              {pkg.places.map((place, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 sm:grid-cols-12"
                >
                  <div className="sm:col-span-5 relative h-52 sm:h-auto min-h-[180px] bg-slate-900">
                    <Image
                      src={place.image}
                      alt={`${place.name} - Kodaikanal Sightseeing Spot`}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                      {idx + 1}
                    </div>
                  </div>

                  <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-slate-900">{place.name}</h3>
                        {place.duration && (
                          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                            {place.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{place.description}</p>
                    </div>

                    {place.highlight && (
                      <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Highlight: {place.highlight}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Package-Specific FAQ Block for High Google Ranking */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold font-heading text-[#0B3B24] flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-emerald-600" />
              Frequently Asked Questions: {pkg.name}
            </h2>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <h3 className="font-bold text-sm text-slate-900">How much does the {pkg.name} cab service cost?</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  The {pkg.name} tariff starts at {formatCurrency(activeSedanPrice)} for a 4-passenger Sedan and {formatCurrency(activeSuvPrice)} for a 7-passenger SUV. All prices include vehicle, fuel, parking fees, and driver allowances.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <h3 className="font-bold text-sm text-slate-900">Is pickup and drop included in this sightseeing tour?</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Yes, complimentary door-to-door pickup and drop is included from any hotel, resort, cottage, or bus stand within Kodaikanal town.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <h3 className="font-bold text-sm text-slate-900">How do I book this tour package with Kodai MB Cabs?</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  You can reserve online using the instant booking button, or message our driver dispatch desk directly on WhatsApp (+91 99424 72778) for immediate confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Reservation Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl sticky top-24 space-y-6">
            <h3 className="text-xl font-bold font-heading text-[#0B3B24]">Instant Cab Reservation</h3>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2 text-xs text-emerald-950">
              <div className="flex justify-between items-center">
                <span>Sedan (4 Passengers):</span>
                <strong className="text-sm font-bold">{formatCurrency(activeSedanPrice)}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>SUV (7 Passengers):</span>
                <strong className="text-sm font-bold">{formatCurrency(activeSuvPrice)}</strong>
              </div>
              <div className="text-[10px] text-emerald-700 pt-1 border-t border-emerald-200/60">
                Rate includes vehicle, fuel, driver allowances & parking charges.
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Free hotel pickup & drop in Kodaikanal
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Sanitized AC & Non-AC hill vehicles
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Flexible stops for photography & meals
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => openBookingModal({ packageSlug: pkg.slug })}
                disabled={isUnavailable}
                className="w-full bg-[#0B3B24] hover:bg-[#1E5128] disabled:bg-slate-400 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>{isUnavailable ? 'Temporarily Unavailable' : 'Request Booking'}</span>
              </button>

              <a
                href={generateWhatsAppBookingUrl({
                  phone: settings.phone1,
                  packageName: pkg.name
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3 px-4 rounded-xl text-sm shadow transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Driver Dispatch</span>
              </a>

              <a
                href={`tel:${settings.phone1}`}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>Call {settings.phone1}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
