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
  metadataBase: new URL('https://kodaimbcabsholidays.com'),
  title: {
    default: 'MB CABS HOLIDAYS | Best Call Taxi & Kodaikanal Sightseeing Cab Service',
    template: '%s | MB Cabs Holidays Kodaikanal'
  },
  description:
    'Best call taxi & cab service in Kodaikanal. Book 5 official sightseeing packages (Local, City, Forest Berijam Lake, Poombarai Village & Picnic Trek Tour) with experienced local hill drivers. 24x7 outstation pickups from Madurai, Kodai Road & Coimbatore.',
  keywords: [
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
    'kodaikanal resorts and cottages',
    'dolphins nose trek taxi kodai',
    'best taxi in kodaikanal for family',
    'kodaikanal car rental with driver'
  ],
  authors: [{ name: 'MB Cabs Holidays & MB Travels - P. Murugaboopathi' }],
  creator: 'MB Cabs Holidays',
  publisher: 'MB Cabs Holidays',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://kodaimbcabsholidays.com',
  },
  openGraph: {
    title: 'MB Cabs Holidays | Best Kodaikanal Sightseeing & Call Taxi Service',
    description:
      'Book authentic Kodaikanal sightseeing circuits with 15+ years experienced local mountain drivers. Fixed brochure rates, sanitized Sedans & 7-seater SUVs.',
    url: 'https://kodaimbcabsholidays.com',
    siteName: 'MB Cabs Holidays & MB Travels',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Misty Kodaikanal Mountain Peaks - MB Cabs Holidays',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MB Cabs Holidays | Premier Kodaikanal Sightseeing Taxi Service',
    description: 'Explore Kodaikanal with trusted local drivers. 5 official tour packages & 24x7 cab booking.',
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
    google: 'google-site-verification-id',
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
    name: 'MB Cabs Holidays & MB Travels',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    '@id': 'https://kodaimbcabsholidays.com',
    url: 'https://kodaimbcabsholidays.com',
    telephone: '+919942472778',
    priceRange: '₹2500 - ₹5000',
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
