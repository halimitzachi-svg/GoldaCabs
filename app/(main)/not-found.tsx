import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-7xl font-extrabold text-gold mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">העמוד שחיפשת לא נמצא</h2>
            <p className="text-gray-400 max-w-md mb-8">
                הדף ייתכן שהועבר, נמחק או שהקישור שגוי. ניתן לחזור לעמוד הבית או להזמין מונית ישירות.
            </p>
            <Link
                href="/"
                className="bg-gold hover:bg-gold-hover text-dark-bg font-bold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
                חזרה לעמוד הבית
            </Link>
        </div>
    );
}
