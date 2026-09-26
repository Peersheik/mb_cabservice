'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PackageData,
  StayData,
  TouristPlaceDetail,
  ReviewData,
  BookingRecord,
  SiteSettings,
  INITIAL_PACKAGES,
  INITIAL_STAYS,
  INITIAL_TOURIST_PLACES,
  INITIAL_REVIEWS,
  INITIAL_SITE_SETTINGS
} from './data';

interface AppContextType {
  packages: PackageData[];
  stays: StayData[];
  touristPlaces: TouristPlaceDetail[];
  reviews: ReviewData[];
  bookings: BookingRecord[];
  settings: SiteSettings;
  pricingMode: 'OFF_SEASON' | 'SEASON';
  togglePricingMode: (mode: 'OFF_SEASON' | 'SEASON') => void;
  colorTheme: 'light' | 'dark';
  toggleColorTheme: () => void;
  updatePackagePrice: (
    id: string,
    vehicle: 'sedan' | 'suv',
    mode: 'offSeason' | 'season',
    price: number | null
  ) => void;
  updatePackageStatus: (id: string, status: PackageData['status']) => void;
  quickUpdatePackagePrices: (
    packageId: string,
    sedanOff: number,
    sedanSeason: number,
    suvOff: number,
    suvSeason: number
  ) => void;
  addBooking: (booking: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>) => Promise<BookingRecord>;
  updateBookingStatus: (id: string, status: BookingRecord['status']) => Promise<void>;
  addReview: (review: Omit<ReviewData, 'id'>) => Promise<ReviewData>;
  deleteReview: (id: string) => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  isAdminAuthenticated: boolean;
  loginAdmin: (username: string, pass: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
  activeBookingModal: {
    isOpen: boolean;
    packageSlug?: string;
    vehicleType?: 'Sedan' | 'SUV';
    stayId?: string;
  };
  openBookingModal: (options?: { packageSlug?: string; vehicleType?: 'Sedan' | 'SUV'; stayId?: string }) => void;
  closeBookingModal: () => void;
  syncStatus: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LS_KEY_THEME = 'mb_cabs_color_theme_v3';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<PackageData[]>(INITIAL_PACKAGES);
  const [stays, setStays] = useState<StayData[]>(INITIAL_STAYS);
  const [touristPlaces, setTouristPlaces] = useState<TouristPlaceDetail[]>(INITIAL_TOURIST_PLACES);
  const [reviews, setReviews] = useState<ReviewData[]>(INITIAL_REVIEWS);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>('Live Connected');
  const [colorTheme, setColorTheme] = useState<'light' | 'dark'>('light');

  const [activeBookingModal, setActiveBookingModal] = useState<{
    isOpen: boolean;
    packageSlug?: string;
    vehicleType?: 'Sedan' | 'SUV';
    stayId?: string;
  }>({ isOpen: false });

  // Apply theme class and data-theme attribute on document root
  const applyThemeToDOM = (theme: 'light' | 'dark') => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const toggleColorTheme = () => {
    const next: 'light' | 'dark' = colorTheme === 'light' ? 'dark' : 'light';
    setColorTheme(next);
    applyThemeToDOM(next);
    try {
      localStorage.setItem(LS_KEY_THEME, next);
    } catch (e) {}
  };

  const fetchLatestState = useCallback(async () => {
    try {
      const res = await fetch('/api/db', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
      }
      if (data.packages && Array.isArray(data.packages)) setPackages(data.packages);
      if (data.bookings && Array.isArray(data.bookings)) setBookings(data.bookings);
      if (data.stays && Array.isArray(data.stays)) setStays(data.stays);
      if (data.reviews && Array.isArray(data.reviews)) setReviews(data.reviews);
    } catch (err) {
      console.warn('Data sync fallback', err);
    }
  }, []);

  // Check admin session on mount via secure httpOnly cookie session route
  useEffect(() => {
    fetch('/api/auth')
      .then((res) => {
        if (res.ok) {
          setIsAdminAuthenticated(true);
        } else {
          setIsAdminAuthenticated(false);
        }
      })
      .catch(() => setIsAdminAuthenticated(false));

    try {
      const savedTheme = localStorage.getItem(LS_KEY_THEME);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setColorTheme(savedTheme);
        applyThemeToDOM(savedTheme);
      }
    } catch (e) {}

    // On-demand fetch on mount (NO aggressive 10s polling for regular public visitors!)
    fetchLatestState();
  }, [fetchLatestState]);

  // Only poll if admin is authenticated (dashboard needs live updates)
  useEffect(() => {
    if (!isAdminAuthenticated) return;
    const interval = setInterval(fetchLatestState, 15000);
    return () => clearInterval(interval);
  }, [isAdminAuthenticated, fetchLatestState]);

  const togglePricingMode = async (mode: 'OFF_SEASON' | 'SEASON') => {
    const updatedSettings = { ...settings, pricingMode: mode };
    setSettings(updatedSettings);
    await updateSettings({ pricingMode: mode });
  };

  const quickUpdatePackagePrices = async (
    packageId: string,
    sedanOff: number,
    sedanSeason: number,
    suvOff: number,
    suvSeason: number
  ) => {
    const updated = packages.map((p) => {
      if (p.id === packageId) {
        return {
          ...p,
          pricing: {
            sedan: { offSeason: sedanOff, season: sedanSeason },
            suv: { offSeason: suvOff, season: suvSeason }
          }
        };
      }
      return p;
    });
    setPackages(updated);
    try {
      setSyncStatus('Saving Prices...');
      await fetch('/api/packages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packages: updated })
      });
      setSyncStatus('Live Connected');
    } catch (e) {
      setSyncStatus('Update Failed');
    }
  };

  const updatePackagePrice = async (
    id: string,
    vehicle: 'sedan' | 'suv',
    mode: 'offSeason' | 'season',
    price: number | null
  ) => {
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return;

    const newPricing = {
      ...pkg.pricing,
      [vehicle]: {
        ...pkg.pricing[vehicle],
        [mode]: price
      }
    };

    const updated = packages.map((p) => (p.id === id ? { ...p, pricing: newPricing } : p));
    setPackages(updated);

    try {
      await fetch('/api/packages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, pricing: newPricing })
      });
    } catch (e) {}
  };

  const updatePackageStatus = async (id: string, status: PackageData['status']) => {
    const updated = packages.map((p) => (p.id === id ? { ...p, status } : p));
    setPackages(updated);
    try {
      await fetch('/api/packages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
    } catch (e) {}
  };

  // Typed Scoped Booking Creation
  const addBooking = async (bookingData: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>): Promise<BookingRecord> => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to create booking');
    }

    const createdBooking = data.booking as BookingRecord;
    setBookings((prev) => [createdBooking, ...prev]);
    return createdBooking;
  };

  const updateBookingStatus = async (id: string, status: BookingRecord['status']) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    try {
      await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
    } catch (e) {}
  };

  // Typed Scoped Review Creation
  const addReview = async (reviewData: Omit<ReviewData, 'id'>): Promise<ReviewData> => {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to submit review');
    }

    const created = data.review as ReviewData;
    setReviews((prev) => [created, ...prev]);
    return created;
  };

  const deleteReview = async (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    try {
      await fetch(`/api/reviews?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
    } catch (e) {}
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
    } catch (e) {}
  };

  // Secure Server-side Admin Auth
  const loginAdmin = async (username: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: pass })
      });
      if (res.ok) {
        setIsAdminAuthenticated(true);
        fetchLatestState();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const logoutAdmin = async () => {
    setIsAdminAuthenticated(false);
    try {
      await fetch('/api/auth', { method: 'DELETE' });
    } catch (e) {}
  };

  const openBookingModal = (options?: { packageSlug?: string; vehicleType?: 'Sedan' | 'SUV'; stayId?: string }) => {
    setActiveBookingModal({
      isOpen: true,
      packageSlug: options?.packageSlug || 'local-tour',
      vehicleType: options?.vehicleType || 'Sedan',
      stayId: options?.stayId
    });
  };

  const closeBookingModal = () => {
    setActiveBookingModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AppContext.Provider
      value={{
        packages,
        stays,
        touristPlaces,
        reviews,
        bookings,
        settings,
        pricingMode: settings.pricingMode,
        togglePricingMode,
        colorTheme,
        toggleColorTheme,
        updatePackagePrice,
        updatePackageStatus,
        quickUpdatePackagePrices,
        addBooking,
        updateBookingStatus,
        addReview,
        deleteReview,
        updateSettings,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        activeBookingModal,
        openBookingModal,
        closeBookingModal,
        syncStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
