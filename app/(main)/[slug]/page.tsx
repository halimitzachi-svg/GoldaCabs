import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import { Clock, CheckCircle2, Shield, MapPin, Compass, Navigation } from 'lucide-react';
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
    return cityEntry?.he;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const cityData = getCityData(slug);

    if (!cityData) {
        return {};
    }

    const title = `מוניות ${cityData.name} לנתב"ג | מוניות גולדה VIP`;
    const description = `הזמנת מונית מ${cityData.name} לנתב"ג. מחיר שקוף החל מ-${cityData.price}₪, איסוף מדלת הבית ב${cityData.name}, רכבים חדישים ומרווחים, זמינות 24/7.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            locale: 'he_IL',
            type: 'website',
            images: [
                {
                    url: 'https://www.goldacabs.co.il/og-image.jpg',
                    secureUrl: 'https://www.goldacabs.co.il/og-image.jpg',
                    width: 1200,
                    height: 630,
                    type: 'image/jpeg',
                    alt: `מוניות ${cityData.name} לנתב"ג | מוניות גולדה VIP`,
                },
                {
                    url: 'https://www.goldacabs.co.il/og-image.png',
                    secureUrl: 'https://www.goldacabs.co.il/og-image.png',
                    width: 800,
                    height: 800,
                    type: 'image/png',
                    alt: `מוניות ${cityData.name} לנתב"ג | מוניות גולדה VIP`,
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://www.goldacabs.co.il/og-image.jpg'],
        },
        keywords: [`מונית מ${cityData.name} לנתב"ג`, `מוניות ${cityData.name}`, 'הסעה לנתב"ג', 'מונית גדולה לשדה התעופה', cityData.name],
        alternates: {
            canonical: `https://www.goldacabs.co.il/${slug}`,
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

export default async function CityPage({ params }: Props) {
    const { slug } = await params;
    const cityData = getCityData(slug);

    if (!cityData) {
        notFound();
    }

    const cleanCityKey = slug.replace('taxi-', '').toLowerCase();
    const localContent = getLocalCityContent(cleanCityKey);

    const faqs = [
        {
            q: `כמה עולה מונית מ${cityData.name} לנתב"ג?`,
            a: `המחיר לנסיעה מ${cityData.name} לנתב"ג מתחיל ב-${cityData.price}₪ כהערכת בסיס ממרכז העיר. המחיר הסופי נקבע בהתאם לכתובת האיסוף המדויקת, שעת הנסיעה (תעריף יום/לילה/שבת), וכמות הנוסעים והכבודה.`
        },
        {
            q: `כמה זמן מראש צריך להזמין מונית מ${cityData.name}?`,
            a: `אנו ממליצים להזמין מונית כ-12–24 שעות מראש כדי לשריין נהג ורכב מותאם. במוניות גולדה אנו ערוכים גם לקריאות דחופות מ${cityData.name} על בסיס זמינות מיידית.`
        },
        {
            q: `כיצד ניתן לשלם עבור הנסיעה?`,
            a: `אנו מקבלים תשלום במגוון אמצעים: במזומן, באפליקציית Bit ו-Paybox ישירות מול הנהג.`
        },
        {
            q: `האם ניתן להזמין מונית גדולה מ${cityData.name} למשפחה עם מזוודות?`,
            a: `בהחלט. הצי שלנו כולל מוניות ספיישל, רכבי ואן (עד 7 נוסעים) ומיניבוסים (עד 11–20 נוסעים) המותאמים למשפחות עם כבודה מרובה.`
        }
    ];

    // Clean JSON-LD: zero aggregateRating, zero review, zero offers (prices are estimates in visible UI only)
    const jsonLd = getCityServiceSchema(cityData, 'he');
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
                lang="he"
                isSubPage={true}
                customTitle={`מוניות ${cityData.name} לנתב"ג`}
                customSubtitle={`הסעות VIP מדלת הבית ב${cityData.name} ישירות לטרמינל • החל מ-${cityData.price}₪ • זמינות 24/7`}
                citySlug={cleanCityKey}
            />

            <section className="py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[120px] -z-10" />

                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-12">

                        {/* Quick Stats Grid */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="bg-gold/20 p-4 rounded-full mb-4 text-gold">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">זמן נסיעה משוער</h3>
                                <p className="text-gray-400">כ-{cityData.duration} ממרכז {cityData.name}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="bg-gold/20 p-4 rounded-full mb-4 text-gold">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">מרחק מנתב"ג</h3>
                                <p className="text-gray-400">כ-{cityData.distance} ק"מ</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="bg-gold/20 p-4 rounded-full mb-4 text-gold">
                                    <Shield className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-2">הערכת מחיר שקופה</h3>
                                <p className="text-gray-400">החל מ-{cityData.price}₪ ממרכז העיר</p>
                            </div>
                        </div>

                        {/* Verified Local GEO Information Box (if available for top cities) */}
                        {localContent && (
                            <div className="bg-gradient-to-br from-gold/10 via-white/5 to-transparent p-8 rounded-3xl border border-gold/20 space-y-6">
                                <div className="flex items-center gap-3">
                                    <Compass className="w-6 h-6 text-gold" />
                                    <h2 className="text-2xl font-bold text-white">
                                        מידע מקומי לנוסעים מ{cityData.name} לנתב"ג
                                    </h2>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-2">
                                        <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                                            שכונות ונקודות איסוף מרכזיות
                                        </span>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            איסוף מכל רחבי {cityData.name}: {localContent.neighborhoods.join(' • ')}.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                                            נתיבי נסיעה עיקריים
                                        </span>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            {localContent.mainRoutes.join(', ')}.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                                            זמני נסיעה בשעות עומס מול לילה
                                        </span>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            שעות שיא: כ-{localContent.peakDuration} | שעות שפל/לילה: כ-{localContent.offPeakDuration}.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                                            איסוף מנחיתות בנתב"ג
                                        </span>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            {localContent.arrivalNotesHe}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                                    <span>עודכן לאחרונה: {localContent.lastReviewed.split('-').reverse().join('/')}</span>
                                    <span>מקור: תיעוד תנועה ומערך השיגור של מוניות גולדה</span>
                                </div>
                            </div>
                        )}

                        {/* General City Page Content */}
                        <div className="prose prose-invert max-w-none text-right bg-white/5 p-8 rounded-3xl border border-white/10">
                            <h2 className="text-2xl font-bold text-gold mb-4">למה להזמין מונית מ{cityData.name} עם מוניות גולדה?</h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                תושבי {cityData.name} כבר יודעים - הדרך הכי נוחה ובטוחה להתחיל את הנסיעה לחו"ל היא עם מוניות גולדה.
                                אנחנו מציעים שירות הסעות פרימיום מדלת הבית ב{cityData.name} ישירות לטרמינל 3 או טרמינל 1.
                                <br /><br />
                                הנהגים שלנו מכירים היטב את כבישי האזור ואת צירי התנועה המהירים ביותר, כדי להבטיח שתגיעו לטיסה בזמן, ברוגע ובנוחות מקסימלית.
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 my-8">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="text-gold w-5 h-5" />
                                        ביטחון ובטיחות מעל הכל
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        כל הרכבים בצי שלנו חדישים, נקיים ומתוחזקים ברמה הגבוהה ביותר.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="text-gold w-5 h-5" />
                                        זמינות 24/7 ב{cityData.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        זמינים מסביב לשעון לטיסות בוקר מוקדמות, טיסות לילה ונחיתות בסופי שבוע וחגים.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="text-gold w-5 h-5" />
                                        רכבים מרווחים לכל המשפחה
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        צי רכבים מגוון כולל רכבי ואן ומיניבוס המתאימים ל-6 עד 10 נוסעים עם הרבה כבודה.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="text-gold w-5 h-5" />
                                        דייקנות ללא פשרות
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        הנהגים שלנו מגיעים כ-5 דקות לפני הזמן שנקבע ומסייעים בהעמסת המזוודות.
                                    </p>
                                </div>
                            </div>

                            {/* Transparent Price Guarantee Box */}
                            <div className="bg-gold/10 p-6 rounded-2xl border border-gold/20 my-6">
                                <h3 className="text-xl font-bold text-gold mb-3 text-center">הערכת מחיר שקופה: {cityData.name} - נתב"ג</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between border-b border-gold/10 pb-2">
                                        <span>מונית ספיישל (עד 4 נוסעים)</span>
                                        <span className="font-bold">החל מ-{cityData.price}₪ (הערכת מרכז עיר)</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gold/10 pb-2">
                                        <span>כבודה ומזוודות</span>
                                        <span className="font-bold">ללא חיוב נפרד למזוודה*</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gold/10 pb-2">
                                        <span>נסיעת לילה / שבת וחג</span>
                                        <span className="font-bold">תעריף ב' / ג' כלול בחישוב</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-3 text-center">
                                    *אין חיוב נפרד לכל מזוודה. סוג הרכב והמחיר מותאמים למספר הנוסעים ולכמות הכבודה. המחיר הסופי מתואם מראש לפני הנסיעה.
                                </p>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-center mb-8">שאלות נפוצות על מוניות מ{cityData.name} לנתב"ג</h2>

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

                        {/* Nearby Cities - Internal Linking */}
                        <div className="pt-8 border-t border-white/5">
                            <h3 className="text-2xl font-bold mb-6 text-center text-gold">שירות מוניות ביישובים סמוכים</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(CITIES)
                                    .filter(([key, entry]) => entry.he.region === cityData.region && entry.he.name !== cityData.name)
                                    .slice(0, 8)
                                    .map(([key, entry]) => (
                                        <Link
                                            key={key}
                                            href={`/taxi-${key}`}
                                            className="bg-white/5 border border-white/10 p-4 rounded-xl text-center text-sm hover:border-gold/50 hover:bg-gold/5 transition-all text-gray-300 hover:text-gold"
                                        >
                                            מונית מ{entry.he.name}
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
