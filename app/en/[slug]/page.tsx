import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import { Clock, CheckCircle2, Shield, MapPin, Compass } from 'lucide-react';
import Link from 'next/link';
import { dictionary } from '@/lib/dictionary';
import { CITIES } from '@/lib/cities';
import { getCityServiceSchema, getFAQSchema } from '@/lib/schema';
import { getLocalCityContent } from '@/lib/city-content';

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
    const description = `Book a VIP taxi from ${cityData.name} to Ben Gurion Airport (TLV). Transparent price estimate from ${cityData.price}ILS, English-speaking drivers, and 24/7 availability.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: 'https://www.goldacabs.co.il/og-image.jpg',
                    secureUrl: 'https://www.goldacabs.co.il/og-image.jpg',
                    width: 1200,
                    height: 630,
                    type: 'image/jpeg',
                    alt: `Taxi from ${cityData.name} to Ben Gurion Airport | GoldaCabs VIP`,
                },
                {
                    url: 'https://www.goldacabs.co.il/og-image.png',
                    secureUrl: 'https://www.goldacabs.co.il/og-image.png',
                    width: 800,
                    height: 800,
                    type: 'image/png',
                    alt: `Taxi from ${cityData.name} to Ben Gurion Airport | GoldaCabs VIP`,
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://www.goldacabs.co.il/og-image.jpg'],
        },
        keywords: [`taxi from ${cityData.name} to tlv`, `taxi ${cityData.name}`, 'airport transfer israel', 'golda cabs'],
        alternates: {
            canonical: `https://www.goldacabs.co.il/en/${slug}`,
            languages: {
                'he-IL': `https://www.goldacabs.co.il/${slug}`,
                'en-IL': `https://www.goldacabs.co.il/en/${slug}`,
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

    const cleanCityKey = slug.replace('taxi-', '').toLowerCase();
    const localContent = getLocalCityContent(cleanCityKey);

    const faqs = [
        {
            q: `How much is a taxi from ${cityData.name} to Ben Gurion Airport?`,
            a: `Estimated base fare from ${cityData.name} starts at ${cityData.price}ILS from city center. The final price depends on exact pickup address, time of day (day/night/weekend tariffs), and luggage.`
        },
        {
            q: `How far in advance should I book my ride from ${cityData.name}?`,
            a: `We recommend booking 12–24 hours in advance to guarantee driver assignment. Urgent and last-minute requests are also accommodated based on immediate availability.`
        },
        {
            q: `How can I pay for the transfer?`,
            a: `Payment is accepted via Cash, or popular Israeli mobile payment apps (Bit and Paybox) directly with your driver.`
        },
        {
            q: `Do you offer large vehicles for families with multiple suitcases?`,
            a: `Yes. Our fleet includes spacious minivans and minibuses accommodating 6 to 10+ passengers with extensive luggage capacity.`
        }
    ];

    // Clean JSON-LD: zero aggregateRating, zero review, zero offers
    const jsonLd = getCityServiceSchema(cityData, 'en');
    const faqJsonLd = getFAQSchema(faqs);

    return (
        <div className="min-h-screen bg-dark-bg text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Above the Fold Hero with Primary H1 */}
            <Hero
                lang="en"
                isSubPage={true}
                customTitle={`Taxi from ${cityData.name} to Ben Gurion`}
                customSubtitle={`VIP door-to-door transfer from ${cityData.name} to TLV Airport • From ${cityData.price}ILS • Available 24/7`}
                citySlug={cleanCityKey}
            />

            <section className="py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[120px] -z-10" />

                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-12 text-left">

                        {/* Quick Stats */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="bg-gold/20 p-4 rounded-full mb-4 text-gold">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">Est. Travel Time</h3>
                                <p className="text-gray-400">~{cityData.duration} from central {cityData.name}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="bg-gold/20 p-4 rounded-full mb-4 text-gold">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">Distance to TLV</h3>
                                <p className="text-gray-400">~{cityData.distance} km</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="bg-gold/20 p-4 rounded-full mb-4 text-gold">
                                    <Shield className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">Transparent Fare</h3>
                                <p className="text-gray-400">From {cityData.price}ILS (city center baseline)</p>
                            </div>
                        </div>

                        {/* Verified Local GEO Information Box (if available) */}
                        {localContent && (
                            <div className="bg-gradient-to-br from-gold/10 via-white/5 to-transparent p-8 rounded-3xl border border-gold/20 space-y-6">
                                <div className="flex items-center gap-3">
                                    <Compass className="w-6 h-6 text-gold" />
                                    <h2 className="text-2xl font-bold text-white">
                                        Local Route & Transfer Info: {cityData.name} to TLV
                                    </h2>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-2">
                                        <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                                            Key Pickup Districts
                                        </span>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            Door-to-door service across {cityData.name}: {localContent.neighborhoods.join(' • ')}.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                                            Primary Transit Routes
                                        </span>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            {localContent.mainRoutes.join(', ')}.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                                            Peak vs Off-Peak Transit
                                        </span>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            Rush hours: ~{localContent.peakDuration} | Off-peak / night: ~{localContent.offPeakDuration}.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                                            Airport Arrival Pickups
                                        </span>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            {localContent.arrivalNotesEn}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                                    <span>Last reviewed: {localContent.lastReviewed}</span>
                                    <span>Sources: GoldaCabs Dispatch Archive</span>
                                </div>
                            </div>
                        )}

                        {/* General Content */}
                        <div className="prose prose-invert max-w-none text-left bg-white/5 p-8 rounded-3xl border border-white/10">
                            <h2 className="text-2xl font-bold text-gold mb-4">Why Book with GoldaCabs from {cityData.name}?</h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                Experience hassle-free airport transit directly from your doorstep in {cityData.name} to Terminal 3 or Terminal 1.
                                Our professional, English-speaking drivers ensure punctual, comfortable, and stress-free rides around the clock.
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 my-8">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="text-gold w-5 h-5" />
                                        Safety & Premium Fleet
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Late-model, spotlessly clean, and climate-controlled vehicles.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="text-gold w-5 h-5" />
                                        24/7 Dispatch
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Full availability for early morning departures, red-eye flights, and weekend transfers.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="text-gold w-5 h-5" />
                                        Spacious Family Vans
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Minivans and large taxis configured for 6 to 10 passengers with multiple suitcases.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="text-gold w-5 h-5" />
                                        Guaranteed Punctuality
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Drivers arrive 5–10 minutes early and assist with your luggage.
                                    </p>
                                </div>
                            </div>

                            {/* Transparent Price Guarantee Box */}
                            <div className="bg-gold/10 p-6 rounded-2xl border border-gold/20 my-6">
                                <h3 className="text-xl font-bold text-gold mb-3 text-center">Transparent Fare Estimate: {cityData.name} - TLV</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between border-b border-gold/10 pb-2">
                                        <span>Standard Sedan (Up to 4 passengers)</span>
                                        <span className="font-bold">From {cityData.price}ILS (City center baseline)</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gold/10 pb-2">
                                        <span>Luggage & Suitcases</span>
                                        <span className="font-bold">No hidden per-bag fee*</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gold/10 pb-2">
                                        <span>Night / Weekend Service</span>
                                        <span className="font-bold">Standard Tariff B / C applied</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-3 text-center">
                                    *No separate fee per suitcase. Vehicle size is matched to your group and luggage count. Final fare confirmed before departure.
                                </p>
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions: {cityData.name} to TLV</h2>

                            {faqs.map((faq, idx) => (
                                <details key={idx} className="group bg-surface border border-white/5 rounded-xl">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-white group-hover:text-gold transition-colors">
                                        <span>{faq.q}</span>
                                        <span className="transition group-open:rotate-180">
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                        </span>
                                    </summary>
                                    <div className="text-gray-400 px-4 pb-4 leading-relaxed text-sm">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>

                        {/* Nearby Cities */}
                        <div className="pt-8 border-t border-white/5">
                            <h3 className="text-2xl font-bold mb-6 text-center text-gold">Taxi Service in Nearby Cities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(CITIES)
                                    .filter(([key, entry]) => entry.en.region === cityData.region && entry.en.name !== cityData.name)
                                    .slice(0, 8)
                                    .map(([key, entry]) => (
                                        <Link
                                            key={key}
                                            href={`/en/taxi-${key}`}
                                            className="bg-white/5 border border-white/10 p-4 rounded-xl text-center text-sm hover:border-gold/50 hover:bg-gold/5 transition-all text-gray-300 hover:text-gold"
                                        >
                                            Taxi from {entry.en.name}
                                        </Link>
                                    ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
