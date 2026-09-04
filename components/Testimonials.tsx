'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, Loader2, ExternalLink } from 'lucide-react';
import { dictionary, Locale } from '@/lib/dictionary';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '@/lib/site-config';

interface GoogleReview {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
}

interface ReviewsResponse {
    source: 'google' | 'snapshot';
    rating: number;
    totalRatings: number;
    lastVerified?: string;
    reviews: GoogleReview[];
}

export default function Testimonials({ lang = 'he' }: { lang?: Locale }) {
    const t = dictionary[lang].testimonials;
    const isRTL = lang === 'he';

    const [data, setData] = useState<ReviewsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchReviews() {
            try {
                const res = await fetch(`/api/reviews?lang=${lang}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const json: ReviewsResponse = await res.json();
                if (isMounted) {
                    setData(json);
                }
            } catch (error) {
                // Silently fallback to site config snapshot
                if (isMounted) {
                    setData({
                        source: 'snapshot',
                        rating: Number(SITE_CONFIG.ratingSnapshot.ratingValue) || 5.0,
                        totalRatings: Number(SITE_CONFIG.ratingSnapshot.reviewCount) || 5,
                        lastVerified: SITE_CONFIG.ratingSnapshot.lastVerified,
                        reviews: []
                    });
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        fetchReviews();

        return () => {
            isMounted = false;
        };
    }, [lang]);

    if (isLoading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
                <span className="text-gray-500 text-sm">
                    {isRTL ? 'טוען ביקורות...' : 'Loading reviews...'}
                </span>
            </div>
        );
    }

    if (!data) return null;

    const hasLiveReviews = data.source === 'google' && data.reviews.length > 0;
    const formattedDate = data.lastVerified ? data.lastVerified.split('-').reverse().join('/') : '04/09/2026';

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="container mx-auto px-4 relative z-10">

                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">{t.title}</h2>

                    {/* Trust Rating Bar */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-sm">
                            <span className="font-bold text-white text-xl">{data.rating.toFixed(1)}</span>
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                        key={s}
                                        className={`w-4 h-4 ${s <= Math.round(data.rating) ? 'text-gold fill-gold' : 'text-gray-600'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-400 text-sm">
                                ({data.totalRatings} {isRTL ? 'ביקורות' : 'reviews'})
                            </span>
                        </div>

                        {/* If Snapshot, show verification date */}
                        {data.source === 'snapshot' && (
                            <span className="text-xs text-gray-500">
                                {isRTL ? `אומת לאחרונה: ${formattedDate}` : `Last verified: ${formattedDate}`}
                            </span>
                        )}

                        {/* Google Profile Link (rendered only if valid URL exists) */}
                        {SITE_CONFIG.googleReviewsUrl && (
                            <a
                                href={SITE_CONFIG.googleReviewsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gold transition-colors bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-white/5 mt-1"
                            >
                                <span>{isRTL ? 'לכל הביקורות ב-Google' : 'View all Google reviews'}</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Review Cards (only rendered when real verified reviews exist) */}
                {hasLiveReviews && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" dir={isRTL ? 'rtl' : 'ltr'}>
                        <AnimatePresence>
                            {data.reviews.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-white/5 border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between hover:border-gold/30 transition-colors"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex gap-1">
                                                {[...Array(item.rating || 5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                                                ))}
                                            </div>
                                            <Quote className="w-6 h-6 text-gold/20" />
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                            "{item.text}"
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs text-gray-500">
                                        <span className="font-semibold text-white">{item.author_name}</span>
                                        <span>{item.relative_time_description}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    );
}
