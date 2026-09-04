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
        <section className="relative min-h-[100dvh] lg:min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden pt-18 pb-4 sm:pb-6 md:pt-28 md:pb-24">
            {/* Background Layer: On subpages use lightweight image/gradient, on Home use DesktopHeroVideo */}
            <div className="absolute inset-x-0 top-0 h-full lg:h-[85vh] overflow-hidden pointer-events-none">
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
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start pt-1 lg:pt-4 flex-1">

                    {/* Text Content */}
                    <div className="flex flex-col justify-between h-full space-y-4 lg:space-y-8 text-center lg:text-start" dir={isRTL ? 'rtl' : 'ltr'}>
                        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in mx-auto lg:mx-0">
                                <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                                <span className="text-xs sm:text-sm font-medium text-gold">
                                    {isSubPage ? (isRTL ? "שירות הסעות VIP לנתב\"ג" : "VIP Airport Transfer") : "Premium Taxi Service"}
                                </span>
                            </div>

                            <TitleTag className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-white tracking-tight">
                                {displayTitle.split(' ').map((word, i) => (
                                    i === 1 ? <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold block text-glow-gold">{word} </span> : word + ' '
                                ))}
                            </TitleTag>

                            <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-lg leading-relaxed mx-auto lg:mx-0">
                                {displaySubtitle}
                            </p>

                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-1">
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
                                    className="bg-gold hover:bg-gold-hover text-dark-bg px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-base sm:text-lg transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                                >
                                    <span>{t.cta}</span>
                                    {isRTL ?
                                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" /> :
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                                    }
                                </AnalyticsLink>
                            </div>
                        </div>

                        {/* Trust Badges - Anchored cleanly at the bottom */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-white/10 mt-auto">
                            {[
                                { icon: ShieldCheck, label: isRTL ? "נהגים מורשים" : "Licensed Drivers" },
                                { icon: Clock, label: isRTL ? "דיוק בזמנים" : "Punctuality" },
                                { icon: Star, label: isRTL ? "שירות VIP" : "VIP Service" }
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-1 sm:gap-2">
                                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold/80" />
                                    <span className="text-xs sm:text-sm text-gray-400 font-medium whitespace-nowrap">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Calculator Card with citySlug passed */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gold-gradient rounded-3xl opacity-20 blur-xl"></div>
                        <PriceCalculator lang={lang} citySlug={citySlug} />
                    </div>

                </div>
            </div>
        </section>
    );
}
