'use client';

import Link from 'next/link';
import { CITIES } from '@/lib/cities';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark-bg text-gray-500 pt-12 pb-32 border-t border-white/10">
            <div className="container mx-auto px-4">

                {/* Cities Grid for SEO - Grouped by Region */}
                <div className="mb-12 border-b border-white/5 pb-12">
                    <h3 className="text-gold text-sm font-bold mb-6 text-center md:text-right uppercase tracking-wider">אזורי שירות פופולריים</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-white text-xs font-bold mb-4 border-r-2 border-gold pr-2">אזור השרון</h4>
                            <div className="flex flex-col gap-2">
                                {['raanana', 'herzliya', 'kfar-saba', 'hod-hasharon', 'netanya', 'tel-mond', 'even-yehuda'].map(key => (
                                    <Link key={key} href={`/taxi-${key}`} className="text-xs hover:text-gold transition-colors">
                                        מונית מ{CITIES[key].he.name} לנתב"ג
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white text-xs font-bold mb-4 border-r-2 border-gold pr-2">מרכז וגוש דן</h4>
                            <div className="flex flex-col gap-2">
                                {['tel-aviv', 'petah-tikva', 'ramat-gan', 'rishon-lezion', 'holon', 'bat-yam', 'shoham'].map(key => (
                                    <Link key={key} href={`/taxi-${key}`} className="text-xs hover:text-gold transition-colors">
                                        מונית מ{CITIES[key].he.name} לנתב"ג
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white text-xs font-bold mb-4 border-r-2 border-gold pr-2">צפון וחיפה</h4>
                            <div className="flex flex-col gap-2">
                                {['haifa', 'hadera', 'zikhron-yaakov', 'nahariya', 'akko', 'caesarea', 'tiberias'].map(key => (
                                    <Link key={key} href={`/taxi-${key}`} className="text-xs hover:text-gold transition-colors">
                                        מונית מ{CITIES[key].he.name} לנתב"ג
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white text-xs font-bold mb-4 border-r-2 border-gold pr-2">ירושלים ודרום</h4>
                            <div className="flex flex-col gap-2">
                                {['jerusalem', 'modiin', 'rehovot', 'ashdod', 'ashkelon', 'beer-sheva', 'eilat'].map(key => (
                                    <Link key={key} href={`/taxi-${key}`} className="text-xs hover:text-gold transition-colors">
                                        מונית מ{CITIES[key].he.name} לנתב"ג
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
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
