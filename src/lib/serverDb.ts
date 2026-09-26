import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import {
  INITIAL_PACKAGES,
  INITIAL_STAYS,
  INITIAL_TOURIST_PLACES,
  INITIAL_REVIEWS,
  INITIAL_SITE_SETTINGS,
  PackageData,
  StayData,
  TouristPlaceDetail,
  ReviewData,
  BookingRecord,
  SiteSettings
} from './data';
import fs from 'fs';
import path from 'path';

export interface DatabaseSchema {
  packages: PackageData[];
  stays: StayData[];
  touristPlaces: TouristPlaceDetail[];
  reviews: ReviewData[];
  settings: SiteSettings;
  bookings: BookingRecord[];
  lastUpdated?: string;
}

const REDIS_KEY = 'mb_cabs_database';
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'mb_cabs_db.json');

const INITIAL_DB: DatabaseSchema = {
  packages: INITIAL_PACKAGES,
  stays: INITIAL_STAYS,
  touristPlaces: INITIAL_TOURIST_PLACES,
  reviews: INITIAL_REVIEWS,
  settings: INITIAL_SITE_SETTINGS,
  bookings: [],
  lastUpdated: new Date().toISOString()
};

let memoryStore: DatabaseSchema = INITIAL_DB;

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (url && token) {
    return { url, token };
  }
  return null;
}

// Low-level fetch to Upstash REST API
async function executeUpstashCommand(command: string, ...args: any[]): Promise<any> {
  const cfg = getRedisConfig();
  if (!cfg) return null;

  try {
    const res = await fetch(`${cfg.url}/${command}/${args.map(encodeURIComponent).join('/')}`, {
      headers: {
        Authorization: `Bearer ${cfg.token}`
      },
      cache: 'no-store'
    });
    if (!res.ok) {
      console.warn(`Upstash error: ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    return data.result;
  } catch (err) {
    console.warn(`Upstash command ${command} failed:`, err);
    return null;
  }
}

async function setUpstashKey(key: string, value: any): Promise<boolean> {
  const cfg = getRedisConfig();
  if (!cfg) return false;

  try {
    const res = await fetch(`${cfg.url}/set/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value),
      cache: 'no-store'
    });
    return res.ok;
  } catch (err) {
    console.warn(`Upstash set failed:`, err);
    return false;
  }
}

export async function getDatabase(): Promise<DatabaseSchema> {
  // 1. Try reading from Upstash Redis (primary reliable database)
  const remote = await executeUpstashCommand('get', REDIS_KEY);
  if (remote) {
    const parsed = typeof remote === 'string' ? JSON.parse(remote) : remote;
    memoryStore = {
      ...INITIAL_DB,
      ...parsed,
      settings: { ...INITIAL_DB.settings, ...(parsed.settings || {}) }
    };
    return memoryStore;
  }

  // 2. Fallback to local file if available
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = JSON.parse(fs.readFileSync(DATA_FILE_PATH, 'utf-8'));
      memoryStore = { ...INITIAL_DB, ...fileData };
      return memoryStore;
    }
  } catch (e) {
    // Ignore read-only lambda errors
  }

  return memoryStore;
}

export async function saveDatabase(data: Partial<DatabaseSchema>): Promise<DatabaseSchema> {
  const current = await getDatabase();
  const updated: DatabaseSchema = {
    ...current,
    ...data,
    settings: data.settings ? { ...current.settings, ...data.settings } : current.settings,
    lastUpdated: new Date().toISOString()
  };

  memoryStore = updated;

  // Persist to Upstash
  await setUpstashKey(REDIS_KEY, updated);

  // Best effort file sync for local dev
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (e) {
    // Expected on Vercel read-only filesystem
  }

  return updated;
}

// Scoped Entity Accessors
export async function getPackages(): Promise<PackageData[]> {
  const db = await getDatabase();
  return db.packages;
}

export async function updatePackages(packages: PackageData[]): Promise<PackageData[]> {
  const updated = await saveDatabase({ packages });
  return updated.packages;
}

export async function getBookings(): Promise<BookingRecord[]> {
  const db = await getDatabase();
  return db.bookings;
}

export async function insertBooking(booking: BookingRecord): Promise<BookingRecord> {
  const db = await getDatabase();
  const updatedBookings = [booking, ...(db.bookings || [])];
  await saveDatabase({ bookings: updatedBookings });
  return booking;
}

export async function updateBookingStatusInDb(id: string, status: BookingRecord['status']): Promise<boolean> {
  const db = await getDatabase();
  let found = false;
  const updatedBookings = (db.bookings || []).map((b) => {
    if (b.id === id) {
      found = true;
      return { ...b, status };
    }
    return b;
  });

  if (found) {
    await saveDatabase({ bookings: updatedBookings });
  }
  return found;
}

export async function getReviews(): Promise<ReviewData[]> {
  const db = await getDatabase();
  return db.reviews;
}

export async function insertReview(review: ReviewData): Promise<ReviewData> {
  const db = await getDatabase();
  const updated = [review, ...(db.reviews || [])];
  await saveDatabase({ reviews: updated });
  return review;
}

export async function deleteReviewInDb(id: string): Promise<boolean> {
  const db = await getDatabase();
  const updated = (db.reviews || []).filter((r) => r.id !== id);
  await saveDatabase({ reviews: updated });
  return true;
}

export async function getSettings(): Promise<SiteSettings> {
  const db = await getDatabase();
  return db.settings;
}

export async function updateSettingsInDb(newSettings: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = await getDatabase();
  const merged = { ...db.settings, ...newSettings };
  await saveDatabase({ settings: merged });
  return merged;
}

// Double booking & capacity conflict check
export async function checkBookingAvailability(
  travelDate: string,
  vehicleType: string,
  packageSlug?: string
): Promise<{ available: boolean; existingCount: number; message?: string }> {
  const db = await getDatabase();
  const activeBookings = (db.bookings || []).filter(
    (b) =>
      b.travelDate === travelDate &&
      b.vehicleType.toLowerCase() === vehicleType.toLowerCase() &&
      b.status !== 'CANCELLED'
  );

  // MB Cabs has a fleet of 5 Sedans and 6 SUVs in Kodaikanal
  const maxCapacity = vehicleType.toLowerCase().includes('suv') ? 6 : 5;
  if (activeBookings.length >= maxCapacity) {
    return {
      available: false,
      existingCount: activeBookings.length,
      message: `All ${maxCapacity} ${vehicleType} cabs are currently scheduled for ${travelDate}. Please choose another date or contact support for a special allocation.`
    };
  }

  return {
    available: true,
    existingCount: activeBookings.length
  };
}

// IP-based Rate Limiter using Upstash
export async function rateLimitIp(ip: string, limit = 5, window = '60 s'): Promise<{ success: boolean }> {
  const cfg = getRedisConfig();
  if (!cfg) return { success: true };

  try {
    const redis = new Redis({
      url: cfg.url,
      token: cfg.token
    });

    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, window as any),
      analytics: false,
      prefix: 'mb_cabs_ratelimit'
    });

    const result = await ratelimit.limit(ip);
    return { success: result.success };
  } catch (e) {
    // If rate limiter fails, allow request gracefully
    return { success: true };
  }
}
