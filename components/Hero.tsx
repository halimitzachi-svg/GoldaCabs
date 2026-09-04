import { ArrowLeft, ArrowRight, ShieldCheck, Star, Clock } from "lucide-react";
import PriceCalculator from "./PriceCalculator";
import HeroVideo from "./HeroVideo";
import { dictionary, Locale } from '@/lib/dictionary';
import AnalyticsLink from "./AnalyticsLink";

type Props = {
    lang?: Locale;
    isSubPage?: boolean;
    customTitle?: string;
    customSubtitle?: string;
    citySlug?: string;
};

export default function Hero({
    lang = 'he',
    isSubPage = false,
    customTitle,
    customSubtitle,
    citySlug
}: Props) {
    const t = dictionary[lang].hero;
    const isRTL = lang === 'he';

    // On subpages, this IS the primary H1 above the fold
    const TitleTag = isSubPage ? 'h1' : 'h1';
    const displayTitle = customTitle || t.title;
    const displaySubtitle = customSubtitle || t.subtitle;

    return (
        <>
            {/* Hero Section: On mobile it is 100dvh full viewport exclusively for Headline, Badge, CTA & 3 Trust Points */}
            <section className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden pt-20 pb-6 md:pt-28 md:pb-24">
                {/* Background Layer: full screen image/video */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="relative w-full h-full">
                        {/* Dark Overlay for Text Visibility */}
                        <div className="absolute inset-0 bg-black/70 z-10" />
                        <div className="absolute inset-0 bg-dark-bg/50 z-10 mix-blend-multiply" />

                        {/* Smooth Bottom Gradient mask */}
                        <div className="absolute inset-x-0 bottom-0 h-[40vh] lg:h-[50vh] bg-gradient-to-t from-dark-bg via-dark-bg/90 to-transparent z-20" />

                        {/* Background Visual */}
                        {isSubPage ? (
                            <img
                                src="/hero-poster.webp"
                                alt="GoldaCabs Premium Taxi"
                                className="w-full h-full object-cover opacity-60"
                                loading="eager"
                            />
                        ) : (
                            <HeroVideo />
                        )}
                    </div>

                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] z-10" />
                </div>

                <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col justify-between">
                    <div className="grid lg:grid-cols-2 gap-12 items-start pt-2 lg:pt-4 flex-1">

                        {/* Hero Main Content (takes 100dvh on mobile with bottom badges) */}
                        <div className="flex flex-col justify-between h-full space-y-6 lg:space-y-8 text-center lg:text-start" dir={isRTL ? 'rtl' : 'ltr'}>
                            <div className="space-y-4 sm:space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in mx-auto lg:mx-0">
                                    <Star className="w-4 h-4 text-gold fill-gold" />
                                    <span className="text-sm font-medium text-gold">
                                        {isSubPage ? (isRTL ? "שירות הסעות VIP לנתב\"ג" : "VIP Airport Transfer") : "Premium Taxi Service"}
                                    </span>
                                </div>

                                <TitleTag className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white tracking-tight">
                                    {displayTitle.split(' ').map((word, i) => (
                                        i === 1 ? <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold block text-glow-gold">{word} </span> : word + ' '
                                    ))}
                                </TitleTag>

                                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed mx-auto lg:mx-0">
                                    {displaySubtitle}
                                </p>

                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                                    <AnalyticsLink
                                        href={`https://wa.me/972547438110?text=${encodeURIComponent(isRTL ? `היי מוניות גולדה, אשמח להזמין מונית${customTitle ? ` מ${customTitle.replace('מוניות ', '')}` : ''}` : "Hi GoldaCabs, I'd like to book a taxi")}`}
                                        eventName="whatsapp_click"
                                        eventParams={{
                                            link_type: 'whatsapp_hero',
                                            cta_location: 'hero',
                                            source_city: citySlug || 'general',
                                            page_language: lang
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gold hover:bg-gold-hover text-dark-bg px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                                    >
                                        <span>{t.cta}</span>
                                        {isRTL ?
                                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" /> :
                                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        }
                                    </AnalyticsLink>
                                </div>
                            </div>

                            {/* Trust Badges: Anchored at the bottom of the 100dvh mobile screen */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 mt-auto">
                                {[
                                    { icon: ShieldCheck, label: isRTL ? "נהגים מורשים" : "Licensed Drivers" },
                                    { icon: Clock, label: isRTL ? "דיוק בזמנים" : "Punctuality" },
                                    { icon: Star, label: isRTL ? "שירות VIP" : "VIP Service" }
                                ].map((item, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2">
                                        <item.icon className="w-6 h-6 text-gold/80" />
                                        <span className="text-xs sm:text-sm text-gray-300 font-medium whitespace-nowrap">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Calculator (Col 2 of Grid, hidden on mobile) */}
                        <div className="hidden lg:block relative">
                            <div className="absolute -inset-1 bg-gold-gradient rounded-3xl opacity-20 blur-xl"></div>
                            <PriceCalculator lang={lang} citySlug={citySlug} />
                        </div>

                    </div>
                </div>
            </section>

            {/* Mobile Calculator Section: cleanly placed right below the Hero full-screen */}
            <section className="lg:hidden py-10 px-4 bg-dark-bg relative z-20">
                <div className="max-w-md mx-auto relative">
                    <div className="absolute -inset-1 bg-gold-gradient rounded-3xl opacity-20 blur-xl"></div>
                    <PriceCalculator lang={lang} citySlug={citySlug} />
                </div>
            </section>
        </>
    );
}
