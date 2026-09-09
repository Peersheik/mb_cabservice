import { MetadataRoute } from 'next';
import { INITIAL_PACKAGES, INITIAL_TOURIST_PLACES } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.kodaimbcabsholidays.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/places`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/stays`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/custom-tour`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/kodaikanal-tourism`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ];

  const packageRoutes: MetadataRoute.Sitemap = INITIAL_PACKAGES.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.95
  }));

  const placeRoutes: MetadataRoute.Sitemap = INITIAL_TOURIST_PLACES.map((place) => ({
    url: `${baseUrl}/places/${place.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  return [...staticRoutes, ...packageRoutes, ...placeRoutes];
}
