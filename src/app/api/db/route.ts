import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/serverDb';
import { requireAdmin } from '@/lib/auth';

// GET /api/db - Read current full snapshot (public, cached)
export async function GET() {
  const db = await getDatabase();
  return NextResponse.json(db, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
    }
  });
}

// POST /api/db - Admin protected full synchronization
export async function POST(req: NextRequest) {
  // CRITICAL SECURITY FIX: Disallow unauthenticated writes
  const auth = requireAdmin(req);
  if (!auth.authenticated) {
    return auth.response!;
  }

  try {
    const body = await req.json();
    const updated = await saveDatabase(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Sync failed' }, { status: 500 });
  }
}
