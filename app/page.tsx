import Hero from "@/components/Hero";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מוניות גולדה | מונית לנתב"ג 24/7 | שירות VIP והזמנה אונליין',
  description: 'הזמנת מונית לנתב"ג בקליק עם מוניות גולדה. מחשבון מחיר אונליין, רכבים חדישים, זמינות 24/7 ומחירים הוגנים. שירות בכל אזור המרכז והשרון.',
  keywords: ['מונית לנתב"ג', 'הזמנת מונית', 'מוניות גולדה', 'מונית לשדה התעופה', 'מונית ספיישל', 'מונית גדולה לנתב"ג'],
  openGraph: {
    title: 'מוניות גולדה - הדרך הכי נוחה לנתב"ג',
    description: 'מחשבון מחיר והזמנה מיידית בוואטסאפ. שירות VIP דייקן ואמין.',
    locale: 'he_IL',
    type: 'website',
  },
  alternates: {
    canonical: 'https://goldacabs.com',
    languages: {
      'he-IL': 'https://goldacabs.com',
      'en-IL': 'https://goldacabs.com/en',
      'en': 'https://goldacabs.com/en',
    },
  }
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    'name': 'מוניות גולדה',
    'image': 'https://goldacabs.com/og-image.jpg',
    'description': 'שירות מוניות ספיישל לנתב"ג ולכל חלקי הארץ. רכבים מפוארים, נהגים אדיבים ומחירים הוגנים.',
    'telephone': '+972-50-123-4567',
    'areaServed': [
      { '@type': 'City', 'name': 'Tel Aviv-Yafo' },
      { '@type': 'City', 'name': 'Raanana' },
      { '@type': 'City', 'name': 'Herzliya' },
      { '@type': 'City', 'name': 'Kfar Saba' },
      { '@type': 'City', 'name': 'Netanya' },
      { '@type': 'City', 'name': 'Petah Tikva' }
    ],
    'priceRange': '$$',
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
    <main className="min-h-screen bg-dark-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
    </main>
  );
}
