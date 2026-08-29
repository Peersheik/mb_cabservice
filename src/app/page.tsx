'use client';

import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { CabJourneySection } from '@/components/CabJourneySection';
import { PackagesSection } from '@/components/PackagesSection';
import { HorizontalPlacesExperience } from '@/components/HorizontalPlacesExperience';
import { StaysSection } from '@/components/StaysSection';
import { ReviewsAndFaqSection } from '@/components/ReviewsAndFaqSection';
import { FinalCtaSection } from '@/components/FinalCtaSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Cinematic Hero */}
      <HeroSection />

      {/* 2. Cab Journey Storytelling */}
      <CabJourneySection />

      {/* 3. Official 5 Sightseeing Packages */}
      <PackagesSection />

      {/* 4. Horizontal Places Showcase */}
      <HorizontalPlacesExperience />

      {/* 5. Hill Stays & Cottages */}
      <StaysSection />

      {/* 6. Real Verified Reviews & FAQ */}
      <ReviewsAndFaqSection />

      {/* 7. Final Cinematic Call-to-Action */}
      <FinalCtaSection />
    </div>
  );
}
