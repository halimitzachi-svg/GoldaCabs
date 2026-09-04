import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/lib/site-config';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'he';
    const PLACE_ID = SITE_CONFIG.googlePlaceId;
    const API_KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

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
        // 1. Try Google Places API (New) v1
        const languageCode = lang === 'he' ? 'iw' : 'en';
        const v1Url = `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=${languageCode}&key=${API_KEY}`;
        const v1Response = await fetch(v1Url, {
            headers: {
                'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews'
            },
            next: { revalidate: 86400 }
        });

        if (v1Response.ok) {
            const v1Data = await v1Response.json();
            if (v1Data && Array.isArray(v1Data.reviews) && v1Data.reviews.length > 0) {
                const mappedReviews = v1Data.reviews
                    .map((r: any) => {
                        const reviewText = lang === 'he'
                            ? (r.originalText?.text || r.text?.text || '')
                            : (r.text?.text || r.originalText?.text || '');
                        return {
                            author_name: r.authorAttribution?.displayName || (lang === 'he' ? 'נוסע VIP' : 'Verified Traveler'),
                            profile_photo_url: r.authorAttribution?.photoUri || '',
                            rating: r.rating || 5,
                            relative_time_description: r.relativePublishTimeDescription || '',
                            text: reviewText,
                            publishTime: r.publishTime || ''
                        };
                    })
                    .filter((r: any) => r.text && r.text.trim().length > 5)
                    .sort((a: any, b: any) => {
                        // 1. Prioritize 5-star reviews first
                        if ((b.rating || 5) !== (a.rating || 5)) {
                            return (b.rating || 5) - (a.rating || 5);
                        }
                        // 2. Then newest first
                        return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime();
                    });

                return NextResponse.json(
                    {
                        source: 'google',
                        rating: v1Data.rating || 5.0,
                        totalRatings: v1Data.userRatingCount || mappedReviews.length,
                        reviews: mappedReviews
                    },
                    {
                        headers: {
                            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
                        }
                    }
                );
            }
        }

        // 2. Legacy fallback
        const legacyUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}&language=${lang}`;
        const legacyResponse = await fetch(legacyUrl, { next: { revalidate: 86400 } });
        const legacyData = await legacyResponse.json();

        if (legacyData.status === 'OK' && legacyData.result) {
            const validReviews = (legacyData.result.reviews || []).filter(
                (r: any) => r.text && r.text.trim().length > 5
            );

            return NextResponse.json(
                {
                    source: 'google',
                    rating: legacyData.result.rating || 5.0,
                    totalRatings: legacyData.result.user_ratings_total || validReviews.length,
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
