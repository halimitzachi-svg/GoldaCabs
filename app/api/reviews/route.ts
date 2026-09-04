import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/lib/site-config';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'he';
    const PLACE_ID = SITE_CONFIG.googlePlaceId;
    const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

    // If Place ID is unverified or API key is missing, return the verified snapshot with no-store
    if (!PLACE_ID || !API_KEY) {
        return NextResponse.json(
            {
                source: 'snapshot',
                rating: 5.0,
                totalRatings: 5,
                lastVerified: SITE_CONFIG.ratingSnapshot.lastVerified,
                reviews: []
            },
            {
                headers: {
                    'Cache-Control': 'no-store, max-age=0'
                }
            }
        );
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}&language=${lang}`;
        const response = await fetch(url, { next: { revalidate: 86400 } });
        const data = await response.json();

        if (data.status === 'OK' && data.result) {
            const validReviews = (data.result.reviews || []).filter(
                (r: any) => r.text && r.text.trim().length > 5
            );

            return NextResponse.json(
                {
                    source: 'google',
                    rating: data.result.rating || 5.0,
                    totalRatings: data.result.user_ratings_total || validReviews.length,
                    reviews: validReviews
                },
                {
                    headers: {
                        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
                    }
                }
            );
        }

        // Google API returned non-OK status (e.g. NOT_FOUND or quota exceeded)
        return NextResponse.json(
            {
                source: 'snapshot',
                rating: 5.0,
                totalRatings: 5,
                lastVerified: SITE_CONFIG.ratingSnapshot.lastVerified,
                reviews: []
            },
            {
                headers: {
                    'Cache-Control': 'no-store, max-age=0'
                }
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                source: 'snapshot',
                rating: 5.0,
                totalRatings: 5,
                lastVerified: SITE_CONFIG.ratingSnapshot.lastVerified,
                reviews: []
            },
            {
                headers: {
                    'Cache-Control': 'no-store, max-age=0'
                }
            }
        );
    }
}
