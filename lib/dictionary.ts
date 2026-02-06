export type Locale = 'he' | 'en';

export const dictionary = {
    he: {
        hero: {
            title: "מוניות גולדה",
            subtitle: "מוניות לנתב\"ג ולכל חלקי הארץ ברכבים חדישים. הזמינו נסיעה בקליק ותיהנו מחוויית שירות VIP.",
            cta: "הזמן מונית עכשיו",
            price_guarantee: "מחיר ידוע מראש",
        },
        calculator: {
            title: "מחשבון מחיר לנתב\"ג",
            pickup_label: "עיר איסוף",
            pickup_placeholder: "הקלד כתובת או עיר...",
            flight_no_label: "מספר טיסה (אופציונלי)",
            flight_no_placeholder: "למשל LY001",
            date_label: "מועד הטיסה (המראה)",
            passengers: "נוסעים",
            large_vehicle: "רכב גדול (6-10)",
            luggage: "מזוודות",
            full_name: "שם מלא",
            phone: "מספר טלפון",
            route6: "סע דרך כביש 6 (הכי מהיר)",
            base_price: "תעריף בסיס + נסיעה",
            airport_fee: "אגרת ומסים נתב\"ג",
            luggage_fee: "תוספת מזוודות",
            night_tariff: "תעריף לילה/שבת כלול",
            route6_fee: "תוספת כביש 6",
            total: "סה\"כ לתשלום (משוער)",
            vat_included: "כולל מע\"מ",
            submit_btn: "הזמן מונית בוואטסאפ",
            submitting: "מכין להזמנה...",
            loading_map: "טוען מפות...",
            error_details: "נא למלא שם וטלפון תקינים",
            whatsapp_msg: `היי מוניות גולדה, אשמח להזמין מונית.
שם: {0}
מאיפה: {1}
זמן טיסה: {2}
מספר טיסה: {3}
נוסעים: {4}
מזוודות: {5}
מחיר באתר: {6}₪`
        },
        city_page: {
            title: "מונית מ{city} לנתב\"ג",
            subtitle: "הדרך הנוחה והבטוחה ביותר להגיע לטיסה שלך.",
            duration: "זמן נסיעה משוער",
            pickup: "איסוף מהבית",
            pickup_desc: "נהג ימתין לך בכתובת המדויקת",
            price_fair: "מחיר הוגן וקבוע",
            price_start: "החל מ-",
            why_us_title: "למה לבחור במוניות גולדה?",
            availability: "זמינות 24/7",
            large_taxis: "מוניות גדולות למשפחות",
            faq_title: "שאלות נפוצות",
        }
    },
    en: {
        hero: {
            title: "Golda Cabs",
            subtitle: "Premium taxi service to Ben Gurion Airport and across Israel. Modern cars, fixed prices, and VIP service.",
            cta: "Book a Taxi Now",
            price_guarantee: "Fixed Price Guarantee",
        },
        calculator: {
            title: 'Fare Calculator',
            pickup_label: 'Pickup Location',
            pickup_placeholder: 'Enter city or address...',
            flight_no_label: 'Flight Number (Optional)',
            flight_no_placeholder: 'e.g. LY001',
            date_label: 'Flight Time (Departure)',
            passengers: 'Passengers',
            large_vehicle: 'Large Van',
            luggage: 'Luggage',
            full_name: 'Full Name',
            phone: 'Phone Number',
            route6: 'Use Highway 6 (Fastest)',
            base_price: 'Base Fare + Distance',
            airport_fee: 'Airport Fees & Taxes',
            luggage_fee: 'Luggage Supplement',
            night_tariff: 'Night/Weekend Rate Included',
            route6_fee: 'Highway 6 Toll',
            total: 'Total Estimated Price',
            vat_included: 'VAT Included',
            submit_btn: 'Book Taxi Now',
            submitting: 'Booking...',
            loading_map: 'Loading Maps...',
            error_details: 'Please fill name and phone to book',
            whatsapp_msg: `Hi GoldaCabs, I'd like to book a taxi.
Name: {0}
From: {1}
Flight Time: {2}
Flight No: {3}
Passengers: {4}
Luggage: {5}
Website Price: {6}ILS`
        },
        city_page: {
            title_prefix: 'Taxi from',
            to_airport: 'to Ben Gurion Airport',
            duration: 'Est. Travel Time',
            pickup: 'Door-to-Door',
            pickup_desc: 'From any address directly to Terminal 3',
            price_fair: 'Fair Price',
            price_start: 'From ',
            why_us_title: 'Why choose GoldaCabs?',
            availability: '24/7 Availability',
            large_taxis: 'Large Vans Available',
            faq_title: 'Frequently Asked Questions',
        }
    }
};
