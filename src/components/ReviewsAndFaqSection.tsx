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
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 inline-flex items-center gap-1.5 mb-2">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> REAL EXPERIENCES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#0B3B24] mt-2">
              LOVED BY TRAVELLERS ACROSS INDIA
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Read real feedback from families, couples, and solo explorers who trusted MB Cabs Holidays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-50 border border-slate-200/90 p-6 rounded-3xl flex flex-col justify-between hover:shadow-lg transition-shadow relative"
              >
                <Quote className="w-8 h-8 text-emerald-800/10 absolute top-4 right-4" />
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
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
