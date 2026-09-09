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
    { label: 'Packages', href: '/#packages', sectionKey: 'packages' },
    { label: 'Places', href: '/places', sectionKey: 'places' },
    { label: 'Stays', href: '/stays', sectionKey: 'stays' },
    { label: 'Custom Tour', href: '/custom-tour', sectionKey: 'custom' },
    { label: 'Contact', href: '/contact', sectionKey: 'contact' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div
          className={`transition-all duration-300 border-b ${
            isScrolled
              ? 'bg-slate-950/95 backdrop-blur-xl border-white/10 shadow-xl py-2 sm:py-2.5'
              : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent border-transparent py-2.5 sm:py-3.5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
            
            {/* 1. BRAND LOGO */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white p-0.5 shadow-md group-hover:scale-105 transition-transform flex-shrink-0 overflow-hidden border border-emerald-400/40">
                <img
                  src="/logo.png"
                  alt="MB Travels & Kodai MB Cabs Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-tight">
                  <span className="font-black text-base sm:text-lg font-heading text-white tracking-tight">MB TRAVELS</span>
                  <span className="bg-emerald-500/20 text-emerald-300 font-bold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded uppercase border border-emerald-400/30">CABS</span>
                </div>
                <span className="text-[10px] tracking-wider font-semibold text-slate-300 -mt-0.5">
                  Kodai Call Taxi Service
                </span>
              </div>
            </Link>

            {/* 2. DYNAMIC SCROLLSPY NAV LINKS */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
              {navLinks.map((link) => {
                const isPathActive = pathname === link.href;
                const isSectionActive = pathname === '/' && activeSection === link.sectionKey;
                const isActive = isPathActive || isSectionActive;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-xs xl:text-[13px] font-bold tracking-tight transition-colors py-1 relative whitespace-nowrap ${
                      isActive
                        ? 'text-emerald-400 font-black'
                        : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-emerald-400 rounded-full shadow-sm animate-in fade-in" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* 3. RIGHT CONTROLS */}
            <div className="hidden sm:flex items-center gap-2.5 flex-shrink-0">
              
              {/* THEME TOGGLE BUTTON */}
              <button
                type="button"
                onClick={toggleColorTheme}
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center gap-1 text-xs font-bold transition-all"
                title={`Switch to ${colorTheme === 'light' ? 'Dark' : 'Light'} Mode`}
              >
                {colorTheme === 'light' ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-[10px] text-slate-200 hidden md:inline">Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px] text-slate-200 hidden md:inline">Light</span>
                  </>
                )}
              </button>

              {/* Dynamic Season Status Tag */}
              <div
                className={`text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1 whitespace-nowrap ${
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
                <span>{pricingMode === 'SEASON' ? 'Peak' : 'Off-Season'}</span>
              </div>

              {/* Call Direct */}
              <a
                href={`tel:${settings.phone1}`}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all flex-shrink-0"
                title="Call MB Cabs"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-300" />
              </a>

              {/* Book Cab Pill Button */}
              <button
                onClick={() => openBookingModal()}
                className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-black px-4 py-1.5 rounded-full shadow hover:shadow-emerald-400/30 transition-all flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
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
