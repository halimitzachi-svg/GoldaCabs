import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import { Plane, Clock, CheckCircle2, Shield, MapPin } from 'lucide-react';
import { dictionary } from '@/lib/dictionary';
import { CITIES } from '@/lib/cities';

type Props = {
    params: Promise<{ slug: string }>
};

function getCityData(slug: string) {
    if (!slug || typeof slug !== 'string' || !slug.startsWith('taxi-')) return null;
    const cityKey = slug.replace('taxi-', '').toLowerCase();
    const cityEntry = CITIES[cityKey];
    return cityEntry?.en;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const cityData = getCityData(slug);

    if (!cityData) {
        return {};
    }

    const title = `Taxi from ${cityData.name} to Ben Gurion Airport | GoldaCabs`;
    const description = `Book a VIP taxi from ${cityData.name} to Ben Gurion Airport (TLV). Fixed price starting at ${cityData.price}ILS, English speaking drivers, and 24/7 availability.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            locale: 'en_IL',
            type: 'website',
        },
        keywords: [`taxi from ${cityData.name} to tlv`, `taxi ${cityData.name}`, 'airport transfer israel', 'golda cabs'],
        alternates: {
            canonical: `https://goldacabs.com/en/${slug}`,
            languages: {
                'he-IL': `https://goldacabs.com/${slug}`,
                'en-IL': `https://goldacabs.com/en/${slug}`,
            },
        }
    };
}

export async function generateStaticParams() {
    return Object.keys(CITIES).map((city) => ({
        slug: `taxi-${city}`,
    }));
}

export default async function CityPageEn({ params }: Props) {
    const { slug } = await params;
    const cityData = getCityData(slug);

    if (!cityData) {
        notFound();
    }

    const t = dictionary['en'].city_page;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': 'Taxi Service',
        'provider': {
            '@type': 'TaxiService',
            'name': 'GoldaCabs'
        },
        'areaServed': {
            '@type': 'City',
            'name': cityData.name
        },
        'name': `Taxi from ${cityData.name} to Airport`,
        'description': `VIP Airport transfer from ${cityData.name} to Ben Gurion.`,
        'offers': {
            '@type': 'Offer',
            'price': cityData.price,
            'priceCurrency': 'ILS'
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Hero lang="en" />

            <section className="py-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gold/5 blur-[120px] -z-10" />

                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">

                        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold text-center">
                            Taxi from {cityData.name} to Airport
                        </h1>

                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="bg-gold/20 p-4 rounded-full mb-4 text-gold">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">{t.duration}</h3>
                                <p className="text-gray-400">Approx. {cityData.duration}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="bg-gold/20 p-4 rounded-full mb-4 text-gold">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">{t.pickup}</h3>
                                <p className="text-gray-400">{t.pickup_desc}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="bg-gold/20 p-4 rounded-full mb-4 text-gold">
                                    <Shield className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">{t.price_fair}</h3>
                                <p className="text-gray-400">{t.price_start}{cityData.price}ILS</p>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none text-left bg-white/5 p-8 rounded-3xl border border-white/10">
                            <h2 className="text-2xl font-bold text-gold mb-4">{t.why_us_title}</h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                For residents and visitors of {cityData.name}, GoldaCabs offers the most reliable way to get to Ben Gurion Airport.
                                <br /><br />
                                Our drivers know the streets of {cityData.name} perfectly, ensuring you avoid traffic and get to your flight on time, every time.
                            </p>

                            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                <CheckCircle2 className="text-gold w-5 h-5" />
                                {t.availability}
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Whether your flight is at 3 AM or during rush hour, our taxi service in {cityData.name} is available 24/7.
                            </p>

                            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                <CheckCircle2 className="text-gold w-5 h-5" />
                                {t.large_taxis}
                            </h3>
                            <p className="text-gray-400">
                                Traveling with family or extra luggage? We offer spacious vans and large taxis in {cityData.name}.
                            </p>
                        </div>

                        {/* FAQ Section */}
                        <div className="mt-12 space-y-4">
                            <h2 className="text-3xl font-bold text-center mb-8">{t.faq_title}</h2>

                            {[
                                { q: `How much is a taxi from ${cityData.name} to Ben Gurion Airport?`, a: `Prices start from ${cityData.price}ILS. The final price depends on time of day (night tariff), number of passengers, and luggage. Use our calculator for an instant quote.` },
                                { q: `How far in advance should I book?`, a: `We recommend booking at least 24 hours in advance, especially during holidays. However, we also accept last-minute bookings subject to availability.` },
                                { q: `Do your drivers speak English?`, a: `Yes, most of our drivers speak fluent English and are experienced in serving international travelers.` }
                            ].map((faq, idx) => (
                                <details key={idx} className="group bg-surface border border-white/5 rounded-xl">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-white group-hover:text-gold transition-colors">
                                        <span>{faq.q}</span>
                                        <span className="transition group-open:rotate-180">
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                        </span>
                                    </summary>
                                    <div className="text-gray-400 mt-0 px-4 pb-4 leading-relaxed text-sm">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
