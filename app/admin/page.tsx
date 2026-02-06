'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Search, RefreshCw, Calendar, Plane, User, Phone, MapPin } from 'lucide-react';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Hardcoded for MVP - Move to ENV later
    const ADMIN_PASS = 'golda123';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASS) {
            setIsAuthenticated(true);
            fetchLeads();
        } else {
            alert('סיסמה שגויה');
        }
    };

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/leads');
            const data = await res.json();
            if (data.success) {
                setLeads(data.leads);
            }
        } catch (error) {
            console.error(error);
            alert('שגיאה בטעינת הנתונים');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-surface/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center space-y-6"
                >
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto text-gold">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">כניסה למנהלים</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="סיסמה"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold/50 outline-none text-center"
                        />
                        <button
                            type="submit"
                            className="w-full bg-gold hover:bg-gold-hover text-dark-bg font-bold py-3 rounded-xl transition-all"
                        >
                            היכנס
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-bg p-4 md:p-8" dir="rtl">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <h1 className="text-3xl font-bold text-white">ניהול הזמנות</h1>
                    <button
                        onClick={fetchLeads}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-gold transition-colors"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        רענן נתונים
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-surface/50 border border-white/5 p-6 rounded-2xl">
                        <span className="text-gray-400 text-sm">סה"כ הזמנות</span>
                        <div className="text-3xl font-bold text-white mt-1">{leads.length}</div>
                    </div>
                    <div className="bg-surface/50 border border-white/5 p-6 rounded-2xl">
                        <span className="text-gray-400 text-sm">הזמנות היום</span>
                        <div className="text-3xl font-bold text-gold mt-1">
                            {leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length}
                        </div>
                    </div>
                    <div className="bg-surface/50 border border-white/5 p-6 rounded-2xl">
                        <span className="text-gray-400 text-sm">שווי (משוער)</span>
                        <div className="text-3xl font-bold text-white mt-1">
                            ₪{leads.reduce((sum, l) => sum + (l.quotedPrice || 0), 0).toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="bg-surface/50 border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="bg-white/5 text-gray-400 text-sm font-medium">
                                <tr>
                                    <th className="p-4">תאריך הזמנה</th>
                                    <th className="p-4">לקוח</th>
                                    <th className="p-4">מסלול</th>
                                    <th className="p-4">פרטי טיסה</th>
                                    <th className="p-4">מחיר</th>
                                    <th className="p-4">סטטוס</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="text-gray-200 hover:bg-white/5 transition-colors text-sm">
                                        <td className="p-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-white">
                                                    {new Date(lead.createdAt).toLocaleDateString('he-IL')}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(lead.createdAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold text-white flex items-center gap-1">
                                                    <User className="w-3 h-3 text-gold" /> {lead.name}
                                                </span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Phone className="w-3 h-3" /> {lead.phone}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-3 h-3 text-gold" />
                                                {lead.origin} ➝ {lead.destination}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {lead.passengers} נוסעים, {lead.luggage} מזוודות
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="flex items-center gap-1 text-white">
                                                    <Plane className="w-3 h-3 text-gold" /> {lead.flightNum || '-'}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    מועד טיסה: {new Date(lead.pickupTime).toLocaleString('he-IL')}
                                                    {/* Note: In DB we saved pickupTime as calculated, but notes has user input */}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 font-mono text-gold">
                                            ₪{lead.quotedPrice}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${lead.status === 'NEW' ? 'bg-blue-500/20 text-blue-300' :
                                                    lead.status === 'BOOKED' ? 'bg-green-500/20 text-green-300' :
                                                        'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {lead.status === 'NEW' ? 'חדש' : lead.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {leads.length === 0 && !loading && (
                            <div className="p-8 text-center text-gray-500">
                                עדיין אין הזמנות במערכת... החפרנים יגיעו בקרוב!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
