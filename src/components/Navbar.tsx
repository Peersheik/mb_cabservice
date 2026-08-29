'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Menu, X, Car, Sparkles, Sun, Moon } from 'lucide-react';
import { useApp } from '@/lib/context';
import { generateWhatsAppBookingUrl } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { settings, pricingMode, openBookingModal, colorTheme, toggleColorTheme } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  const isAdminPage = pathname.startsWith('/admin');

  // Scrollspy to detect active storytelling section automatically while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Only calculate section offsets if on home page
      if (pathname === '/') {
        const sections = [
          { id: 'hero', name: 'home' },
          { id: 'packages', name: 'packages' },
          { id: 'journey-starts', name: 'journey' },
          { id: 'places-story', name: 'places' },
          { id: 'stays-story', name: 'stays' }
        ];

        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200) {
              setActiveSection(sections[i].name);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  if (isAdminPage) return null;

  const navLinks = [
    { label: 'Home', href: '/', sectionKey: 'home' },
    { label: '5 Packages', href: '/#packages', sectionKey: 'packages' },
    { label: 'Sightseeing', href: '/places', sectionKey: 'places' },
    { label: 'Stays', href: '/stays', sectionKey: 'stays' },
    { label: 'Custom Tour', href: '/custom-tour', sectionKey: 'custom' },
    { label: 'Travel Guide', href: '/kodaikanal-tourism', sectionKey: 'guide' },
    { label: 'Contact', href: '/contact', sectionKey: 'contact' }
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
            
            {/* 1. BRAND LOGO */}
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

            {/* 2. DYNAMIC SCROLLSPY NAV LINKS */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isPathActive = pathname === link.href;
                const isSectionActive = pathname === '/' && activeSection === link.sectionKey;
                const isActive = isPathActive || isSectionActive;

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
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-400 rounded-full shadow-sm animate-in fade-in" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* 3. RIGHT CONTROLS */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              
              {/* THEME TOGGLE BUTTON */}
              <button
                type="button"
                onClick={toggleColorTheme}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center gap-1.5 text-xs font-bold transition-all"
                title={`Switch to ${colorTheme === 'light' ? 'Dark' : 'Light'} Mode`}
              >
                {colorTheme === 'light' ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-[11px] text-slate-200">Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px] text-slate-200">Light</span>
                  </>
                )}
              </button>

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

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={toggleColorTheme}
                className="p-2 rounded-xl border border-white/20 text-white bg-black/40 backdrop-blur-md"
              >
                {colorTheme === 'light' ? <Moon className="w-4 h-4 text-amber-300" /> : <Sun className="w-4 h-4 text-amber-400" />}
              </button>

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
                {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
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
              <div className="text-xs uppercase font-bold text-emerald-400 tracking-widest pb-2 border-b border-white/10 flex items-center justify-between">
                <span>Menu Navigation</span>
                <button
                  onClick={toggleColorTheme}
                  className="flex items-center gap-1 text-xs bg-white/10 px-2.5 py-1 rounded-full text-slate-200"
                >
                  {colorTheme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                  <span>{colorTheme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
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
