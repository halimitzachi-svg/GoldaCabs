import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'GoldaCabs | Premium Airport Taxi to Ben Gurion (TLV) 24/7',
    description: 'Book a VIP taxi to Ben Gurion Airport with GoldaCabs. Online fare calculator, luxury vehicles, fixed prices, and English-speaking drivers.',
    keywords: ['taxi to ben gurion', 'tlv taxi', 'airport transfer israel', 'golda cabs', 'tel aviv taxi', 'taxi booking israel'],
    openGraph: {
        title: 'GoldaCabs - Premium Airport Transfers in Israel',
        description: 'Book your ride to Ben Gurion Airport in seconds. Reliable, professional, and fair prices.',
        locale: 'en_IL',
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.goldacabs.co.il/en',
        languages: {
            'he-IL': 'https://www.goldacabs.co.il',
            'en-IL': 'https://www.goldacabs.co.il/en',
            'en': 'https://www.goldacabs.co.il/en',
        },
    }
};

export default function HomeEn() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TaxiService',
        'name': 'GoldaCabs',
        'url': 'https://www.goldacabs.co.il/en',
        'image': 'https://www.goldacabs.co.il/og-image.jpg',
        'description': 'Premium taxi service to Ben Gurion Airport and across Israel. Luxury cars, English speaking drivers.',
        'telephone': '+972-54-743-8110',
        'areaServed': [
            { '@type': 'City', 'name': 'Tel Aviv-Yafo' },
            { '@type': 'City', 'name': 'Raanana' },
            { '@type': 'City', 'name': 'Herzliya' },
            { '@type': 'City', 'name': 'Jerusalem' }
        ],
        'priceRange': '₪₪',
        'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
                'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
            ],
            'opens': '00:00',
            'closes': '23:59'
        },
        'availableLanguage': ['English', 'Hebrew'],
        'serviceType': 'Airport Shuttle'
    };

    return (
        <main className="min-h-screen bg-dark-bg">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero lang="en" />
            <Testimonials lang="en" />
            <FAQ lang="en" />
        </main>
    );
}
