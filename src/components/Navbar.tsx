'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Menu, X, Car, Sparkles, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';
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
      if (window.scrollY > 30) {
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
    { label: '5 Tour Packages', href: '/#packages' },
    { label: 'Sightseeing Places', href: '/places' },
    { label: 'Stays & Cottages', href: '/stays' },
    { label: 'Custom Tour', href: '/custom-tour' },
    { label: 'Travel Guide', href: '/kodaikanal-tourism' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Sleek Glassmorphic Floating Header */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-black/85 backdrop-blur-xl py-3 border-b border-white/10 shadow-2xl'
              : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-[#155E38] flex items-center justify-center text-white shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-transform flex-shrink-0">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-black text-lg sm:text-xl font-heading text-white leading-none flex items-center gap-1.5 drop-shadow">
                  <span>MB CABS</span>
                  <span className="text-emerald-400 font-bold text-xs sm:text-sm tracking-widest uppercase">HOLIDAYS</span>
                </div>
                <p className="text-[10px] tracking-wider uppercase font-semibold text-emerald-300 mt-0.5">
                  MB Travels • Kodaikanal
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 shadow-inner">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-xs xl:text-sm font-bold tracking-tight px-3.5 py-1.5 rounded-full transition-all ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTA Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Season Pill */}
              <div className={`text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full backdrop-blur-md border flex items-center gap-1.5 ${
                pricingMode === 'SEASON'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${pricingMode === 'SEASON' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                {pricingMode === 'SEASON' ? 'Season Rates' : 'Off-Season Rates'}
              </div>

              {/* Call Driver Button */}
              <a
                href={`tel:${settings.phone1}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all"
                title="Call MB Cabs"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
              </a>

              {/* Book Cab Trigger */}
              <button
                onClick={() => openBookingModal()}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black px-5 py-2.5 rounded-full shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Book Cab</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => openBookingModal()}
                className="bg-emerald-500 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow"
              >
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border border-white/20 text-white bg-black/40 backdrop-blur-md"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full Screen Menu */}
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
                    <ArrowUpRight className="w-4 h-4 text-emerald-400 opacity-60" />
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
