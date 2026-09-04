export const SITE_CONFIG = {
    name: 'מוניות גולדה',
    nameEn: 'GoldaCabs',
    legalName: 'מוניות גולדה VIP',
    url: 'https://www.goldacabs.co.il',
    phone: '+972-54-743-8110',
    phoneDisplay: '054-743-8110',
    whatsappNumber: '972547438110',
    // Verified Google Business Profile Place ID
    googlePlaceId: 'ChIJm2p5dMZxUyERvZHxWhFdf5Y' as string | null,
    googleBusinessUrl: 'https://maps.google.com/?cid=16168621164204710320' as string | null,
    googleReviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJm2p5dMZxUyERvZHxWhFdf5Y' as string | null,
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
