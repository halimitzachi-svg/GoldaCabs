'use client';

import { useState } from 'react';
import { Accessibility, X, Type, Sun, Eye } from 'lucide-react';

export default function AccessibilityWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [largeText, setLargeText] = useState(false);

    const toggleContrast = () => {
        setHighContrast(!highContrast);
        document.documentElement.classList.toggle('high-contrast');
    };

    const toggleTextSize = () => {
        setLargeText(!largeText);
        document.documentElement.classList.toggle('large-text');
    };

    return (
        <div className="fixed bottom-4 left-4 z-50 font-sans">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Accessibility Menu"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Accessibility className="w-6 h-6" />}
            </button>

            {/* Menu */}
            {isOpen && (
                <div className="absolute bottom-16 left-0 bg-white text-gray-900 shadow-xl rounded-xl p-4 w-64 border border-gray-200 animate-in slide-in-from-bottom-5 fade-in duration-200">
                    <h3 className="font-bold text-lg mb-4 text-center border-b pb-2">נגישות / Accessibility</h3>

                    <div className="space-y-2">
                        <button
                            onClick={toggleTextSize}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${largeText ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                        >
                            <span className="flex items-center gap-2"><Type className="w-4 h-4" /> הגדל טקסט</span>
                            <span className="text-xs font-mono">{largeText ? 'ON' : 'OFF'}</span>
                        </button>

                        <button
                            onClick={toggleContrast}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${highContrast ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                        >
                            <span className="flex items-center gap-2"><Sun className="w-4 h-4" /> ניגודיות גבוהה</span>
                            <span className="text-xs font-mono">{highContrast ? 'ON' : 'OFF'}</span>
                        </button>
                    </div>

                    <div className="mt-4 pt-2 border-t text-xs text-center text-gray-500">
                        GoldaCabs Accessible
                    </div>
                </div>
            )}
        </div>
    );
}
