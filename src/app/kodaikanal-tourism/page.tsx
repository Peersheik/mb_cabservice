import type { Metadata } from 'next';
import { KodaikanalTourismView } from '@/components/KodaikanalTourismView';

export const metadata: Metadata = {
  title: 'Kodaikanal Tourism & Sightseeing Guide 2026 | Kodai MB Cabs',
  description:
    'Complete Kodaikanal travel guide: best time to visit, top tourist attractions, 3-day itineraries, weather updates, and official sightseeing cab tariffs by Kodai MB Cabs.',
  keywords: [
    'kodaikanal tourism guide',
    'kodaikanal sightseeing',
    'kodaikanal travel guide',
    'best time to visit kodaikanal',
    'kodaikanal 3 day itinerary',
    'kodaikanal cab service'
  ],
  alternates: {
    canonical: 'https://www.kodaimbcabsholidays.com/kodaikanal-tourism'
  },
  openGraph: {
    title: 'Complete Kodaikanal Tourism & Travel Guide | Kodai MB Cabs',
    description:
      'Explore Kodaikanal like a local. 5 official sightseeing circuits, weather insights, forest permit advice, and fixed-rate cabs.',
    url: 'https://www.kodaimbcabsholidays.com/kodaikanal-tourism'
  }
};

export default function KodaikanalTourismPage() {
  return <KodaikanalTourismView />;
}
