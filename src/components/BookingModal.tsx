'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Car, MessageCircle, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/context';
import { formatCurrency, generateWhatsAppBookingUrl } from '@/lib/utils';
import confetti from 'canvas-confetti';

export const BookingModal: React.FC = () => {
  const {
    activeBookingModal,
    closeBookingModal,
    packages,
    pricingMode,
    settings,
    addBooking
  } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState<number | ''>(2);
  const [selectedPackageSlug, setSelectedPackageSlug] = useState('local-tour');
  const [vehicleType, setVehicleType] = useState<'Sedan' | 'SUV'>('Sedan');
  const [pickup, setPickup] = useState('Kodaikanal Bus Stand / Hotel');
  const [drop, setDrop] = useState('Kodaikanal Lake / Hotel');
  const [stayRequired, setStayRequired] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedBookingId, setSubmittedBookingId] = useState('');
  const [ownerAlertUrl, setOwnerAlertUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentChoice, setPaymentChoice] = useState<'PAY_DRIVER' | 'PREPAY_DEPOSIT'>('PAY_DRIVER');
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (activeBookingModal.packageSlug) {
      setSelectedPackageSlug(activeBookingModal.packageSlug);
    }
    if (activeBookingModal.vehicleType) {
      setVehicleType(activeBookingModal.vehicleType);
    }
    if (activeBookingModal.isOpen) {
      setIsSubmitted(false);
      setErrorMessage('');
      setOwnerAlertUrl('');
    }
  }, [activeBookingModal]);

  if (!activeBookingModal.isOpen) return null;

  const currentPkg = packages.find((p) => p.slug === selectedPackageSlug) || packages[0];
  const isForestTourUnavailable = currentPkg.status === 'TEMPORARILY_UNAVAILABLE';

  const priceObj = currentPkg.pricing[vehicleType.toLowerCase() as 'sedan' | 'suv'];
  const activePrice = pricingMode === 'SEASON' && priceObj.season !== null ? priceObj.season : priceObj.offSeason;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !phone || !travelDate) {
      setErrorMessage('Please enter your name, contact number, and travel date.');
      return;
    }

    const finalPassengers = typeof passengers === 'number' && passengers > 0 ? passengers : 2;
    setIsSubmitting(true);

    try {
      const booking = await addBooking({
        customerName: name,
        phone,
        email: '',
        travelDate,
        passengers: finalPassengers,
        packageSlug: currentPkg.slug,
        packageName: currentPkg.name,
        vehicleType,
        pickupLocation: pickup,
        dropLocation: drop,
        stayRequired,
        specialRequests: paymentChoice === 'PREPAY_DEPOSIT' ? 'Deposit Prepayment Requested (Razorpay)' : 'Pay Driver Directly upon trip completion',
        calculatedPrice: activePrice,
        pricingMode,
        honeypot
      } as any);

      setSubmittedBookingId(booking.id);
      if (booking.ownerAlertUrl) {
        setOwnerAlertUrl(booking.ownerAlertUrl);
        // Automatically attempt to notify owner WhatsApp or open chat in background/new window
        try {
          window.open(booking.ownerAlertUrl, '_blank');
        } catch (e) {}
      }
      setIsSubmitted(true);

      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not process booking. Please try again or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = generateWhatsAppBookingUrl({
    phone: settings.phone1,
    packageName: currentPkg.name,
    vehicleType,
    travelDate,
    passengers: typeof passengers === 'number' && passengers > 0 ? passengers : 2,
    pickup,
    drop,
    stayRequired,
    customerName: name
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto relative border border-slate-200">
        <button
          onClick={closeBookingModal}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="p-6 sm:p-8">
            <div className="mb-6 flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow border border-slate-200 flex-shrink-0 overflow-hidden mt-0.5 relative">
                <Image
                  src="/logo.png"
                  alt="MB Travels Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#155E38] text-[11px] font-black tracking-wider uppercase px-3 py-0.5 rounded-full mb-1 border border-emerald-200">
                  KODAI MB CABS • DIRECT DISPATCH
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#064E3B]">
                  Book Your Kodaikanal Trip
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                  Fixed brochure pricing with experienced local hill drivers.
                </p>
              </div>
            </div>

            {/* BookMyShow-style Step Progress Bar */}
            <div className="flex items-center justify-between mb-5 px-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#155E38]">
                <span className="w-5 h-5 rounded-full bg-[#155E38] text-white flex items-center justify-center text-[10px]">1</span>
                <span>Select Tour</span>
              </div>
              <div className="h-0.5 flex-1 mx-2 bg-emerald-200"></div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#155E38] flex items-center justify-center text-[10px]">2</span>
                <span>Vehicle & Date</span>
              </div>
              <div className="h-0.5 flex-1 mx-2 bg-slate-200"></div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]">3</span>
                <span>Instant Ticket</span>
              </div>
            </div>

            {/* Price Banner with Highlighted Discount Note */}
            <div className="bg-[#155E38] text-white p-4 rounded-2xl mb-4 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold block">
                    {currentPkg.name} ({currentPkg.placesCount} Scenic Places)
                  </span>
                  <div className="text-2xl font-black mt-0.5 flex items-baseline gap-2">
                    <span>{formatCurrency(activePrice)}</span>
                    <span className="text-xs font-normal text-emerald-200">
                      / {vehicleType} ({pricingMode === 'SEASON' ? 'Peak Season' : 'Off-Season'})
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs text-emerald-200">
                  <span className="bg-emerald-800/90 px-2.5 py-1 rounded-lg font-bold border border-emerald-600/40">
                    Fuel + Driver Included
                  </span>
                </div>
              </div>

              {/* Requirement #1: Highlighted owner discount disclaimer banner */}
              <div className="mt-3 pt-2.5 border-t border-emerald-600/50 flex items-start gap-2 bg-emerald-950/40 p-2.5 rounded-xl">
                <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-200 leading-snug font-bold">
                  🏷️ Prices are not fixed! Kindly contact the owner to know the original discounted price.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Select Tour Package
                  </label>
                  <select
                    value={selectedPackageSlug}
                    onChange={(e) => setSelectedPackageSlug(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    {packages
                      .filter((p) => p.status !== 'HIDDEN')
                      .map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.name} ({p.placesCount} spots)
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Vehicle Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setVehicleType('Sedan')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        vehicleType === 'Sedan'
                          ? 'bg-[#155E38] text-white border-[#155E38] shadow'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Car className="w-3.5 h-3.5" /> Sedan (4 Pax)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVehicleType('SUV')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        vehicleType === 'SUV'
                          ? 'bg-[#155E38] text-white border-[#155E38] shadow'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Car className="w-3.5 h-3.5" /> SUV (7 Pax)
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Travel Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    No. of Passengers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={passengers}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setPassengers('');
                      } else {
                        const parsed = parseInt(val, 10);
                        setPassengers(isNaN(parsed) ? '' : parsed);
                      }
                    }}
                    onBlur={() => {
                      if (passengers === '' || passengers < 1) {
                        setPassengers(1);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Honeypot field (hidden for spam bot protection) */}
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

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center gap-3">
                <input
                  type="checkbox"
                  id="modalStayCheck"
                  checked={stayRequired}
                  onChange={(e) => setStayRequired(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="modalStayCheck" className="text-xs text-slate-800 font-bold cursor-pointer">
                  Need scenic Cottage / Resort / Homestay booking assistance in Kodaikanal
                </label>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Payment Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentChoice('PAY_DRIVER')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                      paymentChoice === 'PAY_DRIVER'
                        ? 'bg-[#155E38] text-white border-[#155E38] shadow'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>💵 Pay Driver Directly</span>
                    <span className="block text-[10px] opacity-80 font-normal mt-0.5">Pay cash or UPI after trip</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentChoice('PREPAY_DEPOSIT')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                      paymentChoice === 'PREPAY_DEPOSIT'
                        ? 'bg-[#155E38] text-white border-[#155E38] shadow'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>💳 Prepay / Deposit</span>
                    <span className="block text-[10px] opacity-80 font-normal mt-0.5">Razorpay Online Prepayment</span>
                  </button>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isForestTourUnavailable || isSubmitting}
                  className="flex-1 bg-[#155E38] hover:bg-[#0B3B24] disabled:bg-slate-400 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                  <span>
                    {isForestTourUnavailable
                      ? 'Currently Unavailable'
                      : isSubmitting
                      ? 'Confirming Booking...'
                      : 'Request Booking'}
                  </span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 px-5 rounded-xl shadow transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Instant WhatsApp
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-black text-[#064E3B]">
              Booking Request Received!
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
              Thank you, <strong>{name}</strong>. Reference ID: <span className="font-bold text-[#155E38] bg-emerald-50 px-2 py-0.5 rounded">{submittedBookingId}</span>. MB Cabs driver coordination team will call/WhatsApp you shortly.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 max-w-md mx-auto text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#155E38]">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Trip Dispatch Notification Sent</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Owner Murugan & the MB Cabs team received your booking details (Trip Date: <strong>{travelDate}</strong>, Vehicle: <strong>{vehicleType}</strong>).
              </p>
              {ownerAlertUrl && (
                <a
                  href={ownerAlertUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-black text-[#155E38] bg-white border border-emerald-300 px-3 py-1.5 rounded-lg shadow-sm hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Notify Murugan Directly on WhatsApp</span>
                </a>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow hover:bg-[#1EBE5D] transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <button
                onClick={closeBookingModal}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-5 rounded-xl text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
