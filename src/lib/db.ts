import fs from 'fs';
import path from 'path';
import { INITIAL_PACKAGES, INITIAL_STAYS, INITIAL_TOURIST_PLACES, INITIAL_REVIEWS, INITIAL_SITE_SETTINGS } from '@/lib/data';

// Global In-Memory Cache (survives across requests in the active serverless instance)
let memoryCache: any = null;

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const INITIAL_DB = {
  packages: INITIAL_PACKAGES,
  stays: INITIAL_STAYS,
  touristPlaces: INITIAL_TOURIST_PLACES,
  reviews: INITIAL_REVIEWS,
  settings: INITIAL_SITE_SETTINGS,
  bookings: []
};

export function readDatabase() {
  if (memoryCache) {
    return memoryCache;
  }

  // Try local file system if available (Local dev)
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      memoryCache = JSON.parse(content);
      return memoryCache;
    }
  } catch (e) {
    // Read-only filesystem on Vercel lambda
  }

  memoryCache = INITIAL_DB;
  return memoryCache;
}

export function writeDatabase(data: any) {
  memoryCache = {
    ...readDatabase(),
    ...data
  };

  // Try writing to disk for local environments
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(memoryCache, null, 2), 'utf-8');
  } catch (e) {
    // On Vercel serverless lambda, disk writing is restricted so memory cache handles it
  }

  return true;
}
