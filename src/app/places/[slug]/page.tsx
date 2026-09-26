import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INITIAL_TOURIST_PLACES, INITIAL_PACKAGES } from '@/lib/data';
import { PlaceDetailView } from '@/components/PlaceDetailView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_TOURIST_PLACES.map((place) => ({
    slug: place.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const place = INITIAL_TOURIST_PLACES.find((p) => p.slug === slug);

  if (!place) {
    return {
      title: 'Tourist Place Not Found | Kodai MB Cabs Holidays',
      description: 'The requested Kodaikanal tourist place could not be found.'
    };
  }

  const title = `${place.name} Kodaikanal — Sightseeing Cab & Taxi Guide`;
  const description = `Explore ${place.name} in Kodaikanal with Kodai MB Cabs. Best time to visit: ${place.bestTime}. Entry fee: ${place.entryFee || 'Free'}. Included in ${place.relatedPackageName}. Book your cab today.`;
  const canonicalUrl = `https://www.kodaimbcabsholidays.com/places/${place.slug}`;

  return {
    title,
    description,
    keywords: [
      `${place.name.toLowerCase()} cab`,
      `${place.name.toLowerCase()} taxi`,
      `${place.name.toLowerCase()} kodaikanal`,
      'kodaikanal sightseeing cab',
      'kodai call taxi',
      ...place.nearbyAttractions.map((a) => `${a.toLowerCase()} cab`)
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: place.image,
          width: 800,
          height: 600,
          alt: `${place.name} - Kodaikanal`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [place.image]
    }
  };
}

export default async function PlaceDetailPage({ params }: Props) {
  const { slug } = await params;
  const place = INITIAL_TOURIST_PLACES.find((p) => p.slug === slug);

  if (!place) {
    notFound();
  }

  const relatedPkg = INITIAL_PACKAGES.find((p) => p.slug === place.relatedPackageSlug);

  return <PlaceDetailView place={place} relatedPkg={relatedPkg} />;
}
