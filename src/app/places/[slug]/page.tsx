'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight, ChevronRight, CheckCircle2, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { useApp } from '@/lib/context';
import { generateWhatsAppBookingUrl } from '@/lib/utils';

export default function PlaceDetailPage({ params }: { params: { slug: string } }) {
  const { touristPlaces, packages, openBookingModal, settings } = useApp();

  const place = touristPlaces.find((p) => p.slug === params.slug);

  if (!place) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-black text-[#0B3B24]">Place Not Found</h1>
        <p className="text-slate-600 mt-2">The sightseeing landmark does not exist.</p>
        <Link href="/places" className="inline-block mt-6 bg-[#0B3B24] text-white px-6 py-2.5 rounded-xl font-bold">
          View All Places
        </Link>
      </div>
    );
  }

  const relatedPkg = packages.find((p) => p.slug === place.relatedPackageSlug);

  return (
    <div className="min-h-screen bg-[#FAFCFA] text-slate-900 pb-24">
      {/* Banner */}
      <div className="relative h-[60vh] min-h-[440px] bg-slate-950 text-white flex items-end">
        <img
          src={place.image}
          alt={place.name}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A12] via-black/40 to-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/places" className="hover:underline">Places</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{place.name}</span>
          </div>

          <div className="inline-block bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            Included in {place.relatedPackageName}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading leading-tight">
            {place.name}
          </h1>
          <p className="text-emerald-100 text-base sm:text-xl max-w-2xl mt-2 font-light">
            {place.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          {/* Quick Facts Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-xs">
            <div>
              <span className="text-slate-400 block font-semibold">Best Time</span>
              <strong className="text-slate-800">{place.bestTime}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Visit Duration</span>
              <strong className="text-slate-800">{place.visitDuration}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Altitude</span>
              <strong className="text-slate-800">{place.altitude || 'High Hills'}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Entry Fee</span>
              <strong className="text-slate-800">{place.entryFee || 'Nominal / Free'}</strong>
            </div>
          </div>

          {/* Story & History */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold font-heading text-[#0B3B24]">
              About {place.name}
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed">{place.shortStory}</p>
          </div>

          {/* What to Expect */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold font-heading text-[#0B3B24]">What to Expect</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {place.whatToExpect.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Tips */}
          <div className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200 space-y-3">
            <h3 className="text-base font-bold font-heading text-emerald-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              MB Cabs Local Travel Tips
            </h3>
            <ul className="space-y-2 text-xs text-emerald-900">
              {place.travelTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar: Related Package */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl sticky top-24 space-y-5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block">
              Recommended Package
            </span>
            <h3 className="text-xl font-bold font-heading text-[#0B3B24]">
              {place.relatedPackageName}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Visit {place.name} seamlessly along with all nearby attractions on this comprehensive sightseeing route.
            </p>

            <button
              onClick={() => openBookingModal({ packageSlug: place.relatedPackageSlug })}
              className="w-full bg-[#0B3B24] hover:bg-[#1E5128] text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Book Cab for This Tour</span>
            </button>

            <a
              href={generateWhatsAppBookingUrl({
                phone: settings.phone1,
                packageName: `${place.relatedPackageName} (Visiting ${place.name})`
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white font-bold py-3 px-4 rounded-xl text-xs shadow flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Enquiry
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
