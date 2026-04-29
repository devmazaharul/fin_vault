import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    try {
        const { email, password } = await request.json();
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
};
