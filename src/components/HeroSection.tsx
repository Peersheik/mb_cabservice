'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Car, MapPin, Calendar, CheckCircle2, Phone, MessageCircle, ShieldCheck, Compass } from 'lucide-react';
import { useApp } from '@/lib/context';
import { formatCurrency, generateWhatsAppBookingUrl } from '@/lib/utils';

export const HeroSection: React.FC = () => {
  const { packages, pricingMode, settings, openBookingModal } = useApp();

  // Interactive Background Carousel & Mouse Parallax
  const [activeBgIndex, setActiveBgIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 4 Panoramic Kodaikanal Natural Views
  const heroBackgrounds = [
    {
      title: "Pillar Rocks & Mist Valleys",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2200&auto=format&fit=crop"
    },
    {
      title: "Ancient Shola Woods & Guna Cave",
      url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2200&auto=format&fit=crop"
    },
    {
      title: "Poombarai Terraced Step Farms",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2200&auto=format&fit=crop"
    },
    {
      title: "Mannavanur Lake & Pine Grasslands",
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2200&auto=format&fit=crop"
    }
  ];

  // Auto-cycle background panorama every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  // Subtle Interactive Mouse Pan Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20
    });
  };

  // Quick Fare Calculator State
  const [selectedPkgSlug, setSelectedPkgSlug] = useState('local-tour');
  const [selectedVehicle, setSelectedVehicle] = useState<'Sedan' | 'SUV'>('Sedan');
  const [travelDate, setTravelDate] = useState('');

  const currentPkg = packages.find((p) => p.slug === selectedPkgSlug) || packages[0];
  const priceObj = currentPkg.pricing[selectedVehicle.toLowerCase() as 'sedan' | 'suv'];
  const activeFare =
    pricingMode === 'SEASON' && priceObj.season !== null ? priceObj.season : priceObj.offSeason;

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 text-white overflow-hidden pt-24 pb-16"
    >
      {/* 1. Full-Bleed Edge-to-Edge Background Image Layers with Smooth Transition */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroBackgrounds.map((bg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeBgIndex === idx ? 1 : 0,
              scale: activeBgIndex === idx ? 1.05 : 1,
              x: activeBgIndex === idx ? mousePos.x : 0,
              y: activeBgIndex === idx ? mousePos.y : 0
            }}
            transition={{
              opacity: { duration: 1.5 },
              scale: { duration: 8, ease: 'linear' },
              x: { duration: 0.8, ease: 'easeOut' },
              y: { duration: 0.8, ease: 'easeOut' }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={bg.url}
              alt={bg.title}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        ))}

        {/* Cinematic Film Grading & Vignette (Zero White Gaps) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/60" />
      </div>

      {/* Floating Animated Mist Drift Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-35 mix-blend-screen overflow-hidden">
        <div className="absolute -inset-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.25)_0,_transparent_70%)] animate-mist" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: Grand Cinematic Typography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-black tracking-wider uppercase shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Kodai MB Cabs • Premier Kodai Call Taxi & Cab Service</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight leading-[1.08] text-white drop-shadow-2xl"
            >
              Kodaikanal Call Taxi & Cab Service <br />
              <span className="text-emerald-400 drop-shadow">Kodai MB Cabs Holidays</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-xl drop-shadow"
            >
              Book the #1 <strong>Kodaikanal Call Taxi Service</strong> and <strong>Kodai Cab Service</strong>. Experience 5 official sightseeing packages, experienced local hill drivers, 100% fixed transparent brochure rates, and 24x7 outstation pickups.
            </motion.p>

            {/* Interactive View Selector Indicator */}
            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs text-slate-300 font-medium mr-2">Explore Views:</span>
              {heroBackgrounds.map((bg, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBgIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeBgIndex === idx
                      ? 'w-8 bg-emerald-400'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  title={bg.title}
                />
              ))}
            </div>

            {/* Key Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 text-slate-300 text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>15+ Yrs Local Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% Fixed Brochure Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Sanitized Sedan & SUVs</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Spacious, Elegant Floating Booking Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-white/40 relative">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white p-0.5 shadow border border-slate-200 flex-shrink-0 overflow-hidden">
                    <img
                      src="/logo.png"
                      alt="MB Travels Logo"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-black font-heading text-[#064E3B]">
                      Instant Cab Booking
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Fixed official brochure rates</p>
                  </div>
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-900">
                  {pricingMode === 'SEASON' ? 'Peak Season' : 'Off-Season'}
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {/* Select Tour Package */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                    1. Choose Sightseeing Circuit
                  </label>
                  <select
                    value={selectedPkgSlug}
                    onChange={(e) => setSelectedPkgSlug(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-none shadow-sm"
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

                {/* Vehicle Selection */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                    2. Select Vehicle Type
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedVehicle('Sedan')}
                      className={`py-3 px-3.5 rounded-xl border-2 text-xs font-black flex items-center justify-center gap-2 transition-all ${
                        selectedVehicle === 'Sedan'
                          ? 'border-[#155E38] bg-emerald-50 text-[#064E3B] shadow-sm'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Car className="w-4 h-4 text-[#155E38]" />
                      <span>Sedan (4 Seats)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedVehicle('SUV')}
                      className={`py-3 px-3.5 rounded-xl border-2 text-xs font-black flex items-center justify-center gap-2 transition-all ${
                        selectedVehicle === 'SUV'
                          ? 'border-[#155E38] bg-emerald-50 text-[#064E3B] shadow-sm'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Car className="w-4 h-4 text-[#155E38]" />
                      <span>SUV (7 Seats)</span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Calculated Fare Strip */}
                <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      All-Inclusive Brochure Tariff
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#064E3B]">
                      {formatCurrency(activeFare)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-[#155E38] text-white px-2.5 py-1 rounded-full font-bold">
                      Fuel + Driver Included
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  <button
                    onClick={() =>
                      openBookingModal({
                        packageSlug: selectedPkgSlug,
                        vehicleType: selectedVehicle
                      })
                    }
                    className="w-full bg-[#155E38] hover:bg-[#0B3B24] text-white font-black py-4 px-4 rounded-2xl shadow-xl shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 text-sm active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Book {currentPkg.name} ({selectedVehicle})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={generateWhatsAppBookingUrl({
                      phone: settings.phone1,
                      packageName: currentPkg.name,
                      vehicleType: selectedVehicle
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3 px-4 rounded-2xl shadow transition-all flex items-center justify-center gap-2 text-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Reservation</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
