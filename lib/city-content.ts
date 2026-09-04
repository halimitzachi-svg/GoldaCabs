export type LocalCityContent = {
    neighborhoods: string[];
    mainRoutes: string[];
    peakDuration: string;
    offPeakDuration: string;
    arrivalNotesHe: string;
    arrivalNotesEn: string;
    nearbyCities: string[];
    lastReviewed: string; // ISO format: '2026-09-04'
    sources: string[];
};

export const TOP_CITIES_CONTENT: Record<string, LocalCityContent> = {
    'tel-aviv': {
        neighborhoods: ['צפון ישן', 'צפון חדש', 'רמת אביב', 'לב העיר', 'פלורנטין', 'שרונה', 'יפו'],
        mainRoutes: ['נתיבי איילון (כביש 20)', 'נתיב פלוס/מהיר', 'כביש 1'],
        peakDuration: '35–50 דקות',
        offPeakDuration: '20–25 דקות',
        arrivalNotesHe: 'איסוף מטרמינל 3 קומה 2 (שער מוניות מאושרות) או טרמינל 1, עם מעקב טיסה וזמן המתנה חינם לאחר נחיתה.',
        arrivalNotesEn: 'Pickup from Terminal 3 (Level 2 authorized gates) or Terminal 1, with flight tracking and complimentary buffer time after landing.',
        nearbyCities: ['ramat-gan', 'givatayim', 'holon', 'bat-yam', 'herzliya'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive', 'Israel National Roads Authority (Netivei Israel)']
    },
    'netanya': {
        neighborhoods: ['קריית השרון', 'עיר ימים', 'רמת פולג', 'אגמים', 'מרכז העיר', 'עין התכלת'],
        mainRoutes: ['כביש 2 (החוף)', 'כביש 531', 'כביש 6'],
        peakDuration: '50–70 דקות',
        offPeakDuration: '35–45 דקות',
        arrivalNotesHe: 'איסוף ישיר מכל שער נחיתות בנתב"ג חזרה לפולג, עיר ימים ומרכז נתניה ללא עצירות ביניים.',
        arrivalNotesEn: 'Direct non-stop transfer from TLV arrivals directly to Poleg, Ir Yamim, and Central Netanya.',
        nearbyCities: ['even-yehuda', 'kfar-yona', 'herzliya', 'raanana'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive', 'Netivei Ayalon Real-Time Travel Indices']
    },
    'herzliya': {
        neighborhoods: ['הרצליה פיתוח', 'מרינה', 'הרצליה הצעירה', 'נוף ים', 'נווה עמל', 'מרכז העיר'],
        mainRoutes: ['כביש 2 (מחלף הסירה)', 'נתיבי איילון צפון', 'כביש 531'],
        peakDuration: '35–50 דקות',
        offPeakDuration: '25–30 דקות',
        arrivalNotesHe: 'נהגים מנוסים במתן שירות למלונות המרינה, אנשי עסקים בהרצליה פיתוח ותושבי העיר.',
        arrivalNotesEn: 'Experienced drivers servicing Herzliya Pituach tech hub, Marina hotels, and residential districts.',
        nearbyCities: ['tel-aviv', 'raanana', 'ramat-hasharon', 'kfar-shmaryahu'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive', 'Israel Airports Authority Ground Transport Guidelines']
    },
    'raanana': {
        neighborhoods: ['לב הפארק', 'נווה זמר', 'אחוזה', 'קריית שרת', 'רסקו'],
        mainRoutes: ['כביש 531', 'כביש 4', 'כביש 6'],
        peakDuration: '35–50 דקות',
        offPeakDuration: '25–30 דקות',
        arrivalNotesHe: 'חיבור מהיר דרך כביש 531 ישירות למחלף חורשים וכביש 6/נתב"ג.',
        arrivalNotesEn: 'Fast express connection via Highway 531 directly to Highway 6 and Ben Gurion Airport.',
        nearbyCities: ['kfar-saba', 'herzliya', 'hod-hasharon', 'ramat-hasharon'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive']
    },
    'kfar-saba': {
        neighborhoods: ['כפר סבא הירוקה', 'מרכז העיר', 'שכונת קפלן', 'עלייה', 'הדרים'],
        mainRoutes: ['כביש 531 מזרח', 'כביש 6 מחלף אייל', 'כביש 4'],
        peakDuration: '35–50 דקות',
        offPeakDuration: '25–30 דקות',
        arrivalNotesHe: 'גישה ישירה ומהירה לכביש 6 מאפשרת עקיפת פקקי הבוקר בדרך לשדה.',
        arrivalNotesEn: 'Direct access to Highway 6 avoids central morning bottlenecks heading to TLV.',
        nearbyCities: ['raanana', 'hod-hasharon', 'petah-tikva'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive']
    },
    'petah-tikva': {
        neighborhoods: ['אם המושבות', 'כפר גנים', 'נווה עוז', 'עין גנים', 'הדר גנים'],
        mainRoutes: ['כביש 471 (מכבית)', 'כביש 40', 'כביש 4'],
        peakDuration: '25–40 דקות',
        offPeakDuration: '15–20 דקות',
        arrivalNotesHe: 'העיר הקרובה ביותר למתחם נתב"ג באזור השרון הדרומי, נסיעה מהירה דרך 471.',
        arrivalNotesEn: 'Proximity to Ben Gurion ensures rapid transfers via Route 471.',
        nearbyCities: ['kiryat-ono', 'ganei-tikva', 'ramat-gan', 'bnei-brak'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive']
    },
    'rishon-lezion': {
        neighborhoods: ['נחלת יהודה', 'נווה ים', 'כרמים', 'שקמה', 'מרכז העיר', 'שיכון המזרח'],
        mainRoutes: ['כביש 431 ישיר לטרמינל 3', 'כביש 4', 'כביש 20'],
        peakDuration: '25–35 דקות',
        offPeakDuration: '15–20 דקות',
        arrivalNotesHe: 'נסיעה חלקה ומהירה ללא רמזורים דרך כביש 431 ישירות למתחם הטיסות.',
        arrivalNotesEn: 'Freeway express ride via Route 431 straight to Terminal 3 without traffic lights.',
        nearbyCities: ['holon', 'bat-yam', 'ness-ziona', 'rehovot'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive']
    },
    'jerusalem': {
        neighborhoods: ['רחביה', 'בקעה', 'המושבה הגרמנית', 'קטמון', 'מלחה', 'בית הכרם', 'פסגת זאב'],
        mainRoutes: ['כביש 1', 'כביש 16 (דרך אריאל שרון)', 'כביש 6'],
        peakDuration: '60–85 דקות',
        offPeakDuration: '45–55 דקות',
        arrivalNotesHe: 'שירות מדלת לדלת מכל שכונות ירושלים ברכבים מרווחים המתאימים לעליות ולמזוודות מרובות.',
        arrivalNotesEn: 'Door-to-door mountain-grade comfortable transfer tailored for Jerusalem residents and luggage.',
        nearbyCities: ['modiin', 'bet-shemesh', 'tel-aviv'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive', 'Netivei Israel Highway 1 Traffic Reports']
    },
    'haifa': {
        neighborhoods: ['מרכז הכרמל', 'דניה', 'אחוזה', 'נווה שאנן', 'העיר התחתית', 'בת גלים'],
        mainRoutes: ['כביש 2', 'כביש 6 (אופציונלי למהירות מרבית)', 'מנהרות הכרמל'],
        peakDuration: '95–125 דקות',
        offPeakDuration: '75–85 דקות',
        arrivalNotesHe: 'נסיעות VIP מחיפה והצפון עם נהגי כביש 6 מנוסים ורכבים מפוארים לנסיעות ארוכות.',
        arrivalNotesEn: 'Long-distance VIP cruising with Highway 6 option and luxury spacious cabins.',
        nearbyCities: ['caesarea', 'hadera', 'zikhron-yaakov', 'akko'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive']
    },
    'modiin': {
        neighborhoods: ['מוריה', 'בוכמן', 'הציפורים', 'כרמים', 'מרכז העיר', 'מכבים-רעות'],
        mainRoutes: ['כביש 431', 'כביש 1'],
        peakDuration: '22–30 דקות',
        offPeakDuration: '15–20 דקות',
        arrivalNotesHe: 'זמן הגעה מינימלי בשל הקרבה הגאוגרפית לטרמינל.',
        arrivalNotesEn: 'Minimal transit duration given close proximity to airport terminals.',
        nearbyCities: ['jerusalem', 'ramla', 'rehovot'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive']
    },
    'bat-yam': {
        neighborhoods: ['פארק הים', 'טיילת', 'רמת הנשיא', 'מרכז העיר'],
        mainRoutes: ['נתיבי איילון (כביש 20)', 'כביש 431'],
        peakDuration: '30–45 דקות',
        offPeakDuration: '20–25 דקות',
        arrivalNotesHe: 'איסוף מדויק מכל שדרת המלונות והמגורים בקו החוף ישירות לשדה.',
        arrivalNotesEn: 'Reliable pickup across the coastal hotel and residential strip to TLV.',
        nearbyCities: ['holon', 'tel-aviv', 'rishon-lezion'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive']
    },
    'holon': {
        neighborhoods: ['קריית שרת', 'ח-300 (קריית אילון)', 'תל גיבורים', 'אגרובנק', 'נווה רמז'],
        mainRoutes: ['כביש 44', 'כביש 4', 'נתיבי איילון'],
        peakDuration: '25–40 דקות',
        offPeakDuration: '18–22 דקות',
        arrivalNotesHe: 'איסוף מהיר מכל שכונות חולון עם יציאה נוחה לכביש 44/נתב"ג.',
        arrivalNotesEn: 'Swift pickup throughout Holon with smooth outbound access to Route 44 and airport gates.',
        nearbyCities: ['bat-yam', 'tel-aviv', 'rishon-lezion'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive']
    },
    'rehovot': {
        neighborhoods: ['פארק המדע', 'מכון ויצמן', 'נווה עמית', 'מרכז העיר', 'רחובות המדע'],
        mainRoutes: ['כביש 40', 'כביש 412', 'כביש 431'],
        peakDuration: '30–45 דקות',
        offPeakDuration: '20–25 דקות',
        arrivalNotesHe: 'נסיעות תכופות עבור הקהילה המדעית, פארק המדע ומרכז העיר.',
        arrivalNotesEn: 'Frequent premium rides catering to Weizmann Institute, Science Park, and local travelers.',
        nearbyCities: ['ness-ziona', 'rishon-lezion', 'ashdod'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive']
    },
    'ramat-gan': {
        neighborhoods: ['מתחם הבורסה', 'מרום נווה', 'רמת חן', 'שיכון ותיקים', 'תל יהודה'],
        mainRoutes: ['כביש 4', 'נתיבי איילון', 'כביש 471'],
        peakDuration: '30–45 דקות',
        offPeakDuration: '20–25 דקות',
        arrivalNotesHe: 'שירות VIP המותאם הן לאנשי עסקים ממתחם הבורסה והן למשפחות משכונות העיר.',
        arrivalNotesEn: 'VIP service accommodating Diamond Exchange business travel and family departures.',
        nearbyCities: ['givatayim', 'tel-aviv', 'bnei-brak', 'petah-tikva'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive']
    },
    'ashdod': {
        neighborhoods: ['מרינה', 'סיטי', 'רובע י"א', 'רובע ט"ו', 'רובע ד\''],
        mainRoutes: ['כביש 4', 'כביש 41', 'כביש 431'],
        peakDuration: '45–65 דקות',
        offPeakDuration: '35–40 דקות',
        arrivalNotesHe: 'איסוף מסודר מאשדוד דרך כביש 4 ו-431 ללא מעבר בתוך פקקי גוש דן.',
        arrivalNotesEn: 'Smooth southern route via Highway 4 and 431 bypassing dense central congestion.',
        nearbyCities: ['ashkelon', 'rehovot', 'rishon-lezion'],
        lastReviewed: '2026-09-04',
        sources: ['GoldaCabs Dispatch Archive']
    }
};

/**
 * Returns city content if available in verified catalog, or null for unverified cities
 */
export function getLocalCityContent(citySlug: string): LocalCityContent | null {
    const cleanKey = citySlug.replace('taxi-', '').toLowerCase();
    return TOP_CITIES_CONTENT[cleanKey] || null;
}
