import { SITE_CONFIG } from './site-config';

/**
 * Generates the central Business JSON-LD Schema.
 * Per Google Review Snippet guidelines for Local Businesses / Taxi Services,
 * self-serving reviews / aggregateRatings are NEVER injected into the schema.
 */
export function getBusinessSchema() {
    const schema: Record<string, any> = {
        '@context': 'https://schema.org',
        '@type': 'TaxiService',
        '@id': SITE_CONFIG.businessId,
        'name': SITE_CONFIG.name,
        'alternateName': SITE_CONFIG.nameEn,
        'url': SITE_CONFIG.url,
        'image': `${SITE_CONFIG.url}/og-image.png`,
        'telephone': SITE_CONFIG.phone,
        'priceRange': '₪₪',
        'areaServed': [
            { '@type': 'AdministrativeArea', 'name': 'Central District, Israel' },
            { '@type': 'AdministrativeArea', 'name': 'Sharon, Israel' },
            { '@type': 'AdministrativeArea', 'name': 'Haifa & North District, Israel' },
            { '@type': 'AdministrativeArea', 'name': 'Jerusalem District, Israel' },
            { '@type': 'AdministrativeArea', 'name': 'Southern District, Israel' }
        ],
        'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
                'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
            ],
            'opens': '00:00',
            'closes': '23:59'
        },
        'availableLanguage': ['Hebrew', 'English'],
        'serviceType': SITE_CONFIG.serviceType,
        'paymentAccepted': 'Cash, Bit, Paybox',
        'currenciesAccepted': 'ILS'
    };

    if (SITE_CONFIG.googleBusinessUrl) {
        schema.sameAs = [SITE_CONFIG.googleBusinessUrl];
    }

    return schema;
}

/**
 * Generates the City Service JSON-LD Schema.
 * Linked to the central provider via @id.
 * Notice: offers is omitted because base fare is an estimate, not a binding contract.
 * aggregateRating and review are omitted to prevent self-serving review policy violations.
 */
export function getCityServiceSchema(cityData: { name: string }, lang: 'he' | 'en' = 'he') {
    const isHe = lang === 'he';

    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': 'Taxi Service',
        'provider': {
            '@id': SITE_CONFIG.businessId
        },
        'areaServed': {
            '@type': 'City',
            'name': cityData.name
        },
        'name': isHe
            ? `מונית מ${cityData.name} לנתב"ג`
            : `Taxi from ${cityData.name} to Ben Gurion Airport`,
        'description': isHe
            ? `שירות הסעות VIP מ${cityData.name} לשדה התעופה בן גוריון.`
            : `VIP taxi & transfer service from ${cityData.name} to Ben Gurion Airport.`
    };
}

/**
 * Generates the FAQ JSON-LD Schema.
 */
export function getFAQSchema(faqs: { q: string; a: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
            '@type': 'Question',
            'name': faq.q,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.a
            }
        }))
    };
}
