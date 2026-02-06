import { MetadataRoute } from 'next';
import { CITIES } from '@/lib/cities';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://goldacabs.com';

    // Basic pages
    const routes = [
        '',
        '/en',
        '/deliveries',
        '/legal',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Hebrew City Pages
    const cityRoutes = Object.keys(CITIES).map((city) => ({
        url: `${baseUrl}/taxi-${city}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // English City Pages
    const enCityRoutes = Object.keys(CITIES).map((city) => ({
        url: `${baseUrl}/en/taxi-${city}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...cityRoutes, ...enCityRoutes];
}
