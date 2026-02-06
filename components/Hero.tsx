import { ArrowLeft, ArrowRight, ShieldCheck, Star, Clock } from "lucide-react";
import PriceCalculator from "./PriceCalculator";
import { dictionary, Locale } from '@/lib/dictionary';

export default function Hero({ lang = 'he' }: { lang?: Locale }) {
    const t = dictionary[lang].hero;
    const isRTL = lang === 'he';

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">

            {/* Video Background with Enhanced Fade */}
            <div className="absolute inset-x-0 top-0 h-[85vh] overflow-hidden pointer-events-none">
                <div className="relative w-full h-full">

                    {/* Stronger Dark Overlay for Text Visibility */}
                    <div className="absolute inset-0 bg-black/70 z-10" />
                    <div className="absolute inset-0 bg-dark-bg/50 z-10 mix-blend-multiply" />

                    {/* Smoother, Taller Bottom Gradient mask */}
                    <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-t from-dark-bg via-dark-bg/90 to-transparent z-20" />

                    {/* The Video (Standard HTML5) */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        poster="/hero-poster.webp"
                    >
                        <source src="/hero-video.webm" type="video/webm" />
                    </video>
                </div>

                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] z-10" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div className="space-y-8 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in mx-auto">
                            <Star className="w-4 h-4 text-gold fill-gold" />
                            <span className="text-sm font-medium text-gold">Premium Taxi Service</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
                            {t.title.split(' ').map((word, i) => (
                                i === 1 ? <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold block text-glow-gold">{word} </span> : word + ' '
                            ))}
                        </h1>

                        <p className="text-xl text-gray-400 max-w-lg leading-relaxed mx-auto">
                            {t.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href={`https://wa.me/972547438110?text=${encodeURIComponent(isRTL ? "היי מוניות גולדה, אשמח להזמין מונית" : "Hi Golda Cabs, I'd like to book a taxi")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gold hover:bg-gold-hover text-dark-bg px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                            >
                                {t.cta}
                                {isRTL ?
                                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" /> :
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                }
                            </a>
                        </div>

                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                            {[
                                { icon: ShieldCheck, label: isRTL ? "נהגים מורשים" : "Licensed Drivers" },
                                { icon: Clock, label: isRTL ? "דיוק בזמנים" : "Punctuality" },
                                { icon: Star, label: isRTL ? "שירות VIP" : "VIP Service" }
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <item.icon className="w-6 h-6 text-gold/80" />
                                    <span className="text-sm text-gray-400 font-medium">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Calculator Card */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gold-gradient rounded-3xl opacity-20 blur-xl"></div>
                        <PriceCalculator lang={lang} />
                    </div>
                </div>
            </div>
        </section>
    );
}
