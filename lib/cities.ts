import { PRICING_CONSTANTS } from '@/data/cities';

export type CityData = {
    name: string;
    duration: string;
    price: string;
    region?: string;
};

export type CityEntry = {
    he: CityData;
    en: CityData;
};

// Helper function to calculate duration based on distance
const calculateDuration = (distanceKm: number, lang: 'he' | 'en') => {
    const min = Math.round(distanceKm * 0.9); // Average 0.9 min per km
    const rounded = Math.ceil(min / 5) * 5; // Round to nearest 5
    return lang === 'he' ? `${rounded} דק׳` : `${rounded} min`;
};

// Helper function to calculate price based on distance and region
const calculatePrice = (distanceKm: number, region: string = 'central') => {
    const multipliers = PRICING_CONSTANTS.REGION_MULTIPLIERS as Record<string, number>;
    const multiplier = multipliers[region] || 1.0;

    const baseFare = PRICING_CONSTANTS.START_PRICE + (distanceKm * PRICING_CONSTANTS.KILOMETER_RATE_TARIFF_1);
    const totalWithMultiplier = baseFare * multiplier;

    const rounded = Math.ceil(totalWithMultiplier / 10) * 10; // Round to nearest 10 for clean display
    return rounded.toString();
};

const createCity = (heName: string, enName: string, distanceKm: number, region: string): CityEntry => ({
    he: {
        name: heName,
        duration: calculateDuration(distanceKm, 'he'),
        price: calculatePrice(distanceKm, region),
        region
    },
    en: {
        name: enName,
        duration: calculateDuration(distanceKm, 'en'),
        price: calculatePrice(distanceKm, region),
        region
    }
});

export const CITIES: Record<string, CityEntry> = {
    'tel-aviv': createCity('תל אביב', 'Tel Aviv', 25, 'central'),
    'raanana': createCity('רעננה', 'Raanana', 35, 'sharon'),
    'herzliya': createCity('הרצליה', 'Herzliya', 32, 'sharon'),
    'kfar-saba': createCity('כפר סבא', 'Kfar Saba', 38, 'sharon'),
    'netanya': createCity('נתניה', 'Netanya', 50, 'sharon'),
    'petah-tikva': createCity('פתח תקווה', 'Petah Tikva', 22, 'central'),
    'ramat-hasharon': createCity('רמת השרון', 'Ramat HaSharon', 30, 'sharon'),
    'hod-hasharon': createCity('הוד השרון', 'Hod HaSharon', 32, 'sharon'),
    'rishon-lezion': createCity('ראשון לציון', 'Rishon LeZion', 22, 'central'),
    'bat-yam': createCity('בת ים', 'Bat Yam', 25, 'central'),
    'holon': createCity('חולון', 'Holon', 22, 'central'),
    'rehovot': createCity('רחובות', 'Rehovot', 30, 'south'),
    'modiin': createCity('מודיעין', 'Modiin', 25, 'central'),
    'jerusalem': createCity('ירושלים', 'Jerusalem', 55, 'jerusalem'),
    'ashdod': createCity('אשדוד', 'Ashdod', 50, 'south'),
    'ramat-gan': createCity('רמת גן', 'Ramat Gan', 22, 'central'),
    'givatayim': createCity('גבעתיים', 'Givatayim', 24, 'central'),
    'bnei-brak': createCity('בני ברק', 'Bnei Brak', 20, 'central'),
    'kiryat-ono': createCity('קריית אונו', 'Kiryat Ono', 18, 'central'),
    'yehud': createCity('יהוד', 'Yehud', 12, 'central'),
    'ness-ziona': createCity('נס ציונה', 'Ness Ziona', 25, 'south'),
    'beer-sheva': createCity('באר שבע', 'Beer Sheva', 110, 'south'),
    'haifa': createCity('חיפה', 'Haifa', 110, 'north'),
    'caesarea': createCity('קיסריה', 'Caesarea', 65, 'north'),
    'hadera': createCity('חדרה', 'Hadera', 65, 'north'),
    'zikhron-yaakov': createCity('זכרון יעקב', 'Zikhron Yaakov', 80, 'north'),
    'shoham': createCity('שוהם', 'Shoham', 8, 'central'),
    'or-yehuda': createCity('אור יהודה', 'Or Yehuda', 14, 'central'),
    'ganei-tikva': createCity('גני תקווה', 'Ganei Tikva', 19, 'central'),
    'even-yehuda': createCity('אבן יהודה', 'Even Yehuda', 45, 'sharon'),
    'kadima-tzoran': createCity('קדימה-צורן', 'Kadima-Zoran', 42, 'sharon'),
    'tel-mond': createCity('תל מונד', 'Tel Mond', 40, 'sharon'),
    'tzur-moshe': createCity('צור משה', 'Tzur Moshe', 45, 'sharon'),
    'pardesiya': createCity('פרדסיה', 'Pardesiya', 48, 'sharon'),
    'bnei-dror': createCity('בני דרור', 'Bnei Dror', 40, 'sharon'),
    'ein-vered': createCity('עין ורד', 'Ein Vered', 45, 'sharon'),
    'ein-sarid': createCity('עין שריד', 'Ein Sarid', 45, 'sharon'),
    'kfar-yona': createCity('כפר יונה', 'Kfar Yona', 55, 'sharon'),
    'tel-yitzhak': createCity('תל יצחק', 'Tel Yitzhak', 40, 'sharon'),
    'bnei-zion': createCity('בני ציון', 'Bnei Zion', 35, 'sharon'),
    'rishpon': createCity('רשפון', 'Rishpon', 35, 'central'),
    'kfar-shmaryahu': createCity('כפר שמריהו', 'Kfar Shmaryahu', 35, 'central'),
    'binyamina': createCity('בנימינה', 'Binyamina', 85, 'north'),
    'pardes-hanna': createCity('פרדס חנה', 'Pardes Hanna', 65, 'north'),
    'karkur': createCity('כרכור', 'Karkur', 65, 'north'),

    // Northern expansion
    'akko': createCity('עכו', 'Akko', 125, 'north'),
    'nahariya': createCity('נהריה', 'Nahariya', 140, 'north'),
    'karmiel': createCity('כרמיאל', 'Karmiel', 135, 'north'),
    'tiberias': createCity('טבריה', 'Tiberias', 145, 'north'),
    'n Nazareth': createCity('נצרת', 'Nazareth', 110, 'north'),
    'afula': createCity('עפולה', 'Afula', 100, 'north'),
    'migdal-haemek': createCity('מגדל העמק', 'Migdal HaEmek', 105, 'north'),
    'yokneam': createCity('יקנעם', 'Yokneam', 95, 'north'),
    'moshava-kinneret': createCity('מושבה כנרת', 'Moshava Kinneret', 150, 'north'),
    'rosh-pina': createCity('ראש פינה', 'Rosh Pina', 170, 'north'),
    'safed': createCity('צפת', 'Safed', 175, 'north'),
    'kiryat-shmona': createCity('קריית שמונה', 'Kiryat Shmona', 200, 'north'),
    'katzrin': createCity('קצרין', 'Katzrin', 190, 'north'),

    // More southern & Shfela
    'ashkelon': createCity('אשקלון', 'Ashkelon', 65, 'south'),
    'kiryat-gat': createCity('קריית גת', 'Kiryat Gat', 75, 'south'),
    'sderot': createCity('שדרות', 'Sderot', 90, 'south'),
    'netivot': createCity('נתיבות', 'Netivot', 105, 'south'),
    'ofakim': createCity('אופקים', 'Ofakim', 115, 'south'),
    'eilat': createCity('אילת', 'Eilat', 340, 'south'),
};
