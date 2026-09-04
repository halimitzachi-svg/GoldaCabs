'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendGAEvent } from '@next/third-parties/google';
import {
    Users, Briefcase, Clock,
    MapPin, CheckCircle2, Plane, Car, Plus, Minus, Info, Loader2, User, Phone, AlertCircle
} from 'lucide-react';
import { PRICING_CONSTANTS, getDistanceMultiplier } from '@/data/cities';
import { CITIES } from '@/lib/cities';
import { dictionary, Locale } from '@/lib/dictionary';
import AddressAutocomplete from './AddressAutocomplete';

export interface PriceCalculatorProps {
    lang?: Locale;
    citySlug?: string; // e.g. "netanya" or "taxi-netanya"
}

export default function PriceCalculator({
    lang = 'he',
    citySlug
}: PriceCalculatorProps) {
    const t = dictionary[lang].calculator;
    const isRTL = lang === 'he';

    // Normalize slug (strip any "taxi-" prefix)
    const cleanCityKey = citySlug ? citySlug.replace(/^taxi-/, '').toLowerCase() : undefined;
    const rawCityEntry = cleanCityKey ? CITIES[cleanCityKey] : undefined;
    const cityEntry = rawCityEntry ? (lang === 'he' ? rawCityEntry.he : rawCityEntry.en) : undefined;

    // Calculator State Machine
    const [calculatorState, setCalculatorState] = useState<'empty' | 'city_estimate' | 'exact_route'>(
        cityEntry ? 'city_estimate' : 'empty'
    );
    const [hasVerifiedPlace, setHasVerifiedPlace] = useState(false);

    // Location & Route
    const [originName, setOriginName] = useState(cityEntry ? cityEntry.name : '');
    const [cityName, setCityName] = useState(cityEntry ? cityEntry.name : '');
    const [distanceKm, setDistanceKm] = useState<number>(cityEntry ? cityEntry.distance : 0);
    const [activeRegion, setActiveRegion] = useState(cityEntry?.region || 'central');

    // Trip Configuration
    const [passengers, setPassengers] = useState(1);
    const [luggage, setLuggage] = useState(1);
    const [flightTime, setFlightTime] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [useRoute6, setUseRoute6] = useState(false);
    const [babySeat, setBabySeat] = useState(false);

    // Calculated Outputs
    const [price, setPrice] = useState(0);
    const [breakdown, setBreakdown] = useState<any>(null);
    const [recommendedPickupTime, setRecommendedPickupTime] = useState('');
    const [tripDuration, setTripDuration] = useState(0);

    // User Details & Form State
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ origin?: string; name?: string; phone?: string }>({});

    // GA4 Deduplication Refs
    const hasLoggedEstimateRef = useRef(false);
    const hasStartedInputRef = useRef(false);

    // Initialize default flight time to tomorrow 10:00 AM
    useEffect(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(10, 0, 0, 0);

        const tzOffset = tomorrow.getTimezoneOffset() * 60000;
        const localISOTime = new Date(tomorrow.getTime() - tzOffset).toISOString().slice(0, 16);
        setFlightTime(localISOTime);
    }, []);

    // Send city_estimate_view once on mount if on city landing
    useEffect(() => {
        if (cityEntry && !hasLoggedEstimateRef.current) {
            hasLoggedEstimateRef.current = true;
            sendGAEvent({
                event: 'city_estimate_view',
                source_city: cleanCityKey || cityEntry.name,
                page_type: 'city_landing',
                calculator_state: 'city_estimate',
                page_language: lang
            });
        }
    }, [cityEntry, cleanCityKey, lang]);

    // Update Route 6 default when distance changes
    useEffect(() => {
        if (distanceKm > 80) setUseRoute6(true);
        else if (distanceKm < 35) setUseRoute6(false);
    }, [distanceKm]);

    // Handle Place Selection from AddressAutocomplete
    const handlePlaceSelected = (data: {
        address: string;
        cityName: string;
        distanceKm: number;
        region: string;
    }) => {
        setOriginName(data.address);
        setCityName(data.cityName || cityName);
        setDistanceKm(data.distanceKm);
        setActiveRegion(data.region);
        setCalculatorState('exact_route');
        setHasVerifiedPlace(true);
        setErrors(prev => ({ ...prev, origin: undefined }));

        sendGAEvent({
            event: 'address_selected',
            source_city: cleanCityKey || data.cityName || 'general',
            page_type: cleanCityKey ? 'city_landing' : 'home',
            calculator_state: 'exact_route',
            page_language: lang
        });
    };

    // Handle Manual Text Editing - Immediately Invalidate Verification
    const handleResetVerification = () => {
        setHasVerifiedPlace(false);
        if (cityEntry) {
            setCalculatorState('city_estimate');
            setDistanceKm(cityEntry.distance);
        } else {
            setCalculatorState('empty');
            setDistanceKm(0);
            setPrice(0);
            setBreakdown(null);
        }
    };

    // Pricing Calculation Engine
    useEffect(() => {
        if (distanceKm <= 0) {
            setPrice(0);
            setBreakdown(null);
            return;
        }

        let kmRate = PRICING_CONSTANTS.KILOMETER_RATE_TARIFF_1;
        let activeTariff = 'A';

        if (flightTime) {
            const flightDate = new Date(flightTime);
            const minPerKm = useRoute6 ? 0.75 : 0.9;
            const buffer = useRoute6 ? 10 : 15;
            const tripDurationMin = distanceKm * minPerKm + buffer;
            setTripDuration(Math.round(tripDurationMin));

            // Pickup = Flight Time - 3 hours (180 min) - trip duration
            const pickupDate = new Date(flightDate.getTime() - (180 + tripDurationMin) * 60 * 1000);

            const formattedPickup = pickupDate.toLocaleString(lang === 'he' ? 'he-IL' : 'en-GB', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
            setRecommendedPickupTime(formattedPickup);

            const tripArrivalDate = new Date(pickupDate.getTime() + tripDurationMin * 60 * 1000);

            const getTariffAtTime = (date: Date) => {
                const hour = date.getHours();
                const day = date.getDay();
                const isNight = hour >= 21 || hour < 6;
                const isWeekendEarly = (day === 5 && hour >= 16) || (day === 6 && hour >= 6 && hour < 21);
                const isShabbatPeak =
                    (day === 5 && hour >= 21) ||
                    (day === 6 && hour < 6) ||
                    (day === 6 && hour >= 21) ||
                    (day === 0 && hour < 6);

                if (isShabbatPeak) return { rate: PRICING_CONSTANTS.KILOMETER_RATE_TARIFF_3, label: 'C' };
                if (isNight || isWeekendEarly) return { rate: PRICING_CONSTANTS.KILOMETER_RATE_TARIFF_2, label: 'B' };
                return { rate: PRICING_CONSTANTS.KILOMETER_RATE_TARIFF_1, label: 'A' };
            };

            const startTariff = getTariffAtTime(pickupDate);
            const endTariff = getTariffAtTime(tripArrivalDate);

            if (startTariff.label === endTariff.label) {
                kmRate = startTariff.rate;
                activeTariff = startTariff.label;
            } else {
                kmRate = (startTariff.rate + endTariff.rate) / 2;
                activeTariff = `${startTariff.label}→${endTariff.label}`;
            }
        }

        const vehicleConfig =
            PRICING_CONSTANTS.VEHICLE_TYPES.find(
                v => passengers <= v.maxPassengers && luggage <= v.maxLuggage
            ) || PRICING_CONSTANTS.VEHICLE_TYPES[PRICING_CONSTANTS.VEHICLE_TYPES.length - 1];

        const vehicleMultiplier = vehicleConfig.multiplier;
        const regionMultiplier = getDistanceMultiplier(distanceKm);

        const distancePrice = distanceKm * kmRate * vehicleMultiplier * regionMultiplier;
        const startPrice = PRICING_CONSTANTS.START_PRICE * vehicleMultiplier * regionMultiplier;
        const airportFee = PRICING_CONSTANTS.AIRPORT_FEE;

        let route6Price = 0;
        if (useRoute6) {
            if (distanceKm < 35) route6Price = 20;
            else if (distanceKm < 80) route6Price = 40;
            else route6Price = 50;
        }

        const route6Fee = route6Price;
        const babySeatFee = babySeat ? PRICING_CONSTANTS.BABY_SEAT_PRICE : 0;

        let total = startPrice + distancePrice + airportFee + route6Fee + babySeatFee;

        // Round up to nearest 10
        total = Math.ceil(total / 10) * 10;

        if (Number.isFinite(total) && total > 0) {
            setPrice(total);
            setBreakdown({
                start: startPrice,
                distance: distancePrice,
                airport: airportFee,
                vehicleName: lang === 'he' ? vehicleConfig.nameHe : vehicleConfig.nameEn,
                vehicleMultiplier,
                route6: route6Fee,
                babySeat: babySeatFee,
                tariff: activeTariff
            });
        }
    }, [distanceKm, passengers, luggage, flightTime, useRoute6, babySeat, lang]);

    // Handle WhatsApp Lead Booking
    const handleBooking = () => {
        const newErrors: { origin?: string; name?: string; phone?: string } = {};

        // Lock if place is not verified from Google Places
        if (!hasVerifiedPlace) {
            newErrors.origin = isRTL
                ? `נא לבחור כתובת מדויקת מתוך הרשימה ב${cityName || 'עיר'} לקבלת מחיר סופי ומסלול`
                : `Please select an exact address from the list in ${cityName || 'the city'} for final fare`;
        }

        if (!name || name.trim().length < 2) {
            newErrors.name = isRTL ? 'נא להזין שם מלא' : 'Name is required';
        }

        const phoneRegex = /^(?:05[0-9]{8}|\+?[1-9][0-9]{7,14})$/;
        if (!phone || !phoneRegex.test(phone.replace(/[-\s]/g, ''))) {
            newErrors.phone = isRTL ? 'מספר טלפון לא תקין' : 'Invalid phone number';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            sendGAEvent({
                event: 'calculator_validation_error',
                source_city: cleanCityKey || cityName || 'general',
                page_type: cleanCityKey ? 'city_landing' : 'home',
                calculator_state: calculatorState,
                error_fields: Object.keys(newErrors).join(','),
                page_language: lang
            });
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        const derivedCity = cityName || (originName.includes(',') ? originName.split(',').slice(-2, -1)[0]?.trim() : '');
        const displayCity = derivedCity || originName;

        const message = t.whatsapp_msg
            .replace('{0}', name)
            .replace('{1}', originName)
            .replace('{2}', flightTime.replace('T', ' '))
            .replace('{3}', flightNumber || '-')
            .replace('{4}', `${passengers} (${breakdown?.vehicleName || 'Standard'})`)
            .replace('{5}', luggage.toString())
            .replace('{6}', price.toString())
            .replace('{7}', babySeat ? (isRTL ? 'כן' : 'Yes') : (isRTL ? 'לא' : 'No'))
            .replace('{8}', useRoute6 ? (isRTL ? 'כן' : 'Yes') : (isRTL ? 'לא' : 'No'))
            .replace('{9}', recommendedPickupTime)
            .replace('{10}', displayCity);

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/972547438110?text=${encodedMessage}`;

        const newWindow = window.open(whatsappUrl, '_blank');

        // Fire generate_lead strictly if window open was initiated
        if (newWindow !== null) {
            sendGAEvent({
                event: 'generate_lead',
                currency: 'ILS',
                value: Number.isFinite(price) ? Number(price) : 0,
                source_city: cleanCityKey || derivedCity || 'general',
                page_type: cleanCityKey ? 'city_landing' : 'home',
                calculator_state: calculatorState,
                cta_location: 'calculator',
                contact_method: 'whatsapp',
                pickup_location: originName,
                vehicle_type: breakdown?.vehicleName,
                passengers_count: passengers,
                luggage_count: luggage,
                use_route6: useRoute6 ? 'yes' : 'no',
                use_babyseat: babySeat ? 'yes' : 'no',
                pickup_time: recommendedPickupTime,
                page_language: lang
            });
        }

        setIsSubmitting(false);
    };

    // Safe mathematical readiness check: NEVER allow NaN or ₪0
    const isPriceReady =
        hasVerifiedPlace &&
        breakdown &&
        Number.isFinite(breakdown.distance) &&
        Number.isFinite(breakdown.start) &&
        Number.isFinite(price) &&
        price > 0 &&
        Number.isFinite(distanceKm) &&
        distanceKm > 0;

    return (
        <div
            className={`w-full bg-surface/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-visible group ${isRTL ? 'text-right' : 'text-left'}`}
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Background Glow */}
            <div
                className={`absolute -top-20 w-40 h-40 bg-gold/20 rounded-full blur-3xl pointer-events-none group-hover:bg-gold/30 transition-all duration-500 overflow-hidden ${isRTL ? '-left-20' : '-right-20'}`}
            />

            <div className="relative z-10 space-y-6">
                {/* Header with state indicator */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gold" />
                        {t.title}
                    </h2>

                    {cityEntry && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{cityEntry.name} ({cityEntry.distance} {isRTL ? 'ק"מ' : 'km'})</span>
                        </div>
                    )}
                </div>

                {/* City Baseline Guidance Alert */}
                {cityEntry && !hasVerifiedPlace && (
                    <div className="bg-gold/10 border border-gold/20 rounded-2xl p-3 flex items-center gap-3 text-xs text-gold/90">
                        <Info className="w-4 h-4 shrink-0 text-gold" />
                        <span>
                            {isRTL
                                ? `מוצגת הערכת מחיר ממרכז ${cityEntry.name}. בחרו כתובת מדויקת לקבלת מחיר סופי ומסלול.`
                                : `Showing baseline estimate from central ${cityEntry.name}. Select an exact address for final route & fare.`}
                        </span>
                    </div>
                )}

                {/* Address Selection with Isolated AddressAutocomplete */}
                <div className="space-y-2">
                    <label className="text-sm text-gray-400 flex items-center justify-between">
                        <span>{t.pickup_label}</span>
                        {hasVerifiedPlace ? (
                            <span className="text-emerald-400 text-xs flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {isRTL ? 'כתובת מאומתת' : 'Address verified'}
                            </span>
                        ) : (
                            <span className="text-xs text-gray-500">
                                {isRTL ? 'יש לבחור מהרשימה' : 'Select from list'}
                            </span>
                        )}
                    </label>

                    <AddressAutocomplete
                        value={originName}
                        onChange={text => {
                            setOriginName(text);
                            if (!hasStartedInputRef.current) {
                                hasStartedInputRef.current = true;
                                sendGAEvent({
                                    event: 'address_selection_start',
                                    source_city: cleanCityKey || cityName || 'general',
                                    page_type: cleanCityKey ? 'city_landing' : 'home',
                                    page_language: lang
                                });
                            }
                        }}
                        onPlaceSelected={handlePlaceSelected}
                        onResetVerification={handleResetVerification}
                        placeholder={
                            cityEntry
                                ? (isRTL ? `הזינו כתובת מדויקת ב${cityEntry.name}...` : `Enter exact address in ${cityEntry.name}...`)
                                : t.pickup_placeholder
                        }
                        isRTL={isRTL}
                    />

                    {errors.origin && <p className="text-red-500 text-xs mt-1">{errors.origin}</p>}
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
                                onChange={e => setFlightNumber(e.target.value.toUpperCase())}
                                className={`w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold/50 outline-none placeholder:text-gray-600 transition-all uppercase ${isRTL ? 'pl-12' : 'pr-12'}`}
                            />
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
                            onChange={e => setFlightTime(e.target.value)}
                            className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold/50 outline-none [color-scheme:dark] text-sm font-sans"
                        />
                    </div>
                </div>

                {/* Recommended Pickup Time */}
                <AnimatePresence>
                    {distanceKm > 0 && recommendedPickupTime && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 group/pickup"
                        >
                            <div className="bg-gold/10 p-3 rounded-xl text-gold group-hover/pickup:rotate-12 transition-transform">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block mb-0.5">
                                    {isRTL ? 'שעת איסוף מומלצת (3 שעות לפני המראה):' : 'Recommended Pickup (3h before flight):'}
                                </span>
                                <span className="font-bold text-white text-lg font-mono tracking-tight text-gold">
                                    {recommendedPickupTime}
                                </span>
                                <span className="text-[10px] text-gray-500 block mt-0.5">
                                    {isRTL ? `זמן נסיעה משוער: כ-${tripDuration} דקות` : `Est. driving time: ~${tripDuration} min`}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Passengers & Luggage Selectors */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Passengers Card */}
                    <div className="bg-dark-bg/30 border border-white/5 p-3.5 sm:p-4 rounded-2xl flex flex-col justify-between gap-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-2.5">
                                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gold/80 shrink-0" />
                                <span className="text-xs text-gray-400 font-medium">{t.passengers}</span>
                            </div>
                            <span className="font-bold text-white text-base sm:text-lg font-mono">{passengers}</span>
                        </div>
                        <div className="flex items-center gap-1.5 pt-2 border-t border-white/5">
                            <button
                                type="button"
                                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                className="flex-1 h-8 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-white flex items-center justify-center transition-all border border-white/5"
                                aria-label="Decrease passengers"
                            >
                                <Minus className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setPassengers(Math.min(PRICING_CONSTANTS.MAX_PASSENGERS, passengers + 1))}
                                className="flex-1 h-8 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-white flex items-center justify-center transition-all border border-white/5"
                                aria-label="Increase passengers"
                            >
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* Luggage Card */}
                    <div className="bg-dark-bg/30 border border-white/5 p-3.5 sm:p-4 rounded-2xl flex flex-col justify-between gap-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-2.5">
                                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-gold/80 shrink-0" />
                                <span className="text-xs text-gray-400 font-medium">{t.luggage}</span>
                            </div>
                            <span className="font-bold text-white text-base sm:text-lg font-mono">{luggage}</span>
                        </div>
                        <div className="flex items-center gap-1.5 pt-2 border-t border-white/5">
                            <button
                                type="button"
                                onClick={() => setLuggage(Math.max(0, luggage - 1))}
                                className="flex-1 h-8 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-white flex items-center justify-center transition-all border border-white/5"
                                aria-label="Decrease luggage"
                            >
                                <Minus className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setLuggage(Math.min(PRICING_CONSTANTS.MAX_LUGGAGE, luggage + 1))}
                                className="flex-1 h-8 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-white flex items-center justify-center transition-all border border-white/5"
                                aria-label="Increase luggage"
                            >
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Toggles (Route 6 & Baby Seat) */}
                <div className="space-y-3">
                    {distanceKm > 20 && (
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
                            <span className="text-xs font-mono text-gray-500">
                                +{useRoute6 ? (distanceKm < 35 ? '20' : distanceKm < 80 ? '40' : '50') : '0'}₪
                            </span>
                        </div>
                    )}

                    <div
                        onClick={() => setBabySeat(!babySeat)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${babySeat ? 'bg-gold/10 border-gold/40' : 'bg-dark-bg/30 border-white/5 hover:border-white/20'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border ${babySeat ? 'bg-gold border-gold text-black' : 'border-gray-500'}`}>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <span className={`text-sm ${babySeat ? 'text-gold' : 'text-gray-400'}`}>{t.baby_seat}</span>
                        </div>
                        <Users className={`w-4 h-4 ${babySeat ? 'text-gold' : 'text-gray-600'}`} />
                    </div>
                </div>

                <div className="h-px bg-white/10 w-full" />

                {/* Price Breakdown */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-400 font-medium">
                        <span>{t.base_price}</span>
                        <span>
                            {isPriceReady
                                ? `₪${Math.round(breakdown.distance + breakdown.start)}`
                                : cityEntry
                                ? `החל מ-₪${cityEntry.price}`
                                : '—'}
                        </span>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            {t.airport_fee}
                            <Info className="w-2.5 h-2.5 opacity-50" />
                        </span>
                        <span>₪{PRICING_CONSTANTS.AIRPORT_FEE}</span>
                    </div>

                    {breakdown?.vehicleMultiplier > 1 && (
                        <div className="flex justify-between text-xs text-gold/80">
                            <span>{breakdown?.vehicleName} (Factor x{breakdown?.vehicleMultiplier})</span>
                            <span className="flex items-center gap-1"><Info className="w-3 h-3" /></span>
                        </div>
                    )}

                    {(breakdown?.tariff === 'B' || breakdown?.tariff?.includes('B')) && (
                        <div className="flex justify-between text-xs text-gold/80">
                            <span>{t.night_tariff}</span>
                            <span className="flex items-center gap-1"><Info className="w-3 h-3" /></span>
                        </div>
                    )}

                    {(breakdown?.tariff === 'C' || breakdown?.tariff?.includes('C')) && (
                        <div className="flex justify-between text-xs text-gold/80">
                            <span>{t.shabbat_tariff}</span>
                            <span className="flex items-center gap-1"><Info className="w-3 h-3" /></span>
                        </div>
                    )}

                    {useRoute6 && (
                        <div className="flex justify-between text-xs text-gold/80">
                            <span>{t.route6_fee}</span>
                            <span>₪{breakdown?.route6 || 0}</span>
                        </div>
                    )}

                    {babySeat && (
                        <div className="flex justify-between text-xs text-gold/80">
                            <span>{t.baby_seat_fee}</span>
                            <span>₪{PRICING_CONSTANTS.BABY_SEAT_PRICE}</span>
                        </div>
                    )}
                </div>

                {/* Total Price Display */}
                <div className="flex items-end justify-between bg-dark-bg/50 p-4 rounded-2xl border border-white/5">
                    <div>
                        <span className="text-gray-400 text-sm block mb-1">
                            {hasVerifiedPlace
                                ? t.total
                                : isRTL
                                ? 'הערכת מחיר התחלתית'
                                : 'Initial Price Estimate'}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-300">{t.vat_included}</span>
                        </div>
                    </div>

                    <div className="text-right">
                        {isPriceReady ? (
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
                        ) : cityEntry ? (
                            <div>
                                <span className="text-xs text-gold/80 block">{isRTL ? 'החל מ-' : 'From '}</span>
                                <span className="text-3xl font-bold text-white block font-mono tracking-tight">
                                    ₪{cityEntry.price}
                                </span>
                            </div>
                        ) : (
                            <div>
                                <span className="text-2xl font-bold text-gray-500 block font-mono tracking-tight">—</span>
                                <span className="text-[11px] text-gold/80 block mt-0.5">
                                    {isRTL ? 'בחרו כתובת' : 'Select address'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-gray-400 italic px-2">
                    {t.disclaimer}
                </p>

                {/* User Details (Name & Phone) */}
                <div className="space-y-4 pt-2 border-t border-white/5">
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400">{t.full_name}</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={name}
                                onChange={e => {
                                    setName(e.target.value);
                                    setErrors(prev => ({ ...prev, name: undefined }));
                                }}
                                placeholder={isRTL ? "ישראל ישראלי" : "John Doe"}
                                className={`w-full bg-dark-bg/50 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-2.5 text-white text-sm focus:border-gold/50 outline-none ${isRTL ? 'pl-9' : 'pr-9'}`}
                            />
                            <User className={`absolute top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 ${isRTL ? 'left-3' : 'right-3'}`} />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-gray-400">{t.phone}</label>
                        <div className="relative">
                            <input
                                type="tel"
                                value={phone}
                                onChange={e => {
                                    setPhone(e.target.value);
                                    setErrors(prev => ({ ...prev, phone: undefined }));
                                }}
                                placeholder="050-0000000"
                                className={`w-full bg-dark-bg/50 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-2.5 text-white text-sm focus:border-gold/50 outline-none font-mono ${isRTL ? 'pl-9' : 'pr-9'}`}
                            />
                            <Phone className={`absolute top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 ${isRTL ? 'left-3' : 'right-3'}`} />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-0.5">{errors.phone}</p>}
                    </div>
                </div>

                {/* Booking Button: Guidance State if Unverified, Booking State when Exact Route */}
                {!hasVerifiedPlace ? (
                    <div className="space-y-2">
                        <button
                            type="button"
                            onClick={handleBooking}
                            className="w-full bg-white/10 hover:bg-white/15 text-gray-300 py-4 rounded-xl font-bold text-base transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <MapPin className="w-4 h-4 text-gold" />
                            <span>
                                {isRTL
                                    ? `נא לבחור כתובת איסוף ב${cityName || 'עיר'} לקבלת מחיר סופי`
                                    : `Select exact pickup address in ${cityName || 'city'} for final price`}
                            </span>
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={handleBooking}
                        disabled={isSubmitting}
                        className="w-full bg-gold hover:bg-gold-hover text-dark-bg py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>{t.submitting}</span>
                            </>
                        ) : (
                            <span>{t.submit_btn}</span>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
