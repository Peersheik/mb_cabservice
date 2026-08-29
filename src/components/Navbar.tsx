'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Menu, X, Car, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
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
    { label: '5 Packages', href: '/#packages' },
    { label: 'Sightseeing', href: '/places' },
    { label: 'Stays', href: '/stays' },
    { label: 'Custom Tour', href: '/custom-tour' },
    { label: 'Travel Guide', href: '/kodaikanal-tourism' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div
          className={`transition-all duration-300 border-b ${
            isScrolled
              ? 'bg-slate-950/90 backdrop-blur-xl border-white/10 shadow-2xl py-3'
              : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent border-transparent py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            
            {/* 1. BRAND LOGO (Left Aligned, Clean Hierarchy) */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-[#155E38] flex items-center justify-center text-slate-950 shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-black text-lg sm:text-xl font-heading text-white tracking-tight">MB CABS</span>
                  <span className="text-emerald-400 font-bold text-xs sm:text-sm tracking-widest uppercase">HOLIDAYS</span>
                </div>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-300 mt-1">
                  MB Travels • Kodaikanal
                </span>
              </div>
            </Link>

            {/* 2. MAIN NAV LINKS (Center Aligned, Balanced Spacing) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-xs xl:text-sm font-bold tracking-tight transition-colors py-1 relative whitespace-nowrap ${
                      isActive
                        ? 'text-emerald-400 font-black'
                        : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-400 rounded-full shadow-sm" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* 3. RIGHT CONTROLS & CTA (Evenly Spaced, Vertically Centered) */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              {/* Dynamic Season Status Tag */}
              <div
                className={`text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full border flex items-center gap-1.5 whitespace-nowrap ${
                  pricingMode === 'SEASON'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    pricingMode === 'SEASON' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
                  }`}
                />
                <span>{pricingMode === 'SEASON' ? 'Peak Season' : 'Off-Season'}</span>
              </div>

              {/* Call Direct */}
              <a
                href={`tel:${settings.phone1}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all flex-shrink-0"
                title="Call MB Cabs"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
              </a>

              {/* Book Cab Pill Button */}
              <button
                onClick={() => openBookingModal()}
                className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs sm:text-sm font-black px-5 py-2 rounded-full shadow-lg shadow-emerald-950/50 hover:shadow-emerald-400/30 transition-all flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Cab</span>
              </button>
            </div>

            {/* Mobile Hamburger Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => openBookingModal()}
                className="bg-emerald-400 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow"
              >
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border border-white/20 text-white bg-black/40 backdrop-blur-md"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Full Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-50 flex flex-col justify-between p-6 text-white pt-20 animate-in fade-in duration-200">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <div className="text-xs uppercase font-bold text-emerald-400 tracking-widest pb-2 border-b border-white/10">
                Menu Navigation
              </div>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 text-lg font-black text-white hover:text-emerald-400 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-emerald-400 font-bold">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
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
                className="w-full bg-emerald-600 text-white py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" /> Call {settings.phone1}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
