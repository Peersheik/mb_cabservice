import { NextResponse } from 'next/server';
import { INITIAL_PACKAGES, INITIAL_STAYS, INITIAL_TOURIST_PLACES, INITIAL_REVIEWS, INITIAL_SITE_SETTINGS } from '@/lib/data';

// Server-side persistent state using KV or memory fallback
let serverStore = {
  packages: INITIAL_PACKAGES,
  stays: INITIAL_STAYS,
  touristPlaces: INITIAL_TOURIST_PLACES,
  reviews: INITIAL_REVIEWS,
  settings: INITIAL_SITE_SETTINGS,
  bookings: []
};

// Check if Upstash Redis or Vercel KV environment variables exist
async function getKvClient() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    return { url, token };
  }
  return null;
}

export async function GET() {
  const kv = await getKvClient();
  if (kv) {
    try {
      const res = await fetch(`${kv.url}/get/mb_cabs_database`, {
        headers: { Authorization: `Bearer ${kv.token}` },
        cache: 'no-store'
      });
      const data = await res.json();
      if (data && data.result) {
        const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
        serverStore = { ...serverStore, ...parsed };
      }
    } catch (e) {
      console.warn('KV read fallback', e);
    }
  }

  return NextResponse.json(serverStore, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    serverStore = {
      ...serverStore,
      ...body,
      settings: body.settings ? { ...serverStore.settings, ...body.settings } : serverStore.settings
    };

    const kv = await getKvClient();
    if (kv) {
      try {
        await fetch(`${kv.url}/set/mb_cabs_database`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${kv.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(serverStore)
        });
      } catch (e) {
        console.warn('KV write fallback', e);
      }
    }

    return NextResponse.json(
      { success: true, data: serverStore },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
