'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleMap, useLoadScript, Autocomplete, Libraries } from '@react-google-maps/api';
import {
    Users, Briefcase, Clock,
    MapPin, CheckCircle2, Plane, Car, Plus, Minus, Info, Search, Loader2, User, Phone
} from 'lucide-react';
import { CITIES_DATA, PRICING_CONSTANTS, type CityData } from '@/data/cities';
import { dictionary, Locale } from '@/lib/dictionary';

const libraries: Libraries = ["places"];

export default function PriceCalculator({ lang = 'he' }: { lang?: Locale }) {
    const t = dictionary[lang].calculator;
    const isRTL = lang === 'he';

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
        libraries,
    });

    const [originName, setOriginName] = useState('');
    const [distanceKm, setDistanceKm] = useState<number>(0);
    const [passengers, setPassengers] = useState(1);
    const [luggage, setLuggage] = useState(1);
    const [flightTime, setFlightTime] = useState('');
    const [price, setPrice] = useState(0);
    const [flightNumber, setFlightNumber] = useState('');
    const [useRoute6, setUseRoute6] = useState(false);
    const [breakdown, setBreakdown] = useState<any>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    // User Details
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize default flight time to tomorrow 10:00 AM
    useEffect(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(10, 0, 0, 0);

        const tzOffset = tomorrow.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(tomorrow.getTime() - tzOffset)).toISOString().slice(0, 16);
        setFlightTime(localISOTime);
    }, []);

    // Update Route 6 default
    useEffect(() => {
        if (distanceKm > 80) setUseRoute6(true);
        else setUseRoute6(false);
    }, [distanceKm]);

    const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const onPlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry && place.geometry.location) {
                setOriginName(place.name || place.formatted_address || '');
                calculateDistance(place.geometry.location);
            }
        }
    };

    const calculateDistance = (originLocation: google.maps.LatLng) => {
        const service = new google.maps.DistanceMatrixService();
        const tlvLocation = new google.maps.LatLng(32.0055, 34.8854); // Ben Gurion Airport

        service.getDistanceMatrix({
            origins: [originLocation],
            destinations: [tlvLocation],
            travelMode: google.maps.TravelMode.DRIVING,
        }, (response, status) => {
            if (status === 'OK' && response) {
                const distance = response.rows[0].elements[0].distance.value / 1000; // in km
                setDistanceKm(distance);
            }
        });
    };

    // Pricing Engine
    useEffect(() => {
        let tariffType = 'A'; // A = Day, B = Night/Shabbat

        if (flightTime) {
            // Logic: Pickup time is ~4 hours before flight
            const flightDate = new Date(flightTime);
            const pickupDate = new Date(flightDate.getTime() - (4 * 60 * 60 * 1000));

            const hour = pickupDate.getHours();
            const day = pickupDate.getDay(); // 0-6

            const isNight = hour >= 21 || hour < 6;
            const isWeekend = (day === 5 && hour >= 16) || day === 6 || (day === 0 && hour < 6);

            if (isNight || isWeekend) tariffType = 'B';
        }

        const kmRate = tariffType === 'A' ? PRICING_CONSTANTS.KILOMETER_RATE_TARIFF_1 : PRICING_CONSTANTS.KILOMETER_RATE_TARIFF_2;

        // Base Calculations
        const pureDistancePrice = Math.max(0, distanceKm - 10) * kmRate;
        // Logic: First 10km might be base, or just full distance. Let's do full distance * rate + base for simplicity as requested
        const distancePrice = distanceKm * kmRate;

        const startPrice = PRICING_CONSTANTS.START_PRICE;
        const airportFee = PRICING_CONSTANTS.AIRPORT_FEE;

        // Extras
        const luggageFee = Math.max(0, luggage - 1) * PRICING_CONSTANTS.SUITCASE_PRICE;
        const vehicleSurcharge = passengers > 4 ? PRICING_CONSTANTS.PASSENGER_SURCHARGE_AMOUNT : 0;
        const route6Fee = useRoute6 ? PRICING_CONSTANTS.ROUTE_6_PRICE : 0;

        let total = startPrice + distancePrice + airportFee + luggageFee + vehicleSurcharge + route6Fee;

        // Round up to nearest 10
        total = Math.ceil(total / 10) * 10;

        setPrice(total);
        setBreakdown({
            start: startPrice,
            distance: distancePrice,
            airport: airportFee,
            luggage: luggageFee,
            vehicle: vehicleSurcharge,
            route6: route6Fee,
            tariff: tariffType
        });

    }, [distanceKm, passengers, luggage, flightTime, useRoute6]);

    const handleBooking = async () => {
        if (!name || !phone) {
            alert(t.error_details);
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Save Lead to DB
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    phone,
                    origin: originName,
                    flightTime,
                    passengers,
                    luggage,
                    flightNum: flightNumber,
                    price,
                    lang // Save language of lead
                })
            });

            if (!response.ok) throw new Error('Failed to save lead');

            // 2. Redirect to WhatsApp
            // Use String Format or explicit replace
            const message = t.whatsapp_msg
                .replace('{0}', name)
                .replace('{1}', originName)
                .replace('{2}', flightTime.replace('T', ' '))
                .replace('{3}', flightNumber || '-')
                .replace('{4}', passengers.toString())
                .replace('{5}', luggage.toString())
                .replace('{6}', price.toString());

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/972547438110?text=${encodedMessage}`, '_blank');

        } catch (error) {
            console.error(error);
            // Fallback redirect
            window.open(`https://wa.me/972501234567`, '_blank');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`w-full bg-surface/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-visible group ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Glow */}
            <div className={`absolute -top-20 w-40 h-40 bg-gold/20 rounded-full blur-3xl pointer-events-none group-hover:bg-gold/30 transition-all duration-500 overflow-hidden ${isRTL ? '-left-20' : '-right-20'}`} />

            <div className="relative z-10 space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Clock className="w-6 h-6 text-gold" />
                        {t.title}
                    </h2>
                </div>

                {/* Origin Selection - Google Autocomplete */}
                <div className="space-y-2 relative">
                    <label className="text-sm text-gray-400">{t.pickup_label}</label>
                    <div className="relative">
                        {isLoaded ? (
                            <Autocomplete
                                onLoad={onLoad}
                                onPlaceChanged={onPlaceChanged}
                                fields={["geometry.location", "formatted_address", "name"]}
                            >
                                <input
                                    type="text"
                                    placeholder={t.pickup_placeholder}
                                    className={`w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold/50 outline-none placeholder:text-gray-600 ${isRTL ? 'pl-10' : 'pr-10'}`}
                                />
                            </Autocomplete>
                        ) : (
                            <div className={`w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-gray-500 flex items-center gap-2 ${isRTL ? 'pl-10' : 'pr-10'}`}>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {t.loading_map}
                            </div>
                        )}
                        <MapPin className={`absolute top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none ${isRTL ? 'left-4' : 'right-4'}`} />
                    </div>
                </div>

                {/* Flight & Date Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 relative">
                        <label className="text-sm text-gray-400">{t.flight_no_label}</label>
                        <div className="relative group/flight">
                            <input
                                type="text"
                                placeholder={t.flight_no_placeholder}
                                value={flightNumber}
                                onChange={(e) => {
                                    setFlightNumber(e.target.value.toUpperCase());
                                }}
                                className={`w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold/50 outline-none placeholder:text-gray-600 transition-all uppercase ${isRTL ? 'pl-12' : 'pr-12'}`}
                            />
                            {/* Static Plane Icon */}
                            <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center ${isRTL ? 'left-3' : 'right-3'}`}>
                                <Plane className={`text-gray-500 w-4 h-4 ${isRTL ? 'rotate-[-45deg]' : 'rotate-[45deg]'}`} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gold/90 font-medium">{t.date_label}</label>
                        <input
                            type="datetime-local"
                            value={flightTime}
                            onChange={(e) => setFlightTime(e.target.value)}
                            className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold/50 outline-none [color-scheme:dark] text-sm font-sans"
                        />
                    </div>
                </div>

                {/* Counter Inputs Row */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Passengers */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 flex justify-between items-center h-6">
                            <span>{t.passengers}</span>
                            {passengers > 4 && <span className="text-gold text-xs bg-gold/10 px-1.5 py-0.5 rounded">{t.large_vehicle}</span>}
                        </label>
                        <div className="flex items-center bg-dark-bg/50 border border-white/10 rounded-xl p-1 relative h-[52px]">
                            <button
                                onClick={() => setPassengers(Math.min(10, passengers + 1))}
                                className="w-10 h-full flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                            <div className="flex-1 text-center font-bold text-lg text-white">
                                {passengers}
                            </div>
                            <button
                                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                className="w-10 h-full flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Luggage */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 flex items-center h-6">{t.luggage}</label>
                        <div className="flex items-center bg-dark-bg/50 border border-white/10 rounded-xl p-1 relative h-[52px]">
                            <button
                                onClick={() => setLuggage(Math.min(10, luggage + 1))}
                                className="w-10 h-full flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                            <div className="flex-1 text-center font-bold text-lg text-white">
                                {luggage}
                            </div>
                            <button
                                onClick={() => setLuggage(Math.max(0, luggage - 1))}
                                className="w-10 h-full flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Personal Info Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t.full_name}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold/50 outline-none placeholder:text-gray-600 ${isRTL ? 'pl-10' : 'pr-10'}`}
                        />
                        <User className={`absolute top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 ${isRTL ? 'left-3' : 'right-3'}`} />
                    </div>
                    <div className="relative">
                        <input
                            type="tel"
                            placeholder={t.phone}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={`w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold/50 outline-none placeholder:text-gray-600 ${isRTL ? 'pl-10' : 'pr-10'}`}
                        />
                        <Phone className={`absolute top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 ${isRTL ? 'left-3' : 'right-3'}`} />
                    </div>
                </div>

                {/* Toggles */}
                {distanceKm > 0 && (
                    <div
                        onClick={() => setUseRoute6(!useRoute6)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${useRoute6 ? 'bg-gold/10 border-gold/40' : 'bg-dark-bg/30 border-white/5 hover:border-white/20'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border ${useRoute6 ? 'bg-gold border-gold text-black' : 'border-gray-500'}`}>
                                {useRoute6 && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                            <span className={`text-sm ${useRoute6 ? 'text-gold' : 'text-gray-400'}`}>{t.route6}</span>
                        </div>
                        <Car className={`w-4 h-4 ${useRoute6 ? 'text-gold' : 'text-gray-600'}`} />
                    </div>
                )}

                <div className="h-px bg-white/10 w-full" />

                {/* Pricing Logic Breakdown */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>{t.base_price}</span>
                        <span>₪{Math.round(breakdown?.distance + breakdown?.start)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>{t.airport_fee}</span>
                        <span>₪{PRICING_CONSTANTS.AIRPORT_FEE}</span>
                    </div>
                    {breakdown?.luggage > 0 && (
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{t.luggage_fee}</span>
                            <span>₪{breakdown?.luggage}</span>
                        </div>
                    )}
                    {breakdown?.tariff === 'B' && (
                        <div className="flex justify-between text-xs text-gold/80">
                            <span>{t.night_tariff}</span>
                            <span className="flex items-center gap-1"><Info className="w-3 h-3" /></span>
                        </div>
                    )}
                    {useRoute6 && (
                        <div className="flex justify-between text-xs text-gold/80">
                            <span>{t.route6_fee}</span>
                            <span>₪{PRICING_CONSTANTS.ROUTE_6_PRICE}</span>
                        </div>
                    )}
                </div>

                {/* Total Price */}
                <div className="flex items-end justify-between bg-dark-bg/50 p-4 rounded-2xl border border-white/5">
                    <div>
                        <span className="text-gray-400 text-sm block mb-1">{t.total}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-300">{t.vat_included}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={price}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-4xl font-bold text-white block font-mono tracking-tight"
                            >
                                ₪{price}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>

                {/* CTA */}
                <button
                    onClick={handleBooking}
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold-hover text-dark-bg font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-[0.98] group/btn disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {t.submitting}
                        </>
                    ) : (
                        <>
                            {t.submit_btn}
                            <svg viewBox="0 0 24 24" className={`w-5 h-5 fill-current transition-transform ${isRTL ? 'group-hover/btn:translate-x-1' : 'group-hover/btn:-translate-x-1 rotate-180'}`} xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        </>
                    )}
                </button>
                {!name && <p className="text-xs text-center text-gray-500 mt-2">{t.error_details}</p>}
            </div>
        </div>
    );
}
