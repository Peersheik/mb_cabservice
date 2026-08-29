'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Car, MapPin, Calendar, CheckCircle2, Shield, Phone, MessageCircle } from 'lucide-react';
import { useApp } from '@/lib/context';
import { formatCurrency, generateWhatsAppBookingUrl } from '@/lib/utils';

export const HeroSection: React.FC = () => {
  const { packages, pricingMode, settings, openBookingModal } = useApp();

  // Quick Booking Form state inside hero
  const [selectedPkgSlug, setSelectedPkgSlug] = useState('local-tour');
  const [selectedVehicle, setSelectedVehicle] = useState<'Sedan' | 'SUV'>('Sedan');
  const [travelDate, setTravelDate] = useState('');
  const [passengerCount, setPassengerCount] = useState('2');

  const currentPkg = packages.find((p) => p.slug === selectedPkgSlug) || packages[0];
  const priceObj = currentPkg.pricing[selectedVehicle.toLowerCase() as 'sedan' | 'suv'];
  const calculatedFare =
    pricingMode === 'SEASON' && priceObj.season !== null ? priceObj.season : priceObj.offSeason;

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    openBookingModal({
      packageSlug: selectedPkgSlug,
      vehicleType: selectedVehicle
    });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-900 text-white pt-24 sm:pt-28 pb-16 overflow-hidden">
      {/* 1. Cinematic Kodaikanal Mountain Background Image with Parallax / Atmospheric Depth */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop"
          alt="Misty Kodaikanal Mountain Peaks"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Soft Contrast Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
      </div>

      {/* Floating Animated Mist Particles Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-screen overflow-hidden">
        <div className="absolute -inset-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0,_transparent_70%)] animate-mist" />
      </div>

      {/* Main Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: Premium Typography & Brand Value */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-xs font-black tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>#1 RATED KODAIKANAL CAB & HOLIDAYS SERVICE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight leading-[1.08] text-white drop-shadow-lg"
            >
              Your Journey <br />
              <span className="text-emerald-400">Through Kodaikanal</span> <br />
              Starts Here.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-xl drop-shadow"
            >
              Explore misty peaks, ancient pine woods, roaring falls & terraced garlic valleys with seasoned local hill drivers.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-3 pt-4 border-t border-white/15 text-slate-300 text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero Advance Hassle</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% Fixed Brochure Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Clean & Sanitized Cabs</span>
              </div>
            </motion.div>

            {/* Quick Contact Line */}
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-300">
              <span>Direct Driver Dispatch:</span>
              <a href={`tel:${settings.phone1}`} className="text-emerald-400 font-bold hover:underline">
                📞 {settings.phone1}
              </a>
              <span>•</span>
              <a
                href={generateWhatsAppBookingUrl({ phone: settings.phone1 })}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-bold hover:underline"
              >
                💬 WhatsApp Available 24x7
              </a>
            </div>
          </div>

          {/* RIGHT: Best-In-Class Cab Booking Card (Uber/Ola Style Clean Card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-7 text-slate-900 shadow-2xl border border-slate-100 relative">
              {/* Top Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black font-heading text-[#064E3B]">
                    Book Sightseeing Cab
                  </h3>
                  <p className="text-xs text-slate-500">Instant rate calculation & dispatch</p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  {pricingMode === 'SEASON' ? 'Peak Season' : 'Off-Season'}
                </span>
              </div>

              <form onSubmit={handleQuickBook} className="mt-5 space-y-4">
                {/* 1. Select Tour Package */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                    Select Tour Package
                  </label>
                  <select
                    value={selectedPkgSlug}
                    onChange={(e) => setSelectedPkgSlug(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                  >
                    {packages
                      .filter((p) => p.status !== 'HIDDEN')
                      .map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.name} ({p.placesCount} spots) - ₹{p.pricing.sedan.offSeason} onwards
                        </option>
                      ))}
                  </select>
                </div>

                {/* 2. Select Vehicle Type */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                    Vehicle Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedVehicle('Sedan')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        selectedVehicle === 'Sedan'
                          ? 'bg-[#155E38] text-white border-[#155E38] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Car className="w-4 h-4" />
                      <span>Sedan (4 Seats)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedVehicle('SUV')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        selectedVehicle === 'SUV'
                          ? 'bg-[#155E38] text-white border-[#155E38] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Car className="w-4 h-4" />
                      <span>SUV (7 Seats)</span>
                    </button>
                  </div>
                </div>

                {/* 3. Date & Passenger Count */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                      Passengers
                    </label>
                    <select
                      value={passengerCount}
                      onChange={(e) => setPassengerCount(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                    >
                      <option value="1">1 Passenger</option>
                      <option value="2">2 Passengers</option>
                      <option value="3">3 Passengers</option>
                      <option value="4">4 Passengers</option>
                      <option value="5">5 Passengers</option>
                      <option value="6">6-7 Passengers (SUV)</option>
                    </select>
                  </div>
                </div>

                {/* 4. Dynamic Fare Box */}
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      Estimated Fare ({selectedVehicle})
                    </span>
                    <span className="text-2xl font-black text-[#064E3B]">
                      {formatCurrency(calculatedFare)}
                    </span>
                  </div>
                  <div className="text-right text-[10px] text-emerald-800 font-bold bg-white px-2.5 py-1 rounded-lg border border-emerald-100">
                    Includes Fuel & Driver
                  </div>
                </div>

                {/* 5. Booking Actions */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full bg-[#155E38] hover:bg-[#0B3B24] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Book Trip Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={generateWhatsAppBookingUrl({
                      phone: settings.phone1,
                      packageName: currentPkg.name,
                      vehicleType: selectedVehicle,
                      travelDate: travelDate || 'Flexible',
                      passengers: parseInt(passengerCount)
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-2.5 px-4 rounded-xl shadow transition-all flex items-center justify-center gap-2 text-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Confirmation</span>
                  </a>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
