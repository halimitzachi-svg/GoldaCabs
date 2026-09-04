'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, Loader2 } from 'lucide-react';
import { dictionary, Locale } from '@/lib/dictionary';
import { motion, AnimatePresence } from 'framer-motion';

interface GoogleReview {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
}

export default function Testimonials({ lang = 'he' }: { lang?: Locale }) {
    const t = dictionary[lang].testimonials;
    const isRTL = lang === 'he';

    const [reviews, setReviews] = useState<GoogleReview[]>([]);
    const [stats, setStats] = useState<{ rating?: number, total?: number }>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch(`/api/reviews?lang=${lang}`);
                const data = await res.json();
                if (data.reviews) {
                    // Only show reviews with text
                    setReviews(data.reviews.filter((r: any) => r.text && r.text.length > 5));
                    setStats({ rating: data.rating, total: data.totalRatings });
                }
            } catch (error) {
                // Ignore silent fail
            } finally {
                setIsLoading(false);
            }
        }
        fetchReviews();
    }, [lang]);

    // Fallback items if API is empty or fails
    const displayReviews = reviews.length > 0 ? reviews : [];

    if (isLoading) {
        return (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
                <span className="text-gray-500 text-sm">
                    {isRTL ? 'טוען ביקורות מגוגל...' : 'Loading Google Reviews...'}
                </span>
            </div>
        );
    }

    if (displayReviews.length === 0) return null;

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="container mx-auto px-4 relative z-10">

                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">{t.title}</h2>

                    {stats.rating && (
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                <span className="font-bold text-white text-xl">{stats.rating}</span>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className={`w-4 h-4 ${s <= Math.round(stats.rating || 0) ? 'text-gold fill-gold' : 'text-gray-600'}`} />
                                    ))}
                                </div>
                                <span className="text-gray-500 text-sm">({stats.total} ביקורות)</span>
                            </div>
                            <a 
                                href="https://maps.google.com/?cid=16168621164204710320" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-white/5"
                                title={isRTL ? "צפו בכל הביקורות בגוגל מפות" : "View all reviews on Google Maps"}
                            >
                                <span className="text-xs text-gray-300 font-medium">Google Reviews</span>
                                <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </a>
                        </div>
                    )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" dir={isRTL ? 'rtl' : 'ltr'}>
                    <AnimatePresence>
                        {displayReviews.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-surface/40 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] relative group transition-all hover:border-gold/30 shadow-2xl flex flex-col h-full"
                            >
                                <Quote className={`absolute top-6 text-gold/10 w-12 h-12 transition-colors group-hover:text-gold/20 ${isRTL ? 'left-6' : 'right-6'}`} />

                                <div className="space-y-4 flex-1">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'text-gold fill-gold' : 'text-gray-600'}`} />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 italic leading-relaxed text-sm line-clamp-6">
                                        "{item.text}"
                                    </p>
                                </div>

                                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-3">
                                    {item.profile_photo_url ? (
                                        <img src={item.profile_photo_url} alt={item.author_name} className="w-10 h-10 rounded-full border border-white/10" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold">
                                            {item.author_name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <span className="font-bold text-white text-sm block">{item.author_name}</span>
                                        <span className="text-[10px] text-gray-500">{item.relative_time_description}</span>
                                    </div>
                                    <svg className="w-4 h-4 ml-auto opacity-20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
