export type CityData = {
    name: string;
    distanceKm: number; // Estimated distance to Ben Gurion
    tollRoadAvailable: boolean; // Is Route 6 relevant?
};

export const CITIES_DATA: CityData[] = [
    // Central District (Gush Dan / Sharon)
    { name: 'שוהם', distanceKm: 8, tollRoadAvailable: false },
    { name: 'לוד', distanceKm: 12, tollRoadAvailable: false },
    { name: 'רמלה', distanceKm: 15, tollRoadAvailable: false },
    { name: 'יהוד-מונוסון', distanceKm: 12, tollRoadAvailable: false },
    { name: 'אור יהודה', distanceKm: 14, tollRoadAvailable: false },
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
    KILOMETER_RATE_TARIFF_1: 3.5, // Day
    KILOMETER_RATE_TARIFF_2: 4.2, // Night/Shabbat
    START_PRICE: 11.0,
    AIRPORT_FEE: 5.0,
    SUITCASE_PRICE: 10.0,
    ROUTE_6_PRICE: 35.0, // Avg toll
    PASSENGER_SURCHARGE_THRESHOLD: 4,
    PASSENGER_SURCHARGE_AMOUNT: 30.0, // For "Maxi Taxi" request
};
