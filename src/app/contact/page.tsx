'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context';
import { generateWhatsAppBookingUrl } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const { settings, addBooking, pricingMode } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    addBooking({
      customerName: name,
      phone,
      email,
      travelDate: 'General Enquiry',
      passengers: 2,
      packageSlug: 'general-enquiry',
      packageName: 'General Contact Enquiry',
      vehicleType: 'Sedan',
      pickupLocation: 'Kodaikanal',
      dropLocation: 'Kodaikanal',
      stayRequired: false,
      specialRequests: message,
      calculatedPrice: 0,
      pricingMode
    });

    setSubmitted(true);
    try {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-[#FAFCFA] text-slate-900 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 inline-flex items-center gap-1.5 mb-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" /> LOCAL OFFICE & DRIVER DISPATCH
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-[#0B3B24] mt-2">
            Find Us in Kodaikanal
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Have questions about Kodaikanal routes, weather conditions, forest permissions, or outstation taxi fares? Reach out to our local team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information & Map */}
          <div className="lg:col-span-6 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              <h2 className="text-2xl font-bold font-heading text-[#0B3B24]">
                MB CABS HOLIDAYS & MB TRAVELS
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900">Head Office Address:</strong>
                    <span>{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900">Phone Numbers (Direct):</strong>
                    <a href={`tel:${settings.phone1}`} className="hover:text-emerald-700 block font-semibold">
                      {settings.phone1} (P. Murugaboopathi)
                    </a>
                    <a href={`tel:${settings.phone2}`} className="hover:text-emerald-700 block font-semibold">
                      {settings.phone2}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900">Email Address:</strong>
                    <a href={`mailto:${settings.email}`} className="hover:text-emerald-700">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900">Operating Hours:</strong>
                    <span>24x7 Cab Dispatch & Sightseeing Assistance</span>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Action */}
              <div className="pt-2">
                <a
                  href={generateWhatsAppBookingUrl({ phone: settings.phone1 })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3 px-5 rounded-xl shadow flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> Instant WhatsApp Message
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
              <h2 className="text-2xl font-bold font-heading text-[#0B3B24] mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Fill in your details below and our team will get back to you within minutes.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      How Can We Help You?
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Ask about sightseeing packages, cottage recommendations, outstation taxi fares, etc."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0B3B24] hover:bg-[#1E5128] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Send Message to MB Cabs</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B3B24]">Message Received!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, {name}. Our Kodaikanal team will reach out to you via WhatsApp / phone shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-xl text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
