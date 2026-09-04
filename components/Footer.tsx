'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { CITIES } from '@/lib/cities';
import { SITE_CONFIG } from '@/lib/site-config';

export default function Footer({ lang }: { lang?: 'he' | 'en' }) {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();
    const isEn = lang ? lang === 'en' : pathname?.startsWith('/en');

    const regions = {
        sharon: isEn
            ? { title: 'Sharon Area', keys: ['raanana', 'herzliya', 'kfar-saba', 'hod-hasharon', 'netanya', 'tel-mond', 'even-yehuda'] }
            : { title: 'אזור השרון', keys: ['raanana', 'herzliya', 'kfar-saba', 'hod-hasharon', 'netanya', 'tel-mond', 'even-yehuda'] },
        center: isEn
            ? { title: 'Central District', keys: ['tel-aviv', 'petah-tikva', 'ramat-gan', 'rishon-lezion', 'holon', 'bat-yam', 'kiryat-ono'] }
            : { title: 'מרכז וגוש דן', keys: ['tel-aviv', 'petah-tikva', 'ramat-gan', 'rishon-lezion', 'holon', 'bat-yam', 'kiryat-ono'] },
        north: isEn
            ? { title: 'North & Haifa', keys: ['haifa', 'hadera', 'zikhron-yaakov', 'nahariya', 'akko', 'caesarea', 'tiberias'] }
            : { title: 'צפון וחיפה', keys: ['haifa', 'hadera', 'zikhron-yaakov', 'nahariya', 'akko', 'caesarea', 'tiberias'] },
        south: isEn
            ? { title: 'Jerusalem & South', keys: ['jerusalem', 'modiin', 'rehovot', 'ashdod', 'ashkelon', 'beer-sheva', 'eilat'] }
            : { title: 'ירושלים ודרום', keys: ['jerusalem', 'modiin', 'rehovot', 'ashdod', 'ashkelon', 'beer-sheva', 'eilat'] }
    };

    return (
        <footer className="bg-dark-bg text-gray-500 pt-16 pb-32 border-t border-white/10" dir={isEn ? 'ltr' : 'rtl'}>
            <div className="container mx-auto px-4">

                {/* NAP & Business Identity Block (Service Area Business Standard) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 mb-12 border-b border-white/10 text-sm">
                    <div className="space-y-3">
                        <h4 className="text-white font-bold text-base flex items-center gap-2">
                            <span className="text-gold">★</span>
                            <span>{isEn ? SITE_CONFIG.nameEn : SITE_CONFIG.name}</span>
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                            {isEn
                                ? 'VIP taxi and transfer service to Ben Gurion Airport (TLV) and across Israel. Modern fleet, fixed transparent fares.'
                                : 'שירות הסעות VIP לנתב"ג ולכל רחבי הארץ. נהג אישי, רכבים חדישים ומרווחים, ומחירים שקופים ללא הפתעות.'}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h5 className="text-white text-xs font-bold uppercase tracking-wider">
                            {isEn ? 'Contact & Booking' : 'יצירת קשר והזמנות'}
                        </h5>
                        <div className="space-y-2 text-xs">
                            <a
                                href={`tel:${SITE_CONFIG.phone}`}
                                className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors font-semibold"
                            >
                                <Phone className="w-3.5 h-3.5 text-gold" />
                                <span>{SITE_CONFIG.phoneDisplay}</span>
                            </a>
                            <a
                                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                                    isEn ? "Hi GoldaCabs, I'd like to book a taxi" : "היי מוניות גולדה, אשמח להזמין מונית"
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors"
                            >
                                <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                                <span>{isEn ? 'WhatsApp Direct Chat' : 'צ\'אט ישיר בוואטסאפ'}</span>
                            </a>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h5 className="text-white text-xs font-bold uppercase tracking-wider">
                            {isEn ? 'Availability & Service Area' : 'שעות פעילות ואזורי שירות'}
                        </h5>
                        <div className="space-y-1.5 text-xs text-gray-400">
                            <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-gold" />
                                <span>{isEn ? '24/7 Available (All Days & Nights)' : 'זמינות 24/7 (ימים, לילות, שבת וחג)'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                                <span>{isEn ? 'Nationwide Coverage (Airport Focus)' : 'שירות מכל אזורי המרכז, השרון, הצפון והדרום'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h5 className="text-white text-xs font-bold uppercase tracking-wider">
                            {isEn ? 'Payments & Trust' : 'אמצעי תשלום ואמון'}
                        </h5>
                        <p className="text-gray-400 text-xs">
                            {isEn ? 'Cash, Bit, Paybox' : 'תשלום במזומן, באפליקציית Bit או Paybox.'}
                        </p>
                        {SITE_CONFIG.googleReviewsUrl && (
                            <a
                                href={SITE_CONFIG.googleReviewsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-gold hover:underline pt-1"
                            >
                                <span>{isEn ? 'Verified Google Reviews' : 'ביקורות מאומתות ב-Google'}</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Cities Grid for SEO - Grouped by Region */}
                <div className="mb-12 border-b border-white/5 pb-12">
                    <h3 className="text-gold text-sm font-bold mb-6 text-center md:text-start uppercase tracking-wider">
                        {isEn ? 'Popular Service Areas' : 'אזורי שירות פופולריים'}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {Object.entries(regions).map(([key, region]) => (
                            <div key={key}>
                                <h4 className={`text-white text-xs font-bold mb-4 border-gold ${isEn ? 'border-l-2 pl-2' : 'border-r-2 pr-2'}`}>
                                    {region.title}
                                </h4>
                                <div className="flex flex-col gap-2">
                                    {region.keys.map(cityKey => (
                                        <Link
                                            key={cityKey}
                                            href={isEn ? `/en/taxi-${cityKey}` : `/taxi-${cityKey}`}
                                            className="text-xs hover:text-gold transition-colors"
                                        >
                                            {isEn
                                                ? `Taxi ${CITIES[cityKey].en.name} to TLV`
                                                : `מונית מ${CITIES[cityKey].he.name} לנתב"ג`}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legal, Accessibility & Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    <div className={`text-center ${isEn ? 'md:text-left' : 'md:text-right'}`}>
                        <p>&copy; {currentYear} {isEn ? SITE_CONFIG.nameEn : SITE_CONFIG.name}. {isEn ? 'All rights reserved.' : 'כל הזכויות שמורות.'}</p>
                        <p className="mt-1 text-xs text-gray-600">VIP Ben Gurion Airport Transfer Service</p>
                    </div>

                    <div className="flex flex-wrap gap-6 justify-center">
                        <Link href="/deliveries" className="hover:text-gold transition-colors font-medium">
                            {isEn ? 'Express Deliveries' : 'משלוחים במונית'}
                        </Link>
                        <Link href="/legal" className="hover:text-gold transition-colors">
                            {isEn ? 'Legal & Privacy' : 'תנאי שימוש ופרטיות'}
                        </Link>
                        <button
                            type="button"
                            onClick={() => document.querySelector<HTMLElement>('button[aria-label="Accessibility Menu"]')?.click()}
                            className="hover:text-gold transition-colors cursor-pointer"
                        >
                            {isEn ? 'Accessibility' : 'הצהרת נגישות'}
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
