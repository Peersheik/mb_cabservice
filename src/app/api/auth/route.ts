import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signAdminToken, verifyAdminToken } from '@/lib/auth';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'mbcabservice';
// Default bcrypt hash for 'kodaikanal@2026' if not set
const ADMIN_PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH ||
  '$2b$10$otKYhsKVn73nXPxokp1y0..7fEIK/dabcTRZWnxeGZe7QaZCFUgEC';

const COOKIE_NAME = 'mb_admin_token';

// GET: Check current admin session
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME);
  if (!cookie?.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const payload = verifyAdminToken(cookie.value);
  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, user: payload });
}

// POST: Log in with username and password
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const trimmedUsername = username.trim().toLowerCase();
    if (trimmedUsername !== ADMIN_USERNAME.toLowerCase()) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const fallbackHash = '$2b$10$otKYhsKVn73nXPxokp1y0..7fEIK/dabcTRZWnxeGZe7QaZCFUgEC';
    let targetHash = process.env.ADMIN_PASSWORD_HASH || fallbackHash;
    // If environment variable interpolation truncated the hash, fallback to valid hash
    if (!targetHash || targetHash.length < 50) {
      targetHash = fallbackHash;
    }

    const passwordMatch = await bcrypt.compare(password, targetHash);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const token = signAdminToken(trimmedUsername);
    const response = NextResponse.json({
      success: true,
      message: 'Authenticated successfully',
      token
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

// DELETE: Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.set({
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  });
  return response;
}
