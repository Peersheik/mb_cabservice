'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DollarSign,
  Package,
  CalendarCheck,
  Megaphone,
  Phone,
  CheckCircle2,
  Lock,
  LogOut,
  Save,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useApp } from '@/lib/context';
import { formatCurrency } from '@/lib/utils';

export default function AdminDashboardPage() {
  const {
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    pricingMode,
    togglePricingMode,
    packages,
    updatePackageStatus,
    quickUpdatePackagePrices,
    bookings,
    updateBookingStatus,
    reviews,
    addReview,
    deleteReview,
    settings,
    updateSettings,
    syncStatus
  } = useApp();

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'prices' | 'bookings' | 'forest' | 'phone' | 'reviews'>('prices');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // New Google Review Form State
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewDate, setNewReviewDate] = useState('September 2026');
  const [newReviewTour, setNewReviewTour] = useState('Local Tour');
  const [newReviewText, setNewReviewText] = useState('');

  const [phone1Input, setPhone1Input] = useState(settings.phone1 || '');
  const [phone2Input, setPhone2Input] = useState(settings.phone2 || '');
  const [addressInput, setAddressInput] = useState(settings.address || '');

  useEffect(() => {
    if (settings.phone1) setPhone1Input(settings.phone1);
    if (settings.phone2) setPhone2Input(settings.phone2);
    if (settings.address) setAddressInput(settings.address);
  }, [settings.phone1, settings.phone2, settings.address]);

  // Simple state for updating package prices easily
  const [priceForm, setPriceForm] = useState<{
    [pkgId: string]: {
      sedanOff: number | '';
      sedanSeason: number | '';
      suvOff: number | '';
      suvSeason: number | '';
    };
  }>({});

  useEffect(() => {
    if (packages.length > 0) {
      setPriceForm((prev) => {
        const next = { ...prev };
        packages.forEach((p) => {
          if (!next[p.id]) {
            next[p.id] = {
              sedanOff: p.pricing.sedan.offSeason,
              sedanSeason: p.pricing.sedan.season ?? p.pricing.sedan.offSeason + 500,
              suvOff: p.pricing.suv.offSeason,
              suvSeason: p.pricing.suv.season ?? p.pricing.suv.offSeason + 500
            };
          }
        });
        return next;
      });
    }
  }, [packages]);

  const handlePriceChange = (pkgId: string, field: 'sedanOff' | 'sedanSeason' | 'suvOff' | 'suvSeason', value: string) => {
    let parsed: number | '' = '';
    if (value !== '') {
      const num = parseInt(value, 10);
      parsed = isNaN(num) ? '' : num;
    }
    setPriceForm((prev) => ({
      ...prev,
      [pkgId]: {
        ...(prev[pkgId] || {
          sedanOff: '',
          sedanSeason: '',
          suvOff: '',
          suvSeason: ''
        }),
        [field]: parsed
      }
    }));
  };

  const handleSavePackagePrice = (pkgId: string) => {
    const vals = priceForm[pkgId];
    if (vals) {
      const sOff = typeof vals.sedanOff === 'number' ? vals.sedanOff : 0;
      const sSeason = typeof vals.sedanSeason === 'number' ? vals.sedanSeason : 0;
      const suvOff = typeof vals.suvOff === 'number' ? vals.suvOff : 0;
      const suvSeason = typeof vals.suvSeason === 'number' ? vals.suvSeason : 0;

      quickUpdatePackagePrices(pkgId, sOff, sSeason, suvOff, suvSeason);
      setSaveSuccessMsg(`Prices saved permanently for this package!`);
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    }
  };

  // Simple Login screen
  if (!isAdminAuthenticated) {
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setAuthError('');
      const success = await loginAdmin(usernameInput, passwordInput);
      if (!success) {
        setAuthError('Incorrect username or password. Please verify credentials.');
      }
    };

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 max-w-md w-full border border-slate-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-white p-1 flex items-center justify-center mx-auto mb-3 shadow-md border border-emerald-500/40 overflow-hidden relative">
              <Image
                src="/logo.png"
                alt="MB Travels Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <h1 className="text-2xl font-black font-heading text-[#064E3B]">
              MB Cabs Easy Admin
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Simple manager for Prices, Bookings & Emergency Notices
            </p>
          </div>

          {authError && (
            <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Username
              </label>
              <input
                type="text"
                required
                placeholder="mbcabservice"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#155E38] hover:bg-[#0B3B24] text-white font-bold py-3.5 px-4 rounded-xl shadow transition-all text-sm"
            >
              Log In to Easy Admin
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-emerald-800 font-bold hover:underline">
              ← Return to Customer Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Super Simple Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow border border-emerald-500/30 overflow-hidden flex-shrink-0 relative">
              <Image
                src="/logo.png"
                alt="MB Travels Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black font-heading text-[#064E3B]">
                  MB CABS EASY CONTROL PANEL
                </h1>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                  {syncStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Simple 1-click pricing and booking manager with permanent cloud storage
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-bold text-[#155E38] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1"
            >
              <span>View Customer Website</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={logoutAdmin}
              className="text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* 4 Simple Clean Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-2 overflow-x-auto border-t border-slate-100 pt-2 pb-2">
          <button
            onClick={() => setActiveTab('prices')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'prices'
                ? 'bg-[#155E38] text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>1. Pricing Mode ({pricingMode === 'SEASON' ? '🔥 Season Mode' : '🟢 Off-Season Mode'})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-[#155E38] text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>2. Customer Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('forest')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'forest'
                ? 'bg-[#155E38] text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>3. Forest Tour & Package Availability</span>
          </button>

          <button
            onClick={() => setActiveTab('phone')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'phone'
                ? 'bg-[#155E38] text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>4. Phone & WhatsApp Number</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'bg-[#155E38] text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>5. Google Reviews ({reviews.length})</span>
          </button>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {saveSuccessMsg && (
          <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* TAB 1: SIMPLE ATTRACTIVE PRICE UPDATER */}
        {activeTab === 'prices' && (
          <div className="space-y-6">
            {/* Step 1: Big Switch for Off-Season vs Season */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
              <span className="text-[11px] uppercase font-black text-slate-400 block mb-1">
                STEP 1: CHOOSE ACTIVE PRICING SEASON
              </span>
              <h2 className="text-2xl font-black font-heading text-[#064E3B]">
                Which pricing should show on the website right now?
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Click one button below. It instantly switches prices across all pages on every customer laptop & mobile.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    togglePricingMode('OFF_SEASON');
                    setSaveSuccessMsg('🟢 Switched to Off-Season Mode! All prices updated live.');
                    setTimeout(() => setSaveSuccessMsg(null), 3000);
                  }}
                  className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                    pricingMode === 'OFF_SEASON'
                      ? 'border-[#155E38] bg-emerald-50 shadow-md ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-[#064E3B]">🟢 Off-Season Mode</span>
                      {pricingMode === 'OFF_SEASON' && (
                        <span className="bg-[#155E38] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                          ACTIVE ON SITE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Shows standard brochure rates (e.g. ₹2,500 for Local Tour)</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold ${
                    pricingMode === 'OFF_SEASON' ? 'border-[#155E38] bg-[#155E38] text-white' : 'border-slate-300'
                  }`}>
                    {pricingMode === 'OFF_SEASON' && '✓'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    togglePricingMode('SEASON');
                    setSaveSuccessMsg('🔥 Switched to Peak Season Mode! All prices updated live.');
                    setTimeout(() => setSaveSuccessMsg(null), 3000);
                  }}
                  className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                    pricingMode === 'SEASON'
                      ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-amber-900">🔥 Peak Season Mode</span>
                      {pricingMode === 'SEASON' && (
                        <span className="bg-amber-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                          ACTIVE ON SITE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Shows peak holiday rates (e.g. ₹3,000 for Local Tour)</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold ${
                    pricingMode === 'SEASON' ? 'border-amber-500 bg-amber-500 text-white' : 'border-slate-300'
                  }`}>
                    {pricingMode === 'SEASON' && '✓'}
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Clear Card by Card Price Inputs */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              <div>
                <span className="text-[11px] uppercase font-black text-slate-400 block mb-1">
                  STEP 2: CUSTOMIZE FARE AMOUNTS (RUPEES)
                </span>
                <h3 className="text-xl font-black font-heading text-[#064E3B]">
                  Type new amounts for each package and click "Save Price"
                </h3>
              </div>

              <div className="space-y-6">
                {packages.map((pkg) => {
                  const entry = priceForm[pkg.id];
                  const formVals = {
                    sedanOff: entry?.sedanOff ?? pkg.pricing.sedan.offSeason,
                    sedanSeason: entry?.sedanSeason ?? (pkg.pricing.sedan.season ?? 3000),
                    suvOff: entry?.suvOff ?? pkg.pricing.suv.offSeason,
                    suvSeason: entry?.suvSeason ?? (pkg.pricing.suv.season ?? 4000)
                  };

                  return (
                    <div
                      key={pkg.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-all space-y-4 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                        <div>
                          <strong className="text-base font-black text-[#064E3B]">{pkg.name}</strong>
                          <span className="text-xs text-slate-500 block">{pkg.subtitle} ({pkg.placesCount} spots)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSavePackagePrice(pkg.id)}
                          className="bg-[#155E38] hover:bg-[#0B3B24] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 shadow transition-all self-start sm:self-auto"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save {pkg.name} Price</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                        {/* Sedan Off-Season */}
                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            Sedan (Off-Season ₹)
                          </label>
                          <input
                            type="number"
                            value={formVals.sedanOff}
                            onChange={(e) => handlePriceChange(pkg.id, 'sedanOff', e.target.value)}
                            className="w-full text-base font-black text-[#064E3B] px-2.5 py-1.5 border border-slate-300 rounded-lg"
                          />
                        </div>

                        {/* Sedan Season */}
                        <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200">
                          <label className="block text-[11px] font-bold text-amber-900 mb-1">
                            Sedan (Season ₹)
                          </label>
                          <input
                            type="number"
                            value={formVals.sedanSeason}
                            onChange={(e) => handlePriceChange(pkg.id, 'sedanSeason', e.target.value)}
                            className="w-full text-base font-black text-amber-900 px-2.5 py-1.5 border border-amber-300 rounded-lg"
                          />
                        </div>

                        {/* SUV Off-Season */}
                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            SUV 7-Seater (Off-Season ₹)
                          </label>
                          <input
                            type="number"
                            value={formVals.suvOff}
                            onChange={(e) => handlePriceChange(pkg.id, 'suvOff', e.target.value)}
                            className="w-full text-base font-black text-[#064E3B] px-2.5 py-1.5 border border-slate-300 rounded-lg"
                          />
                        </div>

                        {/* SUV Season */}
                        <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200">
                          <label className="block text-[11px] font-bold text-amber-900 mb-1">
                            SUV 7-Seater (Season ₹)
                          </label>
                          <input
                            type="number"
                            value={formVals.suvSeason}
                            onChange={(e) => handlePriceChange(pkg.id, 'suvSeason', e.target.value)}
                            className="w-full text-base font-black text-amber-900 px-2.5 py-1.5 border border-amber-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMER BOOKINGS & LEADS */}
        {activeTab === 'bookings' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black font-heading text-[#064E3B]">
                  Customer Enquiries & Trips
                </h3>
                <p className="text-xs text-slate-500">
                  Every request submitted from the website is stored permanently here.
                </p>
              </div>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No customer bookings submitted yet. Test by clicking "Book Cab" on the website.
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#155E38] bg-emerald-100 px-2 py-0.5 rounded">
                          {b.id}
                        </span>
                        <strong className="text-sm font-bold text-slate-900">{b.customerName}</strong>
                        <a href={`tel:${b.phone}`} className="text-xs font-bold text-emerald-700 hover:underline">
                          📞 {b.phone}
                        </a>
                      </div>
                      <p className="text-xs text-slate-700">
                        <strong>{b.packageName}</strong> • {b.vehicleType} • Travel Date: <strong>{b.travelDate}</strong> ({b.passengers} Pax)
                      </p>
                      {b.pickupLocation && (
                        <p className="text-[11px] text-slate-500">
                          Pickup: {b.pickupLocation} | Drop: {b.dropLocation}
                        </p>
                      )}
                      {b.specialRequests && (
                        <p className="text-[11px] text-slate-600 italic">Notes: {b.specialRequests}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                        className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-600"
                      >
                        <option value="NEW">🟢 NEW</option>
                        <option value="CONTACTED">📞 CONTACTED</option>
                        <option value="CONFIRMED">✓ CONFIRMED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: FOREST TOUR & AVAILABILITY */}
        {activeTab === 'forest' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <div>
              <h3 className="text-xl font-black font-heading text-[#064E3B]">
                Package Availability & Forest Rules
              </h3>
              <p className="text-xs text-slate-500">
                Turn packages ON/OFF or mark as "Permission Required" (like Berijam Lake).
              </p>
            </div>

            <div className="space-y-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <strong className="text-sm font-black text-slate-900">{pkg.name}</strong>
                    <p className="text-xs text-slate-500">{pkg.subtitle}</p>
                  </div>

                  <select
                    value={pkg.status}
                    onChange={(e) => {
                      updatePackageStatus(pkg.id, e.target.value as any);
                      setSaveSuccessMsg(`Status updated for ${pkg.name}!`);
                      setTimeout(() => setSaveSuccessMsg(null), 2500);
                    }}
                    className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
                  >
                    <option value="ACTIVE">🟢 AVAILABLE & ACTIVE</option>
                    <option value="PERMISSION_REQUIRED">⚠️ PERMISSION REQUIRED (Forest Tour)</option>
                    <option value="TEMPORARILY_UNAVAILABLE">🔴 TEMPORARILY UNAVAILABLE</option>
                    <option value="HIDDEN">HIDDEN FROM WEBSITE</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PHONE & WHATSAPP SETTINGS */}
        {activeTab === 'phone' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 max-w-2xl">
            <div>
              <h3 className="text-xl font-black font-heading text-[#064E3B]">
                Phone & WhatsApp Numbers
              </h3>
              <p className="text-xs text-slate-500">
                All "Call" and "WhatsApp" buttons on the website send messages directly to these numbers.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Primary WhatsApp & Calling Number
                </label>
                <input
                  type="text"
                  value={phone1Input}
                  onChange={(e) => setPhone1Input(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-black text-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Secondary Calling Number
                </label>
                <input
                  type="text"
                  value={phone2Input}
                  onChange={(e) => setPhone2Input(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-black text-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Office Address in Kodaikanal
                </label>
                <textarea
                  rows={2}
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    updateSettings({
                      phone1: phone1Input,
                      phone2: phone2Input,
                      whatsappNumber: phone1Input.replace(/[^0-9+]/g, ''),
                      address: addressInput
                    });
                    setSaveSuccessMsg('Phone and office settings saved permanently to Cloud Redis!');
                    setTimeout(() => setSaveSuccessMsg(null), 3000);
                  }}
                  className="bg-[#155E38] hover:bg-[#0B3B24] text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Phone Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GOOGLE REVIEWS MANAGER */}
        {activeTab === 'reviews' && (
          <div className="space-y-8 max-w-4xl">
            {/* Google Reviews Header & Live Links */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full bg-blue-600" />
                  <h3 className="text-xl font-black font-heading text-[#064E3B]">
                    Google Reviews & Rating Sync
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Official Google Listing: <strong>4.9 ★ Rating</strong> • Connected to Upstash Redis Cloud Database.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://www.google.com/travel/hotels/entity/CgoIsuv5l_n6maokEAE/reviews?q=kodaikanal%20mb%20cabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow"
                >
                  <span>Open Google Listing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Add New Review Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
              <h4 className="text-base font-black text-[#064E3B] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Add Customer Review (Auto-Syncs to Live Site)</span>
              </h4>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newReviewName.trim() || !newReviewText.trim()) {
                    alert('Please enter reviewer name and feedback text.');
                    return;
                  }
                  addReview({
                    name: newReviewName.trim(),
                    location: newReviewLocation.trim() || 'Verified Traveler',
                    rating: newReviewRating,
                    date: newReviewDate.trim() || 'September 2026',
                    tourTaken: newReviewTour.trim() || 'Kodaikanal Sightseeing Tour',
                    text: newReviewText.trim(),
                    verified: true,
                    source: 'Google',
                    googleReviewUrl: 'https://www.google.com/travel/hotels/entity/CgoIsuv5l_n6maokEAE/reviews?q=kodaikanal%20mb%20cabs'
                  });
                  setNewReviewName('');
                  setNewReviewLocation('');
                  setNewReviewText('');
                  setSaveSuccessMsg('New Google Review published live to site & stored in Redis!');
                  setTimeout(() => setSaveSuccessMsg(null), 3000);
                }}
                className="space-y-4 pt-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bangalore, Karnataka"
                      value={newReviewLocation}
                      onChange={(e) => setNewReviewLocation(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Star Rating
                    </label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                    >
                      <option value={5}>★★★★★ (5 Stars)</option>
                      <option value={4}>★★★★☆ (4 Stars)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Tour Package Taken
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Local Tour + Berijam Lake"
                      value={newReviewTour}
                      onChange={(e) => setNewReviewTour(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Review Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. September 2026"
                      value={newReviewDate}
                      onChange={(e) => setNewReviewDate(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Customer Review Feedback *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Type or paste the client feedback review here..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#155E38] hover:bg-[#0B3B24] text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow transition-all flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Publish Review to Live Site</span>
                </button>
              </form>
            </div>

            {/* List of Active Reviews */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
              <h4 className="text-base font-black text-[#064E3B]">
                Active Reviews on Website ({reviews.length})
              </h4>

              <div className="space-y-3">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-slate-900">{r.name}</strong>
                        <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {r.source || 'Google'}
                        </span>
                        <span className="text-xs text-amber-500 font-bold">
                          {'★'.repeat(r.rating)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 italic">"{r.text}"</p>
                      <span className="text-[10px] text-slate-400 block">
                        {r.location} • {r.date} • {r.tourTaken}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Remove review from ${r.name}?`)) {
                          deleteReview(r.id);
                          setSaveSuccessMsg(`Review deleted and synced with Redis!`);
                          setTimeout(() => setSaveSuccessMsg(null), 2500);
                        }
                      }}
                      className="text-xs text-rose-600 hover:text-rose-800 font-bold bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-auto"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
