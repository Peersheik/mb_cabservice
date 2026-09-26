import type { Metadata } from 'next';
import { CustomTourView } from '@/components/CustomTourView';

export const metadata: Metadata = {
  title: 'Custom Kodaikanal Tour Packages & Cab Hire | Kodai MB Cabs',
  description:
    'Design your own tailor-made Kodaikanal sightseeing itinerary. Choose custom days, pickup points (Madurai, Kodai Road, Coimbatore), vehicles, and private cottages with fixed tariffs.',
  keywords: [
    'custom kodaikanal tour package',
    'kodaikanal cab hire',
    'tailor made kodaikanal tour',
    'kodaikanal taxi booking',
    'kodai call taxi'
  ],
  alternates: {
    canonical: 'https://www.kodaimbcabsholidays.com/custom-tour'
  },
  openGraph: {
    title: 'Custom Kodaikanal Tour Packages | Kodai MB Cabs Holidays',
    description:
      'Build your personalized Kodaikanal vacation route with local mountain drivers. Fast quotes and transparent rates.',
    url: 'https://www.kodaimbcabsholidays.com/custom-tour'
  }
};

export default function CustomTourPage() {
  return <CustomTourView />;
}
