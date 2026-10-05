import type { MetadataRoute } from 'next';
import { getCanonicalUrl } from '@/lib/siteConfig';

/**
 * Generates the XML sitemap for SPAN Studio's public routes.
 * Excludes internal, API (/api/*), and nonexistent routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/services', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/work', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: getCanonicalUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
