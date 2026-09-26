'use client';

import React from 'react';
import Image from 'next/image';
import { Home, Star, MapPin, Check, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context';
import { formatCurrency, generateWhatsAppBookingUrl } from '@/lib/utils';
import { StayData } from '@/lib/data';

export function StaysView({ initialStays }: { initialStays: StayData[] }) {
  const { stays, settings, openBookingModal } = useApp();
  const displayStays = stays && stays.length > 0 ? stays : initialStays;

  return (
    <div className="min-h-screen bg-[#FAFCFA] text-slate-900 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 inline-flex items-center gap-1.5 mb-2">
            <Home className="w-3.5 h-3.5 text-emerald-700" /> KODAIKANAL HILL STAYS & COTTAGES
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-[#0B3B24] mt-2">
            Stay Surrounded by Clouds & Pine Trees in Kodaikanal
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Handpicked mountain chalets, private family estates, campfire cottages, and peaceful village retreats in Kodaikanal with seamless cab pickup.
          </p>
        </div>

        <div className="space-y-12">
          {displayStays.map((stay) => (
            <div
              key={stay.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:shadow-xl transition-shadow"
            >
              {/* Image Gallery Column */}
              <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[260px] bg-slate-900">
                <Image
                  src={stay.image}
                  alt={`${stay.name} - Kodaikanal Cottage Stay`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {stay.type}
                </div>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{stay.rating} ({stay.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Info Column */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>{stay.location}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">
                    {stay.name}
                  </h2>
                  <p className="text-xs font-medium text-slate-500 italic mt-1">
                    "{stay.tagline}"
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {stay.description}
                  </p>

                  {/* Amenities */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {stay.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-emerald-50 text-emerald-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-emerald-100 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-emerald-600" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Pricing & Booking */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">Starting From</span>
                    <div className="flex items-baseline gap-1">
                      <strong className="text-2xl font-black text-[#0B3B24]">
                        {formatCurrency(stay.priceStarting)}
                      </strong>
                      <span className="text-xs text-slate-500 font-medium">/ night</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => openBookingModal({ stayId: stay.id })}
                      className="bg-[#0B3B24] hover:bg-[#1E5128] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-300" />
                      <span>Book Stay + Cab</span>
                    </button>

                    <a
                      href={generateWhatsAppBookingUrl({
                        phone: settings.phone1,
                        packageName: `Stay Enquiry: ${stay.name}`
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow transition-all flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
