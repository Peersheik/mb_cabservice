'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context';
import { generateWhatsAppBookingUrl } from '@/lib/utils';
import confetti from 'canvas-confetti';

export function ContactView() {
  const { settings, addBooking, pricingMode } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addBooking({
        customerName: name,
        phone,
        email,
        travelDate: new Date().toISOString().split('T')[0],
        passengers: 2,
        packageSlug: 'general-enquiry',
        packageName: 'General Contact Enquiry',
        vehicleType: 'Sedan',
        pickupLocation: 'Kodaikanal',
        dropLocation: 'Kodaikanal',
        stayRequired: false,
        specialRequests: message,
        calculatedPrice: 0,
        pricingMode,
        honeypot
      } as any);

      setSubmitted(true);
      try {
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      } catch (e) {}
    } catch (err: any) {
      alert(err.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFCFA] text-slate-900 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 inline-flex items-center gap-1.5 mb-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" /> LOCAL OFFICE & DRIVER DISPATCH
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-[#0B3B24] mt-2">
            Contact Kodai MB Cabs Holidays
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
                {settings.companyName}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Registered Office:</strong>
                    <span>{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Driver Dispatch & Enquiries:</strong>
                    <div className="flex flex-col gap-1 mt-1">
                      <a href={`tel:${settings.phone1}`} className="text-emerald-700 font-bold hover:underline">
                        {settings.phone1} (Primary)
                      </a>
                      {settings.phone2 && (
                        <a href={`tel:${settings.phone2}`} className="text-emerald-700 font-bold hover:underline">
                          {settings.phone2} (Secondary)
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Email:</strong>
                    <a href={`mailto:${settings.email}`} className="text-emerald-700 hover:underline">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Operating Hours:</strong>
                    <span>24 Hours / 7 Days a week (Mountain pickups anytime)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                <a
                  href={`tel:${settings.phone1}`}
                  className="bg-[#0B3B24] hover:bg-[#1E5128] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Dispatch Desk
                </a>

                <a
                  href={generateWhatsAppBookingUrl({
                    phone: settings.phone1,
                    packageName: 'Direct Contact Enquiry'
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Team
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-md overflow-hidden h-72">
              <iframe
                title="MB Cabs Kodaikanal Location"
                src={settings.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '1.25rem' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-6">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
              <h2 className="text-2xl font-bold font-heading text-[#0B3B24] mb-2">
                Send Us a Message
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mb-6">
                Receive instant assistance on local taxi tariffs, Ghat road travel safety, or custom package quotes.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: 'none' }}
                    aria-hidden="true"
                  />

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99424 72778"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Your Message or Travel Query
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please let us know your planned dates, pickup station, group size, or questions."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0B3B24] hover:bg-[#1E5128] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Travel Enquiry'}</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B3B24]">Enquiry Received!</h3>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto">
                    Thank you, <strong>{name}</strong>! Our driver desk has received your request and will call/WhatsApp you within 15 minutes.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-5 rounded-xl text-xs"
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
