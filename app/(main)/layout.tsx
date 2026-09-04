import type { Metadata } from "next";
import "../globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import LayoutShell from "@/components/LayoutShell";

export const metadata: Metadata = {
    metadataBase: new URL('https://www.goldacabs.co.il'),
    title: "מוניות גולדה | מוניות לנתב\"ג VIP",
    description: "שירות הסעות יוקרתי לנתב\"ג. נהג אישי, מחיר קבוע ואמינות ללא פשרות.",
    icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
        apple: '/favicon.svg',
    },
    alternates: {
        canonical: 'https://www.goldacabs.co.il',
        languages: {
            'he-IL': 'https://www.goldacabs.co.il',
            'en-IL': 'https://www.goldacabs.co.il/en',
            'en': 'https://www.goldacabs.co.il/en',
        }
    },
    openGraph: {
        title: 'מוניות גולדה VIP לנתב"ג | שירות הסעות פרימיום 24/7',
        description: 'מחשבון מחיר אונליין והזמנה ישירה בוואטסאפ. נהג אישי, רכבים חדישים, איסוף מדלת הבית ומחיר שקוף ללא הפתעות.',
        url: 'https://www.goldacabs.co.il',
        siteName: 'מוניות גולדה',
        locale: 'he_IL',
        type: 'website',
        images: [
            {
                url: 'https://www.goldacabs.co.il/og-image.png',
                secureUrl: 'https://www.goldacabs.co.il/og-image.png',
                width: 1200,
                height: 630,
                type: 'image/png',
                alt: 'מוניות גולדה VIP | שירות הסעות פרימיום לנתב"ג',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'מוניות גולדה VIP לנתב"ג | שירות הסעות פרימיום 24/7',
        description: 'מחשבון מחיר אונליין והזמנה ישירה בוואטסאפ. נהג אישי, רכבים חדישים ומחיר שקוף ללא הפתעות.',
        images: ['https://www.goldacabs.co.il/og-image.png'],
    }
};

export default function HebrewRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="he" dir="rtl">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <LayoutShell lang="he">
                    {children}
                </LayoutShell>
            </body>
        </html>
    );
}
