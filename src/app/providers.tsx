'use client';

import React from 'react';
import { AppProvider } from '@/lib/context';
import { Navbar } from '@/components/Navbar';
import { BookingModal } from '@/components/BookingModal';
import { Footer } from '@/components/Footer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <BookingModal />
    </AppProvider>
  );
}

