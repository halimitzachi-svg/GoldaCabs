import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'he';
    const PLACE_ID = 'ChIJX_O9UOm7HRURVb7D6NAtF0Q';
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

    if (!API_KEY) {
        return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}&language=${lang}`;

        console.log('Fetching Google Reviews for Place ID:', PLACE_ID);
        const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
        const data = await response.json();

        console.log('Google API Status:', data.status);
        if (data.status !== 'OK') {
            console.error('Google API Error:', data.error_message || data.status);
            return NextResponse.json({ error: data.status, message: data.error_message }, { status: 400 });
        }

        console.log('Found reviews count:', data.result.reviews?.length || 0);

        return NextResponse.json({
            reviews: data.result.reviews || [],
            rating: data.result.rating,
            totalRatings: data.result.user_ratings_total
        });
    } catch (error) {
        console.error('Reviews API internal error:', error);
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}
