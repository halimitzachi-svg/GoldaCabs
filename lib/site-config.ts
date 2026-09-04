export const SITE_CONFIG = {
    name: 'מוניות גולדה',
    nameEn: 'GoldaCabs',
    legalName: 'מוניות גולדה VIP',
    url: 'https://www.goldacabs.co.il',
    phone: '+972-54-743-8110',
    phoneDisplay: '054-743-8110',
    whatsappNumber: '972547438110',
    // Place ID gate: null until a verified Google Business Profile Place ID is provided
    googlePlaceId: null as string | null,
    googleBusinessUrl: null as string | null,
    googleReviewsUrl: null as string | null,
    serviceType: 'Airport Shuttle & VIP Taxi Service',
    areaServed: 'Israel',
    businessId: 'https://www.goldacabs.co.il/#business',
    // Snapshot strictly for UI presentation (Testimonials fallback)
    ratingSnapshot: {
        ratingValue: '5.0',
        reviewCount: '5',
        lastVerified: '2026-09-04'
    }
} as const;
