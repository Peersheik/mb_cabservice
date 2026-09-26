import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mb_cabs_kodaikanal_super_secret_jwt_key_2026_x89q3j';
const COOKIE_NAME = 'mb_admin_token';

export interface AdminPayload {
  username: string;
  role: 'admin';
}

export function signAdminToken(username: string): string {
  return jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    if (decoded && decoded.role === 'admin') {
      return decoded;
    }
    return null;
  } catch (err) {
    return null;
  }
}

export function getAdminSession(req: NextRequest): AdminPayload | null {
  // Check Authorization Bearer header
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const payload = verifyAdminToken(token);
    if (payload) return payload;
  }

  // Check httpOnly Cookie
  const cookie = req.cookies.get(COOKIE_NAME);
  if (cookie?.value) {
    return verifyAdminToken(cookie.value);
  }

  return null;
}

export function requireAdmin(req: NextRequest): { authenticated: boolean; response?: NextResponse } {
  const session = getAdminSession(req);
  if (!session) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Unauthorized. Admin authentication session required.' },
        { status: 401 }
      )
    };
  }
  return { authenticated: true };
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || '127.0.0.1';
}
