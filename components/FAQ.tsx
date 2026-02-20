'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { dictionary, Locale } from '@/lib/dictionary';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ({ lang = 'he' }: { lang?: Locale }) {
    const t = dictionary[lang].faq;
    const isRTL = lang === 'he';
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-dark-bg/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-wider">
                        <HelpCircle className="w-3 h-3" />
                        <span>FAQ</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">{t.title}</h2>
                </div>

                <div className="max-w-3xl mx-auto space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
                    {t.questions.map((item, index) => (
                        <div
                            key={index}
                            className="group border border-white/10 rounded-2xl bg-surface/30 backdrop-blur-sm overflow-hidden transition-all hover:border-gold/30"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-right"
                            >
                                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-gold' : 'text-white'}`}>
                                    {item.q}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-gold" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-white" />
                                )}
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
