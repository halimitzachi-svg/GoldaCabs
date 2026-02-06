'use client';

import { Phone } from 'lucide-react';

export default function PhoneWidget() {
    return (
        <a
            href="tel:0547438110"
            className="fixed bottom-4 right-4 z-50 bg-gold text-black p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:scale-110 active:scale-95 group animate-bounce-subtle"
            aria-label="Call Golda Cabs"
        >
            <div className="relative">
                {/* Pulse Effect */}
                <span className="absolute inset-0 rounded-full bg-gold/50 animate-ping" />
                <Phone className="w-6 h-6 relative z-10" />
            </div>

            {/* Tooltip on hover (desktop) */}
            <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-black text-xs font-bold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
                חיוג מהיר / Call Now
            </span>
        </a>
    );
}
