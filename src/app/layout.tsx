import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kodaimbcabsholidays.com'),
  title: {
    default: 'Kodai MB Cabs | #1 Kodai Call Taxi Service & Kodai Cab Service Kodaikanal',
    template: '%s | Kodai MB Cabs Holidays'
  },
  description:
    'Book Kodai MB Cabs - top rated Kodai Call Taxi Service & Kodai Cab Service in Kodaikanal. 5 official sightseeing packages, experienced local hill drivers, 24/7 airport & railway station pickup from Madurai, Kodai Road, Coimbatore.',
  keywords: [
    'kodaicalltaxiservice',
    'kodaicabservice',
    'kodaimbcabs',
    'kodai call taxi service',
    'kodai cab service',
    'kodai mb cabs',
    'kodaikanal call taxi service',
    'kodaikanal cab service',
    'best call taxi service in kodai',
    'kodaikanal cab booking',
    'kodaikanal taxi service',
    'mb cabs holidays',
    'mb travels kodaikanal',
    'kodaikanal sightseeing packages',
    'kodaikanal tour package with cab',
    'kodaikanal local sightseeing taxi fare',
    'berijam lake forest tour cab',
    'poombarai village tour taxi',
    'mannavanur lake cab booking',
    'madurai to kodaikanal taxi',
    'kodai road to kodaikanal cab',
    'kodaikanal outstation taxi service',
    'kodaikanal car rental with driver'
  ],
  authors: [{ name: 'MB Cabs Holidays & MB Travels - P. Murugaboopathi' }],
  creator: 'MB Cabs Holidays (Kodai MB Cabs)',
  publisher: 'MB Cabs Holidays',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.kodaimbcabsholidays.com',
  },
  openGraph: {
    title: 'Kodai MB Cabs | Top Kodai Call Taxi Service & Kodai Cab Service',
    description:
      'Looking for Kodai Call Taxi Service or Kodai Cab Service? Kodai MB Cabs offers 5 official sightseeing circuits with 15+ years experienced local drivers. 100% fixed rates.',
    url: 'https://www.kodaimbcabsholidays.com',
    siteName: 'Kodai MB Cabs Holidays',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Kodai MB Cabs - Kodaikanal Sightseeing and Cab Service',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kodai MB Cabs | Leading Kodai Call Taxi & Cab Service',
    description: 'Explore Kodaikanal with Kodai MB Cabs. 24x7 Kodai Call Taxi Service & Sightseeing Cabs.',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google2f00a914531f817a',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness Schema structured data for high local Google SEO ranking
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: 'Kodai MB Cabs Holidays & MB Travels',
    alternateName: [
      'Kodai MB Cabs',
      'Kodai Call Taxi Service',
      'Kodai Cab Service',
      'kodaimbcabs',
      'kodaicalltaxiservice',
      'kodaicabservice'
    ],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    '@id': 'https://www.kodaimbcabsholidays.com',
    url: 'https://www.kodaimbcabsholidays.com',
    telephone: '+919942472778',
    priceRange: '₹2500 - ₹5000',
    description:
      'Kodai MB Cabs offers premier Kodai Call Taxi Service and Kodai Cab Service with verified local drivers, fixed rates, and customized tour packages in Kodaikanal.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Fern Hill Road, Near Hotel Tamilnadu',
      addressLocality: 'Kodaikanal',
      postalCode: '624101',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.2381,
      longitude: 77.4891,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: [
      'Kodaikanal',
      'Poombarai',
      'Mannavanur',
      'Vattakanal',
      'Berijam Lake',
      'Madurai',
      'Kodai Road',
      'Dindigul',
      'Coimbatore',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '356',
    },
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
