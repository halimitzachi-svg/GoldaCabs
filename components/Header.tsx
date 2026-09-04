'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Globe } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export default function Header({ lang = 'he' }: { lang: 'he' | 'en' }) {
    const pathname = usePathname() || '/';
    const isHe = lang === 'he';

    // Compute alternate language target URL
    let targetUrl = '/';
    if (isHe) {
        // We are currently on Hebrew
        if (pathname === '/') {
            targetUrl = '/en';
        } else if (pathname.startsWith('/taxi-')) {
            targetUrl = `/en${pathname}`;
        } else {
            targetUrl = '/en';
        }
    } else {
        // We are currently on English
        if (pathname === '/en' || pathname === '/en/') {
            targetUrl = '/';
        } else if (pathname.startsWith('/en/taxi-')) {
            targetUrl = pathname.replace('/en', '');
        } else {
            targetUrl = '/';
        }
    }

    return (
        <header className="fixed top-0 inset-x-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/10 transition-all">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Brand Logo */}
                <Link
                    href={isHe ? '/' : '/en'}
                    className="flex items-center gap-2 text-xl font-extrabold tracking-tight group"
                >
                    <span className="text-white group-hover:text-gold transition-colors">
                        {isHe ? SITE_CONFIG.name : SITE_CONFIG.nameEn}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20 font-medium">
                        VIP
                    </span>
                </Link>

                {/* Actions: Phone & Language Switcher */}
                <div className="flex items-center gap-3">
                    {/* Call Button */}
                    <a
                        href={`tel:${SITE_CONFIG.phone}`}
                        className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-white/90 hover:text-gold bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-all"
                        title={isHe ? "חיוג ישיר" : "Call direct"}
                    >
                        <Phone className="w-3.5 h-3.5 text-gold" />
                        <span className="hidden sm:inline">{SITE_CONFIG.phoneDisplay}</span>
                    </a>

                    {/* Language Switcher Link (standard anchor for clean hard navigation between root layouts) */}
                    <a
                        href={targetUrl}
                        className="flex items-center gap-1 text-xs font-bold text-dark-bg bg-gold hover:bg-gold-hover px-3 py-1.5 rounded-full transition-all shadow-[0_0_12px_rgba(212,175,55,0.2)]"
                        title={isHe ? "Switch to English" : "עבור לעברית"}
                    >
                        <Globe className="w-3 h-3" />
                        <span>{isHe ? 'EN' : 'עב'}</span>
                    </a>
                </div>
            </div>
        </header>
    );
}
