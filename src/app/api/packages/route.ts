import { NextRequest, NextResponse } from 'next/server';
import { getPackages, updatePackages } from '@/lib/serverDb';
import { requireAdmin } from '@/lib/auth';
import { PackageData } from '@/lib/data';

// GET /api/packages - Public
export async function GET() {
  const packages = await getPackages();
  return NextResponse.json(packages, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  });
}

// PATCH /api/packages - Admin only: update prices or status
export async function PATCH(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.authenticated) return auth.response!;

  try {
    const body = await req.json();
    const currentPackages = await getPackages();

    // If updating a single package by id
    if (body.id) {
      const updated = currentPackages.map((p) => {
        if (p.id === body.id) {
          return {
            ...p,
            ...(body.status ? { status: body.status } : {}),
            ...(body.pricing ? { pricing: { ...p.pricing, ...body.pricing } } : {})
          };
        }
        return p;
      });
      await updatePackages(updated);
      return NextResponse.json({ success: true, packages: updated });
    }

    // If updating entire packages list (bulk pricing)
    if (Array.isArray(body.packages)) {
      await updatePackages(body.packages);
      return NextResponse.json({ success: true, packages: body.packages });
    }

    return NextResponse.json({ error: 'Invalid update payload' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Update failed' }, { status: 500 });
  }
}
