import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getReviews, insertReview, deleteReviewInDb, rateLimitIp } from '@/lib/serverDb';
import { requireAdmin, getClientIp } from '@/lib/auth';
import { ReviewData } from '@/lib/data';

const ReviewSchema = z.object({
  name: z.string().min(2, 'Name is required').max(80),
  location: z.string().min(2, 'Location is required').max(100),
  rating: z.number().int().min(1).max(5),
  tourTaken: z.string().min(2, 'Tour taken is required'),
  text: z.string().min(10, 'Review text must be at least 10 characters').max(1000),
  honeypot: z.string().optional()
});

// GET /api/reviews - Public
export async function GET() {
  const reviews = await getReviews();
  return NextResponse.json(reviews, {
    headers: {
      'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600'
    }
  });
}

// POST /api/reviews - Admin or validated public submission
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rawBody = await req.json();

    if (rawBody.honeypot && rawBody.honeypot.trim() !== '') {
      return NextResponse.json({ success: true, id: 'rev-spam-dropped' });
    }

    // Rate limit review creation
    const rateCheck = await rateLimitIp(`review_${ip}`, 3, '60 s');
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    const validation = ReviewSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid review fields', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;
    const newReview: ReviewData = {
      id: 'rev-' + Date.now().toString(36),
      name: data.name.trim(),
      location: data.location.trim(),
      rating: data.rating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      tourTaken: data.tourTaken.trim(),
      text: data.text.trim(),
      verified: true,
      source: 'Direct'
    };

    await insertReview(newReview);
    return NextResponse.json({ success: true, review: newReview });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to submit review' }, { status: 500 });
  }
}

// DELETE /api/reviews - Admin only
export async function DELETE(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.authenticated) return auth.response!;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Review id required' }, { status: 400 });
    }

    await deleteReviewInDb(id);
    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete' }, { status: 500 });
  }
}
