'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Star, MapPin, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { useApp } from '@/lib/context';
import { formatCurrency, generateWhatsAppBookingUrl } from '@/lib/utils';

export const StaysSection: React.FC = () => {
  const { stays, settings } = useApp();

  return (
    <section className="py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[#155E38] text-xs sm:text-sm font-black uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 inline-flex items-center gap-1.5 mb-2">
              <Home className="w-3.5 h-3.5 text-[#155E38]" /> KODAIKANAL HILL STAYS & COTTAGES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-[#064E3B] mt-1">
              WAKE UP TO THE HILLS
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Scenic pine view cottages, private 3BHK mountain villas, and authentic village retreats.
            </p>
          </div>

          <Link
            href="/stays"
            className="bg-[#155E38] hover:bg-[#0B3B24] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-all shadow flex items-center gap-2 self-start md:self-auto"
          >
            <span>View All Stays & Cottages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stays Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stays.map((stay) => (
            <div
              key={stay.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Property Image */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <Image
                  src={stay.image}
                  alt={stay.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-amber-600 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 shadow">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{stay.rating} ({stay.reviewsCount})</span>
                </div>

                <div className="absolute top-4 left-4 bg-[#155E38] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {stay.type}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold font-heading leading-snug">{stay.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-emerald-300 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{stay.location}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white">
                <div>
                  <p className="text-xs font-medium text-slate-500 italic">
                    "{stay.tagline}"
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                    {stay.amenities.slice(0, 4).map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#155E38] flex-shrink-0" />
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Starting From
                    </span>
                    <span className="text-xl font-black text-[#064E3B]">
                      {formatCurrency(stay.priceStarting)}
                      <span className="text-xs font-normal text-slate-500"> / night</span>
                    </span>
                  </div>

                  <a
                    href={generateWhatsAppBookingUrl({
                      phone: settings.phone1,
                      packageName: `Stay Enquiry: ${stay.name}`,
                      stayRequired: true
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Enquire</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
