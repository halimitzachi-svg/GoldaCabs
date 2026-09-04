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
            {/* Hero Section: On mobile it is exactly 100dvh full viewport exclusively for Headline, Badge, CTA & 3 Trust Points */}
            <section className="relative h-[100dvh] max-h-[100dvh] lg:h-auto lg:min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden pt-16 pb-4 sm:pb-6 lg:pt-28 lg:pb-24 w-full max-w-[100vw]">
                {/* Background Layer: full screen image/video filling 100% of the viewport */}
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="relative w-full h-full">
                        {/* Dark Overlay for Text Visibility */}
                        <div className="absolute inset-0 bg-black/70 z-10" />
                        <div className="absolute inset-0 bg-dark-bg/50 z-10 mix-blend-multiply" />

                        {/* Smooth Bottom Gradient mask */}
                        <div className="absolute inset-x-0 bottom-0 h-[35vh] lg:h-[50vh] bg-gradient-to-t from-dark-bg via-dark-bg/90 to-transparent z-20" />

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

                <div className="w-full max-w-7xl mx-auto px-4 relative z-10 flex-1 flex flex-col justify-between h-full">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start pt-2 lg:pt-4 flex-1 h-full">

                        {/* Hero Main Content (takes exactly 100dvh on mobile with bottom badges) */}
                        <div className="flex flex-col justify-between h-full text-center lg:text-start" dir={isRTL ? 'rtl' : 'ltr'}>
                            <div className="space-y-3 sm:space-y-4 lg:space-y-6 my-auto lg:my-0">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in mx-auto lg:mx-0">
                                    <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                                    <span className="text-xs sm:text-sm font-medium text-gold">
                                        {isSubPage ? (isRTL ? "שירות הסעות VIP לנתב\"ג" : "VIP Airport Transfer") : "Premium Taxi Service"}
                                    </span>
                                </div>

                                <TitleTag className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
                                    {displayTitle.split(' ').map((word, i) => (
                                        i === 1 ? <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold block text-glow-gold">{word} </span> : word + ' '
                                    ))}
                                </TitleTag>

                                <p className="text-xs sm:text-sm md:text-lg text-gray-300 max-w-md mx-auto leading-relaxed">
                                    {displaySubtitle}
                                </p>

                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-1 sm:pt-2">
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
                                        className="bg-gold hover:bg-gold-hover text-dark-bg px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base lg:text-lg transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                                    >
                                        <span>{t.cta}</span>
                                        {isRTL ?
                                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" /> :
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                                        }
                                    </AnalyticsLink>
                                </div>
                            </div>

                            {/* Trust Badges: Anchored at the exact bottom of the 100dvh mobile screen */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-6 border-t border-white/10 mt-auto pb-1 sm:pb-2">
                                {[
                                    { icon: ShieldCheck, label: isRTL ? "נהגים מורשים" : "Licensed Drivers" },
                                    { icon: Clock, label: isRTL ? "דיוק בזמנים" : "Punctuality" },
                                    { icon: Star, label: isRTL ? "שירות VIP" : "VIP Service" }
                                ].map((item, index) => (
                                    <div key={index} className="flex flex-col items-center gap-1 sm:gap-2">
                                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold/80" />
                                        <span className="text-[11px] sm:text-xs text-gray-300 font-medium whitespace-nowrap">{item.label}</span>
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
            <section className="lg:hidden py-10 px-4 bg-dark-bg relative z-20 w-full max-w-[100vw] overflow-x-clip">
                <div className="max-w-md mx-auto relative w-full">
                    <div className="absolute -inset-1 bg-gold-gradient rounded-3xl opacity-20 blur-xl"></div>
                    <PriceCalculator lang={lang} citySlug={citySlug} />
                </div>
            </section>
        </>
    );
}
