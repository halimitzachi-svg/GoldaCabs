import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import type { Metadata } from 'next';
import { dictionary } from '@/lib/dictionary';

export const metadata: Metadata = {
    title: 'GoldaCabs | Premium Airport Taxi to Ben Gurion (TLV) 24/7',
    description: 'Book a VIP taxi to Ben Gurion Airport with GoldaCabs. Online fare calculator, luxury vehicles, fixed prices, and English-speaking drivers.',
    keywords: ['taxi to ben gurion', 'tlv taxi', 'airport transfer israel', 'golda cabs', 'tel aviv taxi', 'taxi booking israel'],
    openGraph: {
        title: 'GoldaCabs - Premium Airport Transfers in Israel',
        description: 'Book your ride to Ben Gurion Airport in seconds. Reliable, professional, and fair prices.',
        locale: 'en_IL',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'GoldaCabs | Premium Airport Taxi VIP',
            }
        ]
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

import { Plane, MapPin, CheckCircle2, ListChecks, ArrowLeftRight, CreditCard, ShieldCheck } from 'lucide-react';

export default function HomeEn() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TaxiService',
        'name': 'GoldaCabs',
        'url': 'https://www.goldacabs.co.il/en',
        'image': 'https://www.goldacabs.co.il/og-image.png',
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
        'serviceType': 'Airport Shuttle',
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.9',
            'ratingCount': '124',
            'bestRating': '5',
            'worstRating': '1'
        }
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': dictionary.en.faq.questions.map(item => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.a
            }
        }))
    };

    return (
        <main className="min-h-screen bg-dark-bg text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <Hero lang="en" />

            {/* Why Choose Us */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gold/5 blur-[120px] -z-10" />
                <div className="container mx-auto px-4 text-left">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold inline-block">Why GoldaCabs?</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">Premier taxi service in Israel for airport transfers and nationwide travel. Experience luxury, punctuality, and safety.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: <ShieldCheck className="w-8 h-8" />, title: 'Premium Safety', desc: 'Modern, well-maintained vehicles for every journey.' },
                            { icon: <ArrowLeftRight className="w-8 h-8" />, title: 'Fixed Prices', desc: 'Transparent pricing with no hidden fees or surprises.' },
                            { icon: <CreditCard className="w-8 h-8" />, title: 'Flexible Payment', desc: 'Cash, Bit, Paybox - whatever works best for you.' },
                            { icon: <CheckCircle2 className="w-8 h-8" />, title: 'Flight Monitoring', desc: 'We track your flight in real-time to ensure we are there when you land.' },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-gold/30 transition-all text-center group">
                                <div className="bg-gold/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gold group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pickup Guide */}
            <section className="py-24 bg-white/5 border-y border-white/10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8 text-left">
                            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                                <MapPin className="w-4 h-4" />
                                Airport Pickup Guide
                            </div>
                            <h2 className="text-4xl font-bold">Where to meet at TLV?</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                We know how important it is to find your driver quickly after a long flight.
                                Here is exactly where we will be waiting for you at Ben Gurion Airport.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center shrink-0 text-gold font-bold">3</div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-1">Terminal 3</h4>
                                        <p className="text-gray-400">Level 2 (the middle level), Gate 23. Your driver will be waiting with a sign showing your name.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center shrink-0 text-gold font-bold">1</div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-1">Terminal 1</h4>
                                        <p className="text-gray-400">Right outside the terminal exit, in the designated parking area for pre-ordered taxis.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full aspect-video bg-dark-bg border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent flex items-center justify-center">
                                <div className="text-center p-8">
                                    <Plane className="w-20 h-20 text-gold/30 mx-auto mb-4" />
                                    <span className="text-gold/50 text-sm italic">We track your flight live</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Traveler's Checklist */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-gradient-to-br from-surface to-dark-bg border border-gold/20 rounded-[40px] p-12 relative overflow-hidden text-left">
                        <div className="absolute top-0 right-0 p-8 text-gold/5 grayscale">
                            <ListChecks className="w-40 h-40" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                                <ListChecks className="text-gold w-10 h-10" />
                                Traveler's Checklist
                            </h2>

                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                                {[
                                    'Passport (valid for at least 6 months)',
                                    'Travel insurance documents',
                                    'Book GoldaCabs (to avoid last-minute stress)',
                                    'Check your terminal (1 or 3)',
                                    'Online check-in to save time',
                                    'Weigh your luggage at home',
                                    'Power bank and adapters',
                                    'Photos of important documents on your phone',
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-5 h-5 border border-gold/50 rounded flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 bg-gold/10 border border-gold/30 p-6 rounded-2xl">
                                <p className="text-sm text-gold font-medium">
                                    💡 Golda's Tip: We recommend scheduling your pickup at least 4 hours before your flight to ensure a relaxed arrival at the airport.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Testimonials lang="en" />
            <FAQ lang="en" />
        </main>
    );
}
