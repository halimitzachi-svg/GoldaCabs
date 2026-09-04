import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
    title: 'Legal | GoldaCabs',
    description: 'Privacy Policy and Terms of Service for GoldaCabs.',
    robots: 'noindex, nofollow' // We don't need this indexed really
};

export default function LegalPage() {
    return (
        <main className="min-h-screen bg-dark-bg text-gray-300 py-20 px-4">
            <div className="container mx-auto max-w-4xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm">

                <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors mb-8">
                    <ArrowRight className="w-4 h-4 rotate-180" /> בחזרה לאתר / Back to Home
                </Link>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 border-b border-white/10 pb-6">
                    משפטי / Legal
                </h1>

                <div className="space-y-12">

                    {/* Hebrew Section */}
                    <section dir="rtl" className="space-y-4">
                        <h2 className="text-2xl font-bold text-gold">תנאי שימוש ומדיניות פרטיות</h2>
                        <p className="text-sm text-gray-400">עודכן לאחרונה: פברואר 2026</p>

                        <h3 className="text-xl font-semibold text-white mt-6">1. כללי</h3>
                        <p>ברוכים הבאים לאתר GoldaCabs. האתר משמש להזמנת שירותי מוניות לנתב"ג ורחבי הארץ. השימוש באתר מהווה הסכמה לתנאים אלו.</p>

                        <h3 className="text-xl font-semibold text-white mt-6">2. איסוף מידע</h3>
                        <p>אנו אוספים את המידע שאתם מספקים לנו מרצונכם החופשי בטופס ההזמנה (שם, טלפון, נקודת מוצא, יעד). מידע זה משמש אך ורק לצורך תיאום הנסיעה ויצירת קשר עמכם.</p>

                        <h3 className="text-xl font-semibold text-white mt-6">3. אבטחת מידע</h3>
                        <p>אנו נוקטים באמצעי זהירות מקובלים לשמירה על המידע, אך איננו יכולים להבטיח חסינות מוחלטת מפני חדירות למחשבים.</p>

                        <h3 className="text-xl font-semibold text-white mt-6">4. נגישות</h3>
                        <p>אנו עושים מאמצים להנגיש את האתר לבעלי מוגבלויות בהתאם לחוק. אם נתקלתם בבעיה, אנא צרו איתנו קשר.</p>
                    </section>

                    <hr className="border-white/10" />

                    {/* English Section */}
                    <section dir="ltr" className="space-y-4">
                        <h2 className="text-2xl font-bold text-gold">Terms & Privacy Policy</h2>
                        <p className="text-sm text-gray-400">Last Updated: February 2026</p>

                        <h3 className="text-xl font-semibold text-white mt-6">1. General</h3>
                        <p>Welcome to GoldaCabs. This website allows users to book taxi services to Ben Gurion Airport and across Israel. By using this site, you agree to these terms.</p>

                        <h3 className="text-xl font-semibold text-white mt-6">2. Data Collection</h3>
                        <p>We collect information you voluntarily provide via our booking form (Name, Phone, Pickup, Destination). This data is used solely for coordinating your ride and contacting you.</p>

                        <h3 className="text-xl font-semibold text-white mt-6">3. Security</h3>
                        <p>We implement standard security measures to protect your data but cannot guarantee absolute immunity against unauthorized access.</p>

                        <h3 className="text-xl font-semibold text-white mt-6">4. Accessibility</h3>
                        <p>We strive to make our website accessible to all users. If you encounter any issues, please contact us.</p>
                    </section>

                </div>
            </div>
        </main>
    );
}
