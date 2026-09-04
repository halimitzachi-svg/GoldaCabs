'use client';

import { useState, useEffect } from 'react';

export default function HeroVideo() {
    const [canPlayVideo, setCanPlayVideo] = useState(false);

    useEffect(() => {
        // Safe check for data saver mode
        const isSaveData = 'connection' in navigator && (navigator as any).connection?.saveData === true;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const checkScreen = () => {
            const isDesktop = window.innerWidth >= 1024;
            if (isDesktop && !isSaveData && !prefersReducedMotion) {
                setCanPlayVideo(true);
            } else {
                setCanPlayVideo(false);
            }
        };

        // Initial check on mount
        checkScreen();

        // Listen for screen resize
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    return (
        <div className="relative w-full h-full">
            {/* Always visible poster backdrop with luxury opacity */}
            <picture className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                    src="/hero-poster.webp"
                    alt="GoldaCabs Premium Fleet"
                    className="w-full h-full object-cover opacity-80"
                    loading="eager"
                    decoding="async"
                />
            </picture>

            {/* Video injected strictly on desktop without data-saver */}
            {canPlayVideo && (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/hero-poster.webp"
                    className="w-full h-full object-cover transition-opacity duration-700 opacity-80"
                    title="GoldaCabs Premium VIP Promo"
                >
                    <source src="/hero-video.webm" type="video/webm" />
                </video>
            )}
        </div>
    );
}
