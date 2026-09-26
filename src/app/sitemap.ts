import { MetadataRoute } from 'next';
import { INITIAL_PACKAGES, INITIAL_TOURIST_PLACES } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.kodaimbcabsholidays.com';

  const siteLaunchDate = new Date('2026-08-01');

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: siteLaunchDate,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/places`,
      lastModified: siteLaunchDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/stays`,
      lastModified: siteLaunchDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/custom-tour`,
      lastModified: siteLaunchDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/kodaikanal-tourism`,
      lastModified: siteLaunchDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: siteLaunchDate,
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ];

  const packageRoutes: MetadataRoute.Sitemap = INITIAL_PACKAGES.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: pkg.updatedAt ? new Date(pkg.updatedAt) : new Date('2026-08-20'),
    changeFrequency: 'weekly',
    priority: 0.95
  }));

  const placeRoutes: MetadataRoute.Sitemap = INITIAL_TOURIST_PLACES.map((place) => ({
    url: `${baseUrl}/places/${place.slug}`,
    lastModified: place.updatedAt ? new Date(place.updatedAt) : new Date('2026-08-20'),
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  return [...staticRoutes, ...packageRoutes, ...placeRoutes];
}
