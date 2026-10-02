import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const result = await sql`SELECT COUNT(*)::int as count FROM prebookings`;
    const count = result[0]?.count || 0;
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('Error fetching prebooking count:', error);
    // Return fallback initial count if DB is empty or unreachable
    return NextResponse.json({ success: true, count: 0 });
  }
}
