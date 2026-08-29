'use client';

import React, { useState } from 'react';
import { Compass, Calendar, Users, Car, MapPin, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context';
import { generateWhatsAppBookingUrl } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function CustomTourPage() {
  const { settings, addBooking, pricingMode } = useApp();

  const [days, setDays] = useState<number | ''>(2);
  const [people, setPeople] = useState<number | ''>(4);
  const [travelDate, setTravelDate] = useState('');
  const [vehicle, setVehicle] = useState<'Sedan' | 'SUV'>('SUV');
  const [pickupCity, setPickupCity] = useState('Madurai Airport / Station');
  const [stayRequired, setStayRequired] = useState(true);
  const [selectedSpots, setSelectedSpots] = useState<string[]>([
    'Coaker’s Walk',
    'Pillar Rocks',
    'Pine Forest',
    'Poombarai Village',
    'Mannavanur Lake'
  ]);
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const availableSpots = [
    'Coaker’s Walk',
    'Pillar Rocks',
    'Guna Cave',
    'Pine Tree Forest',
    'Green Valley View',
    'Kodaikanal Lake',
    'Silver Cascade Falls',
    'Kurinji Andavar Temple',
    'Berijam Lake (Forest Dept Permit)',
    'Poombarai Terraced Village',
    'Mannavanur Lake & Meadows',
    'Sheep & Rabbit Farm',
    'Dolphin’s Nose Trek',
    'Vattakanal Falls'
  ];

  const toggleSpot = (spot: string) => {
    if (selectedSpots.includes(spot)) {
      setSelectedSpots(selectedSpots.filter((s) => s !== spot));
    } else {
      setSelectedSpots([...selectedSpots, spot]);
    }
  };

  const finalDays = typeof days === 'number' && days > 0 ? days : 1;
  const finalPeople = typeof people === 'number' && people > 0 ? people : 2;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !travelDate) {
      alert('Please fill in your name, contact phone, and travel date.');
      return;
    }

    addBooking({
      customerName: name,
      phone,
      email: '',
      travelDate,
      passengers: finalPeople,
      packageSlug: 'custom-tour',
      packageName: `Custom ${finalDays}-Day Tour (${selectedSpots.length} Spots)`,
      vehicleType: vehicle,
      pickupLocation: pickupCity,
      dropLocation: 'Kodaikanal / Return',
      stayRequired,
      specialRequests: `Custom spots: ${selectedSpots.join(', ')}. Notes: ${notes}`,
      calculatedPrice: 0,
      pricingMode
    });

    setIsSuccess(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const customWhatsAppUrl = generateWhatsAppBookingUrl({
    phone: settings.phone1,
    packageName: `Custom ${finalDays}-Day Tour (${selectedSpots.join(', ')})`,
    vehicleType: vehicle,
    travelDate,
    passengers: finalPeople,
    pickup: pickupCity,
    drop: 'Kodaikanal / Return',
    stayRequired,
    customerName: name
  });

  return (
    <div className="min-h-screen bg-[#FAFCFA] text-slate-900 pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 inline-flex items-center gap-1.5 mb-2">
            <Compass className="w-3.5 h-3.5 text-emerald-700" /> TAILOR-MADE ITINERARY BUILDER
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-[#0B3B24] mt-2">
            YOUR TRIP. YOUR ROUTE. YOUR KODAIKANAL.
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Choose your travel duration, pickup location, preferred vehicle, and the exact sightseeing spots you want to visit.
          </p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleCustomSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8">
            {/* Step 1: Trip Scope */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-[#0B3B24] flex items-center gap-2 border-b pb-2 border-slate-100">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center">1</span>
                Trip Duration & Passengers
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Trip Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={days}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setDays('');
                      } else {
                        const parsed = parseInt(val, 10);
                        setDays(isNaN(parsed) ? '' : parsed);
                      }
                    }}
                    onBlur={() => {
                      if (days === '' || days < 1) {
                        setDays(1);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    No. of Passengers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={people}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setPeople('');
                      } else {
                        const parsed = parseInt(val, 10);
                        setPeople(isNaN(parsed) ? '' : parsed);
                      }
                    }}
                    onBlur={() => {
                      if (people === '' || people < 1) {
                        setPeople(1);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Preferred Vehicle
                  </label>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value as 'Sedan' | 'SUV')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
                  >
                    <option value="Sedan">Sedan (Dzire / Etios - 4 Pax)</option>
                    <option value="SUV">SUV (Innova / Ertiga - 7 Pax)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Pickup Location & Travel Date */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-[#0B3B24] flex items-center gap-2 border-b pb-2 border-slate-100">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center">2</span>
                Pickup Station & Start Date
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Pickup Location / City
                  </label>
                  <select
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
                  >
                    <option value="Kodaikanal Town / Bus Stand">Kodaikanal Town / Hotel</option>
                    <option value="Madurai Airport / Railway Station">Madurai Airport / Railway Station</option>
                    <option value="Kodai Road Railway Station">Kodai Road Railway Station</option>
                    <option value="Dindigul Railway Station">Dindigul Junction</option>
                    <option value="Coimbatore Airport / Railway Station">Coimbatore Airport / Station</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Travel Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Choose Places */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-[#0B3B24] flex items-center gap-2 border-b pb-2 border-slate-100">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center">3</span>
                Select Places You Wish to Visit ({selectedSpots.length} selected)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableSpots.map((spot) => {
                  const isChecked = selectedSpots.includes(spot);
                  return (
                    <div
                      key={spot}
                      onClick={() => toggleSpot(spot)}
                      className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{spot}</span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Contact Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-[#0B3B24] flex items-center gap-2 border-b pb-2 border-slate-100">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center">4</span>
                Your Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9942472778"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Special Preferences or Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Need family cottage booking, senior citizen assistance, wheelchair friendly stops, etc."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center gap-3">
                <input
                  type="checkbox"
                  id="customStay"
                  checked={stayRequired}
                  onChange={(e) => setStayRequired(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="customStay" className="text-xs text-slate-800 font-medium cursor-pointer">
                  Include Scenic Cottage / Resort accommodation options in the quote
                </label>
              </div>
            </div>

            {/* Action Submit */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-[#0B3B24] hover:bg-[#1E5128] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Request Custom Itinerary & Quote</span>
              </button>

              <a
                href={customWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 px-6 rounded-xl shadow transition-all flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send on WhatsApp</span>
              </a>
            </div>
          </form>
        ) : (
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#0B3B24]">Custom Tour Request Submitted!</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Thank you, <strong>{name}</strong>! MB Cabs team will prepare a customized quote for your {days}-day Kodaikanal trip with {selectedSpots.length} chosen spots.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <a
                href={customWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white font-bold py-3 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" /> Message Driver on WhatsApp
              </a>
              <button
                onClick={() => setIsSuccess(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-5 rounded-xl text-sm"
              >
                Create Another Tour
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
