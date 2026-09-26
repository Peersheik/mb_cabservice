import type { Metadata } from 'next';
import { ContactView } from '@/components/ContactView';

export const metadata: Metadata = {
  title: 'Contact Kodai MB Cabs Holidays | 24x7 Kodaikanal Call Taxi Booking',
  description:
    'Contact Kodai MB Cabs Holidays in Kodaikanal. 24x7 local call taxi dispatch, WhatsApp booking +91 99424 72778, outstation cabs from Madurai & Kodai Road. Near Hotel Tamilnadu.',
  keywords: [
    'contact kodai mb cabs',
    'kodaikanal taxi phone number',
    'kodaikanal call taxi contact',
    'kodai cab booking whatsapp',
    'kodaikanal travel agent'
  ],
  alternates: {
    canonical: 'https://www.kodaimbcabsholidays.com/contact'
  },
  openGraph: {
    title: 'Contact Kodai MB Cabs Holidays | 24/7 Driver Dispatch',
    description:
      'Reach Kodai MB Cabs in Kodaikanal. Call or WhatsApp +91 99424 72778 for instant cab reservations.',
    url: 'https://www.kodaimbcabsholidays.com/contact'
  }
};

export default function ContactPage() {
  return <ContactView />;
}
