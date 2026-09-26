import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSettingsInDb } from '@/lib/serverDb';
import { requireAdmin } from '@/lib/auth';

// GET /api/settings - Public
export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  });
}

// PATCH /api/settings - Admin only
export async function PATCH(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.authenticated) return auth.response!;

  try {
    const body = await req.json();
    const updated = await updateSettingsInDb(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Update failed' }, { status: 500 });
  }
}
