import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BookingModal } from '@/components/BookingModal';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MB Cabs Holidays | Premium Kodaikanal Cab Booking & Sightseeing Packages',
  description: 'Experience Kodaikanal with MB Cabs Holidays. Official Local Tour, City Tour, Forest Tour (Berijam Lake), Village Tour (Poombarai & Mannavanur), and Trekking Tours with experienced local drivers.',
  keywords: 'Kodaikanal cab service, Kodaikanal taxi booking, Kodaikanal sightseeing packages, Berijam lake cab, Poombarai village tour, Mannavanur lake taxi, MB Travels Kodaikanal',
  openGraph: {
    title: 'MB CABS HOLIDAYS - Your Local Travel Partner in Kodaikanal',
    description: 'Explore scenic Kodaikanal with comfortable Sedan & SUV cabs, flexible sightseeing packages, and cozy cottage stays.',
    url: 'https://kodaimbcabsholidays.com',
    siteName: 'MB Cabs Holidays',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} scroll-smooth`}>
      <body className="antialiased bg-[#FAFCFA] text-slate-900 selection:bg-emerald-900 selection:text-white">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BookingModal />
        </Providers>
      </body>
    </html>
  );
}
