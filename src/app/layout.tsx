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
    default: 'Kodaikanal Call Taxi & Cab Service | Kodai MB Cabs Holidays',
    template: '%s | Kodai MB Cabs Holidays'
  },
  description:
    '#1 Kodaikanal Call Taxi Service & Kodai Cab Service. Book official Kodaikanal sightseeing packages, airport & Kodai Road railway pickup with experienced local hill drivers. Fixed brochure rates & 24x7 cab booking.',
  keywords: [
    'kodaikanalcalltaxiservice',
    'kodaicalltaxiservice',
    'kodaicabservice',
    'kodaikanal call taxi service',
    'kodaikanal cab service',
    'kodai call taxi',
    'kodai cab service',
    'kodaimbcabs',
    'kodai mb cabs',
    'kodaikanal call taxi',
    'kodaikanal taxi service',
    'kodaikanal sightseeing cab',
    'best call taxi service in kodaikanal',
    'kodaikanal cab booking',
    'mb cabs holidays',
    'mb travels kodaikanal',
    'kodaikanal sightseeing packages',
    'madurai to kodaikanal taxi',
    'kodai road to kodaikanal cab',
    'coimbatore to kodaikanal taxi',
    'berijam lake forest tour cab',
    'poombarai village tour taxi',
    'mannavanur lake cab booking',
    'kodaikanal outstation taxi service'
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
  icons: {
    icon: [
      { url: '/logo.png', sizes: 'any' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
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
  // Multi-entity JSON-LD Graph for Google Search, Google AI Overviews (AEO), and Local Maps (GEO)
  const structuredDataGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.kodaimbcabsholidays.com/#organization',
        name: 'Kodai MB Cabs Holidays & MB Travels',
        legalName: 'MB Travels Kodaikanal',
        additionalType: 'https://schema.org/TaxiService',
        alternateName: [
          'Kodaikanal Call Taxi',
          'Kodaikanal Call Taxi Service',
          'Kodai MB Cabs',
          'Kodai Call Taxi Service',
          'Kodai Cab Service',
          'kodaikanalcalltaxiservice',
          'kodaimbcabs',
          'kodaicalltaxiservice',
          'kodaicabservice'
        ],
        image: 'https://www.kodaimbcabsholidays.com/logo.png',
        logo: 'https://www.kodaimbcabsholidays.com/logo.png',
        url: 'https://www.kodaimbcabsholidays.com',
        telephone: '+919942472778',
        email: 'info@kodaimbcabsholidays.com',
        priceRange: '₹2500 - ₹5000',
        currenciesAccepted: 'INR',
        paymentAccepted: 'Cash, UPI, Google Pay, PhonePe, Net Banking',
        description:
          'Kodai MB Cabs is the leading Kodaikanal Call Taxi Service and Kodai Cab Service in Kodaikanal. We offer official sightseeing tour packages, seasoned hill drivers, fixed brochure rates, and 24/7 outstation transfers to Madurai, Kodai Road, Dindigul, and Coimbatore.',
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
        hasMap: 'https://maps.google.com/?q=10.2381,77.4891',
        sameAs: [
          'https://www.google.com/travel/hotels/entity/CgoIsuv5l_n6maokEAE/overview?q=kodaikanal%20mb%20cabs',
          'https://www.google.com/travel/hotels/entity/CgoIsuv5l_n6maokEAE/reviews?q=kodaikanal%20mb%20cabs'
        ],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Kodaikanal' },
          { '@type': 'AdministrativeArea', name: 'Poombarai' },
          { '@type': 'AdministrativeArea', name: 'Mannavanur' },
          { '@type': 'AdministrativeArea', name: 'Vattakanal' },
          { '@type': 'AdministrativeArea', name: 'Berijam Lake' },
          { '@type': 'AdministrativeArea', name: 'Madurai' },
          { '@type': 'AdministrativeArea', name: 'Kodai Road' },
          { '@type': 'AdministrativeArea', name: 'Dindigul' },
          { '@type': 'AdministrativeArea', name: 'Coimbatore' },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '356',
          bestRating: '5',
          worstRating: '1',
          itemReviewed: {
            '@type': 'LocalBusiness',
            name: 'Kodai MB Cabs Holidays & MB Travels',
            image: 'https://www.kodaimbcabsholidays.com/logo.png',
            telephone: '+919942472778',
            priceRange: '₹2500 - ₹5000',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Fern Hill Road, Near Hotel Tamilnadu',
              addressLocality: 'Kodaikanal',
              postalCode: '624101',
              addressRegion: 'Tamil Nadu',
              addressCountry: 'IN',
            }
          }
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.kodaimbcabsholidays.com/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why choose Kodai MB Cabs over other Kodai call taxi service providers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Kodai MB Cabs provides guaranteed on-time pickups, 15+ years experienced mountain drivers, 100% transparent brochure rates with no hidden hill charges, sanitized AC and non-AC vehicles, and 24/7 dedicated telephone and WhatsApp dispatch.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I book a reliable Kodai cab service for sightseeing packages?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can instantly book your Kodai cab service online via our fare calculator or WhatsApp us directly at +91 99424 72778. Choose from 5 official Kodaikanal tour circuits including Local Tour, City Tour, Berijam Lake Forest Tour, Poombarai Village, and Picnic Trek Tour.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the best call taxi service in Kodaikanal for family sightseeing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Kodai MB Cabs (MB Travels) is rated 4.9/5 by over 350+ families for safe Ghat road driving, clean sanitized Sedans & 7-seater SUVs, and fixed official brochure tariffs.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you offer 24x7 taxi pickup from Madurai, Dindigul, or Kodai Road Railway Station to Kodaikanal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! As Kodaikanal leading call taxi service, we provide 24x7 one-way and round-trip transfers from Madurai Airport/Station, Dindigul Junction, Kodai Road Railway Station, and Coimbatore Airport directly to your Kodaikanal hotel.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
