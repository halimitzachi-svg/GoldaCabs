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
    const [babySeat, setBabySeat] = useState(false);
    const [breakdown, setBreakdown] = useState<any>(null);
    const [recommendedPickupTime, setRecommendedPickupTime] = useState('');
    const [tripDuration, setTripDuration] = useState(0);
    const [activeRegion, setActiveRegion] = useState('north'); // Default to north as it's the "base"
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    // User Details
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ origin?: string; name?: string; phone?: string }>({});

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
                const name = place.name || place.formatted_address || '';
                setOriginName(name);

                // Detect Region
                const addressComponents = place.address_components || [];
                const fullName = place.name || '';
                const fullAddress = place.formatted_address || '';

                let detectedRegion = 'north'; // Default

                // Combine all searchable strings
                const searchNames = [
                    ...addressComponents.map(c => c.long_name),
                    ...addressComponents.map(c => c.short_name),
                    fullName,
                    fullAddress
                ];

                const isCentral = searchNames.some(name =>
                    /Tel Aviv|Central|מרכז|תל אביב|גוש דן|Ramat Gan|Givatayim|Bnei Brak|Holon|Bat Yam|ראשון לציון|Rishon|רמת גן|גבעתיים|בני ברק|חולון|בת ים|פתח תקווה|אלעד|ראש העין/i.test(name)
                );
                const isSharon = searchNames.some(name =>
                    /Sharon|Netanya|Herzliya|Raanana|נתניה|הרצליה|רעננה|שרון|Hod HaSharon|Kfar Saba|כפר סבא|הוד השרון/i.test(name)
                );
                const isSouth = searchNames.some(name =>
                    /South|Ashdod|Beersheba|Darom|אשדוד|באר שבע|דרום|Ashkelon|Rehovot|אשקלון|רחובות|נס ציונה|Ness Ziona|יבנה|Yavne/i.test(name)
                );
                const isJerusalem = searchNames.some(name =>
                    /Jerusalem|ירושלים|Bet Shemesh|בית שמש/i.test(name)
                );
                const isNorthBase = searchNames.some(name =>
                    /Haifa|חיפה|Krayot|קריות|Akko|עכו|Nahariya|נהריה|Tzafon|צפון/i.test(name)
                );

                if (isJerusalem) detectedRegion = 'jerusalem';
                else if (isSouth) detectedRegion = 'south';
                else if (isSharon) detectedRegion = 'sharon';
                else if (isCentral) detectedRegion = 'central';
                else if (isNorthBase) detectedRegion = 'north';
                else detectedRegion = 'north';

                console.log('--- Region Detection Debug ---');
                console.log('Full Name:', fullName);
                console.log('Full Address:', fullAddress);
                console.log('All Searchable Parts:', searchNames);
                console.log('Assigned Region:', detectedRegion);

                setActiveRegion(detectedRegion);
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
        }, (response: google.maps.DistanceMatrixResponse | null, status: google.maps.DistanceMatrixStatus) => {
            if (status === 'OK' && response && response.rows[0].elements[0].distance) {
                const distance = response.rows[0].elements[0].distance.value / 1000; // in km
                setDistanceKm(distance);
            }
        });
    };

    // Pricing Engine
    useEffect(() => {
        let kmRate = PRICING_CONSTANTS.KILOMETER_RATE_TARIFF_1;
        let activeTariff = 'A';

        if (flightTime) {
            const flightDate = new Date(flightTime);

            // 1. Calculate trip duration (Refined based on real-world averages)
            // Without Route 6: ~0.9 min/km (avg 67km/h) + 15m buffer
            // With Route 6: ~0.75 min/km (avg 80km/h) + 10m buffer
            const minPerKm = useRoute6 ? 0.75 : 0.9;
            const buffer = useRoute6 ? 10 : 15;
            const tripDurationMin = (distanceKm * minPerKm) + buffer;
            setTripDuration(Math.round(tripDurationMin));

            // 2. Pickup = Flight Time - 3 hours (180 min) - trip duration
            const pickupDate = new Date(flightDate.getTime() - (180 * 60 * 1000) - (tripDurationMin * 60 * 1000));

            // Format for display and WA
            const formattedPickup = pickupDate.toLocaleString('he-IL', {
                day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
            });
            setRecommendedPickupTime(formattedPickup);

            const tripArrivalDate = new Date(pickupDate.getTime() + (tripDurationMin * 60 * 1000));

            const getTariffAtTime = (date: Date) => {
                const hour = date.getHours();
                const day = date.getDay();
                const isNight = hour >= 21 || hour < 6;
                const isWeekendEarly = (day === 5 && hour >= 16) || (day === 6 && hour >= 6 && hour < 21);
                const isShabbatPeak = (day === 5 && hour >= 21) || (day === 6 && hour < 6) || (day === 6 && hour >= 21) || (day === 0 && hour < 6);

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

        // Find Vehicle Config based on both passengers and luggage
        const vehicleConfig = PRICING_CONSTANTS.VEHICLE_TYPES.find(v =>
            passengers <= v.maxPassengers && luggage <= v.maxLuggage
        ) || PRICING_CONSTANTS.VEHICLE_TYPES[PRICING_CONSTANTS.VEHICLE_TYPES.length - 1];

        const vehicleMultiplier = vehicleConfig.multiplier;

        // Apply Regional Multiplier
        const regionMultiplier = (PRICING_CONSTANTS.REGION_MULTIPLIERS as any)[activeRegion] || 1.0;

        // Base Calculations
        const distancePrice = distanceKm * kmRate * vehicleMultiplier * regionMultiplier;

        const startPrice = PRICING_CONSTANTS.START_PRICE * vehicleMultiplier * regionMultiplier;
        const airportFee = PRICING_CONSTANTS.AIRPORT_FEE;

        // Extras

        // Dynamic Route 6 Pricing based on distance
        let route6Price = 0;
        if (useRoute6) {
            if (distanceKm < 35) route6Price = 20;
            else if (distanceKm < 80) route6Price = 40;
            else route6Price = 50; // Haifa case refined
        }

        const route6Fee = route6Price;
        const babySeatFee = babySeat ? PRICING_CONSTANTS.BABY_SEAT_PRICE : 0;

        let total = startPrice + distancePrice + airportFee + route6Fee + babySeatFee;

        console.log('--- Price Calculation Debug ---');
        console.log('Region Multiplier:', regionMultiplier, `(Area: ${activeRegion})`);
        console.log('KM Rate:', kmRate);
        console.log('Distance Price:', distancePrice);
        console.log('Total Before Rounding:', total);

        // Round up to nearest 10
        total = Math.ceil(total / 10) * 10;

        setPrice(total);
        setBreakdown({
            start: startPrice,
            distance: distancePrice,
            airport: airportFee,
            vehicleName: lang === 'he' ? vehicleConfig.nameHe : vehicleConfig.nameEn,
            vehicleMultiplier: vehicleMultiplier,
            route6: route6Fee,
            babySeat: babySeatFee,
            tariff: activeTariff
        });

    }, [distanceKm, passengers, luggage, flightTime, useRoute6, babySeat, lang, activeRegion]);

    const handleBooking = () => {
        const newErrors: { origin?: string; name?: string; phone?: string } = {};

        // Basic Validation
        if (!originName || originName.length < 3) {
            newErrors.origin = lang === 'he' ? 'נא לבחור כתובת איסוף מהרשימה' : 'Please select a pickup address';
        }

        if (!name || name.trim().length < 2) {
            newErrors.name = lang === 'he' ? 'שם קצר מדי' : 'Name is too short';
        }

        // Phone validation (Israeli format 05... or international with +)
        const phoneRegex = /^(?:05[0-9]{8}|\+?[1-9][0-9]{7,14})$/;
        if (!phone || !phoneRegex.test(phone.replace(/[-\s]/g, ''))) {
            newErrors.phone = lang === 'he' ? 'מספר טלפון לא תקין' : 'Invalid phone number';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        const message = t.whatsapp_msg
            .replace('{0}', name)
            .replace('{1}', originName)
            .replace('{2}', flightTime.replace('T', ' '))
            .replace('{3}', flightNumber || '-')
            .replace('{4}', `${passengers} (${breakdown?.vehicleName})`)
            .replace('{5}', luggage.toString())
            .replace('{6}', price.toString())
            .replace('{7}', babySeat ? (lang === 'he' ? 'כן' : 'Yes') : (lang === 'he' ? 'לא' : 'No'))
            .replace('{8}', useRoute6 ? (lang === 'he' ? 'כן' : 'Yes') : (lang === 'he' ? 'לא' : 'No'))
            .replace('{9}', recommendedPickupTime);

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/972547438110?text=${encodedMessage}`, '_blank');

        setIsSubmitting(false);
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
                                    className={`w-full bg-dark-bg/50 border ${errors.origin ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-gold/50 outline-none placeholder:text-gray-600 ${isRTL ? 'pl-10' : 'pr-10'}`}
                                    onChange={() => setErrors({ ...errors, origin: undefined })}
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

                {/* Recommended Pickup Time Alert */}
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
                                <div className="text-xs text-gray-500">{lang === 'he' ? 'זמן איסוף מומלץ מהבית' : 'Recommended Pickup Time'}</div>
                                <div className="text-md font-bold text-white">{recommendedPickupTime}</div>
                                <div className="text-[10px] text-gold/60 mt-0.5">
                                    {lang === 'he'
                                        ? `* מחושב לפי 3 שעות לפני המראה + זמן נסיעה משוער (${tripDuration} דק')`
                                        : `* Based on 3h before takeoff + travel time (${tripDuration} min)`}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Counter Inputs Row */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Passengers */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 flex items-center h-6">
                            <span>{t.passengers}</span>
                        </label>
                        <div className="flex items-center bg-dark-bg/50 border border-white/10 rounded-xl p-1 relative h-[52px]">
                            <button
                                onClick={() => setPassengers(Math.min(PRICING_CONSTANTS.MAX_PASSENGERS, passengers + 1))}
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
                        <label className="text-sm text-gray-400 flex items-center h-6">
                            <span>{t.luggage}</span>
                        </label>
                        <div className="flex items-center bg-dark-bg/50 border border-white/10 rounded-xl p-1 relative h-[52px]">
                            <button
                                onClick={() => setLuggage(Math.min(PRICING_CONSTANTS.MAX_LUGGAGE, luggage + 1))}
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

                {/* Vehicle Type Info Badge - Elegant & Dynamic */}
                <AnimatePresence>
                    {(passengers > 4 || luggage > 3) && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            className="bg-gold/5 border border-gold/20 rounded-2xl p-3 flex items-center justify-between group/vehicle"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-gold/10 p-2 rounded-xl text-gold group-hover/vehicle:scale-110 transition-transform">
                                    <Car className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-gold/60 leading-none mb-1">{isRTL ? 'סוג רכב נדרש' : 'Required Vehicle'}</div>
                                    <div className="text-sm font-bold text-white leading-none">{breakdown?.vehicleName}</div>
                                </div>
                            </div>
                            <div className="text-[10px] bg-gold/10 text-gold px-2 py-1 rounded-full border border-gold/20 font-bold">
                                Factor x{breakdown?.vehicleMultiplier}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Personal Info Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={t.full_name}
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setErrors({ ...errors, name: undefined });
                                }}
                                className={`w-full bg-dark-bg/50 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-gold/50 outline-none placeholder:text-gray-600 ${isRTL ? 'pl-10' : 'pr-10'}`}
                            />
                            <User className={`absolute top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 ${isRTL ? 'left-3' : 'right-3'}`} />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>
                    <div className="space-y-1">
                        <div className="relative">
                            <input
                                type="tel"
                                placeholder={t.phone}
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    setErrors({ ...errors, phone: undefined });
                                }}
                                className={`w-full bg-dark-bg/50 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-gold/50 outline-none placeholder:text-gray-600 ${isRTL ? 'pl-10' : 'pr-10'}`}
                            />
                            <Phone className={`absolute top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 ${isRTL ? 'left-3' : 'right-3'}`} />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                    </div>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                    <div
                        onClick={() => setBabySeat(!babySeat)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${babySeat ? 'bg-gold/10 border-gold/40' : 'bg-dark-bg/30 border-white/5 hover:border-white/20'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border ${babySeat ? 'bg-gold border-gold text-black' : 'border-gray-500'}`}>
                                {babySeat && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                            <span className={`text-sm ${babySeat ? 'text-gold' : 'text-gray-400'}`}>{t.baby_seat}</span>
                        </div>
                        <Users className={`w-4 h-4 ${babySeat ? 'text-gold' : 'text-gray-600'}`} />
                    </div>
                </div>

                <div className="h-px bg-white/10 w-full" />

                {/* Pricing Logic Breakdown */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-400 font-medium">
                        <span>{t.base_price}</span>
                        <span>₪{Math.round(breakdown?.distance + breakdown?.start)}</span>
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
                    {breakdown?.tariff?.includes('→') && (
                        <div className="flex justify-between text-xs text-gold/80 italic">
                            <span>{lang === 'he' ? 'חילוף תעריפים במהלך נסיעה' : 'Tariff change during trip'}</span>
                            <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /></span>
                        </div>
                    )}
                    {(breakdown?.tariff === 'B' || breakdown?.tariff?.startsWith('B→') || breakdown?.tariff?.endsWith('→B')) && (
                        <div className="flex justify-between text-xs text-gold/80">
                            <span>{t.night_tariff}</span>
                            <span className="flex items-center gap-1"><Info className="w-3 h-3" /></span>
                        </div>
                    )}
                    {(breakdown?.tariff === 'C' || breakdown?.tariff?.startsWith('C→') || breakdown?.tariff?.endsWith('→C')) && (
                        <div className="flex justify-between text-xs text-gold/80">
                            <span>{t.shabbat_tariff}</span>
                            <span className="flex items-center gap-1"><Info className="w-3 h-3" /></span>
                        </div>
                    )}
                    {useRoute6 && (
                        <div className="flex justify-between text-xs text-gold/80">
                            <span>{t.route6_fee}</span>
                            <span>₪{breakdown?.route6}</span>
                        </div>
                    )}
                    {babySeat && (
                        <div className="flex justify-between text-xs text-gold/80">
                            <span>{t.baby_seat_fee}</span>
                            <span>₪{PRICING_CONSTANTS.BABY_SEAT_PRICE}</span>
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

                {/* Disclaimer */}
                <p className="text-[10px] text-gray-500 italic px-2">
                    {t.disclaimer}
                </p>

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
            </div>
        </div>
    );
}
