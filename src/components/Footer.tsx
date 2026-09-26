'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Compass, Heart, ArrowUpRight } from 'lucide-react';
import { useApp } from '@/lib/context';
import { generateWhatsAppBookingUrl } from '@/lib/utils';

export const Footer: React.FC = () => {
  const { settings, packages } = useApp();

  return (
    <footer className="bg-[#0A1912] text-white relative overflow-hidden pt-16 pb-24 lg:pb-12 border-t border-emerald-950/80">
      {/* Background Mist Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/40">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white p-1 flex items-center justify-center shadow-lg border border-emerald-500/40 flex-shrink-0 relative overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="MB Travels & Kodai MB Cabs Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-xl font-heading tracking-tight text-white">
                  MB TRAVELS & KODAI CABS
                </h3>
                <p className="text-xs text-emerald-400 font-semibold tracking-widest uppercase">
                  #1 Kodai Call Taxi Service • Kodai Cab Service
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Kodai MB Cabs is Kodaikanal&apos;s leading call taxi and cab service provider. We provide clean, comfortable cabs, seasoned mountain drivers, scenic sightseeing circuits, and personalized hill-station holiday experiences.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={generateWhatsAppBookingUrl({ phone: settings.phone1 })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                title="WhatsApp Primary: +91 99424 72778"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              {settings.extraWhatsappNumbers && settings.extraWhatsappNumbers.length > 0 && (
                <a
                  href={generateWhatsAppBookingUrl({ phone: settings.extraWhatsappNumbers[0] })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                  title={`WhatsApp 2: ${settings.extraWhatsappNumbers[0]}`}
                >
                  <span className="text-[10px] font-black">WA 2</span>
                </a>
              )}

              {settings.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
                  title="YouTube Channel - MB Cabs Kodaikanal"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}

              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-pink-600/20 border border-pink-500/40 text-pink-400 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all shadow-sm"
                  title="Instagram Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}

              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  title="Facebook Page"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </a>
              )}

              <a
                href={`tel:${settings.phone1}`}
                className="w-10 h-10 rounded-full bg-emerald-800/30 border border-emerald-700/50 text-emerald-300 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                title={`Call MB Cabs: ${settings.phone1}`}
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="w-10 h-10 rounded-full bg-emerald-800/30 border border-emerald-700/50 text-emerald-300 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                title="Email MB Cabs"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Sightseeing Packages
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {packages.map((pkg) => (
                <li key={pkg.slug}>
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>{pkg.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-emerald-500 opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Explore & Stays
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/places" className="hover:text-emerald-300 transition-colors">
                  Sightseeing Places
                </Link>
              </li>
              <li>
                <Link href="/stays" className="hover:text-emerald-300 transition-colors">
                  Cottages & Resorts
                </Link>
              </li>
              <li>
                <Link href="/custom-tour" className="hover:text-emerald-300 transition-colors">
                  Custom Tour Builder
                </Link>
              </li>
              <li>
                <Link href="/kodaikanal-tourism" className="hover:text-emerald-300 transition-colors">
                  Kodaikanal Travel Guide
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-300 transition-colors text-slate-500 text-xs">
                  Admin CMS Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Local Office Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Local Office
            </h4>
            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <a href={`tel:${settings.phone1}`} className="hover:text-emerald-300 block">
                    {settings.phone1}
                  </a>
                  <a href={`tel:${settings.phone2}`} className="hover:text-emerald-300 block">
                    {settings.phone2}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-emerald-300 truncate">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MB Cabs Holidays & MB Travels. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> TN Govt Registered Tourism Partner
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
