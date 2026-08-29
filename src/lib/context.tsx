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

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<PackageData[]>(INITIAL_PACKAGES);
  const [stays, setStays] = useState<StayData[]>(INITIAL_STAYS);
  const [touristPlaces, setTouristPlaces] = useState<TouristPlaceDetail[]>(INITIAL_TOURIST_PLACES);
  const [reviews, setReviews] = useState<ReviewData[]>(INITIAL_REVIEWS);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>('Live Sync Active');
  const [activeBookingModal, setActiveBookingModal] = useState<{
    isOpen: boolean;
    packageSlug?: string;
    vehicleType?: 'Sedan' | 'SUV';
    stayId?: string;
  }>({ isOpen: false });

  // 1. Fetch server state immediately & poll periodically so any device gets updates in real-time
  const fetchLatestState = useCallback(() => {
    fetch('/api/db', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setSettings(data.settings);
        }
        if (data.packages && Array.isArray(data.packages)) {
          setPackages(data.packages);
        }
        if (data.bookings && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        }
        if (data.stays && Array.isArray(data.stays)) {
          setStays(data.stays);
        }

        // Cache locally for offline/fallback
        try {
          localStorage.setItem(LS_KEY_DATA, JSON.stringify(data));
        } catch (e) {}
      })
      .catch((err) => {
        console.warn('Sync fallback', err);
      });
  }, []);

  useEffect(() => {
    // Initial local hydration
    try {
      const savedLocal = localStorage.getItem(LS_KEY_DATA);
      if (savedLocal) {
        const parsed = JSON.parse(savedLocal);
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.packages) setPackages(parsed.packages);
        if (parsed.bookings) setBookings(parsed.bookings);
      }
      const savedAuth = localStorage.getItem(LS_KEY_AUTH);
      if (savedAuth === 'true') setIsAdminAuthenticated(true);
    } catch (e) {}

    fetchLatestState();

    // Re-sync every 10 seconds so customer site automatically updates when admin changes mode on their phone/laptop
    const interval = setInterval(fetchLatestState, 10000);
    return () => clearInterval(interval);
  }, [fetchLatestState]);

  // Master update and broadcast function
  const updateAndBroadcast = async (payload: {
    packages?: PackageData[];
    settings?: SiteSettings;
    bookings?: BookingRecord[];
  }) => {
    setSyncStatus('Updating...');

    // Optimistic UI state update
    if (payload.settings) {
      setSettings(payload.settings);
    }
    if (payload.packages) {
      setPackages(payload.packages);
    }
    if (payload.bookings) {
      setBookings(payload.bookings);
    }

    try {
      const currentFull = {
        packages: payload.packages || packages,
        settings: payload.settings || settings,
        bookings: payload.bookings || bookings,
        stays,
        touristPlaces,
        reviews
      };
      localStorage.setItem(LS_KEY_DATA, JSON.stringify(currentFull));
    } catch (e) {}

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
        updatePackagePrice,
        updatePackageStatus,
        quickUpdatePackagePrices,
        addBooking,
        updateBookingStatus,
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
