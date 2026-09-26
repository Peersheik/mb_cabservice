import type { Metadata } from 'next';
import { INITIAL_STAYS } from '@/lib/data';
import { StaysView } from '@/components/StaysView';

export const metadata: Metadata = {
  title: 'Kodaikanal Hill Stays, Cottages & Resorts | Kodai MB Cabs Holidays',
  description:
    'Book verified Kodaikanal hill cottages, mountain chalets, and family resorts. Combined stay + taxi sightseeing packages with free door pickup. Best tariffs guaranteed.',
  keywords: [
    'kodaikanal cottages',
    'kodaikanal hill stays',
    'kodaikanal resort booking',
    'kodaikanal stay and cab package',
    'kodaikanal taxi service'
  ],
  alternates: {
    canonical: 'https://www.kodaimbcabsholidays.com/stays'
  },
  openGraph: {
    title: 'Kodaikanal Hill Stays & Cottages | Kodai MB Cabs Holidays',
    description:
      'Handpicked mountain chalets, private family estates, and campfire cottages in Kodaikanal with seamless cab pickup.',
    url: 'https://www.kodaimbcabsholidays.com/stays'
  }
};

export default function StaysPage() {
  return <StaysView initialStays={INITIAL_STAYS} />;
}
