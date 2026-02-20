import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מוניות גולדה | מונית לנתב"ג 24/7 | שירות VIP והזמנה אונליין',
  description: 'הזמנת מונית לנתב"ג בקליק עם מוניות גולדה. מחשבון מחיר אונליין, רכבים חדישים, זמינות 24/7 ומחירים הוגנים. שירות בכל אזור המרכז והשרון.',
  keywords: ['מונית לנתב"ג', 'הזמנת מונית', 'מוניות גולדה', 'מונית לשדה התעופה', 'מונית ספיישל'],
  openGraph: {
    title: 'מוניות גולדה - הדרך הכי נוחה לנתב"ג',
    description: 'מחשבון מחיר והזמנה מיידית בוואטסאפ. שירות VIP דייקן ואמין.',
    locale: 'he_IL',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.goldacabs.co.il',
    languages: {
      'he-IL': 'https://www.goldacabs.co.il',
      'en-IL': 'https://www.goldacabs.co.il/en',
      'en': 'https://www.goldacabs.co.il/en',
    },
  }
};

import { Plane, MapPin, CheckCircle2, ListChecks, ArrowLeftRight, CreditCard, ShieldCheck } from 'lucide-react';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    'name': 'מוניות גולדה',
    'image': 'https://www.goldacabs.co.il/og-image.jpg',
    'description': 'שירות מוניות ספיישל לנתב"ג ולכל חלקי הארץ. רכבים מפוארים, נהגים אדיבים ומחירים הוגנים.',
    'telephone': '+972-54-743-8110',
    'url': 'https://www.goldacabs.co.il',
    'priceRange': '₪₪',
    'areaServed': [
      { '@type': 'City', 'name': 'Tel Aviv-Yafo' },
      { '@type': 'City', 'name': 'Raanana' },
      { '@type': 'City', 'name': 'Herzliya' },
      { '@type': 'City', 'name': 'Kfar Saba' },
      { '@type': 'City', 'name': 'Netanya' },
      { '@type': 'City', 'name': 'Petah Tikva' }
    ],
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
      ],
      'opens': '00:00',
      'closes': '23:59'
    },
    'availableLanguage': ['Hebrew', 'English'],
    'serviceType': 'Airport Shuttle'
  };

  return (
    <main className="min-h-screen bg-dark-bg text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero lang="he" />

      {/* Why Choose Us - Extra Meat for SEO */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[120px] -z-10" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold inline-block">למה לבחור במוניות גולדה?</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">שירות המוניות המקצועי בישראל לנסיעות לנתב"ג ובחזרה. דייקנות, נוחות ובטיחות מעל הכל.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <ShieldCheck className="w-8 h-8" />, title: 'בטיחות מקסימלית', desc: 'רכבים חדישים ומתוחזקים בקפידה לכל נסיעה.' },
              { icon: <ArrowLeftRight className="w-8 h-8" />, title: 'מחיר הוגן ושקוף', desc: 'מחירון ידוע מראש - ללא הפתעות וחיובים מיותרים.' },
              { icon: <CreditCard className="w-8 h-8" />, title: 'תשלום גמיש', desc: 'מזומן, ביט או פייבוקס - מה שנוח לכם.' },
              { icon: <CheckCircle2 className="w-8 h-8" />, title: 'ניטור טיסות אונליין', desc: 'אנחנו עוקבים אחרי הטיסה שלכם כדי לחכות לכם בזמן.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-gold/30 transition-all text-center group">
                <div className="bg-gold/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gold group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pickup Guide - Idea #2 */}
      <section className="py-24 bg-white/5 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                מדריך איסוף מנתב"ג
              </div>
              <h2 className="text-4xl font-bold">איפה נפגשים בנתב"ג?</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                אנחנו יודעים כמה חשוב לראות נהג מחייך מיד אחרי הנחיתה.
                כדי לחסוך לכם זמן וחיפושים, הכנו לכם מדריך קצר לנקודות המפגש שלנו.
              </p>

              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center shrink-0 text-gold font-bold">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">טרמינל 3</h4>
                    <p className="text-gray-400">קומה 2 (מפלס הביניים), שער 23. שם הנהג מחכה לכם עם שלט מזוהה.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center shrink-0 text-gold font-bold">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">טרמינל 1</h4>
                    <p className="text-gray-400">ביציאה מהטרמינל, בחניון המוניות המוזמנות (שאלו את הסדרן במידת הצורך).</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full aspect-video bg-dark-bg border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl">
              {/* Mockup for image or guide visualization */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent flex items-center justify-center">
                <div className="text-center p-8">
                  <Plane className="w-20 h-20 text-gold/30 mx-auto mb-4" />
                  <span className="text-gold/50 text-sm italic">אנחנו עוקבים אחרי הטיסה שלכם בזמן אמת</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traveler's Checklist - Idea #3 */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-surface to-dark-bg border border-gold/20 rounded-[40px] p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-gold/5 grayscale">
              <ListChecks className="w-40 h-40" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                <ListChecks className="text-gold w-10 h-10" />
                צ'ק ליסט לטסים לחו"ל (אל תשכחו כלום!)
              </h2>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  'דרכון בתוקף ל-6 חודשים לפחות',
                  'ביטוח נסיעות מעודכן',
                  'הזמנת מונית גולדה (למנוע לחץ של הרגע האחרון)',
                  'בדיקת טרמינל (1 או 3)',
                  'צ\'ק-אין אונליין לחסכון בזמן',
                  'שקילה של המזוודות בבית',
                  'מטען נייד ומתאמים לחשמל',
                  'צילום של מסמכים חשובים בנייד',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 border border-gold/50 rounded flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-gold/10 border border-gold/30 p-6 rounded-2xl">
                <p className="text-sm text-gold font-medium">
                  💡 טיפ מגולדה: תמיד כדאי להזמין את המונית לפחות 4 שעות לפני שעת הטיסה המיועדת כדי להגיע ברוגע לצ'ק-אין.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials lang="he" />
      <FAQ lang="he" />
    </main>
  );
}
