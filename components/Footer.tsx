'use client';

import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const topCities = [
        { name: 'תל אביב', slug: 'taxi-tel-aviv' },
        { name: 'רעננה', slug: 'taxi-raanana' },
        { name: 'הרצליה', slug: 'taxi-herzliya' },
        { name: 'ירושלים', slug: 'taxi-jerusalem' },
        { name: 'ראשון לציון', slug: 'taxi-rishon-lezion' },
        { name: 'פתח תקווה', slug: 'taxi-petah-tikva' },
    ];

    return (
        <footer className="bg-dark-bg text-gray-500 py-12 border-t border-white/10">
            <div className="container mx-auto px-4">

                {/* Cities Grid for SEO */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8 border-b border-white/5 pb-8">
                    {topCities.map(city => (
                        <Link key={city.slug} href={`/${city.slug}`} className="text-xs hover:text-gold transition-colors">
                            מונית לנתב"ג מ{city.name}
                        </Link>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">

                    {/* Brand / Copyright */}
                    <div className="text-center md:text-right">
                        <p>&copy; {currentYear} GoldaCabs. כל הזכויות שמורות.</p>
                        <p className="mt-1 text-xs text-gray-600">Premium Airport Taxi Service</p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-6">
                        <Link href="/deliveries" className="hover:text-gold transition-colors font-medium">
                            משלוחים במונית
                        </Link>
                        <Link href="/legal" className="hover:text-gold transition-colors">
                            תנאי שימוש ופרטיות / Legal
                        </Link>
                        {/* Accessibility - we have the widget, but a link is nice too */}
                        <button
                            onClick={() => document.querySelector<HTMLElement>('button[aria-label="Accessibility Menu"]')?.click()}
                            className="hover:text-gold transition-colors"
                        >
                            הצהרת נגישות
                        </button>
                    </div>

                </div>
            </div>
        </footer>
    );
}
