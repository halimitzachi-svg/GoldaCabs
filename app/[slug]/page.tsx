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
    return cityEntry?.he;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const cityData = getCityData(slug);

    if (!cityData) {
        return {};
    }

    const title = `מוניות ${cityData.name} לנתב"ג - הכי זול והכי מהיר | מוניות גולדה`;
    const description = `מחפשים מונית מ${cityData.name} לנתב"ג? מוניות גולדה מציעים מחיר משתלם החל מ-${cityData.price}₪, איסוף מדויק מהבית ב${cityData.name}, רכבים חדישים וזמינות 24/7. הזמינו עכשיו בוואטסאפ!`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            locale: 'he_IL',
            type: 'website',
        },
        keywords: [`מונית מ${cityData.name} לנתב"ג`, `מוניות ${cityData.name}`, 'הסעה לנתב"ג', 'מונית גדולה לשדה התעופה', cityData.name]
    };
}

export async function generateStaticParams() {
    return Object.keys(CITIES).map((city) => ({
        slug: `taxi-${city}`,
    }));
}

export default async function CityPage({ params }: Props) {
    const { slug } = await params;
    const cityData = getCityData(slug);

    if (!cityData) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': 'Taxi Service',
        'provider': {
            '@type': 'TaxiService',
            'name': 'מוניות גולדה'
        },
        'areaServed': {
            '@type': 'City',
            'name': cityData.name
        },
        'name': `מונית מ${cityData.name} לנתב"ג`,
        'description': `שירות הסעות VIP מ${cityData.name} לשדה התעופה בן גוריון.`,
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

            <Hero />

            <section className="py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[120px] -z-10" />

                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">

                        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold text-center">
                            מוניות {cityData.name} לנתב"ג
                        </h1>

                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="bg-gold/20 p-4 rounded-full mb-4 text-gold">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">זמן נסיעה משוער</h3>
                                <p className="text-gray-400">כ-{cityData.duration} ממרכז {cityData.name} לשדה</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="bg-gold/20 p-4 rounded-full mb-4 text-gold">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">איסוף מדויק</h3>
                                <p className="text-gray-400">מכל כתובת ב{cityData.name} ישירות לטרמינל 3</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="bg-gold/20 p-4 rounded-full mb-4 text-gold">
                                    <Shield className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">מחיר הוגן</h3>
                                <p className="text-gray-400">החל מ-{cityData.price}₪ (ללא הפתעות)</p>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none text-right bg-white/5 p-8 rounded-3xl border border-white/10">
                            <h2 className="text-2xl font-bold text-gold mb-4">למה להזמין מונית מ{cityData.name} עם מוניות גולדה?</h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                תושבי {cityData.name} כבר יודעים - הדרך הכי טובה להתחיל את החופשה היא עם מוניות גולדה.
                                אנחנו מציעים שירות הסעות פרימיום מכל שכונות {cityData.name} ישירות לשדה התעופה בן גוריון.
                                <br /><br />
                                הנהגים שלנו מכירים היטב את כבישי {cityData.name} ואת דרכי הגישה המהירות ביותר, כדי להבטיח שתגיעו לטיסה בזמן, ברוגע ובנוחות מקסימלית.
                            </p>

                            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                <CheckCircle2 className="text-gold w-5 h-5" />
                                זמינות 24/7 ב{cityData.name}
                            </h3>
                            <p className="text-gray-400 mb-6">
                                לא משנה אם הטיסה שלכם ממריאה באמצע הלילה או בשיא הפקקים של הבוקר, המוניות שלנו ב{cityData.name} זמינות עבורכם מסביב לשעון.
                            </p>
                        </div>

                        <div className="mt-12 space-y-4">
                            <h2 className="text-3xl font-bold text-center mb-8">שאלות נפוצות על הסעות מ{cityData.name} לנתב"ג</h2>

                            {[
                                { q: `כמה עולה מונית מ${cityData.name} לנתב"ג?`, a: `המחיר לנסיעה מ${cityData.name} לנתב"ג מתחיל ב-${cityData.price}₪ לנסיעה רגילה בשעות היום. המחיר עשוי להשתנות בהתאם לשעות הלילה (תעריף ב'), כמות הנוסעים והמזוודות. מומלץ להשתמש במחשבון באתר לקבלת מחיר מדויק.` },
                                { q: `כמה זמן מראש צריך להזמין מונית מ${cityData.name}?`, a: `אנו ממליצים להזמין מונית כ-24 שעות מראש, במיוחד בעונות התיירות העמוסות. עם זאת, במוניות גולדה אנו ערוכים גם לקריאות מיידיות מ${cityData.name} בכפוף לזמינות.` },
                                { q: `האם יש לכם נהגים דוברי אנגלית ב${cityData.name}?`, a: `כן, רבים מהנהגים שלנו ב${cityData.name} דוברים אנגלית ושפות נוספות, ומורגלים במתן שירות לתיירים ואנשי עסקים.` }
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
