'use client';

import React from 'react';
import Link from 'next/link';
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
              <div className="w-14 h-14 rounded-full bg-white p-1 flex items-center justify-center shadow-lg border border-emerald-500/40 flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="MB Travels & Kodai MB Cabs Logo"
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
                className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all"
                title="WhatsApp MB Cabs"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={`tel:${settings.phone1}`}
                className="w-10 h-10 rounded-full bg-emerald-800/30 border border-emerald-700/50 text-emerald-300 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
                title="Call MB Cabs"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="w-10 h-10 rounded-full bg-emerald-800/30 border border-emerald-700/50 text-emerald-300 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
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
