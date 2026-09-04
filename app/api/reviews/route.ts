import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'he';
    const PLACE_ID = 'ChIJeeRfwMa7HRURsNlIqEh7YuA';
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

    if (!API_KEY) {
        return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}&language=${lang}`;


        const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
        const data = await response.json();

        // Fallback reviews matching verified Google reviews
        const fallbackReviewsHebrew = [
            {
                author_name: "Eyal Haskal",
                rating: 5,
                relative_time_description: "לפני 4 שנים",
                text: "נוסע בקביעות עם מיכאל לנתב\"ג. זהיר ואדיב מאוד. הרכב חדש ותמיד מצוחצח. ממליץ בחום.",
                profile_photo_url: ""
            },
            {
                author_name: "Liz Alon",
                rating: 5,
                relative_time_description: "לפני 3 שנים",
                text: "הזמנתי מונית לנתב״ג הגיע בדיוק בזמן,שירות אדיב, מונית חדשה אחלה נסיעה מומלץ בחום💗",
                profile_photo_url: ""
            },
            {
                author_name: "Shula Halimi",
                rating: 5,
                relative_time_description: "לפני 3 שנים",
                text: "שירות אדיב, עמידה בלוח הזמנים ומחירים הוגנים.",
                profile_photo_url: ""
            },
            {
                author_name: "Itay Biton",
                rating: 5,
                relative_time_description: "לפני 4 שנים",
                text: "שירות אדיב, חדשני ומקצועי. ממליץ בחום!",
                profile_photo_url: ""
            },
            {
                author_name: "Greek Job",
                rating: 5,
                relative_time_description: "לפני 4 שנים",
                text: "",
                profile_photo_url: ""
            }
        ];

        const fallbackReviewsEnglish = [
            {
                author_name: "Eyal Haskal",
                rating: 5,
                relative_time_description: "4 years ago",
                text: "Regularly travel with Michael to Ben Gurion Airport. Very careful and courteous. The car is new and always spotless. Highly recommended.",
                profile_photo_url: ""
            },
            {
                author_name: "Liz Alon",
                rating: 5,
                relative_time_description: "3 years ago",
                text: "Booked a taxi to the airport, arrived right on time, courteous service, brand new taxi, great ride, highly recommended💗",
                profile_photo_url: ""
            },
            {
                author_name: "Shula Halimi",
                rating: 5,
                relative_time_description: "3 years ago",
                text: "Courteous service, punctuality and fair prices.",
                profile_photo_url: ""
            },
            {
                author_name: "Itay Biton",
                rating: 5,
                relative_time_description: "4 years ago",
                text: "Courteous, innovative and professional service. Highly recommended!",
                profile_photo_url: ""
            },
            {
                author_name: "Greek Job",
                rating: 5,
                relative_time_description: "4 years ago",
                text: "",
                profile_photo_url: ""
            }
        ];

        let reviewsToReturn = (data.status === 'OK' && data.result?.reviews?.length) 
            ? data.result.reviews 
            : (lang === 'en' ? fallbackReviewsEnglish : fallbackReviewsHebrew);

        let ratingToReturn = (data.status === 'OK' && data.result?.rating) 
            ? data.result.rating 
            : 5;

        let totalRatingsToReturn = (data.status === 'OK' && data.result?.user_ratings_total) 
            ? data.result.user_ratings_total 
            : 5;

        return NextResponse.json({
            reviews: reviewsToReturn,
            rating: ratingToReturn,
            totalRatings: totalRatingsToReturn
        });
    } catch (error) {
        return NextResponse.json({
            reviews: lang === 'en' ? [
                { author_name: "Eyal Haskal", rating: 5, relative_time_description: "4 years ago", text: "Regularly travel with Michael to Ben Gurion Airport. Very careful and courteous. The car is new and always spotless. Highly recommended.", profile_photo_url: "" },
                { author_name: "Liz Alon", rating: 5, relative_time_description: "3 years ago", text: "Booked a taxi to the airport, arrived right on time, courteous service, brand new taxi, great ride, highly recommended💗", profile_photo_url: "" },
                { author_name: "Shula Halimi", rating: 5, relative_time_description: "3 years ago", text: "Courteous service, punctuality and fair prices.", profile_photo_url: "" },
                { author_name: "Itay Biton", rating: 5, relative_time_description: "4 years ago", text: "Courteous, innovative and professional service. Highly recommended!", profile_photo_url: "" }
            ] : [
                { author_name: "Eyal Haskal", rating: 5, relative_time_description: "לפני 4 שנים", text: "נוסע בקביעות עם מיכאל לנתב\"ג. זהיר ואדיב מאוד. הרכב חדש ותמיד מצוחצח. ממליץ בחום.", profile_photo_url: "" },
                { author_name: "Liz Alon", rating: 5, relative_time_description: "לפני 3 שנים", text: "הזמנתי מונית לנתב״ג הגיע בדיוק בזמן,שירות אדיב, מונית חדשה אחלה נסיעה מומלץ בחום💗", profile_photo_url: "" },
                { author_name: "Shula Halimi", rating: 5, relative_time_description: "לפני 3 שנים", text: "שירות אדיב, עמידה בלוח הזמנים ומחירים הוגנים.", profile_photo_url: "" },
                { author_name: "Itay Biton", rating: 5, relative_time_description: "לפני 4 שנים", text: "שירות אדיב, חדשני ומקצועי. ממליץ בחום!", profile_photo_url: "" }
            ],
            rating: 5,
            totalRatings: 5
        });
    }
}
