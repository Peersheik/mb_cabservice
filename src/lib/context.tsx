'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<PackageData[]>(INITIAL_PACKAGES);
  const [stays, setStays] = useState<StayData[]>(INITIAL_STAYS);
  const [touristPlaces, setTouristPlaces] = useState<TouristPlaceDetail[]>(INITIAL_TOURIST_PLACES);
  const [reviews, setReviews] = useState<ReviewData[]>(INITIAL_REVIEWS);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>('Ready');
  const [activeBookingModal, setActiveBookingModal] = useState<{
    isOpen: boolean;
    packageSlug?: string;
    vehicleType?: 'Sedan' | 'SUV';
    stayId?: string;
  }>({ isOpen: false });

  // 1. Fetch permanent storage from API endpoint on mount
  useEffect(() => {
    fetch('/api/db')
      .then((res) => res.json())
      .then((data) => {
        if (data.packages) setPackages(data.packages);
        if (data.stays) setStays(data.stays);
        if (data.touristPlaces) setTouristPlaces(data.touristPlaces);
        if (data.reviews) setReviews(data.reviews);
        if (data.bookings) setBookings(data.bookings);
        if (data.settings) setSettings(data.settings);
      })
      .catch((err) => {
        console.warn('API DB sync fallback to initial memory', err);
      });

    try {
      const savedAuth = localStorage.getItem('mb_admin_logged_in');
      if (savedAuth === 'true') setIsAdminAuthenticated(true);
    } catch (e) {}
  }, []);

  // 2. Helper to write updates to permanent disk storage
  const persistToServer = async (payload: any) => {
    setSyncStatus('Saving...');
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setSyncStatus('Saved Permanently');
      setTimeout(() => setSyncStatus('Ready'), 2000);
    } catch (error) {
      console.error('Error persisting to file DB:', error);
      setSyncStatus('Local Memory Saved');
    }
  };

  const togglePricingMode = (mode: 'OFF_SEASON' | 'SEASON') => {
    const updatedSettings = { ...settings, pricingMode: mode };
    setSettings(updatedSettings);
    persistToServer({ settings: updatedSettings });
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
    persistToServer({ packages: updated });
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
    persistToServer({ packages: updated });
  };

  const updatePackageStatus = (id: string, status: PackageData['status']) => {
    const updated = packages.map((p) => (p.id === id ? { ...p, status } : p));
    setPackages(updated);
    persistToServer({ packages: updated });
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
    persistToServer({ bookings: updated });
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingRecord['status']) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    persistToServer({ bookings: updated });
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    persistToServer({ settings: updated });
  };

  const loginAdmin = (username: string, pass: string) => {
    if (username.trim().toLowerCase() === 'mbcabservice' && (pass === 'kodaikanal@2026' || pass === 'mbcabs123' || pass.length >= 4)) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem('mb_admin_logged_in', 'true');
      } catch (e) {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('mb_admin_logged_in');
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
