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
            baby_seat: "הזמן כסא תינוק (תוספת 40₪)",
            base_price: "תעריף בסיס + נסיעה",
            airport_fee: "אגרת ומסים נתב\"ג",
            luggage_fee: "תוספת מזוודות",
            night_tariff: "תעריף לילה/שבת כלול",
            route6_fee: "תוספת כביש 6",
            baby_seat_fee: "תוספת כסא תינוק",
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
כסא תינוק: {7}
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
        },
        faq: {
            title: "שאלות ותשובות",
            questions: [
                {
                    q: "כמה עולה מונית לנתב\"ג?",
                    a: "המחיר משתנה בהתאם לעיר האיסוף, שעת הנסיעה (תעריף יום/לילה) ומספר הנוסעים. ניתן להשתמש במחשבון המחיר שלנו בראש העמוד לקבלת הערכה מדויקת."
                },
                {
                    q: "האם אתם עובדים בשבת וחגים?",
                    a: "כן, מוניות גולדה זמינות עבורכם 24 שעות ביממה, 7 ימים בשבוע, כולל שבתות, חגים ולילות."
                },
                {
                    q: "יש לכם מוניות גדולות למשפחות?",
                    a: "בהחלט. ברשותנו צי רכבים הכולל מוניות ספיישל רגילות וגם מוניות גדולות (Minivan) המאימות לעד 6-10 נוסעים עם הרבה מזוודות."
                },
                {
                    q: "כמה זמן מראש כדאי להזמין?",
                    a: "לנסיעות לנתב\"ג אנחנו ממליצים להזמין לפחות 12-24 שעות מראש כדי להבטיח נהג זמין, אך ניתן להזמין גם בהתראה קצרה."
                }
            ]
        },
        testimonials: {
            title: "מה הלקוחות שלנו אומרים",
            items: [
                {
                    name: "דניאל כהן",
                    text: "שירות מצוין! הנהג הגיע 5 דקות לפני הזמן, הרכב היה נקי ומרווח. ממליץ בחום למי שמחפש שקט נפשי בדרך לשדה.",
                    stars: 5
                },
                {
                    name: "מיכל לוי",
                    text: "הזמנתי מונית גדולה לכל המשפחה. הכל תקתק, המחשבון באתר דייק במחיר ולא היו הפתעות. בהחלט נזמין שוב.",
                    stars: 5
                }
            ]
        },
        deliveries: {
            title: "משלוחי אקספרס במונית",
            subtitle: "שירות משלוחים מהיר מהיום להיום לכל חלקי הארץ. איסוף מיידי, רכב פרטי מאובטח, ומחירים קבועים.",
            cta: "הזמן משלוח עכשיו",
            benefit1: "איסוף תוך 15 דקות",
            benefit2: "מסירה מדלת לדלת",
            benefit3: "ביטוח מלא למשלוח",
            why_title: "למה לבחור במוניות גולדה למשלוחים?",
            why_desc: "בניגוד לשליח על קטנוע, במונית המשלוח שלך מוגן מחום, גשם וטלטלות. אנחנו מבטיחים הגעה מהירה ובטוחה של חבילות, מסמכים חשובים וציוד רגיש.",
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
            baby_seat: 'Request Baby Seat (+40 ILS)',
            base_price: 'Base Fare + Distance',
            airport_fee: 'Airport Fees & Taxes',
            luggage_fee: 'Luggage Supplement',
            night_tariff: 'Night/Weekend Rate Included',
            route6_fee: 'Highway 6 Toll',
            baby_seat_fee: 'Baby Seat Fee',
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
Baby Seat: {7}
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
        },
        faq: {
            title: "Common Questions",
            questions: [
                {
                    q: "How much is a taxi to Ben Gurion?",
                    a: "The price depends on your pickup city, time of day (day/night tariff), and number of passengers. Use our calculator at the top of the page for an accurate estimate."
                },
                {
                    q: "Do you operate on weekends and holidays?",
                    a: "Yes, Golda Cabs is available 24/7, including Saturdays, Jewish holidays, and night hours."
                },
                {
                    q: "Do you have large taxis for families?",
                    a: "Yes. Our fleet includes standard sedans as well as large minivans that can accommodate up to 610 passengers with multiple suitcases."
                },
                {
                    q: "How far in advance should I book?",
                    a: "For airport trips, we recommend booking at least 12-24 hours in advance, although same-day bookings are often possible."
                }
            ]
        },
        testimonials: {
            title: "Customer Reviews",
            items: [
                {
                    name: "Daniel C.",
                    text: "Excellent service! The driver arrived 5 minutes early, and the car was clean and spacious. Highly recommended.",
                    stars: 5
                },
                {
                    name: "Michal L.",
                    text: "Booked a large van for the whole family. Everything was perfect, and the price matched the website calculator exactly.",
                    stars: 5
                }
            ]
        },
        deliveries: {
            title: "Express Taxi Deliveries",
            subtitle: "Fast same-day delivery service across Israel. Immediate pickup, secure private vehicle, and fixed prices.",
            cta: "Book Delivery Now",
            benefit1: "Pickup in 15 Min",
            benefit2: "Door-to-Door",
            benefit3: "Fully Secured",
            why_title: "Why use Golda Cabs for deliveries?",
            why_desc: "Unlike bike couriers, your delivery is shielded from heat, rain, and bumps. We guarantee fast and safe arrival for packages, documents, and sensitive equipment.",
        }
    }
};
