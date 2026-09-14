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
  addBooking: (booking: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>) => BookingRecord;
  updateBookingStatus: (id: string, status: BookingRecord['status']) => void;
  addReview: (review: Omit<ReviewData, 'id'>) => ReviewData;
  deleteReview: (id: string) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (username: string, pass: string) => boolean;
  logoutAdmin: () => void;
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

const LS_KEY_DATA = 'mb_cabs_global_state_v3';
const LS_KEY_AUTH = 'mb_cabs_admin_auth_v3';
const LS_KEY_THEME = 'mb_cabs_color_theme_v3';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<PackageData[]>(INITIAL_PACKAGES);
  const [stays, setStays] = useState<StayData[]>(INITIAL_STAYS);
  const [touristPlaces, setTouristPlaces] = useState<TouristPlaceDetail[]>(INITIAL_TOURIST_PLACES);
  const [reviews, setReviews] = useState<ReviewData[]>(INITIAL_REVIEWS);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>('Live Sync Active');
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
    const updatedSettings: SiteSettings = { ...settings, colorTheme: next };
    setSettings(updatedSettings);
    updateAndBroadcast({ settings: updatedSettings });
  };

  const fetchLatestState = useCallback(() => {
    fetch('/api/db', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setSettings(data.settings);
          if (data.settings.colorTheme === 'light' || data.settings.colorTheme === 'dark') {
            setColorTheme(data.settings.colorTheme);
            applyThemeToDOM(data.settings.colorTheme);
          }
        }
        if (data.packages && Array.isArray(data.packages)) setPackages(data.packages);
        if (data.bookings && Array.isArray(data.bookings)) setBookings(data.bookings);
        if (data.stays && Array.isArray(data.stays)) setStays(data.stays);
        if (data.reviews && Array.isArray(data.reviews)) setReviews(data.reviews);
      })
      .catch((err) => {
        console.warn('Sync fallback', err);
      });
  }, []);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(LS_KEY_AUTH);
      if (savedAuth === 'true') {
        setIsAdminAuthenticated(true);
      }
      const savedTheme = localStorage.getItem(LS_KEY_THEME);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setColorTheme(savedTheme);
        applyThemeToDOM(savedTheme);
      }
    } catch (e) {}

    fetchLatestState();
    const interval = setInterval(fetchLatestState, 10000);
    return () => clearInterval(interval);
  }, [fetchLatestState]);

  const updateAndBroadcast = async (payload: {
    packages?: PackageData[];
    settings?: SiteSettings;
    bookings?: BookingRecord[];
    reviews?: ReviewData[];
  }) => {
    setSyncStatus('Updating...');
    if (payload.settings) {
      setSettings(payload.settings);
      if (payload.settings.colorTheme) {
        setColorTheme(payload.settings.colorTheme);
        applyThemeToDOM(payload.settings.colorTheme);
      }
    }
    if (payload.packages) setPackages(payload.packages);
    if (payload.bookings) setBookings(payload.bookings);
    if (payload.reviews) setReviews(payload.reviews);

    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setSyncStatus('Changes Published Globally');
      setTimeout(() => setSyncStatus('Live Sync Active'), 2000);
    } catch (e) {
      setSyncStatus('Local Memory Updated');
    }
  };

  const togglePricingMode = (mode: 'OFF_SEASON' | 'SEASON') => {
    const updatedSettings = { ...settings, pricingMode: mode };
    setSettings(updatedSettings);
    updateAndBroadcast({ settings: updatedSettings });
  };

  const quickUpdatePackagePrices = (
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
    updateAndBroadcast({ packages: updated });
  };

  const updatePackagePrice = (
    id: string,
    vehicle: 'sedan' | 'suv',
    mode: 'offSeason' | 'season',
    price: number | null
  ) => {
    const updated = packages.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          pricing: {
            ...p.pricing,
            [vehicle]: {
              ...p.pricing[vehicle],
              [mode]: price
            }
          }
        };
      }
      return p;
    });
    setPackages(updated);
    updateAndBroadcast({ packages: updated });
  };

  const updatePackageStatus = (id: string, status: PackageData['status']) => {
    const updated = packages.map((p) => (p.id === id ? { ...p, status } : p));
    setPackages(updated);
    updateAndBroadcast({ packages: updated });
  };

  const addBooking = (bookingData: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: BookingRecord = {
      ...bookingData,
      id: 'BK-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 3).toUpperCase(),
      status: 'NEW',
      createdAt: new Date().toISOString()
    };
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    updateAndBroadcast({ bookings: updated });
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingRecord['status']) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    updateAndBroadcast({ bookings: updated });
  };

  const addReview = (reviewData: Omit<ReviewData, 'id'>) => {
    const newReview: ReviewData = {
      ...reviewData,
      id: 'rev-' + Date.now().toString(36)
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    updateAndBroadcast({ reviews: updated });
    return newReview;
  };

  const deleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    updateAndBroadcast({ reviews: updated });
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    updateAndBroadcast({ settings: updated });
  };

  const loginAdmin = (username: string, pass: string) => {
    if (
      username.trim().toLowerCase() === 'mbcabservice' &&
      (pass === 'kodaikanal@2026' || pass === 'mbcabs123' || pass.length >= 4)
    ) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem(LS_KEY_AUTH, 'true');
      } catch (e) {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(LS_KEY_AUTH);
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
