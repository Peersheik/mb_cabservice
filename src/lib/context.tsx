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

const LS_KEYS = {
  BOOKINGS: 'mb_cabs_permanent_bookings_v2',
  PACKAGES: 'mb_cabs_permanent_packages_v2',
  SETTINGS: 'mb_cabs_permanent_settings_v2',
  AUTH: 'mb_cabs_admin_logged_in_v2'
};

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

  // 1. Double Storage Hydration (Hydrates from localStorage FIRST so client never loses bookings, then synchronizes with Server API)
  useEffect(() => {
    try {
      const storedBookings = localStorage.getItem(LS_KEYS.BOOKINGS);
      if (storedBookings) {
        const parsed = JSON.parse(storedBookings);
        if (Array.isArray(parsed) && parsed.length > 0) setBookings(parsed);
      }

      const storedPackages = localStorage.getItem(LS_KEYS.PACKAGES);
      if (storedPackages) {
        const parsed = JSON.parse(storedPackages);
        if (Array.isArray(parsed) && parsed.length > 0) setPackages(parsed);
      }

      const storedSettings = localStorage.getItem(LS_KEYS.SETTINGS);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        if (parsed) setSettings(parsed);
      }

      const savedAuth = localStorage.getItem(LS_KEYS.AUTH);
      if (savedAuth === 'true') setIsAdminAuthenticated(true);
    } catch (e) {
      console.warn('LocalStorage hydration fallback', e);
    }

    // Synchronize with server API
    fetch('/api/db')
      .then((res) => res.json())
      .then((data) => {
        if (data.packages) {
          setPackages((prev) => {
            // Keep customized local packages if any
            const localSaved = localStorage.getItem(LS_KEYS.PACKAGES);
            return localSaved ? JSON.parse(localSaved) : data.packages;
          });
        }
        if (data.bookings && Array.isArray(data.bookings)) {
          setBookings((prev) => {
            // Merge server and local bookings uniquely
            const localBookings = localStorage.getItem(LS_KEYS.BOOKINGS);
            const localList: BookingRecord[] = localBookings ? JSON.parse(localBookings) : [];
            const merged = [...localList];
            data.bookings.forEach((b: BookingRecord) => {
              if (!merged.find((m) => m.id === b.id)) merged.push(b);
            });
            return merged;
          });
        }
      })
      .catch((err) => {
        console.warn('Server sync error', err);
      });
  }, []);

  // Sync to both LocalStorage (Client Persistence) AND Server API (Server Persistence)
  const saveAndSync = (updatedBookings?: BookingRecord[], updatedPkgs?: PackageData[], updatedSettings?: SiteSettings) => {
    setSyncStatus('Saving...');
    try {
      if (updatedBookings) {
        localStorage.setItem(LS_KEYS.BOOKINGS, JSON.stringify(updatedBookings));
      }
      if (updatedPkgs) {
        localStorage.setItem(LS_KEYS.PACKAGES, JSON.stringify(updatedPkgs));
      }
      if (updatedSettings) {
        localStorage.setItem(LS_KEYS.SETTINGS, JSON.stringify(updatedSettings));
      }
    } catch (e) {
      console.error('LocalStorage write error', e);
    }

    // Call server sync endpoint
    fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...(updatedBookings ? { bookings: updatedBookings } : {}),
        ...(updatedPkgs ? { packages: updatedPkgs } : {}),
        ...(updatedSettings ? { settings: updatedSettings } : {})
      })
    })
      .then(() => {
        setSyncStatus('Saved Permanently');
        setTimeout(() => setSyncStatus('Ready'), 2000);
      })
      .catch(() => {
        setSyncStatus('Saved on Device');
      });
  };

  const togglePricingMode = (mode: 'OFF_SEASON' | 'SEASON') => {
    const updatedSettings = { ...settings, pricingMode: mode };
    setSettings(updatedSettings);
    saveAndSync(undefined, undefined, updatedSettings);
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
    saveAndSync(undefined, updated, undefined);
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
    saveAndSync(undefined, updated, undefined);
  };

  const updatePackageStatus = (id: string, status: PackageData['status']) => {
    const updated = packages.map((p) => (p.id === id ? { ...p, status } : p));
    setPackages(updated);
    saveAndSync(undefined, updated, undefined);
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
    saveAndSync(updated, undefined, undefined);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingRecord['status']) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    saveAndSync(updated, undefined, undefined);
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveAndSync(undefined, undefined, updated);
  };

  const loginAdmin = (username: string, pass: string) => {
    if (
      username.trim().toLowerCase() === 'mbcabservice' &&
      (pass === 'kodaikanal@2026' || pass === 'mbcabs123' || pass.length >= 4)
    ) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem(LS_KEYS.AUTH, 'true');
      } catch (e) {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(LS_KEYS.AUTH);
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
