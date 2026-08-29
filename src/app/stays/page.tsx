'use client';

import React from 'react';
import { Home, Star, MapPin, Check, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context';
import { formatCurrency, generateWhatsAppBookingUrl } from '@/lib/utils';

export default function StaysPage() {
  const { stays, settings } = useApp();

  return (
    <div className="min-h-screen bg-[#FAFCFA] text-slate-900 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 inline-flex items-center gap-1.5 mb-2">
            <Home className="w-3.5 h-3.5 text-emerald-700" /> KODAIKANAL HILL STAYS & COTTAGES
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-[#0B3B24] mt-2">
            Stay Surrounded by Clouds & Pine Trees
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Handpicked mountain chalets, private family estates, campfire cottages, and peaceful village retreats in Kodaikanal.
          </p>
        </div>

        <div className="space-y-12">
          {stays.map((stay) => (
            <div
              key={stay.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:shadow-xl transition-shadow"
            >
              {/* Image Gallery Column */}
              <div className="lg:col-span-5 relative h-72 lg:h-auto bg-slate-900">
                <img
                  src={stay.image}
                  alt={stay.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {stay.type}
                </div>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
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

                  {/* Amenities List */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-2">
                      Property Amenities:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                      {stay.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing & Booking Row */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Starting Price
                    </span>
                    <span className="text-2xl font-black text-[#0B3B24]">
                      {formatCurrency(stay.priceStarting)}
                      <span className="text-xs font-normal text-slate-500"> / night</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${settings.phone1}`}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Call Stays Desk</span>
                    </a>

                    <a
                      href={generateWhatsAppBookingUrl({
                        phone: settings.phone1,
                        packageName: `Stay Enquiry: ${stay.name}`,
                        stayRequired: true
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow flex items-center gap-1.5 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Book on WhatsApp</span>
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
