import type { Metadata } from "next";
import "../globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import LayoutShell from "@/components/LayoutShell";

export const metadata: Metadata = {
    metadataBase: new URL('https://www.goldacabs.co.il'),
    title: "GoldaCabs | Premium Airport Taxi to Ben Gurion (TLV) 24/7",
    description: "Book a VIP taxi to Ben Gurion Airport with GoldaCabs. Luxury vehicles, fixed transparent fares, and English-speaking drivers.",
    icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
        apple: '/favicon.svg',
    },
    alternates: {
        canonical: 'https://www.goldacabs.co.il/en',
        languages: {
            'he-IL': 'https://www.goldacabs.co.il',
            'en-IL': 'https://www.goldacabs.co.il/en',
            'en': 'https://www.goldacabs.co.il/en',
        }
    },
    openGraph: {
        title: 'GoldaCabs VIP Ben Gurion Airport | 24/7 Premium Transfers',
        description: 'Instant online fare calculator and direct WhatsApp booking. Executive fleet, private chauffeur, door-to-door pickup and transparent fixed pricing.',
        url: 'https://www.goldacabs.co.il/en',
        siteName: 'GoldaCabs VIP',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: 'https://www.goldacabs.co.il/og-image.png',
                secureUrl: 'https://www.goldacabs.co.il/og-image.png',
                width: 1200,
                height: 630,
                type: 'image/png',
                alt: 'GoldaCabs VIP | Premium Airport Taxi to Ben Gurion (TLV)',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GoldaCabs VIP Ben Gurion Airport | 24/7 Premium Transfers',
        description: 'Instant online fare calculator and direct WhatsApp booking. Executive fleet, private chauffeur, and transparent fixed pricing.',
        images: ['https://www.goldacabs.co.il/og-image.png'],
    }
};

export default function EnRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" dir="ltr">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <LayoutShell lang="en">
                    {children}
                </LayoutShell>
            </body>
        </html>
    );
}
