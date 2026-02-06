export type CityData = {
    name: string;
    duration: string;
    price: string;
};

export type CityEntry = {
    he: CityData;
    en: CityData;
};

export const CITIES: Record<string, CityEntry> = {
    'tel-aviv': {
        he: { name: 'תל אביב', duration: '25 דק׳', price: '130' },
        en: { name: 'Tel Aviv', duration: '25 min', price: '130' }
    },
    'raanana': {
        he: { name: 'רעננה', duration: '35 דק׳', price: '140' },
        en: { name: 'Raanana', duration: '35 min', price: '140' }
    },
    'herzliya': {
        he: { name: 'הרצליה', duration: '30 דק׳', price: '150' },
        en: { name: 'Herzliya', duration: '30 min', price: '150' }
    },
    'kfar-saba': {
        he: { name: 'כפר סבא', duration: '40 דק׳', price: '145' },
        en: { name: 'Kfar Saba', duration: '40 min', price: '145' }
    },
    'netanya': {
        he: { name: 'נתניה', duration: '45 דק׳', price: '180' },
        en: { name: 'Netanya', duration: '45 min', price: '180' }
    },
    'petah-tikva': {
        he: { name: 'פתח תקווה', duration: '20 דק׳', price: '120' },
        en: { name: 'Petah Tikva', duration: '20 min', price: '120' }
    },
    'ramat-hasharon': {
        he: { name: 'רמת השרון', duration: '25 דק׳', price: '140' },
        en: { name: 'Ramat HaSharon', duration: '25 min', price: '140' }
    },
    'hod-hasharon': {
        he: { name: 'הוד השרון', duration: '35 דק׳', price: '140' },
        en: { name: 'Hod HaSharon', duration: '35 min', price: '140' }
    },
    'rishon-lezion': {
        he: { name: 'ראשון לציון', duration: '25 דק׳', price: '130' },
        en: { name: 'Rishon LeZion', duration: '25 min', price: '130' }
    },
    'bat-yam': {
        he: { name: 'בת ים', duration: '20 דק׳', price: '130' },
        en: { name: 'Bat Yam', duration: '20 min', price: '130' }
    },
    'holon': {
        he: { name: 'חולון', duration: '20 דק׳', price: '130' },
        en: { name: 'Holon', duration: '20 min', price: '130' }
    },
    'rehovot': {
        he: { name: 'רחובות', duration: '35 דק׳', price: '140' },
        en: { name: 'Rehovot', duration: '35 min', price: '140' }
    },
    'modiin': {
        he: { name: 'מודיעין', duration: '25 דק׳', price: '130' },
        en: { name: 'Modiin', duration: '25 min', price: '130' }
    },
    'jerusalem': {
        he: { name: 'ירושלים', duration: '45 דק׳', price: '250' },
        en: { name: 'Jerusalem', duration: '45 min', price: '250' }
    },
    'ashdod': {
        he: { name: 'אשדוד', duration: '40 דק׳', price: '180' },
        en: { name: 'Ashdod', duration: '40 min', price: '180' }
    },
    'ramat-gan': {
        he: { name: 'רמת גן', duration: '20 דק׳', price: '130' },
        en: { name: 'Ramat Gan', duration: '20 min', price: '130' }
    },
    'givatayim': {
        he: { name: 'גבעתיים', duration: '20 דק׳', price: '130' },
        en: { name: 'Givatayim', duration: '20 min', price: '130' }
    },
    'bnei-brak': {
        he: { name: 'בני ברק', duration: '20 דק׳', price: '130' },
        en: { name: 'Bnei Brak', duration: '20 min', price: '130' }
    },
    'kiryat-ono': {
        he: { name: 'קריית אונו', duration: '20 דק׳', price: '130' },
        en: { name: 'Kiryat Ono', duration: '20 min', price: '130' }
    },
    'yehud': {
        he: { name: 'יהוד', duration: '15 דק׳', price: '100' },
        en: { name: 'Yehud', duration: '15 min', price: '100' }
    },
    'ness-ziona': {
        he: { name: 'נס ציונה', duration: '30 דק׳', price: '140' },
        en: { name: 'Ness Ziona', duration: '30 min', price: '140' }
    },
    'beer-sheva': {
        he: { name: 'באר שבע', duration: '70 דק׳', price: '450' },
        en: { name: 'Beer Sheva', duration: '70 min', price: '450' }
    },
    'haifa': {
        he: { name: 'חיפה', duration: '75 דק׳', price: '550' },
        en: { name: 'Haifa', duration: '75 min', price: '550' }
    },
    'aesarea': {
        he: { name: 'קיסריה', duration: '50 דק׳', price: '350' },
        en: { name: 'Caesarea', duration: '50 min', price: '350' }
    },
    'hadera': {
        he: { name: 'חדרה', duration: '50 דק׳', price: '300' },
        en: { name: 'Hadera', duration: '50 min', price: '300' }
    },
    'zikhron-yaakov': {
        he: { name: 'זכרון יעקב', duration: '60 דק׳', price: '400' },
        en: { name: 'Zikhron Yaakov', duration: '60 min', price: '400' }
    }
};
