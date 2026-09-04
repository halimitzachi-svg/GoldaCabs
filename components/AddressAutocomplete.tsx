'use client';

import React, { useState, useEffect, useRef } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { MapPin, Search, Loader2, Phone, AlertCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

interface AddressAutocompleteProps {
    value: string;
    onChange: (text: string) => void;
    onPlaceSelected: (data: {
        address: string;
        cityName: string;
        distanceKm: number;
        region: string;
    }) => void;
    onResetVerification: () => void;
    placeholder?: string;
    isRTL?: boolean;
    disabled?: boolean;
}

let isOptionsConfigured = false;
let placesLoadingPromise: Promise<google.maps.PlacesLibrary> | null = null;

function ensurePlacesLoaded(): Promise<google.maps.PlacesLibrary> {
    if (typeof window === 'undefined') return Promise.reject(new Error('Server side'));

    if (!isOptionsConfigured) {
        setOptions({
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
            v: 'weekly',
            region: 'IL'
        });
        isOptionsConfigured = true;
    }

    if (!placesLoadingPromise) {
        placesLoadingPromise = importLibrary('places');
    }
    return placesLoadingPromise;
}

export default function AddressAutocomplete({
    value,
    onChange,
    onPlaceSelected,
    onResetVerification,
    placeholder = 'הזן כתובת איסוף מדויקת...',
    isRTL = true,
    disabled = false
}: AddressAutocompleteProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const [loadState, setLoadState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
    const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
    const [hasLoadError, setHasLoadError] = useState(false);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const initAutocomplete = async () => {
        if (loadState === 'loading' || loadState === 'ready') return;
        setLoadState('loading');
        setHasLoadError(false);

        try {
            const placesLib = await ensurePlacesLoaded();

            if (!isMountedRef.current || !inputRef.current) return;

            const autocomplete = new placesLib.Autocomplete(inputRef.current, {
                componentRestrictions: { country: 'il' },
                fields: ['address_components', 'geometry', 'formatted_address', 'name']
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (!place.geometry || !place.geometry.location) {
                    return;
                }

                handlePlaceSelection(place);
            });

            autocompleteRef.current = autocomplete;
            if (isMountedRef.current) {
                setLoadState('ready');
            }
        } catch (error) {
            console.error('Failed to load Google Maps Places:', error);
            if (isMountedRef.current) {
                setLoadState('error');
                setHasLoadError(true);
            }
        }
    };

    const handlePlaceSelection = (place: google.maps.places.PlaceResult) => {
        const addressComponents = place.address_components || [];
        const fullName = place.name || '';
        const fullAddress = place.formatted_address || '';

        // Extract locality
        const cityComp = addressComponents.find(c =>
            c.types.includes('locality') ||
            c.types.includes('sublocality') ||
            c.types.includes('administrative_area_level_2')
        );
        const extractedCity = cityComp ? cityComp.long_name : '';
        const displayName = fullAddress || (extractedCity ? `${fullName}, ${extractedCity}` : fullName);

        // Region detection
        const searchNames = [
            ...addressComponents.map(c => c.long_name),
            ...addressComponents.map(c => c.short_name),
            fullName,
            fullAddress
        ];

        let detectedRegion = 'central';
        const isJerusalem = searchNames.some(name => /Jerusalem|ירושלים|Bet Shemesh|בית שמש/i.test(name));
        const isSouth = searchNames.some(name => /South|Ashdod|Beersheba|Darom|אשדוד|באר שבע|דרום|Ashkelon|Rehovot|אשקלון|רחובות/i.test(name));
        const isSharon = searchNames.some(name => /Sharon|Netanya|Herzliya|Raanana|נתניה|הרצליה|רעננה|שרון|Hod HaSharon|Kfar Saba|כפר סבא|הוד השרון/i.test(name));
        const isNorth = searchNames.some(name => /Haifa|חיפה|Krayot|קריות|Akko|עכו|Nahariya|נהריה|Tzafon|צפון/i.test(name));

        if (isJerusalem) detectedRegion = 'jerusalem';
        else if (isSouth) detectedRegion = 'south';
        else if (isSharon) detectedRegion = 'sharon';
        else if (isNorth) detectedRegion = 'north';
        else detectedRegion = 'central';

        const fallbackDistance = () => {
            const loc = place.geometry!.location!;
            const lat1 = loc.lat();
            const lon1 = loc.lng();
            const lat2 = 32.0055;
            const lon2 = 34.8854;
            const R = 6371; // km
            const dLat = ((lat2 - lat1) * Math.PI) / 180;
            const dLon = ((lon2 - lon1) * Math.PI) / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const straightKm = R * c;
            const drivingEstKm = Math.round(straightKm * 1.3);

            onPlaceSelected({
                address: displayName,
                cityName: extractedCity,
                distanceKm: Math.max(10, drivingEstKm),
                region: detectedRegion
            });
        };

        // Calculate Driving Distance to TLV Airport
        if (place.geometry?.location) {
            setIsCalculatingDistance(true);

            importLibrary('routes')
                .then(routesLib => {
                    const service = new routesLib.DistanceMatrixService();
                    const tlvLocation = new google.maps.LatLng(32.0055, 34.8854);

                    service.getDistanceMatrix(
                        {
                            origins: [place.geometry!.location!],
                            destinations: [tlvLocation],
                            travelMode: google.maps.TravelMode.DRIVING
                        },
                        (response: google.maps.DistanceMatrixResponse | null, status: google.maps.DistanceMatrixStatus) => {
                            if (isMountedRef.current) {
                                setIsCalculatingDistance(false);
                            }
                            if (status === 'OK' && response?.rows?.[0]?.elements?.[0]?.distance) {
                                const distanceInKm = Math.round((response.rows[0].elements[0].distance.value / 1000) * 10) / 10;
                                onPlaceSelected({
                                    address: displayName,
                                    cityName: extractedCity,
                                    distanceKm: distanceInKm,
                                    region: detectedRegion
                                });
                            } else {
                                fallbackDistance();
                            }
                        }
                    );
                })
                .catch(() => {
                    if (isMountedRef.current) {
                        setIsCalculatingDistance(false);
                    }
                    fallbackDistance();
                });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        onChange(text);
        // Manual editing immediately resets the verified place state
        onResetVerification();
    };

    return (
        <div className="relative w-full space-y-2">
            <div className="relative">
                <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} text-gold pointer-events-none`}>
                    {loadState === 'loading' || isCalculatingDistance ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <MapPin className="w-5 h-5" />
                    )}
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onFocus={initAutocomplete}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`w-full bg-black/40 border border-white/10 rounded-xl py-3.5 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-sm md:text-base`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    autoComplete="off"
                />
            </div>

            {/* Active Fallback if Google Maps fails to load */}
            {hasLoadError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-gray-300 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <div className="space-y-1 flex-1">
                        <p>
                            {isRTL
                                ? 'שירות השלמת כתובות אינו זמין כעת. ניתן לחייג או לתאם ישירות בוואטסאפ:'
                                : 'Address autocompletion is currently unavailable. You can call or text on WhatsApp directly:'}
                        </p>
                        <div className="flex gap-3 pt-1">
                            <a
                                href={`tel:${SITE_CONFIG.phone}`}
                                className="font-bold text-gold hover:underline flex items-center gap-1"
                            >
                                <Phone className="w-3 h-3" />
                                <span>{SITE_CONFIG.phoneDisplay}</span>
                            </a>
                            <a
                                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                                    isRTL
                                        ? `היי מוניות גולדה, ברצוני להזמין מונית מכתובת: ${value || 'לא צוינה'}`
                                        : `Hi GoldaCabs, I would like to book a taxi from: ${value || 'not specified'}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-green-400 hover:underline"
                            >
                                {isRTL ? 'שליחה בוואטסאפ' : 'WhatsApp'}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
