import Header from './Header';
import Footer from './Footer';
import AccessibilityWidget from './AccessibilityWidget';
import PhoneWidget from './PhoneWidget';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function LayoutShell({
    children,
    lang = 'he'
}: {
    children: React.ReactNode;
    lang: 'he' | 'en';
}) {
    return (
        <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-clip">
            <Header lang={lang} />
            <main className="w-full max-w-[100vw] overflow-x-clip">
                {children}
            </main>
            <Footer lang={lang} />
            <AccessibilityWidget />
            <PhoneWidget />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        </div>
    );
}
