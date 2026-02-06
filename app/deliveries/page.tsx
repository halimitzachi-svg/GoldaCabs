import Hero from "@/components/Hero";
import { Package, Zap, ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import { dictionary } from "@/lib/dictionary";
import Link from "next/link";

export const metadata = {
    title: 'משלוחים במונית אקספרס מהיום להיום | מוניות גולדה',
    description: 'צריכים משלוח דחוף? מוניות גולדה מציעים שירות משלוחי אקספרס במונית לכל הארץ. איסוף מהיר, מסירה בטוחה ומחיר קבוע 24/7.',
    keywords: ['משלוח במונית', 'שליחויות אקספרס', 'משלוח חבילה דחוף', 'שירות משלוחים במוניות', 'משלוחי מסמכים'],
    openGraph: {
        title: 'משלוחי אקספרס במונית - מוניות גולדה',
        description: 'הדרך המהירה והבטוחה ביותר למשלוח מהיום להיום.',
        type: 'website',
    }
};

export default function DeliveriesPage() {
    const t = dictionary.he.deliveries;
    const isRTL = true;

    return (
        <main className="min-h-screen bg-dark-bg text-white">
            {/* Custom Hero logic for dynamic content if needed, but we'll use the layout first */}
            <div className="relative pt-20 pb-12 overflow-hidden border-b border-white/5">
                <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium animate-fade-in mx-auto">
                        <Package className="w-4 h-4" />
                        <span>שירות שליחויות VIP</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        {t.title}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {t.subtitle}
                    </p>
                    <div className="pt-4">
                        <a
                            href="https://wa.me/972547438110?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%94%D7%96%D7%9E%D7%99%D7%9F%20%D7%9E%D7%A9%D7%9C%D7%95%D7%97%20%D7%90%D7%A7%D7%A1%D7%A4%D7%A8%D7%A1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-dark text-black px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95"
                        >
                            {t.cta}
                            <ArrowRight className="w-5 h-5 rotate-180" />
                        </a>
                    </div>
                </div>
            </div>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Benefit 1 */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center space-y-4 hover:border-gold/30 transition-colors">
                            <div className="bg-gold/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-gold">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold">{t.benefit1}</h3>
                            <p className="text-gray-400 text-sm">אנחנו בפריסה רחבה, הנהג הקרוב ביותר אליכם ייצא לאיסוף מיידי.</p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center space-y-4 hover:border-gold/30 transition-colors">
                            <div className="bg-gold/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-gold">
                                <MapPin className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold">{t.benefit2}</h3>
                            <p className="text-gray-400 text-sm">המשלוח נאסף מפתח הדלת ונמסר ישירות ליעד ללא תחנות ביניים.</p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center space-y-4 hover:border-gold/30 transition-colors">
                            <div className="bg-gold/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-gold">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold">{t.benefit3}</h3>
                            <p className="text-gray-400 text-sm">ציוד רגיש? מסמכים חסויים? ברכב פרטי סגור הכל מוגן ובטוח.</p>
                        </div>
                    </div>

                    <div className="mt-24 max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] -z-10" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gold">{t.why_title}</h2>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            {t.why_desc}
                        </p>
                        <ul className="space-y-4">
                            {[
                                "מסירה מהיום להיום לכל הארץ",
                                "עדכונים חיים מהנהג בוואטסאפ",
                                "אפשרות למשלוחי מזון וציוד קירור",
                                "שירות אופטימלי לבתי עסק ומשרדי עו\"ד"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-lg">
                                    <div className="bg-gold rounded-full p-1">
                                        <Zap className="w-3 h-3 text-black" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
}
