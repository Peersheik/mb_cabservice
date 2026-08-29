import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';

export async function GET() {
  const data = readDatabase();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentData = readDatabase();

    const updatedData = {
      ...currentData,
      ...body
    };

    const success = writeDatabase(updatedData);
    if (!success) {
      return NextResponse.json({ error: 'Failed saving to permanent storage' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
