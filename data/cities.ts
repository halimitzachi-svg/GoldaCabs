export type CityData = {
    name: string;
    distanceKm: number; // Estimated distance to Ben Gurion
    tollRoadAvailable: boolean; // Is Route 6 relevant?
};

export const CITIES_DATA: CityData[] = [
    // Central District (Gush Dan / Sharon)
    { name: 'רמלה', distanceKm: 15, tollRoadAvailable: false },
    { name: 'קריית אונו', distanceKm: 18, tollRoadAvailable: false },
    { name: 'גני תקווה', distanceKm: 19, tollRoadAvailable: false },
    { name: 'סביון', distanceKm: 16, tollRoadAvailable: false },
    { name: 'ראשון לציון (מערב)', distanceKm: 25, tollRoadAvailable: false },
    { name: 'ראשון לציון (מזרח)', distanceKm: 20, tollRoadAvailable: false },
    { name: 'חולון', distanceKm: 22, tollRoadAvailable: false },
    { name: 'בת ים', distanceKm: 25, tollRoadAvailable: false },
    { name: 'תל אביב (דרום)', distanceKm: 20, tollRoadAvailable: false },
    { name: 'תל אביב (מרכז)', distanceKm: 25, tollRoadAvailable: false },
    { name: 'תל אביב (צפון)', distanceKm: 28, tollRoadAvailable: false },
    { name: 'רמת גן', distanceKm: 22, tollRoadAvailable: false },
    { name: 'גבעתיים', distanceKm: 24, tollRoadAvailable: false },
    { name: 'בני ברק', distanceKm: 20, tollRoadAvailable: false },
    { name: 'פתח תקווה', distanceKm: 22, tollRoadAvailable: false },
    { name: 'ראש העין', distanceKm: 28, tollRoadAvailable: true },
    { name: 'אלעד', distanceKm: 22, tollRoadAvailable: true },
    // Sharon Area
    { name: 'רמת השרון', distanceKm: 30, tollRoadAvailable: false },
    { name: 'הרצליה', distanceKm: 32, tollRoadAvailable: false },
    { name: 'הרצליה פיתוח', distanceKm: 34, tollRoadAvailable: false },
    { name: 'רעננה', distanceKm: 35, tollRoadAvailable: true },
    { name: 'כפר סבא', distanceKm: 38, tollRoadAvailable: true },
    { name: 'הוד השרון', distanceKm: 32, tollRoadAvailable: true },
    { name: 'נתניה', distanceKm: 50, tollRoadAvailable: true },
    { name: 'כפר יונה', distanceKm: 55, tollRoadAvailable: true },
    { name: 'אבן יהודה', distanceKm: 45, tollRoadAvailable: true },
    { name: 'קדימה-צורן', distanceKm: 42, tollRoadAvailable: true },
    { name: 'תל מונד', distanceKm: 40, tollRoadAvailable: true },

    // North (Approximate)
    { name: 'חדרה', distanceKm: 65, tollRoadAvailable: true },
    { name: 'אור עקיבא', distanceKm: 70, tollRoadAvailable: true },
    { name: 'זכרון יעקב', distanceKm: 80, tollRoadAvailable: true },
    { name: 'חיפה', distanceKm: 110, tollRoadAvailable: true },
    { name: 'קריות', distanceKm: 120, tollRoadAvailable: true },
    { name: 'נהריה', distanceKm: 140, tollRoadAvailable: true },
    { name: 'עפולה', distanceKm: 100, tollRoadAvailable: true },
    { name: 'טבריה', distanceKm: 145, tollRoadAvailable: true },

    // South / Shfela
    { name: 'רחובות', distanceKm: 30, tollRoadAvailable: true },
    { name: 'נס ציונה', distanceKm: 25, tollRoadAvailable: false },
    { name: 'יבנה', distanceKm: 35, tollRoadAvailable: false },
    { name: 'גדרה', distanceKm: 40, tollRoadAvailable: true },
    { name: 'אשדוד', distanceKm: 50, tollRoadAvailable: false },
    { name: 'אשקלון', distanceKm: 65, tollRoadAvailable: false },
    { name: 'קריית גת', distanceKm: 75, tollRoadAvailable: true },
    { name: 'באר שבע', distanceKm: 110, tollRoadAvailable: true },

    // Jerusalem Area
    { name: 'מודיעין', distanceKm: 25, tollRoadAvailable: true },

    { name: 'ירושלים', distanceKm: 55, tollRoadAvailable: true },
    { name: 'בית שמש', distanceKm: 45, tollRoadAvailable: false },
    { name: 'מעלה אדומים', distanceKm: 65, tollRoadAvailable: true },
];

export const PRICING_CONSTANTS = {
    KILOMETER_RATE_TARIFF_1: 3.21, // Day (April 2026 rates)
    KILOMETER_RATE_TARIFF_2: 3.54, // Night/Weekend (April 2026 rates)
    KILOMETER_RATE_TARIFF_3: 3.87, // Shabbat Peak (April 2026 rates)
    START_PRICE: 10.56,
    AIRPORT_FEE: 5.0,
    SUITCASE_PRICE: 0, // No extra charge per suitcase
    ROUTE_6_PRICE: 35.0, // Avg toll
    BABY_SEAT_PRICE: 40.0,

    // Passenger & Vehicle Logic
    MAX_PASSENGERS: 20,
    MAX_LUGGAGE: 20,
    VEHICLE_TYPES: [
        { maxPassengers: 4, maxLuggage: 3, nameHe: 'מונית רגילה', nameEn: 'Standard Taxi', multiplier: 1.0 },
        { maxPassengers: 7, maxLuggage: 8, nameHe: 'מונית גדולה (Van)', nameEn: 'Large Taxi (Van)', multiplier: 1.4 },
        { maxPassengers: 11, maxLuggage: 12, nameHe: 'מיניבוס (11)', nameEn: 'Minibus (11)', multiplier: 1.9 },
        { maxPassengers: 20, maxLuggage: 20, nameHe: 'מיניבוס VIP (20)', nameEn: 'VIP Minibus (20)', multiplier: 2.6 },
    ],

    // Regional Adjustments (Multipliers for KM rate to reach target market rates)
    REGION_MULTIPLIERS: {
        'central': 2.65,    // Gush Dan (Tel Aviv -> 250₪)
        'sharon': 2.0,      // Sharon Area (Netanya -> 350₪)
        'north': 1.35,      // North (Haifa -> 500₪)
        'south': 2.0,       // Southern District (Ashdod -> 350₪)
        'jerusalem': 1.9,   // Jerusalem (~370₪)
    }
};

/**
 * Dynamic Multiplier based on Distance to Ben Gurion Airport:
 * - Closer distances receive higher factor (e.g. 25km Tel Aviv = 2.65 -> 250₪)
 * - Medium distances smoothly scale (e.g. 50km Netanya = 2.0 -> 350₪)
 * - Far distances smoothly decrease to minimum bound of 1.3 (e.g. 110km Haifa = 1.35 -> 500₪, minimum floor 1.3)
 */
export function getDistanceMultiplier(distanceKm: number): number {
    if (distanceKm <= 0) return 2.65;
    if (distanceKm <= 25) {
        return Math.max(2.65, 2.65 + (25 - distanceKm) * 0.025);
    } else if (distanceKm <= 50) {
        return 2.65 - (distanceKm - 25) * (0.65 / 25);
    } else if (distanceKm <= 110) {
        return 2.0 - (distanceKm - 50) * (0.65 / 60);
    } else {
        return Math.max(1.30, 1.35 - (distanceKm - 110) * 0.001);
    }
}
