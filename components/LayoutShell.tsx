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
        <>
            <Header lang={lang} />
            <div className="pt-16">
                {children}
            </div>
            <Footer lang={lang} />
            <AccessibilityWidget />
            <PhoneWidget />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        </>
    );
}
