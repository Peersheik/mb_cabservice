'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Menu, X, Car, Sparkles, MapPin, ChevronDown, Compass } from 'lucide-react';
import { useApp } from '@/lib/context';
import { generateWhatsAppBookingUrl } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { settings, pricingMode, openBookingModal } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdminPage = pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  if (isAdminPage) return null;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: '5 Tour Packages', href: '/#packages' },
    { label: 'Sightseeing Places', href: '/places' },
    { label: 'Stays & Cottages', href: '/stays' },
    { label: 'Custom Tour', href: '/custom-tour' },
    { label: 'Travel Guide', href: '/kodaikanal-tourism' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Top Info Strip */}
        <div className="bg-[#064E3B] text-white text-[11px] font-semibold py-1.5 px-4 hidden sm:block border-b border-emerald-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Fern Hill Road, Kodaikanal
              </span>
              <span className="text-emerald-500">•</span>
              <span className="text-emerald-100">Local Mountain Drivers with 15+ Yrs Experience</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-emerald-300">
                <span className={`w-2 h-2 rounded-full ${pricingMode === 'SEASON' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                <span className="font-bold uppercase tracking-wider text-[10px]">
                  {pricingMode === 'SEASON' ? 'Peak Season Rates Active' : 'Off-Season Rates Active'}
                </span>
              </div>
              <a href={`tel:${settings.phone1}`} className="hover:text-emerald-300 transition-colors">
                Call: {settings.phone1}
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-lg py-3 border-b border-slate-200'
              : 'bg-white/90 backdrop-blur-md py-4 border-b border-emerald-100 shadow-sm'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#155E38] to-[#0B3B24] flex items-center justify-center text-white shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform flex-shrink-0">
                <Car className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <div className="font-black text-lg sm:text-xl font-heading text-[#064E3B] leading-none flex items-center gap-1.5">
                  <span>MB CABS</span>
                  <span className="text-[#155E38] font-bold text-xs sm:text-sm tracking-wider uppercase">HOLIDAYS</span>
                </div>
                <p className="text-[10px] sm:text-[11px] tracking-wider uppercase font-bold text-emerald-700 mt-0.5">
                  MB Travels • Kodaikanal
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-bold tracking-tight transition-colors py-1 relative ${
                      isActive
                        ? 'text-[#155E38]'
                        : 'text-slate-700 hover:text-[#155E38]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#155E38] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTA Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* WhatsApp Quick Link */}
              <a
                href={generateWhatsAppBookingUrl({ phone: settings.phone1 })}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-[#155E38] hover:bg-emerald-100 transition-colors flex items-center justify-center"
                title="WhatsApp MB Cabs"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
              </a>

              {/* Book Trip Modal Button */}
              <button
                onClick={() => openBookingModal()}
                className="bg-[#155E38] hover:bg-[#0B3B24] text-white text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Book Cab</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => openBookingModal()}
                className="bg-[#155E38] text-white text-xs font-bold px-3 py-2 rounded-xl shadow active:scale-95"
              >
                Book Cab
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border border-slate-200 text-slate-800 bg-white hover:bg-slate-50 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
              </button>
            </div>
          </div>
        </div>

        {/* Full-Screen Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[60px] sm:top-[90px] bottom-0 bg-white z-50 flex flex-col justify-between p-6 shadow-2xl overflow-y-auto animate-in slide-in-from-top duration-300">
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Active Rate Status:</span>
                <span className="text-xs font-black text-[#064E3B] bg-white px-2.5 py-1 rounded-xl shadow-sm">
                  {pricingMode === 'SEASON' ? '🔥 Season Pricing' : '🟢 Off-Season Rates'}
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 text-base font-extrabold text-[#064E3B] flex items-center justify-between hover:text-[#155E38]"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-emerald-600 font-bold">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 space-y-3">
              <a
                href={generateWhatsAppBookingUrl({ phone: settings.phone1 })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" /> Instant WhatsApp Booking
              </a>

              <a
                href={`tel:${settings.phone1}`}
                className="w-full bg-[#155E38] text-white py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow"
              >
                <Phone className="w-5 h-5 text-emerald-300" /> Call {settings.phone1}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Quick Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <a
          href={`tel:${settings.phone1}`}
          className="flex-1 flex flex-col items-center justify-center py-1 text-slate-800 hover:text-[#155E38]"
        >
          <Phone className="w-4 h-4 text-[#155E38] mb-0.5" />
          <span className="text-[10px] font-black uppercase tracking-wider">Call Now</span>
        </a>

        <div className="w-[1px] h-6 bg-slate-200" />

        <a
          href={generateWhatsAppBookingUrl({ phone: settings.phone1 })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 text-[#25D366]"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-black uppercase tracking-wider">WhatsApp</span>
        </a>

        <div className="w-[1px] h-6 bg-slate-200" />

        <button
          onClick={() => openBookingModal()}
          className="flex-1 bg-[#155E38] text-white py-2 px-3 rounded-xl text-xs font-black shadow-md uppercase tracking-wider flex items-center justify-center gap-1.5 ml-2 active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span>Book Cab</span>
        </button>
      </div>
    </>
  );
};
