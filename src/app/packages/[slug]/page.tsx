import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INITIAL_PACKAGES } from '@/lib/data';
import { PackageDetailView } from '@/components/PackageDetailView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_PACKAGES.map((pkg) => ({
    slug: pkg.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = INITIAL_PACKAGES.find((p) => p.slug === slug);

  if (!pkg) {
    return {
      title: 'Tour Package Not Found | Kodai MB Cabs Holidays',
      description: 'The requested sightseeing tour package could not be found.'
    };
  }

  const title = `${pkg.name} — Kodaikanal Cab Service & Sightseeing Tour`;
  const description = `Book ${pkg.name} with Kodai MB Cabs Holidays. Covers ${pkg.placesCount} top scenic spots including ${pkg.places.slice(0, 3).map((p) => p.name).join(', ')}. Starting from ₹${pkg.pricing.sedan.offSeason}. Verified local drivers.`;
  const canonicalUrl = `https://www.kodaimbcabsholidays.com/packages/${pkg.slug}`;

  return {
    title,
    description,
    keywords: [
      `${pkg.name.toLowerCase()} cab service`,
      `${pkg.name.toLowerCase()} taxi booking`,
      'kodaikanal cab service',
      'kodaikanal taxi service',
      'kodai call taxi service',
      'kodaikanal sightseeing packages',
      ...pkg.places.map((p) => `${p.name.toLowerCase()} cab`)
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
          url: pkg.bannerImage,
          width: 1200,
          height: 630,
          alt: `${pkg.name} Tour Package - Kodai MB Cabs`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [pkg.bannerImage]
    }
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = INITIAL_PACKAGES.find((p) => p.slug === slug);

  if (!pkg) {
    notFound();
  }

  return <PackageDetailView pkg={pkg} />;
}
