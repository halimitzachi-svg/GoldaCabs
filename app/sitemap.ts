import { MetadataRoute } from 'next';
import { CITIES } from '@/lib/cities';
import { TOP_CITIES_CONTENT } from '@/lib/city-content';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.goldacabs.co.il';

    // Basic pages
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date('2026-09-04'),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/en`,
            lastModified: new Date('2026-09-04'),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/deliveries`,
            changeFrequency: 'monthly',
            priority: 0.7,
        }
    ];

    // Hebrew City Pages
    const cityRoutes: MetadataRoute.Sitemap = Object.keys(CITIES).map((city) => {
        const verified = TOP_CITIES_CONTENT[city];
        return {
            url: `${baseUrl}/taxi-${city}`,
            ...(verified ? { lastModified: new Date(verified.lastReviewed) } : {}),
            changeFrequency: 'monthly' as const,
            priority: verified ? 0.8 : 0.6,
        };
    });

    // English City Pages
    const enCityRoutes: MetadataRoute.Sitemap = Object.keys(CITIES).map((city) => {
        const verified = TOP_CITIES_CONTENT[city];
        return {
            url: `${baseUrl}/en/taxi-${city}`,
            ...(verified ? { lastModified: new Date(verified.lastReviewed) } : {}),
            changeFrequency: 'monthly' as const,
            priority: verified ? 0.7 : 0.5,
        };
    });

    return [...routes, ...cityRoutes, ...enCityRoutes];
}
