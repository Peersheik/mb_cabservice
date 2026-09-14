'use client';

import React, { useState } from 'react';
import { Star, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { useApp } from '@/lib/context';

export const ReviewsAndFaqSection: React.FC = () => {
  const { reviews } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why choose Kodai MB Cabs over other Kodai call taxi service providers?',
      a: 'Kodai MB Cabs provides guaranteed on-time pickups, 15+ years experienced mountain drivers, 100% transparent brochure rates with no hidden hill charges, sanitized AC and non-AC vehicles, and 24/7 dedicated telephone and WhatsApp dispatch.'
    },
    {
      q: 'How can I book a reliable Kodai cab service for sightseeing packages?',
      a: 'You can instantly book your Kodai cab service online via our fare calculator or WhatsApp us directly at +91 99424 72778. Choose from 5 official Kodaikanal tour circuits including Local Tour, City Tour, Berijam Lake Forest Tour, Poombarai Village, and Picnic Trek Tour.'
    },
    {
      q: 'How does Kodai MB Cabs calculate sightseeing tour pricing?',
      a: 'We offer straightforward, all-inclusive pricing per vehicle (Sedan up to 4 pax or SUV up to 7 pax). The fare covers fuel, driver allowances, parking, and all scheduled stops on your chosen package. There are no hidden driver fees.'
    },
    {
      q: 'What is the difference between Off-Season and Season pricing?',
      a: 'During peak holiday months (April to June, Diwali, and Year-End vacations), hill station taxi rates slightly adjust across Tamil Nadu tourism norms. The active rate is clearly displayed on our website.'
    },
    {
      q: 'How do I obtain Forest Department permission for Berijam Lake (Forest Tour)?',
      a: 'Berijam Lake is a strictly protected biodiversity reserve with daily government entry quotas. When you book our Forest Tour, our experienced local drivers assist in coordinating the necessary Forest Department vehicle permit and entry paperwork.'
    },
    {
      q: 'Do you offer 24x7 pickup from Madurai, Dindigul, or Kodai Road Railway Station?',
      a: 'Yes! As Kodaikanal’s leading call taxi service, we provide 24x7 one-way and round-trip transfers from Madurai Airport/Station, Dindigul Junction, Kodai Road Railway Station, and Coimbatore Airport directly to your Kodaikanal hotel.'
    },
    {
      q: 'Can we customize the places we want to visit in a day?',
      a: 'Absolutely. While our 5 official brochure packages are optimized for geographic proximity and sightseeing flow, our drivers gladly customize stops to suit your family’s pace.'
    }
  ];

  return (
    <section className="py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Reviews Sub-section */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>VERIFIED GOOGLE REVIEWS & RATINGS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#0B3B24] mt-1">
              LOVED BY TRAVELLERS ACROSS INDIA
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
              Real 5-star experiences from families, honeymooners, and corporate groups who chose <strong>Kodai MB Cabs Holidays</strong>.
            </p>

            {/* Official Google Reviews Badge Bar */}
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200 text-sm font-black text-blue-600">
                  G
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-lg text-slate-900 leading-none">4.9</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold block">Google Verified Traveler Rating</span>
                </div>
              </div>

              <div className="h-6 w-px bg-slate-200 hidden sm:block" />

              <a
                href="https://www.google.com/travel/hotels/entity/CgoIsuv5l_n6maokEAE/reviews?q=kodaikanal%20mb%20cabs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow flex items-center gap-1.5"
              >
                <span>Read & Post on Google</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-50 border border-slate-200/90 p-6 rounded-3xl flex flex-col justify-between hover:shadow-lg transition-shadow relative group"
              >
                <Quote className="w-8 h-8 text-emerald-800/10 absolute top-4 right-4" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    {rev.source === 'Google' && (
                      <span className="text-[10px] bg-blue-50 text-blue-700 font-extrabold px-2 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
                        <span className="font-bold">G</span> Google Review
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 mt-4">
                  <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                    <span>{rev.name}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between mt-0.5">
                    <span>{rev.location}</span>
                    <span>{rev.date}</span>
                  </div>
                  {rev.tourTaken && (
                    <div className="mt-2 text-[10px] text-emerald-800 font-medium bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 truncate">
                      Tour: {rev.tourTaken}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Sub-section */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-slate-100">
          <div className="text-center mb-12">
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 inline-flex items-center gap-1 mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-700" /> COMMON QUESTIONS
            </span>
            <h2 className="text-3xl font-black font-heading text-[#0B3B24]">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/60 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:text-[#0B3B24]"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
