'use client';
import { motion } from "framer-motion";
import { Phone, Star } from "lucide-react";
import PriceCalculator from "./PriceCalculator";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-0">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-surface to-black z-0" />

            {/* Dynamic Grid Background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] z-0 pointer-events-none" />

            <div className="container mx-auto px-4 z-10 relative">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Text Content */}
                    <motion.div
                        className="flex-1 text-center lg:text-right"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold mb-6">
                            <Star className="w-4 h-4 fill-gold" />
                            <span className="text-sm font-medium">שירות ה-VIP שלך לנתב"ג</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-6 font-sans leading-tight">
                            Golda<span className="text-gold">Cabs</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                            הדרך הבטוחה, השקופה והיוקרתית להגיע לטיסה שלך.
                            <br />
                            <span className="text-white/80 font-normal">נהג אישי. מחיר קבוע. אפס הפתעות.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="border border-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center gap-2 backdrop-blur-sm">
                                <Phone className="w-6 h-6" />
                                דבר עם נהג (Whatsapp)
                            </button>
                        </div>
                    </motion.div>

                    {/* Calculator Card */}
                    <motion.div
                        className="flex-1 w-full max-w-lg"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <PriceCalculator />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
