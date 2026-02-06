import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Best practice: Use a global Prisma instance to prevent connection exhaustion in dev
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// GET: Fetch all leads (for Admin)
export async function GET() {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, leads });
    } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch leads' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            phone,
            origin,
            destination = 'נתב"ג', // Default
            flightTime, // We receive Flight Time from frontend
            passengers,
            luggage,
            flightNum,
            price
        } = body;

        // Calculate suggested pickup time (e.g., 4 hours before flight)
        const flightDate = new Date(flightTime);
        const pickupDate = new Date(flightDate.getTime() - (4 * 60 * 60 * 1000));

        const lead = await prisma.lead.create({
            data: {
                name,
                phone,
                origin: origin.name || origin,
                destination,
                pickupTime: pickupDate, // Saving the CALCULATED pickup time
                passengers: Number(passengers),
                luggage: Number(luggage),
                flightNum,
                quotedPrice: price,
                status: 'NEW',
                notes: `Flight Time provided by user: ${flightTime}`
            },
        });

        return NextResponse.json({ success: true, leadId: lead.id });
    } catch (error) {
        console.error('Error creating lead:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create lead' },
            { status: 500 }
        );
    }
}
