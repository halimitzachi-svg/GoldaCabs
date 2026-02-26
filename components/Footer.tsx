'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CITIES } from '@/lib/cities';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();
    const isEn = pathname?.startsWith('/en');

    const regions = {
        sharon: isEn
            ? { title: 'Sharon Area', keys: ['raanana', 'herzliya', 'kfar-saba', 'hod-hasharon', 'netanya', 'tel-mond', 'even-yehuda'] }
            : { title: 'אזור השרון', keys: ['raanana', 'herzliya', 'kfar-saba', 'hod-hasharon', 'netanya', 'tel-mond', 'even-yehuda'] },
        center: isEn
            ? { title: 'Central District', keys: ['tel-aviv', 'petah-tikva', 'ramat-gan', 'rishon-lezion', 'holon', 'bat-yam', 'shoham'] }
            : { title: 'מרכז וגוש דן', keys: ['tel-aviv', 'petah-tikva', 'ramat-gan', 'rishon-lezion', 'holon', 'bat-yam', 'shoham'] },
        north: isEn
            ? { title: 'North & Haifa', keys: ['haifa', 'hadera', 'zikhron-yaakov', 'nahariya', 'akko', 'caesarea', 'tiberias'] }
            : { title: 'צפון וחיפה', keys: ['haifa', 'hadera', 'zikhron-yaakov', 'nahariya', 'akko', 'caesarea', 'tiberias'] },
        south: isEn
            ? { title: 'Jerusalem & South', keys: ['jerusalem', 'modiin', 'rehovot', 'ashdod', 'ashkelon', 'beer-sheva', 'eilat'] }
            : { title: 'ירושלים ודרום', keys: ['jerusalem', 'modiin', 'rehovot', 'ashdod', 'ashkelon', 'beer-sheva', 'eilat'] }
    };

    return (
        <footer className="bg-dark-bg text-gray-500 pt-12 pb-32 border-t border-white/10">
            <div className="container mx-auto px-4">

                {/* Cities Grid for SEO - Grouped by Region */}
                <div className="mb-12 border-b border-white/5 pb-12">
                    <h3 className="text-gold text-sm font-bold mb-6 text-center md:text-right uppercase tracking-wider">
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
                                                : `מונית מ${CITIES[cityKey].he.name} לנתב"ג`
                                            }
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">

                    {/* Brand / Copyright */}
                    <div className={`text-center ${isEn ? 'md:text-left' : 'md:text-right'}`}>
                        <p>&copy; {currentYear} GoldaCabs. {isEn ? 'All rights reserved.' : 'כל הזכויות שמורות.'}</p>
                        <p className="mt-1 text-xs text-gray-600">Premium Airport Taxi Service</p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-6">
                        <Link href="/deliveries" className="hover:text-gold transition-colors font-medium">
                            {isEn ? 'Deliveries' : 'משלוחים במונית'}
                        </Link>
                        <Link href="/legal" className="hover:text-gold transition-colors">
                            {isEn ? 'Legal & Privacy' : 'תנאי שימוש ופרטיות'}
                        </Link>
                        {/* Accessibility - we have the widget, but a link is nice too */}
                        <button
                            onClick={() => document.querySelector<HTMLElement>('button[aria-label="Accessibility Menu"]')?.click()}
                            className="hover:text-gold transition-colors"
                        >
                            {isEn ? 'Accessibility' : 'הצהרת נגישות'}
                        </button>
                    </div>

                </div>
            </div>
        </footer>
    );
}
